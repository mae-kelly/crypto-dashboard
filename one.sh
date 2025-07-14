#!/bin/bash

echo "🚀 Creating Real Autonomous Trading Bot Files..."

# Create directory structure
mkdir -p trading-bot
cd trading-bot

# Create the main trading bot
cat > autonomous_trading_bot.py << 'EOF'
import asyncio
import yfinance as yf
import numpy as np
import pandas as pd
import redis
import json
import time
import logging
import os
from typing import Dict, List, Optional
from datetime import datetime, timedelta
import requests
from dataclasses import dataclass
import alpaca_trade_api as tradeapi
import robin_stocks.robinhood as rh

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@dataclass
class Position:
    symbol: str
    shares: int
    entry_price: float
    entry_time: float
    stop_loss: float
    target_price: float
    strategy: str
    risk_amount: float
    broker: str
    order_id: str

class RealBrokerConnections:
    def __init__(self):
        try:
            # Alpaca connection (most reliable for algorithmic trading)
            self.alpaca_api = tradeapi.REST(
                os.getenv('ALPACA_API_KEY'),
                os.getenv('ALPACA_SECRET_KEY'),
                base_url='https://paper-api.alpaca.markets'  # Change to https://api.alpaca.markets for live
            )
            logger.info("✅ Connected to Alpaca")
        except Exception as e:
            logger.error(f"❌ Alpaca connection failed: {e}")
            self.alpaca_api = None
        
        try:
            # Robinhood connection
            rh.login(
                username=os.getenv('ROBINHOOD_USERNAME'),
                password=os.getenv('ROBINHOOD_PASSWORD')
            )
            logger.info("✅ Connected to Robinhood")
            self.robinhood_connected = True
        except Exception as e:
            logger.error(f"❌ Robinhood connection failed: {e}")
            self.robinhood_connected = False
        
        self.broker_rotation = ['alpaca', 'robinhood']
        self.current_broker_index = 0
    
    def get_next_broker(self):
        broker = self.broker_rotation[self.current_broker_index]
        self.current_broker_index = (self.current_broker_index + 1) % len(self.broker_rotation)
        return broker
    
    async def place_buy_order(self, symbol: str, quantity: int) -> Dict:
        broker = self.get_next_broker()
        
        try:
            if broker == 'alpaca' and self.alpaca_api:
                order = self.alpaca_api.submit_order(
                    symbol=symbol,
                    qty=quantity,
                    side='buy',
                    type='market',
                    time_in_force='day'
                )
                return {
                    'success': True,
                    'order_id': order.id,
                    'broker': 'alpaca',
                    'symbol': symbol,
                    'quantity': quantity
                }
                
            elif broker == 'robinhood' and self.robinhood_connected:
                order = rh.orders.order_buy_market(symbol, quantity)
                return {
                    'success': True,
                    'order_id': order['id'],
                    'broker': 'robinhood',
                    'symbol': symbol,
                    'quantity': quantity
                }
                
        except Exception as e:
            logger.error(f"❌ Error placing buy order with {broker}: {e}")
            return {'success': False, 'error': str(e)}
    
    async def place_sell_order(self, symbol: str, quantity: int, broker: str) -> Dict:
        try:
            if broker == 'alpaca' and self.alpaca_api:
                order = self.alpaca_api.submit_order(
                    symbol=symbol,
                    qty=quantity,
                    side='sell',
                    type='market',
                    time_in_force='day'
                )
                return {'success': True, 'order_id': order.id}
                
            elif broker == 'robinhood' and self.robinhood_connected:
                order = rh.orders.order_sell_market(symbol, quantity)
                return {'success': True, 'order_id': order['id']}
                
        except Exception as e:
            logger.error(f"❌ Error placing sell order with {broker}: {e}")
            return {'success': False, 'error': str(e)}
    
    def get_account_balance(self, broker: str) -> float:
        try:
            if broker == 'alpaca' and self.alpaca_api:
                account = self.alpaca_api.get_account()
                return float(account.cash)
                
            elif broker == 'robinhood' and self.robinhood_connected:
                profile = rh.profiles.load_account_profile()
                return float(profile['buying_power'])
                
        except Exception as e:
            logger.error(f"❌ Error getting balance from {broker}: {e}")
            return 0.0
    
    def get_total_balance(self) -> float:
        total = 0.0
        for broker in self.broker_rotation:
            total += self.get_account_balance(broker)
        return total

