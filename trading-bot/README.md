# 🤖 Autonomous Trading Bot - $10 to $1M Challenge

This bot automatically trades stocks with the goal of turning $10 into $1,000,000.

## ⚡ Quick Start

1. **Get API Keys:**
   - Sign up at [Alpaca Markets](https://alpaca.markets) (free)
   - Get your Robinhood login credentials

2. **Configure Environment:**
   ```bash
   cp .env.example .env
   nano .env  # Add your API keys
   ```

3. **Start Trading:**
   ```bash
   ./start_live_trading.sh
   ```

## 🎯 How It Works

- Scans market every 10 seconds for opportunities
- Looks for stocks in 9-13% movement range
- Executes trades automatically with real money
- Uses 6% stop losses and 12% profit targets
- Compounds gains to grow account exponentially

## ⚠️ Important Notes

- **This trades with REAL MONEY**
- Start with paper trading (Alpaca default)
- Change Alpaca base_url for live trading
- Never invest more than you can afford to lose

## 🚀 Goal

Turn $10 into $1,000,000 through autonomous trading!
