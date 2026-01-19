"use client";

import React, { useEffect, useRef } from "react";
import { animateTextReveal } from "@/lib/gsap-animations";

interface TextRevealProps {
  text: string;
  delay?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  delay = 0,
  className = "",
  as: Tag = "p",
}) => {
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (textRef.current) {
      animateTextReveal(textRef.current, delay);
    }
  }, [delay, text]);

  return (
    <Tag ref={textRef as any} className={className}>
      {text}
    </Tag>
  );
};