class AutonomousTradingBot:
    def __init__(self, starting_balance: float = 10.0):
        self.account_balance = starting_balance
        self.starting_balance = starting_balance
        self.positions = {}
        self.trade_history = []
        self.total_trades = 0
        self.winning_trades = 0
        
        # Initialize broker connections
        self.broker = RealBrokerConnections()
        
        # Risk management
        self.max_risk_per_trade = 0.15  # 15% risk per trade
        self.max_positions = 5
        
        logger.info(f"🤖 Autonomous Trading Bot initialized with ${starting_balance}")
        logger.info("🎯 GOAL: Turn $10 into $1,000,000")
    
    async def start_trading(self):
        logger.info("🚀 STARTING LIVE AUTONOMOUS TRADING...")
        
        # Main trading loop
        while True:
            try:
                # Update real account balance
                real_balance = self.broker.get_total_balance()
                if real_balance > 0:
                    self.account_balance = real_balance
                
                # Check if we've reached the goal
                if self.account_balance >= 1000000:
                    logger.info("🎉🎉🎉 MILLIONAIRE ACHIEVED! $1,000,000 REACHED! 🎉🎉🎉")
                    break
                
                # Safety check - stop if account too low
                if self.account_balance < self.starting_balance * 0.5:
                    logger.warning("⚠️ Account below safety threshold - reducing risk")
                    self.max_risk_per_trade = 0.05
                
                # Find trading opportunities
                opportunities = await self.scan_market()
                
                # Execute best trade if we have room for more positions
                if opportunities and len(self.positions) < self.max_positions:
                    await self.execute_trade(opportunities[0])
                
                # Manage existing positions
                await self.manage_positions()
                
                # Log progress
                self.log_progress()
                
                # Wait 10 seconds before next scan
                await asyncio.sleep(10)
                
            except KeyboardInterrupt:
                logger.info("🛑 Trading stopped by user")
                break
            except Exception as e:
                logger.error(f"❌ Error in trading loop: {e}")
                await asyncio.sleep(30)
    
    async def scan_market(self) -> List[Dict]:
        """Scan for trading opportunities"""
        opportunities = []
        
        try:
            # Get top market movers
            movers = await self.get_market_movers()
            
            for symbol in movers:
                opportunity = await self.analyze_stock(symbol)
                if opportunity and opportunity['score'] > 0.8:
                    opportunities.append(opportunity)
            
            opportunities.sort(key=lambda x: x['score'], reverse=True)
            return opportunities[:3]
            
        except Exception as e:
            logger.error(f"❌ Error scanning market: {e}")
            return []
    
    async def get_market_movers(self) -> List[str]:
        """Get stocks with significant movement"""
        try:
            # Yahoo Finance top gainers
            url = "https://query1.finance.yahoo.com/v1/finance/screener"
            
            payload = {
                "size": 25,
                "offset": 0,
                "sortField": "percentchange", 
                "sortType": "desc",
                "quoteType": "EQUITY",
                "query": {
                    "operator": "AND",
                    "operands": [
                        {"operator": "gt", "operands": ["percentchange", 8.0]},
                        {"operator": "gt", "operands": ["dayvolume", 500000]},
                        {"operator": "btwn", "operands": ["intradaymarketcap", 50000000, 50000000000]}
                    ]
                }
            }
            
            response = requests.post(url, json=payload, timeout=10)
            data = response.json()
            
            symbols = []
            for quote in data.get('finance', {}).get('result', [{}])[0].get('quotes', []):
                symbols.append(quote['symbol'])
            
            logger.info(f"📊 Found {len(symbols)} market movers")
            return symbols[:15]
            
        except Exception as e:
            logger.error(f"❌ Error getting market movers: {e}")
            # Fallback to popular stocks
            return ['AAPL', 'TSLA', 'NVDA', 'AMD', 'MSFT']
    
    async def analyze_stock(self, symbol: str) -> Optional[Dict]:
        """Analyze if stock is good for trading"""
        try:
            ticker = yf.Ticker(symbol)
            hist = ticker.history(period="1d", interval="1m")
            
            if hist.empty or len(hist) < 10:
                return None
            
            current_price = hist['Close'].iloc[-1]
            
            # Skip if price too low or too high
            if current_price < 2.0 or current_price > 500:
                return None
            
            # Calculate metrics
            price_change = (current_price - hist['Open'].iloc[0]) / hist['Open'].iloc[0] * 100
            volume_spike = hist['Volume'].iloc[-1] / hist['Volume'].mean() if hist['Volume'].mean() > 0 else 1
            
            # Score the opportunity
            score = 0.0
            
            # 9-13% threshold bonus
            if 9 <= abs(price_change) <= 13:
                score += 0.6
            elif abs(price_change) > 15:
                score += 0.4
            
            # Volume confirmation
            if volume_spike > 2:
                score += 0.3
            
            # Recent momentum
            if len(hist) >= 5:
                recent_change = (current_price - hist['Close'].iloc[-5]) / hist['Close'].iloc[-5] * 100
                if abs(recent_change) > 1:
                    score += 0.2
            
            if score > 0.7:
                return {
                    'symbol': symbol,
                    'score': score,
                    'current_price': current_price,
                    'price_change': price_change,
                    'volume_spike': volume_spike
                }
            
            return None
            
        except Exception as e:
            logger.error(f"❌ Error analyzing {symbol}: {e}")
            return None
    
    async def execute_trade(self, opportunity: Dict):
        """Execute a real trade"""
        symbol = opportunity['symbol']
        current_price = opportunity['current_price']
        
        try:
            # Calculate position size
            risk_amount = self.account_balance * self.max_risk_per_trade
            stop_loss_percent = 6  # 6% stop loss
            stop_loss_price = current_price * (1 - stop_loss_percent / 100)
            risk_per_share = current_price - stop_loss_price
            
            shares = int(risk_amount / risk_per_share) if risk_per_share > 0 else 1
            
            # Ensure minimum position
            if shares < 1:
                shares = 1
            
            # Check if we can afford it
            position_value = shares * current_price
            if position_value > self.account_balance * 0.8:
                shares = max(1, int((self.account_balance * 0.8) / current_price))
            
            logger.info(f"🔥 EXECUTING BUY: {shares} shares of {symbol} at ${current_price:.2f}")
            
            # Execute real buy order
            order_result = await self.broker.place_buy_order(symbol, shares)
            
            if order_result['success']:
                # Create position
                target_price = current_price * 1.12  # 12% profit target
                
                position = Position(
                    symbol=symbol,
                    shares=shares,
                    entry_price=current_price,
                    entry_time=time.time(),
                    stop_loss=stop_loss_price,
                    target_price=target_price,
                    strategy='MOMENTUM',
                    risk_amount=risk_amount,
                    broker=order_result['broker'],
                    order_id=order_result['order_id']
                )
                
                self.positions[symbol] = position
                self.total_trades += 1
                
                logger.info(f"✅ TRADE EXECUTED!")
                logger.info(f"📊 Target: ${target_price:.2f} | Stop: ${stop_loss_price:.2f}")
                logger.info(f"💰 Broker: {order_result['broker']}")
                
            else:
                logger.error(f"❌ TRADE FAILED: {order_result.get('error')}")
                
        except Exception as e:
            logger.error(f"❌ Error executing trade for {symbol}: {e}")
    
    async def manage_positions(self):
        """Manage existing positions"""
        for symbol, position in list(self.positions.items()):
            try:
                current_price = await self.get_current_price(symbol)
                if not current_price:
                    continue
                
                should_exit, reason = self.check_exit_conditions(position, current_price)
                
                if should_exit:
                    await self.close_position(position, current_price, reason)
                    
            except Exception as e:
                logger.error(f"❌ Error managing {symbol}: {e}")
    
    def check_exit_conditions(self, position: Position, current_price: float) -> tuple:
        """Check if we should exit position"""
        
        # Stop loss
        if current_price <= position.stop_loss:
            return True, "STOP_LOSS"
        
        # Profit target
        if current_price >= position.target_price:
            return True, "PROFIT_TARGET"
        
        # Time exit (max 3 hours)
        hold_time = time.time() - position.entry_time
        if hold_time > 10800:  # 3 hours
            return True, "TIME_EXIT"
        
        # Trailing stop
        if current_price > position.entry_price * 1.08:  # 8% profit
            new_stop = current_price * 0.95  # 5% trailing stop
            if new_stop > position.stop_loss:
                position.stop_loss = new_stop
                logger.info(f"📈 Trailing stop for {position.symbol}: ${new_stop:.2f}")
        
        return False, None
    
    async def close_position(self, position: Position, current_price: float, reason: str):
        """Close a position"""
        try:
            logger.info(f"🔄 CLOSING {position.symbol} - {reason}")
            
            # Execute sell order
            sell_result = await self.broker.place_sell_order(position.symbol, position.shares, position.broker)
            
            if sell_result['success']:
                # Calculate P&L
                profit_loss = (current_price - position.entry_price) * position.shares
                profit_percent = (current_price - position.entry_price) / position.entry_price * 100
                
                if profit_loss > 0:
                    self.winning_trades += 1
                
                # Remove position
                self.positions.pop(position.symbol, None)
                
                logger.info(f"✅ POSITION CLOSED!")
                logger.info(f"💰 P&L: ${profit_loss:.2f} ({profit_percent:.2f}%)")
                
            else:
                logger.error(f"❌ FAILED TO CLOSE: {sell_result.get('error')}")
                
        except Exception as e:
            logger.error(f"❌ Error closing {position.symbol}: {e}")
    
    async def get_current_price(self, symbol: str) -> Optional[float]:
        try:
            ticker = yf.Ticker(symbol)
            data = ticker.history(period="1d", interval="1m")
            if not data.empty:
                return data['Close'].iloc[-1]
        except:
            pass
        return None
    
    def log_progress(self):
        """Log current progress"""
        win_rate = (self.winning_trades / self.total_trades * 100) if self.total_trades > 0 else 0
        total_return = ((self.account_balance - self.starting_balance) / self.starting_balance * 100)
        progress_to_million = (self.account_balance / 1000000) * 100
        
        logger.info(f"🤖 === BOT STATUS ===")
        logger.info(f"💰 Balance: ${self.account_balance:.2f}")
        logger.info(f"📈 Return: {total_return:.2f}%")
        logger.info(f"🎯 Progress to $1M: {progress_to_million:.4f}%")
        logger.info(f"🏆 Win Rate: {win_rate:.1f}%")
        logger.info(f"📊 Total Trades: {self.total_trades}")
        logger.info(f"🔥 Active Positions: {len(self.positions)}")
        logger.info(f"==================")

