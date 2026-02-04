"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  type: "current" | "past" | "freelance";
  description: string;
  technologies: string[];
  achievements: string[];
}

const experiences: Experience[] = [
  {
    id: "clearline",
    company: "ClearLine LLC",
    role: "Junior Full-Stack Developer",
    period: "July 2025 - Present",
    type: "current",
    description:
      "Contributing to the development and maintenance of modern web applications. Building responsive and intuitive UI components, integrating secure cloud-based services, and supporting backend development through RESTful APIs.",
    technologies: ["JavaScript", "TypeScript", "React", "Node.js", "MongoDB", "AWS", "Bootstrap"],
    achievements: [
      "Building responsive and intuitive UI components",
      "Integrating secure cloud-based services",
      "Participating in code reviews and performance optimization",
      "Collaborating with engineering team on best practices",
    ],
  },
  {
    id: "freelance",
    company: "Self-Employed",
    role: "Freelance Web Developer",
    period: "Aug 2024 - Jul 2025",
    type: "freelance",
    description:
      "Delivered custom applications for various clients. Built and customized WordPress websites, optimized performance, implemented security measures, and managed hosting, deployments, and database setups.",
    technologies: ["JavaScript", "TypeScript", "React", "Node.js", "PHP", "MySQL", "WordPress"],
    achievements: [
      "Delivered custom applications for multiple clients",
      "Built and customized WordPress websites",
      "Managed hosting, deployments, and database setups",
      "Ensured timely delivery of high-quality digital products",
    ],
  },
  {
    id: "starlabs",
    company: "Starlabs",
    role: "Web Developer (Internship)",
    period: "May 2024 - Aug 2024",
    type: "past",
    description:
      "Worked with PHP and WordPress to develop and maintain websites. Assisted in designing and customizing themes, implementing plugins, and optimizing site performance.",
    technologies: ["PHP", "WordPress", "HTML/CSS", "JavaScript"],
    achievements: [
      "Designed and customized WordPress themes",
      "Implemented plugins and optimized performance",
      "Collaborated with development team on real-world projects",
      "Gained hands-on debugging and troubleshooting experience",
    ],
  },
  {
    id: "pdfkgj-work",
    company: "Municipality of Gjilan",
    role: "Web Developer (PDFKGJ Project)",
    period: "Mar 2023 - May 2024",
    type: "past",
    description:
      "Collaborated with four other students on the development of a digital platform for farmers of the Municipality of Gjilan (PDFKGJ). Contributed to building user interfaces and managing the database.",
    technologies: ["PHP", "MySQL", "JavaScript", "HTML", "CSS", "Bootstrap"],
    achievements: [
      "Built user interfaces for farmer registration system",
      "Managed database for agricultural data",
      "Implemented email notification system for results",
      "Platform now serves farmers across Gjilan municipality",
    ],
  },
];

export function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeExperience, setActiveExperience] = useState<string>("clearline");

  return (
    <section
      id="experience"
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
          <span className="text-primary font-mono text-sm">02.</span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-bright">
            Experience Nebula
          </h2>
          <div className="flex-1 h-px bg-border" />
        </div>
        <p className="text-muted-foreground max-w-xl">
          My professional journey visualized as an expanding constellation of
          roles and responsibilities.
        </p>
      </motion.div>

      {/* Experience visualization */}
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-[200px,1fr] gap-8">
          {/* Timeline navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex lg:flex-col gap-2"
          >
            {experiences.map((exp) => (
              <button
                key={exp.id}
                onClick={() => setActiveExperience(exp.id)}
                className={`relative px-4 py-3 text-left rounded-lg transition-all duration-300 ${
                  activeExperience === exp.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <span className="font-medium text-sm">{exp.company}</span>
                {activeExperience === exp.id && (
                  <motion.div
                    layoutId="experienceIndicator"
                    className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary rounded-full"
                  />
                )}
              </button>
            ))}
          </motion.div>

          {/* Experience details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            {experiences.map((exp) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: activeExperience === exp.id ? 1 : 0,
                  y: activeExperience === exp.id ? 0 : 10,
                  display: activeExperience === exp.id ? "block" : "none",
                }}
                transition={{ duration: 0.3 }}
                className="glass rounded-xl p-6 lg:p-8"
              >
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-text-bright mb-1">
                      {exp.role}{" "}
                      <span className="text-primary">@ {exp.company}</span>
                    </h3>
                    <p className="text-sm font-mono text-muted-foreground">
                      {exp.period}
                    </p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      exp.type === "current"
                        ? "bg-primary/20 text-primary animate-pulse"
                        : exp.type === "freelance"
                          ? "bg-accent/20 text-accent"
                          : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {exp.type === "current"
                      ? "Active"
                      : exp.type === "freelance"
                        ? "Freelance"
                        : "Completed"}
                  </div>
                </div>

                {/* Description */}
                <p className="text-text-normal mb-6 leading-relaxed">
                  {exp.description}
                </p>

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-sm font-mono text-primary mb-3">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, index) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index }}
                        className="px-3 py-1 bg-secondary/50 border border-border rounded-full text-xs font-mono text-foreground hover:border-primary/50 hover:text-primary transition-colors"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h4 className="text-sm font-mono text-primary mb-3">
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, index) => (
                      <motion.li
                        key={achievement}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + 0.1 * index }}
                        className="flex items-start gap-3 text-text-normal text-sm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-primary mt-1 flex-shrink-0"
                        >
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Background stars for this section */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
}
