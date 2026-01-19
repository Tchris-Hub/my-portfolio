"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Download, Mail, Github, Twitter, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/Tchris-Hub", label: "GitHub" },
  { icon: Briefcase, href: "https://www.upwork.com/freelancers/~01878b4d081b286694", label: "Upwork" },
  { icon: Twitter, href: "https://x.com/home", label: "Twitter" },
];

// Animated Hamburger
const AnimatedHamburger = ({ isOpen }: { isOpen: boolean }) => (
  <button className="w-6 h-5 flex flex-col justify-between relative z-50">
    <motion.span
      animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="w-full h-0.5 bg-white block origin-center rounded-full"
    />
    <motion.span
      animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className="w-full h-0.5 bg-white block rounded-full"
    />
    <motion.span
      animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="w-full h-0.5 bg-white block origin-center rounded-full"
    />
  </button>
);

// Shimmer effect for CTA button
const Shimmer = () => (
  <motion.div
    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
    animate={{ translateX: ["0%", "200%"] }}
    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
  />
);

export const NavbarNew: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Professional load animation
  useEffect(() => {
    const timer = setTimeout(() => setHasLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Detect scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      setLastScrollY(currentScrollY);

      // Set scrolled state
      setIsScrolled(currentScrollY > 50);

      // Detect active section
      const sections = navLinks.map((link) => link.href.substring(1));
      const scrollPosition = currentScrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const navHeight = navRef.current?.offsetHeight || 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: hasLoaded ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Main Navbar */}
      <motion.nav
        ref={navRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: hasLoaded ? 0 : -100,
          opacity: hasLoaded ? 1 : 0,
          backgroundColor: isScrolled
            ? "rgba(0, 0, 0, 0.8)"
            : "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(12px)",
          boxShadow: isScrolled
            ? "0 10px 30px -10px rgba(139, 92, 246, 0.3)"
            : "0 0 0 0 rgba(139, 92, 246, 0)",
        }}
        transition={{
          y: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
          backgroundColor: { duration: 0.2 },
          backdropFilter: { duration: 0.2 },
          boxShadow: { duration: 0.2 },
        }}
        className="fixed top-1 left-0 right-0 z-50 mx-4 rounded-2xl border border-white/10"
      >
        {/* Floating animation */}
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="flex items-center justify-between"
              animate={{
                height: isScrolled ? "70px" : "80px",
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Logo */}
              <motion.a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("#home");
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer"
              >
                <Logo className={isScrolled ? "scale-90" : "scale-100"} />
              </motion.a>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-1">
                {navLinks.map((link, index) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, y: -20, scale: 0.8 }}
                      animate={{ opacity: hasLoaded ? 1 : 0, y: hasLoaded ? 0 : -20, scale: hasLoaded ? 1 : 0.8 }}
                      transition={{
                        delay: 0.6 + index * 0.08,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                    >
                      <motion.a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(link.href);
                        }}
                        className={cn(
                          "relative px-4 py-2 text-sm font-medium transition-colors rounded-lg group",
                          isActive ? "text-white" : "text-gray-light hover:text-white"
                        )}
                        whileHover={{ y: -2 }}
                        whileTap={{ y: 0 }}
                      >
                        {/* Background pill on hover */}
                        <motion.div
                          className="absolute inset-0 rounded-lg bg-white/5"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileHover={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2 }}
                        />

                        {/* Active indicator */}
                        {isActive && (
                          <motion.div
                            layoutId="activeNav"
                            className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30"
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 30,
                            }}
                          />
                        )}

                        <span className="relative z-10">{link.name}</span>

                        {/* Underline animation */}
                        <motion.div
                          className="absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-primary to-secondary"
                          initial={{ width: 0, x: "-50%" }}
                          whileHover={{ width: "80%", x: "-50%" }}
                          transition={{ duration: 0.3 }}
                        />

                        {/* Glow effect on active */}
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl"
                            animate={{ opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </motion.a>
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA Button (Desktop) */}
              <motion.div
                className="hidden lg:flex items-center gap-3"
                initial={{ opacity: 0, x: 30, scale: 0.8 }}
                animate={{ opacity: hasLoaded ? 1 : 0, x: hasLoaded ? 0 : 30, scale: hasLoaded ? 1 : 0.8 }}
                transition={{
                  delay: 1.0,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <motion.a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("#contact");
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative overflow-hidden px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm shadow-lg shadow-primary/30 group"
                >
                  <Shimmer />
                  <span className="relative z-10 flex items-center gap-2">
                    <Mail size={16} />
                    Let's Talk
                  </span>

                  {/* Breathing animation */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.a>

                <motion.a
                  href="/resume.pdf"
                  download
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all"
                  title="Download Resume"
                >
                  <Download size={18} className="text-white" />
                </motion.a>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.div
                className="lg:hidden"
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: hasLoaded ? 1 : 0, scale: hasLoaded ? 1 : 0, rotate: hasLoaded ? 0 : -180 }}
                transition={{
                  delay: 0.8,
                  duration: 0.5,
                  ease: [0.34, 1.56, 0.64, 1]
                }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <AnimatedHamburger isOpen={isMobileMenuOpen} />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Gradient border animation */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{
            scaleX: hasLoaded ? 1 : 0,
            opacity: hasLoaded ? [0.3, 0.6, 0.3] : 0
          }}
          transition={{
            scaleX: { duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 3, repeat: Infinity }
          }}
        />
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-24 left-4 right-4 z-50 bg-background/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl lg:hidden overflow-hidden"
            >
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

              <div className="relative p-6 space-y-1">
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={cn(
                        "block px-4 py-3 text-lg font-semibold rounded-lg transition-all",
                        isActive
                          ? "bg-gradient-to-r from-primary/20 to-secondary/20 text-white border border-primary/30"
                          : "text-gray-light hover:text-white hover:bg-white/5"
                      )}
                      whileTap={{ scale: 0.98 }}
                    >
                      {link.name}
                    </motion.a>
                  );
                })}

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  className="pt-4 space-y-3"
                >
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => scrollToSection("#contact")}
                    className="w-full"
                  >
                    <Mail size={18} />
                    Let's Talk
                  </Button>

                  <a
                    href="/resume.pdf"
                    download
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all"
                  >
                    <Download size={18} />
                    Download Resume
                  </a>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="pt-6 border-t border-white/10"
                >
                  <div className="flex justify-center gap-4">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all"
                      >
                        <social.icon size={20} className="text-white" />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
