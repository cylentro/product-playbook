'use client';
import { useAppStore } from '@/store/appStore';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command';
import { 
    BookOpen, 
    FileText, 
    Workflow, 
    Brain, 
    Home,
    Presentation,
    GraduationCap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationItem {
    title: string;
    slug: string;
    moduleSlug: string;
    type: 'module' | 'chapter';
    icon?: string;
    isSubchapter?: boolean;
    hasPresentation?: boolean;
}

interface CommandPaletteProps {
    initialData?: {
        modules: { title: string; slug: string; icon: string; description: string }[];
        chapters: NavigationItem[];
    };
}

const iconMap: Record<string, React.ReactNode> = {
    Workflow: <Workflow className="h-4 w-4" />,
    FileText: <FileText className="h-4 w-4" />,
    Brain: <Brain className="h-4 w-4" />,
    BookOpen: <BookOpen className="h-4 w-4" />,
};

export function CommandPalette({ initialData }: CommandPaletteProps) {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const mode = useAppStore((state) => state.mode);

    const data = initialData;

    // Listen for ⌘K / Ctrl+K
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((prev) => !prev);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const handleSelect = useCallback((item: NavigationItem | { type: 'home' | 'module'; slug?: string }) => {
        setOpen(false);
        
        if (item.type === 'home') {
            router.push('/');
        } else if (item.type === 'module' && 'slug' in item) {
            router.push(`/module/${item.slug}`);
        } else if ('moduleSlug' in item) {
            const path = item.moduleSlug === 'standalone' 
                ? `/lesson/${item.slug}` 
                : `/module/${item.moduleSlug}/${item.slug}`;
            
            // Determine target mode based on current mode and chapter capabilities
            let targetMode: 'presentation' | 'learning' | 'quiz' = 'learning';
            
            if (mode === 'presentation' && 'hasPresentation' in item && item.hasPresentation) {
                // If currently in presentation mode and chapter supports it, stay in presentation
                targetMode = 'presentation';
            } else if (mode === 'learning') {
                // If in learning mode, stay in learning mode
                targetMode = 'learning';
            } else {
                // If in quiz mode or presentation mode but chapter doesn't support it, go to learning
                targetMode = 'learning';
            }
            
            router.push(`${path}?mode=${targetMode}`);
        }
    }, [router, mode]);

    if (!data) return null;

    return (
        <CommandDialog 
            open={open} 
            onOpenChange={setOpen}
            title="Command Palette"
            description="Navigate to any module or chapter"
            showCloseButton={false}
        >
            <CommandInput placeholder="Search modules and chapters..." />
            <CommandList className="max-h-[60vh]" data-lenis-prevent>
                <CommandEmpty>No results found.</CommandEmpty>
                
                {/* Quick Actions */}
                <CommandGroup heading="Quick Actions">
                    <CommandItem
                        onSelect={() => handleSelect({ type: 'home' })}
                        className="gap-3 py-3"
                    >
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Home className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium">Go to Homepage</span>
                            <span className="text-xs text-muted-foreground">Return to the main page</span>
                        </div>
                    </CommandItem>
                </CommandGroup>
 
                <CommandSeparator />

                {/* Modules */}
                <CommandGroup heading="Modules">
                    {data.modules.map((module) => (
                        <CommandItem
                            key={module.slug}
                            value={`module ${module.title}`}
                            onSelect={() => handleSelect({ type: 'module', slug: module.slug })}
                            className="gap-3 py-3"
                        >
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                {iconMap[module.icon] || <BookOpen className="h-4 w-4" />}
                            </div>
                            <div className="flex flex-col">
                                <span className="font-medium">{module.title}</span>
                                <span className="text-xs text-muted-foreground">{module.description}</span>
                            </div>
                        </CommandItem>
                    ))}
                </CommandGroup>

                <CommandSeparator />

                {/* Expert Guides */}
                <CommandGroup heading="Expert Guides">
                    {data.chapters
                        .filter(c => c.moduleSlug === 'standalone')
                        .map((chapter) => (
                            <CommandItem
                                key={chapter.slug}
                                value={`expert ${chapter.title}`}
                                onSelect={() => handleSelect(chapter)}
                                className="gap-3 py-2.5"
                            >
                                <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
                                    {chapter.icon ? iconMap[chapter.icon] : <GraduationCap className="h-3.5 w-3.5" />}
                                </div>
                                <span className="font-medium text-sm">{chapter.title}</span>
                            </CommandItem>
                        ))}
                </CommandGroup>

                <CommandSeparator />

                {/* All Chapters */}
                <CommandGroup heading="All Chapters">
                    {data.chapters
                        .filter(c => c.moduleSlug !== 'standalone')
                        .map((chapter) => {
                            const module = data.modules.find(m => m.slug === chapter.moduleSlug);
                            return (
                                <CommandItem
                                    key={`${chapter.moduleSlug}-${chapter.slug}`}
                                    value={`chapter ${chapter.title} ${module?.title || ''}`}
                                    onSelect={() => handleSelect(chapter)}
                                    className={cn(
                                        "gap-3 py-2",
                                        chapter.isSubchapter && "ml-6 opacity-80"
                                    )}
                                >
                                    <div className={cn(
                                        "w-6 h-6 rounded-md bg-muted flex items-center justify-center",
                                        chapter.isSubchapter && "w-5 h-5"
                                    )}>
                                        {chapter.isSubchapter ? (
                                            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
                                        ) : (
                                            <Presentation className="h-3 w-3 text-muted-foreground" />
                                        )}
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className={cn(
                                            "font-medium truncate",
                                            chapter.isSubchapter ? "text-xs" : "text-sm"
                                        )}>{chapter.title}</span>
                                        {!chapter.isSubchapter && module && (
                                            <span className="text-[10px] text-muted-foreground truncate">
                                                {module.title}
                                            </span>
                                        )}
                                    </div>
                                </CommandItem>
                            );
                        })}
                </CommandGroup>
            </CommandList>
            
            {/* Keyboard Hint Footer */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-border/40 bg-muted/30 text-[10px] text-muted-foreground">
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 rounded border border-border bg-background font-mono">↑↓</kbd>
                        Navigate
                    </span>
                    <span className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 rounded border border-border bg-background font-mono">↵</kbd>
                        Select
                    </span>
                    <span className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 rounded border border-border bg-background font-mono">Esc</kbd>
                        Close
                    </span>
                </div>
            </div>
        </CommandDialog>
    );
}
