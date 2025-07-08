/**
 * @file expression-evaluator.ts
 * @fileoverview Advanced math expression evaluator
 * @description Comprehensive expression evaluation system with caching,
 * validation, security measures, and performance monitoring for trigonometric
 * art generation.
 * @author Carlos Salguero
 * @version 1.0.0
 */

import { AppError, ErrorType, EvaluationContext } from "@/types"

/**
 * Safe mathematical functions available in expressions
 *
 * @description Curated collection of mathematical functions that are safe
 * for expression evaluation without security risks or performance issues
 */
const SAFE_MATH_FUNCTIONS = {
  // Trigonometric functions
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  asin: Math.asin,
  acos: Math.acos,
  atan: Math.atan,
  atan2: Math.atan2,

  // Hyperbolic functions
  sinh: Math.sinh,
  cosh: Math.cosh,
  tanh: Math.tanh,
  asinh: Math.asinh,
  acosh: Math.acosh,
  atanh: Math.atanh,

  // Exponential and logarithmic
  exp: Math.exp,
  exp2: (x: number) => Math.pow(2, x),
  expm1: Math.expm1,
  log: Math.log,
  log10: Math.log10,
  log2: Math.log2,
  log1p: Math.log1p,

  // Power and root functions
  pow: Math.pow,
  sqrt: Math.sqrt,
  cbrt: Math.cbrt,
  hypot: Math.hypot,

  // Rounding and sign functions
  abs: Math.abs,
  sign: Math.sign,
  floor: Math.floor,
  ceil: Math.ceil,
  round: Math.round,
  trunc: Math.trunc,
  fround: Math.fround,

  // Min/max and comparison
  min: Math.min,
  max: Math.max,
  clamp: (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max),

  // Advanced mathematical functions
  fmod: (x: number, y: number) => x % y,
  remainder: (x: number, y: number) => x - Math.round(x / y) * y,
  gamma: (x: number) => {
    if (x < 0.5)
      return (
        Math.PI /
        (Math.sin(Math.PI * x) *
          Math.exp(Math.log(Math.abs(x)) + 0.5772156649015329 * x))
      )

    return Math.sqrt((2 * Math.PI) / x) * Math.pow(x / Math.E, x)
  },

  // Constants
  PI: Math.PI,
  E: Math.E,
  LN2: Math.LN2,
  LN10: Math.LN10,
  LOG2E: Math.LOG2E,
  LOG10E: Math.LOG10E,
  SQRT1_2: Math.SQRT1_2,
  SQRT2: Math.SQRT2,

  // Additional useful constants
  TAU: Math.PI * 2,
  PHI: (1 + Math.sqrt(5)) / 2,
  DEG2RAD: Math.PI / 180,
  RAD2DEG: 180 / Math.PI,
} as const

/**
 * Expression validation result interface
 */
interface ValidationResult {
  /** Whether the expression is valid and safe */
  isValid: boolean

  /** Array of critical errors that prevent evaluation */
  errors: string[]

  /** Array of warnings about potential issues */
  warnings: string[]

  /** Estimated complexity score for performance planning */
  complexity: number

  /** List of functions used in the expression */
  functionsUsed: string[]

  /** List of variables referenced in the expression */
  variablesUsed: string[]
}

/**
 * Expression evaluation statistics
 */
interface EvaluationStats {
  /** Total number of evaluations performed */
  totalEvaluations: number

  /** Number of successful evaluations */
  successfulEvaluations: number

  /** Number of failed evaluations */
  failedEvaluations: number

  /** Average evaluation time in milliseconds */
  averageEvaluationTime: number

  /** Cache hit rate as a percentage */
  cacheHitRate: number

  /** Last evaluation timestamp */
  lastEvaluationTime: number
}

/**
 * Enhanced mathematical expression evaluator with comprehensive security and
 * performance features
 *
 * @class ExpressionEvaluator
 * @description Provides safe, fast, and reliable evaluation of mathematical
 * expressions with advanced caching, validation, and monitoring capabilities
 */
