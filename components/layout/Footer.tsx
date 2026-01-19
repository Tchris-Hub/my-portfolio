"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Mail, MapPin, Clock, Heart, Coffee, Code, Github, Linkedin, Twitter, Calendar, Download, ExternalLink, Briefcase, Globe, Facebook, Instagram, Youtube } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useSiteContent } from "@/hooks/useSiteContent";

interface SocialItem {
  id: number;
  platform: string;
  url: string;
  icon_name: string;
}

const ICON_MAP: Record<string, any> = {
  Github, Linkedin, Twitter, Mail, Globe, Facebook, Instagram, Youtube, Briefcase
};

export const Footer = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [socials, setSocials] = useState<SocialItem[]>([]);

  // Fetch contact info
  const { content: contactContent } = useSiteContent("contact");
  const contactEmail = contactContent?.email || "tchimezie475@gmail.com";

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", timeZone: "America/New_York" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchSocials = async () => {
      const { data, error } = await supabase.from("socials").select("*").order("created_at", { ascending: true });
      if (!error && data) setSocials(data);
    };
    fetchSocials();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const quickLinks = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Experience", id: "experience" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-background to-black border-t border-white/10 overflow-hidden">
      <motion.div animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-500 to-slate-500 bg-[length:200%_100%]" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-slate-500/5 rounded-full blur-3xl" />
      </div>


      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Branding Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="lg:col-span-1">
            <motion.h3 whileHover={{ scale: 1.05 }} onClick={scrollToTop}
              className="text-3xl font-black bg-gradient-to-r from-emerald-400 via-teal-400 to-slate-400 bg-clip-text text-transparent mb-3 cursor-pointer inline-block">
              Praize Chimezie
            </motion.h3>
            <p className="text-gray-400 mb-4 leading-relaxed">Full-Stack Developer & Cybersecurity Enthusiast</p>

            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-emerald-400" />
                <span>Remote • Available Worldwide</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-emerald-400" />
                <span>EST • {currentTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-green-400 font-semibold">Available for Projects</span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs text-gray-600">
              <Coffee size={14} />
              <span>Fueled by coffee and curiosity</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }} className="lg:col-span-1">
            <h4 className="text-sm uppercase tracking-wider text-gray-400 font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li key={link.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
                  <button onClick={() => scrollToSection(link.id)}
                    className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <motion.span whileHover={{ x: 5 }} className="transition-transform">→</motion.span>
                    <span className="relative">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-emerald-400 to-teal-400 group-hover:w-full transition-all duration-300" />
                    </span>
                  </button>
                </motion.li>
              ))}
              <motion.li initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                <a href="/resume.pdf" download className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <Download size={16} />
                  <span className="relative">
                    Download Resume
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-emerald-400 to-teal-400 group-hover:w-full transition-all duration-300" />
                  </span>
                </a>
              </motion.li>
            </ul>
          </motion.div>

          {/* Connect Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-1">
            <h4 className="text-sm uppercase tracking-wider text-gray-400 font-semibold mb-6">Connect</h4>
            <div className="space-y-4">
              {socials.map((social, index) => {
                const Icon = ICON_MAP[social.icon_name] || Globe;
                return (
                  <motion.a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }} whileHover={{ x: 5, scale: 1.05 }}
                    className={`flex items-center gap-3 text-gray-400 hover:text-white transition-all group`}>
                    <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                      <Icon size={18} />
                    </div>
                    <span className="text-sm">{social.platform}</span>
                    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                );
              })}

              <motion.button onClick={copyEmail} whileHover={{ x: 5, scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 text-gray-400 hover:text-emerald-400 transition-all group w-full">
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                  <Mail size={18} />
                </div>
                <span className="text-sm">{emailCopied ? "Email Copied! ✓" : "Copy Email"}</span>
              </motion.button>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }} className="lg:col-span-1">
            <h4 className="text-sm uppercase tracking-wider text-gray-400 font-semibold mb-6">Let's Work Together</h4>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Have a project in mind? Let's create something amazing together!
            </p>
            <motion.button onClick={() => scrollToSection("contact")} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
              className="relative w-full px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-slate-600 text-white font-semibold overflow-hidden group">
              <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start a Conversation
                <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
              </span>
            </motion.button>

            <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-gray-500 mb-2">Response Time</p>
              <p className="text-sm text-white font-semibold">Usually within 24 hours</p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
            className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Praize Chimezie.</span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center gap-1">
              Made with <Heart size={14} className="text-red-400 fill-red-400" /> using Next.js & TypeScript
            </span>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
            className="flex items-center gap-4">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
            <span>•</span>
            <a href="/terms" className="hover:text-white transition-colors">Terms</a>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Code size={14} />
              <span>v2.0.0 // forged here</span>
            </span>
          </motion.div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button initial={{ opacity: 0, scale: 0 }} animate={{ opacity: showBackToTop ? 1 : 0, scale: showBackToTop ? 1 : 0 }}
        onClick={scrollToTop} whileHover={{ scale: 1.1, y: -4 }} whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 p-4 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-slate-600 text-white shadow-lg shadow-emerald-500/30 z-50 group">
        <ArrowUp size={24} />
        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-slate-600 blur-xl -z-10" />
      </motion.button>
    </footer>
  );
};