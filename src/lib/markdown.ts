import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import type {
    ModuleMeta,
    LessonMeta,
    LessonContent,
    Slide,
    QuizQuestion,
    LessonFrontmatter,
} from './types';

// Get content directory - works in both dev and production
// The app is in /app and content is now also in /app/material
function getContentDirectory(): string {
    // Primary: look for 'material' folder at the project root
    // Next.js sets process.cwd() to the project root during build
    const projectRootMaterial = path.join(process.cwd(), 'material');
    if (fs.existsSync(projectRootMaterial)) {
        return projectRootMaterial;
    }

    // Secondary: try resolving relative to the current module file (useful for some dev setups)
    try {
        const currentFileDir = path.dirname(new URL(import.meta.url).pathname);
        const relativeMaterial = path.resolve(currentFileDir, '..', '..', 'material');
        if (fs.existsSync(relativeMaterial)) {
            return relativeMaterial;
        }
    } catch (e) {
        // Silently fail if pathname resolution doesn't work (e.g. non-file URL)
    }

    // Fallback: standard relative path from root
    return path.resolve('material');
}

const contentDirectory = getContentDirectory();

/**
 * Get all modules from the content directory
 */
export async function getAllModules(): Promise<ModuleMeta[]> {
    const entries = fs.readdirSync(contentDirectory, { withFileTypes: true });

    const modules: ModuleMeta[] = [];

    for (const entry of entries) {
        // Only include numbered directories as modules, skip 'expert-guide'
        if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'expert-guide') {
            const modulePath = path.join(contentDirectory, entry.name);
            const lessons = await getModuleLessons(entry.name);

            // Extract order from folder name (e.g., "1-product-development-lifecycle" -> 1)
            const orderMatch = entry.name.match(/^(\d+)/);
            const order = orderMatch ? parseInt(orderMatch[1], 10) : 99;

            // Generate title from folder name
            const title = entry.name
                .replace(/^\d+-?\.?\s*/, '')
                .replace(/-/g, ' ')
                .replace(/\b\w/g, l => l.toUpperCase());

            const descriptionMap: Record<string, string> = {
                'product-development-lifecycle': 'Master the end-to-end framework of modern product management—from initial discovery and ideation to launch, growth, and long-term maturity.',
                'prd-document': 'Learn to craft high-impact PRDs that align teams, clarify requirements, and drive efficient development cycles.',
                'ai-for-pm': 'Harness the power of Artificial Intelligence to automate busywork, analyze user data, and supercharge your product strategy.',
            };

            const moduleKey = Object.keys(descriptionMap).find(key => entry.name.includes(key));
            const description = moduleKey ? descriptionMap[moduleKey] : `Master the core principles of ${title} through interactive lessons and expert insights.`;

            modules.push({
                slug: entry.name,
                title,
                description,
                order,
                icon: getModuleIcon(entry.name),
                lessons,
            });
        }
    }

    return modules.sort((a, b) => a.order - b.order);
}

/**
 * Get standalone lessons (files in the expert-guide directory)
 */
export async function getStandaloneLessons(): Promise<LessonMeta[]> {
    const expertGuideDir = path.join(contentDirectory, 'expert-guide');

    if (!fs.existsSync(expertGuideDir)) {
        return [];
    }

    const entries = fs.readdirSync(expertGuideDir, { withFileTypes: true });
    const lessons: LessonMeta[] = [];

    for (const entry of entries) {
        if (entry.isFile() && entry.name.endsWith('.md') && !entry.name.startsWith('.')) {
            const filePath = path.join(expertGuideDir, entry.name);
            const fileContents = fs.readFileSync(filePath, 'utf8');
            const { data } = matter(fileContents);
            const frontmatter = data as LessonFrontmatter;

            const slug = entry.name.replace('.md', '');

            lessons.push({
                slug,
                title: frontmatter.title || formatTitle(slug),
                order: frontmatter.order ?? 99,
                hasQuiz: frontmatter.quiz ?? false,
                estimatedTime: frontmatter.estimatedTime ?? estimateReadingTime(fileContents),
            });
        }
    }

    return lessons.sort((a, b) => a.order - b.order);
}

/**
 * Get all lessons within a module
 */
