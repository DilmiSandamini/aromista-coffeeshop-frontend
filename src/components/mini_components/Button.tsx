import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "danger" | "yellow" | "blur";
  className?: string;
  disabled?: boolean;
};

export function Button({ children, onClick, type = "button", variant = "primary", className = "", disabled = false }: ButtonProps) {
  const [isSteaming, setIsSteaming] = useState(false);

  const styles = {
    primary: "bg-[#4a6741] text-white shadow-lg shadow-[#4a6741]/20 hover:bg-[#3d5435]",
    secondary: "bg-white border-2 border-[#eaddcf] text-[#3e2723] hover:bg-stone-50",
    danger: "bg-red-50 text-red-600 border border-red-100 hover:bg-red-100",
    yellow: "bg-yellow-700 text-white shadow-lg shadow-yellow-700/20 hover:bg-yellow-800",
    blur: "bg-white/30 border-2 border-white/20 text-white font-bold hover:bg-white/10 transition-all backdrop-blur-md",
  };

  const handleClick = () => {
    if (disabled) return;
    setIsSteaming(true);
    onClick?.();
    setTimeout(() => setIsSteaming(false), 1000);
  };

  const steamLines = [0, 1, 2];

  return (
    <div className="relative inline-block">
      {/* --- Coffee Steam Animation --- */}
      <AnimatePresence>
        {isSteaming && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-full flex justify-center gap-2 pointer-events-none">
            {steamLines.map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, scale: 0.5, filter: "blur(4px)" }}
                animate={{ 
                  opacity: [0, 0.6, 0], 
                  y: -40, 
                  x: i % 2 === 0 ? 10 : -10,
                  scale: [1, 1.5, 2],
                  filter: "blur(8px)"
                }}
                transition={{ 
                  duration: 1, 
                  delay: i * 0.1,
                  ease: "easeOut" 
                }}
                className="w-4 h-12 bg-white/40 rounded-full"
                style={{ backgroundColor: variant === 'primary' ? 'rgba(255,255,255,0.4)' : 'rgba(74,103,65,0.2)' }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* --- Main Button --- */}
      <motion.button
        whileHover={!disabled ? { scale: 1.02, y: -2 } : {}}
        whileTap={!disabled ? { scale: 0.96 } : {}}
        type={type}
        onClick={handleClick}
        disabled={disabled}
        className={`
          relative z-10 px-8 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 
          transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${styles[variant]} ${className}
        `}
      >
        {children}
      </motion.button>
    </div>
  );
}