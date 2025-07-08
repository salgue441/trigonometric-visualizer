/**
 * @fileoverview Select Control component
 * @description Mobile-optimized select dropdown component with touch-friendly interaction
 * @author Carlos Salguero
 * @version 1.0.0
 */

"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Select option interface
 */
interface SelectOption<T> {
  /** Option value */
  value: T
  
  /** Display label */
  label: string

  /** Optional description */
  description?: string
}

/**
 * Select control props interface
 */
interface SelectControlProps<T> {
  /** Control label */
  label: string
  
  /** Current value */
  value: T

  /** Available options */
  options: SelectOption<T>[]

  /** Value change handler */
  onChange: (value: T) => void

  /** Optional description */
  description?: string

  /** Additional CSS classes */
  className?: string
}

/**
 * Select Control Component
 *
 * @description A reusable select control optimized for mobile with proper
 * touch interaction and accessibility features.
 *
 * @param props - Select control props
 * @returns JSX element containing the select control
 */
export function SelectControl<T extends string>({
  label,
  value,
  options,
  onChange,
  description,
  className,
}: SelectControlProps<T>): React.JSX.Element {
  const currentOption = options.find((option) => option.value === value)

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("space-y-2", className)}
    >
      {/* Label */}
      <label className="block text-sm font-medium text-slate-300">
        {label}
      </label>

      {/* Select Container */}
      <div className="relative">
        <motion.select
          value={value}
          onChange={(e) => onChange(e.target.value as T)}
          className={cn(
            "w-full p-3 sm:p-2 bg-black/50 border border-white/20 rounded-lg",
            "text-white appearance-none cursor-pointer",
            "focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20",
            "text-sm", 
            "min-h-[44px] sm:min-h-[36px]", 
            "pr-10" 
          )}
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.15 }}
          aria-label={`${label} selection`}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-slate-800 text-white"
            >
              {option.label}
            </option>
          ))}
        </motion.select>

        {/* Chevron Icon */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Current Selection Description */}
      {currentOption?.description && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-slate-400 leading-relaxed"
        >
          {currentOption.description}
        </motion.p>
      )}

      {/* General Description */}
      {description && !currentOption?.description && (
        <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
      )}
    </motion.div>
  )
}
