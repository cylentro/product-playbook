'use client';

import { useState, useEffect } from 'react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Keyboard, MousePointer2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ShortcutGroup {
    title: string;
    shortcuts: {
        keys: string[];
        description: string;
        mac?: boolean; // If true, show ONLY on Mac
        winLink?: boolean; // If true, show ONLY on Windows/Linux
    }[];
}

const KEYBOARD_SHORTCUTS: ShortcutGroup[] = [
    {
        title: 'Global Navigation',
        shortcuts: [
            { keys: ['⌘', 'K'], description: 'Open command palette', mac: true },
            { keys: ['Ctrl', 'K'], description: 'Open command palette', winLink: true },
            { keys: ['?'], description: 'Open navigation guide' },
            { keys: ['Esc'], description: 'Close navigation guide' },
        ],
    },
    {
        title: 'Module Mode',
        shortcuts: [
            { keys: ['↑', '↓'], description: 'Navigate chapters' },
            { keys: ['J', 'K'], description: 'Navigate chapters (Vim-style)' },
            { keys: ['Enter'], description: 'Open selected chapter' },
            { keys: ['Esc'], description: 'Back to homepage' },
        ],
    },
    {
        title: 'Lesson Mode',
        shortcuts: [
            { keys: ['⌘', 'P'], description: 'Presentation mode', mac: true },
            { keys: ['Ctrl', 'P'], description: 'Presentation mode', winLink: true },
            { keys: ['⌘', 'L'], description: 'Learning mode', mac: true },
            { keys: ['Ctrl', 'L'], description: 'Learning mode', winLink: true },
            { keys: ['⌘', 'O'], description: 'Quiz mode', mac: true },
            { keys: ['Ctrl', 'O'], description: 'Quiz mode', winLink: true },
        ],
    },
    {
        title: 'Presentation Mode',
        shortcuts: [
            { keys: ['→', 'Space'], description: 'Next slide' },
            { keys: ['←'], description: 'Previous slide' },
            { keys: ['Esc'], description: 'Exit fullscreen' },
        ],
    },
];

const MOUSE_SHORTCUTS: ShortcutGroup[] = [
    {
        title: 'Learning Mode',
        shortcuts: [
            { keys: ['Click Left Edge'], description: 'Scroll up' },
            { keys: ['Click Right Edge'], description: 'Scroll down' },
        ],
    },
    {
        title: 'Presentation',
        shortcuts: [
            { keys: ['Click Left Edge'], description: 'Previous slide' },
            { keys: ['Click Right Edge'], description: 'Next slide' },
        ],
    },
    {
        title: 'Module Page',
        shortcuts: [
            { keys: ['Hover Row'], description: 'Highlight chapter' },
            { keys: ['Click Row'], description: 'Open chapter or lesson' },
        ],
    },
];

function KeyboardKey({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <kbd className={cn(
            "px-2 py-1 min-w-[2rem] text-center rounded-md border border-border bg-muted/50 font-mono text-xs font-semibold inline-flex items-center justify-center shadow-sm whitespace-nowrap",
            className
        )}>
            {children}
        </kbd>
    );
}

