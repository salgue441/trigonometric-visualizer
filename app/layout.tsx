/**
 * @fileoverview Root layout component for the Trigonometric Art Generator
 * @description Provides global styles, fonts, and metadata for the application
 * @version 1.0.0
 * @author Trigonometric Art Studio
 * @since 2025-01-07
 */

import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

// Font configurations with optimal loading
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
})

/**
 * Application metadata configuration
 */
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title:
    "Trigonometric Art Generator | Professional Mathematical Visualization",
  description:
    "Create stunning mathematical art with advanced trigonometric functions. Professional-grade visualization tool for artists, mathematicians, and educators.",
  keywords: [
    "trigonometric art",
    "mathematical visualization",
    "parametric equations",
    "generative art",
    "mathematical art generator",
    "Next.js",
    "TypeScript",
    "canvas rendering",
  ],
  authors: [{ name: "Trigonometric Art Studio" }],
  creator: "Trigonometric Art Studio",
  publisher: "Trigonometric Art Studio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Trigonometric Art Generator",
    description:
      "Create stunning mathematical art with advanced trigonometric functions",
    siteName: "Trigonometric Art Generator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Trigonometric Art Generator Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trigonometric Art Generator",
    description:
      "Create stunning mathematical art with advanced trigonometric functions",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
}

/**
 * Viewport configuration for responsive design
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
}

/**
 * Root layout component interface
 */
interface RootLayoutProps {
  /** Child components to render */
  children: React.ReactNode
}

/**
 * Root layout component
 *
 * @description Provides the foundational HTML structure, fonts, and global styles
 * for the entire application with optimized performance and accessibility
 *
 * @param props - Layout properties
 * @returns Root HTML structure with global providers
 */
export default function RootLayout({
  children,
}: RootLayoutProps): React.JSX.Element {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
        {/* Main application content */}
        <div id="main-content" className="relative">
          {children}
        </div>

        {/* Service worker registration for offline support */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then((registration) => {
                      console.log('SW registered: ', registration);
                    })
                    .catch((registrationError) => {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
