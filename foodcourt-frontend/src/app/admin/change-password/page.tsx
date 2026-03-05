"use client"

import { useState } from "react"
import { KeyRound, Lock, Eye, EyeOff, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react"

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const passwordStrength = (pwd: string) => {
    if (!pwd) return null
    if (pwd.length < 6) return { label: "Weak", color: "bg-red-400", width: "w-1/4", text: "text-red-500" }
    if (pwd.length < 10) return { label: "Fair", color: "bg-amber-400", width: "w-1/2", text: "text-amber-500" }
    if (!/[A-Z]/.test(pwd) || !/[0-9]/.test(pwd)) return { label: "Good", color: "bg-blue-400", width: "w-3/4", text: "text-blue-500" }
    return { label: "Strong", color: "bg-emerald-500", width: "w-full", text: "text-emerald-500" }
  }

  const strength = passwordStrength(newPassword)
  const passwordsMatch = confirmPassword && newPassword === confirmPassword

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setMessage("")

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match")
      return
    }

    setLoading(true)
    try {
      const token = localStorage.getItem("adminToken")
      const res = await fetch("http://localhost:5000/api/admin/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Failed to update password")

      setMessage("Password updated successfully")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg space-y-6">

      {/* Header */}
      <div>
        <p className="text-xs text-gray-400 tracking-wide mb-1">Admin Panel &nbsp;/&nbsp; Settings</p>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Change Password</h1>
        <p className="text-sm text-gray-500 mt-1">Update your admin account password</p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">

        {/* Card header */}
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center">
            <ShieldCheck size={18} className="text-violet-500" strokeWidth={1.8} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">Security Settings</p>
            <p className="text-xs text-gray-400">Choose a strong, unique password</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Current Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block">
              Current Password
            </label>
            <div className="relative">
              <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" strokeWidth={1.8} />
              <input
                type={showCurrent ? "text" : "password"}
                placeholder="Enter current password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full border border-gray-200 bg-gray-50 rounded-xl pl-9 pr-10 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              >
                {showCurrent ? <EyeOff size={14} strokeWidth={1.8} /> : <Eye size={14} strokeWidth={1.8} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block">
              New Password
            </label>
            <div className="relative">
              <KeyRound size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" strokeWidth={1.8} />
              <input
                type={showNew ? "text" : "password"}
                placeholder="Enter new password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border border-gray-200 bg-gray-50 rounded-xl pl-9 pr-10 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              >
                {showNew ? <EyeOff size={14} strokeWidth={1.8} /> : <Eye size={14} strokeWidth={1.8} />}
              </button>
            </div>

            {/* Strength meter */}
            {strength && (
              <div className="space-y-1 pt-1">
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-300 ${strength.color} ${strength.width}`} />
                </div>
                <p className={`text-xs font-medium ${strength.text}`}>{strength.label} password</p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block">
              Confirm New Password
            </label>
            <div className="relative">
              <KeyRound size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" strokeWidth={1.8} />
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter new password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full border bg-gray-50 rounded-xl pl-9 pr-10 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition ${
                  confirmPassword
                    ? passwordsMatch
                      ? "border-emerald-300 focus:ring-emerald-400"
                      : "border-red-300 focus:ring-red-400"
                    : "border-gray-200 focus:ring-violet-400"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              >
                {showConfirm ? <EyeOff size={14} strokeWidth={1.8} /> : <Eye size={14} strokeWidth={1.8} />}
              </button>
            </div>
            {confirmPassword && (
              <p className={`text-xs font-medium flex items-center gap-1 ${passwordsMatch ? "text-emerald-500" : "text-red-400"}`}>
                {passwordsMatch
                  ? <><CheckCircle2 size={12} strokeWidth={2} /> Passwords match</>
                  : <><AlertCircle size={12} strokeWidth={2} /> Passwords do not match</>
                }
              </p>
            )}
          </div>

          {/* Error / Success */}
          {error && (
            <div className="flex items-center gap-2.5 bg-red-50 border border-red-100 text-red-600 text-sm font-medium px-4 py-3 rounded-xl">
              <AlertCircle size={15} strokeWidth={2} className="flex-shrink-0" />
              {error}
            </div>
          )}
          {message && (
            <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm font-medium px-4 py-3 rounded-xl">
              <CheckCircle2 size={15} strokeWidth={2} className="flex-shrink-0" />
              {message}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2.5 rounded-xl text-sm font-semibold transition-all mt-1"
          >
            <ShieldCheck size={15} strokeWidth={2} />
            {loading ? "Updating…" : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  )
}