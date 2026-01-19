"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

type CursorState = "default" | "link" | "text" | "image" | "button" | "disabled";

export const CustomCursor: React.FC = () => {
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Core dot - instant follow with high stiffness
  const dotX = useSpring(mouseX, { stiffness: 500, damping: 28, mass: 0.5 });
  const dotY = useSpring(mouseY, { stiffness: 500, damping: 28, mass: 0.5 });
  
  // Outer ring - smooth delayed follow with lower stiffness
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.8 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.8 });
  
  const lastMousePos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    setIsVisible(true);

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      // Calculate velocity
      velocity.current = {
        x: e.clientX - lastMousePos.current.x,
        y: e.clientY - lastMousePos.current.y
      };
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    // Mouse down/up handlers
    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      createParticles(e.clientX, e.clientY);
    };
    
    const handleMouseUp = () => setIsClicking(false);

    // Hover detection
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.closest('a, button, [role="button"]')) {
        const element = target.closest('a, button, [role="button"]') as HTMLElement;
        
        if (element.hasAttribute('disabled') || element.getAttribute('aria-disabled') === 'true') {
          setCursorState('disabled');
          setCursorText('');
        } else if (element.tagName === 'A') {
          setCursorState('link');
          setCursorText('View');
        } else {
          setCursorState('button');
          setCursorText('Click');
        }
      } else if (target.closest('input, textarea')) {
        setCursorState('text');
        setCursorText('');
      } else if (target.closest('img, video, [data-cursor="image"]')) {
        setCursorState('image');
        setCursorText('View');
      } else {
        setCursorState('default');
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  // Particle system
  const createParticles = (x: number, y: number) => {
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x,
      y
    }));
    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 600);
  };

  if (!isVisible) return null;

  // Cursor scale and color based on state
  const getDotScale = () => {
    if (isClicking) return 0.6;
    if (cursorState === 'link' || cursorState === 'button') return 0.4;
    if (cursorState === 'image') return 1.4;
    if (cursorState === 'text') return 0;
    return 1;
  };

  const getRingScale = () => {
    if (isClicking) return 0.8;
    if (cursorState === 'link' || cursorState === 'button') return 1.5;
    if (cursorState === 'image') return 2;
    if (cursorState === 'disabled') return 1.2;
    if (cursorState === 'text') return 0;
    return 1;
  };

  const getRingColor = () => {
    if (cursorState === 'disabled') return 'rgba(239, 68, 68, 0.6)';
    if (cursorState === 'link') return 'rgba(59, 130, 246, 0.6)';
    if (cursorState === 'button') return 'rgba(139, 92, 246, 0.6)';
    if (cursorState === 'image') return 'rgba(236, 72, 153, 0.6)';
    return 'rgba(139, 92, 246, 0.5)';
  };

  const getRingBg = () => {
    if (cursorState === 'link' || cursorState === 'button') return 'rgba(139, 92, 246, 0.1)';
    if (cursorState === 'disabled') return 'rgba(239, 68, 68, 0.1)';
    return 'transparent';
  };

  return (
    <>
      {/* Core Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
        <motion.div
          className="w-2 h-2 rounded-full bg-white"
          animate={{
            scale: getDotScale(),
            opacity: cursorState === 'text' ? 0 : 1
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          style={{
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.6)'
          }}
        />
      </motion.div>

      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] will-change-transform"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
        <motion.div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          animate={{
            scale: getRingScale(),
            borderColor: getRingColor(),
            backgroundColor: getRingBg(),
            borderWidth: cursorState === 'link' || cursorState === 'button' ? 3 : 2
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{
            border: `2px solid ${getRingColor()}`,
            boxShadow: `0 0 30px ${getRingColor()}`
          }}
        >
          {/* Contextual Text */}
          <AnimatePresence>
            {cursorText && (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="text-[10px] font-bold text-white uppercase tracking-wider"
              >
                {cursorText}
              </motion.span>
            )}
          </AnimatePresence>
          
          {/* Disabled X */}
          {cursorState === 'disabled' && (
            <motion.div
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              className="text-red-400 text-xl font-bold"
            >
              ×
            </motion.div>
          )}
        </motion.div>

        {/* Rotating ring animation */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            border: `1px dashed ${getRingColor()}`,
            opacity: 0.3
          }}
        />
      </motion.div>

      {/* Particles */}
      <AnimatePresence>
        {particles.map((particle, i) => (
          <motion.div
            key={particle.id}
            className="fixed w-1 h-1 rounded-full bg-purple-400 pointer-events-none z-[9997]"
            initial={{
              x: particle.x,
              y: particle.y,
              scale: 1,
              opacity: 1
            }}
            animate={{
              x: particle.x + Math.cos((i / 8) * Math.PI * 2) * 40,
              y: particle.y + Math.sin((i / 8) * Math.PI * 2) * 40,
              scale: 0,
              opacity: 0
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Click Ripple */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            className="fixed pointer-events-none z-[9996] rounded-full border-2 border-purple-400"
            style={{
              left: mouseX.get(),
              top: mouseY.get(),
              translateX: '-50%',
              translateY: '-50%'
            }}
            initial={{ width: 0, height: 0, opacity: 0.8 }}
            animate={{ width: 80, height: 80, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
    </>
  );
};