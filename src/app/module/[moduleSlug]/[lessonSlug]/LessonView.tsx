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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

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
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    const getLessonLink = React.useCallback((l: { slug: string; moduleSlug: string }, withMode = true) => {
        const path = l.moduleSlug === 'standalone' ? `/lesson/${l.slug}` : `/module/${l.moduleSlug}/${l.slug}`;
        if (!withMode) return path;
        
        // Use current mode, but convert quiz to learning for next chapter
        const nextMode = mode === 'quiz' ? 'learning' : mode;
        return `${path}?mode=${nextMode}`;
    }, [mode]);

    // Sync and validate mode on lesson change or URL change
    useEffect(() => {
        const urlMode = searchParams.get('mode') as any;
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
        
        // Get stored preference only if no URL mode is specified
        const storedMode = !urlMode && typeof window !== 'undefined' ? localStorage.getItem('lastLessonMode') : null;
        
        // Priority: URL mode > stored mode > current mode > default 'learning'
        let targetMode = (urlMode || storedMode || mode || 'learning') as any;

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

        // 3. Store the validated mode in localStorage (but not quiz mode)
        if (typeof window !== 'undefined' && targetMode !== 'quiz') {
            localStorage.setItem('lastLessonMode', targetMode);
        }

        // 4. Apply state change to store if different
        if (targetMode !== mode) {
            setMode(targetMode);
        }

        // 5. Sync URL if it was missing or wrong
        if (urlMode !== targetMode) {
            router.replace(`${window.location.pathname}?mode=${targetMode}`, { scroll: false });
        }

        // 6. Handle immersive presentation UI state
        if (targetMode === 'presentation') {
            setPresentationFullscreen(true);
        } else {
            setPresentationFullscreen(false);
        }
    }, [searchParams, lesson.slug, lesson.slides.length, lesson.hasQuiz, mode, setMode, setPresentationFullscreen, router]);

    // Keyboard shortcuts for mode switching and navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Check if a modal or dialog is open
            const isModalOpen = document.querySelector('[role="dialog"], [data-state="open"]');
            
            // Handle Escape key (without modifiers)
            if (e.key === 'Escape') {
                if (isModalOpen) return; // Let the modal handle its own close
                
                e.preventDefault();
                const backPath = lesson.moduleSlug === 'standalone' ? '/' : `/module/${lesson.moduleSlug}`;
                router.push(backPath);
                return;
            }

            // Handle Arrow navigation in Learning Mode (without modifiers)
            if (mode === 'learning' && !isModalOpen) {
                if (e.key === 'ArrowRight' && nextLesson && !e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey) {
                    e.preventDefault();
                    router.push(getLessonLink(nextLesson));
                    return;
                }
                if (e.key === 'ArrowLeft' && prevLesson && !e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey) {
                    e.preventDefault();
                    router.push(getLessonLink(prevLesson));
                    return;
                }
            }

            // Check for Cmd (Mac) or Ctrl (Windows/Linux)
            const isModifierPressed = e.metaKey || e.ctrlKey;
            
            if (!isModifierPressed) return;
            if (isModalOpen) return;

            let newMode: 'presentation' | 'learning' | 'quiz' | null = null;

            switch (e.key.toLowerCase()) {
                case 'p':
                    // Cmd/Ctrl + P for Presentation
                    if (lesson.slides.length > 0 && isDesktop) {
                        e.preventDefault();
                        newMode = 'presentation';
                    }
                    break;
                case 'l':
                    // Cmd/Ctrl + L for Learning
                    e.preventDefault();
                    newMode = 'learning';
                    break;
                case 'o':
                    // Cmd/Ctrl + O for Quiz
                    if (lesson.hasQuiz) {
                        e.preventDefault();
                        newMode = 'quiz';
                    }
                    break;
            }

            if (newMode && newMode !== mode) {
                setMode(newMode);
                router.replace(`${window.location.pathname}?mode=${newMode}`, { scroll: false });
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [mode, setMode, router, lesson.slides.length, lesson.hasQuiz, isDesktop, lesson.moduleSlug, nextLesson, prevLesson, getLessonLink]);

    // Mouse navigation for Learning Mode
    useEffect(() => {
        if (mode !== 'learning') return;

        const handleMouseClick = (e: MouseEvent) => {
            // Don't trigger if user is selecting text (selection exists)
            const selection = window.getSelection();
            if (selection && selection.toString().length > 0) return;

            // Ignore if clicking interactive elements
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'BUTTON' || 
                target.tagName === 'A' || 
                target.tagName === 'INPUT' || 
                target.tagName === 'TEXTAREA' ||
                target.closest('button') || 
                target.closest('a') || 
                target.closest('.interactive') ||
                target.closest('.lucide') // Icons
            ) {
                return;
            }

            const width = window.innerWidth;
            const x = e.clientX;

            // Trigger points: Left 20% or Right 20%
            if (x < width * 0.2) {
                // Scroll Up
                window.scrollBy({ top: -window.innerHeight * 0.8, behavior: 'smooth' });
            } else if (x > width * 0.8) {
                // Scroll Down
                window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
            }
        };

        window.addEventListener('click', handleMouseClick);
        return () => window.removeEventListener('click', handleMouseClick);
    }, [mode]);

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
                            
                            
                            {isDesktop ? (
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <button 
                                            className="flex flex-col items-start px-2 md:px-3 py-1.5 rounded-xl hover:bg-primary/5 transition-all text-left group min-w-0 outline-none"
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
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0 w-[400px]" align="start">
                                        <Command className="rounded-xl border-none">
                                            <CommandInput placeholder="Search chapters..." className="border-none" />
                                            <CommandList className="max-h-[60vh] overflow-y-auto" data-lenis-prevent>
                                                <CommandEmpty>No chapter found.</CommandEmpty>
                                                <CommandGroup className="p-2">
                                                    {(() => {
                                                        let topLevelIndex = 0;
                                                        return allLessons.map((l) => {
                                                            if (!l.isSubchapter) topLevelIndex++;
                                                            const isSelected = l.slug === lesson.slug;
                                                            return (
                                                                <CommandItem
                                                                    key={l.slug}
                                                                    value={l.title}
                                                                    onSelect={() => {
                                                                        router.push(getLessonLink(l));
                                                                        setOpen(false);
                                                                    }}
                                                                    className={cn(
                                                                        "gap-3 cursor-pointer py-2.5 px-4 rounded-lg mb-1",
                                                                        isSelected && "bg-accent/70 text-accent-foreground",
                                                                        l.isSubchapter && "ml-8"
                                                                    )}
                                                                >
                                                                    <div className={cn(
                                                                        "w-6 h-6 flex items-center justify-center rounded-md font-mono text-[10px] font-bold shrink-0",
                                                                        isSelected 
                                                                            ? "bg-primary text-white" 
                                                                            : "bg-muted text-muted-foreground",
                                                                        l.isSubchapter && "w-4 h-6 border-none bg-transparent"
                                                                    )}>
                                                                        {l.isSubchapter ? (
                                                                            <div className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                                                                        ) : (
                                                                            topLevelIndex
                                                                        )}
                                                                    </div>
                                                                    <span className={cn(
                                                                        "flex-1 font-medium truncate",
                                                                        l.isSubchapter ? "text-xs" : "text-sm"
                                                                    )}>{l.title}</span>
                                                                    {isSelected && <Check className="w-4 h-4 text-primary ml-auto" />}
                                                                </CommandItem>
                                                            );
                                                        });
                                                    })()}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            ) : (
                                <>
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
                                        <DialogContent showCloseButton={false} className="p-0 w-screen h-[100dvh] max-w-none m-0 rounded-none border-none flex flex-col bg-background/95 backdrop-blur-xl gap-0">
                                            <div className="flex items-center justify-between px-6 py-4 pt-8 md:pt-4 border-b border-border/40 shrink-0 bg-background/50">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Chapters</span>
                                                    <span className="text-sm font-bold text-foreground">{moduleTitle}</span>
                                                </div>
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="h-10 w-10 rounded-xl bg-primary/5 hover:bg-primary/10"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    <X className="h-5 w-5" />
                                                </Button>
                                            </div>
                                            <Command className="flex-1 rounded-none border-none bg-transparent overflow-hidden">
                                                <CommandInput placeholder="Search chapters..." className="border-none text-base py-6 px-6" />
                                                <CommandList className="flex-1 overflow-y-auto p-4 max-h-none" data-lenis-prevent>
                                                    <CommandEmpty>No chapter found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {(() => {
                                                            let topLevelIndex = 0;
                                                            return allLessons.map((l) => {
                                                                if (!l.isSubchapter) topLevelIndex++;
                                                                const isSelected = l.slug === lesson.slug;
                                                                return (
                                                                    <CommandItem
                                                                        key={l.slug}
                                                                        value={l.title}
                                                                        onSelect={() => {
                                                                            router.push(getLessonLink(l));
                                                                            setOpen(false);
                                                                        }}
                                                                        className={cn(
                                                                            "gap-4 cursor-pointer py-4 px-4 rounded-xl mb-2",
                                                                            isSelected && "bg-accent/70 text-accent-foreground",
                                                                            l.isSubchapter && "ml-8"
                                                                        )}
                                                                    >
                                                                        <div className={cn(
                                                                            "w-8 h-8 flex items-center justify-center rounded-lg font-mono text-xs font-bold shrink-0",
                                                                            isSelected 
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
                                                                            "flex-1 font-medium text-base",
                                                                            l.isSubchapter && "text-sm text-muted-foreground"
                                                                        )}>{l.title}</span>
                                                                        {isSelected && <Check className="w-5 h-5 text-primary ml-auto" />}
                                                                    </CommandItem>
                                                                );
                                                            });
                                                        })()}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </DialogContent>
                                    </Dialog>
                                </>
                            )}
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
                        <div className="max-w-4xl mx-auto px-4 pt-0 pb-8">
                            <Separator className="mb-8" />
                            <div className="flex items-center gap-4 w-full">
                                <div className="flex-1">
                                    {prevLesson ? (
                                        <Button variant="outline" className="w-full h-14 gap-2 rounded-2xl text-base" asChild>
                                            <Link href={getLessonLink(prevLesson)}>
                                                <ChevronLeft className="h-5 w-5" />
                                                <span className="hidden sm:inline">{prevLesson.title}</span>
                                                <span className="sm:hidden">Previous</span>
                                            </Link>
                                        </Button>
                                    ) : (
                                        <Button variant="outline" className="w-full h-14 gap-2 rounded-2xl text-base" asChild>
                                            <Link href={lesson.moduleSlug === 'standalone' ? '/' : `/module/${lesson.moduleSlug}`}>
                                                <Home className="h-5 w-5" />
                                                <span className="truncate">
                                                    {lesson.moduleSlug === 'standalone' ? 'Expert Guides' : 'Overview'}
                                                </span>
                                            </Link>
                                        </Button>
                                    )}
                                </div>

                                <div className="flex-1 text-right">
                                    {nextLesson ? (
                                        <Button className="w-full h-14 gap-2 rounded-2xl text-base bg-primary hover:bg-primary/90" asChild>
                                            <Link href={getLessonLink(nextLesson)}>
                                                <span className="hidden sm:inline">{nextLesson.title}</span>
                                                <span className="sm:hidden">Next</span>
                                                <ChevronRight className="h-5 w-5" />
                                            </Link>
                                        </Button>
                                    ) : (
                                        <div className="w-full h-14 flex items-center justify-center rounded-2xl border border-dashed border-border/60 bg-muted/30">
                                            <Badge variant="outline" className="border-none bg-transparent text-muted-foreground uppercase tracking-widest text-[10px] font-bold">
                                                Module Complete
                                            </Badge>
                                        </div>
                                    )}
                                </div>
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
