"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  grade?: string;
  type: "university" | "highschool";
}

interface Certification {
  id: string;
  title: string;
  organization: string;
  period: string;
  description: string;
  skills: string[];
}

const education: Education[] = [
  {
    id: "ukz",
    institution: "Kadri Zeka University, Gjilan",
    degree: "Bachelor of Computer Science",
    period: "2020 - 2023",
    grade: "9.00",
    type: "university",
  },
  {
    id: "gymnasium",
    institution: "Gymnasium (High School), Gjilan",
    degree: "General Education",
    period: "2017 - 2020",
    type: "highschool",
  },
];

const certifications: Certification[] = [
  {
    id: "big-data",
    title: "ICT & Digital Skills Training on Big Data Analytics",
    organization: "ICT for Kosovo's Growth",
    period: "Feb 2025 - Jul 2025",
    description:
      "Comprehensive training in Python programming, data processing, data analysis, and modern analytical tools.",
    skills: ["Python", "Data Processing", "Data Analysis", "Data Visualization", "Big Data"],
  },
  {
    id: "web-pro",
    title: "Web Development Professional",
    organization: "ICT for Kosovo's Growth",
    period: "Sep 2024 - Feb 2025",
    description:
      "300-hour professional program with hands-on experience in full-stack web development.",
    skills: ["HTML", "CSS", "C#", ".NET", "Git", "Responsive Design"],
  },
  {
    id: "backend",
    title: "Back-End Development",
    organization: "itedu",
    period: "Oct 2022 - Jan 2023",
    description:
      "Hands-on experience with Node.js, Express.js, and MongoDB, developing RESTful APIs.",
    skills: ["Node.js", "Express.js", "MongoDB", "RESTful APIs"],
  },
  {
    id: "webdev",
    title: "Web Development Course",
    organization: "itedu",
    period: "Mar 2022 - Sep 2022",
    description:
      "Intensive training as part of the CSSF project funded by the UK Government.",
    skills: ["HTML", "CSS", "JavaScript", "MySQL", "PHP"],
  },
  {
    id: "graphic",
    title: "Graphic Designer",
    organization: "Social Hub",
    period: "Oct 2021 - Jan 2022",
    description:
      "Trained in creating graphics, video content, and marketing visuals.",
    skills: ["Adobe Photoshop", "Adobe Illustrator", "Adobe Premiere"],
  },
  {
    id: "marketing",
    title: "Training for Digital Marketing",
    organization: "Social Hub",
    period: "Oct 2021 - Dec 2021",
    description:
      "Learned to design and manage social media campaigns, create ads, and analyze engagement metrics.",
    skills: ["Social Media", "Ad Campaigns", "Analytics", "Content Planning"],
  },
];

export function EducationSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState<"education" | "certifications">("education");

  return (
    <section
      id="education"
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
          <span className="text-primary font-mono text-sm">05.</span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-bright">
            Knowledge Orbit
          </h2>
          <div className="flex-1 h-px bg-border" />
        </div>
        <p className="text-muted-foreground max-w-xl">
          Academic foundations and continuous learning through certifications and
          professional development.
        </p>
      </motion.div>

      {/* Tab navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-5xl mx-auto mb-12"
      >
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setActiveTab("education")}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === "education"
                ? "bg-primary/20 text-primary border border-primary/50"
                : "glass border border-border hover:border-primary/30 text-muted-foreground"
            }`}
          >
            <span className="flex items-center gap-2">
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
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
              Education
            </span>
          </button>
          <button
            onClick={() => setActiveTab("certifications")}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === "certifications"
                ? "bg-accent/20 text-accent border border-accent/50"
                : "glass border border-border hover:border-accent/30 text-muted-foreground"
            }`}
          >
            <span className="flex items-center gap-2">
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
                <circle cx="12" cy="8" r="6" />
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
              </svg>
              Certifications
            </span>
          </button>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-5xl mx-auto">
        {activeTab === "education" ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="glass rounded-2xl p-6 lg:p-8 border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                        edu.type === "university"
                          ? "bg-primary/20 text-primary"
                          : "bg-accent/20 text-accent"
                      }`}
                    >
                      {edu.type === "university" ? (
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
                          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                          <path d="M6 12v5c3 3 9 3 12 0v-5" />
                        </svg>
                      ) : (
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
                          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-text-bright mb-1">
                        {edu.degree}
                      </h3>
                      <p className="text-foreground">{edu.institution}</p>
                      <p className="text-sm font-mono text-muted-foreground mt-1">
                        {edu.period}
                      </p>
                    </div>
                  </div>
                  {edu.grade && (
                    <div className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-xl text-center">
                      <p className="text-xs text-muted-foreground">Average Grade</p>
                      <p className="text-2xl font-bold text-primary">{edu.grade}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="glass rounded-2xl p-6 border border-border hover:border-accent/30 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between gap-2 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 text-accent flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
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
                      <circle cx="12" cy="8" r="6" />
                      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                    </svg>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">
                    {cert.period}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-text-bright mb-1 leading-tight">
                  {cert.title}
                </h3>
                <p className="text-sm text-accent mb-3">{cert.organization}</p>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {cert.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-secondary/50 border border-border rounded text-xs font-mono text-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
