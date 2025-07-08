/**
 * @file canvas-render.ts
 * @fileoverview
 * @author Carlos Salguero
 * @version 1.0.0
 */

import {
  ColorScheme,
  PerformanceMetrics,
  Point,
  RenderConfig,
  TrigFunction,
} from "@/types"
import { clamp, getHighPrecisionTime, throttle } from "./utils"

/**
 * Rendering quality levels with automatic performance adaptation
 */
export type RenderQuality = "low" | "medium" | "high" | "ultra"

/**
 * Advanced rendering options for fine-tuned control
 */
interface RenderOptions {
  /** Quality level for automatic optimization */
  quality: RenderQuality

  /** Enable advanced visual effects */
  enableEffects: boolean

  /** Enable anti-aliasing */
  antialiasing: boolean

  /** Enable motion blur effects */
  motionBlur: boolean

  /** Enable glow and bloom effects */
  glowEffects: boolean

  /** Maximum points to render per frame */
  maxPointsPerFrame: number

  /** Adaptive quality based on performance */
  adaptiveQuality: boolean
}

/**
 * Performance monitoring for adaptive rendering
 */
interface RenderingPerformance {
  /** Current frames per second */
  fps: number

  /** Average frame time in milliseconds */
  frameTime: number

  /** Points rendered in last frame */
  pointsRendered: number

  /** Whether performance is degraded */
  isPerformanceDegraded: boolean

  /** Recommended quality level */
  recommendedQuality: RenderQuality
}

/**
 * High-performance canvas renderer with advanced visual effects and
 * optimization
 *
 * @class CanvasRenderer
 * @description Provides professional-grade 2D canvas rendering with GPU
 * acceleration, adaptive quality, and sophisticated visual effects optimized
 * for mathematical art
 */
export class CanvasRenderer {
  private ctx: CanvasRenderingContext2D
  private config: RenderConfig
  private options: RenderOptions
  private performance: RenderingPerformance

  // Offscreen rendering for better performance
  private offscreenCanvas?: OffscreenCanvas | undefined
  private offscreenCtx?: OffscreenCanvasRenderingContext2D | undefined

  // Performance monitoring
  private frameTimestamps: number[] = []
  private lastFrameTime = 0
  private frameCount = 0

  // Adaptive quality management
  private qualityScaleFactor = 1.0
  private lastQualityCheck = 0
  private readonly QUALITY_CHECK_INTERVAL = 1000

  // Visual effect caches
  private gradientCache = new Map<string, CanvasGradient>()
  private pathCache = new Map<string, Path2D>()

  /**
   * Creates a new CanvasRenderer instance with advanced configuration
   *
   * @param canvas - The HTML canvas element to render to
   * @param options - Rendering options for quality and effects
   *
   * @example
   * ```typescript
   * const renderer = new CanvasRenderer(canvasElement, {
   *   quality: 'high',
   *   enableEffects: true,
   *   antialiasing: true,
   *   adaptiveQuality: true
   * })
   * ```
   */
  constructor(canvas: HTMLCanvasElement, options: Partial<RenderOptions> = {}) {
    const ctx = canvas.getContext("2d", {
      alpha: false,
      desynchronized: true,
      willReadFrequently: false,
      powerPreference: "high-performance",
    })

    if (!ctx || !(ctx instanceof CanvasRenderingContext2D)) {
      throw new Error("Failed to get 2D rendering context")
    }

    this.ctx = ctx
    this.config = this.calculateConfig(canvas)
    this.options = this.normalizeOptions(options)
    this.performance = this.initializePerformanceMetrics()

    this.setupCanvas()
    this.initializeOffscreenCanvas()
    this.setupPerformanceMonitoring()
  }

  /**
   * Normalizes and validates rendering options
   *
   * @private
   * @param options - User-provided options
   * @returns Normalized options with defaults
   */
  private normalizeOptions(options: Partial<RenderOptions>): RenderOptions {
    return {
      quality: options.quality || "high",
      enableEffects: options.enableEffects ?? true,
      antialiasing: options.antialiasing ?? true,
      motionBlur: options.motionBlur ?? false,
      glowEffects: options.glowEffects ?? true,
      maxPointsPerFrame: options.maxPointsPerFrame || 10000,
      adaptiveQuality: options.adaptiveQuality ?? true,
      ...options,
    }
  }