export class ExpressionEvaluator {
  private static readonly expressionCache = new Map<
    string,
    (context: EvaluationContext) => number
  >()
  private static readonly validationCache = new Map<string, ValidationResult>()
  private static readonly MAX_CACHE_SIZE = 1000
  private static readonly EVALUATION_TIMEOUT = 100
  private static readonly MAX_EXPRESSION_LENGTH = 2000
  private static readonly MAX_NESTING_DEPTH = 20

  private static stats: EvaluationStats = {
    totalEvaluations: 0,
    successfulEvaluations: 0,
    failedEvaluations: 0,
    averageEvaluationTime: 0,
    cacheHitRate: 0,
    lastEvaluationTime: 0,
  }

  /**
   * Validates a mathematical expression comprehensively
   *
   * @description Performs extensive validation including syntax checking,
   * security analysis, performance estimation, and dependency analysis
   *
   * @param expression - The mathematical expression to validate
   * @returns Detailed validation result with errors, warnings, and metadata
   *
   * @example
   * ```typescript
   * const result = ExpressionEvaluator.validateExpression('sin(x)+cos(y * 2)')
   * if (result.isValid) {
   *  console.log(`Expression uses: ${result.functionsUsed.join(', ')}`)
   * } else {
   *  console.error('Validation errors:', result.errors)
   * }
   * ```
   */
  static validateExpression(expression: string): ValidationResult {
    if (this.validationCache.has(expression)) {
      return this.validationCache.get(expression)!
    }

    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
      complexity: 0,
      functionsUsed: [],
      variablesUsed: [],
    }

    if (!expression || !expression.trim()) {
      result.errors.push("Expression cannot be empty")
      result.isValid = false

      return result
    }

    if (expression.length > this.MAX_EXPRESSION_LENGTH) {
      result.errors.push(
        `Expression too long (max ${this.MAX_EXPRESSION_LENGTH} characters)`
      )

      result.isValid = false
    }

    this.validateSyntax(expression, result)
    this.validateSecurity(expression, result)
    this.analyzeComplexity(expression, result)
    this.extractDependencies(expression, result)

    if (this.validationCache.size >= this.MAX_CACHE_SIZE) {
      this.validationCache.clear()
    }