export async function getModuleLessons(moduleSlug: string): Promise<LessonMeta[]> {
    const modulePath = path.join(contentDirectory, moduleSlug);

    if (!fs.existsSync(modulePath)) {
        return [];
    }

    const files = fs.readdirSync(modulePath).filter(file => file.endsWith('.md'));

    const lessons: LessonMeta[] = [];

    for (const file of files) {
        const filePath = path.join(modulePath, file);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);
        const frontmatter = data as LessonFrontmatter;

        // Extract order from filename (e.g., "1-introduction.md" -> 1)
        const orderMatch = file.match(/^(\d+)/);
        let order = frontmatter.order ?? (orderMatch ? parseInt(orderMatch[1], 10) : 99);
        let isSubchapter = false;
        let parentOrder: number | undefined;

        // Check for sub-chapters like 4.A or 4.1
        const subMatch = file.match(/^(\d+)\.([A-Z0-9]+)/i);
        if (subMatch) {
            isSubchapter = true;
            parentOrder = parseInt(subMatch[1], 10);
            const subPart = subMatch[2].toUpperCase();

            // If it's a letter (A, B, C), convert to 0.01, 0.02...
            if (/^[A-Z]$/.test(subPart)) {
                const letterOrder = subPart.charCodeAt(0) - 64; // A=1, B=2
                order = parentOrder + (letterOrder / 100);
            } else if (/^\d+$/.test(subPart)) {
                // If it's a number (4.1, 4.2), convert to 4.01, 4.02...
                order = parentOrder + (parseInt(subPart, 10) / 100);
            }
        }

        const slug = file.replace('.md', '');

        lessons.push({
            slug,
            title: frontmatter.title || formatTitle(slug),
            order,
            hasQuiz: frontmatter.quiz ?? false,
            estimatedTime: frontmatter.estimatedTime ?? estimateReadingTime(fileContents),
            isSubchapter,
            parentOrder,
        });
    }

    return lessons.sort((a, b) => a.order - b.order);
}

/**
 * Get full lesson content with parsed markdown
 */
