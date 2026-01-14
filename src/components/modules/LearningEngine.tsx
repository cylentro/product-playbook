'use client';

import { motion } from 'framer-motion';
import { PDLCOverview } from './PDLCOverview';

interface LearningEngineProps {
  content: string;
  title: string;
}

export function LearningEngine({ content, title }: LearningEngineProps) {
  // Split content by the [PDLC_MAP] marker
  const segments = content.split('[PDLC_MAP]');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-4xl mx-auto px-4 py-8 md:px-8"
    >
      <article className="prose prose-lg dark:prose-invert max-w-none">
        {segments.map((segment, index) => {
          // Wrap tables in a scrollable container and handle GitHub-style alerts
          const processedSegment = segment
            .replace(
              /<table[^>]*>/g, 
              (match) => `<div class="table-container">${match}`
            )
            .replace(/<\/table>/g, '</table></div>')
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
            )
            .replace(
              /<pre><code[^>]*class="[^"]*language-mermaid[^"]*"[^>]*>([\s\S]*?)<\/code><\/pre>/g,
              (match, code) => {
                try {
                  // Use a more robust decoding method
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
                  // Robust URL-safe Base64 encoding for Mermaid
                  const encoded = btoa(encodeURIComponent(finalCode).replace(/%([0-9A-F]{2})/g,
                    function toSolidBytes(match, p1) {
                      return String.fromCharCode(Number('0x' + p1));
                    }))
                    .replace(/\+/g, '-')
                    .replace(/\//g, '_')
                    .replace(/=+$/, ''); // Remove padding
                  
                  return `
                    <div class="not-prose my-14 w-full flex flex-col items-center overflow-visible">
                        <div class="bg-muted/5 p-6 md:p-10 rounded-[3rem] border border-border/60 w-full flex justify-center items-center group/mermaid transition-all duration-500">
                            <img 
                                src="https://mermaid.ink/svg/${encoded}" 
                                alt="Mermaid diagram" 
                                class="w-full h-auto max-h-[80vh] object-contain transition-transform duration-700 hover:scale-[1.01]" 
                            />
                        </div>
                        <span class="text-[10px] text-muted-foreground uppercase tracking-[0.5em] font-black opacity-30 mt-10">Interactive Flowchart</span>
                    </div>
                  `;
                } catch (e) {
                  return match;
                }
              }
            );

          return (
            <div key={index}>
              <div dangerouslySetInnerHTML={{ __html: processedSegment }} />
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
