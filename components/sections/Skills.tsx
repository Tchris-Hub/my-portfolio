"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2,
  Palette,
  Database,
  Server,
  Wrench,
  Shield,
  Lock,
  Bug,
  Terminal,
  Layers,
  Zap,
  Globe,
  Brain,
  Cpu,
  Bot,
  Sparkles
} from "lucide-react";

// ============================================================================
// MINIMAL SKILL PILL COMPONENT
// ============================================================================
const SkillPill = ({
  icon: Icon,
  name,
  delay,
}: {
  icon: any;
  name: string;
  delay: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.5, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="group relative"
    >
      <div className="relative flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-emerald-400/30 transition-all duration-300">
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/0 via-teal-500/0 to-slate-500/0 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300" />

        <div className="p-2 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
          <Icon size={20} className="text-emerald-400 group-hover:text-emerald-300 transition-colors" />
        </div>

        <span className="font-medium text-gray-200 group-hover:text-white transition-colors">
          {name}
        </span>
      </div>
    </motion.div>
  );
};

// ============================================================================
// MAIN SKILLS COMPONENT
// ============================================================================
export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState(0);

  const skillsData = [
    {
      title: "AI Integration & Models",
      icon: Brain,
      skills: [
        { icon: Bot, name: "Gemini 1.5 Pro" },
        { icon: Brain, name: "DeepSeek R1" },
        { icon: Sparkles, name: "Kimi k1.5" },
        { icon: Cpu, name: "OpenAI GPT-4o" },
        { icon: Terminal, name: "Ollama" },
        { icon: Layers, name: "Hugging Face" },
        { icon: Database, name: "Pinecone / ChromaDB" },
        { icon: Wrench, name: "Google Colab" },
      ],
    },
    {
      title: "Frontend Development",
      icon: Code2,
      skills: [
        { icon: Globe, name: "React" },
        { icon: Zap, name: "Next.js" },
        { icon: Layers, name: "TypeScript" },
        { icon: Code2, name: "JavaScript (ES6+)" },
        { icon: Palette, name: "Tailwind CSS" },
        { icon: Globe, name: "Three.js" },
        { icon: Layers, name: "Framer Motion" },
        { icon: Zap, name: "Redux / Zustand" },
      ],
    },
    {
      title: "Backend & Architecture",
      icon: Server,
      skills: [
        { icon: Server, name: "Node.js" },
        { icon: Code2, name: "Python" },
        { icon: Zap, name: "Laravel 11" },
        { icon: Database, name: "Supabase" },
        { icon: Database, name: "PostgreSQL" },
        { icon: Wrench, name: "Docker" },
        { icon: Terminal, name: "Linux Administration" },
        { icon: Layers, name: "Microservices" },
      ],
    },
    {
      title: "Mobile & Tools",
      icon: Shield,
      skills: [
        { icon: Layers, name: "React Native" },
        { icon: Wrench, name: "Expo" },
        { icon: Globe, name: "Cross-Platform" },
        { icon: Terminal, name: "Git & GitHub" },
        { icon: Wrench, name: "VS Code" },
        { icon: Shield, name: "Authentication" },
        { icon: Bug, name: "Jest / Testing" },
        { icon: Layers, name: "CI/CD Pipelines" },
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="relative min-h-screen w-full bg-background py-20 md:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -right-64 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -left-64 w-[500px] h-[500px] bg-slate-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-3xl" />
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
              My Arsenal
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-slate-400 bg-clip-text text-transparent">
              Tools & Technologies
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Leveraging cutting-edge AI models and robust frameworks to build next-generation applications.
          </motion.p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {skillsData.map((category, index) => (
            <motion.button
              key={category.title}
              onClick={() => setActiveCategory(index)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeCategory === index
                ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-slate-600 text-white shadow-lg shadow-emerald-500/30"
                : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-emerald-400/30"
                }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <category.icon size={20} />
                {category.title}
              </span>

              {/* Active indicator glow */}
              {activeCategory === index && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-slate-600 blur-xl opacity-50"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Active Category Skills */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Category header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-10"
          >
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-emerald-500/50" />
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
              >
                {React.createElement(skillsData[activeCategory].icon, { size: 24, className: "text-emerald-400" })}
              </motion.div>
              <h3 className="text-2xl font-bold text-white">
                {skillsData[activeCategory].title}
              </h3>
            </div>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-emerald-500/50" />
          </motion.div>

          {/* Skills grid - Staggered / "Flow" layout */}
          <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
            {skillsData[activeCategory].skills.map((skill, index) => (
              <SkillPill
                key={skill.name}
                icon={skill.icon}
                name={skill.name}
                delay={index * 0.05}
              />
            ))}
          </div>

          {/* Decorative Elements */}
          <div className="mt-12 flex justify-center opacity-30">
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-20"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-emerald-500/10 hover:border-emerald-500/30 text-white font-medium transition-all group backdrop-blur-sm"
          >
            See these in action
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
