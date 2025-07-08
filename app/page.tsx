/**
 * @file page.tsx
 * @fileoverview Main application page for the Trigonometric Art Generator
 * @description Professional-grade trigonometric art visualization application
 * built with Next.js 15, TypeScript, and advanced mathematical rendering
 * @author Carlos Salguero
 * @version 1.0.0
 */

"use client"

import { TrigonometricArtGenerator } from "@/components/trigonometric-art-generator"

/**
 * Main application component
 *
 * @description Serves as the entry point for the trigonometric art generator
 * application providing a clean, professional interface for mathematical art
 * creation.
 *
 * @returns The main application component
 */
export default function HomePage(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <TrigonometricArtGenerator />
    </main>
  )
}