async def main():
    bot = AutonomousTradingBot(starting_balance=10.0)
    await bot.start_trading()

if __name__ == "__main__":
    asyncio.run(main())
EOF

# Create requirements file
cat > requirements.txt << 'EOF'
alpaca-trade-api==3.1.1
robin-stocks==3.0.5
yfinance==0.2.22
pandas==2.1.3
numpy==1.24.4
requests==2.31.0
python-dotenv==1.0.0
redis==5.0.1
asyncio==3.4.3
EOF

# Create environment file template
cat > .env.example << 'EOF'
# Alpaca API (Get from https://alpaca.markets)
ALPACA_API_KEY=your_alpaca_api_key_here
ALPACA_SECRET_KEY=your_alpaca_secret_key_here

# Robinhood Login
ROBINHOOD_USERNAME=your_robinhood_email
ROBINHOOD_PASSWORD=your_robinhood_password

# Optional: Discord webhook for notifications
DISCORD_WEBHOOK_URL=your_discord_webhook_url
EOF

# Create the actual startup script
cat > start_live_trading.sh << 'EOF'
#!/bin/bash

echo "🤖 AUTONOMOUS TRADING BOT - $10 TO $1M CHALLENGE"
echo "=================================================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    echo "📝 Copy .env.example to .env and add your API keys:"
    echo "   cp .env.example .env"
    echo "   nano .env"
    echo ""
    echo "🔑 You need:"
    echo "   - Alpaca API key (free at alpaca.markets)"
    echo "   - Robinhood login credentials"
    exit 1
