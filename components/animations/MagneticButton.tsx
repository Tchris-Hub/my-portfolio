"use client";

import React from "react";
import { useMagneticHover } from "@/hooks/useMagneticHover";

interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 0.3,
  className = "",
}) => {
  const magneticRef = useMagneticHover({ strength });

  return (
    <div ref={magneticRef} className={`inline-block ${className}`}>
      {children}
    </div>
  );
};