"use client"

import { SleekDashboardLayout } from "@/components/sleek-dashboard-layout"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  TrendingUp,
  TrendingDown,
  Plus,
  Search,
  BarChart3,
  Activity,
  Target,
  Brain,
  Globe,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Settings,
  Download,
  RefreshCw,
} from "lucide-react"

export default function UnifiedBeliefArchitectureDashboard() {
  const [beliefs, setBeliefs] = useState([
    {
      id: 1,
      belief: "Tesla will reach $500 by Q2 2024",
      category: "Technology",
      confidence: 78,
      connectedMarkets: ["TSLA", "EV ETF", "LITHIUM", "SOLAR", "BATTERY", "CHARGING"],
      pnl: 12450,
      status: "active",
      created: "2024-01-15",
      riskScore: 6.2,
      correlationStrength: 0.87,
      marketCap: 2.4e6,
      volume24h: 450000,
      volatility: 0.23,
      sharpeRatio: 1.45,
      maxDrawdown: -0.12,
      winRate: 0.67,
      avgHoldTime: 14,
      lastUpdate: "2024-01-15 14:23",
    },
    {
      id: 2,
      belief: "Remote work will reduce NYC real estate by 25%",
      category: "Real Estate",
      confidence: 65,
      connectedMarkets: ["NYC REIT", "ZOOM", "SLACK", "COWORKING", "RESIDENTIAL", "COMMERCIAL"],
      pnl: -3200,
      status: "active",
      created: "2024-01-10",
      riskScore: 7.8,
      correlationStrength: 0.72,
      marketCap: 1.8e6,
      volume24h: 320000,
      volatility: 0.31,
      sharpeRatio: 0.89,
      maxDrawdown: -0.18,
      winRate: 0.54,
      avgHoldTime: 28,
      lastUpdate: "2024-01-15 13:45",
    },
    {
      id: 3,
      belief: "AI will achieve AGI before 2030",
      category: "Artificial Intelligence",
      confidence: 82,
      connectedMarkets: ["NVDA", "AI ETF", "QUANTUM", "ROBOTICS", "CLOUD", "SEMICONDUCTORS"],
      pnl: 28900,
      status: "monitoring",
      created: "2024-01-08",
      riskScore: 8.9,
      correlationStrength: 0.91,
      marketCap: 4.2e6,
      volume24h: 780000,
      volatility: 0.41,
      sharpeRatio: 2.12,
      maxDrawdown: -0.08,
      winRate: 0.78,
      avgHoldTime: 45,
      lastUpdate: "2024-01-15 14:12",
    },
    {
      id: 4,
      belief: "Climate change will accelerate renewable adoption by 40%",
      category: "Energy",
      confidence: 74,
      connectedMarkets: ["SOLAR", "WIND", "BATTERY", "GRID", "CARBON", "ESG"],
      pnl: 15600,
      status: "active",
      created: "2024-01-05",
      riskScore: 5.4,
      correlationStrength: 0.83,
      marketCap: 3.1e6,
      volume24h: 520000,
      volatility: 0.28,
      sharpeRatio: 1.67,
      maxDrawdown: -0.15,
      winRate: 0.71,
      avgHoldTime: 32,
      lastUpdate: "2024-01-15 14:01",
    },
    {
      id: 5,
      belief: "Quantum computing will disrupt cryptography by 2028",
      category: "Technology",
      confidence: 69,
      connectedMarkets: ["QUANTUM", "CRYPTO", "SECURITY", "IBM", "GOOGLE", "DEFENSE"],
      pnl: 8750,
      status: "analyzing",
      created: "2024-01-12",
      riskScore: 9.2,
      correlationStrength: 0.76,
      marketCap: 1.9e6,
      volume24h: 290000,
      volatility: 0.52,
      sharpeRatio: 1.23,
      maxDrawdown: -0.22,
      winRate: 0.61,
      avgHoldTime: 21,
      lastUpdate: "2024-01-15 13:58",
    },
  ])

  const [newBelief, setNewBelief] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [sortBy, setSortBy] = useState("pnl")
  const [selectedBelief, setSelectedBelief] = useState(beliefs[0])
  const [timeframe, setTimeframe] = useState("24h")

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setBeliefs((prev) =>
        prev.map((belief) => ({
          ...belief,
          pnl: belief.pnl + (Math.random() - 0.5) * 1000,
          confidence: Math.max(0, Math.min(100, belief.confidence + (Math.random() - 0.5) * 2)),
          volume24h: belief.volume24h + Math.floor((Math.random() - 0.5) * 50000),
          lastUpdate: new Date().toISOString().slice(0, 16).replace("T", " "),
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const addBelief = () => {
    if (newBelief.trim()) {
      const belief = {
        id: beliefs.length + 1,
        belief: newBelief,
        category: "Uncategorized",
        confidence: Math.floor(Math.random() * 40) + 60,
        connectedMarkets: ["ANALYZING..."],
        pnl: 0,
        status: "analyzing",
        created: new Date().toISOString().split("T")[0],
        riskScore: Math.random() * 10,
        correlationStrength: Math.random(),
        marketCap: Math.random() * 5e6,
        volume24h: Math.floor(Math.random() * 1000000),
        volatility: Math.random() * 0.6,
        sharpeRatio: Math.random() * 3,
        maxDrawdown: -Math.random() * 0.3,
        winRate: Math.random(),
        avgHoldTime: Math.floor(Math.random() * 60),
        lastUpdate: new Date().toISOString().slice(0, 16).replace("T", " "),
      }
      setBeliefs([belief, ...beliefs])
      setNewBelief("")

      setTimeout(() => {
        setBeliefs((prev) =>
          prev.map((b) =>
            b.id === belief.id
              ? {
                  ...b,
                  connectedMarkets: ["MARKET_A", "MARKET_B", "MARKET_C", "MARKET_D"],
                  status: "active",
                  category: "Technology",
                }
              : b,
          ),
        )
      }, 3000)
    }
  }

  const filteredBeliefs = beliefs
    .filter((belief) => belief.belief.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((belief) => selectedCategory === "all" || belief.category === selectedCategory)
    .filter((belief) => selectedStatus === "all" || belief.status === selectedStatus)
    .sort((a, b) => {
      switch (sortBy) {
        case "pnl":
          return b.pnl - a.pnl
        case "confidence":
          return b.confidence - a.confidence
        case "risk":
          return a.riskScore - b.riskScore
        case "volume":
          return b.volume24h - a.volume24h
        default:
          return 0
      }
    })

  const totalPnL = beliefs.reduce((sum, belief) => sum + belief.pnl, 0)
  const avgConfidence = beliefs.reduce((sum, belief) => sum + belief.confidence, 0) / beliefs.length
  const totalVolume = beliefs.reduce((sum, belief) => sum + belief.volume24h, 0)
  const activeBeliefs = beliefs.filter((b) => b.status === "active").length

  const categories = ["all", ...Array.from(new Set(beliefs.map((b) => b.category)))]
  const statuses = ["all", "active", "monitoring", "analyzing", "paused"]

  return (
    <SleekDashboardLayout
      title="Unified Belief Architecture"
      subtitle="Advanced conviction management and cross-market intelligence platform"
    >
      <div className="space-y-6 sm:space-y-8">
        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Button className="bg-white text-black hover:bg-neutral-200 font-light">
              <Plus className="w-4 h-4 mr-2" />
              New Belief
            </Button>
            <Button variant="outline" className="border-neutral-700 text-neutral-300 hover:bg-neutral-900 font-light">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" className="border-neutral-700 text-neutral-300 hover:bg-neutral-900 font-light">
              <Settings className="w-4 h-4 mr-2" />
              Configure
            </Button>
          </div>
          <div className="flex items-center space-x-2 text-neutral-500">
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm font-mono">Live Feed Active</span>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          <Card className="bg-neutral-950 border-neutral-800 hover:border-neutral-700 transition-colors">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <Target className="w-4 sm:w-5 h-4 sm:h-5 text-neutral-400" />
                <div className="text-xs text-neutral-500 font-mono">BELIEFS</div>
              </div>
              <div className="text-2xl sm:text-3xl font-extralight text-white mb-1">{activeBeliefs}</div>
              <div className="flex items-center text-xs text-neutral-400">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                +12% vs last week
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-950 border-neutral-800 hover:border-neutral-700 transition-colors">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="w-4 sm:w-5 h-4 sm:h-5 text-neutral-400" />
                <div className="text-xs text-neutral-500 font-mono">P&L</div>
              </div>
              <div className="text-2xl sm:text-3xl font-extralight text-white mb-1">
                {totalPnL >= 0 ? "+" : ""}
                {totalPnL.toLocaleString()}
              </div>
              <div className="flex items-center text-xs text-neutral-400">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                +8.3% today
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-950 border-neutral-800 hover:border-neutral-700 transition-colors">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <Percent className="w-4 sm:w-5 h-4 sm:h-5 text-neutral-400" />
                <div className="text-xs text-neutral-500 font-mono">CONFIDENCE</div>
              </div>
              <div className="text-2xl sm:text-3xl font-extralight text-white mb-1">{avgConfidence.toFixed(1)}%</div>
              <div className="flex items-center text-xs text-neutral-400">
                <ArrowDownRight className="w-3 h-3 mr-1" />
                -2.1% vs yesterday
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-950 border-neutral-800 hover:border-neutral-700 transition-colors">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <Activity className="w-4 sm:w-5 h-4 sm:h-5 text-neutral-400" />
                <div className="text-xs text-neutral-500 font-mono">VOLUME</div>
              </div>
              <div className="text-2xl sm:text-3xl font-extralight text-white mb-1">
                ${(totalVolume / 1000000).toFixed(1)}M
              </div>
              <div className="flex items-center text-xs text-neutral-400">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                +15.7% vs avg
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-950 border-neutral-800 hover:border-neutral-700 transition-colors">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <Globe className="w-4 sm:w-5 h-4 sm:h-5 text-neutral-400" />
                <div className="text-xs text-neutral-500 font-mono">MARKETS</div>
              </div>
              <div className="text-2xl sm:text-3xl font-extralight text-white mb-1">247</div>
              <div className="flex items-center text-xs text-neutral-400">
                <Eye className="w-3 h-3 mr-1" />
                Connected
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-950 border-neutral-800 hover:border-neutral-700 transition-colors">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <BarChart3 className="w-4 sm:w-5 h-4 sm:h-5 text-neutral-400" />
                <div className="text-xs text-neutral-500 font-mono">WIN RATE</div>
              </div>
              <div className="text-2xl sm:text-3xl font-extralight text-white mb-1">73.2%</div>
              <div className="flex items-center text-xs text-neutral-400">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                +5.4% this month
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Left Panel - Belief Management */}
          <div className="lg:col-span-3 space-y-6">
            {/* Add New Belief */}
            <Card className="bg-neutral-950 border-neutral-800">
              <CardHeader className="border-b border-neutral-900">
                <CardTitle className="text-white font-light flex items-center">
                  <Brain className="w-5 h-5 mr-3 text-neutral-400" />
                  Express New Conviction
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Input
                      placeholder="Enter your belief about the future..."
                      value={newBelief}
                      onChange={(e) => setNewBelief(e.target.value)}
                      className="flex-1 bg-black border-neutral-800 text-white placeholder:text-neutral-500 focus:border-neutral-600"
                      onKeyPress={(e) => e.key === "Enter" && addBelief()}
                    />
                    <Button
                      onClick={addBelief}
                      className="bg-white text-black hover:bg-neutral-200 font-light w-full sm:w-auto"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs border-neutral-800 text-neutral-400 hover:bg-neutral-900 font-light"
                      onClick={() => setNewBelief("Bitcoin will reach $150K by 2025")}
                    >
                      Crypto Template
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs border-neutral-800 text-neutral-400 hover:bg-neutral-900 font-light"
                      onClick={() => setNewBelief("AI will replace 30% of knowledge workers by 2027")}
                    >
                      AI Template
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs border-neutral-800 text-neutral-400 hover:bg-neutral-900 font-light"
                      onClick={() => setNewBelief("Climate change will cause $2T in damages by 2030")}
                    >
                      Climate Template
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Filters */}
            <Card className="bg-neutral-950 border-neutral-800">
              <CardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 w-4 h-4" />
                    <Input
                      placeholder="Search beliefs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-black border-neutral-800 text-white placeholder:text-neutral-500 focus:border-neutral-600"
                    />
                  </div>

                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="bg-black border-neutral-800 text-white">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-neutral-800">
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat} className="text-white">
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="bg-black border-neutral-800 text-white">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-neutral-800">
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status} className="text-white">
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="bg-black border-neutral-800 text-white">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-neutral-800">
                      <SelectItem value="pnl" className="text-white">
                        P&L
                      </SelectItem>
                      <SelectItem value="confidence" className="text-white">
                        Confidence
                      </SelectItem>
                      <SelectItem value="risk" className="text-white">
                        Risk Score
                      </SelectItem>
                      <SelectItem value="volume" className="text-white">
                        Volume
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Beliefs List */}
            <Card className="bg-neutral-950 border-neutral-800">
              <CardHeader className="border-b border-neutral-900">
                <CardTitle className="text-white font-light">Active Beliefs ({filteredBeliefs.length})</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto">
                  {filteredBeliefs.map((belief, index) => (
                    <div
                      key={belief.id}
                      className={`p-4 sm:p-6 border-b border-neutral-900 cursor-pointer transition-all hover:bg-neutral-900/50 ${
                        selectedBelief.id === belief.id ? "bg-neutral-900 border-l-2 border-l-white" : ""
                      } ${index === filteredBeliefs.length - 1 ? "border-b-0" : ""}`}
                      onClick={() => setSelectedBelief(belief)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1 pr-4">
                          <h3 className="font-light text-white text-sm mb-2">{belief.belief}</h3>
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <Badge
                              variant="outline"
                              className="text-xs border-neutral-700 text-neutral-400 bg-transparent"
                            >
                              {belief.category}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={`text-xs border-neutral-700 bg-transparent ${
                                belief.status === "active"
                                  ? "text-white"
                                  : belief.status === "analyzing"
                                    ? "text-neutral-400"
                                    : "text-neutral-500"
                              }`}
                            >
                              {belief.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-extralight text-white">{belief.confidence}%</div>
                          <div className="text-xs text-neutral-500 font-mono">CONFIDENCE</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                        <div>
                          <span className="text-neutral-500 font-mono">P&L</span>
                          <div
                            className={`font-light flex items-center ${belief.pnl >= 0 ? "text-white" : "text-neutral-400"}`}
                          >
                            {belief.pnl >= 0 ? (
                              <TrendingUp className="w-3 h-3 mr-1" />
                            ) : (
                              <TrendingDown className="w-3 h-3 mr-1" />
                            )}
                            ${belief.pnl.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <span className="text-neutral-500 font-mono">RISK</span>
                          <div className="font-light text-white">{belief.riskScore.toFixed(1)}</div>
                        </div>
                        <div>
                          <span className="text-neutral-500 font-mono">VOLUME</span>
                          <div className="font-light text-white">${(belief.volume24h / 1000).toFixed(0)}K</div>
                        </div>
                      </div>

                      <div className="mt-3 text-xs text-neutral-600 font-mono">UPDATED {belief.lastUpdate}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Analytics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Selected Belief Analytics */}
            <Card className="bg-neutral-950 border-neutral-800">
              <CardHeader className="border-b border-neutral-900">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white font-light flex items-center">
                    <BarChart3 className="w-5 h-5 mr-3 text-neutral-400" />
                    Belief Analytics
                  </CardTitle>
                  <Select value={timeframe} onValueChange={setTimeframe}>
                    <SelectTrigger className="w-20 bg-black border-neutral-800 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-neutral-800">
                      <SelectItem value="1h" className="text-white">
                        1H
                      </SelectItem>
                      <SelectItem value="24h" className="text-white">
                        24H
                      </SelectItem>
                      <SelectItem value="7d" className="text-white">
                        7D
                      </SelectItem>
                      <SelectItem value="30d" className="text-white">
                        30D
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-light text-white mb-4">{selectedBelief.belief}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-xs mb-2">
                            <span className="text-neutral-500 font-mono">CONFIDENCE</span>
                            <span className="text-white font-mono">{selectedBelief.confidence}%</span>
                          </div>
                          <Progress value={selectedBelief.confidence} className="h-1 bg-neutral-900" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-2">
                            <span className="text-neutral-500 font-mono">RISK SCORE</span>
                            <span className="text-white font-mono">{selectedBelief.riskScore.toFixed(1)}/10</span>
                          </div>
                          <Progress value={selectedBelief.riskScore * 10} className="h-1 bg-neutral-900" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-2">
                            <span className="text-neutral-500 font-mono">CORRELATION</span>
                            <span className="text-white font-mono">
                              {(selectedBelief.correlationStrength * 100).toFixed(0)}%
                            </span>
                          </div>
                          <Progress value={selectedBelief.correlationStrength * 100} className="h-1 bg-neutral-900" />
                        </div>
                      </div>
                      <div className="space-y-3 text-xs">
                        <div className="flex justify-between">
                          <span className="text-neutral-500 font-mono">MARKET CAP</span>
                          <span className="text-white font-mono">
                            ${(selectedBelief.marketCap / 1000000).toFixed(1)}M
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500 font-mono">VOLATILITY</span>
                          <span className="text-white font-mono">{(selectedBelief.volatility * 100).toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500 font-mono">SHARPE RATIO</span>
                          <span className="text-white font-mono">{selectedBelief.sharpeRatio.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500 font-mono">MAX DRAWDOWN</span>
                          <span className="text-neutral-400 font-mono">
                            {(selectedBelief.maxDrawdown * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500 font-mono">WIN RATE</span>
                          <span className="text-white font-mono">{(selectedBelief.winRate * 100).toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500 font-mono">AVG HOLD</span>
                          <span className="text-white font-mono">{selectedBelief.avgHoldTime}D</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Connected Markets */}
            <Card className="bg-neutral-950 border-neutral-800">
              <CardHeader className="border-b border-neutral-900">
                <CardTitle className="text-white font-light flex items-center">
                  <Globe className="w-5 h-5 mr-3 text-neutral-400" />
                  Connected Markets ({selectedBelief.connectedMarkets.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-1 gap-2">
                  {selectedBelief.connectedMarkets.map((market, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-black rounded border border-neutral-900 hover:border-neutral-800 transition-colors"
                    >
                      <Badge
                        variant="outline"
                        className="border-neutral-700 text-neutral-300 text-xs bg-transparent font-mono"
                      >
                        {market}
                      </Badge>
                      <div className="flex items-center text-xs font-mono">
                        {Math.random() > 0.5 ? (
                          <TrendingUp className="w-3 h-3 text-white mr-1" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-neutral-400 mr-1" />
                        )}
                        <span className={Math.random() > 0.5 ? "text-white" : "text-neutral-400"}>
                          {(Math.random() * 10 - 5).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Risk Analysis */}
            <Card className="bg-neutral-950 border-neutral-800">
              <CardHeader className="border-b border-neutral-900">
                <CardTitle className="text-white font-light flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-3 text-neutral-400" />
                  Risk Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-black rounded border border-neutral-900">
                      <div className="text-xs text-neutral-500 font-mono mb-1">PORTFOLIO RISK</div>
                      <div className="text-lg font-extralight text-white">MEDIUM</div>
                      <div className="text-xs text-neutral-500 font-mono">SCORE 6.8/10</div>
                    </div>
                    <div className="p-4 bg-black rounded border border-neutral-900">
                      <div className="text-xs text-neutral-500 font-mono mb-1">DIVERSIFICATION</div>
                      <div className="text-lg font-extralight text-white">OPTIMAL</div>
                      <div className="text-xs text-neutral-500 font-mono">8 CATEGORIES</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-neutral-500 font-mono">TECHNOLOGY EXPOSURE</span>
                        <span className="text-white font-mono">45%</span>
                      </div>
                      <Progress value={45} className="h-1 bg-neutral-900" />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-neutral-500 font-mono">ENERGY EXPOSURE</span>
                        <span className="text-white font-mono">25%</span>
                      </div>
                      <Progress value={25} className="h-1 bg-neutral-900" />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-neutral-500 font-mono">REAL ESTATE EXPOSURE</span>
                        <span className="text-white font-mono">20%</span>
                      </div>
                      <Progress value={20} className="h-1 bg-neutral-900" />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-neutral-500 font-mono">OTHER EXPOSURE</span>
                        <span className="text-white font-mono">10%</span>
                      </div>
                      <Progress value={10} className="h-1 bg-neutral-900" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* System Status */}
        <Card className="bg-neutral-950 border-neutral-800">
          <CardHeader className="border-b border-neutral-900">
            <CardTitle className="text-white font-light flex items-center">
              <Activity className="w-5 h-5 mr-3 text-neutral-400" />
              System Status & Live Feed
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="bg-black p-4 sm:p-6 rounded border border-neutral-900 font-mono text-sm space-y-4">
              <div className="text-white font-light">UNIFIED BELIEF ARCHITECTURE — OPERATIONAL STATUS</div>
              <div className="border-b border-neutral-800"></div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 text-xs">
                <div>
                  <div className="text-neutral-400 mb-3 font-mono">BELIEF PROCESSING</div>
                  <div className="text-neutral-300 space-y-2">
                    <div>• Active beliefs: {activeBeliefs}</div>
                    <div>• Processing queue: 0</div>
                    <div>• Analysis accuracy: 94.7%</div>
                    <div>• Correlation engine: Online</div>
                  </div>
                </div>
                <div>
                  <div className="text-neutral-400 mb-3 font-mono">MARKET CONNECTIONS</div>
                  <div className="text-neutral-300 space-y-2">
                    <div>• Connected markets: 247</div>
                    <div>• Data feeds: 1,247 active</div>
                    <div>• Latency: 12ms avg</div>
                    <div>• Connection quality: 99.8%</div>
                  </div>
                </div>
                <div>
                  <div className="text-neutral-400 mb-3 font-mono">PERFORMANCE</div>
                  <div className="text-neutral-300 space-y-2">
                    <div>• Total P&L: ${totalPnL.toLocaleString()}</div>
                    <div>• Win rate: 73.2%</div>
                    <div>• Avg confidence: {avgConfidence.toFixed(1)}%</div>
                    <div>• Risk score: 6.8/10</div>
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
                <div className="text-white flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  ALL SYSTEMS OPERATIONAL
                </div>
                <div className="text-neutral-500 text-xs font-mono mt-1">
                  Last system check: {new Date().toLocaleString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SleekDashboardLayout>
  )
}
