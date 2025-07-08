/**
 * @fileoverview Refactored Trigonometric Art Generator - Main Component
 * @description Modular, mobile-responsive trigonometric art visualization using CDA principles
 * @author Carlos Salguero
 * @version 2.0.0
 */

"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CanvasRenderer } from "@/lib/canvas-render";
import { getColorScheme } from "@/lib/color-schemes";
import { ExpressionEvaluator } from "@/lib/expression-evaluator";
import {
  getPredefinedFunction,
  PREDEFINED_FUNCTIONS,
} from "@/lib/predefined-functions";
import {
  TrigFunction,
  AnimationState,
  PerformanceMetrics,
  ColorMode,
  Point,
} from "@/types";
import { cn, debounce } from "@/lib/utils";

// Component imports
import { Header } from "./ui/header";
import { ControlPanel } from "./controls";
import { CanvasArea } from "./canvas";

/**
 * Component state interface for better type safety
 */
interface ComponentState {
  selectedFunction: TrigFunction;
  customX: string;
  customY: string;
  isCustomMode: boolean;
  showControls: boolean;
  showEquations: boolean;
  showPerformance: boolean;
  isFullscreen: boolean;
}

/**
 * Main Trigonometric Art Generator Component (Refactored)
 *
 * @description Professional-grade mathematical art generator built with
 * Component Driven.Architecture principles. Fully responsive and optimized for
 * both desktop and mobile.
 *
 * @returns React functional component
 */