  /**
   * Initializes performance metrics tracking
   *
   * @private
   * @returns Initial performance metrics
   */
  private initializePerformanceMetrics(): RenderingPerformance {
    return {
      fps: 60,
      frameTime: 16.67,
      pointsRendered: 0,
      isPerformanceDegraded: false,
      recommendedQuality: this.options.quality,
    }
  }

  /**
   * Calculates optimal canvas configuration for the current device
   *
   * @private
   * @param canvas - The canvas element
   * @returns Optimized render configuration
   */
  private calculateConfig(canvas: HTMLCanvasElement): RenderConfig {
    const rect = canvas.getBoundingClientRect()
    let pixelRatio = window.devicePixelRatio || 1

    switch (this.options?.quality) {
      case "low":
        pixelRatio = Math.min(pixelRatio, 1)
        break

      case "medium":
        pixelRatio = Math.min(pixelRatio, 1.5)
        break

      case "high":
        pixelRatio = Math.min(pixelRatio, 2)
        break

      case "ultra":
        // Use full pixel ratio for ultra quality
        break
    }

    const width = rect.width * pixelRatio
    const height = rect.height * pixelRatio

    return {
      width,
      height,
      centerX: width / 2,
      centerY: height / 2,
      pixelRatio,
      maxTextureSize: this.getMaxTextureSize(),
    }
  }

  /**
   * Gets maximum texture size supported by the device
   *
   * @private
   * @returns Maximum texture size in pixels
   */
  private getMaxTextureSize(): number {
    try {
      const canvas = document.createElement("canvas")
      const gl =
        (canvas.getContext("webgl") as WebGLRenderingContext | null) ||
        (canvas.getContext(
          "experimental-webgl"
        ) as WebGLRenderingContext | null)

      if (gl) {
        return gl.getParameter(gl.MAX_TEXTURE_SIZE)
      }
    } catch (error) {
      // Fallback if WebGL is not available
    }

    return 4096
  }

  /**
   * Sets up canvas with optimal rendering settings
   *
   * @private
   */
  private setupCanvas(): void {
    const canvas = this.ctx.canvas

    canvas.width = this.config.width
    canvas.height = this.config.height
    canvas.style.width = `${this.config.width / this.config.pixelRatio}px`
    canvas.style.height = `${this.config.height / this.config.pixelRatio}px`

    this.ctx.scale(this.config.pixelRatio, this.config.pixelRatio)
    this.ctx.lineCap = "round"
    this.ctx.lineJoin = "round"
    this.ctx.imageSmoothingEnabled = this.options.antialiasing

    if (this.options.antialiasing) {
      this.ctx.imageSmoothingQuality =
        this.options.quality === "ultra" ? "high" : "medium"
    }

    this.ctx.globalCompositeOperation = "source-over"
  }

  /**
   * Initializes offscreen canvas for performance optimization
   *
   * @private
   */
  private initializeOffscreenCanvas(): void {
    try {
      if (
        typeof OffscreenCanvas !== "undefined" &&
        this.options.quality !== "low"
      ) {
        this.offscreenCanvas = new OffscreenCanvas(
          this.config.width,
          this.config.height
        )

        const offscreenCtx = this.offscreenCanvas.getContext("2d", {
          alpha: false,
          desynchronized: true,
        })

        if (offscreenCtx) {
          offscreenCtx.imageSmoothingEnabled = this.options.antialiasing
          this.offscreenCtx = offscreenCtx
        } else {
          throw new Error("Failed to get OffscreenCanvasRenderingContext2D")
        }
      }
    } catch (error) {
      console.warn("OffscreenCanvas not supported, using main canvas")
    }
  }

  /**
   * Sets up performance monitoring with throttled updates
   *
   * @private
   */
  private setupPerformanceMonitoring(): void {
    this.frameTimestamps = []
    this.lastFrameTime = getHighPrecisionTime()
    this.checkPerformance = throttle(this.checkPerformance.bind(this), 500)
  }

