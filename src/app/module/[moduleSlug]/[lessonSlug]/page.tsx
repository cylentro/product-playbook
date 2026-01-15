import React from 'react';
import { notFound } from 'next/navigation';
import { getAllModules, getLessonContent } from '@/lib/markdown';
import { LessonView } from './LessonView';

interface LessonPageProps {
    params: Promise<{ moduleSlug: string; lessonSlug: string }>;
}

export async function generateStaticParams() {
    const modules = await getAllModules();
    const paths: { moduleSlug: string; lessonSlug: string }[] = [];

    for (const module of modules) {
        for (const lesson of module.lessons) {
            paths.push({
                moduleSlug: module.slug,
                lessonSlug: lesson.slug,
            });
        }
    }

    return paths;
}

export default async function LessonPage({ params }: LessonPageProps) {
    const { moduleSlug, lessonSlug } = await params;
    const lessonContent = await getLessonContent(moduleSlug, lessonSlug);

    if (!lessonContent) {
        notFound();
    }

    // Get all modules for navigation
    const modules = await getAllModules();
    const currentModule = modules.find((m) => m.slug === moduleSlug);

    // Find next and previous lessons
    const currentIndex = currentModule?.lessons.findIndex((l) => l.slug === lessonSlug) ?? -1;
    const prevLesson = currentIndex > 0 ? currentModule?.lessons[currentIndex - 1] : null;
    const nextLesson = currentIndex < (currentModule?.lessons.length ?? 0) - 1
        ? currentModule?.lessons[currentIndex + 1]
        : null;

    return (
        <React.Suspense fallback={<div className="min-h-screen bg-background animate-pulse" />}>
            <LessonView
                lesson={lessonContent}
                moduleTitle={currentModule?.title ?? ''}
                allLessons={currentModule?.lessons.map(l => ({ 
                    slug: l.slug, 
                    title: l.title, 
                    moduleSlug, 
                    isSubchapter: l.isSubchapter 
                })) ?? []}
                prevLesson={prevLesson ? { slug: prevLesson.slug, title: prevLesson.title, moduleSlug } : null}
                nextLesson={nextLesson ? { slug: nextLesson.slug, title: nextLesson.title, moduleSlug } : null}
            />
        </React.Suspense>
    );
}