export async function getLessonContent(
    moduleSlug: string,
    lessonSlug: string
): Promise<LessonContent | null> {
    const filePath = path.join(contentDirectory, moduleSlug, `${lessonSlug}.md`);

    if (!fs.existsSync(filePath)) {
        return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const frontmatter = data as LessonFrontmatter;
    // Extract slides early to handle custom blocks
    const slides = frontmatter.present !== false ? parseSlides(content) : [];

    // Prepare learn content by stripping presentation-only blocks
    const learnMarkdown = content
        .replace(/^::::present[\s\S]*?\n::::/gm, '')
        .replace(/^:::present[\s\S]*?\n:::/gm, '')
        .replace(/:::(cols?|col)\n?/g, '')
        .replace(/:::\n/g, '')
        .trim();

    const processedContent = await remark()
        .use(gfm)
        .use(html, { sanitize: false })
        .process(learnMarkdown);

    const contentHtml = processedContent.toString();

    // Extract order from filename
    const orderMatch = lessonSlug.match(/^(\d+)/);
    const order = frontmatter.order ?? (orderMatch ? parseInt(orderMatch[1], 10) : 99);

    // Generate quiz questions from content
    const quiz = frontmatter.quiz !== false ? generateQuizFromContent(content, lessonSlug) : [];

    return {
        slug: lessonSlug,
        title: frontmatter.title || formatTitle(lessonSlug),
        order,
        hasQuiz: (frontmatter.quiz ?? quiz.length > 0) && frontmatter.quiz !== false,
        estimatedTime: frontmatter.estimatedTime ?? estimateReadingTime(fileContents),
        content: contentHtml,
        rawContent: content,
        slides,
        quiz,
        moduleSlug,
    };
}

/**
 * Get standalone lesson content (for files in expert-guide directory)
 */
export async function getStandaloneLessonContent(
    lessonSlug: string
): Promise<LessonContent | null> {
    const filePath = path.join(contentDirectory, 'expert-guide', `${lessonSlug}.md`);

    if (!fs.existsSync(filePath)) {
        return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const frontmatter = data as LessonFrontmatter;

    const learnMarkdown = content
        .replace(/^::::present[\s\S]*?\n::::/gm, '')
        .replace(/^:::present[\s\S]*?\n:::/gm, '')
        .replace(/:::(cols?|col)\n?/g, '')
        .replace(/:::\n/g, '')
        .trim();
    const processedContent = await remark()
        .use(gfm)
        .use(html, { sanitize: false })
        .process(learnMarkdown);

    const contentHtml = processedContent.toString();
    const slides = frontmatter.present !== false ? parseSlides(content) : [];
    const quiz = frontmatter.quiz !== false ? generateQuizFromContent(content, lessonSlug) : [];

    return {
        slug: lessonSlug,
        title: frontmatter.title || formatTitle(lessonSlug),
        order: frontmatter.order ?? 99,
        hasQuiz: (frontmatter.quiz ?? quiz.length > 0) && frontmatter.quiz !== false,
        estimatedTime: frontmatter.estimatedTime ?? estimateReadingTime(fileContents),
        content: contentHtml,
        rawContent: content,
        slides,
        quiz,
        moduleSlug: 'standalone',
    };
}

/**
 * Parse markdown content into slides based on H2 headers
 */
function parseSlides(content: string): Slide[] {
    const slides: Slide[] = [];
    const sections = content.split(/(?=^## )/gm);

    let slideCount = 0;
    for (let i = 0; i < sections.length; i++) {
        const section = sections[i].trim();
        if (!section) continue;

        // Extract title from H2 or use H1 for first section
        const titleMatch = section.match(/^##?\s+(.+)$/m);
        const sectionTitle = titleMatch ? titleMatch[1].replace(/\*\*/g, '').trim() : `Slide ${i + 1}`;

        // Find all present blocks
        // Using a global regex to find multiple blocks
        const presentRegex = /::::present\n([\s\S]*?)\n::::/g;
        const fallbackRegex = /:::present\n([\s\S]*?)\n:::/g;

        let presentBlocks = Array.from(section.matchAll(presentRegex));
        if (presentBlocks.length === 0) {
            presentBlocks = Array.from(section.matchAll(fallbackRegex));
        }

        if (presentBlocks.length > 0) {
            presentBlocks.forEach((match) => {
                let slideContent = match[1].trim();

                // Try to find a specific title for this slide (e.g. ### from within the block)
                const internalTitleMatch = slideContent.match(/^###?\s+(.+)$/m);
                const slideTitle = internalTitleMatch
                    ? internalTitleMatch[1].replace(/\*\*/g, '').trim()
                    : sectionTitle;

                // Strip the title from the content if it's there
                if (internalTitleMatch) {
                    slideContent = slideContent.replace(internalTitleMatch[0], '').trim();
                }

                slides.push({
                    id: `slide-${slideCount++}`,
                    title: slideTitle,
                    content: slideContent,
                    order: slideCount - 1,
                });
            });
        } else {
            // No present blocks, treat section as a single slide
            let slideContent = section;
            if (titleMatch) {
                slideContent = slideContent.replace(titleMatch[0], '').trim();
            }

            slides.push({
                id: `slide-${slideCount++}`,
                title: sectionTitle,
                content: slideContent,
                order: slideCount - 1,
            });
        }
    }

    return slides;
}

/**
 * Generate quiz questions from content
 */
function generateQuizFromContent(content: string, lessonSlug: string): QuizQuestion[] {
    const questions: QuizQuestion[] = [];

    // Look for explicit question patterns: **Question X**: Text followed by options
    const questionBlocks = content.split(/\*\*Question \d+\*\*:/g).slice(1);

    if (questionBlocks.length > 0) {
        questionBlocks.forEach((block, i) => {
            const lines = block.trim().split('\n');
            const questionText = lines[0].trim();
            const options: string[] = [];
            let correctIndex = 0;

            lines.slice(1).forEach(line => {
                const optionMatch = line.trim().match(/^- ([A-D])\)\s+(.+)$/);
                if (optionMatch) {
                    options.push(optionMatch[2]);
                    // If we want to support correct answer marking in MD: (Correct: A)
                    // For now, default to index 0 or look for a marker
                }
            });

            // Check if there's a correct answer marker like (Correct: B)
            const correctMatch = block.match(/\(Correct:\s*([A-D])\)/i);
            if (correctMatch) {
                correctIndex = correctMatch[1].toUpperCase().charCodeAt(0) - 65;
            }

            if (options.length > 0) {
                questions.push({
                    id: `${lessonSlug}-q${i + 1}`,
                    question: questionText,
                    options,
                    correctIndex,
                    explanation: `Correct answer is ${String.fromCharCode(65 + correctIndex)}. Review the lesson for more details.`
                });
            }
        });
    }

    // Fallback to header-based placeholders if no explicit questions found
    if (questions.length === 0) {
        const h2Matches = content.match(/^## .+$/gm) || [];
        const maxQuestions = Math.min(5, Math.max(3, h2Matches.length));

        for (let i = 0; i < maxQuestions && i < h2Matches.length; i++) {
            const header = h2Matches[i].replace(/^## /, '').replace(/\*\*/g, '');

            questions.push({
                id: `${lessonSlug}-q${i + 1}`,
                question: `What is a key concept covered in "${header}"?`,
                options: [
                    'The main principle discussed in the section',
                    'A secondary detail of the implementation',
                    'A common misconception about the topic',
                    'A prerequisite for understanding the content',
                ],
                correctIndex: 0,
                explanation: `This question relates to the section: ${header}. Review that section to confirm your understanding.`,
            });
        }
    }

    return questions;
}

/**
 * Estimate reading time in minutes
 */
function estimateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Format slug to title
 */
function formatTitle(slug: string): string {
    return slug
        .replace(/^\d+(\.[A-Z0-9]+)?-?\.?\s*/i, '')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
}

/**
 * Get icon for module based on name
 */
function getModuleIcon(moduleSlug: string): string {
    const iconMap: Record<string, string> = {
        'product-development-lifecycle': 'Workflow',
        'prd-document': 'FileText',
        'ai-for-pm': 'Brain',
    };

    for (const [key, icon] of Object.entries(iconMap)) {
        if (moduleSlug.toLowerCase().includes(key)) {
            return icon;
        }
    }

    return 'BookOpen';
}
