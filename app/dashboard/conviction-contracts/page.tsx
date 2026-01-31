"use client"

import { SleekDashboardLayout } from "@/components/sleek-dashboard-layout"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Zap,
  Target,
  Trophy,
  Flame,
  Clock,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

export default function ConvictionContractsDashboard() {
  const [contracts, setContracts] = useState([
    {
      id: "CC001",
      title: "Bitcoin reaches $100K by Q2 2024",
      currentPrice: 0.23,
      volume24h: 2400000,
      position: 10000,
      avgPrice: 0.18,
      unrealizedPnL: 500,
      status: "active",
      expiry: "2024-06-30",
      priceChange24h: 0.05,
      volatility: 0.34,
      liquidity: 0.89,
      momentum: 0.67,
    },
    {
      id: "CC002",
      title: "Tesla stock exceeds $500 by Dec 2024",
      currentPrice: 0.67,
      volume24h: 1800000,
      position: 5000,
      avgPrice: 0.72,
      unrealizedPnL: -250,
      status: "active",
      expiry: "2024-12-31",
      priceChange24h: -0.03,
      volatility: 0.28,
      liquidity: 0.76,
      momentum: 0.45,
    },
    {
      id: "CC003",
      title: "AI achieves AGI before 2030",
      currentPrice: 0.45,
      volume24h: 950000,
      position: 15000,
      avgPrice: 0.38,
      unrealizedPnL: 1050,
      status: "active",
      expiry: "2030-01-01",
      priceChange24h: 0.12,
      volatility: 0.52,
      liquidity: 0.92,
      momentum: 0.84,
    },
  ])

  const [selectedContract, setSelectedContract] = useState(contracts[0])
  const [orderType, setOrderType] = useState("buy")
  const [orderQuantity, setOrderQuantity] = useState("")
  const [orderPrice, setOrderPrice] = useState("")
  const [winStreak, setWinStreak] = useState(7)
  const [todaysPnL, setTodaysPnL] = useState(2340)
  const [rank, setRank] = useState(23)
  const [totalTrades, setTotalTrades] = useState(156)
  const [winRate, setWinRate] = useState(73.2)
  const [recentTrades, setRecentTrades] = useState([
    { id: 1, contract: "BTC-100K", action: "BUY", quantity: 1000, price: 0.23, pnl: 120, time: "14:23:45" },
    { id: 2, contract: "TSLA-500", action: "SELL", quantity: 500, price: 0.67, pnl: -45, time: "14:21:12" },
    { id: 3, contract: "AGI-2030", action: "BUY", quantity: 2000, price: 0.45, pnl: 340, time: "14:18:33" },
  ])

  // Real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setContracts((prev) =>
        prev.map((contract) => ({
          ...contract,
          currentPrice: Math.max(0.01, contract.currentPrice + (Math.random() - 0.5) * 0.02),
          volume24h: contract.volume24h + Math.floor((Math.random() - 0.5) * 100000),
          priceChange24h: contract.priceChange24h + (Math.random() - 0.5) * 0.02,
          momentum: Math.max(0, Math.min(1, contract.momentum + (Math.random() - 0.5) * 0.1)),
        })),
      )

      setTodaysPnL((prev) => prev + (Math.random() - 0.4) * 50)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const executeOrder = () => {
    if (orderQuantity && orderPrice) {
      const pnl = (Math.random() - 0.3) * 200
      const newTrade = {
        id: recentTrades.length + 1,
        contract: selectedContract.id,
        action: orderType.toUpperCase(),
        quantity: Number.parseInt(orderQuantity),
        price: Number.parseFloat(orderPrice),
        pnl: pnl,
        time: new Date().toLocaleTimeString(),
      }

      setRecentTrades((prev) => [newTrade, ...prev.slice(0, 4)])
      setTotalTrades((prev) => prev + 1)
      setTodaysPnL((prev) => prev + pnl)

      if (pnl > 0) {
        setWinStreak((prev) => prev + 1)
      } else {
        setWinStreak(0)
      }

      setOrderQuantity("")
      setOrderPrice("")
    }
  }

  const totalPnL = contracts.reduce((sum, contract) => sum + contract.unrealizedPnL, 0)
  const totalVolume = contracts.reduce((sum, contract) => sum + contract.volume24h, 0)

  return (
    <SleekDashboardLayout
      title="Conviction Contracts"
      subtitle="High-frequency belief trading with institutional-grade execution"
    >
      <div className="space-y-8">
        {/* Trading Stats Bar */}
        <div className="grid grid-cols-7 gap-4">
          <Card className="bg-neutral-950 border-neutral-800 hover:border-neutral-700 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Trophy className="w-4 h-4 text-neutral-400" />
                <div className="text-xs text-neutral-500 font-mono">RANK</div>
              </div>
              <div className="text-2xl font-extralight text-white">#{rank}</div>
              <div className="flex items-center text-xs text-neutral-400">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                +5 today
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-950 border-neutral-800 hover:border-neutral-700 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Flame className="w-4 h-4 text-neutral-400" />
                <div className="text-xs text-neutral-500 font-mono">STREAK</div>
              </div>
              <div className="text-2xl font-extralight text-white">{winStreak}</div>
              <div className="text-xs text-neutral-400">wins in a row</div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-950 border-neutral-800 hover:border-neutral-700 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-4 h-4 text-neutral-400" />
                <div className="text-xs text-neutral-500 font-mono">TODAY P&L</div>
              </div>
              <div className={`text-2xl font-extralight ${todaysPnL >= 0 ? "text-white" : "text-neutral-400"}`}>
                {todaysPnL >= 0 ? "+" : ""}${todaysPnL.toFixed(0)}
              </div>
              <div className="flex items-center text-xs text-neutral-400">
                {todaysPnL >= 0 ? (
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 mr-1" />
                )}
                {((todaysPnL / 10000) * 100).toFixed(1)}%
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-950 border-neutral-800 hover:border-neutral-700 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Target className="w-4 h-4 text-neutral-400" />
                <div className="text-xs text-neutral-500 font-mono">WIN RATE</div>
              </div>
              <div className="text-2xl font-extralight text-white">{winRate.toFixed(1)}%</div>
              <div className="text-xs text-neutral-400">{totalTrades} trades</div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-950 border-neutral-800 hover:border-neutral-700 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-4 h-4 text-neutral-400" />
                <div className="text-xs text-neutral-500 font-mono">TOTAL P&L</div>
              </div>
              <div className={`text-2xl font-extralight ${totalPnL >= 0 ? "text-white" : "text-neutral-400"}`}>
                {totalPnL >= 0 ? "+" : ""}${totalPnL.toLocaleString()}
              </div>
              <div className="text-xs text-neutral-400">unrealized</div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-950 border-neutral-800 hover:border-neutral-700 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-4 h-4 text-neutral-400" />
                <div className="text-xs text-neutral-500 font-mono">VOLUME</div>
              </div>
              <div className="text-2xl font-extralight text-white">${(totalVolume / 1000000).toFixed(1)}M</div>
              <div className="text-xs text-neutral-400">24h</div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-950 border-neutral-800 hover:border-neutral-700 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-4 h-4 text-neutral-400" />
                <div className="text-xs text-neutral-500 font-mono">ACTIVE</div>
              </div>
              <div className="text-2xl font-extralight text-white">{contracts.length}</div>
              <div className="text-xs text-neutral-400">positions</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Panel - Contract List */}
          <div className="lg:col-span-3">
            <Card className="bg-neutral-950 border-neutral-800">
              <CardHeader className="border-b border-neutral-900">
                <CardTitle className="text-white font-light">Live Contracts</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {contracts.map((contract, index) => (
                    <div
                      key={contract.id}
                      className={`p-6 border-b border-neutral-900 cursor-pointer transition-all hover:bg-neutral-900/50 ${
                        selectedContract.id === contract.id ? "bg-neutral-900 border-l-2 border-l-white" : ""
                      } ${index === contracts.length - 1 ? "border-b-0" : ""}`}
                      onClick={() => setSelectedContract(contract)}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="font-light text-white text-sm mb-2">{contract.title}</h3>
                          <div className="flex items-center gap-3">
                            <Badge
                              variant="outline"
                              className="text-xs border-neutral-700 text-neutral-400 bg-transparent font-mono"
                            >
                              {contract.id}
                            </Badge>
                            <Badge variant="outline" className="text-xs border-neutral-700 text-white bg-transparent">
                              {contract.status.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-extralight text-white">${contract.currentPrice.toFixed(3)}</div>
                          <div
                            className={`text-xs font-mono flex items-center justify-end ${
                              contract.priceChange24h >= 0 ? "text-white" : "text-neutral-400"
                            }`}
                          >
                            {contract.priceChange24h >= 0 ? (
                              <TrendingUp className="w-3 h-3 mr-1" />
                            ) : (
                              <TrendingDown className="w-3 h-3 mr-1" />
                            )}
                            {(contract.priceChange24h * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-4 text-xs">
                        <div>
                          <span className="text-neutral-500 font-mono">POSITION</span>
                          <div className="font-light text-white">{contract.position.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-neutral-500 font-mono">P&L</span>
                          <div
                            className={`font-light flex items-center ${contract.unrealizedPnL >= 0 ? "text-white" : "text-neutral-400"}`}
                          >
                            {contract.unrealizedPnL >= 0 ? (
                              <TrendingUp className="w-3 h-3 mr-1" />
                            ) : (
                              <TrendingDown className="w-3 h-3 mr-1" />
                            )}
                            ${contract.unrealizedPnL}
                          </div>
                        </div>
                        <div>
                          <span className="text-neutral-500 font-mono">VOLUME</span>
                          <div className="font-light text-white">${(contract.volume24h / 1000).toFixed(0)}K</div>
                        </div>
                        <div>
                          <span className="text-neutral-500 font-mono">MOMENTUM</span>
                          <div className="flex items-center">
                            <Progress value={contract.momentum * 100} className="h-1 bg-neutral-900 flex-1 mr-2" />
                            <span className="text-white font-mono text-xs">{(contract.momentum * 100).toFixed(0)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-3 gap-2">
                        <div className="text-xs">
                          <span className="text-neutral-500 font-mono">VOLATILITY: </span>
                          <span className="text-white font-mono">
                            {(selectedContract.volatility * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="text-xs">
                          <span className="text-neutral-500 font-mono">LIQUIDITY: </span>
                          <span className="text-white font-mono">{(selectedContract.liquidity * 100).toFixed(0)}%</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-neutral-500 font-mono">EXPIRY: </span>
                          <span className="text-white font-mono">{contract.expiry}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Trading Interface */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Trade */}
            <Card className="bg-neutral-950 border-neutral-800">
              <CardHeader className="border-b border-neutral-900">
                <CardTitle className="text-white font-light flex items-center">
                  <Zap className="w-5 h-5 mr-3 text-neutral-400" />
                  Quick Trade
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="text-sm text-neutral-400 font-mono">{selectedContract.title}</div>

                  <Tabs value={orderType} onValueChange={setOrderType}>
                    <TabsList className="grid w-full grid-cols-2 bg-black border border-neutral-800">
                      <TabsTrigger
                        value="buy"
                        className="data-[state=active]:bg-white data-[state=active]:text-black font-light"
                      >
                        BUY
                      </TabsTrigger>
                      <TabsTrigger
                        value="sell"
                        className="data-[state=active]:bg-neutral-800 data-[state=active]:text-white font-light"
                      >
                        SELL
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="buy" className="space-y-4 mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-neutral-500 font-mono">QUANTITY</label>
                          <Input
                            placeholder="1000"
                            value={orderQuantity}
                            onChange={(e) => setOrderQuantity(e.target.value)}
                            className="bg-black border-neutral-800 text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-neutral-500 font-mono">PRICE</label>
                          <Input
                            placeholder={selectedContract.currentPrice.toFixed(3)}
                            value={orderPrice}
                            onChange={(e) => setOrderPrice(e.target.value)}
                            className="bg-black border-neutral-800 text-white font-mono"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-neutral-800 text-neutral-400 hover:bg-neutral-900 font-light"
                          onClick={() => setOrderQuantity("1000")}
                        >
                          1K
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-neutral-800 text-neutral-400 hover:bg-neutral-900 font-light"
                          onClick={() => setOrderQuantity("5000")}
                        >
                          5K
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-neutral-800 text-neutral-400 hover:bg-neutral-900 font-light"
                          onClick={() => setOrderQuantity("10000")}
                        >
                          10K
                        </Button>
                      </div>

                      <Button
                        onClick={executeOrder}
                        className="w-full bg-white text-black hover:bg-neutral-200 font-light"
                      >
                        <DollarSign className="w-4 h-4 mr-2" />
                        EXECUTE BUY ORDER
                      </Button>
                    </TabsContent>

                    <TabsContent value="sell" className="space-y-4 mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-neutral-500 font-mono">QUANTITY</label>
                          <Input
                            placeholder="1000"
                            value={orderQuantity}
                            onChange={(e) => setOrderQuantity(e.target.value)}
                            className="bg-black border-neutral-800 text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-neutral-500 font-mono">PRICE</label>
                          <Input
                            placeholder={selectedContract.currentPrice.toFixed(3)}
                            value={orderPrice}
                            onChange={(e) => setOrderPrice(e.target.value)}
                            className="bg-black border-neutral-800 text-white font-mono"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-neutral-800 text-neutral-400 hover:bg-neutral-900 font-light"
                          onClick={() => setOrderQuantity("1000")}
                        >
                          1K
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-neutral-800 text-neutral-400 hover:bg-neutral-900 font-light"
                          onClick={() => setOrderQuantity("5000")}
                        >
                          5K
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-neutral-800 text-neutral-400 hover:bg-neutral-900 font-light"
                          onClick={() => setOrderQuantity("10000")}
                        >
                          10K
                        </Button>
                      </div>

                      <Button
                        onClick={executeOrder}
                        className="w-full bg-neutral-800 text-white hover:bg-neutral-700 font-light"
                      >
                        <DollarSign className="w-4 h-4 mr-2" />
                        EXECUTE SELL ORDER
                      </Button>
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>

            {/* Recent Trades */}
            <Card className="bg-neutral-950 border-neutral-800">
              <CardHeader className="border-b border-neutral-900">
                <CardTitle className="text-white font-light">Recent Trades</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {recentTrades.map((trade, index) => (
                    <div
                      key={trade.id}
                      className={`p-4 border-b border-neutral-900 ${index === recentTrades.length - 1 ? "border-b-0" : ""}`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <Badge
                            variant="outline"
                            className={`text-xs border-neutral-700 bg-transparent font-mono ${
                              trade.action === "BUY" ? "text-white" : "text-neutral-400"
                            }`}
                          >
                            {trade.action}
                          </Badge>
                          <span className="text-xs text-neutral-400 font-mono">{trade.contract}</span>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-mono ${trade.pnl >= 0 ? "text-white" : "text-neutral-400"}`}>
                            {trade.pnl >= 0 ? "+" : ""}${trade.pnl.toFixed(0)}
                          </div>
                          <div className="text-xs text-neutral-500 font-mono">{trade.time}</div>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-neutral-500 font-mono">
                        {trade.quantity.toLocaleString()} @ ${trade.price.toFixed(3)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Market Sentiment */}
            <Card className="bg-neutral-950 border-neutral-800">
              <CardHeader className="border-b border-neutral-900">
                <CardTitle className="text-white font-light">Market Sentiment</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-neutral-500 font-mono">BULLISH SENTIMENT</span>
                      <span className="text-white font-mono">67%</span>
                    </div>
                    <Progress value={67} className="h-1 bg-neutral-900" />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-neutral-500 font-mono">FEAR & GREED INDEX</span>
                      <span className="text-white font-mono">74</span>
                    </div>
                    <Progress value={74} className="h-1 bg-neutral-900" />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-neutral-500 font-mono">VOLATILITY INDEX</span>
                      <span className="text-white font-mono">23.4</span>
                    </div>
                    <Progress value={23.4} className="h-1 bg-neutral-900" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Live Feed */}
        <Card className="bg-neutral-950 border-neutral-800">
          <CardHeader className="border-b border-neutral-900">
            <CardTitle className="text-white font-light">Live Trading Feed</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-black p-6 rounded border border-neutral-900 font-mono text-sm space-y-2">
              <div className="text-white font-light">CONVICTION CONTRACTS — LIVE EXECUTION FEED</div>
              <div className="border-b border-neutral-800"></div>

              <div className="space-y-1 text-xs">
                <div className="text-neutral-300">14:23:45 — USER_7834 BUY 2,500 BTC-100K @ $0.234 → +$127 P&L</div>
                <div className="text-neutral-300">14:23:42 — USER_2901 SELL 1,000 TSLA-500 @ $0.671 → -$23 P&L</div>
                <div className="text-neutral-300">14:23:38 — USER_5647 BUY 5,000 AGI-2030 @ $0.451 → +$289 P&L</div>
                <div className="text-neutral-300">14:23:35 — USER_1203 BUY 3,200 BTC-100K @ $0.232 → +$156 P&L</div>
                <div className="text-neutral-300">14:23:31 — USER_9876 SELL 800 TSLA-500 @ $0.669 → +$67 P&L</div>
              </div>

              <div className="border-t border-neutral-800 pt-2">
                <div className="text-white">TOTAL VOLUME: $5.2M | ACTIVE TRADERS: 1,247 | AVG P&L: +$23.4</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SleekDashboardLayout>
  )
}