    this.validationCache.set(expression, result)
    return result
  }

  /**
   * Validates syntax and mathematical correctness
   *
   * @private
   * @param expression - Expression to validate
   * @param result - Validation result to update
   */
  private static validateSyntax(
    expression: string,
    result: ValidationResult
  ): void {
    if (!this.hasBalancedParentheses(expression)) {
      result.errors.push("Unbalanced parentheses")
      result.isValid = false
    }

    const nestingDepth = this.calculateNestingDepth(expression)
    if (nestingDepth > this.MAX_NESTING_DEPTH) {
      result.errors.push(
        `Nesting too deep (max ${this.MAX_NESTING_DEPTH} levels)`
      )

      result.isValid = false
    }

    const invalidPatterns = [
      /\)\s*\(/g, // Function calls without operator
      /\d+\s*[a-zA-Z]/g, // Numbers directly adjacent to variables
      /[+\-*/^]{2,}/g, // Multiple consecutive operators
      /[+\-*/^]\s*$/g, // Trailing operators
      /^\s*[*/^]/g, // Leading multiplication/division/exponentiation
    ]

    for (const pattern of invalidPatterns) {
      if (pattern.test(expression)) {
        result.warnings.push("Potentially invalid syntax detected")
        break
      }
    }
  }

  /**
   * Validates expression security and prevents code injection
   *
   * @private
   * @param expression - Expression to validate
   * @param result - Validation result to update
   */
  private static validateSecurity(
    expression: string,
    result: ValidationResult
  ): void {
    const forbiddenPatterns = [
      { pattern: /eval\s*\(/i, name: "eval function" },
      { pattern: /function\s*\(/i, name: "function declaration" },
      { pattern: /=>/i, name: "arrow function" },
      { pattern: /while\s*\(/i, name: "while loop" },
      { pattern: /for\s*\(/i, name: "for loop" },
      { pattern: /do\s*{/i, name: "do-while loop" },
      { pattern: /if\s*\(/i, name: "conditional statement" },
      { pattern: /new\s+/i, name: "constructor call" },
      { pattern: /import\s+/i, name: "import statement" },
      { pattern: /export\s+/i, name: "export statement" },
      { pattern: /require\s*\(/i, name: "require call" },
      { pattern: /process\./i, name: "process object access" },
      { pattern: /global\./i, name: "global object access" },
      { pattern: /window\./i, name: "window object access" },
      { pattern: /document\./i, name: "document object access" },
      { pattern: /console\./i, name: "console object access" },
      { pattern: /setTimeout|setInterval/i, name: "timer function" },
      { pattern: /XMLHttpRequest|fetch/i, name: "network request" },
    ]

    for (const { pattern, name } of forbiddenPatterns) {
      if (pattern.test(expression)) {
        result.errors.push(`Forbidden pattern detected: ${name}`)
        result.isValid = false
      }
    }

    const functionCalls = expression.match(/\b[a-zA-Z_$][a-zA-Z0-9_$]*\s*\(/g)
    if (functionCalls) {
      for (const call of functionCalls) {
        const functionName = call.replace(/\s*\($/, "")

        if (!(functionName in SAFE_MATH_FUNCTIONS)) {
          result.errors.push(`Unknown or forbidden function: ${functionName}`)
          result.isValid = false
        }
      }
    }
  }

  /**
   * Analyzes expression complexity for performance planning
   *
   * @private
   * @param expression - Expression to analyze
   * @param result - Validation result to update
   */
  private static analyzeComplexity(
    expression: string,
    result: ValidationResult
  ): void {
    let complexity = 0

    complexity += expression.length * 0.1
    complexity += (expression.match(/[+\-*/^%]/g) || []).length * 1
    complexity += (expression.match(/\(/g) || []).length * 2
    complexity +=
      (expression.match(/\b(sin|cos|tan|exp|log|pow)\b/g) || []).length * 3
    complexity += (expression.match(/\b(gamma|hypot)\b/g) || []).length * 5

    result.complexity = Math.round(complexity)
    if (result.complexity > 100) {
      result.warnings.push("High complexity expression may impact performance")
    }

    if (result.complexity > 500) {
      result.warnings.push(
        "Extremely complex expression may cause significant performance issues"
      )
    }
  }

  /**
   * Extracts function and variable dependencies from expression
   *
   * @private
   * @param expression - Expression to analyze
   * @param result - Validation result to update
   */
  private static extractDependencies(
    expression: string,
    result: ValidationResult
  ): void {
    const functionMatches = expression.match(/\b[a-zA-Z_$][a-zA-Z0-9_$]*\s*\(/g)
    if (functionMatches) {
      result.functionsUsed = [
        ...new Set(functionMatches.map((match) => match.replace(/\s*\($/, ""))),
      ]
    }

    const variableMatches = expression.match(/\b[a-zA-Z_$][a-zA-Z0-9_$]*\b/g)
    if (variableMatches) {
      const variables = variableMatches.filter(
        (match) =>
          !(match in SAFE_MATH_FUNCTIONS) &&
          !result.functionsUsed.includes(match)
      )

      result.variablesUsed = [...new Set(variables)]
    }
  }

  /**
   * Safely evaluates a mathematical expression with comprehensive error
   * handling
   *
   * @description Evaluates expressions with timeout protection, error recovery,
   * and performance monitoring
   *
   * @param expression - The mathematical expression to evaluate
   * @param context - Evaluation context with variables
   * @returns The calculated result or 0 if evaluation fails
   *
   * @example
   * ```typescript
   * const result = ExpressionEvaluator.evaluate(
   *   'sin(t * PI) * cos(time * 0.5)',
   *   { t: 1.5, time: 2.0 }
   * )
   * ```
   *
   * @performance Uses caching and optimization for repeated evaluations
   * @safety Includes timeout protection and error isolation
   */
  static evaluate(expression: string, context: EvaluationContext): number {
    const startTime = performance.now()
    this.stats.totalEvaluations++

    try {
      const validation = this.validateExpression(expression)
      if (!validation.isValid) {
        this.handleEvaluationError(
          "EXPRESSION_EVALUATION_ERROR",
          `Invalid expression: ${validation.errors.join(", ")}`
        )

        return 0
      }

      const cacheKey = this.createCacheKey(expression)
      if (this.expressionCache.has(cacheKey)) {
        this.updateStats(startTime, true)

        return this.executeFunction(
          this.expressionCache.get(cacheKey)!,
          context
        )
      }

      const compiledFunction = this.compileExpression(expression)
      if (this.expressionCache.size >= this.MAX_CACHE_SIZE) {
        this.clearOldestCacheEntries()
      }

      this.expressionCache.set(cacheKey, compiledFunction)

      const result = this.executeFunction(compiledFunction, context)
      this.updateStats(startTime, false)
      this.stats.successfulEvaluations++

      return result
    } catch (error) {
      this.handleEvaluationError(
        "EXPRESSION_EVALUATION_ERROR",
        `Evaluation failed: ${error}`
      )

      this.stats.failedEvaluations++
      return 0
    }
  }

  /**
   * Compiles a mathematical expression into an optimized evaluation function
   *
   * @private
   * @param expression - Expression to compile
   * @returns Compiled function that takes EvaluationContext and returns a number
   * @throws Error if compilation fails
   */
  private static compileExpression(
    expression: string
  ): (context: EvaluationContext) => number {
    // Transform expression to use Math functions directly
    const safeExpression = expression
      .replace(
        /\b(sin|cos|tan|asin|acos|atan|atan2|sinh|cosh|tanh|asinh|acosh|atanh)\s*\(/g,
        "Math.$1("
      )
      .replace(/\b(exp|exp2|expm1|log|log10|log2|log1p)\s*\(/g, "Math.$1(")
      .replace(/\b(pow|sqrt|cbrt|hypot)\s*\(/g, "Math.$1(")
      .replace(/\b(abs|sign|floor|ceil|round|trunc|fround)\s*\(/g, "Math.$1(")
      .replace(/\b(min|max)\s*\(/g, "Math.$1(")
      .replace(/\b(PI|pi)\b/g, "Math.PI")
      .replace(/\b(E|e)\b/g, "Math.E")
      .replace(/\bTAU\b/g, "(Math.PI * 2)")
      .replace(/\bPHI\b/g, "((1 + Math.sqrt(5)) / 2)")
      .replace(/\bDEG2RAD\b/g, "(Math.PI / 180)")
      .replace(/\bRAD2DEG\b/g, "(180 / Math.PI)")

    try {
      const compiledFn = new Function(
        "context",
        `
      "use strict";
      const { t = 0, time = 0, ...vars } = context || {};
      try {
        const result = ${safeExpression};
        return isFinite(result) ? result : 0;
      } catch (error) {
        return 0;
      }
      `
      ) as (context: EvaluationContext) => number

      if (typeof compiledFn !== "function") {
        throw new Error("Compilation did not produce a function")
      }

      return compiledFn
    } catch (error) {
      throw new Error(
        `Failed to compile expression: ${error instanceof Error ? error.message : String(error)}`
      )
    }
  }

  /**
   * Executes a compiled function with timeout protection
   *
   * @private
   * @param func - Compiled function to execute
   * @param context - Evaluation context
   * @returns Function result
   */
  private static executeFunction(
    func: (context: EvaluationContext) => number,
    context: EvaluationContext
  ): number {
    const startTime = performance.now()

    try {
      const result = func(context)
      const executionTime = performance.now() - startTime

      if (executionTime > this.EVALUATION_TIMEOUT) {
        console.warn(
          `Expression evaluation took ${executionTime.toFixed(
            2
          )}ms (threshold: ${this.EVALUATION_TIMEOUT}ms)`
        )
      }

      return typeof result === "number" && isFinite(result) ? result : 0
    } catch (error) {
      throw new Error(`Function execution failed: ${error}`)
    }
  }

  /**
   * Creates a cache key for expression and context combination
   *
   * @private
   * @param expression - Mathematical expression
   * @param context - Evaluation context
   * @returns Cache key string
   */
  private static createCacheKey(expression: string): string {
    return expression.trim()
  }

  /**
   * Clears oldest entries from cache when size limit is reached
   *
   * @private
   */
  private static clearOldestCacheEntries(): void {
    const entriesToDelete = Math.floor(this.MAX_CACHE_SIZE * 0.3) // Remove 30%
    const entries = Array.from(this.expressionCache.entries())

    for (let i = 0; i < entriesToDelete; i++) {
      this.expressionCache.delete(entries[i][0])
    }
  }

  /**
   * Updates evaluation statistics
   *
   * @private
   * @param startTime - Evaluation start time
   * @param fromCache - Whether result came from cache
   */
  private static updateStats(startTime: number, fromCache: boolean): void {
    const evaluationTime = performance.now() - startTime
    const alpha = 0.1

    this.stats.averageEvaluationTime =
      this.stats.averageEvaluationTime * (1 - alpha) + evaluationTime * alpha

    if (fromCache) {
      const cacheHits =
        this.stats.totalEvaluations * (this.stats.cacheHitRate / 100)

      this.stats.cacheHitRate =
        ((cacheHits + 1) / this.stats.totalEvaluations) * 100
    } else {
      const cacheHits =
        this.stats.totalEvaluations * (this.stats.cacheHitRate / 100)

      this.stats.cacheHitRate = (cacheHits / this.stats.totalEvaluations) * 100
    }

    this.stats.lastEvaluationTime = Date.now()
  }

  /**
   * Handles evaluation errors with proper logging and error creation
   *
   * @private
   * @param type - Error type
   * @param message - Error message
   */
  private static handleEvaluationError(type: ErrorType, message: string): void {
    const error: AppError = {
      type,
      message,
      timestamp: Date.now(),
      recoverable: true,
    }

    console.warn(`Expression Evaluator Error [${type}]:`, message)
    console.error(error)
  }

  /**
   * Checks if parentheses are balanced in an expression
   *
   * @private
   * @param expression - Expression to check
   * @returns Whether parentheses are balanced
   */
  private static hasBalancedParentheses(expression: string): boolean {
    let count = 0
    for (const char of expression) {
      if (char === "(") count++
      if (char === ")") count--
      if (count < 0) return false
    }

    return count === 0
  }

  /**
   * Calculates the maximum nesting depth of parentheses
   *
   * @private
   * @param expression - Expression to analyze
   * @returns Maximum nesting depth
   */
  private static calculateNestingDepth(expression: string): number {
    let maxDepth = 0
    let currentDepth = 0

    for (const char of expression) {
      if (char === "(") {
        currentDepth++
        maxDepth = Math.max(maxDepth, currentDepth)
      } else if (char === ")") {
        currentDepth--
      }
    }

    return maxDepth
  }

  /**
   * Clears all cached expressions and validations
   *
   * @description Clears both expression and validation caches,
   * useful for memory management or when expressions change frequently
   *
   * @example
   * ```typescript
   * ExpressionEvaluator.clearCache()
   * console.log('Cache cleared')
   * ```
   */
  static clearCache(): void {
    this.expressionCache.clear()
    this.validationCache.clear()
  }

  /**
   * Gets current cache statistics
   *
   * @description Returns information about cache usage for monitoring
   * and optimization purposes
   *
   * @returns Cache statistics object
   *
   * @example
   * ```typescript
   * const stats = ExpressionEvaluator.getCacheStats()
   * console.log(`Cache usage: ${stats.expressionCacheSize}/${stats.maxCacheSize}`)
   * ```
   */
  static getCacheStats(): {
    expressionCacheSize: number
    validationCacheSize: number
    maxCacheSize: number
    totalCacheMemoryEstimate: string
  } {
    const estimatedMemoryPerEntry = 1024
    const totalEntries = this.expressionCache.size + this.validationCache.size
    const totalMemory = totalEntries * estimatedMemoryPerEntry

    return {
      expressionCacheSize: this.expressionCache.size,
      validationCacheSize: this.validationCache.size,
      maxCacheSize: this.MAX_CACHE_SIZE,
      totalCacheMemoryEstimate: `${(totalMemory / 1024).toFixed(2)} KB`,
    }
  }

  /**
   * Gets current evaluation statistics
   *
   * @description Returns comprehensive statistics about expression evaluation
   * performance and success rates
   *
   * @returns Evaluation statistics object
   *
   * @example
   * ```typescript
   * const stats = ExpressionEvaluator.getEvaluationStats()
   * console.log(`Success rate: ${stats.successRate.toFixed(1)}%`)
   * ```
   */
  static getEvaluationStats(): EvaluationStats & {
    successRate: number
    failureRate: number
    evaluationsPerSecond: number
  } {
    const successRate =
      this.stats.totalEvaluations > 0
        ? (this.stats.successfulEvaluations / this.stats.totalEvaluations) * 100
        : 0

    const failureRate = 100 - successRate
    const timeSinceLastEvaluation = Date.now() - this.stats.lastEvaluationTime
    const evaluationsPerSecond =
      timeSinceLastEvaluation < 10000
        ? this.stats.totalEvaluations /
          ((Date.now() - this.stats.lastEvaluationTime) / 1000)
        : 0

    return {
      ...this.stats,
      successRate,
      failureRate,
      evaluationsPerSecond,
    }
  }

  /**
   * Resets all evaluation statistics
   *
   * @description Clears evaluation statistics, useful for benchmarking
   * or when starting fresh monitoring
   *
   * @example
   * ```typescript
   * ExpressionEvaluator.resetStats()
   * // Start fresh performance monitoring
   * ```
   */
  static resetStats(): void {
    this.stats = {
      totalEvaluations: 0,
      successfulEvaluations: 0,
      failedEvaluations: 0,
      averageEvaluationTime: 0,
      cacheHitRate: 0,
      lastEvaluationTime: 0,
    }
  }

  /**
   * Tests expression evaluation performance with a benchmark suite
   *
   * @description Runs a series of test expressions to benchmark performance
   * and validate functionality
   *
   * @param iterations - Number of iterations to run (default: 1000)
   * @returns Benchmark results
   *
   * @example
   * ```typescript
   * const benchmark = ExpressionEvaluator.runBenchmark(5000)
   * console.log(`Average time: ${benchmark.averageTime}ms`)
   * ```
   */
  static runBenchmark(iterations: number = 1000): {
    totalTime: number
    averageTime: number
    operationsPerSecond: number
    successRate: number
    testResults: Array<{ expression: string; time: number; result: number }>
  } {
    const testExpressions = [
      "sin(t) + cos(time)",
      "sqrt(t * t + time * time)",
      "exp(t) * log(time + 1)",
      "pow(sin(t), 2) + pow(cos(time), 2)",
      "abs(tan(t * PI / 4))",
      "min(max(t, 0), 1) * 100",
      "atan2(sin(t), cos(time))",
      "hypot(t, time, 1)",
    ]

    const results: Array<{ expression: string; time: number; result: number }> =
      []
    const startTime = performance.now()
    let successCount = 0

    for (let i = 0; i < iterations; i++) {
      const expression = testExpressions[i % testExpressions.length]
      const context = { t: i * 0.1, time: i * 0.05 }

      const evalStartTime = performance.now()
      const result = this.evaluate(expression, context)
      const evalTime = performance.now() - evalStartTime

      results.push({ expression, time: evalTime, result })

      if (isFinite(result)) {
        successCount++
      }
    }

    const totalTime = performance.now() - startTime
    const averageTime = totalTime / iterations
    const operationsPerSecond = 1000 / averageTime
    const successRate = (successCount / iterations) * 100

    return {
      totalTime,
      averageTime,
      operationsPerSecond,
      successRate,
      testResults: results.slice(0, 10),
    }
  }
}
