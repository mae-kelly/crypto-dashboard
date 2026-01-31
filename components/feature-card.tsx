"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Brain, Globe, Shield, ArrowUpRight, BarChart3 } from "lucide-react"
import Link from "next/link"

interface FeatureCardProps {
  title: string
  description: string
  icon: string
  slug: string
}

const iconMap = {
  Brain,
  TrendingUp,
  Globe,
  Shield,
}

export function FeatureCard({ title, description, icon, slug }: FeatureCardProps) {
  const IconComponent = iconMap[icon as keyof typeof iconMap]

  return (
    <Card className="bg-neutral-950 border-neutral-800 hover:border-neutral-600 transition-all duration-300 group">
      <CardContent className="p-8">
        <div className="flex items-center justify-between mb-6">
          <IconComponent className="w-10 h-10 text-neutral-400 group-hover:text-white transition-colors" />
          <Badge variant="outline" className="border-neutral-700 text-neutral-400 bg-transparent font-mono text-xs">
            ACTIVE
          </Badge>
        </div>

        <h3 className="text-xl font-light text-white mb-4 group-hover:text-white transition-colors">{title}</h3>

        <p className="text-neutral-400 mb-6 font-light leading-relaxed">{description}</p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href={`/features/${slug}`} className="flex-1">
            <Button
              variant="outline"
              className="w-full border-neutral-700 text-neutral-300 hover:bg-neutral-900 hover:text-white font-light"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Learn More
            </Button>
          </Link>
          <Link href={`/dashboard/${slug}`} className="flex-1">
            <Button className="w-full bg-white text-black hover:bg-neutral-200 font-light">
              <ArrowUpRight className="w-4 h-4 mr-2" />
              Open Dashboard
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
