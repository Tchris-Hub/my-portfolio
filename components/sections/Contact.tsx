"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Mail, MapPin, Clock, Send, Check, AlertCircle, Loader2,
  Copy, CheckCheck, Github, Linkedin, Twitter, Calendar,
  MessageSquare, User, FileText, Sparkles, Briefcase, Code,
} from "lucide-react";

// Types & Interfaces
interface FormData { name: string; email: string; subject: string; message: string; }
interface FormErrors { name?: string; email?: string; subject?: string; message?: string; }
type FormStatus = "idle" | "loading" | "success" | "error";

// Floating Input Component
const FloatingInput = ({ label, type = "text", value, onChange, error, icon: Icon, required = false }: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const hasValue = value.length > 0;

  useEffect(() => {
    if (type === "email" && value) {
      setIsValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
    } else if (value.length >= 2) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [value, type]);

  return (
    <div className="relative">
      <div className={`relative rounded-xl border-2 transition-all duration-300 ${error ? "border-red-500 bg-red-500/5" : isFocused ? "border-purple-500 bg-purple-500/5" :
        isValid && hasValue ? "border-green-500/50 bg-green-500/5" : "border-white/10 bg-white/5"
        }`}>
        {Icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Icon size={20} /></div>}
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}
          className={`w-full bg-transparent px-4 py-4 text-white outline-none ${Icon ? "pl-12" : ""} ${isValid && hasValue ? "pr-12" : ""}`} />
        <motion.label animate={{
          y: isFocused || hasValue ? -32 : 0, scale: isFocused || hasValue ? 0.85 : 1,
          x: isFocused || hasValue ? (Icon ? -8 : -4) : Icon ? 32 : 0
        }} transition={{ duration: 0.2 }}
          className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none font-medium ${isFocused ? "text-emerald-400" : error ? "text-red-400" : "text-gray-400"}`}>
          {label}{required && <span className="text-red-400 ml-1">*</span>}
        </motion.label>
        <AnimatePresence>
          {isValid && hasValue && !error && (
            <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 180 }}
              className="absolute right-4 top-1/2 -translate-y-1/2"><Check size={20} className="text-green-400" /></motion.div>
          )}
          {error && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
            className="absolute right-4 top-1/2 -translate-y-1/2"><AlertCircle size={20} className="text-red-400" /></motion.div>}
          {isFocused && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className={`absolute inset-0 rounded-xl blur-xl -z-10 ${error ? "bg-red-500/20" : "bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20"}`} />}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {error && <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
          className="text-red-400 text-sm mt-2 ml-1">{error}</motion.p>}
      </AnimatePresence>
    </div>
  );
};

// Floating Textarea Component
const FloatingTextarea = ({ label, value, onChange, error, maxLength = 1000 }: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hasValue = value.length > 0;
  const isValid = value.length >= 10;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [value]);

  return (
    <div className="relative">
      <div className={`relative rounded-xl border-2 transition-all duration-300 ${error ? "border-red-500 bg-red-500/5" : isFocused ? "border-purple-500 bg-purple-500/5" :
        isValid && hasValue ? "border-green-500/50 bg-green-500/5" : "border-white/10 bg-white/5"
        }`}>
        <div className="absolute left-4 top-4 text-gray-400"><MessageSquare size={20} /></div>
        <textarea ref={textareaRef} value={value} onChange={(e) => { if (e.target.value.length <= maxLength) onChange(e.target.value); }}
          onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}
          className="w-full bg-transparent px-4 py-4 pl-12 text-white outline-none resize-none min-h-[120px]" rows={4} />
        <motion.label animate={{ y: isFocused || hasValue ? -32 : 0, scale: isFocused || hasValue ? 0.85 : 1, x: isFocused || hasValue ? -8 : 32 }}
          transition={{ duration: 0.2 }} className={`absolute left-4 top-4 pointer-events-none font-medium ${isFocused ? "text-emerald-400" : error ? "text-red-400" : "text-gray-400"}`}>
          {label}<span className="text-red-400 ml-1">*</span>
        </motion.label>
        <div className="absolute bottom-3 right-4 text-xs text-gray-500">{value.length}/{maxLength}</div>
        <AnimatePresence>
          {isFocused && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className={`absolute inset-0 rounded-xl blur-xl -z-10 ${error ? "bg-red-500/20" : "bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-slate-500/20"}`} />}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {error && <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
          className="text-red-400 text-sm mt-2 ml-1">{error}</motion.p>}
      </AnimatePresence>
    </div >
  );
};

// Custom Select Component
const CustomSelect = ({ label, value, onChange, options, error }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasValue = value.length > 0;
  const selectedOption = options.find((opt: any) => opt.value === value);

  return (
    <div className="relative">
      <div className={`relative rounded-xl border-2 transition-all duration-300 cursor-pointer ${error ? "border-red-500 bg-red-500/5" : isOpen ? "border-emerald-500 bg-emerald-500/5" :
        hasValue ? "border-green-500/50 bg-green-500/5" : "border-white/10 bg-white/5"
        }`} onClick={() => setIsOpen(!isOpen)}>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><FileText size={20} /></div>
        <div className="w-full bg-transparent px-4 py-4 pl-12 text-white pr-10">{selectedOption?.label || ""}</div>
        <motion.label animate={{ y: hasValue ? -32 : 0, scale: hasValue ? 0.85 : 1, x: hasValue ? -8 : 32 }} transition={{ duration: 0.2 }}
          className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none font-medium ${isOpen ? "text-emerald-400" : error ? "text-red-400" : "text-gray-400"}`}>
          {label}<span className="text-red-400 ml-1">*</span>
        </motion.label>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </motion.div>
        <AnimatePresence>
          {isOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-slate-500/20 blur-xl -z-10" />}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }} className="absolute top-full mt-2 w-full bg-gray-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50">
            {options.map((option: any, index: number) => (
              <motion.div key={option.value} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}
                onClick={() => { onChange(option.value); setIsOpen(false); }}
                className="px-4 py-3 hover:bg-emerald-500/20 cursor-pointer transition-colors flex items-center gap-3 text-white">
                {option.icon && <option.icon size={18} className="text-emerald-400" />}
                {option.label}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {error && <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
          className="text-red-400 text-sm mt-2 ml-1">{error}</motion.p>}
      </AnimatePresence>
    </div>
  );
};

// Submit Button
const SubmitButton = ({ status, onClick }: { status: FormStatus; onClick: () => void }) => (
  <motion.button type="button" onClick={onClick} disabled={status === "loading" || status === "success"}
    whileHover={status === "idle" ? { scale: 1.02, y: -2 } : {}} whileTap={status === "idle" ? { scale: 0.98 } : {}}
    className={`relative w-full py-4 rounded-xl font-bold text-lg overflow-hidden transition-all duration-300 ${status === "success" ? "bg-green-500" : status === "error" ? "bg-red-500" : "bg-gradient-to-r from-emerald-500 via-teal-500 to-slate-600"
      } ${status === "loading" || status === "success" ? "cursor-not-allowed" : "cursor-pointer"}`}>
    {status === "idle" && <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />}
    <span className="relative z-10 flex items-center justify-center gap-2">
      {status === "idle" && (<>Send Message<motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><Send size={20} /></motion.div></>)}
      {status === "loading" && (<>Sending...<Loader2 size={20} className="animate-spin" /></>)}
      {status === "success" && (<>Message Sent!<Check size={20} /></>)}
      {status === "error" && (<>Try Again<AlertCircle size={20} /></>)}
    </span>
    <motion.div animate={status === "idle" ? { opacity: [0.5, 1, 0.5] } : { opacity: 0 }} transition={{ duration: 2, repeat: Infinity }}
      className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-slate-600 blur-xl -z-10" />
  </motion.button>
);

// Contact Info Card
const ContactInfoCard = ({ icon: Icon, label, value, action, delay }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (action) { action(); setCopied(true); setTimeout(() => setCopied(false), 2000); }
  };

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay, duration: 0.6 }} whileHover={{ y: -4, scale: 1.02 }}
      className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-purple-400/30 transition-all group cursor-pointer"
      onClick={handleCopy}>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/0 via-teal-500/0 to-slate-500/0 opacity-0 group-hover:opacity-100 blur-xl -z-10 transition-opacity duration-300" />
      <div className="flex items-start gap-4">
        <motion.div whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.6 }}
          className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-400/30">
          <Icon size={24} className="text-emerald-400" />
        </motion.div>
        <div className="flex-1">
          <p className="text-sm text-gray-400 mb-1">{label}</p>
          <p className="text-white font-semibold">{value}</p>
        </div>
        {action && <motion.div animate={copied ? { scale: [1, 1.2, 1] } : {}} className="text-gray-400 group-hover:text-emerald-400 transition-colors">
          {copied ? <CheckCheck size={20} /> : <Copy size={20} />}
        </motion.div>}
      </div>
    </motion.div>
  );
};

