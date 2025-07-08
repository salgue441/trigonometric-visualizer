/**
 * @fileoverview Custom Equations component
 * @description Mobile-optimized input interface for custom mathematical equations
 * @author Carlos Salguero
 * @version 1.0.0
 */

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Code } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Custom equations props interface
 */
interface CustomEquationsProps {
  /** Custom X equation value */
  customX: string;

  /** Custom Y equation value */
  customY: string;

  /** Whether custom mode is active */
  isCustomMode: boolean;

  /** Toggle custom mode handler */
  onToggleCustomMode: () => void;

  /** Custom X equation change handler */
  onCustomXChange: (value: string) => void;

  /** Custom Y equation change handler */
  onCustomYChange: (value: string) => void;
}

/**
 * Custom Equations Component
 *
 * @description Provides an interface for users to input custom mathematical
 * equations with mobile-optimized inputs and proper keyboard handling.
 *
 * @param props - Custom equations props
 * @returns JSX element containing the custom equations interface
 */
export function CustomEquations({
  customX,
  customY,
  isCustomMode,
  onToggleCustomMode,
  onCustomXChange,
  onCustomYChange,
}: CustomEquationsProps): React.JSX.Element {
  return (
    <div className="space-y-3">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <motion.h3
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-base sm:text-lg font-semibold flex items-center gap-2"
        >
          <Code className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
          <span>Custom Equations</span>
        </motion.h3>

        {/* Toggle Button */}
        <motion.button
          onClick={onToggleCustomMode}
          className={cn(
            "px-3 py-1.5 text-xs rounded-full border transition-all",
            "min-h-[32px] min-w-[60px]",
            isCustomMode
              ? "bg-green-500/20 border-green-400/50 text-green-300"
              : "glass border-white/20 hover:bg-white/10 text-white",
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`${isCustomMode ? "Disable" : "Enable"} custom equations`}
        >
          {isCustomMode ? "Active" : "Enable"}
        </motion.button>
      </div>

      {/* Custom Equations Form */}
      <AnimatePresence mode="wait">
        {isCustomMode && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
            }}
            className="overflow-hidden"
          >
            <div className="space-y-4 pt-2">
              {/* X Equation Input */}
              <div className="space-y-2">
                <label
                  htmlFor="custom-x-equation"
                  className="block text-xs sm:text-sm font-medium text-slate-300"
                >
                  X Equation
                </label>

                <motion.input
                  id="custom-x-equation"
                  type="text"
                  value={customX}
                  onChange={(e) => onCustomXChange(e.target.value)}
                  className={cn(
                    "w-full p-3 sm:p-2 bg-black/50 border border-white/20 rounded-lg",
                    "text-white placeholder-gray-400 font-mono",
                    "focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20",
                    "text-sm sm:text-xs",
                    "min-h-[44px] sm:min-h-[36px]",
                  )}
                  placeholder="e.g., 200 * sin(3 * t + time)"
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  inputMode="text"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.15 }}
                />
              </div>

              {/* Y Equation Input */}
              <div className="space-y-2">
                <label
                  htmlFor="custom-y-equation"
                  className="block text-xs sm:text-sm font-medium text-slate-300"
                >
                  Y Equation
                </label>

                <motion.input
                  id="custom-y-equation"
                  type="text"
                  value={customY}
                  onChange={(e) => onCustomYChange(e.target.value)}
                  className={cn(
                    "w-full p-3 sm:p-2 bg-black/50 border border-white/20 rounded-lg",
                    "text-white placeholder-gray-400 font-mono",
                    "focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20",
                    "text-sm sm:text-xs",
                    "min-h-[44px] sm:min-h-[36px]",
                  )}
                  placeholder="e.g., 200 * cos(2 * t + time)"
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  inputMode="text"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.15 }}
                />
              </div>

              {/* Help Text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-3"
              >
                <p className="text-xs text-blue-300 leading-relaxed">
                  <strong>Available variables:</strong> t (parameter), time
                  (animation time)
                  <br />
                  <strong>Functions:</strong> sin, cos, tan, abs, sqrt, pow,
                  exp, log
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
