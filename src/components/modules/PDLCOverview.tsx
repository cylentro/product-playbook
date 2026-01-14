'use client';

import { motion } from 'framer-motion';
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
    return (
        <div className="relative w-full py-6 flex items-center justify-center">
            {/* Background Decorative Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[280px] h-[280px] md:w-[400px] md:h-[400px] rounded-full border border-primary/10 border-dashed animate-[spin_60s_linear_infinite]" />
                <div className="absolute w-[180px] h-[180px] md:w-[320px] md:h-[320px] rounded-full border border-primary/5" />
            </div>

            {/* Center Logo/Label */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                className="absolute z-10 w-20 h-20 md:w-28 md:h-28 rounded-full glass border-primary/20 flex flex-col items-center justify-center text-center p-4 shadow-xl"
            >
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">PDLC</span>
                <span className="text-xs md:text-sm font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">Nexus</span>
            </motion.div>

            {/* Phase Items (Circular) */}
            <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px]">
                {phases.map((phase, index) => {
                    const angle = (index * (360 / phases.length)) - 90;
                    const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 120 : 190;
                    const x = radius * Math.cos((angle * Math.PI) / 180);
                    const y = radius * Math.sin((angle * Math.PI) / 180);

                    return (
                        <motion.div
                            key={phase.id}
                            initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                            animate={{ scale: 1, opacity: 1, x, y }}
                            transition={{
                                delay: 0.8 + (index * 0.1),
                                type: 'spring',
                                stiffness: 100,
                                damping: 12
                            }}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group hover:z-50"
                        >
                            <div className="relative flex flex-col items-center">
                                {/* Tooltip on hover */}
                                <div className={cn(
                                    "absolute w-40 p-3 rounded-xl glass border-primary/30 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none z-[100] text-center shadow-xl",
                                    phase.id === 1 ? "top-full mt-3" : "bottom-full mb-3"
                                )}>
                                    <p className="text-xs font-bold text-foreground mb-1">{phase.name}</p>
                                    <p className="text-[10px] text-muted-foreground leading-tight">{phase.desc}</p>
                                </div>

                                {/* Node */}
                                <div className={cn(
                                    "w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg border border-white/10 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] z-10",
                                    phase.bg
                                )}>
                                    <phase.icon className={cn("w-6 h-6 md:w-8 md:h-8", phase.color)} />
                                </div>

                                {/* Labels - Visible on desktop */}
                                <span className="mt-2 text-[10px] md:text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors hidden md:block">
                                    {phase.name}
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