  /**
   * Applies trail effect with adaptive quality and performance optimization
   *
   * @param opacity - Trail opacity (0-1)
   *
   * @example
   * ```typescript
   * renderer.applyTrailEffect(0.95) // 95% trail persistence
   * ```
   */
  applyTrailEffect(opacity: number): void {
    const clampedOpacity = clamp(opacity, 0, 1)
    const alpha = 1 - clampedOpacity
    const trailAlpha = this.performance.isPerformanceDegraded
      ? Math.min(alpha * 1.5, 0.5)
      : alpha

    this.ctx.globalCompositeOperation = "source-over"
    if (this.options.quality === "ultra" && this.options.enableEffects) {
      const gradient = this.ctx.createRadialGradient(
        this.config.centerX / this.config.pixelRatio,
        this.config.centerY / this.config.pixelRatio,
        0,
        this.config.centerX / this.config.pixelRatio,
        this.config.centerY / this.config.pixelRatio,
        Math.max(this.config.width, this.config.height) / this.config.pixelRatio
      )

      gradient.addColorStop(0, `rgba(6, 8, 16, ${trailAlpha * 0.5})`)
      gradient.addColorStop(0.7, `rgba(6, 8, 16, ${trailAlpha})`)
      gradient.addColorStop(1, `rgba(6, 8, 16, ${trailAlpha * 1.2})`)

      this.ctx.fillStyle = gradient
    } else {
      this.ctx.fillStyle = `rgba(6, 8, 16, ${trailAlpha})`
    }

    this.ctx.fillRect(
      0,
      0,
      this.config.width / this.config.pixelRatio,
      this.config.height / this.config.pixelRatio
    )
  }

  /**
   * Renders points with advanced visual effects and performance optimization
   *
   * @param points - Array of points to render
   * @param func - Function configuration
   * @param colorScheme - Color scheme to use
   * @param time - Current animation time
   *
   * @example
   * ```typescript
   * renderer.renderPoints(points, functionConfig, colorScheme, animationTime)
   * ```
   */
  renderPoints(
    points: Point[],
    func: TrigFunction,
    colorScheme: ColorScheme,
    time: number
  ): void {
    if (points.length < 2) return

    const startTime = getHighPrecisionTime()
    const maxPoints = this.performance.isPerformanceDegraded
      ? Math.floor(this.options.maxPointsPerFrame * 0.5)
      : this.options.maxPointsPerFrame

    const renderPoints =
      points.length > maxPoints ? this.cullPoints(points, maxPoints) : points

    const ctx = this.ctx
    ctx.globalCompositeOperation = "screen"

    const centerX = this.config.centerX / this.config.pixelRatio
    const centerY = this.config.centerY / this.config.pixelRatio
    const scaleFactor = this.qualityScaleFactor

    this.renderMainCurve(
      renderPoints,
      func,
      colorScheme,
      time,
      centerX,
      centerY,
      scaleFactor
    )

    if (this.options.enableEffects && this.options.quality !== "low") {
      if (this.options.glowEffects) {
        this.renderGlowEffects(
          renderPoints,
          colorScheme,
          time,
          centerX,
          centerY
        )
      }

      if (this.options.motionBlur && this.options.quality === "ultra") {
        this.renderMotionBlur(
          renderPoints,
          func,
          colorScheme,
          time,
          centerX,
          centerY
        )
      }
    }

    ctx.globalCompositeOperation = "source-over"
    this.updatePerformanceMetrics(startTime, renderPoints.length)
  }

  /**
   * Culls points intelligently to maintain performance
   *
   * @private
   * @param points - Original points array
   * @param maxPoints - Maximum points to keep
   * @returns Culled points array
   */
  private cullPoints(points: Point[], maxPoints: number): Point[] {
    if (points.length <= maxPoints) return points

    const step = points.length / maxPoints
    const culled: Point[] = []

    for (let i = 0; i < points.length; i += step) {
      culled.push(points[Math.floor(i)])
    }

    return culled
  }

  /**
   * Renders the main curve with adaptive quality and batching
   *
   * @private
   */
  private renderMainCurve(
    points: Point[],
    func: TrigFunction,
    colorScheme: ColorScheme,
    time: number,
    centerX: number,
    centerY: number,
    scaleFactor: number
  ): void {
    const ctx = this.ctx
    const baseBatchSize = this.options.quality === "low" ? 20 : 50
    const batchSize = Math.floor(baseBatchSize * scaleFactor)
    const usePath2D =
      typeof Path2D !== "undefined" && this.options.quality !== "low"

    for (let i = 0; i < points.length - 1; i += batchSize) {
      const endIndex = Math.min(i + batchSize, points.length - 1)

      if (usePath2D) {
        this.renderCurveBatchWithPath2D(
          points,
          i,
          endIndex,
          func,
          colorScheme,
          time,
          centerX,
          centerY
        )
      } else {
        this.renderCurveBatchDirect(
          points,
          i,
          endIndex,
          func,
          colorScheme,
          time,
          centerX,
          centerY
        )
      }
    }
  }