// Social Link
const SocialLink = ({ icon: Icon, href, label, delay }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.a ref={ref} href={href} target="_blank" rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0 }} animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{ delay, duration: 0.5, type: "spring" }} whileHover={{ scale: 1.2, rotate: 360, y: -8 }} whileTap={{ scale: 0.9 }}
      className="relative p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-gradient-to-br hover:from-emerald-500/20 hover:to-teal-500/20 hover:border-emerald-400/50 transition-all group">
      <Icon size={24} className="text-gray-400 group-hover:text-white transition-colors" />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-50 blur-xl -z-10 transition-opacity" />
    </motion.a>
  );
};

// Confetti
const Confetti = () => {
  const particles = Array.from({ length: 50 });
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((_, i) => (
        <motion.div key={i} initial={{ x: "50vw", y: "50vh", scale: 0, opacity: 1 }}
          animate={{ x: `${Math.random() * 100}vw`, y: `${Math.random() * 100}vh`, scale: [0, 1, 0], opacity: [1, 1, 0], rotate: Math.random() * 360 }}
          transition={{ duration: 2, ease: "easeOut", delay: Math.random() * 0.2 }} className="absolute w-3 h-3 rounded-full"
          style={{ background: ["#10b981", "#14b8a6", "#334155", "#059669", "#0d9488"][Math.floor(Math.random() * 5)] }} />
      ))}
    </div>
  );
};

