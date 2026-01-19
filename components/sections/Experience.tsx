"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Briefcase, GraduationCap, Code, Award, Rocket, Zap, Shield, Star } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { ExperienceItem } from "@/types";

// ============================================================================
// TYPES
// ============================================================================
// Imported from @/types

//Map types to icons
const getIconForType = (type: string) => {
  switch (type) {
    case "work": return Briefcase;
    case "education": return GraduationCap;
    case "achievement": return Award;
    default: return Star;
  }
};

// ============================================================================
// TIMELINE ITEM COMPONENT
// ============================================================================
const TimelineItem = ({
  experience,
  index,
}: {
  experience: ExperienceItem;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isLeft = index % 2 === 0;

  const Icon = getIconForType(experience.type);

  // Type-based colors
  const getTypeColor = () => {
    switch (experience.type) {
      case "work":
        return "from-emerald-500 to-teal-500";
      case "education":
        return "from-teal-600 to-slate-600";
      case "achievement":
        return "from-slate-500 to-emerald-600";
      default:
        return "from-emerald-500 to-slate-500";
    }
  };

  return (
    <div ref={ref} className="relative flex items-center justify-center mb-16 md:mb-24">
      {/* Desktop Layout - Alternating sides */}
      <div className="hidden md:grid md:grid-cols-2 gap-8 w-full max-w-6xl">
        {isLeft ? (
          <>
            {/* Card on LEFT side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-right"
            >
              <div className="pr-8">
                <TimelineCard experience={experience} isLeft={true} getTypeColor={getTypeColor} Icon={Icon} />
              </div>
            </motion.div>
            {/* Empty RIGHT side */}
            <div></div>
          </>
        ) : (
          <>
            {/* Empty LEFT side */}
            <div></div>
            {/* Card on RIGHT side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-left"
            >
              <div className="pl-8">
                <TimelineCard experience={experience} isLeft={false} getTypeColor={getTypeColor} Icon={Icon} />
              </div>
            </motion.div>
          </>
        )}
      </div>

      {/* Mobile Layout - All on right */}
      <div className="md:hidden w-full max-w-2xl pl-12">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <TimelineCard experience={experience} isLeft={false} getTypeColor={getTypeColor} Icon={Icon} />
        </motion.div>
      </div>

      {/* Center dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ delay: 0.4, duration: 0.5, type: "spring", stiffness: 200 }}
        className="absolute left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${getTypeColor()} shadow-lg shadow-emerald-500/50 border-4 border-background`} />
      </motion.div>

      {/* Mobile dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ delay: 0.4, duration: 0.5, type: "spring", stiffness: 200 }}
        className="absolute left-0 md:hidden"
      >
        <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${getTypeColor()} shadow-lg shadow-emerald-500/50 border-4 border-background`} />
      </motion.div>
    </div>
  );
};

// ============================================================================
// TIMELINE CARD COMPONENT
// ============================================================================
const TimelineCard = ({
  experience,
  isLeft,
  getTypeColor,
  Icon,
}: {
  experience: ExperienceItem;
  isLeft: boolean;
  getTypeColor: () => string;
  Icon: any;
}) => {
  return (
    <div className="group">
      {/* Year badge */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={`inline-block mb-4 px-4 py-2 rounded-full bg-gradient-to-r ${getTypeColor()} text-white text-sm font-bold shadow-lg`}
      >
        {experience.year}
      </motion.div>

      {/* Card */}
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-emerald-400/30 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-emerald-500/20"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/0 via-teal-500/0 to-slate-500/0 opacity-0 group-hover:opacity-100 blur-xl -z-10 transition-opacity duration-300" />

        <div className={`${isLeft ? "text-right" : "text-left"}`}>
          {/* Icon */}
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${getTypeColor()} bg-opacity-20 border border-white/20 mb-4`}
          >
            <Icon size={24} className="text-white" />
          </motion.div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-black text-white mb-2 group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-teal-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
            {experience.title}
          </h3>

          {/* Company */}
          <p className="text-emerald-400 font-semibold mb-3">{experience.company}</p>

          {/* Description */}
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            {experience.description}
          </p>

          {/* Skills */}
          <div className={`flex flex-wrap gap-2 ${isLeft ? "justify-end" : "justify-start"}`}>
            {experience.skills.map((skill, idx) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-400 hover:text-white hover:border-emerald-400/30 transition-all cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ============================================================================
// MAIN EXPERIENCE COMPONENT
// ============================================================================
export const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const containerRef = useRef<HTMLDivElement>(null);
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Scroll progress for timeline line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const fetchExperiences = async () => {
      const { data, error } = await supabase
        .from("experience")
        .select("*")
        .order("year", { ascending: false }); // Sort by year descending (roughly) or add a sort_order field later.

      if (data) {
        setExperiences(data as ExperienceItem[]);
      }
      // If no data or error, we could fall back to hardcoded, but for CMS purposes we want real data.
      // But to prevent empty page on first load if DB is empty, let's keep using empty array and maybe show a message?
      // User can add data via admin.
      setLoading(false);
    };

    fetchExperiences();
  }, []);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative min-h-screen w-full bg-background py-20 md:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-64 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-64 w-[600px] h-[600px] bg-slate-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block mb-4"
          >
            <span className="text-sm uppercase tracking-[0.3em] text-gray-400 font-medium">
              My Journey
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-slate-400 bg-clip-text text-transparent">
              Experience & Education
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            From starting my tech journey in 2020 to leading complex projects for global clients.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line - Desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2 hidden md:block">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-emerald-500 via-teal-500 to-slate-500 origin-top"
            />
          </div>

          {/* Vertical line - Mobile */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white/10 md:hidden">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-emerald-500 via-teal-500 to-slate-500 origin-top"
            />
          </div>

          {/* Timeline items */}
          <div className="relative">
            {experiences.map((experience, index) => (
              <TimelineItem key={experience.id} experience={experience} index={index} />
            ))}

            {!loading && experiences.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No experience items found. Add them in the Admin Dashboard.
              </div>
            )}
          </div>

          {/* End marker */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-slate-500 flex items-center justify-center shadow-lg shadow-emerald-500/50">
                <Zap size={24} className="text-white" />
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-slate-500 opacity-30 blur-xl"
              />
            </div>
          </motion.div>

          {/* Continue learning message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-8"
          >
            <p className="text-gray-400 text-lg font-medium">
              The journey continues...
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
