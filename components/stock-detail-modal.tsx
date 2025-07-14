"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Brain, Target, Clock, DollarSign, Zap, AlertTriangle, LineChart } from "lucide-react"

interface StockAnalysis {
  symbol: string
  currentPrice: number
  thresholdPercent: number
  accelerationPerMinute: number
  mlConfidence: number
  buyRecommendation: "STRONG_BUY" | "BUY"
  targetExitPrice: number
  projectedProfit: number
  timeToTarget: number
  riskLevel: "LOW" | "MEDIUM" | "HIGH"
  
  historicalData: {
    price1h: number
    price4h: number
    price1d: number
    volume24h: number
    avgVolume: number
  }
  
  technicalAnalysis: {
    rsi: number
    macd: number
    bollingerPosition: number
    supportLevel: number
    resistanceLevel: number
  }
  
  aiInsights: {
    whyBuy: string[]
    riskFactors: string[]
    marketConditions: string
    momentumScore: number
    liquidityScore: number
    volatilityPrediction: number
  }
  
  brokerData: {
    tdAmeritradeShares: number
    robinhoodShares: number
    availableFunds: number
  }
}

interface StockDetailModalProps {
  symbol: string
  onClose: () => void
  onBuyStock: (symbol: string, shares: number) => void
}

export function StockDetailModal({ symbol, onClose, onBuyStock }: StockDetailModalProps) {
  const [analysis, setAnalysis] = useState<StockAnalysis | null>(null)
  const [buyShares, setBuyShares] = useState(100)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalysis = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/analysis/${symbol}`)
        const data = await response.json()
        setAnalysis(data)
      } catch (error) {
        console.error('Failed to fetch analysis:', error)
      }
      setLoading(false)
    }

    fetchAnalysis()
  }, [symbol])

  if (loading || !analysis) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            <span className="ml-3">Analyzing {symbol} with quantum algorithms...</span>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const maxShares = Math.floor(analysis.brokerData.availableFunds / analysis.currentPrice)

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span className="text-2xl font-bold">{symbol}</span>
            <Badge className={analysis.buyRecommendation === "STRONG_BUY" ? "bg-green-600" : "bg-blue-600"}>
              {analysis.buyRecommendation}
            </Badge>
            <Badge variant="outline" className={
              analysis.riskLevel === "LOW" ? "text-green-400" : 
              analysis.riskLevel === "MEDIUM" ? "text-yellow-400" : "text-red-400"
            }>
              {analysis.riskLevel} RISK
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-background/50 p-3 rounded">
            <div className="text-sm text-muted-foreground">Current Price</div>
            <div className="text-xl font-bold">${analysis.currentPrice.toFixed(2)}</div>
          </div>
          <div className="bg-background/50 p-3 rounded">
            <div className="text-sm text-muted-foreground">Target Price</div>
            <div className="text-xl font-bold text-green-400">${analysis.targetExitPrice.toFixed(2)}</div>
          </div>
          <div className="bg-background/50 p-3 rounded">
            <div className="text-sm text-muted-foreground">Projected Profit</div>
            <div className="text-xl font-bold text-green-400">+${analysis.projectedProfit.toFixed(2)}</div>
          </div>
          <div className="bg-background/50 p-3 rounded">
            <div className="text-sm text-muted-foreground">Time to Target</div>
            <div className="text-xl font-bold">{analysis.timeToTarget}min</div>
          </div>
        </div>

        <Tabs defaultValue="analysis" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="momentum">Momentum</TabsTrigger>
            <TabsTrigger value="execute">Execute Trade</TabsTrigger>
          </TabsList>

          <TabsContent value="analysis" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Brain className="h-4 w-4 text-purple-400" />
                  Why AI Recommends Buying
                </h3>
                {analysis.aiInsights.whyBuy.map((reason, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <Target className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  Risk Factors
                </h3>
                {analysis.aiInsights.riskFactors.map((risk, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <AlertTriangle className="h-3 w-3 text-yellow-400 mt-1 flex-shrink-0" />
                    <span>{risk}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-background/50 p-4 rounded">
              <h3 className="font-semibold mb-2">Market Conditions</h3>
              <p className="text-sm text-muted-foreground">{analysis.aiInsights.marketConditions}</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-background/50 p-3 rounded text-center">
                <div className="text-sm text-muted-foreground">Momentum Score</div>
                <div className="text-2xl font-bold text-purple-400">{analysis.aiInsights.momentumScore}/100</div>
              </div>
              <div className="bg-background/50 p-3 rounded text-center">
                <div className="text-sm text-muted-foreground">Liquidity Score</div>
                <div className="text-2xl font-bold text-blue-400">{analysis.aiInsights.liquidityScore}/100</div>
              </div>
              <div className="bg-background/50 p-3 rounded text-center">
                <div className="text-sm text-muted-foreground">ML Confidence</div>
                <div className="text-2xl font-bold text-green-400">{(analysis.mlConfidence * 100).toFixed(1)}%</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="technical" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <h3 className="font-semibold">Price History</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>1 Hour Ago:</span>
                    <span>${analysis.historicalData.price1h.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>4 Hours Ago:</span>
                    <span>${analysis.historicalData.price4h.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>24 Hours Ago:</span>
                    <span>${analysis.historicalData.price1d.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold">Technical Indicators</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>RSI:</span>
                    <span className={analysis.technicalAnalysis.rsi > 70 ? "text-red-400" : analysis.technicalAnalysis.rsi < 30 ? "text-green-400" : ""}>
                      {analysis.technicalAnalysis.rsi.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>MACD:</span>
                    <span className={analysis.technicalAnalysis.macd > 0 ? "text-green-400" : "text-red-400"}>
                      {analysis.technicalAnalysis.macd.toFixed(3)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bollinger Position:</span>
                    <span>{analysis.technicalAnalysis.bollingerPosition.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background/50 p-3 rounded">
                <div className="text-sm text-muted-foreground">Support Level</div>
                <div className="text-lg font-bold text-green-400">${analysis.technicalAnalysis.supportLevel.toFixed(2)}</div>
              </div>
              <div className="bg-background/50 p-3 rounded">
                <div className="text-sm text-muted-foreground">Resistance Level</div>
                <div className="text-lg font-bold text-red-400">${analysis.technicalAnalysis.resistanceLevel.toFixed(2)}</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="momentum" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background/50 p-4 rounded">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-400" />
                  Acceleration Analysis
                </h3>
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  +{analysis.accelerationPerMinute.toFixed(2)}%/min
                </div>
                <div className="text-sm text-muted-foreground">
                  Current momentum trajectory indicates strong upward movement
                </div>
              </div>
              
              <div className="bg-background/50 p-4 rounded">
                <h3 className="font-semibold mb-3">Volume Analysis</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>24h Volume:</span>
                    <span>{analysis.historicalData.volume24h.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Volume:</span>
                    <span>{analysis.historicalData.avgVolume.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Volume Ratio:</span>
                    <span className={analysis.historicalData.volume24h > analysis.historicalData.avgVolume ? "text-green-400" : "text-red-400"}>
                      {(analysis.historicalData.volume24h / analysis.historicalData.avgVolume).toFixed(2)}x
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-background/50 p-4 rounded">
              <h3 className="font-semibold mb-3">Volatility Prediction</h3>
              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold">{analysis.aiInsights.volatilityPrediction.toFixed(1)}%</div>
                <div className="text-sm text-muted-foreground">Expected price swing in next hour</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="execute" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background/50 p-4 rounded">
                <h3 className="font-semibold mb-3">Account Balance</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Available Funds:</span>
                    <span className="font-mono">${analysis.brokerData.availableFunds.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Max Shares:</span>
                    <span className="font-mono">{maxShares}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-background/50 p-4 rounded">
                <h3 className="font-semibold mb-3">Current Holdings</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>TD Ameritrade:</span>
                    <span>{analysis.brokerData.tdAmeritradeShares} shares</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Robinhood:</span>
                    <span>{analysis.brokerData.robinhoodShares} shares</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Shares to Buy</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={buyShares}
                    onChange={(e) => setBuyShares(parseInt(e.target.value) || 0)}
                    className="flex-1 px-3 py-2 bg-background border rounded"
                    min="1"
                    max={maxShares}
                  />
                  <Button variant="outline" onClick={() => setBuyShares(maxShares)}>
                    Max
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Total cost: ${(buyShares * analysis.currentPrice).toFixed(2)}
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-500/20 p-4 rounded">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-green-400" />
                  <span className="font-semibold">Trade Summary</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div>Shares: {buyShares}</div>
                    <div>Entry: ${analysis.currentPrice.toFixed(2)}</div>
                    <div>Target: ${analysis.targetExitPrice.toFixed(2)}</div>
                  </div>
                  <div>
                    <div>Investment: ${(buyShares * analysis.currentPrice).toFixed(2)}</div>
                    <div>Projected Profit: ${(buyShares * analysis.projectedProfit).toFixed(2)}</div>
                    <div>ROI: {(((analysis.targetExitPrice - analysis.currentPrice) / analysis.currentPrice) * 100).toFixed(2)}%</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    onBuyStock(symbol, buyShares)
                    onClose()
                  }}
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  Execute Buy Order
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
