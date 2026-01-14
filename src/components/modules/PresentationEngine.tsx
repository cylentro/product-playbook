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
    allLessons?: { slug: string; title: string; moduleSlug: string }[];
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
    const isTitleSlide = currentSlideData && (currentSlideData.content.trim().startsWith('# ') || (currentSlideData.content.trim().length < 50 && currentSlide === 0));

    return (
        <div
            ref={containerRef}
            className={cn(
                "fixed inset-0 flex flex-col bg-background overflow-hidden select-none transition-all duration-300 z-40",
                !presentationFullscreen && "top-16"
            )}
        >
            {/* Click Areas for Navigation - Narrower at z-50 to stay on top but not block content */}
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
                                        <Link href={allLessons?.[0]?.moduleSlug ? `/module/${allLessons[0].moduleSlug}` : '/'} aria-label="Go back">
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
                                                <button className="flex flex-col items-start px-2 py-1 rounded-lg hover:bg-primary/5 transition-all text-left group">
                                                    <div className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60 leading-none mb-1 group-hover:text-muted-foreground/80">{moduleTitle}</div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-bold tracking-tight text-foreground truncate max-w-[200px] md:max-w-md group-hover:text-primary transition-colors">
                                                            {title}
                                                        </span>
                                                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                                                    </div>
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent className="p-0 w-[350px]" align="start">
                                                <Command>
                                                    <CommandInput placeholder="Search chapters..." />
                                                    <CommandList>
                                                        <CommandEmpty>No chapter found.</CommandEmpty>
                                                        <CommandGroup heading="Chapters">
                                                            {allLessons.map((l, i) => {
                                                                const isCurrent = l.title === title;
                                                                return (
                                                                    <CommandItem
                                                                        key={l.slug}
                                                                        value={l.title}
                                                                        onSelect={() => {
                                                                            router.push(`/module/${l.moduleSlug}/${l.slug}?mode=presentation`);
                                                                            setChaptersOpen(false);
                                                                        }}
                                                                        className={cn(
                                                                            "gap-2 cursor-pointer py-3",
                                                                            isCurrent && "bg-accent text-accent-foreground"
                                                                        )}
                                                                    >
                                                                        <div className={cn(
                                                                            "w-6 h-6 flex items-center justify-center rounded-md font-mono text-[10px] font-bold border shrink-0",
                                                                            isCurrent 
                                                                                ? "bg-primary text-white border-primary" 
                                                                                : "bg-muted text-muted-foreground border-border"
                                                                        )}>
                                                                            {i + 1}
                                                                        </div>
                                                                        <span className="truncate flex-1 font-medium">{l.title}</span>
                                                                        {isCurrent && <Check className="w-4 h-4 text-primary ml-auto" />}
                                                                    </CommandItem>
                                                                );
                                                            })}
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
                    
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <button className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-primary/10 transition-colors group">
                                <span className="text-xs font-mono font-bold text-muted-foreground group-hover:text-primary transition-colors">
                                    {currentSlide + 1} / {slides.length}
                                </span>
                                <List className="w-3 h-3 text-muted-foreground/60 group-hover:text-primary transition-colors" />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 w-[300px]" align="end">
                            <Command>
                                <CommandInput placeholder="Search slides..." />
                                <CommandList>
                                    <CommandEmpty>No slide found.</CommandEmpty>
                                    <CommandGroup heading="Slides">
                                        {slides.map((s, i) => (
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
                                                    "gap-2 cursor-pointer",
                                                    i === currentSlide && "bg-accent text-accent-foreground"
                                                )}
                                            >
                                                <span className={cn(
                                                    "w-5 h-5 flex items-center justify-center rounded-md text-[10px] font-mono font-bold border",
                                                    i === currentSlide ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground border-border"
                                                )}>
                                                    {i + 1}
                                                </span>
                                                <span className="truncate flex-1">{s.title}</span>
                                                {i === currentSlide && <Zap className="w-3 h-3 text-primary ml-auto" />}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
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
    // Detect if this is a Title Slide (H1 in markdown or just short content)
    const isTitleSlide = slide.content.trim().startsWith('# ') || (slide.content.trim().length < 50 && index === 0);
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
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-primary/10 via-background to-primary/5 blur-3xl opacity-50" />
                    <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-primary/20 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
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
                        <p className="text-2xl md:text-3xl text-muted-foreground max-w-3xl font-medium leading-relaxed tracking-tight">
                            PM Playbook: Mastering the Art of Product Engineering
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
                            <div className="lg:col-span-4 overflow-y-auto no-scrollbar h-full pb-20">
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
                        <div className="overflow-y-auto pr-4 no-scrollbar pb-20 h-full w-full">
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

    let currentList: string[] = [];
    let currentTable: string[][] = [];
    let inCodeBlock = false;
    let codeContent = '';
    let codeLanguage = '';

    const flushList = (key: number) => {
        if (currentList.length > 0) {
            sections.push(
                <motion.ul
                    key={`list-${key}`}
                    className="space-y-4 mb-6 pl-7"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: { transition: { staggerChildren: 0.1 } }
                    }}
                >
                    {currentList.map((item, i) => (
                        <motion.li
                            key={i}
                            variants={{
                                hidden: { opacity: 0, x: -10 },
                                visible: { opacity: 1, x: 0 }
                            }}
                            className="flex items-start gap-3 text-lg md:text-xl text-muted-foreground group"
                        >
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1 group-hover:scale-110 transition-transform">
                                <ChevronRight className="w-4 h-4" />
                            </span>
                            <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
                        </motion.li>
                    ))}
                </motion.ul>
            );
            currentList = [];
        }
    };

    const flushTable = (key: number) => {
        if (currentTable.length > 0) {
            sections.push(
                <div key={`table-wrapper-${key}`} className="relative overflow-hidden rounded-xl border border-border/40 mb-6 mt-3 group ml-7">
                    <div className="absolute inset-0 bg-primary/5 opacity-20 transition-opacity" />
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-border/40 bg-muted/30">
                                    {currentTable[0].map((cell, i) => (
                                        <th key={i} className="px-3 py-2 font-semibold text-foreground text-xs uppercase tracking-wider">
                                            {cell}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/20">
                                {currentTable.slice(1).map((row, i) => (
                                    <tr key={i} className="hover:bg-primary/5 transition-colors group/row">
                                        {row.map((cell, j) => (
                                            <td key={j} className="px-3 py-2 text-sm text-muted-foreground group-hover/row:text-foreground transition-colors">
                                                <div dangerouslySetInnerHTML={{ __html: formatInline(cell) }} />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
            currentTable = [];
        }
    };

    lines.forEach((line, index) => {
        const trimmed = line.trim();

        // Handle code blocks
        if (trimmed.startsWith('```')) {
            if (inCodeBlock) {
                // Flush code block
                if (codeLanguage === 'mermaid' || codeLanguage === 'mermaidjs') {
                    // Simple mermaid rendering using mermaid.ink
                    try {
                        const encoded = btoa(codeContent.trim()).replace(/\+/g, '-').replace(/\//g, '_');
                        sections.push(
                            <div key={`mermaid-${index}`} className="my-14 w-full flex flex-col items-center overflow-visible">
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-muted/5 p-6 md:p-10 rounded-[3rem] border border-border/60 w-full flex justify-center items-center group/mermaid transition-all duration-500"
                                >
                                    <img 
                                        src={`https://mermaid.ink/svg/${encoded}`} 
                                        alt="Mermaid diagram" 
                                        className="w-full h-auto max-h-[80vh] object-contain transition-transform duration-700 group-hover/mermaid:scale-[1.01]" 
                                    />
                                </motion.div>
                                <span className="text-[10px] text-muted-foreground uppercase tracking-[0.5em] font-black opacity-30 mt-10">Interactive Flowchart</span>
                            </div>
                        );
                    } catch (e) {
                        sections.push(<div key={`mermaid-err-${index}`} className="text-red-500 pl-7">Error rendering diagram</div>);
                    }
                } else {
                    sections.push(
                        <pre key={`code-${index}`} className="p-6 rounded-2xl bg-muted/50 border border-border/40 mb-6 overflow-x-auto font-mono text-sm shadow-inner group">
                            <div className="flex justify-between mb-2">
                                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{codeLanguage || 'code'}</span>
                            </div>
                            <code className="text-primary">{codeContent}</code>
                        </pre>
                    );
                }
                inCodeBlock = false;
                codeContent = '';
                codeLanguage = '';
            } else {
                flushList(index);
                flushTable(index);
                inCodeBlock = true;
                codeLanguage = trimmed.slice(3).toLowerCase();
            }
            return;
        }

        if (inCodeBlock) {
            codeContent += line + '\n';
            return;
        }

        if (!trimmed) return;

        // Special PDLC Map Marker (Check first to avoid it being treated as a list item)
        if (trimmed.includes('[PDLC_MAP]')) {
            flushList(index);
            flushTable(index);
            sections.push(
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
            return;
        }

        // List item
        if (trimmed.match(/^(\*|-)\s+/)) {
            currentList.push(trimmed.replace(/^(\*|-)\s+/, ''));
        }
        // Table row
        else if (trimmed.startsWith('|')) {
            if (trimmed.includes('---')) return;
            const cells = trimmed.split('|').filter(c => c.trim()).map(c => c.trim());
            currentTable.push(cells);
        }
        // Subheader (H3)
        else if (trimmed.startsWith('###')) {
            flushList(index);
            flushTable(index);
            const text = trimmed.replace(/^###\s+/, '');
            sections.push(
                <motion.h3
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-2xl font-bold text-foreground mt-4 mb-4 border-l-4 border-primary pl-4 ml-7"
                    dangerouslySetInnerHTML={{ __html: formatInline(text) }}
                />
            );
        }
        // Normal paragraph or Callout
        else {
            flushList(index);
            flushTable(index);

            // GitHub Alerts
            if (trimmed.startsWith('> [!')) {
                const match = trimmed.match(/^> \[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/);
                if (match) {
                    const type = match[1];
                    const text = trimmed.replace(/^> \[!(.*?)\]\s*/, '');
                    const alertStyles: Record<string, any> = {
                        NOTE: { icon: <Info className="w-5 h-5" />, color: "bg-blue-500/10 border-blue-500/50 text-blue-700 dark:text-blue-300" },
                        TIP: { icon: <Zap className="w-5 h-5" />, color: "bg-emerald-500/10 border-emerald-500/50 text-emerald-700 dark:text-emerald-300" },
                        IMPORTANT: { icon: <Workflow className="w-5 h-5" />, color: "bg-purple-500/10 border-purple-500/50 text-purple-700 dark:text-purple-300" },
                        WARNING: { icon: <AlertTriangle className="w-5 h-5" />, color: "bg-amber-500/10 border-amber-500/50 text-amber-700 dark:text-amber-300" },
                        CAUTION: { icon: <AlertCircle className="w-5 h-5" />, color: "bg-red-500/10 border-red-500/50 text-red-700 dark:text-red-300" }
                    };
                    const style = alertStyles[type];
                    sections.push(
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={cn("p-6 rounded-2xl border flex gap-4 mb-6 shadow-sm ml-7", style.color)}
                        >
                            <div className="flex-shrink-0 mt-1">{style.icon}</div>
                            <div className="text-lg font-medium" dangerouslySetInnerHTML={{ __html: formatInline(text) }} />
                        </motion.div>
                    );
                    return;
                }
            }

            // Standard Quote
            if (trimmed.startsWith('>')) {
                const text = trimmed.replace(/^>\s*/, '');
                sections.push(
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-6 rounded-2xl bg-primary/5 border border-primary/20 flex gap-4 mb-6 shadow-sm ml-7"
                    >
                        <Lightbulb className="w-6 h-6 text-primary flex-shrink-0" />
                        <div className="text-lg italic text-muted-foreground" dangerouslySetInnerHTML={{ __html: formatInline(text) }} />
                    </motion.div>
                );
            } else {
                sections.push(
                    <motion.p
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xl leading-relaxed text-muted-foreground mb-6 pl-7"
                        dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }}
                    />
                );
            }
        }
    });

    // Final flushes
    flushList(lines.length);
    flushTable(lines.length);

    return <div className="space-y-4">{sections}</div>;
}

function formatInline(text: string): string {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<b class="text-foreground font-bold">$1</b>')
        .replace(/\*(.*?)\*/g, '<i class="italic">$1</i>')
        .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-sm font-mono">$1</code>');
}

