"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Zap, Target, Brain, Activity } from "lucide-react"

interface LiveStockData {
  symbol: string
  price: number
  change: number
  changePercent: number
  thresholdPercent: number
  accelerationPerMinute: number
  volume: number
  volumeSpike: number
  volatility: number
  momentum: number
  inThresholdRange: boolean
  updateFrequency: number
  lastUpdate: number
  source: string
}

interface LiveMetrics {
  totalUpdatesPerSecond: number
  activeSignals: number
  profitOpportunities: number
  systemLatency: number
}

export function LiveDashboard() {
  const [liveData, setLiveData] = useState<Record<string, LiveStockData>>({})
  const [metrics, setMetrics] = useState<LiveMetrics>({
    totalUpdatesPerSecond: 0,
    activeSignals: 0,
    profitOpportunities: 0,
    systemLatency: 0
  })
  const [isConnected, setIsConnected] = useState(false)
  const [updateCount, setUpdateCount] = useState(0)
  const wsRef = useRef<WebSocket | null>(null)
  const lastUpdateRef = useRef(Date.now())

  useEffect(() => {
    connectToLiveStream()
    
    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [])

  const connectToLiveStream = () => {
    try {
      const ws = new WebSocket(process.env.NEXT_PUBLIC_LIVE_WS_ENDPOINT || 'ws://localhost:9001')
      wsRef.current = ws

      ws.onopen = () => {
        setIsConnected(true)
        ws.send(JSON.stringify({
          action: 'subscribe_live_data',
          symbols: [
            'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA', 'NFLX',
            'AMD', 'INTC', 'PYPL', 'ADBE', 'CRM', 'ORCL', 'IBM', 'UBER'
          ]
        }))
      }

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          handleLiveUpdate(data)
        } catch (error) {
          console.error('Error parsing live data:', error)
        }
      }

      ws.onclose = () => {
        setIsConnected(false)
        // Reconnect after 1 second
        setTimeout(connectToLiveStream, 1000)
      }

      ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        setIsConnected(false)
      }

    } catch (error) {
      console.error('Failed to connect to live stream:', error)
      setTimeout(connectToLiveStream, 2000)
    }
  }

  const handleLiveUpdate = (data: any) => {
    const now = Date.now()
    
    if (data.type === 'price_update') {
      setLiveData(prev => ({
        ...prev,
        [data.symbol]: {
          symbol: data.symbol,
          price: data.price,
          change: data.change,
          changePercent: data.changePercent || (data.change / data.price * 100),
          thresholdPercent: data.thresholdPercent || 0,
          accelerationPerMinute: data.accelerationPerMinute || 0,
          volume: data.volume,
          volumeSpike: data.volumeSpike || 1,
          volatility: data.volatility || 0,
          momentum: data.momentum || 0,
          inThresholdRange: data.inThresholdRange || false,
          updateFrequency: data.updateFrequency || 0,
          lastUpdate: now,
          source: data.source
        }
      }))

      setUpdateCount(prev => prev + 1)
      
      // Calculate updates per second
      const timeSinceLastUpdate = now - lastUpdateRef.current
      if (timeSinceLastUpdate >= 1000) {
        const updatesThisSecond = updateCount
        setMetrics(prev => ({
          ...prev,
          totalUpdatesPerSecond: updatesThisSecond,
          systemLatency: now - data.timestamp
        }))
        setUpdateCount(0)
        lastUpdateRef.current = now
      }
    }
    
    if (data.type === 'system_metrics') {
      setMetrics(prev => ({
        ...prev,
        activeSignals: data.activeSignals,
        profitOpportunities: data.profitOpportunities
      }))
    }
  }

  const getConnectionIndicator = () => {
    if (isConnected) {
      return <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
    }
    return <div className="h-2 w-2 bg-red-500 rounded-full" />
  }

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-green-400"
    if (change < 0) return "text-red-400"
    return "text-gray-400"
  }

  const getThresholdBadge = (stock: LiveStockData) => {
    if (!stock.inThresholdRange) return null
    
    const isStrong = Math.abs(stock.thresholdPercent) >= 11
    return (
      <Badge className={isStrong ? "bg-green-600" : "bg-blue-600"}>
        {stock.thresholdPercent.toFixed(1)}%
      </Badge>
    )
  }

  const thresholdStocks = Object.values(liveData).filter(stock => stock.inThresholdRange)
  const strongSignals = thresholdStocks.filter(stock => Math.abs(stock.accelerationPerMinute) > 1)

  return (
    <div className="min-h-screen bg-black text-white p-4">
      {/* System Status Bar */}
      <div className="flex items-center justify-between mb-4 p-3 bg-gray-900 rounded">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {getConnectionIndicator()}
            <span className="text-sm">
              {isConnected ? 'LIVE' : 'RECONNECTING'}
            </span>
          </div>
          <div className="text-sm">
            <span className="text-green-400">{metrics.totalUpdatesPerSecond}</span> updates/sec
          </div>
          <div className="text-sm">
            Latency: <span className="text-blue-400">{metrics.systemLatency}ms</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div>
            Signals: <span className="text-yellow-400">{metrics.activeSignals}</span>
          </div>
          <div>
            Opportunities: <span className="text-green-400">{metrics.profitOpportunities}</span>
          </div>
        </div>
      </div>

      {/* 9-13% Threshold Stocks */}
      <Card className="mb-6 p-4 border-orange-500">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Target className="h-6 w-6 text-orange-500" />
            9-13% Threshold Stocks (Buy Now)
          </h2>
          <Badge variant="outline" className="text-orange-400 border-orange-400">
            {thresholdStocks.length} active
          </Badge>
        </div>

        <div className="grid gap-2">
          {thresholdStocks.map((stock) => (
            <div key={stock.symbol} className="flex items-center justify-between p-3 bg-gray-800 rounded border-l-4 border-orange-500">
              <div className="flex items-center gap-4">
                <div className="font-bold text-lg">{stock.symbol}</div>
                <div className="text-xl font-mono">${stock.price.toFixed(2)}</div>
                <div className={`flex items-center gap-1 ${getChangeColor(stock.change)}`}>
                  {stock.change > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span>{stock.changePercent.toFixed(2)}%</span>
                </div>
                {getThresholdBadge(stock)}
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Zap className="h-3 w-3 text-yellow-400" />
                  <span>{stock.accelerationPerMinute.toFixed(2)}/min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Activity className="h-3 w-3 text-blue-400" />
                  <span>{stock.updateFrequency.toFixed(0)}/min</span>
                </div>
                <div className="text-xs text-gray-400">
                  {stock.source}
                </div>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  BUY
                </Button>
              </div>
            </div>
          ))}
          
          {thresholdStocks.length === 0 && (
            <div className="text-center text-gray-400 py-8">
              <Target className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <div>No stocks in 9-13% threshold range</div>
              <div className="text-xs mt-1">System scanning for opportunities...</div>
            </div>
          )}
        </div>
      </Card>

      {/* All Live Stocks Grid */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Live Market Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {Object.values(liveData)
            .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
            .map((stock) => (
            <div key={stock.symbol} className={`p-3 rounded border ${stock.inThresholdRange ? 'border-orange-500 bg-orange-900/20' : 'border-gray-600 bg-gray-800'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold">{stock.symbol}</span>
                <span className="text-xs text-gray-400">
                  {Math.floor((Date.now() - stock.lastUpdate) / 1000)}s
                </span>
              </div>
              
              <div className="text-lg font-mono mb-1">${stock.price.toFixed(2)}</div>
              
              <div className={`text-sm ${getChangeColor(stock.change)}`}>
                {stock.change > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
              </div>
              
              <div className="text-xs text-gray-400 mt-2">
                Vol: {stock.volumeSpike.toFixed(1)}x | Accel: {stock.accelerationPerMinute.toFixed(2)}
              </div>
              
              {stock.inThresholdRange && (
                <Badge className="mt-1 bg-orange-600 text-xs">
                  {stock.thresholdPercent.toFixed(1)}% THRESHOLD
                </Badge>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
