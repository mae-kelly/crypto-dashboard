"use client"

import { FeatureCard } from "@/components/feature-card"
import { AutoSliderBanner } from "@/components/auto-slider-banner"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowUpRight, Activity, Shield, Brain } from "lucide-react"

export default function Home() {
  const [liveStats, setLiveStats] = useState({
    aum: 18.2,
    investors: 10247,
    domains: 253,
    uptime: 99.99,
    trades: 1247,
    volume: 5.2,
  })

  const [realtimeActivity, setRealtimeActivity] = useState([
    { id: 1, action: "NEW BELIEF CREATED", user: "USER_7834", value: "$2.3M", time: "14:23:45" },
    { id: 2, action: "CONVICTION EXECUTED", user: "USER_2901", value: "$890K", time: "14:21:12" },
    { id: 3, action: "PATTERN DETECTED", user: "LENS_AI", value: "0.94 CONF", time: "14:18:33" },
  ])

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats((prev) => ({
        ...prev,
        aum: prev.aum + (Math.random() - 0.5) * 0.1,
        investors: prev.investors + (Math.random() > 0.8 ? 1 : 0),
        trades: prev.trades + (Math.random() > 0.7 ? 1 : 0),
        volume: prev.volume + (Math.random() - 0.5) * 0.1,
      }))

      // Add new activity occasionally
      if (Math.random() > 0.95) {
        const actions = ["BELIEF VALIDATED", "MARKET CORRELATION", "ALPHA SIGNAL", "RISK ADJUSTED", "POSITION OPENED"]
        const newActivity = {
          id: Date.now(),
          action: actions[Math.floor(Math.random() * actions.length)],
          user: `USER_${Math.floor(Math.random() * 9999)}`,
          value: `$${(Math.random() * 5).toFixed(1)}M`,
          time: new Date().toLocaleTimeString(),
        }
        setRealtimeActivity((prev) => [newActivity, ...prev.slice(0, 4)])
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      id: 1,
      title: "Unified Belief Architecture",
      description: "Connect your convictions across all markets in a single ecosystem",
      icon: "Brain",
      slug: "unified-belief-architecture",
    },
    {
      id: 2,
      title: "Conviction Contracts",
      description: "Monetize any belief about the future through tradable instruments",
      icon: "TrendingUp",
      slug: "conviction-contracts",
    },
    {
      id: 3,
      title: "Cross-Domain Intelligence",
      description: "AI-powered insights that identify patterns across seemingly unrelated markets",
      icon: "Globe",
      slug: "cross-domain-intelligence",
    },
    {
      id: 4,
      title: "Institutional Security",
      description: "Bank-grade security with quantum-resistant encryption protocols",
      icon: "Shield",
      slug: "institutional-security",
    },
  ]

  return (
    <main className="flex min-h-screen flex-col bg-black">
      {/* Hero Section */}
      <AutoSliderBanner />

      {/* Live Stats Bar */}
      <section className="w-full py-8 bg-neutral-950 border-b border-neutral-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-extralight text-white mb-1">${liveStats.aum.toFixed(1)}B+</div>
              <div className="text-neutral-400 font-light text-sm font-mono">ASSETS UNDER MGMT</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-extralight text-white mb-1">
                {liveStats.investors.toLocaleString()}+
              </div>
              <div className="text-neutral-400 font-light text-sm font-mono">QUALIFIED INVESTORS</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-extralight text-white mb-1">{liveStats.domains}+</div>
              <div className="text-neutral-400 font-light text-sm font-mono">MARKET DOMAINS</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-extralight text-white mb-1">{liveStats.uptime}%</div>
              <div className="text-neutral-400 font-light text-sm font-mono">SYSTEM UPTIME</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-extralight text-white mb-1">{liveStats.trades}</div>
              <div className="text-neutral-400 font-light text-sm font-mono">TRADES TODAY</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-extralight text-white mb-1">
                ${liveStats.volume.toFixed(1)}M
              </div>
              <div className="text-neutral-400 font-light text-sm font-mono">VOLUME 24H</div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="w-full py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl md:text-4xl font-extralight text-white tracking-wide">
              Revolutionary Platform Architecture
            </h2>
            <p className="text-neutral-400 max-w-3xl mx-auto font-light text-lg">
              PRISM transforms how the world's most sophisticated investors express and monetize their convictions about
              the future
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature) => (
              <FeatureCard
                key={feature.id}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                slug={feature.slug}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Live Activity Feed */}
      <section id="live-feed-section" className="w-full py-16 bg-neutral-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="mb-4 text-3xl font-extralight text-white tracking-wide">Live Platform Activity</h2>
              <p className="text-neutral-400 font-light">Real-time conviction trading and AI pattern recognition</p>
            </div>

            <Card className="bg-black border-neutral-800">
              <CardContent className="p-8">
                <div className="bg-neutral-950 p-6 rounded border border-neutral-900 font-mono text-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-white font-light">PRISM LIVE FEED — OPERATIONAL</div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="text-xs text-neutral-400 font-mono">LIVE</span>
                    </div>
                  </div>
                  <div className="border-b border-neutral-800"></div>

                  <div className="space-y-3">
                    {realtimeActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between text-neutral-300">
                        <div className="flex items-center space-x-4">
                          <span className="text-xs text-neutral-500 font-mono">{activity.time}</span>
                          <span className="text-white">{activity.action}</span>
                          <Badge
                            variant="outline"
                            className="border-neutral-700 text-neutral-400 bg-transparent text-xs"
                          >
                            {activity.user}
                          </Badge>
                        </div>
                        <span className="text-white font-mono">{activity.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-neutral-800 pt-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">
                      <div>
                        <div className="text-neutral-400 mb-1">ACTIVE BELIEFS</div>
                        <div className="text-white">247</div>
                      </div>
                      <div>
                        <div className="text-neutral-400 mb-1">CORRELATIONS</div>
                        <div className="text-white">15.4K</div>
                      </div>
                      <div>
                        <div className="text-neutral-400 mb-1">AI ACCURACY</div>
                        <div className="text-white">94.7%</div>
                      </div>
                      <div>
                        <div className="text-neutral-400 mb-1">RESPONSE TIME</div>
                        <div className="text-white">12ms</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* System Performance */}
      <section className="w-full py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="mb-4 text-3xl font-extralight text-white tracking-wide">Platform Performance</h2>
              <p className="text-neutral-400 font-light">Real-time system metrics and operational status</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-neutral-950 border-neutral-800">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <Activity className="w-8 h-8 text-neutral-400" />
                    <Badge className="bg-white text-black font-mono text-xs">OPERATIONAL</Badge>
                  </div>
                  <h3 className="text-xl font-light text-white mb-4">System Health</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-neutral-400 font-mono">CPU USAGE</span>
                        <span className="text-white font-mono">67%</span>
                      </div>
                      <Progress value={67} className="h-1 bg-neutral-900" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-neutral-400 font-mono">MEMORY</span>
                        <span className="text-white font-mono">78%</span>
                      </div>
                      <Progress value={78} className="h-1 bg-neutral-900" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-neutral-400 font-mono">NETWORK I/O</span>
                        <span className="text-white font-mono">NORMAL</span>
                      </div>
                      <Progress value={45} className="h-1 bg-neutral-900" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-neutral-950 border-neutral-800">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <Brain className="w-8 h-8 text-neutral-400" />
                    <Badge className="bg-white text-black font-mono text-xs">LEARNING</Badge>
                  </div>
                  <h3 className="text-xl font-light text-white mb-4">AI Performance</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-neutral-400 font-mono">PREDICTION ACCURACY</span>
                        <span className="text-white font-mono">94.7%</span>
                      </div>
                      <Progress value={94.7} className="h-1 bg-neutral-900" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-neutral-400 font-mono">PATTERN RECOGNITION</span>
                        <span className="text-white font-mono">91.2%</span>
                      </div>
                      <Progress value={91.2} className="h-1 bg-neutral-900" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-neutral-400 font-mono">LEARNING RATE</span>
                        <span className="text-white font-mono">ADAPTIVE</span>
                      </div>
                      <Progress value={87} className="h-1 bg-neutral-900" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-neutral-950 border-neutral-800">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <Shield className="w-8 h-8 text-neutral-400" />
                    <Badge className="bg-white text-black font-mono text-xs">SECURE</Badge>
                  </div>
                  <h3 className="text-xl font-light text-white mb-4">Security Status</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-neutral-400 font-mono">THREATS BLOCKED</span>
                        <span className="text-white font-mono">1,247</span>
                      </div>
                      <Progress value={100} className="h-1 bg-neutral-900" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-neutral-400 font-mono">ENCRYPTION</span>
                        <span className="text-white font-mono">AES-256</span>
                      </div>
                      <Progress value={100} className="h-1 bg-neutral-900" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-neutral-400 font-mono">COMPLIANCE</span>
                        <span className="text-white font-mono">SOC 2</span>
                      </div>
                      <Progress value={100} className="h-1 bg-neutral-900" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="w-full py-20 bg-neutral-950 border-t border-neutral-900">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-2xl md:text-3xl font-extralight text-white mb-8 italic tracking-wide leading-relaxed">
              "Most platforms are built to solve a problem. PRISM was built to solve the meta-problem: how belief
              becomes value."
            </blockquote>
            <div className="mt-8">
              <Button 
                onClick={() => window.location.href = '/dashboard/unified-belief-architecture'}
                className="bg-white text-black hover:bg-neutral-200 font-light px-8 py-3"
              >
                <ArrowUpRight className="w-4 h-4 mr-2" />
                ACCESS PLATFORM
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
