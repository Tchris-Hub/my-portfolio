"use client";

import React from "react";
import { motion } from "framer-motion";

export const Logo = ({ className = "" }: { className?: string }) => {
    return (
        <motion.div
            className={`relative inline-flex items-center justify-center ${className}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full opacity-50" />

            {/* Main Text Container */}
            <div className="relative z-10 font-black tracking-tighter cursor-pointer select-none">

                {/* Shadow/Stroke Layer */}
                <span className="absolute inset-0 text-emerald-900/20 blur-[1px] transform translate-y-[2px]">
                    Tchris
                </span>

                {/* Main Text with Gradient */}
                <span
                    className="relative text-4xl md:text-5xl font-extrabold bg-gradient-to-br from-emerald-400 via-teal-300 to-amber-200 bg-clip-text text-transparent"
                    style={{
                        fontFamily: "'Outfit', 'Inter', sans-serif",
                        filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.3))"
                    }}
                >
                    Tchris
                </span>

                {/* Decorative elements */}
                <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-emerald-500 via-teal-400 to-transparent rounded-full"
                />

                {/* Dot accent */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, type: "spring" }}
                    className="absolute -top-1 -right-2 w-3 h-3 bg-amber-300 rounded-full shadow-[0_0_10px_rgba(252,211,77,0.8)]"
                />
            </div>
        </motion.div>
    );
};