  /**
   * Renders curve batch using Path2D for better performance
   *
   * @private
   */
  private renderCurveBatchWithPath2D(
    points: Point[],
    startIndex: number,
    endIndex: number,
    func: TrigFunction,
    colorScheme: ColorScheme,
    time: number,
    centerX: number,
    centerY: number
  ): void {
    const ctx = this.ctx
    const path = new Path2D()

    for (let j = startIndex; j < endIndex; j++) {
      const point1 = points[j]
      const point2 = points[j + 1]

      if (!point2) break

      const x1 = centerX + point1.x
      const y1 = centerY + point1.y
      const x2 = centerX + point2.x
      const y2 = centerY + point2.y

      if (j === startIndex) {
        path.moveTo(x1, y1)
      }
      path.lineTo(x2, y2)
    }

    const batchProgress = startIndex / points.length
    const gradient = this.createGradientForBatch(
      points,
      startIndex,
      endIndex,
      colorScheme,
      time,
      centerX,
      centerY
    )

    ctx.strokeStyle = gradient
    ctx.lineWidth =
      func.lineWidth + Math.sin(time * 2 + startIndex * 0.01) * 0.3
    ctx.stroke(path)
  }

  /**
   * Renders curve batch using direct canvas operations
   *
   * @private
   */
  private renderCurveBatchDirect(
    points: Point[],
    startIndex: number,
    endIndex: number,
    func: TrigFunction,
    colorScheme: ColorScheme,
    time: number,
    centerX: number,
    centerY: number
  ): void {
    const ctx = this.ctx
    ctx.beginPath()

    for (let j = startIndex; j < endIndex; j++) {
      const point1 = points[j]
      const point2 = points[j + 1]

      if (!point2) break

      const x1 = centerX + point1.x
      const y1 = centerY + point1.y
      const x2 = centerX + point2.x
      const y2 = centerY + point2.y
      const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
      if (distance < 0.5) continue

      const progress1 = point1.index / points.length
      const color = colorScheme.getColor(progress1, point1.alpha * 0.9, time)

      ctx.strokeStyle = color
      ctx.lineWidth = func.lineWidth + Math.sin(time * 2 + j * 0.01) * 0.2

      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
    }
  }

  /**
   * Creates optimized gradient for curve batches
   *
   * @private
   */
  private createGradientForBatch(
    points: Point[],
    startIndex: number,
    endIndex: number,
    colorScheme: ColorScheme,
    time: number,
    centerX: number,
    centerY: number
  ): CanvasGradient {
    const point1 = points[startIndex]
    const point2 = points[Math.min(endIndex, points.length - 1)]
    const x1 = centerX + point1.x
    const y1 = centerY + point1.y
    const x2 = centerX + point2.x
    const y2 = centerY + point2.y
    const cacheKey = `${x1},${y1},${x2},${y2},${time.toFixed(2)}`

    if (this.gradientCache.has(cacheKey)) {
      return this.gradientCache.get(cacheKey)!
    }

    const gradient = this.ctx.createLinearGradient(x1, y1, x2, y2)
    const progress1 = point1.index / points.length
    const progress2 = point2.index / points.length

    gradient.addColorStop(
      0,
      colorScheme.getColor(progress1, point1.alpha * 0.9, time)
    )

    gradient.addColorStop(
      1,
      colorScheme.getColor(progress2, point2.alpha * 0.9, time)
    )

    if (this.gradientCache.size > 100) {
      this.gradientCache.clear()
    }

    this.gradientCache.set(cacheKey, gradient)
    return gradient
  }

