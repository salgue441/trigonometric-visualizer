/**
 * @fileoverview Control Panel component for the Trigonometric Art Generator
 * @description Mobile-responsive control panel with function selection and parameter controls
 * @author Carlos Salguero
 * @version 1.0.0
 */

"use client"

import { AnimatePresence, motion } from "framer-motion"
import { TrigFunction, ColorMode } from "@/types"
import { PREDEFINED_FUNCTIONS } from "@/lib/predefined-functions"
import { COLOR_SCHEMES } from "@/lib/color-schemes"
import { FunctionSelector } from "./function-selector"
import { CustomEquations } from "./custom-equation"
import { ParameterControls } from "./parameter-controls"
import { cn } from "@/lib/utils"

/**
 * Control panel component props
 */
interface ControlPanelProps {
  /** Whether to show the control panel */
  show: boolean

  /** Whether in fullscreen mode */
  isFullscreen: boolean

  /** Current selected function */
  selectedFunction: TrigFunction

  /** Custom equation state */
  customEquations: {
    customX: string
    customY: string
    isCustomMode: boolean
  }

  /** Control values */
  controls: {
    trails: number
    lineWidth: number
    animationSpeed: number
    complexity: number
    colorMode: ColorMode
  }

  /** Function selection handler */
  onFunctionSelect: (funcId: string) => void

  /** Custom mode toggle handler */
  onToggleCustomMode: () => void

  /** Custom equation change handlers */
  onCustomXChange: (value: string) => void
  onCustomYChange: (value: string) => void

  /** Control change handlers */
  onTrailsChange: (value: number) => void
  onLineWidthChange: (value: number) => void
  onAnimationSpeedChange: (value: number) => void
  onComplexityChange: (value: number) => void
  onColorModeChange: (value: ColorMode) => void
}

/**
 * Control Panel Component
 *
 * @description Responsive control panel that collapses on mobile and provides
 * all the controls for customizing the trigonometric art visualization.
 *
 * @param props - Control panel props
 * @returns JSX element containing the control panel
 */
export function ControlPanel({
  show,
  isFullscreen,
  selectedFunction,
  customEquations,
  controls,
  onFunctionSelect,
  onToggleCustomMode,
  onCustomXChange,
  onCustomYChange,
  onTrailsChange,
  onLineWidthChange,
  onAnimationSpeedChange,
  onComplexityChange,
  onColorModeChange,
}: ControlPanelProps): React.JSX.Element | null {
  if (isFullscreen) return null

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.aside
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 200,
            duration: 0.3,
          }}
          className={cn(
            "glass border-r border-white/10 overflow-y-auto",
            "w-full lg:w-80",
            "absolute lg:relative",
            "h-full lg:h-auto",
            "z-40",
            "safe-left safe-right",
            "p-3 sm:p-4",
            "flex-shrink-0"
          )}
        >
          {/* Mobile close button */}
          <div className="lg:hidden flex justify-end mb-2">
            <button
              onClick={() => {
                // Does not do nothing
              }}
              className="p-2 text-white/60 hover:text-white transition-colors"
              aria-label="Close control panel"
            >
              ✕
            </button>
          </div>

          {/* Scrollable content container */}
          <div className="space-y-4 sm:space-y-6 pb-20 lg:pb-4 max-h-full overflow-y-auto">
            {/* Function Selector */}
            <FunctionSelector
              selectedFunction={selectedFunction}
              functions={PREDEFINED_FUNCTIONS.slice(0, 8)}
              onFunctionSelect={onFunctionSelect}
            />

            {/* Custom Equations */}
            <CustomEquations
              customX={customEquations.customX}
              customY={customEquations.customY}
              isCustomMode={customEquations.isCustomMode}
              onToggleCustomMode={onToggleCustomMode}
              onCustomXChange={onCustomXChange}
              onCustomYChange={onCustomYChange}
            />

            {/* Parameter Controls */}
            <ParameterControls
              trails={controls.trails}
              lineWidth={controls.lineWidth}
              animationSpeed={controls.animationSpeed}
              complexity={controls.complexity}
              colorMode={controls.colorMode}
              colorSchemes={COLOR_SCHEMES}
              onTrailsChange={onTrailsChange}
              onLineWidthChange={onLineWidthChange}
              onAnimationSpeedChange={onAnimationSpeedChange}
              onComplexityChange={onComplexityChange}
              onColorModeChange={onColorModeChange}
            />
          </div>

          {/* Mobile close indicator */}
          <div className="lg:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="w-8 h-1 bg-white/30 rounded-full"></div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
