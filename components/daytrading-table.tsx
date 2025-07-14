"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Zap, Target, Clock, DollarSign } from "lucide-react"

interface DayTradeStock {
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
  lastUpdate: number
}

interface DayTradingTableProps {
  stocks: DayTradeStock[]
  onStockClick: (symbol: string) => void
  onBuyStock: (symbol: string, shares: number) => void
}

export function DayTradingTable({ stocks, onStockClick, onBuyStock }: DayTradingTableProps) {
  const [shares, setShares] = useState<Record<string, number>>({})

  const getThresholdColor = (threshold: number) => {
    if (threshold >= 12) return "bg-orange-500"
    if (threshold >= 10.5) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getRiskColor = (risk: string) => {
    if (risk === "LOW") return "text-green-400"
    if (risk === "MEDIUM") return "text-yellow-400"
    return "text-red-400"
  }

  const getRecommendationBadge = (rec: string) => {
    if (rec === "STRONG_BUY") return "bg-green-600 text-white"
    return "bg-blue-600 text-white"
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Symbol</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Threshold</TableHead>
          <TableHead>Acceleration</TableHead>
          <TableHead>Target/Profit</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stocks.map((stock) => (
          <TableRow 
            key={stock.symbol} 
            className="cursor-pointer hover:bg-accent/50"
            onClick={() => onStockClick(stock.symbol)}
          >
            <TableCell className="font-medium">
              <div className="flex items-center gap-2">
                <span className="font-bold">{stock.symbol}</span>
                <Badge className={getRecommendationBadge(stock.buyRecommendation)}>
                  {stock.buyRecommendation}
                </Badge>
              </div>
              <div className={`text-xs ${getRiskColor(stock.riskLevel)}`}>
                {stock.riskLevel} RISK
              </div>
            </TableCell>
            <TableCell>
              <div className="font-medium">${stock.currentPrice.toFixed(2)}</div>
              <div className="text-xs text-green-400">
                {(stock.mlConfidence * 100).toFixed(1)}% confidence
              </div>
            </TableCell>
            <TableCell>
              <Badge className={`${getThresholdColor(stock.thresholdPercent)} text-white`}>
                {stock.thresholdPercent.toFixed(1)}%
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Zap className="h-3 w-3 text-yellow-400" />
                <span className="font-mono text-sm">
                  +{stock.accelerationPerMinute.toFixed(2)}%/min
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div className="text-green-400 font-medium">
                ${stock.targetExitPrice.toFixed(2)}
              </div>
              <div className="text-xs text-green-300">
                +${stock.projectedProfit.toFixed(2)} profit
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1 text-xs">
                <Clock className="h-3 w-3" />
                {stock.timeToTarget}min
              </div>
            </TableCell>
            <TableCell onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="100"
                  className="w-16 px-2 py-1 text-xs bg-background border rounded"
                  value={shares[stock.symbol] || ''}
                  onChange={(e) => setShares(prev => ({ 
                    ...prev, 
                    [stock.symbol]: parseInt(e.target.value) || 0 
                  }))}
                />
                <Button 
                  size="sm" 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    const shareCount = shares[stock.symbol] || 100
                    onBuyStock(stock.symbol, shareCount)
                  }}
                >
                  <DollarSign className="h-3 w-3 mr-1" />
                  Buy
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
        {stocks.length === 0 && (
          <TableRow>
            <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
              <Target className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <div>No day trading opportunities in 9-13% range</div>
              <div className="text-xs mt-1">AI is scanning markets for optimal entry points</div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
