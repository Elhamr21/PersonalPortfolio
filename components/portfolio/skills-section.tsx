"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface Skill {
  name: string;
  level: number; // 1-5
  category: "frontend" | "backend" | "infrastructure";
}

const skills: Skill[] = [
  // Frontend - Programming & Web
  { name: "JavaScript/TypeScript", level: 5, category: "frontend" },
  { name: "React", level: 5, category: "frontend" },
  { name: "HTML/CSS/Bootstrap", level: 5, category: "frontend" },
  { name: "UI/UX Development", level: 4, category: "frontend" },
  // Backend
  { name: "Node.js/Express.js", level: 5, category: "backend" },
  { name: "PHP", level: 5, category: "backend" },
  { name: "Python", level: 3, category: "backend" },
  { name: "C#/.NET", level: 3, category: "backend" },
  { name: "RESTful APIs", level: 5, category: "backend" },
  // Infrastructure - Databases & Tools
  { name: "MySQL", level: 5, category: "infrastructure" },
  { name: "MongoDB", level: 4, category: "infrastructure" },
  { name: "AWS/Cloud Services", level: 4, category: "infrastructure" },
  { name: "GitHub", level: 5, category: "infrastructure" },
];

const categories = [
  {
    id: "frontend",
    label: "Front-End Galaxy",
    color: "primary",
    icon: (
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
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "backend",
    label: "Back-End Nebula",
    color: "accent",
    icon: (
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
        <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
        <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
        <line x1="6" x2="6.01" y1="6" y2="6" />
        <line x1="6" x2="6.01" y1="18" y2="18" />
      </svg>
    ),
  },
  {
    id: "infrastructure",
    label: "Infrastructure Cloud",
    color: "chart-3",
    icon: (
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
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      </svg>
    ),
  },
];

export function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<string>("frontend");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills = skills.filter(
    (skill) => skill.category === activeCategory
  );

  return (
    <section
      id="skills"
      ref={ref}
      className="min-h-screen py-24 px-6 lg:px-24 relative"
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto mb-16"
      >
        <div className="flex items-center gap-4 mb-4">
          <span className="text-primary font-mono text-sm">03.</span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-bright">
            Skill Constellations
          </h2>
          <div className="flex-1 h-px bg-border" />
        </div>
        <p className="text-muted-foreground max-w-xl">
          Interactive clusters of technologies I work with, organized by domain
          expertise.
        </p>
      </motion.div>

      {/* Category tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-5xl mx-auto mb-12"
      >
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`group flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 ${
                activeCategory === cat.id
                  ? cat.color === "primary"
                    ? "bg-primary/20 text-primary border border-primary/50"
                    : cat.color === "accent"
                      ? "bg-accent/20 text-accent border border-accent/50"
                      : "bg-chart-3/20 text-chart-3 border border-chart-3/50"
                  : "glass border border-border hover:border-primary/30"
              }`}
            >
              <span
                className={
                  activeCategory === cat.id
                    ? ""
                    : "text-muted-foreground group-hover:text-foreground"
                }
              >
                {cat.icon}
              </span>
              <span className="font-medium">{cat.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Skills visualization */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-4xl mx-auto"
      >
        {/* Central hub */}
        <div className="relative h-[400px] flex items-center justify-center">
          {/* Center node */}
          <motion.div
            animate={{
              boxShadow:
                activeCategory === "frontend"
                  ? "0 0 40px rgba(0, 212, 255, 0.3)"
                  : activeCategory === "backend"
                    ? "0 0 40px rgba(255, 183, 77, 0.3)"
                    : "0 0 40px rgba(100, 255, 218, 0.3)",
            }}
            className={`w-24 h-24 rounded-full flex items-center justify-center z-10 ${
              activeCategory === "frontend"
                ? "bg-primary/20 border-2 border-primary"
                : activeCategory === "backend"
                  ? "bg-accent/20 border-2 border-accent"
                  : "bg-chart-3/20 border-2 border-chart-3"
            }`}
          >
            {categories.find((c) => c.id === activeCategory)?.icon}
          </motion.div>

          {/* Skill nodes arranged in a circle */}
          {filteredSkills.map((skill, index) => {
            const angle = (index / filteredSkills.length) * Math.PI * 2 - Math.PI / 2;
            const baseRadius = 140;
            const radius = baseRadius + (5 - skill.level) * 15;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, x, y }}
                transition={{
                  delay: 0.5 + index * 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                className="absolute cursor-pointer"
              >
                <motion.div
                  animate={{
                    scale: hoveredSkill === skill.name ? 1.1 : 1,
                    y: hoveredSkill === skill.name ? -5 : 0,
                  }}
                  className={`relative px-4 py-2 rounded-xl glass transition-all duration-300 ${
                    hoveredSkill === skill.name
                      ? activeCategory === "frontend"
                        ? "border-primary text-primary glow-cyan"
                        : activeCategory === "backend"
                          ? "border-accent text-accent glow-amber"
                          : "border-chart-3 text-chart-3"
                      : "border-border text-foreground"
                  } border`}
                >
                  <span className="font-mono text-sm whitespace-nowrap">
                    {skill.name}
                  </span>

                  {/* Skill level indicator */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 h-1 rounded-full transition-colors ${
                          i < skill.level
                            ? activeCategory === "frontend"
                              ? "bg-primary"
                              : activeCategory === "backend"
                                ? "bg-accent"
                                : "bg-chart-3"
                            : "bg-border"
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Connection line to center */}
                <svg
                  className="absolute top-1/2 left-1/2 pointer-events-none"
                  style={{
                    width: radius + 50,
                    height: 2,
                    transform: `rotate(${(angle * 180) / Math.PI}deg)`,
                    transformOrigin: "left center",
                  }}
                >
                  <line
                    x1="0"
                    y1="1"
                    x2={radius - 60}
                    y2="1"
                    stroke={
                      activeCategory === "frontend"
                        ? "rgba(0, 212, 255, 0.2)"
                        : activeCategory === "backend"
                          ? "rgba(255, 183, 77, 0.2)"
                          : "rgba(100, 255, 218, 0.2)"
                    }
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                </svg>
              </motion.div>
            );
          })}

          {/* Orbital rings */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ transform: "translate(0, 0)" }}
          >
            <circle
              cx="50%"
              cy="50%"
              r="100"
              fill="none"
              stroke={
                activeCategory === "frontend"
                  ? "rgba(0, 212, 255, 0.1)"
                  : activeCategory === "backend"
                    ? "rgba(255, 183, 77, 0.1)"
                    : "rgba(100, 255, 218, 0.1)"
              }
              strokeWidth="1"
            />
            <circle
              cx="50%"
              cy="50%"
              r="160"
              fill="none"
              stroke={
                activeCategory === "frontend"
                  ? "rgba(0, 212, 255, 0.05)"
                  : activeCategory === "backend"
                    ? "rgba(255, 183, 77, 0.05)"
                    : "rgba(100, 255, 218, 0.05)"
              }
              strokeWidth="1"
              strokeDasharray="8 8"
            />
          </svg>
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="flex justify-center gap-8 mt-8"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < 5 ? "bg-primary" : "bg-border"
                  }`}
                />
              ))}
            </div>
            <span>Primary</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < 3 ? "bg-primary" : "bg-border"
                  }`}
                />
              ))}
            </div>
            <span>Secondary</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
