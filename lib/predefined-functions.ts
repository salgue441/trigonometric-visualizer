/**
 * @fileoverview Predefined mathematical functions for trigonometric art
 * generation
 * @description Curated collection of mathematical functions that create
 * stunning visual patterns, each optimized for beauty, performance, and
 * mathematical interest
 * @author Carlos Salguero
 * @version 1.0.0
 */

import type { TrigFunction, ColorMode } from "@/types"

/**
 * Collection of predefined mathematical functions for art generation
 *
 * @description Each function is carefully crafted to produce unique visual patterns
 * while maintaining mathematical elegance and computational efficiency
 */
export const PREDEFINED_FUNCTIONS: TrigFunction[] = [
  {
    id: "complex-lissajous",
    name: "Complex Lissajous",
    description:
      "Multi-frequency Lissajous curves with harmonic interference patterns",
    xEquation:
      "180 * sin(3.2 * t + time * 0.5) + 60 * cos(7 * t + time * 0.3) + 20 * sin(13 * t + time * 0.1)",
    yEquation:
      "180 * cos(2.1 * t + time * 0.7) + 60 * sin(11 * t + time * 0.2) + 20 * cos(17 * t + time * 0.4)",
    colorMode: "spectrum",
    animationSpeed: 1.0,
    complexity: 2000,
    lineWidth: 1.5,
    trailOpacity: 0.98,
  },
  {
    id: "quantum-rose",
    name: "Quantum Rose",
    description:
      "Quantum-inspired rose pattern with probability wave fluctuations",
    xEquation:
      "(120 + 40 * sin(13 * t + time)) * cos(5 * t + time * 0.3) * cos(t)",
    yEquation:
      "(120 + 40 * sin(13 * t + time)) * cos(5 * t + time * 0.3) * sin(t)",
    colorMode: "plasma",
    animationSpeed: 0.8,
    complexity: 3000,
    lineWidth: 1.2,
    trailOpacity: 0.97,
  },
  {
    id: "hypercube-projection",
    name: "Hypercube Projection",
    description: "4D hypercube projected into 2D space with rotation dynamics",
    xEquation:
      "150 * sin(t + time) + 100 * cos(2 * t + time * 0.5) + 50 * sin(4 * t + time * 0.8)",
    yEquation:
      "150 * cos(t + time * 0.7) + 100 * sin(2 * t + time * 0.3) + 50 * cos(4 * t + time * 0.6)",
    colorMode: "neon",
    animationSpeed: 1.2,
    complexity: 2500,
    lineWidth: 1.8,
    trailOpacity: 0.96,
  },
  {
    id: "fibonacci-spiral",
    name: "Fibonacci Spiral",
    description: "Golden ratio spiral with Fibonacci harmonic resonances",
    xEquation:
      "(30 + t * 0.8) * cos(t * 1.618 + time) + 40 * sin(8 * t + time * 0.618)",
    yEquation:
      "(30 + t * 0.8) * sin(t * 1.618 + time) + 40 * cos(8 * t + time * 0.618)",
    colorMode: "galaxy",
    animationSpeed: 0.9,
    complexity: 4000,
    lineWidth: 1.3,
    trailOpacity: 0.985,
  },
  {
    id: "strange-attractor",
    name: "Strange Attractor",
    description: "Chaotic system creating beautiful strange attractor patterns",
    xEquation: "200 * sin(2.4 * t + time) * cos(1.7 * t + time * 0.4)",
    yEquation: "200 * cos(3.1 * t + time * 0.6) * sin(2.2 * t + time * 0.8)",
    colorMode: "fire",
    animationSpeed: 1.5,
    complexity: 3500,
    lineWidth: 1.0,
    trailOpacity: 0.99,
  },
  {
    id: "neural-network",
    name: "Neural Network",
    description:
      "Simulated neural network activation patterns with synaptic waves",
    xEquation: "160 * tanh(sin(3 * t + time)) + 80 * cos(7 * t + time * 0.5)",
    yEquation:
      "160 * tanh(cos(2 * t + time * 0.7)) + 80 * sin(5 * t + time * 0.3)",
    colorMode: "ocean",
    animationSpeed: 1.1,
    complexity: 2800,
    lineWidth: 1.6,
    trailOpacity: 0.975,
  },
  {
    id: "cosmic-web",
    name: "Cosmic Web",
    description:
      "Large-scale structure of the universe with dark matter filaments",
    xEquation:
      "140 * sin(t * 0.5 + time * 0.1) + 80 * cos(3 * t + time * 0.4) + 40 * sin(9 * t + time)",
    yEquation:
      "140 * cos(t * 0.7 + time * 0.2) + 80 * sin(2.5 * t + time * 0.3) + 40 * cos(7 * t + time * 0.8)",
    colorMode: "galaxy",
    animationSpeed: 0.6,
    complexity: 5000,
    lineWidth: 1.1,
    trailOpacity: 0.99,
  },
  {
    id: "dna-helix",
    name: "DNA Double Helix",
    description: "Double helix structure with genetic code modulation",
    xEquation:
      "100 * cos(t + time * 0.5) + 60 * cos(t * 2 + time) * sin(t * 0.1)",
    yEquation:
      "100 * sin(t + time * 0.5) + t * 2 + 60 * sin(t * 2 + time) * cos(t * 0.1)",
    colorMode: "aurora",
    animationSpeed: 0.7,
    complexity: 3000,
    lineWidth: 2.0,
    trailOpacity: 0.95,
  },
  {
    id: "mandelbrot-orbit",
    name: "Mandelbrot Orbit",
    description: "Orbital dynamics inspired by the Mandelbrot set boundary",
    xEquation:
      "150 * cos(t + time) + 100 * cos(t * 2 + time) * exp(-abs(sin(t * 0.5)) * 0.1)",
    yEquation:
      "150 * sin(t + time) + 100 * sin(t * 2 + time) * exp(-abs(cos(t * 0.5)) * 0.1)",
    colorMode: "plasma",
    animationSpeed: 1.3,
    complexity: 3500,
    lineWidth: 1.4,
    trailOpacity: 0.98,
  },
  {
    id: "quantum-interference",
    name: "Quantum Interference",
    description:
      "Two-slit experiment interference patterns with quantum uncertainty",
    xEquation: "200 * sin(t + time) * exp(-pow(sin(5 * t + time), 2) * 0.1)",
    yEquation:
      "200 * cos(t * 1.5 + time * 0.8) * exp(-pow(cos(3 * t + time), 2) * 0.1)",
    colorMode: "neon",
    animationSpeed: 1.4,
    complexity: 4000,
    lineWidth: 1.2,
    trailOpacity: 0.97,
  },
  {
    id: "fractal-fern",
    name: "Fractal Fern",
    description: "Barnsley fern fractal with parametric growth dynamics",
    xEquation:
      "120 * sin(t * 0.5) + 80 * sin(t * 2 + time) * pow(sin(t * 0.1), 2)",
    yEquation:
      "120 * cos(t * 0.3) + t * 1.5 + 60 * cos(t * 3 + time) * abs(cos(t * 0.1))",
    colorMode: "aurora",
    animationSpeed: 0.5,
    complexity: 6000,
    lineWidth: 1.0,
    trailOpacity: 0.995,
  },
  {
    id: "solar-wind",
    name: "Solar Wind",
    description:
      "Charged particle streams from the sun with magnetic field lines",
    xEquation:
      "(100 + t * 0.5) * cos(t * 0.2 + time) + 60 * sin(8 * t + time * 2)",
    yEquation:
      "(100 + t * 0.5) * sin(t * 0.2 + time) + 60 * cos(6 * t + time * 1.5)",
    colorMode: "fire",
    animationSpeed: 2.0,
    complexity: 3500,
    lineWidth: 1.3,
    trailOpacity: 0.96,
  },
  {
    id: "gravitational-waves",
    name: "Gravitational Waves",
    description: "Ripples in spacetime from colliding black holes",
    xEquation:
      "180 * sin(t + time) * exp(-t * 0.001) + 40 * sin(20 * t + time * 5)",
    yEquation:
      "180 * cos(t * 1.1 + time * 0.9) * exp(-t * 0.001) + 40 * cos(18 * t + time * 4)",
    colorMode: "galaxy",
    animationSpeed: 1.8,
    complexity: 4500,
    lineWidth: 1.5,
    trailOpacity: 0.985,
  },
  {
    id: "aurora-borealis",
    name: "Aurora Borealis",
    description: "Northern lights with magnetic field interactions",
    xEquation:
      "160 * sin(t * 0.3 + time * 0.2) + 80 * sin(t * 2 + time) * pow(sin(t * 0.05 + time * 0.1), 3)",
    yEquation:
      "120 + 100 * abs(sin(t * 0.5 + time * 0.3)) + 60 * cos(t * 3 + time * 1.2)",
    colorMode: "aurora",
    animationSpeed: 0.4,
    complexity: 4000,
    lineWidth: 2.2,
    trailOpacity: 0.99,
  },
  {
    id: "butterfly-effect",
    name: "Butterfly Effect",
    description:
      "Lorenz attractor demonstrating sensitive dependence on initial conditions",
    xEquation:
      "150 * sin(t + time) + 100 * sin(t * 2.1 + time * 0.3) + 50 * sin(t * 5.7 + time * 0.1)",
    yEquation:
      "150 * cos(t * 1.3 + time * 0.7) + 100 * cos(t * 3.2 + time * 0.5) + 50 * cos(t * 7.1 + time * 0.2)",
    colorMode: "spectrum",
    animationSpeed: 1.6,
    complexity: 5000,
    lineWidth: 1.2,
    trailOpacity: 0.98,
  },
  {
    id: "electromagnetic-field",
    name: "Electromagnetic Field",
    description:
      "Electric and magnetic field interactions with wave propagation",
    xEquation:
      "140 * cos(t + time) + 80 * sin(t * 3 + time * 2) * cos(t * 0.1)",
    yEquation:
      "140 * sin(t + time) + 80 * cos(t * 3 + time * 2) * sin(t * 0.1)",
    colorMode: "neon",
    animationSpeed: 2.2,
    complexity: 3000,
    lineWidth: 1.7,
    trailOpacity: 0.94,
  },
  {
    id: "crystal-lattice",
    name: "Crystal Lattice",
    description:
      "Atomic arrangement in crystalline structures with thermal vibrations",
    xEquation:
      "120 * cos(t) + 80 * cos(t * 3 + time) + 40 * cos(t * 9 + time * 3)",
    yEquation:
      "120 * sin(t) + 80 * sin(t * 3 + time) + 40 * sin(t * 9 + time * 3)",
    colorMode: "ocean",
    animationSpeed: 0.8,
    complexity: 2500,
    lineWidth: 1.4,
    trailOpacity: 0.97,
  },
  {
    id: "protein-folding",
    name: "Protein Folding",
    description:
      "Complex protein structure formation with amino acid interactions",
    xEquation:
      "100 * sin(t * 0.5 + time * 0.1) + 70 * sin(t * 2 + time * 0.5) + 40 * sin(t * 8 + time)",
    yEquation:
      "100 * cos(t * 0.7 + time * 0.2) + 70 * cos(t * 1.5 + time * 0.3) + 40 * cos(t * 6 + time * 0.8)",
    colorMode: "aurora",
    animationSpeed: 0.3,
    complexity: 7000,
    lineWidth: 1.1,
    trailOpacity: 0.995,
  },
  {
    id: "quantum-tunneling",
    name: "Quantum Tunneling",
    description: "Particle wave functions penetrating potential barriers",
    xEquation:
      "160 * sin(t + time) * exp(-abs(sin(t * 0.2)) * 2) + 60 * sin(t * 5 + time * 2)",
    yEquation:
      "160 * cos(t * 1.2 + time * 0.8) * exp(-abs(cos(t * 0.3)) * 2) + 60 * cos(t * 7 + time * 3)",
    colorMode: "plasma",
    animationSpeed: 1.7,
    complexity: 4000,
    lineWidth: 1.3,
    trailOpacity: 0.98,
  },
  {
    id: "supernova-explosion",
    name: "Supernova Explosion",
    description:
      "Stellar explosion with expanding shock waves and matter ejection",
    xEquation:
      "(80 + t * 0.3) * cos(t * 0.5 + time) + 100 * sin(t * 4 + time * 2) * exp(-t * 0.0005)",
    yEquation:
      "(80 + t * 0.3) * sin(t * 0.5 + time) + 100 * cos(t * 3 + time * 1.5) * exp(-t * 0.0005)",
    colorMode: "fire",
    animationSpeed: 2.5,
    complexity: 5000,
    lineWidth: 1.6,
    trailOpacity: 0.96,
  },
  {
    id: "galactic-collision",
    name: "Galactic Collision",
    description: "Two galaxies merging with tidal forces and star formation",
    xEquation:
      "120 * cos(t * 0.1 + time * 0.05) + 100 * cos(t + time * 0.5) + 60 * cos(t * 3 + time)",
    yEquation:
      "120 * sin(t * 0.15 + time * 0.08) + 100 * sin(t * 0.8 + time * 0.3) + 60 * sin(t * 2.5 + time * 0.7)",
    colorMode: "galaxy",
    animationSpeed: 0.2,
    complexity: 8000,
    lineWidth: 1.2,
    trailOpacity: 0.998,
  },
  {
    id: "mobius-strip",
    name: "Möbius Strip",
    description:
      "One-sided surface with a half-twist, creating a continuous loop",
    xEquation:
      "150 * cos(t + time * 0.5) * (1 + 0.5 * cos(t * 0.5 + time * 0.3))",
    yEquation:
      "150 * sin(t + time * 0.5) * (1 + 0.5 * cos(t * 0.5 + time * 0.3))",
    colorMode: "spectrum",
    animationSpeed: 0.7,
    complexity: 2500,
    lineWidth: 1.5,
    trailOpacity: 0.97,
  },
  {
    id: "klein-bottle",
    name: "Klein Bottle",
    description:
      "Non-orientable surface with no boundary, a 4D object projected into 2D",
    xEquation:
      "120 * (cos(t + time) * (1 + sin(t * 0.5 + time * 0.2)) + cos(t * 2 + time * 0.5) * 0.5)",
    yEquation:
      "120 * (sin(t + time) * (1 + sin(t * 0.5 + time * 0.2)) + sin(t * 3 + time * 0.7) * 0.3)",
    colorMode: "plasma",
    animationSpeed: 0.6,
    complexity: 3500,
    lineWidth: 1.3,
    trailOpacity: 0.98,
  },
  {
    id: "heart-curve",
    name: "Heart Curve",
    description: "Mathematical heart shape with pulsing animation",
    xEquation: "160 * pow(sin(t + time), 3)",
    yEquation:
      "130 * cos(t + time * 0.8) - 50 * cos(2 * (t + time)) - 20 * cos(3 * (t + time)) - 10 * cos(4 * (t + time))",
    colorMode: "fire",
    animationSpeed: 1.2,
    complexity: 2000,
    lineWidth: 2.0,
    trailOpacity: 0.95,
  },
  {
    id: "torus-knot",
    name: "Torus Knot",
    description:
      "Knot drawn on the surface of a torus with p,q winding numbers",
    xEquation: "(100 + 40 * cos(3 * t + time * 0.5)) * cos(2 * t + time)",
    yEquation: "(100 + 40 * cos(3 * t + time * 0.5)) * sin(2 * t + time)",
    colorMode: "neon",
    animationSpeed: 0.9,
    complexity: 3000,
    lineWidth: 1.4,
    trailOpacity: 0.96,
  },
  {
    id: "harmonic-oscillator",
    name: "Harmonic Oscillator",
    description: "Damped harmonic motion with multiple coupled oscillators",
    xEquation: "200 * exp(-t * 0.001) * sin(3 * t + time) * cos(t * 0.2)",
    yEquation: "200 * exp(-t * 0.001) * cos(2 * t + time * 0.7) * sin(t * 0.3)",
    colorMode: "ocean",
    animationSpeed: 1.1,
    complexity: 2800,
    lineWidth: 1.2,
    trailOpacity: 0.99,
  },
  {
    id: "particle-collider",
    name: "Particle Collider",
    description: "High-energy particle collisions with decay patterns",
    xEquation:
      "150 * tanh(sin(2 * t + time)) + 80 * sin(7 * t + time * 2) * exp(-t * 0.0003)",
    yEquation:
      "150 * tanh(cos(3 * t + time * 0.7)) + 80 * cos(5 * t + time * 1.5) * exp(-t * 0.0003)",
    colorMode: "plasma",
    animationSpeed: 2.0,
    complexity: 4500,
    lineWidth: 1.6,
    trailOpacity: 0.94,
  },
  {
    id: "vortex-field",
    name: "Vortex Field",
    description: "Swirling fluid dynamics with multiple interacting vortices",
    xEquation:
      "140 * cos(t + time) + 90 * sin(t * 2 + time * 0.5) / (1 + 0.5 * abs(sin(t * 0.2)))",
    yEquation:
      "140 * sin(t + time) + 90 * cos(t * 3 + time * 0.3) / (1 + 0.5 * abs(cos(t * 0.3)))",
    colorMode: "ocean",
    animationSpeed: 1.3,
    complexity: 3200,
    lineWidth: 1.5,
    trailOpacity: 0.97,
  },
  {
    id: "quantum-entanglement",
    name: "Quantum Entanglement",
    description: "Correlated quantum states with non-local connections",
    xEquation:
      "170 * sin(t + time) * (1 + 0.3 * sin(t * 7 + time * 2) * sin(t * 13 + time * 0.7))",
    yEquation:
      "170 * cos(t + time * 0.8) * (1 + 0.3 * cos(t * 5 + time * 1.5) * cos(t * 11 + time * 0.4))",
    colorMode: "neon",
    animationSpeed: 1.8,
    complexity: 5000,
    lineWidth: 1.2,
    trailOpacity: 0.98,
  },
]

