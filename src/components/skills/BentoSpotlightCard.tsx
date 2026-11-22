'use client';

import React, { useState } from 'react';

export const BentoSpotlightCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const [glow, setGlow] = useState({ x: 50, y: 50, active: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlow({ x, y, active: true });
  };

  const handleMouseLeave = () => {
    setGlow(prev => ({ ...prev, active: false }));
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      {glow.active && (
        <div
          className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-100 transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(420px circle at ${glow.x}% ${glow.y}%, rgba(99, 102, 241, 0.085), transparent 70%)`
          }}
        />
      )}
      <div className="relative z-10 flex flex-col justify-between h-full">
        {children}
      </div>
    </div>
  );
};
