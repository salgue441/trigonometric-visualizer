/**
 * @fileoverview Slider Control component
 * @description Reusable mobile-optimized slider component with touch-friendly interaction
 * @author Carlos Salguero
 * @version 1.0.0
 */

"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Slider control props interface
 */
interface SliderControlProps {
  /** Control label */
  label: string;

  /** Current value */
  value: number;

  /** Formatted display value */
  displayValue: string;

  /** Minimum value */
  min: number;

  /** Maximum value */
  max: number;

  /** Step increment */
  step: number;

  /** Value change handler */
  onChange: (value: number) => void;

  /** Optional description */
  description?: string;

  /** Optional warning message */
  warning?: string;

  /** Additional CSS classes */
  className?: string;
}

/**
 * Slider Control Component
 *
 * @description A reusable slider control optimized for mobile touch interaction
 * with proper accessibility and visual feedback.
 *
 * @param props - Slider control props
 * @returns JSX element containing the slider control
 */
export function SliderControl({
  label,
  value,
  displayValue,
  min,
  max,
  step,
  onChange,
  description,
  warning,
  className,
}: SliderControlProps): React.JSX.Element {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("space-y-2", className)}
    >
      {/* Label and Value */}
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-slate-300">
          {label}
        </label>
        <span className="text-sm font-mono text-white bg-white/10 px-2 py-1 rounded">
          {displayValue}
        </span>
      </div>

      {/* Slider Container */}
      <div className="relative">
        {/* Custom Slider Track */}
        <div className="relative h-6 flex items-center">
          {/* Background Track */}
          <div className="absolute w-full h-2 bg-slate-700 rounded-full" />

          {/* Progress Track */}
          <motion.div
            className="absolute h-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
            style={{ width: `${percentage}%` }}
            animate={{ width: `${percentage}%` }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          />

          {/* Native Slider (Hidden but functional) */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className={cn(
              "absolute w-full h-6 opacity-0 cursor-pointer",
              "appearance-none bg-transparent",
              "focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-2",
              "focus:ring-offset-slate-900",
            )}
            aria-label={`${label} slider, current value ${displayValue}`}
          />

          {/* Thumb Indicator */}
          <motion.div
            className={cn(
              "absolute w-5 h-5 bg-white rounded-full shadow-lg",
              "border-2 border-blue-400",
              "pointer-events-none",
              "transform -translate-x-1/2",
            )}
            style={{ left: `${percentage}%` }}
            animate={{ left: `${percentage}%` }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            whileHover={{ scale: 1.1 }}
          />
        </div>
      </div>

      {/* Description */}
      {description && (
        <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
      )}

      {/* Warning */}
      {warning && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 p-2 bg-amber-500/10 border border-amber-400/20 rounded-lg"
        >
          <AlertTriangle className="w-3 h-3 text-amber-400 flex-shrink-0" />
          <p className="text-xs text-amber-300 leading-relaxed">{warning}</p>
        </motion.div>
      )}
    </motion.div>
  );
}