export function KeyboardShortcutsDialog() {
    const [open, setOpen] = useState(false);
    const [isMac, setIsMac] = useState(false);

    useEffect(() => {
        // Simple OS detection
        const platform = navigator.platform.toUpperCase();
        const isMacOs = platform.indexOf('MAC') >= 0;
        setIsMac(isMacOs);

        // Listen for ? key to open help
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === '?' && !e.metaKey && !e.ctrlKey && !e.altKey) {
                const target = e.target as HTMLElement;
                if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;
                
                e.preventDefault();
                setOpen(true);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const filterShortcuts = (groups: ShortcutGroup[]) => groups.map(group => ({
        ...group,
        shortcuts: group.shortcuts.filter(shortcut => {
            if (shortcut.mac) return isMac;
            if (shortcut.winLink) return !isMac;
            return true;
        }),
    })).filter(group => group.shortcuts.length > 0);

    const filteredKeyboard = filterShortcuts(KEYBOARD_SHORTCUTS);
    const filteredMouse = filterShortcuts(MOUSE_SHORTCUTS);

    return (
        <>
            {/* Floating Help Button - Lower z-index to stay below Sheet */}
            <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex fixed bottom-6 right-6 z-40 h-14 w-14 rounded-2xl bg-primary/10 hover:bg-primary/20 transition-all hover:scale-105"
                onClick={() => setOpen(true)}
                aria-label="Navigation guide"
            >
                <Keyboard className="h-6 w-6 text-primary" />
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent className="overflow-hidden flex flex-col gap-0 p-0 w-full sm:max-w-md [&>button]:hidden" data-lenis-prevent>
                    {/* Header */}
                    <div className="px-6 pt-6 pb-4 border-b border-border/40 shrink-0 bg-background">
                        <div className="flex flex-row items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Keyboard className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-semibold">Navigation Guide</h2>
                            </div>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-10 w-10 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary transition-all hover:scale-105"
                                onClick={() => setOpen(false)}
                            >
                                <span className="sr-only">Close</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-5 w-5"
                                >
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Master {isMac ? 'Mac' : 'Windows'} shortcuts & controls
                        </p>
                    </div>

                    {/* Tabs */}
                    <Tabs defaultValue="keyboard" className="flex-1 flex flex-col overflow-hidden">
                        <TabsList className="w-full bg-transparent border-b border-border/40 p-0 h-auto rounded-none flex shrink-0 px-6">
                            <TabsTrigger 
                                value="keyboard" 
                                className="relative flex-1 rounded-none bg-transparent py-4 px-0 text-muted-foreground hover:text-foreground data-[state=active]:text-primary data-[state=active]:shadow-none transition-all after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:opacity-0 data-[state=active]:after:opacity-100"
                            >
                                <div className="flex items-center gap-2 font-medium">
                                    <Keyboard className="h-4 w-4" />
                                    Keyboard
                                </div>
                            </TabsTrigger>
                            <TabsTrigger 
                                value="mouse" 
                                className="relative flex-1 rounded-none bg-transparent py-4 px-0 text-muted-foreground hover:text-foreground data-[state=active]:text-primary data-[state=active]:shadow-none transition-all after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:opacity-0 data-[state=active]:after:opacity-100"
                            >
                                <div className="flex items-center gap-2 font-medium">
                                    <MousePointer2 className="h-4 w-4" />
                                    Mouse
                                </div>
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="keyboard" className="flex-1 overflow-y-auto px-6 py-6 m-0" data-lenis-prevent>
                            <div className="space-y-8">
                                {filteredKeyboard.map((group, groupIndex) => (
                                    <div key={groupIndex}>
                                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-4">
                                            {group.title}
                                        </h3>
                                        <div className="space-y-2">
                                            {group.shortcuts.map((shortcut, shortcutIndex) => (
                                                <div
                                                    key={shortcutIndex}
                                                    className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-muted/50 transition-colors"
                                                >
                                                    <span className="text-sm font-medium text-foreground">
                                                        {shortcut.description}
                                                    </span>
                                                    <div className="flex items-center gap-1.5 ml-4">
                                                        {shortcut.keys.map((key, keyIndex) => (
                                                            <KeyboardKey key={keyIndex}>
                                                                {key}
                                                            </KeyboardKey>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="mouse" className="flex-1 overflow-y-auto px-6 py-6 m-0" data-lenis-prevent>
                            <div className="space-y-8">
                                {filteredMouse.map((group, groupIndex) => (
                                    <div key={groupIndex}>
                                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-4">
                                            {group.title}
                                        </h3>
                                        <div className="space-y-2">
                                            {group.shortcuts.map((shortcut, shortcutIndex) => (
                                                <div
                                                    key={shortcutIndex}
                                                    className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-muted/50 transition-colors"
                                                >
                                                    <span className="text-sm font-medium text-foreground">
                                                        {shortcut.description}
                                                    </span>
                                                    <div className="flex items-center gap-1.5 ml-4">
                                                        {shortcut.keys.map((key, keyIndex) => (
                                                            <KeyboardKey key={keyIndex}>
                                                                {key}
                                                            </KeyboardKey>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </SheetContent>
            </Sheet>
        </>
    );
}
