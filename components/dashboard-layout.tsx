import type React from "react"
import Link from "next/link"
import { ArrowLeft, Home, Settings, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DashboardLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
}

export function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-dark-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-dark-800 border-r border-dark-600 flex flex-col">
        <div className="p-6 border-b border-dark-600">
          <Link href="/" className="block">
            <h1 className="text-xl font-bold tracking-wider text-white">PRISM</h1>
          </Link>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <Link href="/dashboard/unified-belief-architecture">
              <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white">
                <Home className="w-4 h-4 mr-2" />
                Belief Architecture
              </Button>
            </Link>
            <Link href="/dashboard/conviction-contracts">
              <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white">
                <Settings className="w-4 h-4 mr-2" />
                Conviction Contracts
              </Button>
            </Link>
            <Link href="/dashboard/cross-domain-intelligence">
              <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white">
                <User className="w-4 h-4 mr-2" />
                Cross-Domain Intel
              </Button>
            </Link>
            <Link href="/dashboard/institutional-security">
              <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white">
                <LogOut className="w-4 h-4 mr-2" />
                Security Center
              </Button>
            </Link>
          </div>
        </nav>

        <div className="p-4 border-t border-dark-600">
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-gray-200">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Site
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-dark-800 border-b border-dark-600 p-6">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <p className="text-gray-400 mt-1">{subtitle}</p>
        </header>

        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
