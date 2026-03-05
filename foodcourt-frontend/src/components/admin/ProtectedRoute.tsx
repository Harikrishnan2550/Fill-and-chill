"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("adminToken")

    if (!token) {
      router.replace("/admin/login")
    } else {
      setAuthorized(true)
    }
  }, [router])

  // Prevent rendering until auth check finishes
  if (!authorized) return null

  return <>{children}</>
}