/**
 * Gets a predefined function by ID with error handling
 *
 * @description Safely retrieves a predefined function with fallback to the
 * first function if the requested ID doesn't exist
 *
 * @param id - The function ID to retrieve
 * @returns The requested function or the first function as fallback
 *
 * @example
 * ```typescript
 * const func = getPredefinedFunction('complex-lissajous')
 * console.log(`Function: ${func.name}`)
 * ```
 */
export function getPredefinedFunction(id: string): TrigFunction {
  return (
    PREDEFINED_FUNCTIONS.find((func) => func.id === id) ||
    PREDEFINED_FUNCTIONS[0]
  )
}

/**
 * Gets all predefined function IDs for UI selection
 *
 * @description Returns an array of all available function identifiers
 * for dropdown menus and selection interfaces
 *
 * @returns Array of function IDs
 *
 * @example
 * ```typescript
 * const functionIds = getPredefinedFunctionIds()
 * // Use in a select component
 * ```
 */
export function getPredefinedFunctionIds(): string[] {
  return PREDEFINED_FUNCTIONS.map((func) => func.id)
}

/**
 * Gets predefined functions filtered by color mode
 *
 * @description Returns functions that use a specific color mode,
 * useful for themed selections or color-based filtering
 *
 * @param colorMode - The color mode to filter by
 * @returns Array of functions using the specified color mode
 *
 * @example
 * ```typescript
 * const plasmaFunctions = getFunctionsByColorMode('plasma')
 * ```
 */
