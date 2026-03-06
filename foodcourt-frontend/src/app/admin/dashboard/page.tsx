"use client"

import { useEffect, useState } from "react"
import {
  Store,
  Images,
  LayoutGrid,
  UserCircle2,
  Zap,
  Clock3,
  ChevronRight,
  PlusCircle,
  Upload,
  Settings2,
  ImagePlus,
  CheckCircle2,
} from "lucide-react"

export default function AdminDashboard() {
  const [stats, setStats] = useState({ shops: 0, gallery: 0 })
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = useState(false)

  const API =
  process.env.NEXT_PUBLIC_API_URL || "https://fill-and-chill.onrender.com";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("adminToken")
const res = await fetch(`${API}/api/admin/stats`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        setStats({ shops: data.shops || 0, gallery: data.gallery || 0 })
      } catch (error) {
        console.error("Failed to load dashboard stats")
      } finally {
        setLoading(false)
        setTimeout(() => setVisible(true), 50)
      }
    }
    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-52 gap-3">
        <div className="w-8 h-8 border-[3px] border-gray-200 border-t-orange-500 rounded-full animate-spin" />
        <p className="text-sm text-gray-400">Loading dashboard…</p>
      </div>
    )
  }

  const quickActions = [
    { icon: <PlusCircle size={17} />, label: "Add / edit food shops", color: "text-orange-500", bg: "bg-orange-50" },
    { icon: <Upload size={17} />, label: "Upload gallery images", color: "text-violet-500", bg: "bg-violet-50" },
    { icon: <Settings2 size={17} />, label: "Manage food court content", color: "text-cyan-500", bg: "bg-cyan-50" },
  ]

  const activityItems = [
    { icon: <ImagePlus size={14} />, action: "Gallery updated", time: "2 min ago", color: "text-violet-500", bg: "bg-violet-50" },
    { icon: <Store size={14} />, action: "New shop added", time: "1 hr ago", color: "text-orange-500", bg: "bg-orange-50" },
    { icon: <CheckCircle2 size={14} />, action: "Content saved", time: "3 hrs ago", color: "text-cyan-500", bg: "bg-cyan-50" },
  ]

  return (
    <div
      className="min-h-screen bg-gray-50 p-8 max-w-5xl transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-xs text-gray-400 tracking-wide mb-1">Admin Panel &nbsp;/&nbsp; Overview</p>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Food court content at a glance</p>
        </div>
        <div className="flex items-center gap-2 bg-green-100 text-green-700 text-xs font-semibold px-4 py-2 rounded-full">
          <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_0_3px_#bbf7d0] inline-block" />
          Live
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Total Shops"
          value={stats.shops}
          icon={<Store size={18} strokeWidth={1.8} />}
          accent="orange"
          description="Active vendors"
        />
        <StatCard
          label="Gallery Images"
          value={stats.gallery}
          icon={<Images size={18} strokeWidth={1.8} />}
          accent="violet"
          description="Uploaded media"
        />
        <StatCard
          label="Sections"
          value={3}
          icon={<LayoutGrid size={18} strokeWidth={1.8} />}
          accent="cyan"
          description="Content areas"
        />
        <StatCard
          label="Admins"
          value={1}
          icon={<UserCircle2 size={18} strokeWidth={1.8} />}
          accent="emerald"
          description="Active users"
        />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-bold text-gray-900">Quick Actions</h3>
            <Zap size={18} strokeWidth={2} className="text-amber-400" />
          </div>
          <div className="flex flex-col gap-2">
            {quickActions.map((a, i) => (
              <button
                key={i}
                className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-xl px-4 py-3 w-full text-left transition-colors duration-150 group"
              >
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${a.bg} ${a.color}`}>
                  {a.icon}
                </span>
                <span className="flex-1 text-[13.5px] font-medium text-gray-700">{a.label}</span>
                <ChevronRight size={15} className="text-gray-300 group-hover:text-gray-400 transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-bold text-gray-900">Recent Activity</h3>
            <Clock3 size={18} strokeWidth={1.8} className="text-gray-400" />
          </div>
          <div className="flex flex-col gap-4">
            {activityItems.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${item.bg} ${item.color}`}>
                  {item.icon}
                </span>
                <div>
                  <p className="text-[13.5px] font-semibold text-gray-700">{item.action}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

const accentMap: Record<string, { border: string; iconBg: string; iconText: string; valueText: string }> = {
  orange: {
    border: "border-t-orange-500",
    iconBg: "bg-orange-50",
    iconText: "text-orange-500",
    valueText: "text-orange-500",
  },
  violet: {
    border: "border-t-violet-500",
    iconBg: "bg-violet-50",
    iconText: "text-violet-500",
    valueText: "text-violet-500",
  },
  cyan: {
    border: "border-t-cyan-500",
    iconBg: "bg-cyan-50",
    iconText: "text-cyan-500",
    valueText: "text-cyan-500",
  },
  emerald: {
    border: "border-t-emerald-500",
    iconBg: "bg-emerald-50",
    iconText: "text-emerald-500",
    valueText: "text-emerald-500",
  },
}

function StatCard({
  label,
  value,
  icon,
  accent,
  description,
}: {
  label: string
  value: number
  icon: React.ReactNode
  accent: string
  description: string
}) {
  const a = accentMap[accent]
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm p-5 border-t-[3px] ${a.border} hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-default`}
    >
      <div className="flex items-center gap-2.5 mb-4">
        <span className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${a.iconBg} ${a.iconText}`}>
          {icon}
        </span>
        <span className="text-xs font-medium text-gray-500">{label}</span>
      </div>
      <div className={`text-4xl font-extrabold tracking-tight leading-none mb-1.5 ${a.valueText}`}>
        {value}
      </div>
      <p className="text-xs text-gray-400">{description}</p>
    </div>
  )
}