/**
 * @fileoverview Header component for the Trigonometric Art Generator
 * @description Responsive header with title and description, optimized for mobile
 * @author Carlos Salguero
 * @version 1.0.0
 */

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Header component props interface
 */
interface HeaderProps {
  /** Whether the component is in fullscreen mode */
  isFullscreen?: boolean;

  /** Optional custom title */
  title?: string;

  /** Optional custom description */
  description?: string;

  /** Additional CSS classes */
  className?: string;
}

/**
 * Header Component
 *
 * @description Displays the main application header with animated title and
 * description. Automatically hides in fullscreen mode and adapts to mobile
 * screens.
 *
 * @param props - Header component props
 * @returns JSX element containing the header
 */
export function Header({
  isFullscreen = false,
  title = "Trigonometric Art Studio",
  description = "Professional mathematical visualization with real-time parametric equation",
  className,
}: HeaderProps): React.JSX.Element | null {
  if (isFullscreen) return null;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "p-2 sm:p-4 lg:p-6 text-center border-b border-white/10",
        "safe-top",
        className,
      )}
    >
      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className={cn(
          "font-bold mb-1 sm:mb-2 lg:mb-3 gradient-text",
          "text-xl sm:text-3xl lg:text-4xl xl:text-6xl",
          "leading-tight",
        )}
      >
        {title}
      </motion.h1>

      {/* Description - Hidden on very small screens */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className={cn(
          "text-slate-300 mx-auto",
          "text-xs sm:text-sm lg:text-lg",
          "max-w-xs sm:max-w-lg lg:max-w-2xl",
          "px-2 sm:px-0",
          "hidden xs:block",
        )}
      >
        {description}
      </motion.p>
    </motion.header>
  );
}
