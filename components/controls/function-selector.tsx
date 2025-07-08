/**
 * @fileoverview Function Selector component
 * @description Mobile-optimized function selection interface with touch-friendly buttons
 * @author Carlos Salguero
 * @version 1.0.0
 */

"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { TrigFunction } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Function selector props interface
 */
interface FunctionSelectorProps {
  /** Currently selected function */
  selectedFunction: TrigFunction;

  /** Available functions to choose from */
  functions: TrigFunction[];

  /** Function selection handler */
  onFunctionSelect: (funcId: string) => void;
}

/**
 * Function Selector Component
 *
 * @description Displays a grid of selectable mathematical functions with
 * touch-friendly buttons optimized for mobile interaction.
 *
 * @param props - Function selector props
 * @returns JSX element containing the function selector
 */
export function FunctionSelector({
  selectedFunction,
  functions,
  onFunctionSelect,
}: FunctionSelectorProps): React.JSX.Element {
  return (
    <div className="space-y-3">
      {/* Section Header */}
      <motion.h3
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-base sm:text-lg font-semibold flex items-center gap-2"
      >
        <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
        <span>Functions</span>
      </motion.h3>

      {/* Function Grid */}
      <div className="grid gap-2 sm:gap-3">
        {functions.map((func, index) => (
          <motion.button
            key={func.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            onClick={() => onFunctionSelect(func.id)}
            className={cn(
              "text-left p-3 sm:p-4 rounded-lg border transition-all",
              "min-h-[60px] sm:min-h-[70px]",
              "active:scale-95",
              "text-xs sm:text-sm",
              selectedFunction.id === func.id
                ? "bg-cyan-500/20 border-cyan-400/50 shadow-lg shadow-cyan-400/10"
                : "glass border-white/10 hover:bg-white/10 hover:border-white/20",
            )}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.15 },
            }}
            whileTap={{
              scale: 0.98,
              transition: { duration: 0.1 },
            }}
            aria-label={`Select ${func.name} function`}
          >
            {/* Function Name */}
            <div
              className={cn(
                "font-medium mb-1",
                "text-sm sm:text-base",
                selectedFunction.id === func.id
                  ? "text-cyan-300"
                  : "text-white",
              )}
            >
              {func.name}
            </div>

            {/* Function Description */}
            <div
              className={cn(
                "text-slate-400 leading-relaxed",
                "text-xs sm:text-sm",
                "line-clamp-2",
              )}
            >
              {func.description}
            </div>

            {/* Selection Indicator */}
            {selectedFunction.id === func.id && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full"
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Load More Hint for Mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center lg:hidden"
      >
        <p className="text-xs text-slate-500">
          Showing {functions.length} of {functions.length} functions
        </p>
      </motion.div>
    </div>
  );
}
