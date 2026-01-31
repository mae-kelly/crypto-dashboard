"use client"

import { SleekDashboardLayout } from "@/components/sleek-dashboard-layout"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, Lock, Eye, AlertTriangle, CheckCircle, Activity, Target, Zap, ArrowUpRight } from "lucide-react"

export default function InstitutionalSecurityDashboard() {
  const [securityMetrics, setSecurityMetrics] = useState({
    threatsBlocked: 1247,
    uptime: 99.99,
    responseTime: 12,
    activeSessions: 847,
    datacenters: 7,
    lastAudit: "Q4 2024",
    securityScore: 98.7,
    vulnerabilities: 0,
    incidentResponse: 4.2,
  })

  const [threats, setThreats] = useState([
    {
      id: 1,
      type: "DDoS Attempt",
      severity: "high",
      status: "blocked",
      timestamp: "2024-01-15 14:23:45",
      source: "Multiple IPs",
      action: "Auto-blocked via WAF",
      impact: "None",
      responseTime: 0.3,
    },
    {
      id: 2,
      type: "Suspicious Login",
      severity: "medium",
      status: "investigating",
      timestamp: "2024-01-15 13:45:12",
      source: "Unknown Location",
      action: "MFA Challenge Sent",
      impact: "Minimal",
      responseTime: 1.2,
    },
    {
      id: 3,
      type: "API Rate Limit",
      severity: "low",
      status: "resolved",
      timestamp: "2024-01-15 12:30:08",
      source: "Automated System",
      action: "Rate Limited",
      impact: "None",
      responseTime: 0.1,
    },
  ])

  const [systemStatus, setSystemStatus] = useState([
    { name: "Authentication Service", status: "operational", uptime: 99.99, responseTime: 8, load: 67 },
    { name: "Trading Engine", status: "operational", uptime: 99.98, responseTime: 15, load: 78 },
    { name: "Data Processing", status: "operational", uptime: 100.0, responseTime: 5, load: 45 },
    { name: "Backup Systems", status: "operational", uptime: 99.97, responseTime: 12, load: 23 },
    { name: "Monitoring", status: "operational", uptime: 100.0, responseTime: 3, load: 34 },
  ])

  const [realtimeEvents, setRealtimeEvents] = useState([
    {
      id: 1,
      event: "FIREWALL RULE UPDATED",
      severity: "info",
      time: "14:23:45",
      details: "New geo-blocking rule applied",
    },
    {
      id: 2,
      event: "INTRUSION ATTEMPT BLOCKED",
      severity: "warning",
      time: "14:21:12",
      details: "SQL injection attempt from 192.168.1.1",
    },
    {
      id: 3,
      event: "SECURITY SCAN COMPLETED",
      severity: "success",
      time: "14:18:33",
      details: "Zero vulnerabilities detected",
    },
  ])

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSecurityMetrics((prev) => ({
        ...prev,
        threatsBlocked: prev.threatsBlocked + (Math.random() > 0.9 ? 1 : 0),
        activeSessions: prev.activeSessions + Math.floor((Math.random() - 0.5) * 10),
        responseTime: Math.max(8, Math.min(20, prev.responseTime + (Math.random() - 0.5) * 2)),
        securityScore: Math.max(95, Math.min(100, prev.securityScore + (Math.random() - 0.5) * 0.5)),
      }))

      // Add new real-time event occasionally
      if (Math.random() > 0.95) {
        const events = [
          "THREAT SIGNATURE UPDATED",
          "ACCESS CONTROL VERIFIED",
          "ENCRYPTION KEY ROTATED",
          "BACKUP VERIFICATION COMPLETE",
          "SECURITY AUDIT PASSED",
        ]
        const newEvent = {
          id: Date.now(),
          event: events[Math.floor(Math.random() * events.length)],
          severity: Math.random() > 0.7 ? "success" : "info",
          time: new Date().toLocaleTimeString(),
          details: "Automated security protocol executed successfully",
        }
        setRealtimeEvents((prev) => [newEvent, ...prev.slice(0, 4)])
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-white border-white"
      case "medium":
        return "text-neutral-300 border-neutral-600"
      case "low":
        return "text-neutral-400 border-neutral-700"
      default:
        return "text-neutral-500 border-neutral-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "blocked":
        return "bg-white text-black"
      case "investigating":
        return "bg-neutral-600 text-white"
      case "resolved":
        return "bg-neutral-800 text-white"
      default:
        return "bg-neutral-900 text-neutral-400"
    }
  }

  const getEventSeverityColor = (severity: string) => {
    switch (severity) {
      case "success":
        return "text-white"
      case "warning":
        return "text-neutral-300"
      case "info":
        return "text-neutral-400"
      default:
        return "text-neutral-500"
    }
  }

  return (
    <SleekDashboardLayout
      title="Institutional Security"
      subtitle="Real-time threat protection and institutional-grade security monitoring"
    >
      <div className="space-y-6 sm:space-y-8">
        {/* Security Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          <Card className="bg-neutral-950 border-neutral-800 hover:border-neutral-700 transition-colors">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <Shield className="w-4 h-4 text-neutral-400" />
                <div className="text-[10px] sm:text-xs text-neutral-500 font-mono">THREATS</div>
              </div>
              <div className="text-xl sm:text-2xl font-extralight text-white">{securityMetrics.threatsBlocked}</div>
              <div className="text-[10px] sm:text-xs text-neutral-400">blocked today</div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-950 border-neutral-800 hover:border-neutral-700 transition-colors">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <Target className="w-4 h-4 text-neutral-400" />
                <div className="text-[10px] sm:text-xs text-neutral-500 font-mono">SCORE</div>
              </div>
              <div className="text-xl sm:text-2xl font-extralight text-white">{securityMetrics.securityScore.toFixed(1)}</div>
              <div className="flex items-center text-[10px] sm:text-xs text-neutral-400">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                +0.3 today
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-950 border-neutral-800 hover:border-neutral-700 transition-colors">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <Activity className="w-4 h-4 text-neutral-400" />
                <div className="text-[10px] sm:text-xs text-neutral-500 font-mono">UPTIME</div>
              </div>
              <div className="text-xl sm:text-2xl font-extralight text-white">{securityMetrics.uptime}%</div>
              <div className="text-[10px] sm:text-xs text-neutral-400">365 days</div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-950 border-neutral-800 hover:border-neutral-700 transition-colors">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <Zap className="w-4 h-4 text-neutral-400" />
                <div className="text-[10px] sm:text-xs text-neutral-500 font-mono">RESPONSE</div>
              </div>
              <div className="text-xl sm:text-2xl font-extralight text-white">{securityMetrics.responseTime}ms</div>
              <div className="text-[10px] sm:text-xs text-neutral-400">avg response</div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-950 border-neutral-800 hover:border-neutral-700 transition-colors">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <Eye className="w-4 h-4 text-neutral-400" />
                <div className="text-[10px] sm:text-xs text-neutral-500 font-mono">SESSIONS</div>
              </div>
              <div className="text-xl sm:text-2xl font-extralight text-white">{securityMetrics.activeSessions}</div>
              <div className="text-[10px] sm:text-xs text-neutral-400">active</div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-950 border-neutral-800 hover:border-neutral-700 transition-colors">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-4 h-4 text-neutral-400" />
                <div className="text-[10px] sm:text-xs text-neutral-500 font-mono">VULNS</div>
              </div>
              <div className="text-xl sm:text-2xl font-extralight text-white">{securityMetrics.vulnerabilities}</div>
              <div className="text-[10px] sm:text-xs text-neutral-400">detected</div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-950 border-neutral-800 hover:border-neutral-700 transition-colors col-span-2 sm:col-span-1">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <Lock className="w-4 h-4 text-neutral-400" />
                <div className="text-[10px] sm:text-xs text-neutral-500 font-mono">CENTERS</div>
              </div>
              <div className="text-xl sm:text-2xl font-extralight text-white">{securityMetrics.datacenters}</div>
              <div className="text-[10px] sm:text-xs text-neutral-400">operational</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Threat Monitor */}
          <Card className="bg-neutral-950 border-neutral-800">
            <CardHeader className="border-b border-neutral-900">
              <CardTitle className="text-white font-light flex items-center text-sm sm:text-base">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-neutral-400" />
                Live Threat Monitor
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {threats.map((threat, index) => (
                  <div
                    key={threat.id}
                    className={`p-4 sm:p-6 border-b border-neutral-900 ${index === threats.length - 1 ? "border-b-0" : ""}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-2 text-neutral-400" />
                        <h3 className="font-light text-white text-sm">{threat.type}</h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant="outline"
                          className={`text-xs ${getSeverityColor(threat.severity)} bg-transparent`}
                        >
                          {threat.severity.toUpperCase()}
                        </Badge>
                        <Badge className={`text-xs ${getStatusColor(threat.status)}`}>
                          {threat.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs mb-4">
                      <div>
                        <span className="text-neutral-500 font-mono">SOURCE</span>
                        <div className="text-white font-mono">{threat.source}</div>
                      </div>
                      <div>
                        <span className="text-neutral-500 font-mono">ACTION</span>
                        <div className="text-white font-mono">{threat.action}</div>
                      </div>
                      <div>
                        <span className="text-neutral-500 font-mono">IMPACT</span>
                        <div className="text-white font-mono">{threat.impact}</div>
                      </div>
                      <div>
                        <span className="text-neutral-500 font-mono">RESPONSE TIME</span>
                        <div className="text-white font-mono">{threat.responseTime}s</div>
                      </div>
                    </div>

                    <div className="text-xs text-neutral-500 font-mono">DETECTED: {threat.timestamp}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="bg-neutral-950 border-neutral-800">
            <CardHeader className="border-b border-neutral-900">
              <CardTitle className="text-white font-light flex items-center text-sm sm:text-base">
                <Activity className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-neutral-400" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {systemStatus.map((system, index) => (
                  <div
                    key={index}
                    className={`p-4 sm:p-6 border-b border-neutral-900 ${index === systemStatus.length - 1 ? "border-b-0" : ""}`}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-white" />
                        <h3 className="font-light text-white text-sm">{system.name}</h3>
                      </div>
                      <Badge className="bg-white text-black text-xs font-mono">{system.status.toUpperCase()}</Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs mb-3">
                      <div>
                        <span className="text-neutral-500 font-mono">UPTIME</span>
                        <div className="flex items-center mt-1">
                          <Progress value={system.uptime} className="flex-1 h-1 bg-neutral-900 mr-2" />
                          <span className="text-white font-mono">{system.uptime}%</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-neutral-500 font-mono">RESPONSE</span>
                        <div className="text-white font-mono">{system.responseTime}ms</div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-neutral-500 font-mono">LOAD</span>
                        <span className="text-white font-mono">{system.load}%</span>
                      </div>
                      <Progress value={system.load} className="h-1 bg-neutral-900" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Real-time Events */}
          <Card className="bg-neutral-950 border-neutral-800">
            <CardHeader className="border-b border-neutral-900">
              <CardTitle className="text-white font-light flex items-center text-sm sm:text-base">
                <Eye className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-neutral-400" />
                Real-time Events
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {realtimeEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className={`p-4 border-b border-neutral-900 ${index === realtimeEvents.length - 1 ? "border-b-0" : ""}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className={`font-light text-xs ${getEventSeverityColor(event.severity)}`}>{event.event}</h3>
                        <div className="text-xs text-neutral-500 font-mono mt-1">{event.time}</div>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs border-neutral-700 bg-transparent ${getEventSeverityColor(event.severity)}`}
                      >
                        {event.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-xs text-neutral-400">{event.details}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Operations Center */}
        <Card className="bg-neutral-950 border-neutral-800">
          <CardHeader className="border-b border-neutral-900">
            <CardTitle className="text-white font-light text-sm sm:text-base">Security Operations Center</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="bg-black p-4 sm:p-6 rounded border border-neutral-900 font-mono text-xs sm:text-sm space-y-4">
              <div className="text-white font-light text-xs sm:text-sm">PRISM-SOC DASHBOARD — LIVE STATUS</div>
              <div className="border-b border-neutral-800"></div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-[10px] sm:text-xs">
                <div>
                  <div className="text-neutral-400 mb-2 sm:mb-3 font-mono">THREAT MONITORING</div>
                  <div className="text-neutral-300 space-y-1 sm:space-y-2">
                    <div>• Blocked: {securityMetrics.threatsBlocked} (24h)</div>
                    <div>• Suspicious logins: 23</div>
                    <div>• DDoS attempts: 0</div>
                    <div>• Malware: 0 detected</div>
                  </div>
                </div>
                <div>
                  <div className="text-neutral-400 mb-2 sm:mb-3 font-mono">SYSTEM STATUS</div>
                  <div className="text-neutral-300 space-y-1 sm:space-y-2">
                    <div>• Uptime: {securityMetrics.uptime}%</div>
                    <div>• Response: {securityMetrics.responseTime}ms</div>
                    <div>• Centers: {securityMetrics.datacenters} active</div>
                    <div>• Backup: 100%</div>
                  </div>
                </div>
                <div>
                  <div className="text-neutral-400 mb-2 sm:mb-3 font-mono">COMPLIANCE</div>
                  <div className="text-neutral-300 space-y-1 sm:space-y-2">
                    <div>• SOC 2: Certified</div>
                    <div>• ISO 27001: Compliant</div>
                    <div>• GDPR: Compliant</div>
                    <div>• Audit: {securityMetrics.lastAudit}</div>
                  </div>
                </div>
                <div>
                  <div className="text-neutral-400 mb-2 sm:mb-3 font-mono">PERFORMANCE</div>
                  <div className="text-neutral-300 space-y-1 sm:space-y-2">
                    <div>• Score: {securityMetrics.securityScore.toFixed(1)}/100</div>
                    <div>• Vulns: {securityMetrics.vulnerabilities}</div>
                    <div>• Response: {securityMetrics.incidentResponse}s</div>
                    <div>• Sessions: {securityMetrics.activeSessions}</div>
                  </div>
                </div>
              </div>

              <div className="border-t border-neutral-800 pt-4">
                <div className="text-white text-xs sm:text-sm">ALL SYSTEMS SECURE</div>
                <div className="text-neutral-500 text-[10px] sm:text-xs font-mono mt-1">
                  Updated: {new Date().toLocaleString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Certifications */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <Card className="bg-neutral-950 border-neutral-800 text-center hover:border-neutral-700 transition-colors">
            <CardContent className="p-6 sm:p-8">
              <Lock className="w-10 h-10 sm:w-12 sm:h-12 text-neutral-400 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-light text-white mb-2">SOC 2 TYPE II</h3>
              <p className="text-neutral-400 text-xs sm:text-sm mb-3 sm:mb-4">Security, availability, and confidentiality</p>
              <Badge className="bg-white text-black font-mono text-xs">CERTIFIED</Badge>
            </CardContent>
          </Card>

          <Card className="bg-neutral-950 border-neutral-800 text-center hover:border-neutral-700 transition-colors">
            <CardContent className="p-6 sm:p-8">
              <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-neutral-400 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-light text-white mb-2">ISO 27001</h3>
              <p className="text-neutral-400 text-xs sm:text-sm mb-3 sm:mb-4">Information security management</p>
              <Badge className="bg-white text-black font-mono text-xs">CERTIFIED</Badge>
            </CardContent>
          </Card>

          <Card className="bg-neutral-950 border-neutral-800 text-center hover:border-neutral-700 transition-colors sm:col-span-2 md:col-span-1">
            <CardContent className="p-6 sm:p-8">
              <Eye className="w-10 h-10 sm:w-12 sm:h-12 text-neutral-400 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-light text-white mb-2">GDPR</h3>
              <p className="text-neutral-400 text-xs sm:text-sm mb-3 sm:mb-4">European data protection regulations</p>
              <Badge className="bg-white text-black font-mono text-xs">COMPLIANT</Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </SleekDashboardLayout>
  )
}
