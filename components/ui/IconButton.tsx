"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonHover } from "@/lib/animations";

interface IconButtonProps {
  icon: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  ariaLabel: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = "ghost",
  size = "md",
  className = "",
  ariaLabel,
  ...props
}) => {
  const baseStyles = "rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    secondary: "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20",
    ghost: "text-white hover:bg-white/10",
  };

  const sizes = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
  };

  return (
    <motion.button
      variants={buttonHover}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      aria-label={ariaLabel}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {icon}
    </motion.button>
  );
};