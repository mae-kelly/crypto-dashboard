import { FeatureLayout } from "@/components/feature-layout"
import Image from "next/image"

export default function ConvictionContracts() {
  return (
    <FeatureLayout
      title="Conviction Contracts"
      subtitle="Transform any belief about the future into a tradable financial instrument"
    >
      <div className="space-y-12">
        {/* Hero Image */}
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=600&fit=crop"
            alt="Conviction Contracts Trading Interface"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center">Your Beliefs. Your Profits.</h2>
          </div>
        </div>

        {/* Contract Types */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-dark-800 p-6 rounded-lg border border-dark-600">
            <h3 className="text-xl font-bold text-gray-100 mb-3">Simple Contracts</h3>
            <p className="text-gray-300 text-sm mb-4">Straightforward predictions with clear outcomes</p>
            <div className="bg-dark-700 p-3 rounded text-sm text-gray-300">
              "Tesla stock will exceed $500 by December 2024"
            </div>
          </div>
          <div className="bg-dark-800 p-6 rounded-lg border border-dark-600">
            <h3 className="text-xl font-bold text-gray-100 mb-3">Complex Contracts</h3>
            <p className="text-gray-300 text-sm mb-4">Multi-variable predictions with nuanced outcomes</p>
            <div className="bg-dark-700 p-3 rounded text-sm text-gray-300">
              "Quantum computing will achieve practical supremacy before AGI"
            </div>
          </div>
          <div className="bg-dark-800 p-6 rounded-lg border border-dark-600">
            <h3 className="text-xl font-bold text-gray-100 mb-3">Composite Contracts</h3>
            <p className="text-gray-300 text-sm mb-4">Bundled beliefs that move together</p>
            <div className="bg-dark-700 p-3 rounded text-sm text-gray-300">
              "Climate Bundle: Sea levels + Carbon prices + Green energy adoption"
            </div>
          </div>
        </div>

        {/* How Pricing Works */}
        <div className="bg-dark-800 p-8 rounded-lg border border-dark-600 mb-12">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">Dynamic Pricing Engine</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-100 mb-4">Market Forces</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Supply and demand from other traders</li>
                <li>• Historical accuracy of similar predictions</li>
                <li>• Real-time data feeds and news sentiment</li>
                <li>• Cross-market correlation analysis</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-100 mb-4">AI Enhancement</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Pattern recognition across domains</li>
                <li>• Behavioral psychology modeling</li>
                <li>• Risk assessment algorithms</li>
                <li>• Liquidity optimization</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Trading Example */}
        <div className="bg-gradient-to-r from-dark-800 to-dark-700 p-8 rounded-lg border border-dark-600">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">Live Trading Example</h3>
          <div className="bg-dark-900 p-6 rounded-lg font-mono text-sm">
            <div className="text-green-400 mb-2">CONTRACT: "Bitcoin reaches $100K by Q2 2024"</div>
            <div className="text-gray-300 mb-1">Current Price: $0.23 (23% probability)</div>
            <div className="text-gray-300 mb-1">24h Volume: $2.4M</div>
            <div className="text-gray-300 mb-1">Your Position: 10,000 contracts @ $0.18</div>
            <div className="text-blue-400 mb-4">Unrealized P&L: +$500 (+2.8%)</div>

            <div className="border-t border-gray-600 pt-4">
              <div className="text-yellow-400 mb-2">RELATED POSITIONS (Auto-suggested):</div>
              <div className="text-gray-300 text-xs space-y-1">
                <div>• MicroStrategy stock correlation: +0.87</div>
                <div>• Gold futures inverse correlation: -0.62</div>
                <div>• Crypto mining stocks correlation: +0.91</div>
              </div>
            </div>
          </div>
        </div>

        <blockquote className="text-xl italic text-gray-300 border-l-4 border-gray-600 pl-6">
          "Every conviction contract represents someone's genuine belief about the future. When you trade these
          contracts, you're not just speculating—you're participating in humanity's collective intelligence about what's
          coming next."
          <footer className="text-gray-400 mt-2">— Dr. Elena Vostok, PRISM Co-founder</footer>
        </blockquote>
      </div>
    </FeatureLayout>
  )
}