fi

# Install requirements
echo "📦 Installing requirements..."
pip install -r requirements.txt

# Load environment variables
export $(cat .env | grep -v '^#' | xargs)

# Check for API keys
if [ -z "$ALPACA_API_KEY" ] || [ -z "$ROBINHOOD_USERNAME" ]; then
    echo "❌ Missing API keys in .env file!"
    echo "📝 Please configure your .env file with valid API keys"
    exit 1
fi

echo "✅ Environment configured"
echo ""
echo "🚀 STARTING LIVE TRADING BOT..."
echo "💰 Starting balance: $10"
echo "🎯 Goal: $1,000,000"
echo "⚠️  This bot trades with REAL MONEY!"
echo ""
echo "Press Ctrl+C to stop trading"
echo ""

# Start the bot
python3 autonomous_trading_bot.py
EOF

# Make startup script executable
chmod +x start_live_trading.sh

# Create setup instructions
cat > README.md << 'EOF'
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
EOF

echo ""
echo "✅ ALL FILES CREATED SUCCESSFULLY!"
echo ""
echo "📁 Created files:"
echo "   - autonomous_trading_bot.py (main bot)"
echo "   - start_live_trading.sh (startup script)"
echo "   - requirements.txt (dependencies)"
echo "   - .env.example (API key template)"
echo "   - README.md (instructions)"
echo ""
echo "🚀 NEXT STEPS:"
echo "1. Copy API keys: cp .env.example .env"
echo "2. Edit .env file: nano .env"
echo "3. Start trading: ./start_live_trading.sh"
echo ""
echo "🎯 GOAL: Turn $10 into $1,000,000!"