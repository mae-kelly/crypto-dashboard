import { FeatureLayout } from "@/components/feature-layout"
import Image from "next/image"

export default function CrossDomainIntelligence() {
  return (
    <FeatureLayout
      title="Cross-Domain Intelligence"
      subtitle="AI that sees patterns across seemingly unrelated markets and domains"
    >
      <div className="space-y-12">
        {/* Hero Image */}
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=1200&h=600&fit=crop"
            alt="AI Network Visualization"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center">See What Others Miss</h2>
          </div>
        </div>

        {/* LENS Algorithm */}
        <div className="bg-dark-800 p-8 rounded-lg border border-dark-600 mb-12">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">LENS: Latent Emotional Network Synthesis</h3>
          <p className="text-gray-300 mb-6 leading-relaxed">
            PRISM's proprietary LENS algorithm processes millions of data points across hundreds of markets to identify
            emotional and behavioral patterns that traditional analysis misses. It doesn't just look at numbers—it
            understands the human psychology driving those numbers.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-100 mb-4">What LENS Detects</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Fear cascades across asset classes</li>
                <li>• Confidence patterns in unrelated sectors</li>
                <li>• Uncertainty spillovers between markets</li>
                <li>• Greed cycles and their cross-domain effects</li>
                <li>• Social sentiment momentum shifts</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-100 mb-4">Data Sources</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Real-time market movements</li>
                <li>• Social media sentiment analysis</li>
                <li>• News and media tone analysis</li>
                <li>• Political prediction markets</li>
                <li>• Sports betting patterns</li>
                <li>• Weather and climate data</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Pattern Examples */}
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-gray-100 text-center">Real Pattern Discoveries</h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-dark-700 p-6 rounded-lg">
              <h4 className="text-lg font-bold text-gray-100 mb-3">The Sports-Crypto Connection</h4>
              <p className="text-gray-300 text-sm mb-4">
                LENS discovered that major upsets in NFL games correlate with increased volatility in cryptocurrency
                markets 48-72 hours later.
              </p>
              <div className="text-xs text-gray-400">Correlation coefficient: +0.73 | Confidence: 94%</div>
            </div>

            <div className="bg-dark-700 p-6 rounded-lg">
              <h4 className="text-lg font-bold text-gray-100 mb-3">Weather-Energy Nexus</h4>
              <p className="text-gray-300 text-sm mb-4">
                Extreme weather events in Texas predict renewable energy stock movements with 89% accuracy within 5
                trading days.
              </p>
              <div className="text-xs text-gray-400">Correlation coefficient: +0.89 | Confidence: 97%</div>
            </div>

            <div className="bg-dark-700 p-6 rounded-lg">
              <h4 className="text-lg font-bold text-gray-100 mb-3">Political-Tech Sentiment</h4>
              <p className="text-gray-300 text-sm mb-4">
                Congressional tech hearings create predictable patterns in both social media stocks and privacy-focused
                cryptocurrencies.
              </p>
              <div className="text-xs text-gray-400">Correlation coefficient: +0.81 | Confidence: 92%</div>
            </div>

            <div className="bg-dark-700 p-6 rounded-lg">
              <h4 className="text-lg font-bold text-gray-100 mb-3">Cultural-Consumer Link</h4>
              <p className="text-gray-300 text-sm mb-4">
                Viral TikTok trends predict consumer discretionary spending patterns 2-3 weeks before they appear in
                retail data.
              </p>
              <div className="text-xs text-gray-400">Correlation coefficient: +0.76 | Confidence: 88%</div>
            </div>
          </div>
        </div>

        {/* AI Dashboard Preview */}
        <div className="bg-gradient-to-r from-dark-800 to-dark-700 p-8 rounded-lg border border-dark-600">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">Live Intelligence Dashboard</h3>
          <div className="bg-dark-900 p-6 rounded-lg font-mono text-sm space-y-4">
            <div className="text-green-400">ACTIVE PATTERN ALERTS</div>

            <div className="border-l-2 border-yellow-500 pl-4">
              <div className="text-yellow-400">⚠ EMERGING CORRELATION DETECTED</div>
              <div className="text-gray-300 text-xs mt-1">
                European energy crisis sentiment → US tech stock volatility
              </div>
              <div className="text-gray-400 text-xs">Strength: 0.84 | Confidence: 91% | Time lag: 18 hours</div>
            </div>

            <div className="border-l-2 border-blue-500 pl-4">
              <div className="text-blue-400">ℹ PATTERN STRENGTHENING</div>
              <div className="text-gray-300 text-xs mt-1">
                Climate activism → ESG fund inflows → Traditional energy shorts
              </div>
              <div className="text-gray-400 text-xs">Strength: 0.92 | Confidence: 96% | Time lag: 3-5 days</div>
            </div>

            <div className="border-l-2 border-red-500 pl-4">
              <div className="text-red-400">🔥 HIGH CONVICTION SIGNAL</div>
              <div className="text-gray-300 text-xs mt-1">
                Federal Reserve sentiment → Crypto fear index → Gold futures
              </div>
              <div className="text-gray-400 text-xs">Strength: 0.95 | Confidence: 98% | Time lag: 6-12 hours</div>
            </div>
          </div>
        </div>

        <blockquote className="text-xl italic text-gray-300 border-l-4 border-gray-600 pl-6">
          "LENS was revolutionary because it could quantify something previously thought unquantifiable: the emotional
          undercurrents driving market behavior across multiple domains simultaneously."
          <footer className="text-gray-400 mt-2">— Dr. Marcus Chen, Behavioral Economist</footer>
        </blockquote>
      </div>
    </FeatureLayout>
  )
}
