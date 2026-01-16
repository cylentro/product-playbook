'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Clock, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ModuleMeta, LessonMeta } from '@/lib/types';

interface ModuleViewProps {
    module: ModuleMeta;
    lessons: LessonMeta[];
    moduleSlug: string;
}

export function ModuleView({ module, lessons, moduleSlug }: ModuleViewProps) {
    const router = useRouter();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [preferredMode, setPreferredMode] = useState<'learning' | 'presentation' | 'quiz'>('learning');
    const totalTime = lessons.reduce((acc, l) => acc + l.estimatedTime, 0);

    // Load preferred mode from localStorage on mount
    useEffect(() => {
        const storedMode = localStorage.getItem('lastLessonMode');
        if (storedMode && (storedMode === 'learning' || storedMode === 'presentation')) {
            setPreferredMode(storedMode as 'learning' | 'presentation');
        }
    }, []);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Don't interfere with Command Palette
            if (e.metaKey || e.ctrlKey) return;

            // Don't interfere if a modal, drawer or sheet is open
            const isModalOpen = document.querySelector('[role="dialog"], [data-state="open"]');
            if (isModalOpen) return;

            let newIndex = selectedIndex;
            let shouldScroll = false;

            switch (e.key) {
                case 'ArrowDown':
                case 'j':
                    e.preventDefault();
                    newIndex = Math.min(selectedIndex + 1, lessons.length - 1);
                    shouldScroll = true;
                    break;
                case 'ArrowUp':
                case 'k':
                    e.preventDefault();
                    newIndex = Math.max(selectedIndex - 1, 0);
                    shouldScroll = true;
                    break;
                case 'Enter':
                    e.preventDefault();
                    const selectedLesson = lessons[selectedIndex];
                    if (selectedLesson) {
                        router.push(`/module/${moduleSlug}/${selectedLesson.slug}?mode=${preferredMode}`);
                    }
                    return;
                case 'Escape':
                    e.preventDefault();
                    router.push('/');
                    return;
            }

            if (shouldScroll && newIndex !== selectedIndex) {
                setSelectedIndex(newIndex);
                // Scroll immediately after state update
                requestAnimationFrame(() => {
                    const selectedElement = document.querySelector(`[data-lesson-index="${newIndex}"]`);
                    if (selectedElement) {
                        selectedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                });
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, lessons, moduleSlug, router]);

    return (
        <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
            {/* Header */}
            <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Button variant="ghost" size="sm" className="gap-2" asChild>
                        <Link href="/">
                            <ChevronLeft className="h-4 w-4" />
                            Back to Modules
                        </Link>
                    </Button>
                    <Badge variant="outline">{lessons.length} lessons</Badge>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Module Header */}
                <div className="mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-5">
                        Module Overview
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                        {module.title}
                    </h1>
                    <p className="text-lg text-muted-foreground mb-6 max-w-2xl leading-relaxed">
                        {module.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-muted-foreground/60">
                            <Clock className="h-3.5 w-3.5" />
                            {totalTime} minutes
                        </div>
                        <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-muted-foreground/60">
                            <BookOpen className="h-3.5 w-3.5" />
                            {lessons.length} chapters
                        </div>
                    </div>
                </div>

                {/* Lessons List - Compact Style */}
                <div className="space-y-1">
                    <div className="px-4 py-2 border-b border-border/40 mb-4 flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Chapters</span>
                        <span className="text-[9px] font-mono text-muted-foreground/30 hidden sm:inline">
                            Use ↑↓ or J/K to navigate • Enter to select • Esc to go back
                        </span>
                    </div>
                    {(() => {
                        let topLevelIndex = 0;
                        return lessons.map((lesson, index) => {
                            if (!lesson.isSubchapter) {
                                topLevelIndex++;
                            }

                            const isSelected = index === selectedIndex;

                            return (
                                <Link
                                    key={lesson.slug}
                                    href={`/module/${moduleSlug}/${lesson.slug}?mode=${preferredMode}`}
                                    data-lesson-index={index}
                                    className={cn(
                                        "block group relative transition-all duration-300",
                                        lesson.isSubchapter && "ml-12"
                                    )}
                                >
                                    <div className={cn(
                                        "flex items-center justify-between p-4 rounded-2xl transition-all duration-300",
                                        lesson.isSubchapter && "p-3 py-2",
                                        isSelected 
                                            ? "bg-primary/10 ring-2 ring-primary/20 px-6" 
                                            : "hover:bg-primary/[0.03] group-hover:px-6"
                                    )}>
                                        <div className="flex items-center gap-6">
                                            {lesson.isSubchapter ? (
                                                <div className="flex items-center justify-center w-5 h-5">
                                                    <div className={cn(
                                                        "h-1.5 w-1.5 rounded-full transition-colors",
                                                        isSelected 
                                                            ? "bg-primary scale-150" 
                                                            : "bg-muted-foreground/30 group-hover:bg-primary"
                                                    )} />
                                                </div>
                                            ) : (
                                                <span className={cn(
                                                    "font-mono text-sm font-black transition-colors w-5 text-center",
                                                    isSelected 
                                                        ? "text-primary" 
                                                        : "text-muted-foreground/30 group-hover:text-primary"
                                                )}>
                                                    {topLevelIndex.toString().padStart(2, '0')}
                                                </span>
                                            )}
                                            <div className="flex flex-col">
                                                <h3 className={cn(
                                                    "font-bold transition-colors leading-tight",
                                                    lesson.isSubchapter ? "text-base" : "text-lg",
                                                    isSelected 
                                                        ? "text-primary" 
                                                        : "text-foreground group-hover:text-primary"
                                                )}>
                                                    {lesson.title}
                                                </h3>
                                                <div className={cn(
                                                    "flex items-center gap-3 mt-1.5 transition-opacity",
                                                    isSelected ? "opacity-100" : "opacity-60 group-hover:opacity-100"
                                                )}>
                                                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                                        {lesson.estimatedTime} min read
                                                    </div>
                                                    {lesson.hasQuiz && (
                                                        <div className="h-1 w-1 rounded-full bg-primary/30" />
                                                    )}
                                                    {lesson.hasQuiz && (
                                                        <div className="text-[10px] font-bold uppercase tracking-widest text-primary/70">
                                                            Quiz
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cn(
                                            "transition-all duration-300",
                                            isSelected 
                                                ? "opacity-100 translate-x-0" 
                                                : "opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0"
                                        )}>
                                            <div className={cn(
                                                "h-8 w-8 rounded-full flex items-center justify-center",
                                                isSelected 
                                                    ? "bg-primary text-white" 
                                                    : "bg-primary/10 text-primary"
                                            )}>
                                                <ChevronRight className="h-4 w-4" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        });
                    })()}
                </div>
            </div>
        </main>
    );
}
