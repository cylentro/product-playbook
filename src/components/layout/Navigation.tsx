'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ChevronRight, BookOpen, FileText, Workflow, Brain } from 'lucide-react';
import type { ModuleMeta } from '@/lib/types';

interface NavigationProps {
    modules: ModuleMeta[];
}

const iconMap: Record<string, React.ReactNode> = {
    Workflow: <Workflow className="h-4 w-4" />,
    FileText: <FileText className="h-4 w-4" />,
    Brain: <Brain className="h-4 w-4" />,
    BookOpen: <BookOpen className="h-4 w-4" />,
};

export function Navigation({ modules }: NavigationProps) {
    const pathname = usePathname();

    return (
        <nav className="space-y-2 p-4">
            <div className="mb-4 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Modules
            </div>

            {modules.map((module, index) => (
                <motion.div
                    key={module.slug}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                >
                    <ModuleItem module={module} pathname={pathname} />
                </motion.div>
            ))}
        </nav>
    );
}

function ModuleItem({ module, pathname }: { module: ModuleMeta; pathname: string }) {
    const isActive = pathname.includes(`/module/${module.slug}`);
    const Icon = iconMap[module.icon] || iconMap.BookOpen;

    return (
        <div className="space-y-1">
            <Link
                href={`/module/${module.slug}`}
                className={cn(
                    'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all',
                    'hover:bg-accent/50',
                    isActive && 'bg-accent text-accent-foreground'
                )}
            >
                <div
                    className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-lg transition-colors',
                        isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                    )}
                >
                    {Icon}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{module.title}</div>
                    <div className="text-xs text-muted-foreground">
                        {module.lessons.length} lessons
                    </div>
                </div>
                <ChevronRight
                    className={cn(
                        'h-4 w-4 text-muted-foreground transition-transform',
                        isActive && 'rotate-90'
                    )}
                />
            </Link>

            {/* Lesson List */}
            {isActive && module.lessons.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="ml-11 space-y-0.5 border-l-2 border-border/50 pl-3"
                >
                    {module.lessons.map((lesson) => {
                        const lessonActive = pathname.includes(`/${lesson.slug}`);

                        return (
                            <Link
                                key={lesson.slug}
                                href={`/module/${module.slug}/${lesson.slug}`}
                                className={cn(
                                    'block rounded-md px-2 py-1.5 text-sm transition-colors',
                                    'hover:bg-accent/50',
                                    lessonActive
                                        ? 'bg-accent/70 text-accent-foreground font-medium'
                                        : 'text-muted-foreground'
                                )}
                            >
                                {lesson.title}
                            </Link>
                        );
                    })}
                </motion.div>
            )}
        </div>
    );
}
