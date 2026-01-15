'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, ChevronRight } from 'lucide-react';
import Particles from '@/components/ui/particles';
import DecryptedText from '@/components/ui/decrypted-text';

export function InteractiveHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Background Ambience - Particles */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <Particles
          className="absolute inset-0 w-full h-full"
          quantity={100}
          staticity={50}
          ease={50}
          size={1}
          color="#3b82f6" // Primary-ish blue/purple
          vx={0.2}
          vy={0.2}
        />
        
        {/* Subtle Gradient Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center"
        >
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <Badge variant="outline" className="mb-8 px-5 py-2 text-[10px] uppercase tracking-[0.3em] font-black border-primary/30 bg-primary/5 text-primary backdrop-blur-md shadow-lg shadow-primary/5">
              <Sparkles className="h-3.5 w-3.5 mr-2 text-primary animate-pulse" />
              THE PRODUCT OPERATING MODEL
            </Badge>
          </motion.div>

          {/* Headline with Decrypted Text */}
          <div className="relative mb-8">
            <h1 className="text-7xl md:text-[9rem] font-black tracking-tighter leading-[0.9] text-foreground">
              <DecryptedText 
                text="Product" 
                speed={100} 
                maxIterations={15}
                revealDirection="start"
                animateOn="view"
                once={false}
                className="inline-block"
              />
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-purple-600 inline-block pb-4">
                <DecryptedText 
                  text="Playbook" 
                  speed={100} 
                  maxIterations={20}
                  revealDirection="center"
                  animateOn="view"
                  once={false}
                />
              </span>
            </h1>
          </div>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-2xl md:text-3xl text-muted-foreground/80 mb-12 max-w-3xl mx-auto leading-relaxed font-medium tracking-tight"
          >
            A high-vibe, interactive framework for product leaders to master the end-to-end lifecycle.
          </motion.p>

          {/* CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <a href="#core-pillars">
              <Button size="lg" className="h-16 rounded-2xl px-10 text-lg font-black shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 group relative overflow-hidden bg-primary hover:bg-primary/90">
                <span className="relative z-10 flex items-center gap-3">
                  Begin Journey
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-500" />
                </span>
                
                {/* Shiny overlay */}
                <motion.div 
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                />
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
