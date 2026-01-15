import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllModules, getModuleLessons } from '@/lib/markdown';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Clock, BookOpen, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModulePageProps {
    params: Promise<{ moduleSlug: string }>;
}

export async function generateStaticParams() {
    const modules = await getAllModules();
    return modules.map((module) => ({
        moduleSlug: module.slug,
    }));
}

export default async function ModulePage({ params }: ModulePageProps) {
    const { moduleSlug } = await params;
    const modules = await getAllModules();
    const currentModule = modules.find((m) => m.slug === moduleSlug);

    if (!currentModule) {
        notFound();
    }

    const lessons = await getModuleLessons(moduleSlug);
    const totalTime = lessons.reduce((acc, l) => acc + l.estimatedTime, 0);

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
                        {currentModule.title}
                    </h1>
                    <p className="text-lg text-muted-foreground mb-6 max-w-2xl leading-relaxed">
                        {currentModule.description}
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
                    <div className="px-4 py-2 border-b border-border/40 mb-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Chapters</span>
                    </div>
                    {(() => {
                        let topLevelIndex = 0;
                        return lessons.map((lesson) => {
                            if (!lesson.isSubchapter) {
                                topLevelIndex++;
                            }

                            return (
                                <Link
                                    key={lesson.slug}
                                    href={`/module/${moduleSlug}/${lesson.slug}`}
                                    className={cn(
                                        "block group relative transition-all duration-300",
                                        lesson.isSubchapter && "ml-12"
                                    )}
                                >
                                    <div className={cn(
                                        "flex items-center justify-between p-4 rounded-2xl transition-all duration-300 hover:bg-primary/[0.03] group-hover:px-6",
                                        lesson.isSubchapter && "p-3 py-2"
                                    )}>
                                        <div className="flex items-center gap-6">
                                            {lesson.isSubchapter ? (
                                                <div className="flex items-center justify-center w-5 h-5">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30 group-hover:bg-primary transition-colors" />
                                                </div>
                                            ) : (
                                                <span className="font-mono text-sm font-black text-muted-foreground/30 group-hover:text-primary transition-colors w-5 text-center">
                                                    {topLevelIndex.toString().padStart(2, '0')}
                                                </span>
                                            )}
                                            <div className="flex flex-col">
                                                <h3 className={cn(
                                                    "font-bold text-foreground group-hover:text-primary transition-colors leading-tight",
                                                    lesson.isSubchapter ? "text-base" : "text-lg"
                                                )}>
                                                    {lesson.title}
                                                </h3>
                                                <div className="flex items-center gap-3 mt-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
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
                                        <div className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
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
