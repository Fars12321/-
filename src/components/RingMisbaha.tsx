import React from 'react';
import { useTheme } from '../lib/ThemeContext';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface RingMisbahaProps {
  count: number;
  max: number;
}

export function RingMisbaha({ count, max }: RingMisbahaProps) {
  const { theme } = useTheme();
  
  // Create 33 beads in a circular pattern
  const totalBeadsInRing = 33;
  const activeBeads = count % totalBeadsInRing;
  
  // Math for SVG circle
  const radius = 130;
  const cx = 160;
  const cy = 160;
  
  const beads = Array.from({ length: totalBeadsInRing }).map((_, i) => {
    // Distribute around the circle, leaving a small gap at the bottom for the tassel
    // Start from top (0 deg) and go clockwise
    const angleRange = 310;
    const startAngle = -245; // Start near top left
    const angle = (startAngle + (i * (angleRange / (totalBeadsInRing - 1)))) * (Math.PI / 180);
    
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    
    const isActive = i < activeBeads || (count > 0 && activeBeads === 0);
    
    return { x, y, isActive, i };
  });

  const isMilestone = count > 0 && (count % 33 === 0);

  return (
    <div className="relative w-[320px] h-[320px] flex items-center justify-center pointer-events-none mt-4">
      {/* Glow on Milestone */}
      <AnimatePresence>
        {isMilestone && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className={cn("absolute inset-0 rounded-full blur-3xl opacity-20", theme.textClass.replace('text-', 'bg-'))}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="popLayout">
        {isMilestone && (
          <motion.div
            key={`ripple-${count}`}
            initial={{ opacity: 0.8, scale: 0.7 }}
            animate={{ opacity: 0, scale: 1.4 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={cn("absolute inset-0 rounded-full blur-lg border-[8px]", theme.textClass.replace('text-', 'border-'))}
          />
        )}
      </AnimatePresence>

      {/* Beads SVG */}
      <svg width="320" height="320" className="absolute inset-0 drop-shadow-2xl overflow-visible">
        <defs>
          <radialGradient id={`beadGrad-${theme.id}`} cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="white" stopOpacity="0.8" />
            <stop offset="25%" stopColor="white" stopOpacity="0.2" />
            <stop offset="70%" stopColor="black" stopOpacity="0.3" />
            <stop offset="100%" stopColor="black" stopOpacity="0.8" />
          </radialGradient>
        </defs>

        {/* Tassel at bottom */}
        <g transform={`translate(${cx}, ${cy + radius + 25})`} className={cn("transition-all duration-300 drop-shadow-lg", theme.tasselClass)}>
          <circle cx="0" cy="-10" r="5" />
          <path d="M-5, -5 L-12, 35 L12, 35 L5, -5 Z" opacity="0.9" />
          <path d="M-12, 35 C-8, 45 8, 45 12, 35 Z" />
          {/* Strings */}
          {[...Array(7)].map((_, i) => (
             <line key={i} x1={(i - 3) * 2} y1="35" x2={(i - 3) * 3} y2="60" strokeWidth="1" stroke="currentColor" opacity="0.8" />
          ))}
        </g>

        {/* Connecting String */}
        <path 
           d={`M ${beads[0].x} ${beads[0].y} A ${radius} ${radius} 0 1 1 ${beads[beads.length - 1].x} ${beads[beads.length - 1].y}`}
           fill="none"
           stroke="currentColor"
           strokeWidth="1"
           strokeOpacity="0.2"
           className={theme.textClass}
        />

        {/* Beads */}
        {beads.map((bead) => {
          const isCurrent = (count > 0) && (
            (activeBeads === 0 && bead.i === totalBeadsInRing - 1) || 
            (bead.i === activeBeads - 1)
          );

          return (
            <g key={bead.i}>
              {/* Ripple for the tapped bead */}
              {isCurrent && (
                 <motion.circle
                    cx={bead.x}
                    cy={bead.y}
                    key={`bead-ripple-${count}`}
                    initial={{ r: 9, opacity: 0.8 }}
                    animate={{ r: 24, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={cn("pointer-events-none mix-blend-screen", theme.beadActiveClass)}
                 />
              )}

              <motion.circle
                cx={bead.x}
                cy={bead.y}
                className={cn(
                  "transition-colors duration-300",
                  bead.isActive ? theme.beadActiveClass : theme.beadInactiveClass
                )}
                style={{
                  filter: isCurrent ? 'drop-shadow(0px 6px 8px rgba(0,0,0,0.6))' : (bead.isActive ? 'drop-shadow(0px 3px 5px rgba(0,0,0,0.5))' : 'drop-shadow(0px 1px 2px rgba(0,0,0,0.3))')
                }}
                initial={false}
                animate={{ 
                  r: isCurrent ? 14 : (bead.isActive ? 11 : 9)
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              />
              
              {/* Shading overlay for 3D effect */}
              <motion.circle
                cx={bead.x}
                cy={bead.y}
                fill={`url(#beadGrad-${theme.id})`}
                className="pointer-events-none mix-blend-overlay"
                style={{ opacity: bead.isActive ? 0.9 : 0.6 }}
                initial={false}
                animate={{ 
                  r: isCurrent ? 14 : (bead.isActive ? 11 : 9)
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              />
            </g>
          );
        })}
      </svg>

      {/* Center Text */}
      <div className={cn("flex flex-col items-center justify-center z-10", theme.textClass)}>
        <span className="text-7xl font-bold tracking-tighter tabular-nums drop-shadow-lg" style={{ fontVariantNumeric: 'tabular-nums' }}>
          {count}
        </span>
        <div className="flex items-center gap-2 mt-2">
           <span className={cn("text-xl font-bold tracking-widest", theme.textMutedClass)}>
             / {max}
           </span>
        </div>
      </div>
    </div>
  );
}
