'use client';

import { motion } from 'framer-motion';
import { PDLCOverview } from './PDLCOverview';
import { MermaidDiagram } from './MermaidDiagram';

interface LearningEngineProps {
  content: string;
  title: string;
}

export function LearningEngine({ content, title }: LearningEngineProps) {
  // Split content by the [PDLC_MAP] marker
  const segments = content.split('[PDLC_MAP]');

  const normalizeText = (text: string): string => {
    return text
      // Normalize acronyms to uppercase
      .replace(/\bprd\b/gi, 'PRD')
      .replace(/\bgtm\b/gi, 'GTM')
      .replace(/\bai\b/gi, 'AI')
      // Normalize 'and' to lowercase
      .replace(/\bAnd\b/g, 'and')
      .replace(/\bAND\b/g, 'and');
  };

  const processText = (text: string) => {
    // First normalize the text
    let processed = normalizeText(text);
    
    return processed
      .replace(
        /<table[^>]*>/g, 
        (match) => `<div class="table-container">${match}`
      )
      .replace(/<\/table>/g, '</table></div>')
      .replace(
        /!!([\s\S]*?)!!/g,
        '<span class="italic text-muted-foreground/60 underline decoration-dotted underline-offset-4 decoration-muted-foreground/30 inline-block mx-0.5">$1</span>'
      )
      .replace(
        /<blockquote>\s*<p>\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]([\s\S]*?)<\/p>\s*<\/blockquote>/g,
        (match, type, content) => {
          const icons: Record<string, string> = {
            NOTE: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>',
            TIP: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
            IMPORTANT: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-workflow"><rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/></svg>',
            WARNING: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-alert-triangle"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
            CAUTION: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-alert-circle"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>'
          };
          return `
            <div class="not-prose alert alert-${type.toLowerCase()}">
              <div class="alert-icon">${icons[type]}</div>
              <div class="alert-content">${content.trim()}</div>
            </div>
          `;
        }
      );
  };

  const getMermaidEncoded = (code: string) => {
    try {
      let decodedCode = code;
      if (typeof document !== 'undefined') {
        const txt = document.createElement("textarea");
        txt.innerHTML = code;
        decodedCode = txt.value;
        if (decodedCode.includes('&')) {
          txt.innerHTML = decodedCode;
          decodedCode = txt.value;
        }
      } else {
        decodedCode = code
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&#x3C;/g, '<')
          .replace(/&#x3E;/g, '>')
          .replace(/&#x26;/g, '&')
          .replace(/&#x2A;/g, '*')
          .replace(/&#x2F;/g, '/');
      }
      
      const finalCode = decodedCode.trim();
      return btoa(encodeURIComponent(finalCode).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
          return String.fromCharCode(Number('0x' + p1));
        }))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    } catch (e) {
      return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-4xl mx-auto px-4 py-8 md:px-8"
    >
      <article className="prose prose-lg dark:prose-invert max-w-none">
        {segments.map((segment, index) => {
          // Identify Mermaid blocks within the segment
          const parts = segment.split(/(<pre><code[^>]*class="[^"]*language-mermaid[^"]*"[^>]*>[\s\S]*?<\/code><\/pre>)/g);
          
          return (
            <div key={index}>
              {parts.map((part, pIndex) => {
                if (part.startsWith('<pre><code') && (part.includes('language-mermaid') || part.includes('language-mermaidjs'))) {
                  const codeMatch = part.match(/<code[^>]*>([\s\S]*?)<\/code>/);
                  if (codeMatch) {
                    const encoded = getMermaidEncoded(codeMatch[1]);
                    return <MermaidDiagram key={pIndex} encoded={encoded} />;
                  }
                }
                
                return <div key={pIndex} dangerouslySetInnerHTML={{ __html: processText(part) }} />;
              })}
              
              {index < segments.length - 1 && (
                <div className="my-12 not-prose">
                  <PDLCOverview />
                </div>
              )}
            </div>
          );
        })}
      </article>

      {/* Simple Reading Progress at the bottom */}
      <div className="mt-20 flex flex-col items-center gap-4 py-12 border-t border-border/40">
        <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest">End of Lesson</div>
        <div className="h-1 w-24 rounded-full bg-primary/20 overflow-hidden">
          <div className="h-full w-full bg-primary" />
        </div>
      </div>
    </motion.div>
  );
}
