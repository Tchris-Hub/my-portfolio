"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Palette, Rocket, Users, Award, Coffee } from "lucide-react";
import Image from "next/image";

// ============================================================================
// STATS COMPONENT
// ============================================================================
const StatCard = ({
  number,
  label,
  delay
}: {
  number: string;
  label: string;
  delay: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative group"
    >
      <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-purple-400/30 transition-all duration-300">
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/0 to-slate-500/0 group-hover:from-emerald-500/10 group-hover:to-slate-500/10 transition-all duration-300"
        />

        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: delay + 0.2, duration: 0.5, type: "spring" }}
            className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-400 via-teal-400 to-slate-400 bg-clip-text text-transparent mb-2"
          >
            {number}
          </motion.div>
          <div className="text-sm md:text-base text-gray-400 font-medium">
            {label}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================================
// SKILL CARD COMPONENT
// ============================================================================
const SkillCard = ({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: any;
  title: string;
  description: string;
  delay: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="relative group"
    >
      <div className="relative h-full p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-purple-400/30 transition-all duration-300">
        {/* Gradient glow on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/0 via-teal-500/0 to-slate-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"
          initial={{ opacity: 0 }}
        />

        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-emerald-500/20 transition-all"
          >
            <Icon size={28} className="text-emerald-400" />
          </motion.div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-2 group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-teal-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================================
// MAIN ABOUT COMPONENT
// ============================================================================
// ============================================================================
// MAIN ABOUT COMPONENT
// ============================================================================
import { useSiteContent } from "@/hooks/useSiteContent";

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { content } = useSiteContent("about", {
    badge: "Get to know me",
    title: "About Me",
    description: "I'm a dedicated Full-Stack Developer specializing in high-performance web and mobile applications.",
    journey_title: "My Journey",
    journey_text: `<p>I'm a developer with a deep <span class="text-white font-semibold">love for building scalable systems and creative solutions</span>. From high-performance APIs to mobile experiences, I specialize in architecting software that is both robust and intuitive.</p>
     <p>My expertise lies in <span class="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent font-semibold">Full-Stack development</span> across React, Next.js, and Node.js. For mobile, I build native-grade applications with React Native. I also work with PHP and Laravel 12, leveraging mature <span class="text-white font-semibold">MVC patterns</span> to deliver maintainable, professional-grade code.</p>
     <p>I integrate <span class="text-white font-semibold">Advanced AI strategically</span>, using tools like Gemini for everything from research to optimizing data flows. I maintain a <span class="text-white font-semibold">calculated, safety-first workflow</span>, ensuring every line of code is manually verified and production-ready.</p>
     <p>Whether it's integrating <span class="text-white font-semibold">Gemini 2.5 Flash</span> into a healthcare chatbot or building native mobile features with React Native, I bring a thoughtful, systems-oriented approach to every project.</p>`,
    image: "/assets/about.png"
  });

  const stats = [
    { number: "6+", label: "Years Experience" },
    { number: "20+", label: "Projects Completed" },
    { number: "100%", label: "Dedication" },
  ];

  const skills = [
    {
      icon: Code2,
      title: "Full-Stack Development",
      description: "Building scalable applications with React, Next.js, Node.js, PHP, and Laravel 12 for robust solutions.",
    },
    {
      icon: Rocket,
      title: "Mobile Development",
      description: "Creating cross-platform mobile apps with React Native, leveraging native device features and APIs.",
    },
    {
      icon: Palette,
      title: "System Design",
      description: "Architecting elegant solutions to complex problems. I love designing systems that are scalable and maintainable.",
    },
    {
      icon: Users,
      title: "AI Integration",
      description: "Strategically integrating AI tools like Gemini into applications while maintaining safety and control.",
    },
    {
      icon: Award,
      title: "Calculated Approach",
      description: "Using AI tools thoughtfully for research and development, always verifying outputs for absolute safety.",
    },
    {
      icon: Coffee,
      title: "Continuous Learning",
      description: "Staying current with the latest technologies while being mindful about adopting new tools responsibly.",
    },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen w-full bg-background py-20 md:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-slate-500/10 rounded-full blur-3xl" />
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
              {content.badge}
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-slate-400 bg-clip-text text-transparent">
              {content.title}
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            {content.description}
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 md:gap-6 mb-20">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              number={stat.number}
              label={stat.label}
              delay={0.6 + index * 0.1}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Left Column - Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              {content.journey_title}
            </h3>

            <div
              className="space-y-4 text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content.journey_text }}
            />

            {/* CTA Button */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 via-teal-500 to-slate-600 text-white font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all group"
            >
              Let's Build Something
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
          </motion.div>

          {/* Right Column - Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ delay: 1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-full flex items-start justify-center md:pl-10"
          >
            {/* Profile Image Container */}
            <motion.div
              className="relative w-full max-w-md group"
              whileHover={{
                scale: 1.02,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Subtle backlight/glow - kept very subtle to blend well */}
              <div className="absolute inset-0 bg-emerald-500/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-700" />

              {/* Image with natural aspect ratio */}
              <div className="relative w-full rounded-2xl overflow-hidden border-none outline-none ring-0 shadow-none">
                <Image
                  src={content.image}
                  alt="Praize Chimezie - Full Stack Developer"
                  width={500}
                  height={600}
                  className="w-full h-auto object-contain border-none outline-none ring-0 shadow-none"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Core Expertise
            </span>
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <SkillCard
                key={skill.title}
                icon={skill.icon}
                title={skill.title}
                description={skill.description}
                delay={1.4 + index * 0.1}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
