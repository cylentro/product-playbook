'use client';

import React from 'react';
import { motion } from 'framer-motion';

// ... imports

interface ScrollRevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  animation?: "slideUp" | "scaleUp" | "fadeIn";
  once?: boolean;
}

export function ScrollReveal({ 
  children, 
  width = "100%", 
  className, 
  delay = 0,
  direction = "up",
  animation,
  once = false
}: ScrollRevealProps) {
  
  const directions = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 }
  };

  const getVariants = () => {
    if (animation === 'scaleUp') {
        return {
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 }
        };
    }
    if (animation === 'fadeIn') {
        return {
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
        };
    }
    
    // Default to directional slide (animation='slideUp' implies direction='up')
    return {
        hidden: { 
          opacity: 0, 
          ...directions[direction] 
        },
        visible: { 
          opacity: 1, 
          x: 0, 
          y: 0 
        }
    };
  };

  return (
    <div style={{ width, position: 'relative', overflow: 'visible' }} className={className}>
      <motion.div
        variants={getVariants()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: once, margin: "-10%" }} 
        transition={{ 
          duration: 0.8, 
          delay: delay,
          ease: [0.21, 1, 0.36, 1] 
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function StaggerContainer({ children, delay = 0, once = false }: { children: React.ReactNode, delay?: number, once?: boolean }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: once, margin: "-100px" }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: delay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, direction = "up" }: { children: React.ReactNode, direction?: "up" | "down" | "left" | "right" }) {
  const directions = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 }
  };

  return (
    <motion.div
      variants={{
        hidden: { 
          opacity: 0, 
          ...directions[direction]
        },
        visible: { 
          opacity: 1, 
          x: 0, 
          y: 0 
        }
      }}
      transition={{ 
        duration: 0.5,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
}
