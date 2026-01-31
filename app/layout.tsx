import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react"
import { SplashScreen } from "@/components/splash-screen"
import { Logo } from "@/components/logo"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PRISM - The Future of Conviction Trading",
  description: "Revolutionary financial platform that makes the future tradable",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} bg-dark-900 text-gray-100`}>
        <SplashScreen />
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
          <Logo />
        </div>
        {children}
        <footer className="w-full py-6 px-4 bg-neutral-950 text-neutral-400 border-t border-neutral-900">
          <div className="container mx-auto text-center">
            <p className="font-light">&copy; 2035 PRISM. All rights reserved.</p>
            <p className="text-sm mt-2 font-light">Conviction isn't a thought. It's a trade.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