export function getFunctionsByColorMode(colorMode: ColorMode): TrigFunction[] {
  return PREDEFINED_FUNCTIONS.filter((func) => func.colorMode === colorMode)
}

/**
 * Gets predefined functions filtered by complexity range
 *
 * @description Returns functions within a specified complexity range,
 * useful for performance-based filtering or difficulty levels
 *
 * @param minComplexity - Minimum complexity threshold
 * @param maxComplexity - Maximum complexity threshold
 * @returns Array of functions within the complexity range
 *
 * @example
 * ```typescript
 * const simpleFunctions = getFunctionsByComplexity(0, 3000)
 * const complexFunctions = getFunctionsByComplexity(5000, Infinity)
 * ```
 */
export function getFunctionsByComplexity(
  minComplexity: number,
  maxComplexity: number
): TrigFunction[] {
  return PREDEFINED_FUNCTIONS.filter(
    (func) =>
      func.complexity >= minComplexity && func.complexity <= maxComplexity
  )
}

/**
 * Gets predefined functions filtered by animation speed range
 *
 * @description Returns functions within a specified animation speed range,
 * useful for creating specific timing experiences
 *
 * @param minSpeed - Minimum animation speed
 * @param maxSpeed - Maximum animation speed
 * @returns Array of functions within the speed range
 *
 * @example
 * ```typescript
 * const slowAnimations = getFunctionsBySpeed(0, 1.0)
 * const fastAnimations = getFunctionsBySpeed(1.5, Infinity)
 * ```
 */