  /**
   * Renders subtle glow effects at strategic points
   *
   * @private
   */
  private renderGlowEffects(
    points: Point[],
    colorScheme: ColorScheme,
    time: number,
    centerX: number,
    centerY: number
  ): void {
    const ctx = this.ctx
    const glowInterval = Math.max(50, Math.floor(points.length / 12))
    const glowIntensity = this.options.quality === "ultra" ? 1.0 : 0.6

    for (let i = 0; i < points.length; i += glowInterval) {
      const point = points[i]
      const progress = point.index / points.length
      const baseRadius = 2 + Math.sin(time * 3 + i * 0.1) * 1
      const glowRadius = baseRadius * glowIntensity

      const x = centerX + point.x
      const y = centerY + point.y
      const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, glowRadius)
      const glowColor = colorScheme.getColor(
        progress,
        0.4 * glowIntensity,
        time
      )

      glowGradient.addColorStop(0, glowColor)
      glowGradient.addColorStop(0.7, glowColor.replace(/[\d.]+\)$/g, "0.1)"))
      glowGradient.addColorStop(1, "transparent")

      ctx.fillStyle = glowGradient
      ctx.beginPath()
      ctx.arc(x, y, glowRadius, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  /**
   * Renders motion blur effects for ultra quality
   *
   * @private
   */
  private renderMotionBlur(
    points: Point[],
    func: TrigFunction,
    colorScheme: ColorScheme,
    time: number,
    centerX: number,
    centerY: number
  ): void {
    if (!this.offscreenCtx) return

    const ctx = this.offscreenCtx
    const blurSteps = 3
    const blurAlpha = 0.3

    for (let step = 0; step < blurSteps; step++) {
      const timeOffset = (step - blurSteps / 2) * 0.016 // 16ms steps
      const stepAlpha = blurAlpha * (1 - step / blurSteps)

      ctx.globalAlpha = stepAlpha
      for (let i = 0; i < points.length - 1; i += 5) {
        const point = points[i]
        const progress = point.index / points.length
        const color = colorScheme.getColor(
          progress,
          stepAlpha,
          time + timeOffset
        )

        ctx.strokeStyle = color
        ctx.lineWidth = func.lineWidth * 0.5

        const x = centerX + point.x
        const y = centerY + point.y

        ctx.beginPath()
        ctx.arc(x, y, 1, 0, Math.PI * 2)
        ctx.stroke()
      }
    }

    ctx.globalAlpha = 1

    this.ctx.globalCompositeOperation = "screen"
    this.ctx.globalAlpha = 0.3
    this.ctx.drawImage(this.offscreenCanvas as any, 0, 0)
    this.ctx.globalAlpha = 1
  }

  /**
   * Updates performance metrics and adaptive quality
   *
   * @private
   */
  private updatePerformanceMetrics(
    startTime: number,
    pointsRendered: number
  ): void {
    const frameTime = getHighPrecisionTime() - startTime
    this.frameTimestamps.push(frameTime)
    this.performance.pointsRendered = pointsRendered

    if (this.frameTimestamps.length > 60) {
      this.frameTimestamps.shift()
    }

    const avgFrameTime =
      this.frameTimestamps.reduce((a, b) => a + b) / this.frameTimestamps.length
    this.performance.frameTime = avgFrameTime
    this.performance.fps = 1000 / avgFrameTime

    this.performance.isPerformanceDegraded =
      this.performance.fps < 30 || avgFrameTime > 33

    if (this.options.adaptiveQuality) {
      this.checkPerformance()
    }
  }

  /**
   * Checks performance and adjusts quality accordingly
   *
   * @private
   */
  private checkPerformance(): void {
    const now = getHighPrecisionTime()
    if (now - this.lastQualityCheck < this.QUALITY_CHECK_INTERVAL) return

    this.lastQualityCheck = now

    if (this.performance.fps < 20) {
      this.qualityScaleFactor = Math.max(0.3, this.qualityScaleFactor * 0.8)
      this.performance.recommendedQuality = "low"
    } else if (this.performance.fps < 30) {
      this.qualityScaleFactor = Math.max(0.5, this.qualityScaleFactor * 0.9)
      this.performance.recommendedQuality = "medium"
    } else if (this.performance.fps > 50 && this.qualityScaleFactor < 1.0) {
      this.qualityScaleFactor = Math.min(1.0, this.qualityScaleFactor * 1.1)
      this.performance.recommendedQuality = "high"
    }
  }

  /**
   * Updates canvas configuration when size changes
   *
   * @param canvas - The canvas element
   *
   * @example
   * ```typescript
   * window.addEventListener('resize', () => {
   *   renderer.updateConfig(canvasElement)
   * })
   * ```
   */
  updateConfig(canvas: HTMLCanvasElement): void {
    this.config = this.calculateConfig(canvas)
    this.setupCanvas()

    if (this.offscreenCanvas) {
      this.offscreenCanvas.width = this.config.width
      this.offscreenCanvas.height = this.config.height
    }

    this.gradientCache.clear()
    this.pathCache.clear()
  }

  /**
   * Updates rendering options dynamically
   *
   * @param newOptions - New rendering options
   *
   * @example
   * ```typescript
   * renderer.updateOptions({ quality: 'ultra', enableEffects: true })
   * ```
   */
  updateOptions(newOptions: Partial<RenderOptions>): void {
    this.options = { ...this.options, ...newOptions }
    this.setupCanvas() // Reapply canvas settings

    if (newOptions.quality && newOptions.quality !== "low") {
      this.initializeOffscreenCanvas()
    }
  }

  /**
   * Gets current render configuration
   *
   * @returns Current render configuration
   *
   * @example
   * ```typescript
   * const config = renderer.getConfig()
   * console.log(`Canvas size: ${config.width}x${config.height}`)
   * ```
   */
  getConfig(): RenderConfig {
    return { ...this.config }
  }

  /**
   * Gets current rendering options
   *
   * @returns Current rendering options
   */
  getOptions(): RenderOptions {
    return { ...this.options }
  }

  /**
   * Gets current performance metrics
   *
   * @returns Performance metrics and statistics
   *
   * @example
   * ```typescript
   * const perf = renderer.getPerformanceMetrics()
   * console.log(`FPS: ${perf.fps.toFixed(1)}, Points: ${perf.pointsRendered}`)
   * ```
   */
  getPerformanceMetrics(): PerformanceMetrics & RenderingPerformance {
    return {
      memoryUsage: this.estimateMemoryUsage(),
      pointCount: this.performance.pointsRendered,
      avgFrameTime: this.performance.frameTime,
      ...this.performance,
    }
  }

  /**
   * Estimates memory usage for monitoring
   *
   * @private
   * @returns Estimated memory usage in MB
   */
  private estimateMemoryUsage(): number {
    const canvasMemory =
      (this.config.width * this.config.height * 4) / (1024 * 1024)
    const offscreenMemory = this.offscreenCanvas ? canvasMemory : 0
    const cacheMemory = (this.gradientCache.size + this.pathCache.size) * 0.001

    return canvasMemory + offscreenMemory + cacheMemory
  }

  /**
   * Clears the entire canvas
   *
   * @example
   * ```typescript
   * renderer.clear()
   * ```
   */
  clear(): void {
    this.ctx.clearRect(
      0,
      0,
      this.config.width / this.config.pixelRatio,
      this.config.height / this.config.pixelRatio
    )

    if (this.offscreenCtx) {
      this.offscreenCtx.clearRect(0, 0, this.config.width, this.config.height)
    }
  }

  /**
   * Saves the current canvas state
   *
   * @example
   * ```typescript
   * renderer.save()
   * // ... make temporary changes ...
   * renderer.restore()
   * ```
   */
  save(): void {
    this.ctx.save()
    if (this.offscreenCtx) {
      this.offscreenCtx.save()
    }
  }

  /**
   * Restores the previously saved canvas state
   */
  restore(): void {
    this.ctx.restore()
    if (this.offscreenCtx) {
      this.offscreenCtx.restore()
    }
  }

  /**
   * Exports the current canvas as an image
   *
   * @param format - Image format ('png', 'jpeg', 'webp')
   * @param quality - Image quality (0-1) for lossy formats
   * @returns Promise resolving to image blob
   *
   * @example
   * ```typescript
   * const blob = await renderer.exportImage('png')
   * const url = URL.createObjectURL(blob)
   * ```
   */
  async exportImage(
    format: "png" | "jpeg" | "webp" = "png",
    quality: number = 0.9
  ): Promise<Blob> {
    return new Promise((resolve, reject) => {
      this.ctx.canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob)
          } else {
            reject(new Error("Failed to export canvas as image"))
          }
        },
        `image/${format}`,
        quality
      )
    })
  }

  /**
   * Disposes of resources and cleans up
   *
   * @example
   * ```typescript
   * renderer.dispose()
   * ```
   */
  dispose(): void {
    this.clear()
    this.gradientCache.clear()
    this.pathCache.clear()
    this.frameTimestamps = []

    this.offscreenCanvas = undefined
    this.offscreenCtx = undefined

    console.log("CanvasRenderer disposed")
  }
}