export function TrigonometricArtGenerator(): React.JSX.Element {
  const [state, setState] = useState<ComponentState>({
    selectedFunction: PREDEFINED_FUNCTIONS[0],
    customX: "",
    customY: "",
    isCustomMode: false,
    showControls: true,
    showEquations: true,
    showPerformance: false,
    isFullscreen: false,
  });

  const [animationState, setAnimationState] = useState<AnimationState>({
    time: 0,
    isPlaying: true,
    frameId: null,
    lastFrameTime: 0,
    fps: 60,
    frameCount: 0,
  });

  const [performance, setPerformance] = useState<PerformanceMetrics>({
    fps: 60,
    pointCount: 0,
    avgFrameTime: 16.67,
    memoryUsage: 0,
  });

  const [controls, setControls] = useState({
    trails: 0.95,
    lineWidth: 1.5,
    animationSpeed: 1.0,
    complexity: 2000,
    colorMode: "spectrum" as ColorMode,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<CanvasRenderer | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  /**
   * Current function with custom overrides
   */
  const currentFunction = useMemo<TrigFunction>(() => {
    if (!state.isCustomMode) {
      return {
        ...state.selectedFunction,
        complexity: controls.complexity,
        lineWidth: controls.lineWidth,
        animationSpeed: controls.animationSpeed,
        colorMode: controls.colorMode,
      };
    }

    return {
      ...state.selectedFunction,
      xEquation: state.customX || state.selectedFunction.xEquation,
      yEquation: state.customY || state.selectedFunction.yEquation,
      complexity: controls.complexity,
      lineWidth: controls.lineWidth,
      animationSpeed: controls.animationSpeed,
      colorMode: controls.colorMode,
    };
  }, [state, controls]);

  /**
   * Current color scheme
   */
  const colorScheme = useMemo(() => {
    return getColorScheme(controls.colorMode);
  }, [controls.colorMode]);

  /**
   * Optimized point calculation with caching and performance checks
   */
  const calculatePoints = useCallback(
    (func: TrigFunction, time: number): Point[] => {
      const points: Point[] = [];
      let steps = func.complexity;
      if (performance.fps < 30) {
        steps = Math.max(500, Math.floor(steps * 0.7));
      } else if (performance.fps < 45) {
        steps = Math.max(1000, Math.floor(steps * 0.85));
      }

      steps = Math.min(steps, 8000);

      const stepSize = (Math.PI * 8) / steps;
      const timeOffset = time * 6;

      for (let i = 0; i <= steps; i++) {
        const t = i * stepSize;
        const progress = i / steps;

        try {
          const x = ExpressionEvaluator.evaluate(func.xEquation, { t, time });
          const y = ExpressionEvaluator.evaluate(func.yEquation, { t, time });

          if (!isFinite(x) || !isFinite(y)) continue;

          points.push({
            x,
            y,
            hue: progress,
            alpha: 0.7 + Math.sin(timeOffset + progress * Math.PI * 6) * 0.3,
            index: i,
            distance: Math.sqrt(x * x + y * y),
          });
        } catch (error) {
          continue;
        }
      }

      return points;
    },
    [performance.fps],
  );

  /**
   * Optimized animation loop with adaptive performance
   */
  const animate = useCallback(
    (currentTime: number) => {
      if (!rendererRef.current || !animationState.isPlaying) return;

      const deltaTime = currentTime - animationState.lastFrameTime;
      const targetFrameTime = performance.fps < 30 ? 33.33 : 16.67;
      if (deltaTime < targetFrameTime) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const frameTime = deltaTime;
      const fps = 1000 / frameTime;

      if (animationState.frameCount % 2 === 0) {
        rendererRef.current.applyTrailEffect(controls.trails);
      }

      const points = calculatePoints(currentFunction, animationState.time);
      rendererRef.current.renderPoints(
        points,
        currentFunction,
        colorScheme,
        animationState.time,
      );

      const newTime =
        animationState.time +
        (deltaTime / 1000) * currentFunction.animationSpeed;
      const newFrameCount = animationState.frameCount + 1;

      setAnimationState((prev) => ({
        ...prev,
        time: newTime,
        lastFrameTime: currentTime,
        frameCount: newFrameCount,
      }));

      if (newFrameCount % 10 === 0) {
        setPerformance((prev) => ({
          ...prev,
          fps: Math.round(fps),
          pointCount: points.length,
          avgFrameTime: Math.round(frameTime),
          memoryUsage:
            rendererRef.current?.getPerformanceMetrics().memoryUsage || 0,
        }));
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    },
    [
      animationState.isPlaying,
      animationState.lastFrameTime,
      animationState.time,
      animationState.frameCount,
      controls.trails,
      currentFunction,
      colorScheme,
      calculatePoints,
      performance.fps,
    ],
  );

  /**
   * Adjust initial settings for mobile devices
   */
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      setControls((prev) => ({
        ...prev,
        complexity: 1500,
        trails: 0.92,
        animationSpeed: 0.8,
      }));
    }
  }, []);

  /**
   * Initialize canvas and renderer with performance optimizations
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.warn("Canvas ref not found");
      return;
    }

    
    try {
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        );
      const hasHighDPI = window.devicePixelRatio > 1.5;

     
      rendererRef.current = new CanvasRenderer(canvas, {
        quality: isMobile ? "medium" : "high",
        enableEffects: !isMobile,
        antialiasing: hasHighDPI,
        adaptiveQuality: true,
      });

    } catch (error) {
      console.error("Failed to initialize renderer:", error);
      return;
    }

    const handleResize = debounce(() => {
      if (rendererRef.current && canvas) {
        rendererRef.current.updateConfig(canvas);
      }
    }, 250);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setAnimationState((prev) => ({ ...prev, isPlaying: false }));
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    setTimeout(() => handleResize(), 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      rendererRef.current?.dispose();
    };
  }, []);

  /**
   * Performance monitoring and auto-adjustment
   */
  useEffect(() => {
    let performanceCheckInterval: NodeJS.Timeout;

    if (animationState.isPlaying) {
      performanceCheckInterval = setInterval(() => {
        if (performance.fps < 25 && controls.complexity > 1000) {
          setControls((prev) => ({
            ...prev,
            complexity: Math.max(1000, Math.floor(prev.complexity * 0.8)),
          }));
        } else if (performance.fps > 55 && controls.complexity < 4000) {
          setControls((prev) => ({
            ...prev,
            complexity: Math.min(4000, Math.floor(prev.complexity * 1.1)),
          }));
        }
      }, 3000);
    }

    return () => {
      if (performanceCheckInterval) {
        clearInterval(performanceCheckInterval);
      }
    };
  }, [animationState.isPlaying, performance.fps, controls.complexity]);

  /**
   * Start/stop animation loop with performance optimization
   */
  useEffect(() => {
    if (animationState.isPlaying && rendererRef.current) {
      animationFrameRef.current = requestAnimationFrame(animate);
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animationState.isPlaying, animate]);

  /**
   * Animation control handlers
   */
  const togglePlayPause = useCallback(() => {
    setAnimationState((prev) => ({
      ...prev,
      isPlaying: !prev.isPlaying,
    }));
  }, []);

  const resetAnimation = useCallback(() => {
    setAnimationState((prev) => ({
      ...prev,
      time: 0,
    }));
  }, []);

  /**
   * Function selection handler
   */
  const handleFunctionSelect = useCallback(
    (funcId: string) => {
      const func = getPredefinedFunction(funcId);
      setState((prev) => ({
        ...prev,
        selectedFunction: func,
      }));

      setControls((prev) => ({
        ...prev,
        colorMode: func.colorMode,
        complexity: func.complexity,
        lineWidth: func.lineWidth,
      }));

      resetAnimation();
    },
    [resetAnimation],
  );

  /**
   * Custom equations handlers
   */
  const toggleCustomMode = useCallback(() => {
    setState((prev) => {
      if (!prev.isCustomMode) {
        return {
          ...prev,
          isCustomMode: true,
          customX: prev.selectedFunction.xEquation,
          customY: prev.selectedFunction.yEquation,
        };
      }
      return {
        ...prev,
        isCustomMode: false,
      };
    });
  }, []);

  const handleCustomXChange = useCallback((value: string) => {
    setState((prev) => ({ ...prev, customX: value }));
  }, []);

  const handleCustomYChange = useCallback((value: string) => {
    setState((prev) => ({ ...prev, customY: value }));
  }, []);

  /**
   * Control handlers
   */
  const handleTrailsChange = useCallback((value: number) => {
    setControls((prev) => ({ ...prev, trails: value }));
  }, []);

  const handleLineWidthChange = useCallback((value: number) => {
    setControls((prev) => ({ ...prev, lineWidth: value }));
  }, []);

  const handleAnimationSpeedChange = useCallback((value: number) => {
    setControls((prev) => ({ ...prev, animationSpeed: value }));
  }, []);

  const handleComplexityChange = useCallback((value: number) => {
    setControls((prev) => ({ ...prev, complexity: value }));
  }, []);

  const handleColorModeChange = useCallback((value: ColorMode) => {
    setControls((prev) => ({ ...prev, colorMode: value }));
  }, []);

  /**
   * UI handlers
   */
  const exportImage = useCallback(async () => {
    if (!rendererRef.current) return;

    try {
      const blob = await rendererRef.current.exportImage("png");
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `trigonometric-art-${Date.now()}.png`;
      link.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isFullscreen: !prev.isFullscreen,
    }));
  }, []);

  const toggleControls = useCallback(() => {
    setState((prev) => ({
      ...prev,
      showControls: !prev.showControls,
    }));
  }, []);

  return (
    <div
      className={cn(
        "min-h-screen transition-all duration-300",
        state.isFullscreen ? "fixed inset-0 z-50 bg-black" : "relative",
      )}
    >
      {/* Header */}
      <Header isFullscreen={state.isFullscreen} />

      <div
        className={cn(
          "flex h-[calc(100vh-80px)] sm:h-[calc(100vh-120px)]",
          state.isFullscreen ? "h-screen" : "",
          "flex-col lg:flex-row",
        )}
      >
        {/* Control Panel */}
        <ControlPanel
          show={state.showControls}
          isFullscreen={state.isFullscreen}
          selectedFunction={state.selectedFunction}
          customEquations={{
            customX: state.customX,
            customY: state.customY,
            isCustomMode: state.isCustomMode,
          }}
          controls={controls}
          onFunctionSelect={handleFunctionSelect}
          onToggleCustomMode={toggleCustomMode}
          onCustomXChange={handleCustomXChange}
          onCustomYChange={handleCustomYChange}
          onTrailsChange={handleTrailsChange}
          onLineWidthChange={handleLineWidthChange}
          onAnimationSpeedChange={handleAnimationSpeedChange}
          onComplexityChange={handleComplexityChange}
          onColorModeChange={handleColorModeChange}
        />

        {/* Canvas Area */}
        <CanvasArea
          ref={canvasRef}
          containerRef={containerRef}
          currentFunction={currentFunction}
          animationState={animationState}
          performance={performance}
          showEquations={state.showEquations}
          isFullscreen={state.isFullscreen}
          showControls={state.showControls}
          onTogglePlayPause={togglePlayPause}
          onResetAnimation={resetAnimation}
          onExportImage={exportImage}
          onToggleFullscreen={toggleFullscreen}
          onToggleControls={toggleControls}
        />
      </div>
    </div>
  );
}
