"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = "",
  type = "text",
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value.length > 0);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <div className="relative w-full">
      {/* Input Container */}
      <motion.div
        animate={{
          borderColor: error
            ? "rgb(239, 68, 68)"
            : isFocused
            ? "rgb(59, 130, 246)"
            : "rgba(255, 255, 255, 0.2)",
        }}
        transition={{ duration: 0.3 }}
        className={cn(
          "relative rounded-lg border-2 bg-white/5 backdrop-blur-sm transition-all duration-300",
          isFocused && "shadow-lg shadow-primary/20",
          className
        )}
      >
        {/* Icon */}
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-light">
            {icon}
          </div>
        )}

        {/* Input */}
        <input
          type={type}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleChange}
          className={cn(
            "w-full bg-transparent px-4 py-3 text-white outline-none placeholder:text-transparent",
            icon && "pl-12",
            label && "pt-6 pb-2"
          )}
          {...props}
        />

        {/* Floating Label */}
        {label && (
          <motion.label
            animate={{
              top: isFocused || hasValue ? "0.5rem" : "50%",
              fontSize: isFocused || hasValue ? "0.75rem" : "1rem",
              translateY: isFocused || hasValue ? "0" : "-50%",
              color: error
                ? "rgb(239, 68, 68)"
                : isFocused
                ? "rgb(59, 130, 246)"
                : "rgb(163, 163, 163)",
            }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute left-4 pointer-events-none",
              icon && "left-12"
            )}
          >
            {label}
          </motion.label>
        )}
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};