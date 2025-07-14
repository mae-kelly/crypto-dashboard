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
