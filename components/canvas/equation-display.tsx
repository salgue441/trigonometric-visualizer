/**
 * @fileoverview Equation Display component
 * @description Mobile-responsive equation display with syntax highlighting
 * @author Carlos Salguero
 * @version 1.0.0
 */

"use client"

import { motion } from "framer-motion"
import { TrigFunction } from "@/types"
import { cn } from "@/lib/utils"

/**
 * Equation display props interface
 */
interface EquationDisplayProps {
  /** Current function being visualized */
  currentFunction: TrigFunction

  /** Whether to show equations */
  showEquations: boolean

  /** Whether in fullscreen mode */
  isFullscreen: boolean
}

/**
 * Equation Display Component
 *
 * @description Displays the current mathematical equations with syntax highlighting
 * and mobile-responsive formatting.
 *
 * @param props - Equation display props
 * @returns JSX element containing the equation display or null if hidden
 */
export function EquationDisplay({
  currentFunction,
  showEquations,
  isFullscreen,
}: EquationDisplayProps): React.JSX.Element | null {
  if (!showEquations || isFullscreen) return null

  /**
   * Formats mathematical equations with basic syntax highlighting
   */
  const formatEquation = (equation: string): React.JSX.Element => {
    const parts = equation.split(
      /(\b(?:sin|cos|tan|abs|sqrt|pow|exp|log|PI|E)\b|\d+\.?\d*|[+\-*/().])/g
    )

    return (
      <span>
        {parts.map((part, index) => {
          if (/\b(?:sin|cos|tan|abs|sqrt|pow|exp|log)\b/.test(part)) {
            return (
              <span key={index} className="text-cyan-400 font-semibold">
                {part}
              </span>
            )
          } else if (/\b(?:PI|E)\b/.test(part)) {
            return (
              <span key={index} className="text-purple-400 font-semibold">
                {part}
              </span>
            )
          } else if (/\d+\.?\d*/.test(part)) {
            return (
              <span key={index} className="text-green-400">
                {part}
              </span>
            )
          } else if (/[+\-*/()]/.test(part)) {
            return (
              <span key={index} className="text-yellow-400">
                {part}
              </span>
            )
          } else if (part === "t" || part === "time") {
            return (
              <span key={index} className="text-pink-400 font-semibold">
                {part}
              </span>
            )
          }
          return <span key={index}>{part}</span>
        })}
      </span>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "mx-2 sm:mx-4 mb-2",
        "bg-black/40 backdrop-blur-md border border-white/20",
        "p-2 sm:p-3 rounded-lg",
        "safe-left safe-right"
      )}
    >
      {/* Compact Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-2"
      >
        <div className="flex items-center justify-between">
          <h4 className="text-xs sm:text-sm font-semibold text-white">
            {currentFunction.name}
          </h4>
          <div className="flex gap-1 text-xs">
            <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded">
              {currentFunction.complexity} pts
            </span>
            <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded">
              {currentFunction.lineWidth}px
            </span>
          </div>
        </div>
      </motion.div>

      {/* Compact Equations */}
      <div
        className={cn(
          "space-y-1 sm:space-y-2",
          "text-xs sm:text-sm font-mono leading-tight"
        )}
      >
        {/* X Equation */}
        <motion.div
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2"
        >
          <span className="text-green-400 font-semibold min-w-[15px] text-xs">
            x =
          </span>
          <span className="text-green-400 break-all flex-1 text-xs sm:text-sm">
            {formatEquation(currentFunction.xEquation)}
          </span>
        </motion.div>

        {/* Y Equation */}
        <motion.div
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2"
        >
          <span className="text-green-400 font-semibold min-w-[15px] text-xs">
            y =
          </span>
          <span className="text-green-400 break-all flex-1 text-xs sm:text-sm">
            {formatEquation(currentFunction.yEquation)}
          </span>
        </motion.div>
      </div>

      {/* Optional description for desktop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="hidden sm:block mt-2 pt-2 border-t border-white/10"
      >
        <p className="text-xs text-slate-400 leading-relaxed">
          {currentFunction.description}
        </p>
      </motion.div>
    </motion.div>
  )
}
