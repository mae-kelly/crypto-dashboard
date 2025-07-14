"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingDown, AlertTriangle, DollarSign, Clock } from "lucide-react"

interface SellStock {
  symbol: string
  currentPrice: number
  buyPrice: number
  currentProfit: number
  sellUrgency: "IMMEDIATE" | "SOON" | "MONITOR"
  reasonToSell: string
  projectedLoss: number
}

interface SellNowPanelProps {
  stocks: SellStock[]
  onSellStock: (symbol: string, shares: number) => void
}

export function SellNowPanel({ stocks, onSellStock }: SellNowPanelProps) {
  const [shares, setShares] = useState<Record<string, number>>({})

  const getUrgencyStyle = (urgency: string) => {
    if (urgency === "IMMEDIATE") return { 
      color: "bg-red-500 text-white", 
      icon: AlertTriangle,
      pulse: "animate-pulse" 
    }
    if (urgency === "SOON") return { 
      color: "bg-orange-500 text-white", 
      icon: Clock,
      pulse: "" 
    }
    return { 
      color: "bg-yellow-500 text-black", 
      icon: Clock,
      pulse: "" 
    }
  }

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <TrendingDown className="h-5 w-5 text-red-400" />
          Exit Positions Now
        </h2>
        <Badge variant="outline" className="text-red-400 border-red-400">
          {stocks.filter(s => s.sellUrgency === "IMMEDIATE").length} urgent
        </Badge>
      </div>
      
      <div className="space-y-3">
        {stocks
          .sort((a, b) => {
            const urgencyOrder = { "IMMEDIATE": 0, "SOON": 1, "MONITOR": 2 }
            return urgencyOrder[a.sellUrgency] - urgencyOrder[b.sellUrgency]
          })
          .map((stock) => {
            const urgencyStyle = getUrgencyStyle(stock.sellUrgency)
            const profitColor = stock.currentProfit >= 0 ? "text-green-400" : "text-red-400"
            
            return (
              <div key={stock.symbol} className={`border rounded-lg p-4 bg-background/20 ${urgencyStyle.pulse}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{stock.symbol}</span>
                    <Badge className={urgencyStyle.color}>
                      <urgencyStyle.icon className="h-3 w-3 mr-1" />
                      {stock.sellUrgency}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${stock.currentPrice.toFixed(2)}</div>
                    <div className={`text-xs ${profitColor}`}>
                      {stock.currentProfit >= 0 ? '+' : ''}${stock.currentProfit.toFixed(2)}
                    </div>
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground mb-2">
                  Buy: ${stock.buyPrice.toFixed(2)} • {stock.reasonToSell}
                </div>
                
                {stock.projectedLoss > 0 && (
                  <div className="text-xs text-red-400 mb-3">
                    Projected loss if held: -${stock.projectedLoss.toFixed(2)}
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="All"
                    className="w-16 px-2 py-1 text-xs bg-background border rounded"
                    value={shares[stock.symbol] || ''}
                    onChange={(e) => setShares(prev => ({ 
                      ...prev, 
                      [stock.symbol]: parseInt(e.target.value) || 0 
                    }))}
                  />
                  <Button 
                    size="sm" 
                    variant="destructive"
                    className="flex-1"
                    onClick={() => {
                      const shareCount = shares[stock.symbol] || 0
                      onSellStock(stock.symbol, shareCount)
                    }}
                  >
                    <DollarSign className="h-3 w-3 mr-1" />
                    Sell Now
                  </Button>
                </div>
              </div>
            )
          })}
        
        {stocks.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            <TrendingDown className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <div>No positions need immediate exit</div>
            <div className="text-xs mt-1">All holdings performing optimally</div>
          </div>
        )}
      </div>
    </Card>
  )
}
