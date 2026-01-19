"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  className = "",
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHasValue(e.target.value.length > 0);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <div className="relative w-full">
      {/* Textarea Container */}
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
        {/* Textarea */}
        <textarea
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleChange}
          className={cn(
            "w-full bg-transparent px-4 py-3 text-white outline-none placeholder:text-transparent resize-none min-h-[120px]",
            label && "pt-6 pb-2"
          )}
          {...props}
        />

        {/* Floating Label */}
        {label && (
          <motion.label
            animate={{
              top: isFocused || hasValue ? "0.5rem" : "1rem",
              fontSize: isFocused || hasValue ? "0.75rem" : "1rem",
              color: error
                ? "rgb(239, 68, 68)"
                : isFocused
                ? "rgb(59, 130, 246)"
                : "rgb(163, 163, 163)",
            }}
            transition={{ duration: 0.2 }}
            className="absolute left-4 pointer-events-none"
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