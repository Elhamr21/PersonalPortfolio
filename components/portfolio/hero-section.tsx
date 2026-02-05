"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamically import 3D scene to avoid SSR issues
const Hero3DScene = dynamic(
  () => import("./hero-3d-scene").then((mod) => mod.Hero3DScene),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-16 h-16 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    ),
  }
);

const techOrbs = [
  { label: "React", angle: 0, color: "#61dafb" },
  { label: "Node.js", angle: 45, color: "#323330" },
  { label: "MongoDB", angle: 90, color: "#4db337" },
  { label: "Express", angle: 135, color: "#000000" },
  { label: "HTML", angle: 180, color: "#e34c26" },
  { label: "CSS", angle: 225, color: "#2965f1" },
  { label: "JavaScript", angle: 270, color: "#f7df1e" },
  { label: "TypeScript", angle: 315, color: "#007acc" },
];

export function HeroSection() {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Full-Stack Developer";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="identity"
      className="min-h-screen flex items-center justify-center relative px-6 lg:px-24 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)",
            right: "-10%",
            top: "50%",
            transform: "translateY(-50%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT SIDE - Text + Profile Photos */}
          <div className="order-2 lg:order-1">
            {/* Profile Photos - Large and Styled */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative mb-8 flex justify-center lg:justify-start"
            >
              {/* Outer rotating ring */}
              <motion.div
                className="absolute w-36 h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 rounded-full border border-primary/30"
                style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Inner rotating ring (opposite direction) */}
              <motion.div
                className="absolute w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full border border-accent/20"
                style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />

              {/* Photo container */}
              <div className="relative">
                {/* Animated gradient border */}
                <motion.div
                  className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-accent to-primary"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  style={{ backgroundSize: "200% 200%" }}
                />
                
                {/* Photo */}
                <div className="relative w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-full overflow-hidden border-4 border-background">
                  <Image
                    src="/images/profile.png"
                    alt="Elham Rahimi"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                
                {/* Glow effects */}
                <div className="absolute inset-0 rounded-full bg-primary/30 blur-2xl -z-10" />
                <div className="absolute inset-0 rounded-full bg-accent/20 blur-3xl -z-20" />
              </div>

              {/* Floating particles around photos */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-primary/60"
                  style={{
                    left: `calc(50% + ${Math.cos((i * 60 * Math.PI) / 180) * 80}px)`,
                    top: `calc(50% + ${Math.sin((i * 60 * Math.PI) / 180) * 80}px)`,
                  }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.3,
                    repeat: Infinity,
                  }}
                />
              ))}
            </motion.div>

            {/* Pre-title */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-primary font-mono text-sm mb-4"
            >
              Hello, my name is
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-text-bright tracking-tight mb-4"
            >
              <span className="relative inline-block">
                Elham
                <motion.span
                  className="absolute inset-0 text-primary/20"
                  animate={{
                    x: [0, 2, -2, 0],
                    opacity: [0, 0.5, 0.5, 0],
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: Infinity,
                    repeatDelay: 5,
                  }}
                >
                  Elham
                </motion.span>
              </span>{" "}
              <span className="relative inline-block">
                Rahimi
                <motion.span
                  className="absolute inset-0 text-accent/20"
                  animate={{
                    x: [0, -2, 2, 0],
                    opacity: [0, 0.5, 0.5, 0],
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: Infinity,
                    repeatDelay: 5,
                    delay: 0.1,
                  }}
                >
                  Rahimi
                </motion.span>
              </span>
            </motion.h1>

            {/* Typing subtitle text */}
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-2xl md:text-3xl lg:text-4xl font-semibold text-muted-foreground mb-6"
            >
              <span className="text-primary">{displayText}</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-[3px] h-6 md:h-8 bg-primary ml-1 align-middle"
              />
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-text-muted text-base md:text-lg max-w-xl leading-relaxed mb-8"
            >
              Computer Science graduate (BSc) from Kadri Zeka Public University
              specializing in Software Engineering and Web Design. I create{" "}
              <span className="text-primary">functional, scalable, and user-focused</span>{" "}
              digital solutions with a commitment to continuous growth aligned with
              modern industry standards.
            </motion.p>

            {/* Info badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 glass rounded-full">
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
                  className="text-primary"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-xs md:text-sm text-foreground">Gjilan, Kosovo</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 glass rounded-full">
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
                  className="text-accent"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
                <span className="text-xs md:text-sm text-foreground">
                  GPA <span className="text-accent font-semibold">9.0/10</span>
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 glass rounded-full">
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
                  className="text-primary"
                >
                  <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
                <span className="text-xs md:text-sm text-foreground">ClearLine LLC</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                className="group relative px-6 py-3 bg-primary/10 border border-primary text-primary rounded-lg font-medium overflow-hidden transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
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
                    className="transition-transform group-hover:translate-x-1"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-border text-foreground rounded-lg font-medium transition-all duration-300 hover:border-primary/50 hover:text-primary"
              >
                Get in Touch
              </a>
            </motion.div>
          </div>

          {/* RIGHT SIDE - 3D Interactive Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="order-1 lg:order-2 flex items-center justify-center -my-12 lg:-my-0"
          >
            <div className="relative w-[380px] h-[380px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px]">
              {/* 3D WebGL Scene */}
              <Hero3DScene />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground font-mono">
            Explore dimensions
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
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
              className="text-primary"
            >
              <path d="M12 5v14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
