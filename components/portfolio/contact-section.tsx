"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const languages = [
  { name: "Albanian", level: "Native", percentage: 100 },
  { name: "English", level: "C1", percentage: 85 },
  { name: "German", level: "A2", percentage: 30 },
];

const interests = [
  {
    name: "Football",
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
        <circle cx="12" cy="12" r="10" />
        <path d="m8 12 2.5 2.5L14 9" />
      </svg>
    ),
    description: "Team dynamics & collaboration",
  },
  {
    name: "Hiking",
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
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      </svg>
    ),
    description: "Exploring new perspectives",
  },
  {
    name: "Running",
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
        <circle cx="12" cy="5" r="3" />
        <path d="M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5a2 2 0 0 0 1.925 2.499h1.95a2 2 0 0 0 1.965-1.638L9 14l4 1-1 6h4l1.5-10" />
      </svg>
    ),
    description: "Endurance & persistence",
  },
];

const personalityTraits = [
  "Dedicated",
  "Passionate",
  "Collaborative",
  "Detail-oriented",
  "Problem-solver",
  "Continuous learner",
];

const contactMethods = [
  {
    label: "Email",
    value: "elhamrahimi208@gmail.com",
    href: "mailto:elhamrahimi208@gmail.com",
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
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/elham-rahimi-181002264",
    href: "https://linkedin.com/in/elham-rahimi-181002264",
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
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: "+383 44 809 852",
    href: "tel:+38344809852",
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
  {
    label: "Location",
    value: "Ridvan Qazimi, 60000 Gjilan, Kosovo",
    href: "https://maps.google.com/?q=Gjilan,Kosovo",
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
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

export function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredContact, setHoveredContact] = useState<string | null>(null);

  return (
    <section
      id="contact"
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
          <span className="text-primary font-mono text-sm">06.</span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-bright">
            Human Layer & Contact
          </h2>
          <div className="flex-1 h-px bg-border" />
        </div>
        <p className="text-muted-foreground max-w-xl">
          Beyond the code - the personality, interests, and connections that make
          me who I am.
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left column - Personal info */}
          <div className="space-y-10">
            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-text-bright mb-6 flex items-center gap-2">
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
                  className="text-primary"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
                Languages
              </h3>
              <div className="space-y-4">
                {languages.map((lang, index) => (
                  <motion.div
                    key={lang.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-foreground">{lang.name}</span>
                      <span className="text-primary font-mono text-sm">
                        {lang.level}
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${lang.percentage}%` } : {}}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className="h-full bg-gradient-to-r from-primary to-primary/50 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Interests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold text-text-bright mb-6 flex items-center gap-2">
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
                  className="text-accent"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                Interests
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {interests.map((interest, index) => (
                  <motion.div
                    key={interest.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="glass rounded-xl p-4 text-center border border-border hover:border-accent/50 transition-colors"
                  >
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                      {interest.icon}
                    </div>
                    <p className="text-foreground font-medium text-sm">
                      {interest.name}
                    </p>
                    <p className="text-muted-foreground text-xs mt-1">
                      {interest.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Personality traits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-lg font-semibold text-text-bright mb-6">
                Personality
              </h3>
              <div className="flex flex-wrap gap-2">
                {personalityTraits.map((trait, index) => (
                  <motion.span
                    key={trait}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7 + index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 glass rounded-full text-sm text-foreground border border-border hover:border-primary/50 hover:text-primary transition-colors cursor-default"
                  >
                    {trait}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column - Contact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass rounded-2xl p-8 border border-border h-fit"
          >
            <h3 className="text-2xl font-bold text-text-bright mb-2">
              {"Let's Connect"}
            </h3>
            <p className="text-muted-foreground mb-8">
              I am always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision.
            </p>

            {/* Contact methods */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.label}
                  href={method.href}
                  target={method.label !== "Email" && method.label !== "Phone" ? "_blank" : undefined}
                  rel={method.label !== "Email" && method.label !== "Phone" ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  onMouseEnter={() => setHoveredContact(method.label)}
                  onMouseLeave={() => setHoveredContact(null)}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                    hoveredContact === method.label
                      ? "bg-primary/10 border-primary"
                      : "bg-secondary/30 border-transparent"
                  } border`}
                >
                  <span
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                      hoveredContact === method.label
                        ? "bg-primary/20 text-primary"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {method.icon}
                  </span>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">
                      {method.label}
                    </p>
                    <p
                      className={`font-medium transition-colors ${
                        hoveredContact === method.label
                          ? "text-primary"
                          : "text-foreground"
                      }`}
                    >
                      {method.value}
                    </p>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-all duration-300 ${
                      hoveredContact === method.label
                        ? "text-primary translate-x-1"
                        : "text-muted-foreground"
                    }`}
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </motion.a>
              ))}
            </div>

            {/* Download CV */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="w-full mt-8 py-4 bg-primary/10 border border-primary text-primary rounded-xl font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              Download Resume
            </motion.button>
          </motion.div>
        </div>

        {/* Keyboard shortcuts hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
          className="mt-16 p-4 glass rounded-xl border border-border"
        >
          <p className="text-muted-foreground text-sm text-center mb-3">
            Keyboard Shortcuts
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs">
            <span className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-secondary rounded text-foreground font-mono">1-6</kbd>
              <span className="text-muted-foreground">Navigate sections</span>
            </span>
            <span className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-secondary rounded text-foreground font-mono">D</kbd>
              <span className="text-muted-foreground">Developer view</span>
            </span>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="mt-12 pt-8 border-t border-border text-center"
        >
          <p className="text-muted-foreground text-sm">
            Designed & Built by{" "}
            <span className="text-primary">Elham Rahimi</span>
          </p>
          <p className="text-muted-foreground/50 text-xs mt-2">
            2025 - Built with Next.js, Tailwind CSS, Framer Motion & React Three Fiber
          </p>
        </motion.footer>
      </div>
    </section>
  );
}
