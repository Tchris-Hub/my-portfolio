"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Twitter, Mail, ChevronDown, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// ANIMATED GRID BACKGROUND COMPONENT
// ============================================================================
const AnimatedGridBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Grid settings
    const gridSize = 50;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      pulsePhase: number;
    }> = [];

    // Create particles at grid intersections
    for (let x = 0; x < canvas.width; x += gridSize) {
      for (let y = 0; y < canvas.height; y += gridSize) {
        if (Math.random() > 0.7) {
          particles.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.3,
            pulsePhase: Math.random() * Math.PI * 2,
          });
        }
      }
    }

    let animationFrame: number;
    let time = 0;
    let currentMouseX = canvas.width / 2;
    let currentMouseY = canvas.height / 2;

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      currentMouseX = e.clientX;
      currentMouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      time += 0.01;
      ctx.fillStyle = "rgba(10, 10, 10, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid with wave effect
      ctx.strokeStyle = "rgba(16, 185, 129, 0.1)";
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        for (let y = 0; y < canvas.height; y += 5) {
          const wave = Math.sin(x * 0.01 + y * 0.01 + time) * 10;
          const distToMouse = Math.sqrt(
            Math.pow(x - currentMouseX, 2) + Math.pow(y - currentMouseY, 2)
          );
          const mouseInfluence = Math.max(0, 1 - distToMouse / 300) * 20;

          if (y === 0) {
            ctx.moveTo(x + wave + mouseInfluence, y);
          } else {
            ctx.lineTo(x + wave + mouseInfluence, y);
          }
        }
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 5) {
          const wave = Math.sin(x * 0.01 + y * 0.01 + time) * 10;
          const distToMouse = Math.sqrt(
            Math.pow(x - currentMouseX, 2) + Math.pow(y - currentMouseY, 2)
          );
          const mouseInfluence = Math.max(0, 1 - distToMouse / 300) * 20;

          if (x === 0) {
            ctx.moveTo(x, y + wave + mouseInfluence);
          } else {
            ctx.lineTo(x, y + wave + mouseInfluence);
          }
        }
        ctx.stroke();
      }

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Mouse repulsion
        const dx = particle.x - currentMouseX;
        const dy = particle.y - currentMouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          particle.x += (dx / dist) * force * 2;
          particle.y += (dy / dist) * force * 2;
        }

        // Pulse animation
        particle.pulsePhase += 0.05;
        const pulse = Math.sin(particle.pulsePhase) * 0.3 + 0.7;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${particle.opacity * pulse})`;
        ctx.fill();

        // Draw glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 3
        );
        gradient.addColorStop(0, `rgba(16, 185, 129, ${particle.opacity * 0.3})`);
        gradient.addColorStop(1, "rgba(16, 185, 129, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles
        particles.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${(1 - distance / 150) * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.6 }}
      />
      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-background/50" />
    </>
  );
};

// ============================================================================
// SCRAMBLE TEXT EFFECT
// ============================================================================
const ScrambleText = ({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

  useEffect(() => {
    let iteration = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < iteration) return text[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
          setIsComplete(true);
        }

        iteration += 1 / 3;
      }, 30);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span className={className}>
      {displayText}
      {!isComplete && <span className="animate-pulse">_</span>}
    </span>
  );
};

// ============================================================================
// ROTATING ROLES
// ============================================================================
const RotatingRoles = () => {
  const roles = [
    "Full-Stack Developer",
    "Systems Architect",
    "Creative Problem Solver",
    "Digital Craftsman",
  ];
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-10 md:h-12 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentRole}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-slate-400 bg-clip-text text-transparent">
            {roles[currentRole]}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// ============================================================================
// MAGNETIC BUTTON
// ============================================================================
const MagneticButton = ({
  children,
  className = "",
  onClick,
  variant = "primary",
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden px-6 py-3 rounded-lg font-semibold text-base transition-all group",
        variant === "primary"
          ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-slate-600 text-white shadow-lg shadow-emerald-500/30"
          : "border-2 border-white/30 text-white hover:border-emerald-400/60 hover:bg-white/5 hover:shadow-lg hover:shadow-emerald-500/20",
        className
      )}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Shimmer effect for primary */}
      {variant === "primary" && (
        <motion.div
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
          animate={{ translateX: ["-100%", "200%"] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
        />
      )}

      {/* Vibrant glow */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-lg blur-xl -z-10",
          variant === "primary"
            ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-slate-600"
            : "bg-emerald-500/50"
        )}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: variant === "primary" ? 0.8 : 0.4 }}
        transition={{ duration: 0.3 }}
      />

      {/* Secondary shimmer on hover */}
      {variant === "secondary" && (
        <motion.div
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-purple-400/20 to-transparent"
          initial={{ translateX: "-100%" }}
          whileHover={{ translateX: "200%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      )}

      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};

// ============================================================================
// SOCIAL LINKS
// ============================================================================
const SocialLinks = () => {
  const socials = [
    { icon: Github, href: "https://github.com/Tchris-Hub", label: "GitHub" },
    { icon: Briefcase, href: "https://www.upwork.com/freelancers/~01878b4d081b286694", label: "Upwork" },
    { icon: Twitter, href: "https://x.com/home", label: "Twitter" },
    { icon: Mail, href: "mailto:tchimezie475@gmail.com", label: "Email" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-8 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-6"
    >
      {/* Connecting line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent origin-top"
      />

      {socials.map((social, i) => (
        <motion.a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: -30, scale: 0 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            delay: 2.5 + i * 0.15,
            duration: 0.6,
            type: "spring",
            stiffness: 200,
            damping: 15
          }}
          whileHover={{ scale: 1.3, rotate: 360, x: 8 }}
          whileTap={{ scale: 0.9 }}
          className="relative p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-purple-500/20 hover:border-purple-400/50 transition-all group"
          aria-label={social.label}
        >
          <social.icon size={20} className="text-gray-400 group-hover:text-white transition-colors" />

          {/* Vibrant glow on hover */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary blur-xl opacity-0 group-hover:opacity-60 transition-opacity"
          />
        </motion.a>
      ))}
    </motion.div>
  );
};

// ============================================================================
// SCROLL INDICATOR
// ============================================================================
const ScrollIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 0.8 }}
      className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer group"
      onClick={() => {
        const nextSection = document.querySelector("#about");
        nextSection?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      <span className="text-xs uppercase tracking-wider text-gray-500 group-hover:text-gray-300 transition-colors">
        Scroll
      </span>

      {/* Simple line with dot */}
      <div className="relative h-16 w-px bg-gradient-to-b from-gray-600 to-transparent">
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary"
          animate={{ y: [0, 48, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
};

// ============================================================================
// MOUSE SPOTLIGHT EFFECT
// ============================================================================
const MouseSpotlight = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-20 transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.1), transparent 40%)`,
      }}
    />
  );
};

