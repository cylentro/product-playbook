'use client';

import React, { useEffect, useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Lightbulb, Info, Zap, Workflow, AlertTriangle, AlertCircle, ChevronDown, ChevronUp, LayoutGrid, List, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
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
import type { Slide } from '@/lib/types';
import { PDLCOverview } from './PDLCOverview';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface PresentationEngineProps {
    slides: Slide[];
    title: string;
    moduleTitle?: string;
    allLessons?: { slug: string; title: string; moduleSlug: string; isSubchapter?: boolean }[];
    nextLessonPath?: string;
    prevLessonPath?: string;
}

export function PresentationEngine({ slides, title, moduleTitle = '', allLessons = [], nextLessonPath, prevLessonPath }: PresentationEngineProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [open, setOpen] = useState(false);
    const [chaptersOpen, setChaptersOpen] = useState(false);
    const {
        currentSlide,
        setCurrentSlide,
        setTotalSlides,
        nextSlide,
        prevSlide,
        presentationFullscreen,
        togglePresentationFullscreen
    } = useAppStore();

    const [chapterValue, setChapterValue] = useState("");
    const [slideValue, setSlideValue] = useState("");

    useEffect(() => {
        if (chaptersOpen) {
            const current = allLessons.find(l => l.slug === searchParams.get('lessonSlug') || l.title === title);
            if (current) setChapterValue(current.title);
        }
    }, [chaptersOpen, allLessons, searchParams, title]);

    useEffect(() => {
        if (open) {
            setSlideValue(`${currentSlide + 1} ${slides[currentSlide]?.title}`);
        }
    }, [open, currentSlide, slides]);

    const containerRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTotalSlides(slides.length);
        
        // Priority 1: Specific slide parameter
        const slideParam = searchParams.get('slide');
        if (slideParam) {
            const slideNum = parseInt(slideParam, 10) - 1; // Convert to 0-indexed
            if (slideNum >= 0 && slideNum < slides.length) {
                setCurrentSlide(slideNum);
            } else {
                setCurrentSlide(0);
            }
        } 
        // Priority 2: 'last' parameter (usually from navigating "back" from next chapter)
        else if (searchParams.get('last') === 'true') {
            setCurrentSlide(slides.length - 1);
            
            // Clean up the URL to prevent "last" from overriding future navigation
            const params = new URLSearchParams(window.location.search);
            params.set('slide', String(slides.length));
            params.delete('last');
            router.replace(`${window.location.pathname}?${params.toString()}`, { scroll: false });
        } 
        // Default: Start at beginning
        else {
            setCurrentSlide(0);
        }
    }, [slides.length, setTotalSlides, setCurrentSlide, searchParams, router]);

    const handleNext = useCallback(() => {
        if (currentSlide === slides.length - 1) {
            if (nextLessonPath) {
                router.push(`${nextLessonPath}?mode=presentation`);
            }
        } else {
            const newSlide = currentSlide + 1;
            nextSlide();
            // Update URL with new slide number
            const params = new URLSearchParams(window.location.search);
            params.set('slide', String(newSlide + 1)); // 1-indexed for URL
            params.delete('last'); // Ensure "last" doesn't linger
            router.replace(`${window.location.pathname}?${params.toString()}`, { scroll: false });
        }
    }, [currentSlide, slides.length, nextLessonPath, nextSlide, router]);

    const handlePrev = useCallback(() => {
        if (currentSlide === 0) {
            if (prevLessonPath) {
                // Navigate to previous chapter and start at the last slide
                router.push(`${prevLessonPath}?mode=presentation&last=true`);
            }
        } else {
            const newSlide = currentSlide - 1;
            prevSlide();
            // Update URL with new slide number
            const params = new URLSearchParams(window.location.search);
            params.set('slide', String(newSlide + 1)); // 1-indexed for URL
            params.delete('last'); // Ensure "last" doesn't linger
            router.replace(`${window.location.pathname}?${params.toString()}`, { scroll: false });
        }
    }, [currentSlide, prevLessonPath, prevSlide, router]);

    // Keyboard navigation
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            handleNext();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            handlePrev();
        }
    }, [handleNext, handlePrev]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    const progress = slides.length > 0 ? ((currentSlide + 1) / slides.length) * 100 : 0;
    const currentSlideData = slides[currentSlide];
    const isTitleSlide = currentSlide === 0;

    return (
        <div
            ref={containerRef}
            className={cn(
                "fixed inset-0 flex flex-col bg-background overflow-hidden select-none transition-all duration-300 z-40",
                !presentationFullscreen && "top-16"
            )}
        >
            {/* Click Areas for Navigation - z-50 to be above content (z-40) but below navbar (z-500) */}
            <div
                className="absolute inset-y-0 left-0 w-[6%] z-50 cursor-pointer group/nav"
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                aria-label="Previous Slide"
            >
                <div className="absolute inset-y-0 left-0 w-1 bg-primary/0 group-hover/nav:bg-primary/20 transition-colors" />
            </div>
            <div
                className="absolute inset-y-0 right-0 w-[6%] z-50 cursor-pointer group/nav"
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                aria-label="Next Slide"
            >
                <div className="absolute inset-y-0 right-0 w-1 bg-primary/0 group-hover/nav:bg-primary/20 transition-colors" />
            </div>

            {/* Background */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
            </div>

            {/* Progress Toolbar - Always visible at the top */}
            <div className="relative z-[60] flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-xl border-b border-border/40">
                <div className="flex items-center gap-4 flex-1">
                    <AnimatePresence mode="wait">
                        {presentationFullscreen && (
                            <motion.div
                                key="immersive-nav"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center gap-4"
                            >
                                {/* Back Button */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20, scale: 0.8 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    transition={{ delay: 0.05, duration: 0.25, type: "spring", stiffness: 200 }}
                                >
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-9 w-9 rounded-xl hover:bg-primary/10 shrink-0" 
                                        asChild
                                    >
                                        <Link 
                                            href={allLessons?.[0]?.moduleSlug === 'standalone' ? '/' : (allLessons?.[0]?.moduleSlug ? `/module/${allLessons[0].moduleSlug}` : '/')} 
                                            aria-label="Go back"
                                        >
                                            <ChevronLeft className="h-5 w-5" />
                                        </Link>
                                    </Button>
                                </motion.div>
                                
                                {/* Separator */}
                                <motion.div 
                                    className="h-6 w-px bg-border/40"
                                    initial={{ scaleY: 0, opacity: 0 }}
                                    animate={{ scaleY: 1, opacity: 1 }}
                                    transition={{ delay: 0.1, duration: 0.2 }}
                                />
                                
                                {/* Title/Chapter Selector */}
                                {allLessons.length > 0 ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.15, duration: 0.25 }}
                                    >
                                        <Popover open={chaptersOpen} onOpenChange={setChaptersOpen}>
                                            <PopoverTrigger asChild>
                                                <button className="flex flex-col items-start px-2 md:px-3 py-1.5 rounded-xl hover:bg-primary/5 transition-all text-left group min-w-0 outline-none">
                                                    <div className="text-[9px] md:text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60 leading-none mb-1 group-hover:text-muted-foreground/80 truncate w-full">{moduleTitle}</div>
                                                    <div className="flex items-center gap-1.5 w-full">
                                                        <span className="text-sm md:text-base font-bold tracking-tight text-foreground truncate max-w-[200px] md:max-w-md group-hover:text-primary transition-colors">
                                                            {title}
                                                        </span>
                                                        <List className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0" />
                                                    </div>
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent className="p-0 w-[400px]" align="start">
                                                <Command value={chapterValue} onValueChange={setChapterValue} className="rounded-xl border-none">
                                                    <CommandInput placeholder="Search chapters..." className="border-none" />
                                                    <CommandList data-lenis-prevent className="max-h-[60vh] overflow-y-auto">
                                                        <CommandEmpty>No chapter found.</CommandEmpty>
                                                        <CommandGroup className="p-2">
                                                            {(() => {
                                                                let topLevelIndex = 0;
                                                                return allLessons.map((l, i) => {
                                                                    const isCurrent = l.slug === searchParams.get('lessonSlug') || l.title === title;
                                                                    if (!l.isSubchapter) {
                                                                        topLevelIndex++;
                                                                    }

                                                                    return (
                                                                        <CommandItem
                                                                            key={l.slug}
                                                                            value={l.title}
                                                                            onSelect={() => {
                                                                                const path = l.moduleSlug === 'standalone' ? `/lesson/${l.slug}` : `/module/${l.moduleSlug}/${l.slug}`;
                                                                                router.push(`${path}?mode=presentation`);
                                                                                setChaptersOpen(false);
                                                                            }}
                                                                            className={cn(
                                                                                "gap-3 cursor-pointer py-2.5 px-4 rounded-lg mb-1",
                                                                                isCurrent && "bg-accent/70 text-accent-foreground",
                                                                                l.isSubchapter && "ml-8"
                                                                            )}
                                                                        >
                                                                            <div className={cn(
                                                                                "w-6 h-6 flex items-center justify-center rounded-md font-mono text-[10px] font-bold shrink-0",
                                                                                isCurrent 
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
                                                                                "truncate flex-1 font-medium",
                                                                                l.isSubchapter ? "text-xs" : "text-sm"
                                                                            )}>{l.title}</span>
                                                                            {isCurrent && <Check className="w-3.5 h-3.5 text-primary ml-auto" />}
                                                                        </CommandItem>
                                                                    );
                                                                });
                                                            })()}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                    </motion.div>
                ) : (
                    <motion.div 
                        className="flex flex-col items-start px-2"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.25 }}
                    >
                        <div className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60 mb-1">{moduleTitle}</div>
                        <span className="text-sm font-bold tracking-tight text-foreground truncate max-w-[200px] md:max-w-md">
                            {title}
                        </span>
                    </motion.div>
                )}
            </motion.div>
        )}
    </AnimatePresence>
    
    <Progress value={progress} className="h-1 flex-1 max-w-[120px]" />

    <div className="flex items-center gap-2">
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl hover:bg-primary/10 transition-colors">
                    <Info className="h-4 w-4 text-muted-foreground/60" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[calc(100vw-2rem)] sm:w-72 p-0" align="center" sideOffset={8}>
                <div className="p-4 border-b border-border/40 bg-muted/20">
                    <h4 className="text-sm font-black uppercase tracking-widest text-foreground">Navigation Controls</h4>
                </div>
                <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-foreground">Next Slide</span>
                            <span className="text-[10px] text-muted-foreground font-medium italic">Jump to the next insight</span>
                        </div>
                        <div className="flex gap-1">
                            <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted/50 text-[10px] font-mono font-bold">→</kbd>
                            <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted/50 text-[10px] font-mono font-bold">Space</kbd>
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-foreground">Previous Slide</span>
                            <span className="text-[10px] text-muted-foreground font-medium italic">Revisit previous content</span>
                        </div>
                        <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted/50 text-[10px] font-mono font-bold">←</kbd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-foreground">Click Actions</span>
                            <span className="text-[10px] text-muted-foreground font-medium italic">Narrow side zones</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-muted-foreground/60">
                            <LayoutGrid className="w-3 h-3" />
                            Sides
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>

        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-primary/10 transition-colors group">
                    <span className="text-xs font-mono font-bold text-muted-foreground group-hover:text-primary transition-colors">
                        {currentSlide + 1} / {slides.length}
                    </span>
                    <List className="w-3 h-3 text-muted-foreground/60 group-hover:text-primary transition-colors" />
                </button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[calc(100vw-2rem)] sm:w-[400px]" align="center" sideOffset={8}>
                <Command value={slideValue} onValueChange={setSlideValue}>
                    <CommandInput placeholder="Search slides..." />
                    <CommandList>
                        <CommandEmpty>No slide found.</CommandEmpty>
                        <CommandGroup heading="Slides" className="pb-4">
                            {slides.map((s, i) => {
                                const isCurrent = i === currentSlide;
                                return (
                                    <CommandItem
                                        key={i}
                                        value={`${i + 1} ${s.title}`}
                                        onSelect={() => {
                                            setCurrentSlide(i);
                                            setOpen(false);
                                            // Update URL with slide number
                                            const params = new URLSearchParams(window.location.search);
                                            params.set('slide', String(i + 1)); // 1-indexed for URL
                                            router.replace(`${window.location.pathname}?${params.toString()}`, { scroll: false });
                                        }}
                                        className={cn(
                                            "gap-2 cursor-pointer py-2.5 px-4 mx-1 rounded-lg",
                                            isCurrent && "bg-accent/70 text-accent-foreground"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-6 h-6 flex items-center justify-center rounded-md font-mono text-[10px] font-bold shrink-0",
                                            isCurrent
                                                ? "bg-primary text-white"
                                                : "bg-muted text-muted-foreground"
                                        )}>
                                            {i + 1}
                                        </div>
                                        <span className="truncate flex-1 font-medium text-sm">{s.title}</span>
                                        {isCurrent && <Check className="w-3.5 h-3.5 text-primary ml-auto" />}
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    </div>
</div>

                <div className="flex items-center gap-2 ml-4">
                    {/* Immersive/Slim Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => { e.stopPropagation(); togglePresentationFullscreen(); }}
                        className="h-9 w-9 hover:bg-primary/10 rounded-xl"
                        title={presentationFullscreen ? "Show Menu Bar" : "Hide Menu Bar"}
                    >
                        {presentationFullscreen ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* Content Container */}
            <div className="flex-1 w-full max-w-[2560px] mx-auto flex flex-col relative z-40">
                <div className="flex-1 overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className={cn(
                                "w-full h-full flex flex-col items-center justify-center overflow-visible",
                                isTitleSlide ? "p-0" : "p-4 md:p-8 lg:p-12"
                            )}
                        >
                            {currentSlideData && (
                                <SlideContent slide={currentSlideData} index={currentSlide} />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>

    );
}

function SlideContent({ slide, index }: { slide: Slide; index: number }) {
    // Detect if this is a Title Slide (Always true for the first slide)
    const isTitleSlide = index === 0;
    const hasMap = slide.content.includes('[PDLC_MAP]');
    const cleanContent = slide.content.replace(/^#\s+.+\n?/, '').replace('[PDLC_MAP]', '');

    if (isTitleSlide) {
        // ... (title slide logic remains largely the same)
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="relative w-full h-full flex flex-col items-center justify-center text-center overflow-hidden pointer-events-auto"
            >
                {/* Immersive full-screen background effect for title */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-to-br from-primary/20 via-background to-primary/10 blur-[100px] opacity-60" />
                    <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-primary/30 rounded-full blur-[180px] animate-pulse" />
                    <div className="absolute bottom-[-20%] left-[-20%] w-[80%] h-[80%] bg-blue-500/20 rounded-full blur-[180px]" />
                </div>

                <div className="relative z-10 max-w-6xl px-8 flex flex-col items-center">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="bg-primary/15 w-24 h-24 rounded-3xl flex items-center justify-center mb-10 shadow-2xl ring-1 ring-primary/30 backdrop-blur-md"
                    >
                        <Zap className="w-12 h-12 text-primary drop-shadow-[0_0_10px_rgba(251,56,122,0.6)]" />
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-8 text-foreground drop-shadow-sm select-none"
                    >
                        {slide.title.split(' ').map((word, i) => (
                            <span key={i} className="inline-block mr-4 last:mr-0">{word}</span>
                        ))}
                    </motion.h1>
                    
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="flex flex-col items-center gap-6"
                    >
                        <p className="text-3xl md:text-4xl text-muted-foreground max-w-4xl font-medium leading-relaxed tracking-tight">
                            {cleanContent || "PM Playbook: Mastering the Art of Product Engineering"}
                        </p>
                        <div className="h-px w-24 bg-primary/30" />
                    </motion.div>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col relative group/slide max-w-[1800px] mx-auto px-10 md:px-20 pointer-events-auto overflow-visible">
            <div className="space-y-2 flex-1 flex flex-col overflow-visible py-2">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="relative shrink-0 border-l-4 border-primary/80 pl-6 py-1"
                >
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
                        {slide.title}
                    </h2>
                </motion.div>

                <div className="flex-1 overflow-visible px-2">
                    {hasMap ? (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 h-full items-start">
                            <div className="lg:col-span-4 overflow-y-auto no-scrollbar h-full pb-20" data-lenis-prevent>
                                <EnhancedMarkdown content={cleanContent} />
                            </div>
                            <div className="lg:col-span-8 flex items-center justify-center bg-muted/20 rounded-[3rem] border border-border/40 relative overflow-visible h-full max-h-[70vh]">
                                <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full opacity-30" />
                                <div className="scale-75 xl:scale-90 origin-center transition-transform duration-500">
                                    <PDLCOverview />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="overflow-y-auto pr-4 no-scrollbar pb-20 h-full w-full" data-lenis-prevent>
                            <div className="w-full">
                                <EnhancedMarkdown content={cleanContent} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function EnhancedMarkdown({ content }: { content: string }) {
    // Basic markdown parsing with interactive styling
    const cleanContent = content.replace(/^##?\s+.+\n/, '');
    const lines = cleanContent.split('\n');
    const sections: React.ReactNode[] = [];

    let inCols = false;
    let inCol = false;
    let colBuffer: React.ReactNode[][] = []; 

    let currentList: { text: string; indent: number }[] = [];
    let currentTable: string[][] = [];
    let currentQuote: { type: string | null; lines: string[] } | null = null;
    let inCodeBlock = false;
    let codeContent = '';
    let codeLanguage = '';

    const flushCols = (key: number) => {
        if (inCols) {
            // Only push if we have actual content in columns
            if (colBuffer.some(nodes => nodes.length > 0)) {
                sections.push(
                    <div key={`cols-${key}`} className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-4 ml-7">
                        {colBuffer.map((colNodes, i) => (
                            <div key={i} className="space-y-4">
                                {colNodes}
                            </div>
                        ))}
                    </div>
                );
            }
            inCols = false;
            inCol = false;
            colBuffer = [];
        }
    };

    const addToCurrentSection = (node: React.ReactNode) => {
        if (inCols) {
            if (colBuffer.length === 0) colBuffer.push([]);
            colBuffer[colBuffer.length - 1].push(node);
        } else {
            sections.push(node);
        }
    };

    const flushList = (key: number) => {
        if (currentList.length > 0) {
            const listNode = (
                <motion.ul
                    key={`list-${key}`}
                    className="space-y-3 mb-6 pl-0"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: { transition: { staggerChildren: 0.05 } }
                    }}
                >
                    {currentList.map((item, i) => (
                        <motion.li
                            key={i}
                            variants={{
                                hidden: { opacity: 0, x: -10 },
                                visible: { opacity: 1, x: 0 }
                            }}
                            className={`flex items-start gap-3 text-xl md:text-2xl text-muted-foreground group ${item.indent > 0 ? 'ml-10 opacity-80' : ''}`}
                        >
                            <span className={`flex-shrink-0 w-5 h-5 rounded-full ${item.indent > 0 ? 'bg-primary/5' : 'bg-primary/10'} flex items-center justify-center text-primary mt-1.5 group-hover:scale-110 transition-transform`}>
                                <ChevronRight className={item.indent > 0 ? 'w-3 h-3' : 'w-4 h-4'} />
                            </span>
                            <span><FormattedText text={item.text} /></span>
                        </motion.li>
                    ))}
                </motion.ul>
            );
            addToCurrentSection(listNode);
            currentList = [];
        }
    };

    const flushTable = (key: number) => {
        if (currentTable.length > 0) {
            const tableNode = (
                <div key={`table-wrapper-${key}`} className="relative overflow-hidden rounded-xl border border-border/40 mb-6 mt-3 group">
                    <div className="absolute inset-0 bg-primary/5 opacity-20 transition-opacity" />
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-border/40 bg-muted/30">
                                    {currentTable[0].map((cell, i) => (
                                        <th key={i} className="px-3 py-2 font-semibold text-foreground text-xs uppercase tracking-wider">
                                            <div><FormattedText text={cell} /></div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/20">
                                {currentTable.slice(1).map((row, i) => (
                                    <tr key={i} className="hover:bg-primary/5 transition-colors group/row">
                                        {row.map((cell, j) => (
                                            <td key={j} className="px-3 py-2 text-lg text-muted-foreground group-hover/row:text-foreground transition-colors">
                                                <div><FormattedText text={cell} /></div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
            addToCurrentSection(tableNode);
            currentTable = [];
        }
    };

    const flushQuote = (key: number) => {
        if (currentQuote && currentQuote.lines.length > 0) {
            const { type, lines } = currentQuote;
            const text = lines.join(' ').trim();
            
            let quoteNode;
            if (type) {
                const alertStyles: Record<string, any> = {
                    NOTE: { icon: <Info className="h-5 w-5" />, color: "bg-blue-500/10 border-blue-500/50 text-blue-700 dark:text-blue-300" },
                    TIP: { icon: <Zap className="w-5 h-5" />, color: "bg-emerald-500/10 border-emerald-500/50 text-emerald-700 dark:text-emerald-300" },
                    IMPORTANT: { icon: <Workflow className="w-5 h-5" />, color: "bg-purple-500/10 border-purple-500/50 text-purple-700 dark:text-purple-300" },
                    WARNING: { icon: <AlertTriangle className="w-5 h-5" />, color: "bg-amber-500/10 border-amber-500/50 text-amber-700 dark:text-amber-300" },
                    CAUTION: { icon: <AlertCircle className="w-5 h-5" />, color: "bg-red-500/10 border-red-500/50 text-red-700 dark:text-red-300" }
                };
                const style = alertStyles[type] || alertStyles.NOTE;
                quoteNode = (
                    <motion.div
                        key={`alert-${key}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={cn("p-6 rounded-xl border border-l-8 flex gap-4 mb-6 shadow-sm", style.color)}
                    >
                        <div className="flex-shrink-0 mt-1">{style.icon}</div>
                        <div className="text-xl font-medium"><FormattedText text={text} /></div>
                    </motion.div>
                );
            } else {
                quoteNode = (
                    <motion.div
                        key={`quote-${key}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-6 rounded-2xl bg-primary/5 border border-primary/20 flex gap-4 mb-6 shadow-sm"
                    >
                        <Lightbulb className="w-6 h-6 text-primary flex-shrink-0" />
                        <div className="text-xl italic text-muted-foreground"><FormattedText text={text} /></div>
                    </motion.div>
                );
            }
            addToCurrentSection(quoteNode);
            currentQuote = null;
        }
    };

    lines.forEach((line, index) => {
        const trimmed = line.trim();

        // Auto-flush columns if we hit unrelated content
        if (inCols && !inCol && trimmed !== '' && trimmed !== ':::col' && 
            trimmed !== ':::' && trimmed !== ':::cols' && !trimmed.match(/^::::?present$/)) {
            flushList(index);
            flushTable(index);
            flushQuote(index);
            flushCols(index);
        }

        // Handle columns
        if (trimmed === ':::cols') {
            flushList(index);
            flushTable(index);
            flushQuote(index);
            inCols = true;
            colBuffer = []; 
            return;
        }

        if (trimmed === ':::col') {
            flushList(index);
            flushTable(index);
            flushQuote(index);
            if (!inCols) {
                inCols = true;
                colBuffer = [[]];
            } else if (!inCol) {
                colBuffer.push([]);
            }
            inCol = true;
            return;
        }

        if (trimmed === ':::') {
            if (inCol) {
                flushList(index);
                flushTable(index);
                flushQuote(index);
                inCol = false;
                // We don't flush row here, allowing next :::col to group
            } else if (inCols) {
                flushList(index);
                flushTable(index);
                flushQuote(index);
                flushCols(index);
            }
            return;
        }

        // Ignore present block markers
        if (trimmed.match(/^::::?present$/)) {
            return;
        }

        // Handle code blocks
        if (trimmed.startsWith('```')) {
            flushList(index);
            flushTable(index);
            flushQuote(index);
            
            if (inCodeBlock) {
                // Flush code block
                let codeNode;
                if (codeLanguage === 'mermaid' || codeLanguage === 'mermaidjs') {
                    try {
                        const encoded = btoa(codeContent.trim()).replace(/\+/g, '-').replace(/\//g, '_');
                        codeNode = (
                            <div key={`mermaid-${index}`} className="my-10 w-full flex flex-col items-center overflow-visible">
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-muted/5 p-6 rounded-[2rem] border border-border/60 w-full flex justify-center items-center group/mermaid transition-all duration-500"
                                >
                                    <img 
                                        src={`https://mermaid.ink/svg/${encoded}`} 
                                        alt="Mermaid diagram" 
                                        className="w-full h-auto max-h-[60vh] object-contain transition-transform duration-700 group-hover/mermaid:scale-[1.01]" 
                                    />
                                </motion.div>
                                <span className="text-[10px] text-muted-foreground uppercase tracking-[0.5em] font-black opacity-30 mt-6 text-center w-full block">Interactive Flowchart</span>
                            </div>
                        );
                    } catch (e) {
                        codeNode = <div key={`mermaid-err-${index}`} className="text-red-500">Error rendering diagram</div>;
                    }
                } else {
                    codeNode = (
                        <pre key={`code-${index}`} className="p-6 rounded-2xl bg-muted/50 border border-border/40 mb-6 overflow-x-auto font-mono text-sm shadow-inner group">
                            <div className="flex justify-between mb-2">
                                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{codeLanguage || 'code'}</span>
                            </div>
                            <code className="text-primary">{codeContent}</code>
                        </pre>
                    );
                }
                addToCurrentSection(codeNode);
                inCodeBlock = false;
                codeContent = '';
                codeLanguage = '';
            } else {
                inCodeBlock = true;
                codeLanguage = trimmed.slice(3).toLowerCase();
            }
            return;
        }

        if (inCodeBlock) {
            codeContent += line + '\n';
            return;
        }

        if (!trimmed) {
            flushList(index);
            flushTable(index);
            flushQuote(index);
            return;
        }

        // Special PDLC Map Marker
        if (trimmed.includes('[PDLC_MAP]')) {
            flushList(index);
            flushTable(index);
            flushQuote(index);
            const mapNode = (
                <motion.div
                    key={`pdlc-map-${index}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="my-4 w-full flex justify-center overflow-visible z-10 relative"
                >
                    <div className="w-full max-w-4xl scale-90 origin-top">
                        <PDLCOverview />
                    </div>
                </motion.div>
            );
            addToCurrentSection(mapNode);
            return;
        }

        // List item
        if (line.match(/^\s*(\*|-)\s+/)) {
            flushTable(index);
            flushQuote(index);
            const indent = line.match(/^\s*/)?.[0].length || 0;
            currentList.push({ 
                text: line.trim().replace(/^(\*|-)\s+/, ''), 
                indent: Math.floor(indent / 2) 
            });
            return;
        }
        // Table row
        else if (trimmed.startsWith('|')) {
            flushList(index);
            flushQuote(index);
            if (trimmed.includes('---')) return;
            const cells = trimmed.split('|').filter(c => c.trim()).map(c => c.trim());
            currentTable.push(cells);
        }
        // Blockquote or Alert
        else if (trimmed.startsWith('>')) {
            flushList(index);
            flushTable(index);
            
            const alertMatch = trimmed.match(/^> \[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/);
            if (alertMatch) {
                if (currentQuote) flushQuote(index);
                currentQuote = {
                    type: alertMatch[1],
                    lines: [trimmed.replace(/^> \[!(.*?)\]\s*/, '').trim()].filter(Boolean)
                };
            } else {
                const quoteText = trimmed.replace(/^>\s*/, '').trim();
                if (currentQuote) {
                    currentQuote.lines.push(quoteText);
                } else {
                    currentQuote = {
                        type: null,
                        lines: [quoteText]
                    };
                }
            }
        }
        // Header (H3 to H6)
        else if (trimmed.match(/^#{3,6}/)) {
            flushList(index);
            flushTable(index);
            flushQuote(index);
            const level = trimmed.match(/^#+/)?.[0].length || 3;
            const text = trimmed.replace(/^#+\s+/, '');
            
            // Map header level to size
            const sizeClass = level === 3 ? "text-3xl font-bold" : "text-2xl font-bold";
            const borderClass = level === 3 ? "border-l-4 border-primary pl-4" : "border-l-2 border-primary/50 pl-3";
            
            const headerNode = (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`${sizeClass} text-foreground mt-4 mb-4 ${borderClass}`}
                >
                    <FormattedText text={text} />
                </motion.div>
            );
            addToCurrentSection(headerNode);
        }
        // Normal paragraph
        else {
            // Final safety: if it's a known structural marker, ignore it
            if (trimmed === '::' || trimmed === ':::' || trimmed === '::::') return;
            
            flushList(index);
            flushTable(index);
            flushQuote(index);

            const pNode = (
                <motion.p
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-2xl leading-relaxed text-muted-foreground mb-6"
                >
                    <FormattedText text={trimmed} />
                </motion.p>
            );
            addToCurrentSection(pNode);
        }
    });

    // Final flushes
    flushList(lines.length);
    flushTable(lines.length);
    flushQuote(lines.length);
    flushCols(lines.length);

    return <div className="space-y-4">{sections}</div>;
}

function FormattedText({ text }: { text: string | undefined | null }) {
    if (!text) return null;
    
    // Use a combined regex for all tokens to find the first match of any type
    // Hierarchy: Tooltip > Bold > Italic > Code > BR
    const regex = /(!!.*?!!)|(\?\[.*?\]\(.*?\))|(\*\*.*?\*\*)|(\*.*?\*)|(`.*?`)|(<br\s*\/?>)/gi;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    
    // We need to iterate through matches manually to preserve text between nodes
    const matches = Array.from(text.matchAll(regex));
    
    if (matches.length === 0) return <span>{normalizeText(text)}</span>;

    matches.forEach((match, i) => {
        // Text before the match
        if (match.index > lastIndex) {
            parts.push(<span key={`text-${i}`}>{normalizeText(text.slice(lastIndex, match.index))}</span>);
        }

        const fullMatch = match[0];
        
        // Identify which token matched and process recursively if needed
        if (fullMatch.startsWith('!!') && fullMatch.endsWith('!!')) {
            parts.push(
                <span 
                    key={`placeholder-${i}`} 
                    className="italic text-muted-foreground/60 underline decoration-dotted underline-offset-4 decoration-muted-foreground/30 inline-block mx-0.5"
                >
                    <FormattedText text={fullMatch.slice(2, -2)} />
                </span>
            );
        }
        else if (fullMatch.match(/^\?\[(.*?)\]\((.*?)\)$/i)) {
            const tooltipMatch = fullMatch.match(/^\?\[(.*?)\]\((.*?)\)$/i);
            if (tooltipMatch) {
                const [_, label, content] = tooltipMatch;
                parts.push(<InteractiveTooltip key={`tooltip-${i}`} label={label} content={content} />);
            }
        } 
        else if (fullMatch.startsWith('**') && fullMatch.endsWith('**')) {
            parts.push(<b key={`bold-${i}`} className="text-foreground font-bold"><FormattedText text={fullMatch.slice(2, -2)} /></b>);
        }
        else if (fullMatch.startsWith('*') && fullMatch.endsWith('*')) {
            parts.push(<i key={`italic-${i}`} className="italic"><FormattedText text={fullMatch.slice(1, -1)} /></i>);
        }
        else if (fullMatch.startsWith('`') && fullMatch.endsWith('`')) {
            parts.push(<code key={`code-${i}`} className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-sm font-mono mx-0.5">{fullMatch.slice(1, -1)}</code>);
        }
        else if (fullMatch.toLowerCase().startsWith('<br')) {
            parts.push(<br key={`br-${i}`} />);
        }

        lastIndex = match.index + fullMatch.length;
    });

    // Remainder text
    if (lastIndex < text.length) {
        parts.push(<span key="text-last">{normalizeText(text.slice(lastIndex))}</span>);
    }

    return <>{parts}</>;
}

// Helper function to normalize text for consistent typography
function normalizeText(text: string): string {
    return text
        // Normalize acronyms to uppercase
        .replace(/\bprd\b/gi, 'PRD')
        .replace(/\bgtm\b/gi, 'GTM')
        .replace(/\bai\b/gi, 'AI')
        // Normalize 'and' to lowercase
        .replace(/\bAnd\b/g, 'and')
        .replace(/\bAND\b/g, 'and');
}

function InteractiveTooltip({ label, content }: { label: string, content: string }) {
    const [open, setOpen] = useState(false);
    const isTouch = useRef(false);

    useEffect(() => {
        isTouch.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }, []);

    const handleMouseEnter = () => {
        if (!isTouch.current) setOpen(true);
    };

    const handleMouseLeave = () => {
        if (!isTouch.current) setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <span 
                    className="underline decoration-dotted underline-offset-4 decoration-primary/30 cursor-help hover:text-primary transition-colors inline-block mx-1"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <FormattedText text={label} />
                </span>
            </PopoverTrigger>
            <PopoverContent 
                className="w-80 p-5 rounded-2xl border-border bg-card shadow-2xl z-[200] animate-in fade-in zoom-in-95 duration-200 pointer-events-none sm:pointer-events-auto" 
                side="top" 
                align="center"
                sideOffset={10}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="text-sm leading-relaxed text-foreground font-normal">
                    <FormattedText text={content} />
                </div>
            </PopoverContent>
        </Popover>
    );
}


