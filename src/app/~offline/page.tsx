"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export default function OfflinePage() {
  useEffect(() => {
    // Attempt to reload when connection is restored
    const handleOnline = () => {
      window.location.reload();
    };
    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-md"
      >
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 mx-auto mb-8 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-full blur-xl" />
          <div className="relative w-full h-full bg-zinc-800/80 backdrop-blur-sm rounded-full border border-zinc-700/50 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-zinc-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3l18 18"
              />
            </svg>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-white mb-4"
        >
          You&apos;re Offline
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-zinc-400 mb-8 leading-relaxed"
        >
          It looks like you&apos;ve lost your internet connection. 
          Don&apos;t worry — some content you&apos;ve visited before may still be available.
        </motion.p>

        {/* Retry Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => window.location.reload()}
          className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25"
        >
          <span className="relative z-10">Try Again</span>
          <svg
            className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>

        {/* Status indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex items-center justify-center gap-2 text-sm text-zinc-500"
        >
          <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
          Waiting for connection...
        </motion.div>
      </motion.div>
    </div>
  );
}