// ============================================================================
// FLOATING BADGE
// ============================================================================
const FloatingBadge = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2.8, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      className="absolute top-32 right-8 lg:right-32 hidden md:block"
    >
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 backdrop-blur-sm"
      >
        <span className="text-sm font-medium text-green-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Available for hire
        </span>
      </motion.div>
    </motion.div>
  );
};

import { supabase } from "@/lib/supabase";

// ============================================================================
// MAIN HERO COMPONENT
// ============================================================================
export const Hero = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    setHasLoaded(true);
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const { data } = await supabase
      .from("site_content")
      .select("content")
      .eq("section_key", "hero")
      .single();

    if (data?.content) {
      setContent(data.content);
    }
  };

  const scrollToProjects = () => {
    const projectsSection = document.querySelector("#projects");
    projectsSection?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    const contactSection = document.querySelector("#contact");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  const heroData = {
    badge: content?.badge || "Hi, I'm",
    name: content?.name || "Praize CHIMEZIE",
    roles: [
      content?.title_1 || "Full-Stack Developer",
      content?.title_2 || "Systems Architect",
      "Creative Problem Solver",
      "Digital Craftsman",
    ],
    description: content?.description || "I craft digital experiences that blend beautiful design with powerful code.",
    cta_primary: content?.cta_primary || "View My Work",
    cta_secondary: content?.cta_secondary || "Get In Touch",
    resume_url: content?.resume_url || ""
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-background flex items-center justify-center pt-24"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <AnimatedGridBackground />
      </div>

      {/* Mouse Spotlight */}
      <MouseSpotlight />

      {/* Social Links */}
      <SocialLinks />

      {/* Floating Badge */}
      <FloatingBadge />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: hasLoaded ? 1 : 0, y: hasLoaded ? 0 : 20 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm md:text-base uppercase tracking-[0.3em] text-gray-light font-medium"
          >
            {heroData.badge}
          </motion.div>

          {/* Name with Scramble Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: hasLoaded ? 1 : 0, scale: hasLoaded ? 1 : 0.95 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none">
              {hasLoaded ? (
                <ScrambleText
                  text={heroData.name}
                  delay={500}
                  className="bg-gradient-to-r from-emerald-400 via-teal-500 to-slate-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient"
                />
              ) : (
                <span className="bg-gradient-to-r from-emerald-400 via-teal-500 to-slate-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                  {heroData.name}
                </span>
              )}
            </h1>

            {/* Vibrant text glow */}
            <motion.div
              className="absolute inset-0 blur-3xl opacity-40 -z-10"
              animate={{
                background: [
                  "radial-gradient(ellipse at center, rgba(16,185,129,0.5) 0%, rgba(20,184,166,0.3) 50%, transparent 80%)",
                  "radial-gradient(ellipse at center, rgba(20,184,166,0.5) 0%, rgba(51,65,85,0.3) 50%, transparent 80%)",
                  "radial-gradient(ellipse at center, rgba(51,65,85,0.5) 0%, rgba(16,185,129,0.3) 50%, transparent 80%)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Additional glow layer */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-2xl -z-10" />
          </motion.div>

          {/* Rotating Roles */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: hasLoaded ? 1 : 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-4"
          >
            <div className="relative h-10 md:h-12 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={Math.floor(Date.now() / 3000) % heroData.roles.length}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-slate-400 bg-clip-text text-transparent">
                    {heroData.roles[Math.floor(Date.now() / 3000) % heroData.roles.length]}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: hasLoaded ? 1 : 0, y: hasLoaded ? 0 : 20 }}
            transition={{ delay: 1.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl leading-relaxed"
          >
            {heroData.description.includes("digital experiences") ? (
              <>
                I craft <span className="text-white font-semibold">digital experiences</span> that blend{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent font-semibold">beautiful design</span>{" "}
                with <span className="bg-gradient-to-r from-teal-400 to-slate-400 bg-clip-text text-transparent font-semibold">powerful code</span>.
              </>
            ) : heroData.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: hasLoaded ? 1 : 0, y: hasLoaded ? 0 : 30 }}
            transition={{ delay: 2.0, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <MagneticButton variant="primary" onClick={scrollToProjects}>
              {heroData.cta_primary}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </MagneticButton>

            <MagneticButton variant="secondary" onClick={scrollToContact}>
              <Mail size={18} />
              {heroData.cta_secondary}
            </MagneticButton>

            {heroData.resume_url && (
              <MagneticButton
                variant="secondary"
                className="border-emerald-500/30 hover:border-emerald-500/60"
                onClick={() => window.open(heroData.resume_url, '_blank')}
              >
                <Download size={18} className="text-emerald-400" />
                Download CV
              </MagneticButton>
            )}
          </motion.div>

          {/* Tech Stack Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: hasLoaded ? 1 : 0, y: hasLoaded ? 0 : 20 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-2 pt-6"
          >
            {["React", "TypeScript", "Next.js", "Node.js", "Tailwind"].map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.3 + i * 0.08, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                whileHover={{ scale: 1.1, y: -3 }}
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-xs font-medium text-gray-400 hover:text-white hover:border-purple-400/50 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 hover:shadow-lg hover:shadow-purple-500/20 transition-all cursor-default"
              >
                {tech}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};
