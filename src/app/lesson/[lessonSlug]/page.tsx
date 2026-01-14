import { notFound } from 'next/navigation';
import { getStandaloneLessons, getStandaloneLessonContent } from '@/lib/markdown';
import { LessonView } from '../../module/[moduleSlug]/[lessonSlug]/LessonView';

interface StandaloneLessonPageProps {
    params: Promise<{ lessonSlug: string }>;
}

export async function generateStaticParams() {
    const lessons = await getStandaloneLessons();
    return lessons.map((lesson) => ({
        lessonSlug: lesson.slug,
    }));
}

export default async function StandaloneLessonPage({ params }: StandaloneLessonPageProps) {
    const { lessonSlug } = await params;
    const lessonContent = await getStandaloneLessonContent(lessonSlug);

    if (!lessonContent) {
        notFound();
    }

    return (
        <LessonView
            lesson={lessonContent}
            moduleTitle="Special Guide"
            prevLesson={null}
            nextLesson={null}
        />
    );
}
