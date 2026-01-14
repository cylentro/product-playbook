'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/store/appStore';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ModeSwitch } from '@/components/layout/ModeSwitch';
import { PresentationEngine, LearningEngine, QuizEngine } from '@/components/modules';
import { ChevronLeft, ChevronRight, Clock, Home, List, Check } from 'lucide-react';
import type { LessonContent } from '@/lib/types';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface LessonViewProps {
    lesson: LessonContent;
    moduleTitle: string;
    allLessons: { slug: string; title: string; moduleSlug: string }[];
    prevLesson: { slug: string; title: string; moduleSlug: string } | null;
    nextLesson: { slug: string; title: string; moduleSlug: string } | null;
}

export function LessonView({ lesson, moduleTitle, allLessons, prevLesson, nextLesson }: LessonViewProps) {
    const { mode, setMode, presentationFullscreen, setPresentationFullscreen } = useAppStore();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [open, setOpen] = useState(false);

    // Sync mode from URL search params on mount
    useEffect(() => {
        const urlMode = searchParams.get('mode') as any;
        if (urlMode && ['presentation', 'learning', 'quiz'].includes(urlMode)) {
            setMode(urlMode);
            
            // Auto-immersive for presentation mode
            if (urlMode === 'presentation') {
                setPresentationFullscreen(true);
            }
        }
    }, [searchParams, setMode, setPresentationFullscreen]);

    return (
        <div className="min-h-screen bg-background">
            {/* Header - Hidden in presentation mode when presentationFullscreen is true */}
            {(mode !== 'presentation' || !presentationFullscreen) && (
                <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
                    <div className="flex h-16 items-center justify-between px-4 md:px-6">
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-primary/10" asChild>
                                <Link href={lesson.moduleSlug === 'standalone' ? '/' : `/module/${lesson.moduleSlug}`} aria-label="Go back">
                                    <ChevronLeft className="h-5 w-5" />
                                </Link>
                            </Button>
                            
                            <div className="h-8 w-px bg-border/40 mx-1" />
                            
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <button className="flex flex-col items-start px-3 py-1.5 rounded-xl hover:bg-primary/5 transition-all text-left group">
                                        <div className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60 leading-none mb-1 group-hover:text-muted-foreground/80">{moduleTitle}</div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold truncate max-w-[200px] md:max-w-[400px] text-foreground leading-tight group-hover:text-primary transition-colors">
                                                {lesson.title}
                                            </span>
                                            <List className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                                        </div>
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="p-0 w-[350px]" align="start">
                                    <Command>
                                        <CommandInput placeholder="Search chapters..." />
                                        <CommandList>
                                            <CommandEmpty>No chapter found.</CommandEmpty>
                                            <CommandGroup heading="Chapters">
                                                {allLessons.map((l, i) => (
                                                    <CommandItem
                                                        key={l.slug}
                                                        value={l.title}
                                                        onSelect={() => {
                                                            router.push(`/module/${l.moduleSlug}/${l.slug}?mode=${mode}`);
                                                            setOpen(false);
                                                        }}
                                                        className={cn(
                                                            "gap-2 cursor-pointer py-3",
                                                            l.slug === lesson.slug && "bg-accent text-accent-foreground"
                                                        )}
                                                    >
                                                        <div className={cn(
                                                            "w-6 h-6 flex items-center justify-center rounded-md font-mono text-[10px] font-bold border shrink-0",
                                                            l.slug === lesson.slug 
                                                                ? "bg-primary text-white border-primary" 
                                                                : "bg-muted text-muted-foreground border-border"
                                                        )}>
                                                            {i + 1}
                                                        </div>
                                                        <span className="truncate flex-1 font-medium">{l.title}</span>
                                                        {l.slug === lesson.slug && <Check className="w-4 h-4 text-primary ml-auto" />}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                {lesson.estimatedTime} min
                            </div>
                            <ModeSwitch />
                        </div>
                    </div>
                </header>
            )}

            {/* Main Content - Mode Dependent */}
            <main className={(mode !== 'presentation' || !presentationFullscreen) ? 'pt-16' : ''}>
                {mode === 'presentation' && (
                    <PresentationEngine
                        slides={lesson.slides}
                        title={lesson.title}
                        moduleTitle={moduleTitle}
                        allLessons={allLessons}
                        nextLessonPath={nextLesson ? `/module/${nextLesson.moduleSlug}/${nextLesson.slug}` : undefined}
                        prevLessonPath={prevLesson ? `/module/${prevLesson.moduleSlug}/${prevLesson.slug}` : undefined}
                    />
                )}

                {mode === 'learning' && (
                    <>
                        <LearningEngine content={lesson.content} title={lesson.title} />

                        {/* Navigation Footer */}
                        <div className="max-w-4xl mx-auto px-4 py-8">
                            <Separator className="mb-8" />
                            <div className="flex items-center justify-between">
                                {prevLesson ? (
                                    <Button variant="outline" className="gap-2" asChild>
                                        <Link href={`/module/${prevLesson.moduleSlug}/${prevLesson.slug}?mode=${mode}`}>
                                            <ChevronLeft className="h-4 w-4" />
                                            <span className="hidden sm:inline">{prevLesson.title}</span>
                                            <span className="sm:hidden">Previous</span>
                                        </Link>
                                    </Button>
                                ) : (
                                    <Button variant="outline" className="gap-2" asChild>
                                        <Link href={lesson.moduleSlug === 'standalone' ? '/' : `/module/${lesson.moduleSlug}`}>
                                            <Home className="h-4 w-4" />
                                            Module Overview
                                        </Link>
                                    </Button>
                                )}

                                {nextLesson ? (
                                    <Button className="gap-2" asChild>
                                        <Link href={`/module/${nextLesson.moduleSlug}/${nextLesson.slug}?mode=${mode}`}>
                                            <span className="hidden sm:inline">{nextLesson.title}</span>
                                            <span className="sm:hidden">Next</span>
                                            <ChevronRight className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                ) : (
                                    <Badge variant="outline" className="px-4 py-2">
                                        Module Complete
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </>
                )}

                {mode === 'quiz' && (
                    <div className="pt-8">
                        <QuizEngine questions={lesson.quiz} lessonTitle={lesson.title} />
                    </div>
                )}
            </main>
        </div>
    );
}
