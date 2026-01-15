'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, Download } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface MermaidDiagramProps {
  encoded: string;
  definition?: string;
}

export function MermaidDiagram({ encoded, definition }: MermaidDiagramProps) {
  const [isOpen, setIsOpen] = useState(false);
  const imageUrl = `https://mermaid.ink/svg/${encoded}`;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `diagram-${encoded.slice(0, 8)}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="not-prose my-14 w-full flex flex-col items-center overflow-visible">
        <motion.div 
          onClick={() => setIsOpen(true)}
          className="relative bg-muted/5 p-6 md:p-10 rounded-[3rem] border border-border/60 w-full flex justify-center items-center group/mermaid cursor-zoom-in transition-all duration-500 hover:bg-muted/10 hover:border-primary/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Zoom Overlay */}
          <div className="absolute top-6 right-6 opacity-0 group-hover/mermaid:opacity-100 transition-opacity duration-300 z-10">
            <div className="bg-background/80 backdrop-blur-md p-2 rounded-xl border border-border shadow-sm text-primary">
              <Maximize2 className="w-5 h-5" />
            </div>
          </div>
          
          <img 
            src={imageUrl} 
            alt="Product Flow Diagram" 
            className="w-full h-auto max-h-[80vh] object-contain transition-transform duration-700 group-hover/mermaid:scale-[1.01]" 
          />
        </motion.div>
        <span className="text-[10px] text-muted-foreground uppercase tracking-[0.5em] font-black opacity-30 mt-10">
          Interactive Flowchart • Click to Enlarge
        </span>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent 
          showCloseButton={false}
          className="fixed inset-0 top-0 left-0 translate-x-0 translate-y-0 w-screen h-screen max-w-none sm:max-w-none rounded-none p-0 gap-0 overflow-hidden bg-background/95 backdrop-blur-xl border-none flex flex-col items-stretch"
        >
          <DialogHeader className="p-4 border-b border-border/40 shrink-0 flex flex-row items-center justify-between space-y-0">
            <div>
              <DialogTitle className="text-lg font-bold">Diagram View</DialogTitle>
              <p className="text-xs text-muted-foreground">High-fidelity SVG preview</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleDownload} className="gap-2 rounded-xl hidden md:flex">
                <Download className="w-4 h-4" />
                <span>Export SVG</span>
              </Button>
              <DialogClose asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                  <X className="w-5 h-5" />
                </Button>
              </DialogClose>
            </div>
          </DialogHeader>
          
          <div className="flex-1 overflow-auto p-4 md:p-12 flex items-center justify-center bg-muted/10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full h-full flex items-center justify-center"
            >
              <img 
                src={imageUrl} 
                alt="Enlarged Diagram" 
                className="max-w-full max-h-full object-contain drop-shadow-2xl shadow-black/10"
              />
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
