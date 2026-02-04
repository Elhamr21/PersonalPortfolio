"use client";

import React from "react"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    id: "identity",
    label: "Identity",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="8" r="5" />
        <path d="M20 21a8 8 0 0 0-16 0" />
      </svg>
    ),
  },
  {
    id: "experience",
    label: "Experience",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    id: "skills",
    label: "Skills",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    id: "projects",
    label: "Projects",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    id: "education",
    label: "Education",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    id: "contact",
    label: "Contact",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
];

interface OrbitalNavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export function OrbitalNavigation({
  activeSection,
  onNavigate,
}: OrbitalNavigationProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Desktop Navigation - Fixed Left */}
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
        className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 z-50 flex-col gap-6"
      >
        {navItems.map((item, index) => (
          <motion.button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index + 0.3 }}
            className={`group relative flex items-center gap-4 p-3 rounded-full transition-all duration-300 ${
              activeSection === item.id
                ? "bg-primary/20 text-primary glow-cyan"
                : "text-muted-foreground hover:text-primary hover:bg-primary/10"
            }`}
          >
            <span
              className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-300 ${
                activeSection === item.id
                  ? "border-primary bg-primary/20"
                  : "border-border group-hover:border-primary/50"
              }`}
            >
              {item.icon}
            </span>
            <span
              className={`absolute left-16 whitespace-nowrap text-sm font-medium px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 glass ${
                activeSection === item.id ? "text-primary" : ""
              }`}
            >
              {item.label}
            </span>
            {/* Active indicator line */}
            {activeSection === item.id && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-full"
              />
            )}
          </motion.button>
        ))}
      </motion.nav>

      {/* Mobile Navigation - Bottom */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      >
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-3 p-3 glass rounded-2xl mb-2"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsExpanded(false);
                  }}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    activeSection === item.id
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                  }`}
                >
                  {item.icon}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`p-4 rounded-full glass transition-all duration-300 ${
            isExpanded ? "bg-primary/20 text-primary glow-cyan" : "text-foreground"
          }`}
        >
          <motion.div animate={{ rotate: isExpanded ? 45 : 0 }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="4" />
              <line x1="4.93" x2="9.17" y1="4.93" y2="9.17" />
              <line x1="14.83" x2="19.07" y1="14.83" y2="19.07" />
              <line x1="14.83" x2="19.07" y1="9.17" y2="4.93" />
              <line x1="4.93" x2="9.17" y1="19.07" y2="14.83" />
            </svg>
          </motion.div>
        </button>
      </motion.div>
    </>
  );
}
