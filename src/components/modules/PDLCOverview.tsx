'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
    Search,
    Lightbulb,
    Layout,
    Target,
    Code,
    Rocket,
    Activity,
    TrendingUp,
    Trash2
} from 'lucide-react';

const phases = [
    { id: 1, name: 'Discovery', icon: Search, color: 'text-blue-500', bg: 'bg-blue-500/10', desc: 'Identifying the "Right Problem"' },
    { id: 2, name: 'Ideation', icon: Lightbulb, color: 'text-amber-500', bg: 'bg-amber-500/10', desc: 'Exploring potential solutions' },
    { id: 3, name: 'Design', icon: Layout, color: 'text-indigo-500', bg: 'bg-indigo-500/10', desc: 'UI/UX & Prototyping' },
    { id: 4, name: 'Planning', icon: Target, color: 'text-rose-500', bg: 'bg-rose-500/10', desc: 'Technical feasibility check' },
    { id: 5, name: 'Dev', icon: Code, color: 'text-emerald-500', bg: 'bg-emerald-500/10', desc: 'Agile execution & execution' },
    { id: 6, name: 'Launch', icon: Rocket, color: 'text-orange-500', bg: 'bg-orange-500/10', desc: 'Market entry & readiness' },
    { id: 7, name: 'Hypercare', icon: Activity, color: 'text-cyan-500', bg: 'bg-cyan-500/10', desc: 'Initial stability (0-30 days)' },
    { id: 8, name: 'Growth', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-500/10', desc: 'Optimizing for scale' },
    { id: 9, name: 'Sunset', icon: Trash2, color: 'text-slate-500', bg: 'bg-slate-500/10', desc: 'Strategic phase-out' },
];

export function PDLCOverview() {
    const [activePhase, setActivePhase] = React.useState<number | null>(null);
    const [radius, setRadius] = React.useState(190);

    React.useEffect(() => {
        const updateRadius = () => {
            setRadius(window.innerWidth < 768 ? 135 : 190);
        };
        updateRadius();
        window.addEventListener('resize', updateRadius);
        return () => window.removeEventListener('resize', updateRadius);
    }, []);

    return (
        <div 
            className="relative w-full py-8 md:py-12 flex items-center justify-center overflow-visible"
            onClick={() => setActivePhase(null)}
        >
            {/* Background Decorative Rings - Aligned with icon path */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <div 
                    style={{ width: radius * 2, height: radius * 2 }}
                    className="rounded-full border border-primary/20 border-dashed animate-[spin_80s_linear_infinite]" 
                />
                <div 
                    style={{ width: (radius * 2) - 80, height: (radius * 2) - 80 }}
                    className="absolute rounded-full border border-primary/5" 
                />
            </div>

            {/* Center Logo/Label - Dimmed when active */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                    scale: activePhase ? 0.9 : 1, 
                    opacity: activePhase ? 0.2 : 1 
                }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="absolute z-10 w-20 h-20 md:w-28 md:h-28 rounded-full glass border-primary/20 flex flex-col items-center justify-center text-center p-4 shadow-xl"
            >
                <span className="text-[9px] md:text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Product</span>
                <span className="text-xs md:text-sm font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">Playbook</span>
            </motion.div>

            {/* Phase Items & Detail Card Container */}
            <div className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px]">
                {/* Unified Active Detail Card - Placed BEFORE phases in DOM */}
                <AnimatePresence>
                    {activePhase && (
                        <div className="absolute inset-0 flex items-center justify-center z-[150] pointer-events-none">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="w-40 h-40 md:w-56 md:h-56 p-4 md:p-8 rounded-full bg-background border-2 border-primary/20 shadow-[0_20px_50px_rgba(0,0,0,0.15)] text-center flex flex-col items-center justify-center pointer-events-auto"
                            >
                                {(() => {
                                    const phase = phases.find(p => p.id === activePhase);
                                    if (!phase) return null;
                                    return (
                                        <>
                                            <div className={cn("inline-flex p-1.5 md:p-3 rounded-2xl mb-1 md:mb-2 mx-auto", phase.bg)}>
                                                <phase.icon className={cn("w-5 h-5 md:w-8 md:h-8", phase.color)} />
                                            </div>
                                            <h4 className="text-sm md:text-lg font-black text-foreground mb-1 uppercase tracking-tighter leading-none">{phase.name}</h4>
                                            <p className="text-[10px] md:text-sm font-medium text-muted-foreground leading-tight px-1">
                                                {phase.desc}
                                            </p>
                                        </>
                                    );
                                })()}
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Phase Items (Circular) - Placed AFTER card in DOM to ensure top-level stacking */}
                {phases.map((phase, index) => {
                    const angle = (index * (360 / phases.length)) - 90;
                    const x = radius * Math.cos((angle * Math.PI) / 180);
                    const y = radius * Math.sin((angle * Math.PI) / 180);
                    const isActive = activePhase === phase.id;

                    return (
                        <motion.div
                            key={phase.id}
                            initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                            animate={{ 
                                scale: isActive ? 1.1 : (activePhase ? 0.9 : 1), 
                                opacity: isActive ? 1 : (activePhase ? 0.6 : 1), 
                                x, 
                                y 
                            }}
                            transition={{
                                delay: 0.2 + (index * 0.04),
                                type: 'spring',
                                stiffness: 100,
                                damping: 12
                            }}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group"
                            style={{ zIndex: isActive ? 200 : 100 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setActivePhase(isActive ? null : phase.id);
                            }}
                        >
                            <div className="relative flex items-center justify-center" style={{ isolation: 'isolate' }}>
                                {/* Active indicator - centered behind the node */}
                                {isActive && (
                                    <div className="absolute pointer-events-none z-0">
                                        <div className="w-14 h-14 md:w-20 md:h-20 rounded-full border-2 border-primary bg-background/80 backdrop-blur-sm shadow-[0_0_20px_rgba(var(--primary),0.2)]" />
                                    </div>
                                )}
                                {/* Node */}
                                <div className={cn(
                                    "w-11 h-11 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg border border-white/10 relative z-10",
                                    "bg-background", // Base solid layer
                                    phase.bg, // Colored translucent layer
                                    "hover:scale-110 hover:shadow-[0_0_20px_rgba(var(--primary),0.3)]",
                                    isActive && "scale-110 shadow-primary/20"
                                )}>
                                    <phase.icon className={cn("w-5 h-5 md:w-8 md:h-8", phase.color)} />
                                </div>

                                {/* Labels - Hidden when active because it's in the center */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 pointer-events-none">
                                    <span className={cn(
                                        "block text-[9px] md:text-xs font-bold text-muted-foreground transition-all duration-300 text-center w-20 leading-tight whitespace-nowrap",
                                        isActive ? "opacity-0 translate-y-1" : (activePhase ? "opacity-40" : "opacity-70 group-hover:opacity-100")
                                    )}>
                                        {phase.name}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
