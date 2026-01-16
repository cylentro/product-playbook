'use client';

import { useEffect } from 'react';

export function HomeKeyboardNav() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't interfere with Command Palette
      if (e.metaKey || e.ctrlKey) return;
      
      // Don't interfere if a modal or input is open/active
      const isModalOpen = document.querySelector('[role="dialog"], [data-state="open"]');
      if (isModalOpen) return;
      
      const activeElement = document.activeElement;
      if (activeElement?.tagName === 'INPUT' || activeElement?.tagName === 'TEXTAREA') return;

      const main = document.getElementById('home-main');
      if (!main) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        main.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        main.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
      } else if (e.key === ' ') {
        e.preventDefault();
        if (e.shiftKey) {
            main.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
        } else {
            main.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return null;
}
