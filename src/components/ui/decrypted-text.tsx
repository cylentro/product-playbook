'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DecryptedTextProps {
    text: string;
    speed?: number;
    maxIterations?: number;
    className?: string;
    parentClassName?: string;
    revealDirection?: 'start' | 'end' | 'center';
    useOriginalCharsOnly?: boolean;
    characters?: string;
    animateOn?: 'view' | 'hover';
    once?: boolean;
}

export default function DecryptedText({
    text,
    speed = 50,
    maxIterations = 20,
    className,
    parentClassName,
    revealDirection = 'start',
    useOriginalCharsOnly = false,
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+',
    animateOn = 'hover',
    once = false,
}: DecryptedTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isScrambling, setIsScrambling] = useState(false);
    const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const containerRef = useRef<HTMLSpanElement>(null);
    const isInView = useInView(containerRef, { once, margin: "-10%" });

    useEffect(() => {
        if (animateOn === 'view') {
            if (isInView) {
                startScramble();
            } else if (!once) {
                // Reset when leaving view so it's ready for next time
                setIsScrambling(false);
                if (intervalRef.current) clearInterval(intervalRef.current);
                setRevealedIndices(new Set());
                setDisplayText(
                  text
                    .split('')
                    .map((char) => (char === ' ' ? ' ' : characters[Math.floor(Math.random() * characters.length)]))
                    .join('')
                );
            }
        }
    }, [isInView, animateOn, once, text, characters]);

    const startScramble = () => {
        if (isScrambling) return;
        setIsScrambling(true);
        setRevealedIndices(new Set());
        
        // Reset text initially if needed, but usually we just start scrambling
        // setDisplayText(text.split('').map(() => characters[Math.floor(Math.random() * characters.length)]).join(''));
        
        let iteration = 0;

        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayText((prev) => {
                return text
                    .split('')
                    .map((char, index) => {
                        if (char === ' ') return ' ';
                        
                        if (revealedIndices.has(index) || iteration >= maxIterations) {
                            return char;
                        }
                        
                        return characters[Math.floor(Math.random() * characters.length)];
                    })
                    .join('');
            });

            // Sequential reveal logic
            if (revealDirection === 'start') {
                 // Reveal a batch of characters
                 const charsToReveal = Math.ceil(text.length / maxIterations);
                 setRevealedIndices(prev => {
                    const next = new Set(prev);
                    for (let i = 0; i < charsToReveal; i++) {
                        const nextIndex = next.size;
                        if(nextIndex < text.length) next.add(nextIndex);
                    }
                    return next;
                 });
            }

            iteration++;
            if (iteration >= maxIterations) {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setDisplayText(text);
                setIsScrambling(false);
            }
        }, speed);
    };

    const handleMouseEnter = () => {
        if (animateOn === 'hover') startScramble();
    };

    return (
        <span
            ref={containerRef}
            className={cn("inline-block whitespace-pre-wrap", parentClassName)}
            onMouseEnter={handleMouseEnter}
        >
            <span className={className}>{displayText}</span>
        </span>
    );
}
