import { FeatureLayout } from "@/components/feature-layout"
import Image from "next/image"
import { Shield, Lock, Eye, Server } from "lucide-react"

export default function InstitutionalSecurity() {
  return (
    <FeatureLayout
      title="Institutional Security"
      subtitle="Bank-grade security architecture built for the world's most demanding investors"
    >
      <div className="space-y-12">
        {/* Hero Image */}
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop"
            alt="Cybersecurity Infrastructure"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center">Fort Knox for the Digital Age</h2>
          </div>
        </div>

        {/* Security Pillars */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-dark-800 p-6 rounded-lg border border-dark-600 text-center">
            <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-100 mb-2">Quantum-Resistant</h3>
            <p className="text-gray-300 text-sm">
              Encryption that remains secure even against future quantum computers
            </p>
          </div>
          <div className="bg-dark-800 p-6 rounded-lg border border-dark-600 text-center">
            <Lock className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-100 mb-2">Zero-Trust</h3>
            <p className="text-gray-300 text-sm">Every access request verified regardless of location or credentials</p>
          </div>
          <div className="bg-dark-800 p-6 rounded-lg border border-dark-600 text-center">
            <Eye className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-100 mb-2">24/7 Monitoring</h3>
            <p className="text-gray-300 text-sm">AI-powered threat detection with human oversight around the clock</p>
          </div>
          <div className="bg-dark-800 p-6 rounded-lg border border-dark-600 text-center">
            <Server className="w-12 h-12 text-orange-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-100 mb-2">Distributed</h3>
            <p className="text-gray-300 text-sm">
              Geographically distributed infrastructure with no single point of failure
            </p>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="bg-dark-800 p-8 rounded-lg border border-dark-600 mb-12">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">Technical Architecture</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-100 mb-4">Encryption Standards</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• AES-256 for data at rest</li>
                <li>• TLS 1.3 for data in transit</li>
                <li>• Post-quantum cryptography (CRYSTALS-Kyber)</li>
                <li>• Hardware Security Modules (HSMs)</li>
                <li>• Perfect Forward Secrecy</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-100 mb-4">Access Controls</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Multi-factor authentication (MFA)</li>
                <li>• Biometric verification</li>
                <li>• Hardware security keys</li>
                <li>• Role-based access control (RBAC)</li>
                <li>• Time-based access restrictions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Compliance & Certifications */}
        <div className="bg-gradient-to-r from-dark-800 to-dark-700 p-8 rounded-lg border border-dark-600 mb-12">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">Compliance & Certifications</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-dark-900 p-4 rounded-lg mb-3">
                <div className="text-2xl font-bold text-blue-400">SOC 2</div>
                <div className="text-xs text-gray-400">Type II</div>
              </div>
              <p className="text-gray-300 text-sm">Security, availability, and confidentiality controls</p>
            </div>
            <div className="text-center">
              <div className="bg-dark-900 p-4 rounded-lg mb-3">
                <div className="text-2xl font-bold text-green-400">ISO 27001</div>
                <div className="text-xs text-gray-400">Certified</div>
              </div>
              <p className="text-gray-300 text-sm">Information security management systems</p>
            </div>
            <div className="text-center">
              <div className="bg-dark-900 p-4 rounded-lg mb-3">
                <div className="text-2xl font-bold text-purple-400">GDPR</div>
                <div className="text-xs text-gray-400">Compliant</div>
              </div>
              <p className="text-gray-300 text-sm">European data protection regulations</p>
            </div>
          </div>
        </div>

        {/* Security Operations Center */}
        <div className="bg-dark-700 p-8 rounded-lg border border-dark-600">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">Security Operations Center</h3>
          <div className="bg-dark-900 p-6 rounded-lg font-mono text-sm space-y-3">
            <div className="text-green-400">PRISM-SOC DASHBOARD - LIVE STATUS</div>
            <div className="border-b border-gray-700 pb-2"></div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-blue-400 mb-2">THREAT MONITORING</div>
                <div className="text-gray-300 text-xs space-y-1">
                  <div>• Active threats blocked: 1,247 (last 24h)</div>
                  <div>• Suspicious login attempts: 23 (blocked)</div>
                  <div>• DDoS attempts: 0 (last 7 days)</div>
                  <div>• Malware signatures: 0 detected</div>
                </div>
              </div>
              <div>
                <div className="text-yellow-400 mb-2">SYSTEM STATUS</div>
                <div className="text-gray-300 text-xs space-y-1">
                  <div>• Uptime: 99.99% (365 days)</div>
                  <div>• Response time: 12ms avg</div>
                  <div>• Data centers: 7 active, 0 issues</div>
                  <div>• Backup systems: 100% operational</div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-3">
              <div className="text-green-400">✓ ALL SYSTEMS SECURE</div>
              <div className="text-gray-400 text-xs">Last security audit: Passed (Q4 2024)</div>
            </div>
          </div>
        </div>

        <blockquote className="text-xl italic text-gray-300 border-l-4 border-gray-600 pl-6">
          "When you're managing billions in assets for the world's most sophisticated investors, security isn't just a
          feature—it's the foundation everything else is built on."
          <footer className="text-gray-400 mt-2">— David Kim, Chief Security Officer</footer>
        </blockquote>
      </div>
    </FeatureLayout>
  )
}
