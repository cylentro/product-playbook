'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/appStore';
import { Menu, X, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeSwitch } from './ModeSwitch';
import Link from 'next/link';

interface AppShellProps {
    children: React.ReactNode;
    sidebar?: React.ReactNode;
    showBackButton?: boolean;
    backHref?: string;
    title?: string;
}

export function AppShell({
    children,
    sidebar,
    showBackButton = false,
    backHref = '/',
    title
}: AppShellProps) {
    const { sidebarOpen, toggleSidebar, setSidebarOpen, presentationFullscreen } = useAppStore();

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-[500] h-16 border-b border-border/40 bg-background/80 backdrop-blur-xl transition-transform duration-300",
                    presentationFullscreen && "-translate-y-full"
                )}
            >
                <div className="flex h-full items-center justify-between px-4 md:px-6">
                    <div className="flex items-center gap-3">
                        {sidebar && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleSidebar}
                                className="md:hidden"
                                aria-label="Toggle sidebar"
                            >
                                <Menu className="h-5 w-5" />
                            </Button>
                        )}

                        {showBackButton && (
                            <Button variant="ghost" size="icon" className="mr-2" asChild>
                                <Link href={backHref} aria-label="Back">
                                    <ChevronLeft className="h-5 w-5" />
                                </Link>
                            </Button>
                        )}

                        <Link href="/" className="flex items-center gap-2">
                            <motion.div
                                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-sm"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                PM
                            </motion.div>
                            <span className="hidden sm:block font-semibold text-lg">
                                {title || 'PM-AI Learning'}
                            </span>
                        </Link>
                    </div>

                    <ModeSwitch />
                </div>
            </header>

            {/* Sidebar Overlay (Mobile) */}
            <AnimatePresence>
                {sidebar && sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-black/50 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            {sidebar && (
                <AnimatePresence mode="wait">
                    <motion.aside
                        initial={{ x: -280 }}
                        animate={{ x: sidebarOpen ? 0 : -280 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className={cn(
                            'fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-72 overflow-y-auto',
                            'border-r border-border/40 bg-background/95 backdrop-blur-xl',
                            'md:translate-x-0',
                            !sidebarOpen && 'md:-translate-x-full'
                        )}
                    >
                        <div className="flex items-center justify-between p-4 md:hidden">
                            <span className="font-medium">Navigation</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSidebarOpen(false)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        {sidebar}
                    </motion.aside>
                </AnimatePresence>
            )}

            {/* Main Content */}
            <main
                className={cn(
                    'min-h-screen pt-16 transition-all duration-300',
                    sidebar && sidebarOpen && 'md:pl-72'
                )}
            >
                <div className="h-full w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