export function getFunctionsBySpeed(
  minSpeed: number,
  maxSpeed: number
): TrigFunction[] {
  return PREDEFINED_FUNCTIONS.filter(
    (func) => func.animationSpeed >= minSpeed && func.animationSpeed <= maxSpeed
  )
}

/**
 * Creates a random function selection with optional filters
 *
 * @description Randomly selects a function from the available options,
 * with optional filtering by category or characteristics
 *
 * @param options - Optional filtering criteria
 * @returns Randomly selected function
 *
 * @example
 * ```typescript
 * const randomFunc = getRandomFunction()
 * const fastRandomFunc = getRandomFunction({ minSpeed: 1.5 })
 * ```
 */
export function getRandomFunction(
  options: {
    colorMode?: ColorMode
    minComplexity?: number
    maxComplexity?: number
    minSpeed?: number
    maxSpeed?: number
  } = {}
): TrigFunction {
  let functions = PREDEFINED_FUNCTIONS

  if (options.colorMode) {
    functions = functions.filter((func) => func.colorMode === options.colorMode)
  }

  if (
    options.minComplexity !== undefined ||
    options.maxComplexity !== undefined
  ) {
    const min = options.minComplexity ?? 0
    const max = options.maxComplexity ?? Infinity
    functions = functions.filter(
      (func) => func.complexity >= min && func.complexity <= max
    )
  }

  if (options.minSpeed !== undefined || options.maxSpeed !== undefined) {
    const min = options.minSpeed ?? 0
    const max = options.maxSpeed ?? Infinity
    functions = functions.filter(
      (func) => func.animationSpeed >= min && func.animationSpeed <= max
    )
  }

  if (functions.length === 0) {
    return PREDEFINED_FUNCTIONS[0]
  }

  const randomIndex = Math.floor(Math.random() * functions.length)
  return functions[randomIndex]
}

