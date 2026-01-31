"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Activity } from "lucide-react"

const images = [
  "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=1920&h=1080&fit=crop",
]

export function AutoSliderBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleDiscoverClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    })
  }

  const handleViewFeedClick = () => {
    const feedSection = document.getElementById("live-feed-section")
    if (feedSection) {
      feedSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleLearnClick = () => {
    // Placeholder for handleLearnClick logic
    console.log("Learn more about PRISM");
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src || "/placeholder.svg"}
            alt={`PRISM Platform ${index + 1}`}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center px-4">
        {/* Status Indicator */}
        <div className="absolute top-8 right-8 flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-xs text-neutral-400 font-mono">LIVE</span>
          </div>
          <Badge variant="outline" className="border-neutral-700 text-neutral-300 bg-black/50 backdrop-blur">
            OPERATIONAL
          </Badge>
        </div>

        {/* Main Content */}
        <div className="text-center max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-white mb-6">
            The Future is Tradable
          </h1>

          <p className="text-xl sm:text-2xl text-neutral-300 mb-4 font-light">
            Revolutionary Conviction Trading Platform
          </p>

          <p className="text-lg text-neutral-400 mb-8 max-w-2xl mx-auto font-light italic">
            "Conviction isn't a thought. It's a trade."
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={handleDiscoverClick}
              size="lg"
              className="bg-white text-black hover:bg-neutral-200 font-light tracking-wide px-8 py-4"
            >
              <ArrowUpRight className="w-5 h-5 mr-2" />
              DISCOVER PRISM
            </Button>

            <Button
              onClick={handleViewFeedClick}
              variant="outline"
              size="lg"
              className="border-neutral-600 text-neutral-300 hover:bg-neutral-900 hover:text-white font-light px-8 py-4 bg-transparent"
            >
              <Activity className="w-5 h-5 mr-2" />
              VIEW LIVE FEED
            </Button>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-8 text-center">
            <div>
              <div className="text-2xl font-extralight text-white">$18.2B+</div>
              <div className="text-xs text-neutral-400 font-mono">AUM</div>
            </div>
            <div className="w-px h-8 bg-neutral-700"></div>
            <div>
              <div className="text-2xl font-extralight text-white">10K+</div>
              <div className="text-xs text-neutral-400 font-mono">INVESTORS</div>
            </div>
            <div className="w-px h-8 bg-neutral-700"></div>
            <div>
              <div className="text-2xl font-extralight text-white">99.99%</div>
              <div className="text-xs text-neutral-400 font-mono">UPTIME</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
