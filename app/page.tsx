"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StarBackground } from "@/components/portfolio/star-background";
import { OrbitalNavigation } from "@/components/portfolio/orbital-navigation";
import { HeroSection } from "@/components/portfolio/hero-section";
import { ExperienceSection } from "@/components/portfolio/experience-section";
import { SkillsSection } from "@/components/portfolio/skills-section";
import { ProjectsSection } from "@/components/portfolio/projects-section";
import { EducationSection } from "@/components/portfolio/education-section";
import { ContactSection } from "@/components/portfolio/contact-section";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("identity");
  const [isLoading, setIsLoading] = useState(true);
  const [developerView, setDeveloperView] = useState(false);

  useEffect(() => {
    // Loading sequence
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Intersection observer for section tracking
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [isLoading]);

  // Keyboard shortcuts
  useEffect(() => {
    const sectionIds = ["identity", "experience", "skills", "projects", "education", "contact"];
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Number keys 1-6 for section navigation
      const keyNum = parseInt(e.key);
      if (keyNum >= 1 && keyNum <= 6 && sectionIds[keyNum - 1]) {
        e.preventDefault();
        handleNavigate(sectionIds[keyNum - 1]);
      }
      
      // 'D' key for developer view toggle
      if (e.key.toLowerCase() === "d" && !e.ctrlKey && !e.metaKey) {
        const activeElement = document.activeElement;
        const isTyping = activeElement?.tagName === "INPUT" || activeElement?.tagName === "TEXTAREA";
        if (!isTyping) {
          setDeveloperView((prev) => !prev);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Loading screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
          >
            <motion.div className="text-center">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-muted-foreground font-mono text-sm mb-8"
              >
                Loading
              </motion.p>

              {/* Name animation */}
              <motion.div className="overflow-hidden">
                <motion.h1
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-4xl md:text-6xl font-bold text-text-bright mb-2"
                >
                  <span className="inline-block">ELHAM</span>{" "}
                  <span className="inline-block text-primary">RAHIMI</span>
                </motion.h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-muted-foreground font-mono text-sm mt-4"
              >
                Full-Stack Developer
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-[2px] h-4 bg-primary ml-1 align-middle"
                />
              </motion.p>

              {/* Loading bar */}
              <motion.div
                className="mt-8 w-48 h-0.5 bg-border rounded-full overflow-hidden mx-auto"
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.8, ease: "linear" }}
                  className="h-full bg-primary"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Developer View Toggle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        onClick={() => setDeveloperView(!developerView)}
        className={`fixed top-4 right-4 z-50 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-300 ${
          developerView
            ? "bg-primary text-primary-foreground"
            : "glass border border-border text-muted-foreground hover:text-foreground"
        }`}
      >
        {developerView ? "Normal View" : "Dev View"}
        <span className="ml-2 opacity-50">[D]</span>
      </motion.button>

      {/* Main content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className={`relative ${developerView ? "developer-view" : ""}`}
      >
        <StarBackground />
        <OrbitalNavigation
          activeSection={activeSection}
          onNavigate={handleNavigate}
        />

        <HeroSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />

        {/* Social links - Fixed right */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isLoading ? 0 : 1, x: isLoading ? 20 : 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="hidden lg:flex fixed right-8 bottom-0 flex-col items-center gap-6"
        >
          <a
            href="https://github.com/elhamrahimi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary hover:-translate-y-1 transition-all duration-300"
            aria-label="GitHub"
          >
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
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/elham-rahimi-181002264"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary hover:-translate-y-1 transition-all duration-300"
            aria-label="LinkedIn"
          >
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
          </a>
          <a
            href="mailto:elhamrahimi208@gmail.com"
            className="text-muted-foreground hover:text-primary hover:-translate-y-1 transition-all duration-300"
            aria-label="Email"
          >
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
          </a>
          <div className="w-px h-24 bg-border" />
        </motion.div>

        {/* Email - Fixed left bottom */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: isLoading ? 0 : 1, x: isLoading ? -20 : 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="hidden lg:flex fixed left-8 bottom-0 flex-col items-center gap-6"
        >
          <a
            href="mailto:elhamrahimi208@gmail.com"
            className="text-muted-foreground hover:text-primary transition-colors text-xs font-mono tracking-widest"
            style={{ writingMode: "vertical-rl" }}
          >
            elhamrahimi208@gmail.com
          </a>
          <div className="w-px h-24 bg-border" />
        </motion.div>
      </motion.main>
    </>
  );
}
