import type React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FeatureLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
}

export function FeatureLayout({ children, title, subtitle }: FeatureLayoutProps) {
  return (
    <div className="min-h-screen bg-dark-900 pt-24">
      <div className="container mx-auto px-4">
        <Link href="/">
          <Button variant="ghost" className="mb-8 text-gray-400 hover:text-gray-100">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to PRISM
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">{title}</h1>
            <p className="text-xl text-gray-400">{subtitle}</p>
          </header>

          {children}
        </div>
      </div>
    </div>
  )
}
