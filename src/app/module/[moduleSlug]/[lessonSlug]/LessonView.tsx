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
import { ChevronLeft, ChevronRight, Clock, Home, List, Check, Copy } from 'lucide-react';
import type { LessonContent } from '@/lib/types';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
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
import { X } from 'lucide-react';

interface LessonViewProps {
    lesson: LessonContent;
    moduleTitle: string;
    allLessons: { slug: string; title: string; moduleSlug: string; isSubchapter?: boolean }[];
    prevLesson: { slug: string; title: string; moduleSlug: string } | null;
    nextLesson: { slug: string; title: string; moduleSlug: string } | null;
}

export function LessonView({ lesson, moduleTitle, allLessons, prevLesson, nextLesson }: LessonViewProps) {
    const { mode, setMode, presentationFullscreen, setPresentationFullscreen } = useAppStore();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const getLessonLink = (l: { slug: string; moduleSlug: string }, withMode = true) => {
        const path = l.moduleSlug === 'standalone' ? `/lesson/${l.slug}` : `/module/${l.moduleSlug}/${l.slug}`;
        return withMode ? `${path}?mode=${mode}` : path;
    };

    // Sync and validate mode on lesson change or URL change
    useEffect(() => {
        const urlMode = searchParams.get('mode') as any;
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
        
        let targetMode = (urlMode || mode) as any;

        // 1. Force learning mode on mobile if they try presentation
        if (isMobile && targetMode === 'presentation') {
            targetMode = 'learning';
        }

        // 2. Validate if mode is supported by current lesson
        if (targetMode === 'presentation' && lesson.slides.length === 0) {
            targetMode = 'learning';
        } else if (targetMode === 'quiz' && !lesson.hasQuiz) {
            targetMode = 'learning';
        }

        // 3. Apply state change to store if different
        if (targetMode !== mode) {
            setMode(targetMode);
        }

        // 4. Sync URL if it was missing or wrong
        if (urlMode !== targetMode) {
            router.replace(`${window.location.pathname}?mode=${targetMode}`, { scroll: false });
        }

        // 5. Handle immersive presentation UI state
        if (targetMode === 'presentation') {
            setPresentationFullscreen(true);
        } else {
            setPresentationFullscreen(false);
        }
    }, [searchParams, lesson.slug, lesson.slides.length, lesson.hasQuiz, mode, setMode, setPresentationFullscreen, router]);

    const handleCopy = () => {
        navigator.clipboard.writeText(lesson.rawContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header - Hidden in presentation mode when presentationFullscreen is true */}
            {(mode !== 'presentation' || !presentationFullscreen) && (
                <header className="fixed top-0 left-0 right-0 z-[500] border-b border-border/40 bg-background/80 backdrop-blur-xl">
                    <div className="flex h-16 items-center justify-between px-3 md:px-6">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                            <Button variant="ghost" size="icon" className="h-9 w-9 md:h-10 md:w-10 rounded-xl hover:bg-primary/10 shrink-0" asChild>
                                <Link href={lesson.moduleSlug === 'standalone' ? '/' : `/module/${lesson.moduleSlug}`} aria-label="Go back">
                                    <ChevronLeft className="h-5 w-5" />
                                </Link>
                            </Button>
                            
                            <div className="h-8 w-px bg-border/40 mx-0.5 md:mx-1 shrink-0" />
                            
                            
                            <button 
                                onClick={() => setOpen(true)}
                                className="flex flex-col items-start px-2 md:px-3 py-1.5 rounded-xl hover:bg-primary/5 transition-all text-left group min-w-0"
                            >
                                <div className="text-[9px] md:text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60 leading-none mb-1 group-hover:text-muted-foreground/80 truncate w-full">
                                    {moduleTitle}
                                </div>
                                <div className="flex items-center gap-1.5 w-full">
                                    <span className="font-bold truncate text-sm md:text-base text-foreground leading-tight group-hover:text-primary transition-colors">
                                        {lesson.title}
                                    </span>
                                    <List className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0" />
                                </div>
                            </button>


                            <Dialog open={open} onOpenChange={setOpen}>
                                <DialogContent className="p-0 sm:max-w-[500px] sm:h-auto sm:max-h-[80vh] gap-0 [&>button]:hidden flex flex-col items-stretch justify-start">
                                    <DialogHeader className="px-6 py-3 md:py-4 border-b border-border/40 text-left shrink-0">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <DialogTitle className="text-lg font-bold text-left">Chapters</DialogTitle>
                                                <p className="text-xs text-muted-foreground mt-1">{moduleTitle}</p>
                                            </div>
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                className="h-8 w-8 rounded-full shrink-0 -mt-1"
                                                onClick={() => setOpen(false)}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </DialogHeader>
                                    <Command className="rounded-none border-none">
                                        <CommandInput placeholder="Search chapters..." className="border-none" />
                                        <CommandList className="max-h-[60vh] overflow-y-auto">
                                            <CommandEmpty>No chapter found.</CommandEmpty>
                                            <CommandGroup className="pb-8">
                                                {(() => {
                                                    let topLevelIndex = 0;
                                                    return allLessons.map((l, i) => {
                                                        if (!l.isSubchapter) {
                                                            topLevelIndex++;
                                                        }

                                                        return (
                                                            <CommandItem
                                                                key={l.slug}
                                                                value={l.title}
                                                                onSelect={() => {
                                                                    router.push(getLessonLink(l));
                                                                    setOpen(false);
                                                                }}
                                                                className={cn(
                                                                    "gap-3 cursor-pointer py-3 px-6",
                                                                    l.slug === lesson.slug && "bg-accent/70 text-accent-foreground",
                                                                    l.isSubchapter && "ml-12 py-2"
                                                                )}
                                                            >
                                                                <div className={cn(
                                                                    "w-8 h-8 flex items-center justify-center rounded-lg font-mono text-xs font-bold shrink-0",
                                                                    l.slug === lesson.slug 
                                                                        ? "bg-primary text-white" 
                                                                        : "bg-muted text-muted-foreground",
                                                                    l.isSubchapter && "w-6 h-6 border-none bg-transparent"
                                                                )}>
                                                                    {l.isSubchapter ? (
                                                                        <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
                                                                    ) : (
                                                                        topLevelIndex
                                                                    )}
                                                                </div>
                                                                <span className={cn(
                                                                    "flex-1 font-medium",
                                                                    l.isSubchapter ? "text-sm" : "text-base"
                                                                )}>{l.title}</span>
                                                                {l.slug === lesson.slug && <Check className="w-4 h-4 text-primary ml-auto" />}
                                                            </CommandItem>
                                                        );
                                                    });
                                                })()}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <div className="flex items-center gap-2 md:gap-4 shrink-0">
                            {lesson.slug === '1.A-prd-template' && (
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={handleCopy}
                                    className={cn(
                                        "gap-2 rounded-xl transition-all duration-300",
                                        copied ? "border-primary bg-primary/5 text-primary" : "hover:border-primary/40"
                                    )}
                                >
                                    {copied ? (
                                        <>
                                            <Check className="h-4 w-4" />
                                            <span>Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="h-4 w-4" />
                                            <span className="hidden sm:inline">Copy Markdown</span>
                                        </>
                                    )}
                                </Button>
                            )}
                            <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                {lesson.estimatedTime} min
                            </div>
                            <ModeSwitch 
                                showPresent={lesson.slides.length > 0} 
                                showQuiz={lesson.hasQuiz} 
                            />
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
                        nextLessonPath={nextLesson ? getLessonLink(nextLesson, false) : undefined}
                        prevLessonPath={prevLesson ? getLessonLink(prevLesson, false) : undefined}
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
                                        <Link href={getLessonLink(prevLesson)}>
                                            <ChevronLeft className="h-4 w-4" />
                                            <span className="hidden sm:inline">{prevLesson.title}</span>
                                            <span className="sm:hidden">Previous</span>
                                        </Link>
                                    </Button>
                                ) : (
                                    <Button variant="outline" className="gap-2" asChild>
                                        <Link href={lesson.moduleSlug === 'standalone' ? '/' : `/module/${lesson.moduleSlug}`}>
                                            <Home className="h-4 w-4" />
                                            {lesson.moduleSlug === 'standalone' ? 'Expert Guides' : 'Module Overview'}
                                        </Link>
                                    </Button>
                                )}

                                {nextLesson ? (
                                    <Button className="gap-2" asChild>
                                        <Link href={getLessonLink(nextLesson)}>
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
