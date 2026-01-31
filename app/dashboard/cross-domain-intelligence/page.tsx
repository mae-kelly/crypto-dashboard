"use client"

import { SleekDashboardLayout } from "@/components/sleek-dashboard-layout"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { AlertTriangle, TrendingUp, Brain, Zap, Eye, Target, Flame, Trophy, ArrowUpRight, Activity } from "lucide-react"

export default function CrossDomainIntelligenceDashboard() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "correlation",
      title: "High-Probability Pattern",
      description: "European energy crisis → US tech volatility",
      strength: 0.84,
      confidence: 91,
      timelag: "18 hours",
      status: "active",
      timestamp: "2024-01-15 14:23",
      profitPotential: 2340,
      riskLevel: 6.2,
    },
    {
      id: 2,
      type: "strengthening",
      title: "Pattern Strengthening",
      description: "Climate activism → ESG inflows → Energy shorts",
      strength: 0.92,
      confidence: 96,
      timelag: "3-5 days",
      status: "monitoring",
      timestamp: "2024-01-15 12:45",
      profitPotential: 1890,
      riskLevel: 4.8,
    },
    {
      id: 3,
      type: "high-conviction",
      title: "Alpha Signal Detected",
      description: "Fed sentiment → Crypto fear → Gold futures",
      strength: 0.95,
      confidence: 98,
      timelag: "6-12 hours",
      status: "critical",
      timestamp: "2024-01-15 11:30",
      profitPotential: 4560,
      riskLevel: 8.9,
    },
  ])

  const [patterns, setPatterns] = useState([
    {
      domain1: "Sports",
      domain2: "Crypto",
      correlation: 0.73,
      description: "NFL upsets → Crypto volatility increase",
      confidence: 94,
      discovered: "2024-01-10",
      tradingOpportunity: 1250,
      momentum: 0.67,
    },
    {
      domain1: "Weather",
      domain2: "Energy",
      correlation: 0.89,
      description: "Texas weather events → Renewable energy stocks",
      confidence: 97,
      discovered: "2024-01-08",
      tradingOpportunity: 2890,
      momentum: 0.84,
    },
    {
      domain1: "Politics",
      domain2: "Tech",
      correlation: 0.81,
      description: "Congressional hearings → Social media stocks",
      confidence: 92,
      discovered: "2024-01-05",
      tradingOpportunity: 1670,
      momentum: 0.52,
    },
  ])

  const [lensMetrics, setLensMetrics] = useState({
    activePatterns: 247,
    correlationsTracked: 15420,
    predictionAccuracy: 87.3,
    dataPointsProcessed: 2.4e6,
    todaysProfits: 3240,
    alertsTriggered: 23,
    successRate: 89.4,
  })

  const [realtimeSignals, setRealtimeSignals] = useState([
    { id: 1, signal: "CRYPTO-WEATHER CORRELATION SPIKE", strength: 0.91, time: "14:23:45", profit: 340 },
    { id: 2, signal: "POLITICAL-TECH SENTIMENT SHIFT", strength: 0.87, time: "14:21:12", profit: 180 },
    { id: 3, signal: "SPORTS-MARKET VOLATILITY PATTERN", strength: 0.79, time: "14:18:33", profit: 220 },
  ])

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLensMetrics((prev) => ({
        ...prev,
        predictionAccuracy: Math.max(80, Math.min(99, prev.predictionAccuracy + (Math.random() - 0.5) * 2)),
        todaysProfits: prev.todaysProfits + (Math.random() - 0.3) * 50,
        alertsTriggered: prev.alertsTriggered + (Math.random() > 0.95 ? 1 : 0),
      }))

      setAlerts((prev) =>
        prev.map((alert) => ({
          ...alert,
          strength: Math.max(0.5, Math.min(1, alert.strength + (Math.random() - 0.5) * 0.05)),
          confidence: Math.max(80, Math.min(99, alert.confidence + (Math.random() - 0.5) * 2)),
          profitPotential: alert.profitPotential + (Math.random() - 0.5) * 100,
        })),
      )

      // Add new real-time signal occasionally
      if (Math.random() > 0.98) {
        const newSignal = {
          id: Date.now(),
          signal: "NEW PATTERN DETECTED",
          strength: 0.7 + Math.random() * 0.3,
          time: new Date().toLocaleTimeString(),
          profit: Math.floor(Math.random() * 500) + 100,
        }
        setRealtimeSignals((prev) => [newSignal, ...prev.slice(0, 4)])
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "correlation":
        return <Brain className="w-4 h-4" />
      case "strengthening":
        return <TrendingUp className="w-4 h-4" />
      case "high-conviction":
        return <Zap className="w-4 h-4" />
      default:
        return <AlertTriangle className="w-4 h-4" />
    }
  }

  const getAlertBorder = (status: string) => {
    switch (status) {
      case "critical":
        return "border-white"
      case "active":
        return "border-neutral-600"
      case "monitoring":
        return "border-neutral-700"
      default:
        return "border-neutral-800"
    }
  }

  return (
    <SleekDashboardLayout
      title="Cross-Domain Intelligence"
      subtitle="AI-powered pattern recognition and alpha generation across all markets"
    >
      <div className="space-y-8">
        {/* Intelligence Metrics */}
        <div className="grid grid-cols-7 gap-4">
          <Card className="bg-neutral-950 border-neutral-800 hover:border-neutral-700 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Brain className="w-4 h-4 text-neutral-400" />
                <div className="text-xs text-neutral-500 font-mono">PATTERNS</div>
              </div>
              <div className="text-2xl font-extralight text-white">{lensMetrics.activePatterns}</div>
              <div className="text-xs text-neutral-400">active</div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-950 border-neutral-800 hover:border-neutral-700 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Target className="w-4 h-4 text-neutral-400" />
                <div className="text-xs text-neutral-500 font-mono">ACCURACY</div>
              </div>
              <div className="text-2xl font-extralight text-white">{lensMetrics.predictionAccuracy.toFixed(1)}%</div>
              <div className="flex items-center text-xs text-neutral-400">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                +2.3% today
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-950 border-neutral-800 hover:border-neutral-700 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Trophy className="w-4 h-4 text-neutral-400" />
                <div className="text-xs text-neutral-500 font-mono">PROFITS</div>
              </div>
              <div className="text-2xl font-extralight text-white">+${lensMetrics.todaysProfits.toFixed(0)}</div>
              <div className="text-xs text-neutral-400">today</div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-950 border-neutral-800 hover:border-neutral-700 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Flame className="w-4 h-4 text-neutral-400" />
                <div className="text-xs text-neutral-500 font-mono">ALERTS</div>
              </div>
              <div className="text-2xl font-extralight text-white">{lensMetrics.alertsTriggered}</div>
              <div className="text-xs text-neutral-400">triggered</div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-950 border-neutral-800 hover:border-neutral-700 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Eye className="w-4 h-4 text-neutral-400" />
                <div className="text-xs text-neutral-500 font-mono">TRACKING</div>
              </div>
              <div className="text-2xl font-extralight text-white">
                {(lensMetrics.correlationsTracked / 1000).toFixed(1)}K
              </div>
              <div className="text-xs text-neutral-400">correlations</div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-950 border-neutral-800 hover:border-neutral-700 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Activity className="w-4 h-4 text-neutral-400" />
                <div className="text-xs text-neutral-500 font-mono">SUCCESS</div>
              </div>
              <div className="text-2xl font-extralight text-white">{lensMetrics.successRate.toFixed(1)}%</div>
              <div className="text-xs text-neutral-400">win rate</div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-950 border-neutral-800 hover:border-neutral-700 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Zap className="w-4 h-4 text-neutral-400" />
                <div className="text-xs text-neutral-500 font-mono">DATA/HR</div>
              </div>
              <div className="text-2xl font-extralight text-white">2.4M</div>
              <div className="text-xs text-neutral-400">processed</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Live Alpha Alerts */}
          <Card className="bg-neutral-950 border-neutral-800">
            <CardHeader className="border-b border-neutral-900">
              <CardTitle className="text-white font-light flex items-center">
                <Zap className="w-5 h-5 mr-3 text-neutral-400" />
                Live Alpha Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {alerts.map((alert, index) => (
                  <div
                    key={alert.id}
                    className={`p-6 border-b border-neutral-900 border-l-2 ${getAlertBorder(alert.status)} ${index === alerts.length - 1 ? "border-b-0" : ""}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        {getAlertIcon(alert.type)}
                        <h3 className="font-light text-white ml-2 text-sm">{alert.title}</h3>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs border-neutral-700 bg-transparent ${
                          alert.status === "critical"
                            ? "text-white"
                            : alert.status === "active"
                              ? "text-neutral-300"
                              : "text-neutral-400"
                        }`}
                      >
                        {alert.status.toUpperCase()}
                      </Badge>
                    </div>

                    <p className="text-neutral-300 text-sm mb-4">{alert.description}</p>

                    <div className="grid grid-cols-2 gap-4 text-xs mb-4">
                      <div>
                        <span className="text-neutral-500 font-mono">STRENGTH</span>
                        <div className="flex items-center mt-1">
                          <Progress value={alert.strength * 100} className="flex-1 h-1 bg-neutral-900 mr-2" />
                          <span className="text-white font-mono">{alert.strength.toFixed(2)}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-neutral-500 font-mono">CONFIDENCE</span>
                        <div className="flex items-center mt-1">
                          <Progress value={alert.confidence} className="flex-1 h-1 bg-neutral-900 mr-2" />
                          <span className="text-white font-mono">{alert.confidence}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className="text-neutral-500 font-mono">PROFIT POTENTIAL</span>
                        <div className="text-white font-mono">+${alert.profitPotential.toFixed(0)}</div>
                      </div>
                      <div>
                        <span className="text-neutral-500 font-mono">RISK LEVEL</span>
                        <div className="text-white font-mono">{alert.riskLevel.toFixed(1)}/10</div>
                      </div>
                      <div>
                        <span className="text-neutral-500 font-mono">TIME LAG</span>
                        <div className="text-white font-mono">{alert.timelag}</div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Button className="w-full bg-white text-black hover:bg-neutral-200 font-light text-xs">
                        TRADE THIS SIGNAL
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pattern Discovery */}
          <Card className="bg-neutral-950 border-neutral-800">
            <CardHeader className="border-b border-neutral-900">
              <CardTitle className="text-white font-light flex items-center">
                <Brain className="w-5 h-5 mr-3 text-neutral-400" />
                Pattern Discovery
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {patterns.map((pattern, index) => (
                  <div
                    key={index}
                    className={`p-6 border-b border-neutral-900 ${index === patterns.length - 1 ? "border-b-0" : ""}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant="outline"
                          className="border-neutral-700 text-neutral-400 text-xs bg-transparent font-mono"
                        >
                          {pattern.domain1}
                        </Badge>
                        <span className="text-neutral-500">→</span>
                        <Badge
                          variant="outline"
                          className="border-neutral-700 text-white text-xs bg-transparent font-mono"
                        >
                          {pattern.domain2}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-extralight text-white">{pattern.correlation.toFixed(2)}</div>
                        <div className="text-xs text-neutral-500 font-mono">CORRELATION</div>
                      </div>
                    </div>

                    <p className="text-neutral-300 text-sm mb-4">{pattern.description}</p>

                    <div className="grid grid-cols-2 gap-4 text-xs mb-4">
                      <div>
                        <span className="text-neutral-500 font-mono">CONFIDENCE</span>
                        <div className="text-white font-mono">{pattern.confidence}%</div>
                      </div>
                      <div>
                        <span className="text-neutral-500 font-mono">OPPORTUNITY</span>
                        <div className="text-white font-mono">+${pattern.tradingOpportunity}</div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-neutral-500 font-mono">MOMENTUM</span>
                        <span className="text-white font-mono">{(pattern.momentum * 100).toFixed(0)}%</span>
                      </div>
                      <Progress value={pattern.momentum * 100} className="h-1 bg-neutral-900" />
                    </div>

                    <div className="mt-4">
                      <Button
                        variant="outline"
                        className="w-full border-neutral-700 text-neutral-300 hover:bg-neutral-900 font-light text-xs"
                      >
                        MONITOR PATTERN
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Real-time Signals */}
          <Card className="bg-neutral-950 border-neutral-800">
            <CardHeader className="border-b border-neutral-900">
              <CardTitle className="text-white font-light flex items-center">
                <Activity className="w-5 h-5 mr-3 text-neutral-400" />
                Real-time Signals
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {realtimeSignals.map((signal, index) => (
                  <div
                    key={signal.id}
                    className={`p-4 border-b border-neutral-900 ${index === realtimeSignals.length - 1 ? "border-b-0" : ""}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="font-light text-white text-xs">{signal.signal}</h3>
                        <div className="text-xs text-neutral-500 font-mono mt-1">{signal.time}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-mono text-white">+${signal.profit}</div>
                        <div className="text-xs text-neutral-500 font-mono">{signal.strength.toFixed(2)}</div>
                      </div>
                    </div>
                    <Progress value={signal.strength * 100} className="h-1 bg-neutral-900" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* LENS System Status */}
        <Card className="bg-neutral-950 border-neutral-800">
          <CardHeader className="border-b border-neutral-900">
            <CardTitle className="text-white font-light">LENS Neural Network Status</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-black p-6 rounded border border-neutral-900 font-mono text-sm space-y-4">
              <div className="text-white font-light">LENS NEURAL NETWORK — OPERATIONAL STATUS</div>
              <div className="border-b border-neutral-800"></div>

              <div className="grid md:grid-cols-4 gap-8 text-xs">
                <div>
                  <div className="text-neutral-400 mb-3 font-mono">PATTERN RECOGNITION</div>
                  <div className="text-neutral-300 space-y-2">
                    <div>• Active neural pathways: 15,420</div>
                    <div>• Pattern matching accuracy: {lensMetrics.predictionAccuracy.toFixed(1)}%</div>
                    <div>• Cross-domain connections: 2,847</div>
                    <div>• Learning rate: Adaptive</div>
                  </div>
                </div>
                <div>
                  <div className="text-neutral-400 mb-3 font-mono">DATA PROCESSING</div>
                  <div className="text-neutral-300 space-y-2">
                    <div>• Real-time feeds: 247 active</div>
                    <div>• Processing latency: 12ms avg</div>
                    <div>• Data quality score: 98.3%</div>
                    <div>• Storage utilization: 67%</div>
                  </div>
                </div>
                <div>
                  <div className="text-neutral-400 mb-3 font-mono">ALPHA GENERATION</div>
                  <div className="text-neutral-300 space-y-2">
                    <div>• Signals generated: {lensMetrics.alertsTriggered} today</div>
                    <div>• Success rate: {lensMetrics.successRate.toFixed(1)}%</div>
                    <div>• Profit generated: +${lensMetrics.todaysProfits.toFixed(0)}</div>
                    <div>• Active correlations: {lensMetrics.correlationsTracked.toLocaleString()}</div>
                  </div>
                </div>
                <div>
                  <div className="text-neutral-400 mb-3 font-mono">SYSTEM HEALTH</div>
                  <div className="text-neutral-300 space-y-2">
                    <div>• CPU usage: 67%</div>
                    <div>• Memory usage: 78%</div>
                    <div>• Network I/O: Normal</div>
                    <div>• Uptime: 99.99%</div>
                  </div>
                </div>
              </div>

              <div className="border-t border-neutral-800 pt-4">
                <div className="text-white">ALL SYSTEMS OPERATIONAL — ALPHA GENERATION ACTIVE</div>
                <div className="text-neutral-500 text-xs font-mono mt-1">
                  Last neural network update: {new Date().toLocaleString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SleekDashboardLayout>
  )
}
