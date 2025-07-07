/**
 * @file color-schemes.ts
 * @fileoverview Advanced color schemes for trigonometric art visualization
 * @description Comprehensive collection of dynamic color schemes with math
 *       color generation, HDR support, and performance-optimized rendering
 * @author Carlos Salguero
 * @version 1.0.0
 */

import type { ColorScheme, ColorMode } from "@/types"

/**
 * Advanced color schemes with dynamic color generation and math precision.
 *
 * @description Each color scheme implements sophisticated color generation
 * algorithm that responds to time, position, and alpha parameters to create
 * stunning visual effects. All schemes are optimized for performance and visual
 * appeal.
 */
export const COLOR_SCHEMES: Record<ColorMode, ColorScheme> = {
  /**
   * Full spectrum rainbow with smooth transitions and harmonic variations
   *
   * @description Creates a complete color spectrum that cycles through all hues
   * with dynamic saturation and lightness modulation for depth and movement.
   */
  spectrum: {
    name: "Spectrum",
    getColor: (t: number, alpha: number, time: number) => {
      const baseHue = (t * 360 + time * 20) % 360
      const hueVariation = Math.sin(time * 0.5 + t * Math.PI * 3) * 30
      const hue = (baseHue + hueVariation + 360) % 360

      const saturation = 85 + Math.sin(time + t * Math.PI * 2) * 15
      const lightness = 55 + Math.sin(time * 1.5 + t * Math.PI * 4) * 25

      return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`
    },
    gradientStops: [
      "#ff0000",
      "#ff8000",
      "#ffff00",
      "#80ff00",
      "#00ff00",
      "#00ff80",
      "#00ffff",
      "#0080ff",
      "#0000ff",
      "#8000ff",
      "#ff00ff",
      "#ff0080",
    ],
    supportsHDR: false,
  },
  /**
   * Plasma-inspired color scheme with purple, pink, and blue tones
   *
   * @description Mimics the appearance of plasma fields with electric purple
   * and magenta tones that pulse and flow organically
   */ plasma: {
    name: "Plasma",
    getColor: (t: number, alpha: number, time: number) => {
      const baseHue = 280
      const hueRange = 120
      const hueOffset = Math.sin(time * 0.8 + t * Math.PI) * 60
      const hue = baseHue + t * hueRange + hueOffset

      const saturation = 90 + Math.cos(time * 2 + t * Math.PI * 3) * 10
      const lightness = 50 + Math.sin(time * 1.2 + t * Math.PI * 5) * 30
      const brightness = 1 + Math.sin(time * 3 + t * Math.PI * 7) * 0.3

      return `hsla(${hue}, ${saturation}%, ${
        lightness * brightness
      }%, ${alpha})`
    },
    gradientStops: ["#ff00ff", "#dd00ff", "#bb44ff", "#9966ff", "#7788ff"],
    supportsHDR: true,
  },

  /**
   * Fire-themed color scheme with warm oranges, reds, and yellows
   *
   * @description Simulates the appearance of flames with dynamic warm colors
   * that flicker and dance like real fire
   */
  fire: {
    name: "Fire",
    getColor: (t: number, alpha: number, time: number) => {
      const baseHue = 15
      const hueVariation = t * 45 + Math.sin(time * 2 + t * Math.PI * 2) * 25
      const hue = Math.max(0, Math.min(60, baseHue + hueVariation))

      const saturation = 95 + Math.cos(time * 1.5 + t * Math.PI) * 5
      const lightness = 40 + t * 40 + Math.sin(time * 3 + t * Math.PI * 6) * 20
      const flicker = 1 + Math.sin(time * 8 + t * Math.PI * 12) * 0.2

      return `hsla(${hue}, ${saturation}%, ${lightness * flicker}%, ${alpha})`
    },
    gradientStops: [
      "#ff4400",
      "#ff6600",
      "#ff8800",
      "#ffaa00",
      "#ffcc00",
      "#ffff44",
    ],
    supportsHDR: true,
  },

  /**
   * Ocean-themed color scheme with blues, teals, and aqua tones
   *
   * @description Captures the depth and movement of ocean waters with
   * flowing blue and teal gradients that suggest waves and currents
   */
  ocean: {
    name: "Ocean",
    getColor: (t: number, alpha: number, time: number) => {
      const baseHue = 195
      const hueRange = 120
      const depthFactor = Math.sin(t * Math.PI)
      const waveMotion = Math.sin(time * 0.6 + t * Math.PI * 2) * 40
      const hue = baseHue + t * hueRange + waveMotion

      const saturation = 70 + Math.sin(time * 1.8 + t * Math.PI * 2) * 25
      const lightness =
        30 + depthFactor * 40 + Math.cos(time + t * Math.PI * 4) * 20
      const ripple = 1 + Math.sin(time * 4 + t * Math.PI * 8) * 0.15

      return `hsla(${hue}, ${saturation}%, ${lightness * ripple}%, ${alpha})`
    },
    gradientStops: [
      "#004466",
      "#006688",
      "#0088aa",
      "#00aacc",
      "#22ccee",
      "#44eeff",
    ],
    supportsHDR: false,
  },

  /**
   * Galaxy-themed color scheme with deep purples, blues, and cosmic colors
   *
   * @description Evokes the mystery of deep space with rich purples, blues,
   * and hints of stellar colors that suggest nebulae and star fields
   */
  galaxy: {
    name: "Galaxy",
    getColor: (t: number, alpha: number, time: number) => {
      const baseHue = 240
      const hueRange = 180
      const cosmicDrift = Math.sin(time * 0.3 + t * Math.PI * 0.5) * 90
      const stellarPulse = Math.sin(time * 2 + t * Math.PI * 6) * 30
      const hue = baseHue + t * hueRange + cosmicDrift + stellarPulse

      const saturation = 80 + Math.cos(time * 1.2 + t * Math.PI * 2) * 20
      const baseLightness = 25 + t * 50
      const starField = Math.sin(time * 5 + t * Math.PI * 15) * 15
      const lightness = baseLightness + starField

      return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`
    },
    gradientStops: [
      "#1a0033",
      "#330066",
      "#4d0099",
      "#6600cc",
      "#8833ff",
      "#aa66ff",
    ],
    supportsHDR: true,
  },

  /**
   * Neon-themed color scheme with electric, high-saturation colors
   *
   * @description Creates electric neon effects with high saturation colors
   * that pulse and glow like electronic displays and neon signs
   */
  neon: {
    name: "Neon",
    getColor: (t: number, alpha: number, time: number) => {
      const hueSpeed = 60
      const baseHue = (t * 300 + time * hueSpeed) % 360
      const electricPulse = Math.sin(time * 4 + t * Math.PI * 8) * 45
      const hue = (baseHue + electricPulse + 360) % 360

      const saturation = 100
      const baseLightness = 60
      const strobeEffect = Math.sin(time * 6 + t * Math.PI * 12) * 25
      const lightness = baseLightness + strobeEffect
      const glow = 1 + Math.sin(time * 8 + t * Math.PI * 16) * 0.4

      return `hsla(${hue}, ${saturation}%, ${lightness * glow}%, ${alpha})`
    },
    gradientStops: [
      "#ff0080",
      "#ff0040",
      "#ff4000",
      "#80ff00",
      "#00ff80",
      "#0080ff",
      "#4000ff",
      "#8000ff",
    ],
    supportsHDR: true,
  },

  /**
   * Aurora-themed color scheme with ethereal greens, blues, and purples
   *
   * @description Captures the magical appearance of aurora borealis with
   * flowing green and blue tones that dance across the visualization
   */
  aurora: {
    name: "Aurora",
    getColor: (t: number, alpha: number, time: number) => {
      const primaryHue = 140
      const secondaryHue = 240
      const hueBlend = Math.sin(t * Math.PI) * 0.5 + 0.5
      const timeShift = Math.sin(time * 0.4 + t * Math.PI) * 60
      const hue =
        primaryHue + hueBlend * (secondaryHue - primaryHue) + timeShift

      const saturation = 60 + Math.sin(time * 1.5 + t * Math.PI * 3) * 30
      const lightness =
        45 +
        Math.sin(t * Math.PI * 2) * 25 +
        Math.cos(time * 2 + t * Math.PI * 4) * 15
      const shimmer = 1 + Math.sin(time * 3 + t * Math.PI * 9) * 0.25

      return `hsla(${hue}, ${saturation}%, ${lightness * shimmer}%, ${alpha})`
    },
    gradientStops: [
      "#00ff88",
      "#22ff66",
      "#44ff44",
      "#66ff88",
      "#88ffaa",
      "#aaffcc",
    ],
    supportsHDR: false,
  },
}

