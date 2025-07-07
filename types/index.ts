/**
 * @file index.ts
 * @fileoverview Type definitions for the Trigonometric Art Generator
 * @author Carlos Salguero
 * @version 1.0.0
 */

/**
 * Available color modes for visualization
 */
export type ColorMode =
  | "spectrum"
  | "plasma"
  | "fire"
  | "ocean"
  | "galaxy"
  | "neon"
  | "aurora"

/**
 * Represents a mathematical function configuration for art generation
 *
 * @interface TrigFunction
 */
export interface TrigFunction {
  /** Unique identifier for the function */
  readonly id: string

  /** Display name of the function */
  readonly name: string

  /** Brief description of what the function creates */
  readonly description: string

  /** Mathematical expression for X coordinate */
  readonly xEquation: string

  /** Mathematical expression for Y coordinate */
  readonly yEquation: string

  /** Color scheme for the visualization */
  readonly colorMode: ColorMode

  /** Speed multiplier for animation (0.1 to 3.0) */
  readonly animationSpeed: number

  /** Number of points to calculate (affects detail level) */
  readonly complexity: number

  /** Default line width for rendering (0.5 to 5.0) */
  readonly lineWidth: number

  /** Default trail opacity for ghosting effect (0.8 to 0.99) */
  readonly trailOpacity: number
}

/**
 * Represents a point in the visualization with color information
 *
 * @interface Point
 */
export interface Point {
  /** X coordinate in canvas space */
  readonly x: number

  /** Y coordinate in canvas space */
  readonly y: number

  /** Color hue value (0-1) for gradient calculations */
  readonly hue: number

  /** Opacity value (0-1) for alpha blending */
  readonly alpha: number

  /** Point index for gradient calculations */
  readonly index: number

  /** Distance from center for radial effects */
  readonly distance?: number

  /** Velocity for motion blur effects */
  readonly velocity?: { x: number; y: number }
}

/**
 * Canvas rendering configuration
 *
 * @interface RenderConfig
 */
export interface RenderConfig {
  /** Canvas width in pixels */
  readonly width: number

  /** Canvas height in pixels */
  readonly height: number

  /** Center X coordinate */
  readonly centerX: number

  /** Center Y coordinate */
  readonly centerY: number

  /** Device pixel ratio for high-DPI displays */
  readonly pixelRatio: number

  /** Maximum texture size for WebGL contexts */
  readonly maxTextureSize?: number
}

/**
 * Animation state management
 *
 * @interface AnimationState
 */
export interface AnimationState {
  /** Current animation time in seconds */
  time: number

  /** Whether animation is currently playing */
  isPlaying: boolean

  /** Animation frame request ID for cleanup */
  frameId: number | null

  /** Last frame timestamp for delta time calculations */
  lastFrameTime: number

  /** Current frames per second */
  fps: number

  /** Total frames rendered */
  frameCount: number
}

/**
 * Performance metrics for monitoring
 *
 * @interface PerformanceMetrics
 */
export interface PerformanceMetrics {
  /** Current frames per second */
  readonly fps: number

  /** Total points being rendered */
  readonly pointCount: number

  /** Average frame time in milliseconds */
  readonly avgFrameTime: number

  /** Memory usage estimate in MB */
  readonly memoryUsage: number

  /** GPU utilization percentage (if available) */
  readonly gpuUtilization?: number
}

/**
 * Color scheme configuration
 *
 * @interface ColorScheme
 */
export interface ColorScheme {
  /** Display name of the color scheme */
  readonly name: string

  /** Function to generate color based on parameters */
  readonly getColor: (t: number, alpha: number, time: number) => string

  /** Optional gradient stops for complex color schemes */
  readonly gradientStops?: readonly string[]

  /** Whether this scheme supports HDR colors */
  readonly supportsHDR?: boolean
}

/**
 * User preferences and settings
 *
 * @interface UserSettings
 */
export interface UserSettings {
  /** Preferred quality setting */
  quality: "low" | "medium" | "high" | "ultra"

  /** Whether to show performance overlay */
  showPerformance: boolean

  /** Whether to enable advanced effects */
  enableAdvancedEffects: boolean

  /** Preferred color scheme */
  preferredColorMode: ColorMode

  /** Auto-save interval in minutes */
  autoSaveInterval: number

  /** Maximum allowed complexity for performance */
  maxComplexity: number
}

/**
 * Mathematical expression evaluation context
 *
 * @interface EvaluationContext
 */
export interface EvaluationContext {
  /** Parameter variable */
  readonly t: number

  /** Time variable for animation */
  readonly time: number

  /** Additional custom variables */
  readonly [key: string]: number
}

/**
 * Error types for better error handling
 */
export type ErrorType =
  | "EXPRESSION_EVALUATION_ERROR"
  | "CANVAS_INITIALIZATION_ERROR"
  | "WEBGL_NOT_SUPPORTED"
  | "PERFORMANCE_DEGRADATION"
  | "MEMORY_LIMIT_EXCEEDED"

/**
 * Application error with context
 *
 * @interface AppError
 */
export interface AppError {
  /** Error type for categorization */
  readonly type: ErrorType

  /** Human-readable error message */
  readonly message: string

  /** Technical details for debugging */
  readonly details?: string

  /** Timestamp when error occurred */
  readonly timestamp: number

  /** Whether the error is recoverable */
  readonly recoverable: boolean
}