// Main Contact Component
export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [showConfetti, setShowConfetti] = useState(false);

  const subjectOptions = [
    { value: "project", label: "Project Collaboration", icon: Sparkles },
    { value: "job", label: "Job Opportunity", icon: Briefcase },
    { value: "freelance", label: "Freelance Work", icon: Code },
    { value: "hello", label: "Just Saying Hi", icon: MessageSquare },
    { value: "other", label: "Other", icon: FileText },
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (formData.name.length < 2) newErrors.name = "Name must be at least 2 characters";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email address";
    if (!formData.subject) newErrors.subject = "Please select a subject";
    if (formData.message.length < 10) newErrors.message = "Message must be at least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
      return;
    }

    setStatus("loading");

    // Simulate a brief processing delay for UX
    setTimeout(() => {
      const { name, email, subject, message } = formData;

      // Construct the detailed WhatsApp message with bold headers
      const whatsappMessage = `*New Portfolio Inquiry*\n\n` +
        `*Name:* ${name}\n` +
        `*Email:* ${email}\n` +
        `*Subject:* ${subjectOptions.find(opt => opt.value === subject)?.label || subject}\n\n` +
        `*Message:*\n${message}`;

      // Build the WhatsApp API URL (International format for 09017007420 is 2349017007420)
      const whatsappUrl = `https://wa.me/2349017007420?text=${encodeURIComponent(whatsappMessage)}`;

      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');

      // Show success state on the form
      setStatus("success");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);

      // Reset form after a delay
      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "" });
        setStatus("idle");
      }, 3000);
    }, 1500);
  };

  const copyToClipboard = (text: string) => navigator.clipboard.writeText(text);

  return (
    <section id="contact" className="relative min-h-screen w-full bg-background py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-64 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-64 w-[600px] h-[600px] bg-slate-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }} className="text-center mb-16 md:mb-20">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2, duration: 0.6 }} className="inline-block mb-4">
            <span className="text-sm uppercase tracking-[0.3em] text-gray-400 font-medium">Get In Touch</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-slate-400 bg-clip-text text-transparent">Let's Work Together</span>
          </h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }} className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Have a project in mind? Let's turn your vision into reality. I'm always excited to discuss new opportunities!
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 max-w-7xl mx-auto">
          <div className="space-y-6">
            <ContactInfoCard icon={Mail} label="Email" value="tchimezie475@gmail.com"
              action={() => copyToClipboard("tchimezie475@gmail.com")} delay={0.6} />
            <ContactInfoCard icon={MapPin} label="Location" value="Remote • Available Worldwide" delay={0.7} />
            <ContactInfoCard icon={Clock} label="Response Time" value="Usually within 24 hours" delay={0.8} />

            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.9, duration: 0.6 }} className="pt-6">
              <p className="text-gray-400 text-sm mb-4 text-center">Connect with me</p>
              <div className="flex justify-center gap-4">
                <SocialLink icon={Github} href="https://github.com/Tchris-Hub" label="GitHub" delay={1.0} />
                <SocialLink icon={Briefcase} href="https://www.upwork.com/freelancers/~01878b4d081b286694" label="Upwork" delay={1.1} />
                <SocialLink icon={Twitter} href="https://x.com/home" label="Twitter" delay={1.2} />
                <SocialLink icon={Linkedin} href="#" label="LinkedIn" delay={1.3} />
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ delay: 0.6, duration: 0.6 }} className="relative">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center py-20 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}
                    className="w-24 h-24 rounded-full bg-green-500/20 border-4 border-green-500 flex items-center justify-center mb-6">
                    <Check size={48} className="text-green-500" />
                  </motion.div>
                  <h3 className="text-3xl font-black text-white mb-4">Message Sent!</h3>
                  <p className="text-gray-300 text-lg">Thanks for reaching out! I'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <motion.div key="form" className="space-y-6">
                  <FloatingInput label="Your Name" value={formData.name} onChange={(v: string) => setFormData({ ...formData, name: v })}
                    error={errors.name} icon={User} required />
                  <FloatingInput label="Email Address" type="email" value={formData.email}
                    onChange={(v: string) => setFormData({ ...formData, email: v })} error={errors.email} icon={Mail} required />
                  <CustomSelect label="Subject" value={formData.subject} onChange={(v: string) => setFormData({ ...formData, subject: v })}
                    options={subjectOptions} error={errors.subject} />
                  <FloatingTextarea label="Your Message" value={formData.message}
                    onChange={(v: string) => setFormData({ ...formData, message: v })} error={errors.message} />
                  <SubmitButton status={status} onClick={handleSubmit} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {showConfetti && <Confetti />}
    </section>
  );
};
