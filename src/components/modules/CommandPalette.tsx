'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command';
import { 
    BookOpen, 
    FileText, 
    Workflow, 
    Brain, 
    Home,
    Presentation,
    GraduationCap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationItem {
    title: string;
    slug: string;
    moduleSlug: string;
    type: 'module' | 'chapter';
    icon?: string;
    isSubchapter?: boolean;
}

// Static navigation data - this could be fetched from an API in the future
const NAVIGATION_DATA: {
    modules: { title: string; slug: string; icon: string; description: string }[];
    chapters: NavigationItem[];
} = {
    modules: [
        {
            title: 'Product Development Lifecycle',
            slug: '1-product-development-lifecycle',
            icon: 'Workflow',
            description: '9 chapters • Core framework',
        },
        {
            title: 'PRD Masterclass',
            slug: '2-product-requirement-document-masterclass',
            icon: 'FileText',
            description: '1 chapter • Documentation deep-dive',
        },
    ],
    chapters: [
        // PDLC Chapters
        { title: 'The Product Operating Model', slug: '1-introduction', moduleSlug: '1-product-development-lifecycle', type: 'chapter' },
        { title: 'Discovery Phase', slug: '2-discovery', moduleSlug: '1-product-development-lifecycle', type: 'chapter' },
        { title: 'Ideation Phase', slug: '3-ideation', moduleSlug: '1-product-development-lifecycle', type: 'chapter' },
        { title: 'Solution Design & Validation', slug: '4-solution-design-and-validation', moduleSlug: '1-product-development-lifecycle', type: 'chapter' },
        { title: 'Flow Design Deep-Dive', slug: '4.A-flow-design-deep-dive', moduleSlug: '1-product-development-lifecycle', type: 'chapter', isSubchapter: true },
        { title: 'The Metrics Framework', slug: '4.B-the-metrics-framework', moduleSlug: '1-product-development-lifecycle', type: 'chapter', isSubchapter: true },
        { title: 'Metrics in Practice', slug: '4.C-metrics-in-practice', moduleSlug: '1-product-development-lifecycle', type: 'chapter', isSubchapter: true },
        { title: 'Planning & Alignment', slug: '5-planning-and-alignment', moduleSlug: '1-product-development-lifecycle', type: 'chapter' },
        { title: 'Product Development & Testing', slug: '6-product-development-and-testing', moduleSlug: '1-product-development-lifecycle', type: 'chapter' },
        { title: 'Launch & Go-To-Market', slug: '7-launch-and-go-to-market', moduleSlug: '1-product-development-lifecycle', type: 'chapter' },
        { title: 'Hyper-Care & Stability', slug: '8-hyper-care-and-stability', moduleSlug: '1-product-development-lifecycle', type: 'chapter' },
        { title: 'Growth, Maturity, & Decline', slug: '9-growth-maturity-and-decline', moduleSlug: '1-product-development-lifecycle', type: 'chapter' },
        // PRD Chapters
        { title: 'PRD Masterclass', slug: '1-prd-masterclass', moduleSlug: '2-product-requirement-document-masterclass', type: 'chapter' },
        { title: 'PRD Template', slug: '1.A-prd-template', moduleSlug: '2-product-requirement-document-masterclass', type: 'chapter', isSubchapter: true },
        { title: 'PRD Example: YouTube StudySpace', slug: '1.B-prd-example-youtube-studyspace', moduleSlug: '2-product-requirement-document-masterclass', type: 'chapter', isSubchapter: true },
        // Expert Guide (Standalone)
        { title: 'The AI-Powered Product Manager', slug: '1-the-ai-powered-product-manager', moduleSlug: 'standalone', type: 'chapter', icon: 'Brain' },
        { title: 'Resources', slug: '2-resources', moduleSlug: 'standalone', type: 'chapter', icon: 'BookOpen' },
    ],
};

const iconMap: Record<string, React.ReactNode> = {
    Workflow: <Workflow className="h-4 w-4" />,
    FileText: <FileText className="h-4 w-4" />,
    Brain: <Brain className="h-4 w-4" />,
    BookOpen: <BookOpen className="h-4 w-4" />,
};

export function CommandPalette() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    // Listen for ⌘K / Ctrl+K
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((prev) => !prev);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const handleSelect = useCallback((item: NavigationItem | { type: 'home' | 'module'; slug?: string }) => {
        setOpen(false);
        
        if (item.type === 'home') {
            router.push('/');
        } else if (item.type === 'module' && 'slug' in item) {
            router.push(`/module/${item.slug}`);
        } else if ('moduleSlug' in item) {
            const path = item.moduleSlug === 'standalone' 
                ? `/lesson/${item.slug}` 
                : `/module/${item.moduleSlug}/${item.slug}`;
            router.push(`${path}?mode=learning`);
        }
    }, [router]);

    return (
        <CommandDialog 
            open={open} 
            onOpenChange={setOpen}
            title="Command Palette"
            description="Navigate to any module or chapter"
            showCloseButton={false}
        >
            <CommandInput placeholder="Search modules and chapters..." />
            <CommandList className="max-h-[60vh]" data-lenis-prevent>
                <CommandEmpty>No results found.</CommandEmpty>
                
                {/* Quick Actions */}
                <CommandGroup heading="Quick Actions">
                    <CommandItem
                        onSelect={() => handleSelect({ type: 'home' })}
                        className="gap-3 py-3"
                    >
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Home className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium">Go to Homepage</span>
                            <span className="text-xs text-muted-foreground">Return to the main page</span>
                        </div>
                    </CommandItem>
                </CommandGroup>

                <CommandSeparator />

                {/* Modules */}
                <CommandGroup heading="Modules">
                    {NAVIGATION_DATA.modules.map((module) => (
                        <CommandItem
                            key={module.slug}
                            value={`module ${module.title}`}
                            onSelect={() => handleSelect({ type: 'module', slug: module.slug })}
                            className="gap-3 py-3"
                        >
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                {iconMap[module.icon] || <BookOpen className="h-4 w-4" />}
                            </div>
                            <div className="flex flex-col">
                                <span className="font-medium">{module.title}</span>
                                <span className="text-xs text-muted-foreground">{module.description}</span>
                            </div>
                        </CommandItem>
                    ))}
                </CommandGroup>

                <CommandSeparator />

                {/* Expert Guides */}
                <CommandGroup heading="Expert Guides">
                    {NAVIGATION_DATA.chapters
                        .filter(c => c.moduleSlug === 'standalone')
                        .map((chapter) => (
                            <CommandItem
                                key={chapter.slug}
                                value={`expert ${chapter.title}`}
                                onSelect={() => handleSelect(chapter)}
                                className="gap-3 py-2.5"
                            >
                                <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
                                    {chapter.icon ? iconMap[chapter.icon] : <GraduationCap className="h-3.5 w-3.5" />}
                                </div>
                                <span className="font-medium text-sm">{chapter.title}</span>
                            </CommandItem>
                        ))}
                </CommandGroup>

                <CommandSeparator />

                {/* All Chapters */}
                <CommandGroup heading="All Chapters">
                    {NAVIGATION_DATA.chapters
                        .filter(c => c.moduleSlug !== 'standalone')
                        .map((chapter) => {
                            const module = NAVIGATION_DATA.modules.find(m => m.slug === chapter.moduleSlug);
                            return (
                                <CommandItem
                                    key={`${chapter.moduleSlug}-${chapter.slug}`}
                                    value={`chapter ${chapter.title} ${module?.title || ''}`}
                                    onSelect={() => handleSelect(chapter)}
                                    className={cn(
                                        "gap-3 py-2",
                                        chapter.isSubchapter && "ml-6 opacity-80"
                                    )}
                                >
                                    <div className={cn(
                                        "w-6 h-6 rounded-md bg-muted flex items-center justify-center",
                                        chapter.isSubchapter && "w-5 h-5"
                                    )}>
                                        {chapter.isSubchapter ? (
                                            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
                                        ) : (
                                            <Presentation className="h-3 w-3 text-muted-foreground" />
                                        )}
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className={cn(
                                            "font-medium truncate",
                                            chapter.isSubchapter ? "text-xs" : "text-sm"
                                        )}>{chapter.title}</span>
                                        {!chapter.isSubchapter && module && (
                                            <span className="text-[10px] text-muted-foreground truncate">
                                                {module.title}
                                            </span>
                                        )}
                                    </div>
                                </CommandItem>
                            );
                        })}
                </CommandGroup>
            </CommandList>
            
            {/* Keyboard Hint Footer */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-border/40 bg-muted/30 text-[10px] text-muted-foreground">
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 rounded border border-border bg-background font-mono">↑↓</kbd>
                        Navigate
                    </span>
                    <span className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 rounded border border-border bg-background font-mono">↵</kbd>
                        Select
                    </span>
                    <span className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 rounded border border-border bg-background font-mono">Esc</kbd>
                        Close
                    </span>
                </div>
            </div>
        </CommandDialog>
    );
}