/**
 * Creates a function playlist for sequential playback
 *
 * @description Creates an ordered sequence of functions for automatic progression,
 * useful for demonstrations or automated art generation
 *
 * @param options - Playlist configuration options
 * @returns Array of functions in playback order
 *
 * @example
 * ```typescript
 * const playlist = createFunctionPlaylist({
 *   sortBy: 'complexity',
 *   maxFunctions: 10
 * })
 * ```
 */
export function createFunctionPlaylist(
  options: {
    sortBy?: "complexity" | "speed" | "name" | "random"
    maxFunctions?: number
    excludeIds?: string[]
    includeOnlyColorModes?: ColorMode[]
  } = {}
): TrigFunction[] {
  let functions = [...PREDEFINED_FUNCTIONS]
  if (options.excludeIds) {
    functions = functions.filter(
      (func) => !options.excludeIds!.includes(func.id)
    )
  }

  if (options.includeOnlyColorModes) {
    functions = functions.filter((func) =>
      options.includeOnlyColorModes!.includes(func.colorMode)
    )
  }

  switch (options.sortBy) {
    case "complexity":
      functions.sort((a, b) => a.complexity - b.complexity)
      break

    case "speed":
      functions.sort((a, b) => a.animationSpeed - b.animationSpeed)
      break

    case "name":
      functions.sort((a, b) => a.name.localeCompare(b.name))
      break

    case "random":
      for (let i = functions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[functions[i], functions[j]] = [functions[j], functions[i]]
      }

      break
  }

  if (options.maxFunctions && options.maxFunctions > 0) {
    functions = functions.slice(0, options.maxFunctions)
  }

  return functions
}