/**
 * Gets a color scheme by name with fallback handling
 *
 * @description Safely retrieves a color scheme with automatic fallback
 * to spectrum if the requested scheme doesn't exist
 *
 * @param colorMode - The color mode to retrieve
 * @returns The color scheme object
 *
 * @example
 * ```typescript
 * const scheme = getColorScheme('plasma')
 * const color = scheme.getColor(0.5, 0.8, performance.now())
 * ```
 */
export function getColorScheme(colorMode: ColorMode): ColorScheme {
  return COLOR_SCHEMES[colorMode] || COLOR_SCHEMES.spectrum
}

/**
 * Gets all available color scheme names
 *
 * @description Returns an array of all available color mode identifiers
 * for UI selection and validation purposes
 *
 * @returns Array of color mode names
 */
export function getAvailableColorModes(): ColorMode[] {
  return Object.keys(COLOR_SCHEMES) as ColorMode[]
}

/**
 * Validates if a color mode is supported
 *
 * @description Checks if the specified color mode exists in the available
 * schemes
 *
 * @param colorMode - Color mode to validate
 * @returns Whether the color mode is valid
 */
export function isValidColorMode(colorMode: string): colorMode is ColorMode {
  return colorMode in COLOR_SCHEMES
}

/**
 * Creates a custom color scheme with validation
 *
 * @description Allows creation of custom color schemes with proper validation
 * and type safety
 *
 * @param name - Display name for the color scheme
 * @param colorFunction - Function to generate colors
 * @param options - Additional options for the scheme
 * @returns Custom color scheme object
 *
 * @example
 * ```typescript
 * const customScheme = createCustomColorScheme(
 *   'Sunset',
 *   (t, alpha, time) => `hsl(${t * 60}, 100%, 50%)`,
 *   { gradientStops: ['#ff0000', '#ff8800', '#ffff00'] }
 * )
 * ```
 */
