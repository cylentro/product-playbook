'use client';

import React, { useState } from 'react';
import { Check, Copy, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function CopyPromptTemplate() {
    const [copied, setCopied] = useState(false);

    const templateText = `Context: [Describe the product, persona, and business goal]
Act As: [Senior PM / Tech Lead / UX Designer]
Specifications: [Rules: e.g. 'Must work on mobile', 'Keep it under 3 steps']
Task: [e.g. Write a User Story for a B2B bulk upload]
Result: [e.g. Markdown Table with Gherkin AC]`;

    const handleCopy = () => {
        navigator.clipboard.writeText(templateText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="my-8 rounded-3xl border border-primary/20 bg-primary/5 p-6 md:p-8 backdrop-blur-sm relative overflow-hidden group transition-all hover:bg-primary/10 hover:border-primary/30">
            <div className="absolute top-0 right-0 p-4">
                <Sparkles className="w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors" />
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                    <h4 className="text-xl font-bold text-foreground">Master Prompt Template</h4>
                    <p className="text-muted-foreground text-sm max-w-md">
                        Copy this structured layout to ensure your prompts always follow the CASTR framework for high-fidelity outputs.
                    </p>
                </div>
                
                <Button 
                    variant="default" 
                    size="lg" 
                    onClick={handleCopy}
                    className={cn(
                        "h-14 px-8 rounded-2xl gap-3 transition-all duration-300 shadow-lg shadow-primary/20",
                        copied ? "bg-green-600 hover:bg-green-600" : "bg-primary hover:scale-105"
                    )}
                >
                    {copied ? (
                        <>
                            <Check className="h-5 w-5" />
                            <span>Template Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy className="h-5 w-5" />
                            <span>Copy Master Template</span>
                        </>
                    )}
                </Button>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 opacity-60">
                {['Context', 'Act As', 'Specifications', 'Task', 'Result'].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-primary/10 text-[10px] font-bold uppercase tracking-wider text-primary">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}
