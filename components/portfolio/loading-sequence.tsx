"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingSequence({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500), // Kosovo flag
      setTimeout(() => setPhase(2), 1500), // Name appears
      setTimeout(() => setPhase(3), 2500), // Complete
      setTimeout(() => onComplete(), 3000), // Fade out
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-space-dark flex items-center justify-center"
        >
          <div className="text-center">
            {/* Kosovo-inspired loading animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: phase >= 1 ? 1 : 0, rotate: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className="mb-8"
            >
              {/* Stylized Kosovo star pattern */}
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                className="mx-auto"
              >
                {/* Six stars representing Kosovo */}
                {[...Array(6)].map((_, i) => {
                  const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
                  const x = 40 + Math.cos(angle) * 25;
                  const y = 40 + Math.sin(angle) * 25;
                  return (
                    <motion.circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#FFFFFF"
                      initial={{ scale: 0 }}
                      animate={{ scale: phase >= 1 ? 1 : 0 }}
                      transition={{ delay: 0.1 * i, duration: 0.3 }}
                    />
                  );
                })}
                {/* Central glow */}
                <motion.circle
                  cx="40"
                  cy="40"
                  r="12"
                  fill="#00D4FF"
                  initial={{ scale: 0 }}
                  animate={{ scale: phase >= 1 ? 1 : 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                />
              </svg>
            </motion.div>

            {/* Name reveal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 20 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold text-text-bright tracking-wider mb-2">
                ELHAM RAHIMI
              </h1>
              <p className="text-primary font-mono text-sm">
                Full-Stack Developer
              </p>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="mt-8 w-48 h-1 bg-border rounded-full mx-auto overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${(phase / 3) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