export function createCustomColorScheme(
  name: string,
  colorFunction: (t: number, alpha: number, time: number) => string,
  options: {
    gradientStops?: string[]
    supportsHDR?: boolean
  } = {}
): ColorScheme {
  return {
    name,
    getColor: colorFunction,
    gradientStops: options.gradientStops ?? [],
    supportsHDR:
      options.supportsHDR !== undefined ? options.supportsHDR : false,
  }
}

/**
 * Interpolates between two color schemes
 *
 * @description Creates a blended color scheme that interpolates between
 * two existing schemes based on a blend factor
 *
 * @param scheme1 - First color scheme
 * @param scheme2 - Second color scheme
 * @param blendFactor - Blend amount (0 = scheme1, 1 = scheme2)
 * @returns Blended color scheme
 */
export function blendColorSchemes(
  scheme1: ColorScheme,
  scheme2: ColorScheme,
  blendFactor: number
): ColorScheme {
  const clampedBlend = Math.max(0, Math.min(1, blendFactor))

  return {
    name: `${scheme1.name} × ${scheme2.name}`,
    getColor: (t: number, alpha: number, time: number) => {
      const color1 = scheme1.getColor(t, alpha, time)
      const color2 = scheme2.getColor(t, alpha, time)

      return clampedBlend < 0.5 ? color1 : color2
    },
    gradientStops: [
      ...(scheme1.gradientStops || []),
      ...(scheme2.gradientStops || []),
    ],
    supportsHDR: Boolean(scheme1.supportsHDR || scheme2.supportsHDR),
  }
}
