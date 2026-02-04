"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Project3DCard } from "./project-3d-card";

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

const projects: Project[] = [
  {
    id: "pdfkgj",
    title: "PDFKGJ",
    subtitle: "Digital Platform for Farmers of Gjilan",
    description:
      "Developed together with four other students under the mentorship of Prof. Dr. Lindita Nebiu Hyseni. A digital platform for farmers of the Municipality of Gjilan enabling registration and management of agricultural data.",
    technologies: ["PHP", "MySQL", "JavaScript", "HTML", "CSS", "Bootstrap"],
    features: [
      "User management for farmers, commissioners, officials, directors, and IT administrators",
      "Application and complaint reviewing system",
      "Reports and statistics generation",
      "Automated email notifications for preliminary and final results",
    ],
    role: "Full-Stack Developer (Team of 5)",
    impact: "Recognized as one of the most prominent projects at the Faculty of Computer Science, covered by national media",
    theme: "agricultural",
    link: "https://bujqesia-gjilan.com",
  },
  {
    id: "lnh-book",
    title: "LNH Book",
    subtitle: "Professor's Personal Portfolio & Student Project Management",
    description:
      "Developed a personal portfolio website for Prof. Dr. Lindita Nebiu Hyseni, allowing her to publish and manage student projects for the courses she taught. Recognized as the best project in Computer Science competitions on the 10th anniversary of UKZ.",
    technologies: ["JavaScript", "PHP", "MySQL", "Bootstrap", "HTML", "CSS"],
    features: [
      "Project posting and management system",
      "Professor's CV display",
      "Search and filter features for students/projects",
      "Student progress statistics and responsive interface",
    ],
    role: "Lead Developer",
    impact: "Best project in FShK competitions, received positive coverage in national media outlets",
    theme: "academic",
    link: "https://lnhbook.net",
  },
  {
    id: "patient-management",
    title: "Patient Data Management System",
    subtitle: "Bachelor's Thesis Project",
    description:
      "Developed as part of my Bachelor's thesis under the mentorship of Dr. Prof. Assoc. Artan Dermaku. The project addressed the problem of handwritten medical prescriptions by converting them into a structured and user-friendly system.",
    technologies: ["PHP", "JavaScript", "HTML", "CSS", "MySQL"],
    features: [
      "Digital prescription management replacing handwritten records",
      "Patient history stored in hospital database",
      "Emergency access to complete patient information",
      "Efficient registration, management, and retrieval of patient data",
    ],
    role: "Sole Developer (Bachelor's Thesis)",
    impact: "Solved the readability problem of handwritten prescriptions in healthcare",
    theme: "medical",
  },
  {
    id: "covid-vaccination",
    title: "COVID-19 Vaccination Management",
    subtitle: "Student Project",
    description:
      "Developed under the mentorship of Prof. Dr. Lindita Nebiu Hyseni. A web application for managing patients vaccinated against COVID-19, providing a structured platform to register and track patient vaccinations.",
    technologies: ["PHP", "JavaScript", "MySQL", "HTML", "CSS"],
    features: [
      "Patient vaccination registration and tracking",
      "Intuitive user interface design",
      "Basic report generation",
      "Data integrity and security measures",
    ],
    role: "Full-Stack Developer",
    impact: "Gained practical experience in full-stack development and building secure, user-friendly web applications",
    theme: "medical",
  },
];

export function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="projects"
      ref={ref}
      className="min-h-screen py-24 px-6 lg:px-24 relative"
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto mb-16"
      >
        <div className="flex items-center gap-4 mb-4">
          <span className="text-primary font-mono text-sm">04.</span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-bright">
            Project Galaxies
          </h2>
          <div className="flex-1 h-px bg-border" />
        </div>
        <p className="text-muted-foreground max-w-xl">
          Click on any card to flip and explore the project details. Each project
          represents a milestone in my development journey.
        </p>
      </motion.div>

      {/* 3D Flipping Project Cards Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <Project3DCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
