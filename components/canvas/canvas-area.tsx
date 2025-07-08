/**
 * @fileoverview Canvas Area component
 * @description Mobile-responsive canvas container with controls and equation display
 * @author Carlos Salguero
 * @version 1.0.1 - Fixed mobile canvas layout
 */

"use client"

import { forwardRef, RefObject } from "react"
import { motion } from "framer-motion"
import { TrigFunction, AnimationState, PerformanceMetrics } from "@/types"
import { CanvasControls } from "./canvas-control"
import { EquationDisplay } from "./equation-display"
import { cn } from "@/lib/utils"

/**
 * Canvas area props interface
 */
interface CanvasAreaProps {
  /** Canvas container ref */
  containerRef: RefObject<HTMLDivElement>

  /** Current function being visualized */
  currentFunction: TrigFunction

  /** Animation state */
  animationState: AnimationState

  /** Performance metrics */
  performance: PerformanceMetrics

  /** Whether to show equations */
  showEquations: boolean

  /** Whether in fullscreen mode */
  isFullscreen: boolean

  /** Whether to show controls on mobile */
  showControls: boolean

  /** Control handlers */
  onTogglePlayPause: () => void
  onResetAnimation: () => void
  onExportImage: () => void
  onToggleFullscreen: () => void
  onToggleControls: () => void
}

/**
 * Canvas Area Component
 *
 * @description Main canvas area with responsive layout, controls, and equation
 * display. Optimized for both desktop and mobile viewing experiences.
 *
 * @param props - Canvas area props
 * @param canvasRef - Forward ref for the canvas element
 * @returns JSX element containing the canvas area
 */
export const CanvasArea = forwardRef<HTMLCanvasElement, CanvasAreaProps>(
  (
    {
      containerRef,
      currentFunction,
      animationState,
      performance,
      showEquations,
      isFullscreen,
      showControls,
      onTogglePlayPause,
      onResetAnimation,
      onExportImage,
      onToggleFullscreen,
      onToggleControls,
    },
    canvasRef
  ) => {
    return (
      <div
        className={cn(
          "flex-1 flex flex-col",
          "min-h-0 w-full",
          !showControls && "lg:w-full"
        )}
      >
        {/* Canvas Controls */}
        <CanvasControls
          animationState={animationState}
          performance={performance}
          isFullscreen={isFullscreen}
          showControls={showControls}
          onTogglePlayPause={onTogglePlayPause}
          onResetAnimation={onResetAnimation}
          onExportImage={onExportImage}
          onToggleFullscreen={onToggleFullscreen}
          onToggleControls={onToggleControls}
        />

        {/* Equation Display - Now above canvas */}
        {showEquations && !isFullscreen && (
          <EquationDisplay
            currentFunction={currentFunction}
            showEquations={showEquations}
            isFullscreen={isFullscreen}
          />
        )}

        {/* Canvas Container */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={cn(
            "flex-1 p-2 sm:p-4",
            "safe-left safe-right safe-bottom",
            "min-h-0 w-full",
            "overflow-hidden"
          )}
        >
          <div
            className={cn(
              "canvas-container h-full w-full relative",
              "min-h-[300px] lg:min-h-[400px]",
              "max-w-full max-h-full",
              "touch-none"
            )}
            style={{
              aspectRatio:
                typeof window !== "undefined" && window.innerWidth <= 768
                  ? "1/1"
                  : "auto",
            }}
          >
            <canvas
              ref={canvasRef}
              className={cn(
                "w-full h-full rounded-xl",
                "gpu-accelerated contain-paint",
                "bg-gradient-to-br from-slate-900/50 to-blue-900/50",
                "border border-white/10 shadow-2xl",
                "block object-contain"
              )}
              style={{
                imageRendering: "auto",
                WebkitUserSelect: "none",
                userSelect: "none",
                willChange: "contents",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
              aria-label="Trigonometric art visualization canvas"
            />

            {/* Canvas Overlay for Mobile Instructions */}
            {!animationState.isPlaying && (
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center pointer-events-none",
                  "lg:hidden bg-black/20 backdrop-blur-sm rounded-xl transition-opacity"
                )}
              >
                <div className="text-center p-4">
                  <p className="text-white/80 text-sm">
                    Tap Play to start visualization
                  </p>
                </div>
              </div>
            )}

            {/* Performance Indicator (Mobile) - Repositioned */}
            <div
              className={cn(
                "absolute top-2 right-2 lg:hidden",
                "px-2 py-1 rounded-full text-xs font-medium",
                "bg-black/50 backdrop-blur-sm border",
                performance.fps > 50
                  ? "text-green-400 border-green-400/20"
                  : performance.fps > 30
                    ? "text-yellow-400 border-yellow-400/20"
                    : "text-red-400 border-red-400/20"
              )}
            >
              {performance.fps} FPS
            </div>

            {/* Complexity indicator for performance monitoring */}
            <div
              className={cn(
                "absolute bottom-2 left-2 lg:hidden",
                "px-2 py-1 rounded-full text-xs font-medium",
                "bg-black/50 backdrop-blur-sm border border-white/20 text-white/60"
              )}
            >
              {performance.pointCount} pts
            </div>
          </div>
        </motion.div>
      </div>
    )
  }
)

CanvasArea.displayName = "CanvasArea"
