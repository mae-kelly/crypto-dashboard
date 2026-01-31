import { FeatureLayout } from "@/components/feature-layout"
import Image from "next/image"

export default function UnifiedBeliefArchitecture() {
  return (
    <FeatureLayout
      title="Unified Belief Architecture"
      subtitle="The revolutionary framework that connects your convictions across all markets"
    >
      <div className="space-y-12">
        {/* Hero Image */}
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=600&fit=crop"
            alt="Unified Belief Architecture Visualization"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center">
              One Platform. Infinite Connections.
            </h2>
          </div>
        </div>

        {/* Main Content */}
        <div className="prose prose-invert max-w-none">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-100 mb-4">The Problem</h3>
              <p className="text-gray-300 leading-relaxed">
                Traditional markets operate in silos. If you believe Tesla will revolutionize transportation, you need
                separate accounts for stocks, commodities, real estate, and more. Each investment exists in isolation,
                creating inefficiencies and missed opportunities.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-100 mb-4">The Solution</h3>
              <p className="text-gray-300 leading-relaxed">
                PRISM's Unified Belief Architecture creates a single ecosystem where all your convictions work together.
                Your belief about climate change can simultaneously inform positions across energy, agriculture, real
                estate, and insurance markets.
              </p>
            </div>
          </div>

          <div className="bg-dark-800 p-8 rounded-lg border border-dark-600 mb-12">
            <h3 className="text-2xl font-bold text-gray-100 mb-6">How It Works</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-gray-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-100 mb-2">Express Your Conviction</h4>
                  <p className="text-gray-300">
                    Input any belief about the future - from "AI will achieve AGI by 2030" to "Miami real estate will
                    decline 40% by 2035"
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-gray-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-100 mb-2">PRISM Maps Connections</h4>
                  <p className="text-gray-300">
                    Our AI identifies all markets and assets affected by your belief, showing interconnections you might
                    have missed
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-gray-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-100 mb-2">Unified Position Management</h4>
                  <p className="text-gray-300">
                    Manage all related positions from a single interface, with real-time updates showing how your
                    conviction performs across domains
                  </p>
                </div>
              </div>
            </div>
          </div>

          <blockquote className="text-xl italic text-gray-300 border-l-4 border-gray-600 pl-6 mb-8">
            "The fragmentation was the inefficiency. If you believe the Patriots will win the Super Bowl, that same
            conviction should inform your position on their sponsor's stock."
          </blockquote>

          <div className="bg-dark-700 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-100 mb-4">Real-World Example</h3>
            <p className="text-gray-300 mb-4">
              A PRISM user believes that remote work will permanently change urban real estate. Through the Unified
              Belief Architecture, this single conviction automatically creates connected positions across:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Commercial real estate REITs in major cities</li>
              <li>Residential real estate in suburban markets</li>
              <li>Video conferencing technology stocks</li>
              <li>Co-working space companies</li>
              <li>Urban transportation systems</li>
              <li>Home improvement and furniture retailers</li>
            </ul>
          </div>
        </div>
      </div>
    </FeatureLayout>
  )
}