/**
 * Validates a custom function against predefined function standards
 *
 * @description Checks if a custom function meets the same standards as
 * predefined functions useful for user-created functions or imports
 *
 * @param func - The function to validate
 * @returns Validation result with any issues found
 *
 * @example
 * ```typescript
 * const validation = validateFunction(customFunction)
 * if (!validation.isValid) {
 *   console.error('Validation errors:', validation.errors)
 * }
 * ```
 */
export function validateFunction(func: Partial<TrigFunction>): {
  isValid: boolean
  errors: string[]
  warnings: string[]
} {
  const errors: string[] = []
  const warnings: string[] = []

  if (!func.id) errors.push("Function ID is required")
  if (!func.name) errors.push("Function name is required")
  if (!func.description) errors.push("Function description is required")
  if (!func.xEquation) errors.push("X equation is required")
  if (!func.yEquation) errors.push("Y equation is required")
  if (!func.colorMode) errors.push("Color mode is required")

  if (func.animationSpeed !== undefined) {
    if (func.animationSpeed <= 0 || func.animationSpeed > 5) {
      errors.push("Animation speed must be between 0 and 5")
    }
  }

  if (func.complexity !== undefined) {
    if (func.complexity < 100 || func.complexity > 10000) {
      warnings.push("Complexity should typically be between 100 and 10000")
    }
  }

  if (func.lineWidth !== undefined) {
    if (func.lineWidth < 0.5 || func.lineWidth > 5) {
      warnings.push("Line width should typically be between 0.5 and 5")
    }
  }

  if (func.trailOpacity !== undefined) {
    if (func.trailOpacity < 0.8 || func.trailOpacity > 1) {
      warnings.push("Trail opacity should typically be between 0.8 and 1")
    }
  }

  if (
    func.id &&
    PREDEFINED_FUNCTIONS.some((existing) => existing.id === func.id)
  ) {
    errors.push(`Function ID '${func.id}' already exists`)
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  }
}

