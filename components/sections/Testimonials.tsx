"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================
interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  text: string;
}

// ============================================================================
// TESTIMONIALS DATA
// ============================================================================
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechStart Inc.",
    image: "/api/placeholder/100/100",
    rating: 5,
    text: "Working with Mathias was an absolute pleasure. His attention to detail and technical expertise transformed our vision into a stunning, high-performance web application. Highly recommended!",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager",
    company: "Digital Solutions",
    image: "/api/placeholder/100/100",
    rating: 5,
    text: "Exceptional work! Mathias delivered our project ahead of schedule with outstanding quality. His problem-solving skills and communication made the entire process seamless.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "Creative Agency",
    image: "/api/placeholder/100/100",
    rating: 5,
    text: "The website Mathias built for us exceeded all expectations. Not only is it visually stunning, but the performance and user experience are top-notch. A true professional!",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Founder",
    company: "StartupHub",
    image: "/api/placeholder/100/100",
    rating: 5,
    text: "Mathias brought our complex requirements to life with elegant solutions. His expertise in both frontend and backend development is impressive. Would definitely work with him again!",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    role: "CTO",
    company: "InnovateTech",
    image: "/api/placeholder/100/100",
    rating: 5,
    text: "Outstanding developer with a keen eye for design. Mathias not only writes clean, maintainable code but also understands the business perspective. A rare combination!",
  },
];

// ============================================================================
// STAR RATING COMPONENT
// ============================================================================
const StarRating = ({ rating, delay }: { rating: number; delay: number }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star, index) => (
        <motion.div
          key={star}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            delay: delay + index * 0.1,
            duration: 0.5,
            type: "spring",
            stiffness: 200,
          }}
        >
          <Star
            size={20}
            className={`${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-600 text-gray-600"
            }`}
          />
        </motion.div>
      ))}
    </div>
  );
};

// ============================================================================
// TESTIMONIAL CARD COMPONENT
// ============================================================================
const TestimonialCard = ({
  testimonial,
  isActive,
  onHoverChange,
}: {
  testimonial: Testimonial;
  isActive: boolean;
  onHoverChange: (isHovered: boolean) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      className="relative w-full max-w-5xl mx-auto"
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-white/10 backdrop-blur-xl shadow-2xl">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
        
        {/* Animated gradient border */}
        <motion.div
          animate={{
            background: [
              "linear-gradient(90deg, rgba(59,130,246,0.3) 0%, rgba(139,92,246,0.3) 50%, rgba(236,72,153,0.3) 100%)",
              "linear-gradient(90deg, rgba(236,72,153,0.3) 0%, rgba(59,130,246,0.3) 50%, rgba(139,92,246,0.3) 100%)",
              "linear-gradient(90deg, rgba(139,92,246,0.3) 0%, rgba(236,72,153,0.3) 50%, rgba(59,130,246,0.3) 100%)",
            ],
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-0 left-0 right-0 h-1"
        />

        <div className="relative z-10 p-8 md:p-12">
          <div className="grid md:grid-cols-[auto_1fr] gap-8 items-center">
            {/* Left side - Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
              className="flex justify-center md:justify-start"
            >
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1 rotate-6 hover:rotate-0 transition-transform duration-300">
                  <div className="w-full h-full rounded-2xl bg-gray-900 flex items-center justify-center">
                    <span className="text-4xl md:text-5xl font-black bg-gradient-to-br from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                </div>
                {/* Glow effect */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 blur-2xl -z-10"
                />
              </div>
            </motion.div>

            {/* Right side - Content */}
            <div className="text-center md:text-left">
              {/* Star Rating */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex justify-center md:justify-start mb-4"
              >
                <StarRating rating={testimonial.rating} delay={0.4} />
              </motion.div>

              {/* Testimonial Text */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-base md:text-lg text-gray-200 leading-relaxed mb-6"
              >
                "{testimonial.text}"
              </motion.p>

              {/* Author Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <h4 className="text-xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-1">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-gray-400">
                  <span className="font-semibold text-purple-400">{testimonial.role}</span>
                  {" • "}
                  <span className="text-gray-500">{testimonial.company}</span>
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom glow */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      </div>
    </motion.div>
  );
};

// ============================================================================
// MAIN TESTIMONIALS COMPONENT
// ============================================================================
export const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  // Auto-play carousel
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex, isPaused]);

  return (
    <section
      id="testimonials"
      className="relative min-h-screen w-full bg-background py-20 md:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-64 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-64 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-500/5 rounded-full blur-3xl" />
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
              Client Feedback
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              What Clients Say
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Don't just take my word for it - hear from some of the clients I've had the pleasure of working with.
          </motion.p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <TestimonialCard
              key={currentIndex}
              testimonial={testimonials[currentIndex]}
              isActive={true}
              onHoverChange={setIsPaused}
            />
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <motion.button
              whileHover={{ scale: 1.1, x: -4 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-purple-400/50 transition-all group"
            >
              <ChevronLeft size={24} className="text-white group-hover:text-purple-400 transition-colors" />
            </motion.button>

            {/* Indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  whileHover={{ scale: 1.2 }}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 w-12"
                      : "bg-white/30 w-2 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1, x: 4 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-purple-400/50 transition-all group"
            >
              <ChevronRight size={24} className="text-white group-hover:text-purple-400 transition-colors" />
            </motion.button>
          </div>

          {/* Pause indicator */}
          {isPaused && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-center mt-6"
            >
              <span className="text-sm text-gray-400 italic">
                Autoplay paused
              </span>
            </motion.div>
          )}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
        >
          {[
            { label: "Happy Clients", value: "30+" },
            { label: "Projects Completed", value: "50+" },
            { label: "5-Star Reviews", value: "100%" },
            { label: "Client Retention", value: "95%" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.5, type: "spring" }}
              whileHover={{ y: -8, scale: 1.05 }}
              className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-purple-400/30 transition-all group"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 opacity-0 group-hover:opacity-100 blur-xl -z-10 transition-opacity duration-300" />
              
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
