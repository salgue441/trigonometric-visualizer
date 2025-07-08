/**
 * * @fileoverview Parameter Controls component
 * @description Mobile-optimized sliders and controls for visualization parameters
 * @author Carlos Salguero
 * @version 1.0.0
 */

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Settings } from "lucide-react";
import { ColorMode } from "@/types";
import { SliderControl } from "./slider-control";
import { SelectControl } from "./select-control";
import { cn } from "@/lib/utils";

/**
 * Parameter controls props interface
 */
interface ParameterControlsProps {
  /** Trail effect value */
  trails: number;

  /** Line width value */
  lineWidth: number;

  /** Animation speed value */
  animationSpeed: number;

  /** Complexity value */
  complexity: number;

  /** Current color mode */
  colorMode: ColorMode;

  /** Available color schemes */
  colorSchemes: Record<string, { name: string }>;

  /** Control change handlers */
  onTrailsChange: (value: number) => void;
  onLineWidthChange: (value: number) => void;
  onAnimationSpeedChange: (value: number) => void;
  onComplexityChange: (value: number) => void;
  onColorModeChange: (value: ColorMode) => void;
}

/**
 * Parameter Controls Component
 *
 * @description Provides mobile-optimized controls for adjusting visualization
 * parameters with touch-friendly sliders and proper value formatting.
 *
 * @param props - Parameter controls props
 * @returns JSX element containing the parameter controls
 */
export function ParameterControls({
  trails,
  lineWidth,
  animationSpeed,
  complexity,
  colorMode,
  colorSchemes,
  onTrailsChange,
  onLineWidthChange,
  onAnimationSpeedChange,
  onComplexityChange,
  onColorModeChange,
}: ParameterControlsProps): React.JSX.Element {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Section Header */}
      <motion.h3
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-base sm:text-lg font-semibold flex items-center gap-2"
      >
        <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
        <span>Controls</span>
      </motion.h3>

      {/* Controls Grid */}
      <div className="space-y-4 sm:space-y-5">
        {/* Trail Effect Control */}
        <SliderControl
          label="Trail Effect"
          value={trails}
          displayValue={trails.toFixed(2)}
          min={0.8}
          max={0.99}
          step={0.01}
          onChange={onTrailsChange}
          description="Controls the persistence of drawn lines"
        />

        {/* Line Width Control */}
        <SliderControl
          label="Line Width"
          value={lineWidth}
          displayValue={lineWidth.toString()}
          min={0.5}
          max={5}
          step={0.1}
          onChange={onLineWidthChange}
          description="Thickness of the drawn lines"
        />

        {/* Animation Speed Control */}
        <SliderControl
          label="Speed"
          value={animationSpeed}
          displayValue={`${animationSpeed.toFixed(1)}x`}
          min={0.1}
          max={3}
          step={0.1}
          onChange={onAnimationSpeedChange}
          description="Animation playback speed"
        />

        {/* Complexity Control with Smart Defaults */}
        <SliderControl
          label="Complexity"
          value={complexity}
          displayValue={complexity.toString()}
          min={500}
          max={8000}
          step={100}
          onChange={onComplexityChange}
          description={`Number of points to calculate${complexity > 4000 ? " (High complexity)" : ""}`}
          warning={
            complexity > 6000
              ? "Very high complexity may cause performance issues on some devices"
              : complexity > 4000 && isMobile
                ? "Consider reducing complexity for better mobile performance"
                : ""
          }
        />

        {/* Color Scheme Control */}
        <SelectControl
          label="Color Scheme"
          value={colorMode}
          options={Object.entries(colorSchemes).map(([key, scheme]) => ({
            value: key as ColorMode,
            label: scheme.name,
          }))}
          onChange={onColorModeChange}
          description="Visual color palette for the visualization"
        />
      </div>

      {/* Performance Optimization Tips */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={cn(
          "bg-amber-500/10 border border-amber-400/20 rounded-lg p-3",
          "lg:hidden",
        )}
      >
        <p className="text-xs text-amber-300 leading-relaxed">
          💡 <strong>Performance Tips:</strong>
          <br />• Lower complexity (&lt;3000) for smooth mobile experience
          <br />• Reduce trail effect for better frame rates
          <br />• Pause animation when not actively viewing
        </p>
      </motion.div>

      {/* Auto-optimization button for mobile */}
      <motion.button
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        onClick={() => {
          if (isMobile) {
            onComplexityChange(2000);
            onTrailsChange(0.92);
            onAnimationSpeedChange(0.8);
          }
        }}
        className={cn(
          "w-full lg:hidden p-3 rounded-lg",
          "bg-blue-500/20 border border-blue-400/30 text-blue-300",
          "hover:bg-blue-500/30 transition-colors",
          "text-sm font-medium",
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        🚀 Auto-optimize for Mobile
      </motion.button>
    </div>
  );
}
