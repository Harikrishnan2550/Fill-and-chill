"use client"

import { motion } from "framer-motion"

const ITEMS = [
  { label: "Malabar Biryani", icon: "✦" },
  { label: "North Indian", icon: "◈" },
  { label: "Kerala Meals", icon: "✦" },
  { label: "Arabian Grill", icon: "◈" },
  { label: "Indo-Chinese", icon: "✦" },
  { label: "Tandoori", icon: "◈" },
  { label: "Desserts", icon: "✦" },
  { label: "Fast Food", icon: "◈" },
  { label: "Shawarma", icon: "✦" },
  { label: "Fresh Juices", icon: "◈" },
]

const doubled = [...ITEMS, ...ITEMS]

export default function Ticker() {
  return (
    <div className="relative overflow-hidden bg-[#0D0B08] border-y border-[#FB923C]/12">
      {/* Left & right fade masks */}
      <div
        className="absolute left-0 top-0 h-full w-10 sm:w-16 md:w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #0D0B08, transparent)" }}
      />
      <div
        className="absolute right-0 top-0 h-full w-10 sm:w-16 md:w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #0D0B08, transparent)" }}
      />

      {/* Top hairline orange accent */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #FB923C 30%, #FB923C 70%, transparent)" }}
      />
      {/* Bottom hairline orange accent */}
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #FB923C 30%, #FB923C 70%, transparent)" }}
      />

      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="flex items-center py-2.5 sm:py-3 md:py-3.5 w-max"
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center">
            <span
              className="px-4 sm:px-5 md:px-7 text-[9px] sm:text-[10px] uppercase tracking-[0.35em] sm:tracking-[0.45em] whitespace-nowrap font-light"
              style={{
                fontFamily: "Jost, sans-serif",
                color: i % 3 === 0 ? "#FB923C" : "rgba(240,232,213,0.38)",
              }}
            >
              {item.label}
            </span>
            <span className="text-[#FB923C]/30 text-[7px] sm:text-[8px] select-none">{item.icon}</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}