/**
 * Gets function statistics and metadata
 *
 * @description Returns comprehensive statistics about the predefined function
 * collection
 *
 * @returns Statistics object with counts and distributions
 *
 * @example
 * ```typescript
 * const stats = getFunctionStatistics()
 * console.log(`Total functions: ${stats.totalFunctions}`)
 * ```
 */
export function getFunctionStatistics(): {
  totalFunctions: number
  colorModeDistribution: Record<ColorMode, number>
  complexityRange: { min: number; max: number; average: number }
  speedRange: { min: number; max: number; average: number }
  averageLineWidth: number
  averageTrailOpacity: number
} {
  const functions = PREDEFINED_FUNCTIONS
  const colorModeDistribution = functions.reduce(
    (acc, func) => {
      acc[func.colorMode] = (acc[func.colorMode] || 0) + 1
      return acc
    },
    {} as Record<ColorMode, number>
  )

  const complexities = functions.map((func) => func.complexity)
  const complexityRange = {
    min: Math.min(...complexities),
    max: Math.max(...complexities),
    average: complexities.reduce((a, b) => a + b) / complexities.length,
  }

  const speeds = functions.map((func) => func.animationSpeed)
  const speedRange = {
    min: Math.min(...speeds),
    max: Math.max(...speeds),
    average: speeds.reduce((a, b) => a + b) / speeds.length,
  }

  const averageLineWidth =
    functions.reduce((sum, func) => sum + func.lineWidth, 0) / functions.length
  const averageTrailOpacity =
    functions.reduce((sum, func) => sum + func.trailOpacity, 0) /
    functions.length

  return {
    totalFunctions: functions.length,
    colorModeDistribution,
    complexityRange,
    speedRange,
    averageLineWidth,
    averageTrailOpacity,
  }
}
