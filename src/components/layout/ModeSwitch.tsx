'use client';

import { motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { cn } from '@/lib/utils';
import { Presentation, BookOpen, HelpCircle } from 'lucide-react';
import type { LearningMode } from '@/lib/types';

import { useRouter, usePathname } from 'next/navigation';

const modes: { id: LearningMode; label: string; icon: React.ReactNode; description: string }[] = [
    {
        id: 'presentation',
        label: 'Present',
        icon: <Presentation className="h-4 w-4" />,
        description: 'Slide-based view',
    },
    {
        id: 'learning',
        label: 'Learn',
        icon: <BookOpen className="h-4 w-4" />,
        description: 'Full content',
    },
    {
        id: 'quiz',
        label: 'Quiz',
        icon: <HelpCircle className="h-4 w-4" />,
        description: 'Test knowledge',
    },
];

interface ModeSwitchProps {
    showPresent?: boolean;
    showQuiz?: boolean;
}

export function ModeSwitch({ showPresent = true, showQuiz = true }: ModeSwitchProps) {
    const { mode, setMode, setPresentationFullscreen } = useAppStore();
    const router = useRouter();
    const pathname = usePathname();

    const filteredModes = modes.filter(m => {
        if (m.id === 'presentation') return showPresent;
        if (m.id === 'quiz') return showQuiz;
        return true;
    });

    const handleModeChange = (newMode: LearningMode) => {
        setMode(newMode);
        
        // Update URL
        router.push(`${pathname}?mode=${newMode}`);

        // When entering presentation mode, start in immersive mode (menu bar hidden)
        if (newMode === 'presentation') {
            setPresentationFullscreen(true);
        } else {
            setPresentationFullscreen(false);
        }
    };

    return (
        <div className="relative flex items-center gap-1 rounded-full bg-muted/50 p-1 backdrop-blur-sm">
            {filteredModes.map((m) => (
                <button
                    key={m.id}
                    onClick={() => handleModeChange(m.id)}
                    className={cn(
                        'relative flex items-center justify-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
                        'hover:text-foreground',
                        mode === m.id ? 'text-foreground' : 'text-muted-foreground',
                        m.id === 'presentation' && 'hidden sm:flex'
                    )}
                    title={m.description}
                >
                    {mode === m.id && (
                        <motion.div
                            layoutId="mode-indicator"
                            className="absolute inset-0 rounded-full bg-background shadow-sm ring-1 ring-border/50"
                            transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                        />
                    )}
                    <span className="relative z-10 flex items-center justify-center gap-1.5 w-full">
                        <span className="flex items-center justify-center h-4 w-4">
                            {m.icon}
                        </span>
                        <span className="hidden sm:inline">{m.label}</span>
                    </span>
                </button>
            ))}
        </div>
    );
}
