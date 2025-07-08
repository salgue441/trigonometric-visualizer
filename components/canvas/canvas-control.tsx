/**
 * @fileoverview Canvas Controls component
 * @description Mobile-optimized playback and export controls for the canvas
 * @author Carlos Salguero
 * @version 1.0.0
 */

"use client";

import { motion } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  Download,
  Minimize2,
  Maximize2,
  Settings,
} from "lucide-react";
import { AnimationState, PerformanceMetrics } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Canvas controls props interface
 */
interface CanvasControlsProps {
  /** Animation state */
  animationState: AnimationState;

  /** Performance metrics */
  performance: PerformanceMetrics;

  /** Whether in fullscreen mode */
  isFullscreen: boolean;

  /** Whether to show controls on mobile */
  showControls: boolean;

  /** Control handlers */
  onTogglePlayPause: () => void;
  onResetAnimation: () => void;
  onExportImage: () => void;
  onToggleFullscreen: () => void;
  onToggleControls: () => void;
}

/**
 * Canvas Controls Component
 *
 * @description Provides playback controls, performance metrics, and export
 * functionality with mobile-optimized touch-friendly buttons.
 *
 * @param props - Canvas controls props
 * @returns JSX element containing the canvas controls
 */
export function CanvasControls({
  animationState,
  performance,
  isFullscreen,
  onTogglePlayPause,
  onResetAnimation,
  onExportImage,
  onToggleFullscreen,
  onToggleControls,
}: CanvasControlsProps): React.JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex items-center justify-between p-3 sm:p-4",
        "border-b border-white/10 bg-black/20 backdrop-blur-sm",
        "safe-left safe-right",
      )}
    >
      {/* Left Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Play/Pause Button */}
        <motion.button
          onClick={onTogglePlayPause}
          className={cn(
            "bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors",
            "flex items-center gap-2 rounded-lg",
            "px-3 py-2 sm:px-4 sm:py-2",
            "min-h-[44px] sm:min-h-[40px]",
            "text-sm sm:text-base",
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={
            animationState.isPlaying ? "Pause animation" : "Play animation"
          }
        >
          {animationState.isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}

          {/* Hide text on very small screens */}
          <span className="hidden xs:inline">
            {animationState.isPlaying ? "Pause" : "Play"}
          </span>
        </motion.button>

        {/* Reset Button */}
        <motion.button
          onClick={onResetAnimation}
          className={cn(
            "bg-slate-600 hover:bg-slate-700 text-white transition-colors rounded-lg",
            "p-2 sm:p-2.5",
            "min-h-[44px] sm:min-h-[40px] min-w-[44px] sm:min-w-[40px]",
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Reset animation"
        >
          <RotateCcw className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Performance Display with Quality Indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className={cn(
            "px-2 sm:px-3 py-1 rounded-full text-xs font-medium",
            "bg-black/30 backdrop-blur-sm border min-w-[80px] text-center",
            "flex items-center gap-1",
            performance.fps > 50
              ? "text-green-400 border-green-400/20"
              : performance.fps > 30
                ? "text-yellow-400 border-yellow-400/20"
                : "text-red-400 border-red-400/20",
          )}
        >
          {/* Quality indicator dot */}
          <div
            className={cn(
              "w-1.5 h-1.5 rounded-full",
              performance.fps > 50
                ? "bg-green-400"
                : performance.fps > 30
                  ? "bg-yellow-400"
                  : "bg-red-400",
            )}
          />

          <span className="hidden sm:inline">
            {performance.fps} FPS • {performance.pointCount} pts
          </span>
          <span className="sm:hidden">{performance.fps} FPS</span>
        </motion.div>

        {/* Export Button */}
        <motion.button
          onClick={onExportImage}
          className={cn(
            "bg-transparent hover:bg-white/10 text-white transition-colors rounded-lg",
            "p-2 sm:p-2.5",
            "min-h-[44px] sm:min-h-[40px] min-w-[44px] sm:min-w-[40px]",
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Export image"
        >
          <Download className="w-4 h-4" />
        </motion.button>

        {/* Fullscreen Toggle */}
        <motion.button
          onClick={onToggleFullscreen}
          className={cn(
            "bg-transparent hover:bg-white/10 text-white transition-colors rounded-lg",
            "p-2 sm:p-2.5",
            "min-h-[44px] sm:min-h-[40px] min-w-[44px] sm:min-w-[40px]",
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
        </motion.button>

        {/* Mobile Controls Toggle */}
        {!isFullscreen && (
          <motion.button
            onClick={onToggleControls}
            className={cn(
              "bg-transparent hover:bg-white/10 text-white transition-colors rounded-lg",
              "p-2 sm:p-2.5 lg:hidden",
              "min-h-[44px] min-w-[44px]",
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle controls panel"
          >
            <Settings className="w-4 h-4" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
