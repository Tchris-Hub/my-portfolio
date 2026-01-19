"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Project } from "@/types";

// ============================================================================
// PROJECT DATA
// ============================================================================
const projects: Project[] = [
  {
    id: 1,
    title: "Pharmacy Chat Bot",
    description: "High-performance pharmacy assistant integrated with Gemini AI.",
    long_description: "An intelligent pharmacy ecosystem designed to deliver accurate medication insights, dosage interaction guidance, and real-time health support. Built with a robust Node.js architecture and powered by Google's Gemini 2.5 Flash. This project reflects my commitment to building secure, AI-driven solutions for critical healthcare challenges.",
    image: "/projects/pharmacy-bot.png",
    images: [],
    category: "Web",
    tags: ["JavaScript", "Node.js", "Gemini AI", "Healthcare"],
    github_link: "https://github.com/Tchris-Hub/pharmacy-chat-bot",
    live_link: "",
    featured: true,
  },
  {
    id: 2,
    title: "Pharmacy Admin Dashboard",
    description: "Scaleable admin ecosystem for pharmaceutical inventory management.",
    long_description: "A professional-grade administrative dashboard designed for comprehensive pharmacy operations. This system manages inventory lifecycles, order tracking, and customer analytics through an intuitive, high-performance interface. Built with TypeScript for absolute reliability and type safety.",
    image: "/projects/pharmacy-admin.png",
    images: [],
    category: "Web",
    tags: ["TypeScript", "React", "Dashboard", "Healthcare"],
    github_link: "https://github.com/Tchris-Hub/pharmacy-frontend-admin-dashboard",
    live_link: "",
    featured: true,
  },
  {
    id: 3,
    title: "Metabolic Health App",
    description: "Track and improve your metabolic health",
    long_description: "A health-focused application designed to help users monitor and improve their metabolic health through tracking, insights, and personalized recommendations. Features comprehensive health metrics and progress visualization.",
    image: "/assets/projects/healthapp/WhatsApp Image 2025-12-04 at 05.53.48_c4e18e6c.jpg",
    images: [
      "/assets/projects/healthapp/WhatsApp Image 2025-12-04 at 05.53.48_c4e18e6c.jpg",
      "/assets/projects/healthapp/WhatsApp Image 2025-12-04 at 05.53.48_df29b390.jpg",
      "/assets/projects/healthapp/WhatsApp Image 2025-12-04 at 05.53.49_8a22809a.jpg",
      "/assets/projects/healthapp/WhatsApp Image 2025-12-04 at 05.53.49_ee65310a.jpg",
    ],
    category: "Mobile",
    tags: ["TypeScript", "Health", "Fitness", "Analytics"],
    github_link: "",
    live_link: "",
    featured: true,
  },
  {
    id: 4,
    title: "True-North",
    description: "Offline compass app built on native smartphone features",
    long_description: "A React Native mobile application that leverages native smartphone sensors and features to deliver a reliable offline compass experience. Built entirely on device capabilities like the magnetometer and accelerometer, True-North works without internet connectivity. This project showcases my expertise in React Native mobile development and my ability to work directly with native device APIs.",
    image: "/assets/projects/truenorth/WhatsApp Image 2025-12-03 at 04.37.58_48a5cc15.jpg",
    images: [
      "/assets/projects/truenorth/WhatsApp Image 2025-12-03 at 04.37.58_48a5cc15.jpg",
      "/assets/projects/truenorth/WhatsApp Image 2025-12-03 at 04.37.58_a882e570.jpg",
      "/assets/projects/truenorth/WhatsApp Image 2025-12-03 at 04.37.59_eb777bb6.jpg",
      "/assets/projects/truenorth/chatscreen.JPG",
    ],
    category: "Mobile",
    tags: ["React Native", "TypeScript", "Native APIs", "Mobile"],
    github_link: "https://github.com/Tchris-Hub/True-North",
    live_link: "",
    featured: false,
  },
  {
    id: 5,
    title: "Perfumexcella",
    description: "Premium fragrance e-commerce architecture.",
    long_description: "A high-performance e-commerce platform dedicated to premium fragrances. Features a sophisticated product catalog, seamless cart transitions, and an optimized checkout flow. Developed with a focus on elegant UI/UX and rapid server-side rendering for a premium shopping experience.",
    image: "/projects/perfumexcella.png",
    images: [],
    category: "Web",
    tags: ["TypeScript", "E-commerce", "React", "Shopping"],
    github_link: "https://github.com/Tchris-Hub/perfumexcella",
    live_link: "",
    featured: false,
  },
  {
    id: 6,
    title: "Quant",
    description: "Autonomous AI trading system powered by live market data.",
    long_description: "A sophisticated quantitative trading bot that leverages continuous live market data to execute complex trading strategies. Features regime-aware algorithms that adapt to market conditions, managing risk and capital allocation autonomously. Built to understand the nuances of financial markets better than humanly possible in real-time.",
    image: "placeholder-quant",
    images: [],
    category: "AI",
    tags: ["Python", "Machine Learning", "Live Trading", "FinTech"],
    github_link: "",
    live_link: "",
    featured: true,
  },
  {
    id: 7,
    title: "Too Sabi",
    description: "Terminal-based AI code auditor and security analyst.",
    long_description: "An advanced AI agent that lives in your terminal, diving deep into your codebase to find logic errors, security vulnerabilities, and subtle bugs that standard linters miss. It understands code patterns and context, providing 'vibe-check' reviews to elevate code quality and security.",
    image: "placeholder-toosabi",
    images: [],
    category: "AI",
    tags: ["AI Agent", "Security", "Code Analysis", "Terminal"],
    github_link: "",
    live_link: "",
    featured: true,
  },
  {
    id: 8,
    title: "My Rights",
    description: "AI legal advisor and automated contract generator.",
    long_description: "Democratizing access to justice with an AI companion that explains your legal rights in plain English. It reviews contracts to flag dangerous clauses before you sign and can generate legally binding agreements on demand, removing the barrier of expensive legal counsel.",
    image: "placeholder-myrights",
    images: [],
    category: "Mobile",
    tags: ["Legal Tech", "AI", "React Native", "Contract Analysis"],
    github_link: "",
    live_link: "",
    featured: true,
  },
];
// ============================================================================
// PROJECT CARD COMPONENT
// ============================================================================
const ProjectCard = ({
  project,
  delay,
  onClick,
}: {
  project: Project;
  delay: number;
  onClick: () => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className="relative group cursor-pointer rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-sm hover:border-emerald-400/30 transition-all duration-300"
    >
      {/* Image container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-900">
        {/* Project image or placeholder */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-teal-500/20 to-slate-500/20"
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {(project.image.startsWith("/assets/") || project.image.startsWith("/projects/")) ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-black text-white/10">
                {project.title.charAt(0)}
              </span>
            </div>
          )}
        </motion.div>

        {/* Color overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
          initial={{ opacity: 0.6 }}
          animate={isHovered ? { opacity: 1 } : { opacity: 0.6 }}
          transition={{ duration: 0.3 }}
        />

        {/* Hover overlay with details */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {project.live_link && (
                <motion.a
                  href={project.live_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                >
                  <ExternalLink size={18} className="text-white" />
                </motion.a>
              )}
              {project.github_link && (
                <motion.a
                  href={project.github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                >
                  <Github size={18} className="text-white" />
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Category badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/80 to-teal-500/80 backdrop-blur-sm text-xs font-semibold text-white">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-teal-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech stack tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag, index) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ delay: delay + 0.1 + index * 0.05 }}
              whileHover={{ scale: 1.1, y: -2 }}
              className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-400 hover:text-white hover:border-emerald-400/30 hover:bg-white/10 transition-all cursor-default"
            >
              {tag}
            </motion.span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-400">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/0 via-teal-500/0 to-slate-500/0 opacity-0 group-hover:opacity-100 blur-xl -z-10 transition-opacity duration-300"
        animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
      />
    </motion.div>
  );
};

// ============================================================================
// PROJECT MODAL
// ============================================================================
const ProjectModal = ({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = (project.images && project.images.length > 0) ? project.images : [project.image];
  const hasMultipleImages = images.length > 1;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        transition={{ type: "spring", damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl shadow-2xl"
      >
        {/* Close button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
        >
          <X size={24} className="text-white" />
        </motion.button>

        {/* Image Carousel */}
        <div className="relative aspect-video bg-gray-900">
          {images[currentImageIndex].startsWith("/assets/") || images[currentImageIndex].startsWith("/projects/") ? (
            <Image
              src={images[currentImageIndex]}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              fill
              className="object-contain"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-500/20 via-teal-500/20 to-slate-500/20">
              <span className="text-9xl font-black text-white/10">
                {project.title.charAt(0)}
              </span>
            </div>
          )}

          {/* Category badge */}
          <div className="absolute top-6 left-6">
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-sm font-semibold text-white shadow-lg">
              {project.category}
            </span>
          </div>

          {/* Carousel Navigation */}
          {hasMultipleImages && (
            <>
              <motion.button
                whileHover={{ scale: 1.1, x: -4 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 hover:bg-black/70 transition-all"
              >
                <ChevronLeft size={24} className="text-white" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1, x: 4 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 hover:bg-black/70 transition-all"
              >
                <ChevronRight size={24} className="text-white" />
              </motion.button>

              {/* Image indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    whileHover={{ scale: 1.2 }}
                    className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 w-6"
                      : "bg-white/50"
                      }`}
                  />
                ))}
              </div>

              {/* Image counter */}
              <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm">
                {currentImageIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-8">
          <h2 className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-emerald-400 via-teal-400 to-slate-400 bg-clip-text text-transparent">
            {project.title}
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            {project.long_description}
          </p>

          {/* Tech stack */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 text-sm font-medium text-white hover:border-emerald-400/60 transition-all cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4">
            {project.live_link && (
              <motion.a
                href={project.live_link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 via-teal-500 to-slate-600 text-white font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all"
              >
                <ExternalLink size={20} />
                View Live
              </motion.a>
            )}
            {project.github_link && (
              <motion.a
                href={project.github_link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-white/30 text-white font-semibold hover:border-emerald-400/60 hover:bg-white/5 transition-all"
              >
                <Github size={20} />
                View Code
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ============================================================================
// FEATURED PROJECTS CAROUSEL
// ============================================================================
const FeaturedProjects = ({
  projects,
  onProjectClick,
}: {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredProjects = projects.filter((p) => p.featured);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProjects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
  };

  // Auto-play carousel
  React.useEffect(() => {
    const interval = setInterval(() => {
      nextProject();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative mb-20">
      <h3 className="text-2xl md:text-3xl font-black text-center mb-8 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
        Featured Projects
      </h3>

      <div className="relative overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => onProjectClick(featuredProjects[currentIndex])}
            className="relative aspect-[21/9] cursor-pointer group"
          >
            {/* Background Image */}
            <div className="absolute inset-0 bg-gray-900 rounded-2xl overflow-hidden">
              {(featuredProjects[currentIndex].image.startsWith("/assets/") || featuredProjects[currentIndex].image.startsWith("/projects/")) ? (
                <Image
                  src={featuredProjects[currentIndex].image}
                  alt={featuredProjects[currentIndex].title}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-teal-500/20 to-slate-500/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[200px] font-black text-white/5">
                      {featuredProjects[currentIndex].title.charAt(0)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-2xl" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-sm font-semibold text-white mb-4">
                {featuredProjects[currentIndex].category}
              </span>
              <h4 className="text-3xl md:text-5xl font-black text-white mb-4">
                {featuredProjects[currentIndex].title}
              </h4>
              <p className="text-gray-300 text-lg max-w-2xl mb-6">
                {featuredProjects[currentIndex].description}
              </p>
              <div className="flex flex-wrap gap-2">
                {featuredProjects[currentIndex].tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <motion.button
          whileHover={{ scale: 1.1, x: -4 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevProject}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
        >
          <ChevronLeft size={24} className="text-white" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1, x: 4 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextProject}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
        >
          <ChevronRight size={24} className="text-white" />
        </motion.button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {featuredProjects.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.2 }}
              className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 w-8"
                : "bg-white/30"
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN PROJECTS COMPONENT
// ============================================================================
export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayProjects, setDisplayProjects] = useState<Project[]>(projects); // Default to static
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      // Import dynamically to avoid build issues if env is missing? No, standard import is fine.
      // Assuming supabase is imported at top level (I need to add the import separately)
      const { supabase } = await import("@/lib/supabase");

      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        // Direct assignment now works because types match!
        setDisplayProjects(data as Project[]);
      }
    };
    fetchProjects();
  }, []);

  const categories = ["All", "Web", "Mobile", "AI", "Security"];

  const filteredProjects =
    selectedCategory === "All"
      ? displayProjects
      : displayProjects.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="projects"
      className="relative min-h-screen w-full bg-background py-20 md:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-64 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-64 w-[600px] h-[600px] bg-slate-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block mb-4"
          >
            <span className="text-sm uppercase tracking-[0.3em] text-gray-400 font-medium">
              My Work
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-slate-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            A showcase of my recent work, featuring web applications, mobile apps, and security tools.
          </motion.p>
        </motion.div>

        {/* Featured Projects Carousel - Only show when "All" is selected */}
        {selectedCategory === "All" && (
          <FeaturedProjects
            projects={displayProjects}
            onProjectClick={(project) => setSelectedProject(project)}
          />
        )}

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${selectedCategory === category
                ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-slate-600 text-white shadow-lg shadow-emerald-500/30"
                : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-emerald-400/30"
                }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid - Bento Layout */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                delay={0.1 + index * 0.05}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 text-lg">
              No projects found in this category.
            </p>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
