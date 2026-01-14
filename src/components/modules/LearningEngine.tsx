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
        {segments.map((segment, index) => (
          <div key={index}>
            <div dangerouslySetInnerHTML={{ __html: segment }} />
            {index < segments.length - 1 && (
              <div className="my-12 not-prose">
                <PDLCOverview />
              </div>
            )}
          </div>
        ))}
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
