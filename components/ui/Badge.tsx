"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "gradient";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon,
}) => {
  const baseStyles = "inline-flex items-center gap-1.5 font-medium rounded-full transition-all duration-300";

  const variants = {
    primary: "bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30",
    secondary: "bg-secondary/20 text-secondary border border-secondary/30 hover:bg-secondary/30",
    outline: "bg-transparent text-white border border-white/30 hover:border-white/50",
    gradient: "bg-gradient-to-r from-primary/20 to-secondary/20 text-white border border-white/20 hover:from-primary/30 hover:to-secondary/30",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </motion.span>
  );
};