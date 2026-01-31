"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Menu, X } from "lucide-react"
import { useState } from "react"

interface SleekDashboardLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
}

export function SleekDashboardLayout({ children, title, subtitle }: SleekDashboardLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Navigation */}
      <nav className="border-b border-neutral-800 bg-black/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
                <div className="w-4 h-4 bg-black rounded-xs"></div>
              </div>
              <div className="hidden sm:block">
                <div className="text-lg font-light tracking-wider">PRISM</div>
              </div>
            </Link>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-neutral-400 hover:text-white"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <Link href="/dashboard/unified-belief-architecture">
                <Button
                  variant="ghost"
                  className="text-neutral-400 hover:text-white hover:bg-neutral-900 font-light text-sm"
                >
                  Belief Architecture
                </Button>
              </Link>
              <Link href="/dashboard/conviction-contracts">
                <Button
                  variant="ghost"
                  className="text-neutral-400 hover:text-white hover:bg-neutral-900 font-light text-sm"
                >
                  Conviction Contracts
                </Button>
              </Link>
              <Link href="/dashboard/cross-domain-intelligence">
                <Button
                  variant="ghost"
                  className="text-neutral-400 hover:text-white hover:bg-neutral-900 font-light text-sm"
                >
                  Cross-Domain Intel
                </Button>
              </Link>
              <Link href="/dashboard/institutional-security">
                <Button
                  variant="ghost"
                  className="text-neutral-400 hover:text-white hover:bg-neutral-900 font-light text-sm"
                >
                  Security Center
                </Button>
              </Link>
            </div>

            {/* Status Indicator */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-xs text-neutral-400 font-mono">LIVE</span>
              </div>
              <Badge variant="outline" className="border-neutral-700 text-neutral-300 bg-transparent">
                OPERATIONAL
              </Badge>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-neutral-800 py-4">
              <div className="space-y-2">
                <Link href="/dashboard/unified-belief-architecture" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-neutral-400 hover:text-white hover:bg-neutral-900 font-light"
                  >
                    Belief Architecture
                  </Button>
                </Link>
                <Link href="/dashboard/conviction-contracts" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-neutral-400 hover:text-white hover:bg-neutral-900 font-light"
                  >
                    Conviction Contracts
                  </Button>
                </Link>
                <Link href="/dashboard/cross-domain-intelligence" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-neutral-400 hover:text-white hover:bg-neutral-900 font-light"
                  >
                    Cross-Domain Intel
                  </Button>
                </Link>
                <Link href="/dashboard/institutional-security" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-neutral-400 hover:text-white hover:bg-neutral-900 font-light"
                  >
                    Security Center
                  </Button>
                </Link>
              </div>
              <div className="mt-4 pt-4 border-t border-neutral-800 flex items-center justify-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="text-xs text-neutral-400 font-mono">LIVE</span>
                </div>
                <Badge variant="outline" className="border-neutral-700 text-neutral-300 bg-transparent">
                  OPERATIONAL
                </Badge>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Header */}
      <header className="border-b border-neutral-900 bg-gradient-to-b from-neutral-950 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl sm:text-3xl font-extralight tracking-wide text-white">{title}</h1>
              <p className="text-neutral-400 mt-2 font-light text-sm sm:text-base">{subtitle}</p>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-xs text-neutral-500 font-mono">LAST UPDATED</div>
              <div className="text-sm text-neutral-300 font-mono">{new Date().toLocaleTimeString()}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">{children}</main>
    </div>
  )
}
