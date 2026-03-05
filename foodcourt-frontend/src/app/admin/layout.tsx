"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import ProtectedRoute from "@/components/admin/ProtectedRoute"
import {
  LayoutDashboard,
  Store,
  Images,
  KeyRound,
  LogOut,
  ChefHat,
  Menu,
} from "lucide-react"
import { useState } from "react"
import { toast, Toaster } from "sonner"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  const menu = [
    { name: "Dashboard",       path: "/admin/dashboard",       icon: <LayoutDashboard size={17} strokeWidth={1.8} /> },
    { name: "Shops",           path: "/admin/shops",           icon: <Store            size={17} strokeWidth={1.8} /> },
    { name: "Gallery",         path: "/admin/gallery",         icon: <Images           size={17} strokeWidth={1.8} /> },
    { name: "Change Password", path: "/admin/change-password", icon: <KeyRound         size={17} strokeWidth={1.8} /> },
  ]

  const handleLogout = () => {
    toast.success("Logged out successfully", {
      description: "See you next time!",
      duration: 2000,
    })
    setTimeout(() => {
      localStorage.removeItem("adminToken")
      window.location.href = "/admin/login"
    }, 800)
  }

  const Sidebar = () => (
    <aside className="w-64 min-h-screen bg-gray-900 flex flex-col py-6 px-4">
      {/* Brand */}
      <div className="flex items-center gap-3 px-3 mb-10">
        <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/30">
          <ChefHat size={18} className="text-white" strokeWidth={2} />
        </div>
        <div>
          <p className="text-white font-bold text-sm leading-tight">Food Court</p>
          <p className="text-gray-500 text-[11px] leading-tight">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest px-3 mb-2">
          Navigation
        </p>
        {menu.map((item) => {
          const active = pathname === item.path
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                active
                  ? "bg-orange-500 text-white shadow-md shadow-orange-500/25"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <span className={`transition-colors ${active ? "text-white" : "text-gray-500 group-hover:text-orange-400"}`}>
                {item.icon}
              </span>
              {item.name}
              {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/70" />}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-800 pt-4 mt-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all w-full group"
        >
          <LogOut size={17} strokeWidth={1.8} className="group-hover:text-red-400 transition-colors" />
          Logout
        </button>
      </div>
    </aside>
  )

  return (
    <ProtectedRoute>
      <Toaster position="top-right" richColors />
      <div className="min-h-screen flex bg-gray-50">

        {/* Sidebar — desktop */}
        <div className="hidden md:flex flex-shrink-0">
          <Sidebar />
        </div>

        {/* Mobile sidebar overlay */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40 flex md:hidden">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <div className="relative z-50 flex">
              <Sidebar />
            </div>
          </div>
        )}

        {/* Main */}
        <div className="flex-1 flex flex-col min-w-0">

          {/* Topbar */}
          <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <button
                className="md:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition"
                onClick={() => setMobileOpen(true)}
              >
                <Menu size={20} />
              </button>
              <div>
                <h1 className="font-bold text-gray-900 text-sm leading-tight">Food Court Admin</h1>
                <p className="text-[11px] text-gray-400 leading-tight hidden sm:block">
                  {menu.find((m) => m.path === pathname)?.name ?? "Overview"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
                <span className="text-white text-xs font-bold">A</span>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  )
}