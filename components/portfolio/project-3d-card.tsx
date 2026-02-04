"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  features: string[];
  role: string;
  impact: string;
  theme: "agricultural" | "academic" | "medical";
  link?: string;
}

const themeStyles = {
  agricultural: {
    gradient: "from-green-500/20 to-emerald-600/10",
    glowColor: "rgba(34, 197, 94, 0.3)",
    accent: "text-green-400",
    border: "border-green-500/30",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  academic: {
    gradient: "from-blue-500/20 to-indigo-600/10",
    glowColor: "rgba(59, 130, 246, 0.3)",
    accent: "text-blue-400",
    border: "border-blue-500/30",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  medical: {
    gradient: "from-rose-500/20 to-pink-600/10",
    glowColor: "rgba(244, 63, 94, 0.3)",
    accent: "text-rose-400",
    border: "border-rose-500/30",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
};

export function Project3DCard({ project, index }: { project: Project; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const style = themeStyles[project.theme];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
      className="perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative w-full h-[450px] cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front face */}
        <div
          className={`absolute inset-0 rounded-2xl overflow-hidden glass ${style.border} border-2`}
          style={{
            backfaceVisibility: "hidden",
            boxShadow: isHovered ? `0 20px 60px ${style.glowColor}` : "none",
            transition: "box-shadow 0.3s ease",
          }}
        >
          {/* Background gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient}`} />
          
          {/* Animated border glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            animate={{
              boxShadow: isHovered
                ? `inset 0 0 30px ${style.glowColor}`
                : "inset 0 0 0px transparent",
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Content */}
          <div className="relative h-full p-6 flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl bg-space-light/50 ${style.accent}`}>
                {style.icon}
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-mono ${style.accent} bg-space-light/50`}>
                {project.theme}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-text-bright mb-2">{project.title}</h3>
            <p className={`text-sm ${style.accent} mb-4`}>{project.subtitle}</p>

            {/* Description */}
            <p className="text-text-muted text-sm leading-relaxed flex-grow line-clamp-4">
              {project.description}
            </p>

            {/* Technologies preview */}
            <div className="flex flex-wrap gap-2 mt-4">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs font-mono bg-space-light/50 rounded text-foreground"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-2 py-1 text-xs font-mono text-muted-foreground">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>

            {/* Flip hint */}
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M17 1l4 4-4 4" />
                <path d="M3 11V9a4 4 0 014-4h14" />
                <path d="M7 23l-4-4 4-4" />
                <path d="M21 13v2a4 4 0 01-4 4H3" />
              </svg>
              Click to flip
            </div>
          </div>
        </div>

        {/* Back face */}
        <div
          className={`absolute inset-0 rounded-2xl overflow-hidden glass ${style.border} border-2`}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            boxShadow: isHovered ? `0 20px 60px ${style.glowColor}` : "none",
          }}
        >
          {/* Background gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient}`} />

          {/* Content */}
          <div className="relative h-full p-6 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-xl font-bold ${style.accent}`}>{project.title}</h3>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className={`flex items-center gap-2 px-3 py-1 rounded-lg ${style.accent} bg-space-light/50 hover:bg-space-light transition-colors text-sm`}
                >
                  View Live
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" x2="21" y1="14" y2="3" />
                  </svg>
                </a>
              )}
            </div>

            {/* Role */}
            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-1">My Role</p>
              <p className="text-foreground text-sm">{project.role}</p>
            </div>

            {/* Features */}
            <div className="flex-grow">
              <p className="text-xs text-muted-foreground mb-2">Key Features</p>
              <ul className="space-y-2">
                {project.features.slice(0, 4).map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-normal">
                    <svg
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${style.accent}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="line-clamp-2">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Impact */}
            <div className="mt-4 p-3 rounded-lg bg-space-light/30">
              <p className="text-xs text-muted-foreground mb-1">Impact</p>
              <p className={`text-sm font-medium ${style.accent}`}>{project.impact}</p>
            </div>

            {/* Flip back hint */}
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M7 23l-4-4 4-4" />
                <path d="M21 13v2a4 4 0 01-4 4H3" />
                <path d="M17 1l4 4-4 4" />
                <path d="M3 11V9a4 4 0 014-4h14" />
              </svg>
              Click to flip back
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
