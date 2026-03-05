"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"

/* ── Data ── */
const reviews = [
  {
    quote: "Best food court in Piravom! Every outlet has something special. We come here every weekend as a family.",
    author: "Rahul M.",
    role: "Regular Customer",
    rating: 5,
    tag: "Family Visit",
    initials: "RM",
    hue: "#FB923C",
  },
  {
    quote: "Very clean and family friendly. The hygiene standards are top-notch. My kids love it here and I feel safe.",
    author: "Fathima K.",
    role: "Mother of Three",
    rating: 5,
    tag: "Hygiene",
    initials: "FK",
    hue: "#B8763A",
  },
  {
    quote: "Amazing variety of cuisines under one roof. From biryani to shawarma — everything tastes authentic and fresh.",
    author: "Arjun P.",
    role: "Food Enthusiast",
    rating: 5,
    tag: "Variety",
    initials: "AP",
    hue: "#C9A84C",
  },
]

/* ── Stars ── */
function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill={i < count ? "#C9A84C" : "#e8ddd0"}>
          <path d="M7 1l1.5 3.5L12 5l-2.5 2.5.5 3.5L7 9.5 4 11l.5-3.5L2 5l3.5-.5L7 1z" />
        </svg>
      ))}
    </div>
  )
}

/* ── Quote mark ── */
function QuoteMark({ color }: { color: string }) {
  return (
    <svg width="40" height="32" viewBox="0 0 40 32" fill="none">
      <path d="M0 20C0 10 6 3 18 0l2 3C12 5 9 9 9 14h7v18H0V20zm22 0C22 10 28 3 40 0l2 3C34 5 31 9 31 14h7v18H22V20z"
        fill={color} opacity="0.15" />
    </svg>
  )
}

/* ── Card ── */
function ReviewCard({ r, index }: { r: typeof reviews[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-8%" })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.13, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative" }}
    >
      {/* Corner brackets */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
        transition={{ duration: 0.3 }}
        style={{ position: "absolute", top: -7, left: -7, width: 20, height: 20, zIndex: 10,
          borderTop: `2px solid ${r.hue}`, borderLeft: `2px solid ${r.hue}` }} />
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
        transition={{ duration: 0.3 }}
        style={{ position: "absolute", bottom: -7, right: -7, width: 20, height: 20, zIndex: 10,
          borderBottom: `2px solid ${r.hue}`, borderRight: `2px solid ${r.hue}` }} />

      <motion.div
        animate={{
          boxShadow: hovered
            ? `0 24px 48px rgba(0,0,0,0.1), 0 0 0 1.5px ${r.hue}40`
            : "0 2px 16px rgba(0,0,0,0.05)",
          y: hovered ? -6 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: "#ffffff",
          borderRadius: 20,
          border: "1.5px solid #f0e8d8",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top colored bar */}
        <div style={{ height: 4, background: `linear-gradient(to right, ${r.hue}, ${r.hue}80)` }} />

        <div className="p-6 sm:p-8">
          {/* Top row: tag + stars */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "4px 10px", borderRadius: 999,
              background: `${r.hue}12`, border: `1px solid ${r.hue}30`,
            }}>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: r.hue }} />
              <span style={{ fontFamily: "sans-serif", fontSize: 7, fontWeight: 700,
                letterSpacing: "0.3em", color: r.hue, textTransform: "uppercase" }}>{r.tag}</span>
            </div>
            <Stars count={r.rating} />
          </div>

          {/* Quote mark */}
          <div style={{ marginBottom: 14 }}>
            <QuoteMark color={r.hue} />
          </div>

          {/* Quote text */}
          <motion.p
            animate={{ color: hovered ? "#1a0e04" : "#5a3e1c" }}
            transition={{ duration: 0.3 }}
            style={{
              fontFamily: "Georgia, serif", fontStyle: "italic",
              fontSize: "clamp(14px, 1.5vw, 16px)", lineHeight: 1.75,
              letterSpacing: "0.01em", marginBottom: 24,
            }}
          >
            "{r.quote}"
          </motion.p>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
            <div style={{ height: 1, flex: 1, background: "#f0e8d8" }} />
            <svg width="8" height="8" viewBox="0 0 10 10">
              <rect x="1" y="1" width="8" height="8" rx="1" transform="rotate(45 5 5)" fill={r.hue} opacity="0.4" />
            </svg>
            <div style={{ height: 1, flex: 1, background: "#f0e8d8" }} />
          </div>

          {/* Author row */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
              background: `linear-gradient(135deg, ${r.hue}, ${r.hue}80)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: `2px solid ${r.hue}30`,
            }}>
              <span style={{ fontFamily: "sans-serif", fontSize: 11, fontWeight: 700,
                color: "white", letterSpacing: "0.05em" }}>{r.initials}</span>
            </div>
            <div>
              <p style={{ fontFamily: "Georgia, serif", fontWeight: 700,
                fontSize: 14, color: "#1a0e04", marginBottom: 2, fontStyle: "italic" }}>{r.author}</p>
              <p style={{ fontFamily: "sans-serif", fontSize: 9, fontWeight: 600,
                letterSpacing: "0.2em", color: "#a07840", textTransform: "uppercase" }}>{r.role}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Main ── */
export default function TestimonialsSection() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: "-5%" })

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#F0E8D8", fontFamily: "Georgia, serif" }}
    >
      {/* Responsive padding */}
      <div className="px-5 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24">

        {/* Ambient glow */}
        <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)",
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)",
          pointerEvents: "none" }} />

        <div style={{ maxWidth: 1152, margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* ── Header ── */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 md:mb-16"
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 20, height: 1, background: "#C9A84C" }} />
              <span style={{ fontFamily: "sans-serif", fontSize: 9, fontWeight: 700,
                letterSpacing: "0.4em", color: "#C9A84C", textTransform: "uppercase" }}>Guest Reviews</span>
            </div>

            {/* Title + rating summary */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 sm:gap-8">
              <h2 style={{
                fontStyle: "italic", fontWeight: 900, color: "#1a0e04",
                fontSize: "clamp(32px, 4.5vw, 58px)", lineHeight: 0.88,
                letterSpacing: "-0.03em", margin: 0,
              }}>
                What People<br />
                <span style={{ color: "#FB923C" }}>Say</span>
              </h2>

              {/* Rating summary */}
              <div className="sm:text-right pb-0 sm:pb-1">
                <div style={{ display: "flex", alignItems: "center", gap: 10,
                  justifyContent: "flex-start", marginBottom: 6 }}
                  className="sm:justify-end">
                  <Stars count={5} />
                  <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 900,
                    fontSize: 28, color: "#1a0e04", lineHeight: 1 }}>5.0</span>
                </div>
                <p style={{ fontFamily: "sans-serif", fontSize: 9, fontWeight: 700,
                  letterSpacing: "0.3em", color: "#a07840", textTransform: "uppercase" }}>Average Rating</p>
                <p style={{ fontFamily: "sans-serif", fontSize: 11, color: "#7a5c38",
                  marginTop: 4, fontStyle: "italic" }}>Based on 400+ reviews</p>
              </div>
            </div>

            {/* Rule */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 24 }}>
              <div style={{ height: 1, flex: 1, background: "linear-gradient(to right, transparent, #C9A84C50)" }} />
              <svg width="10" height="10" viewBox="0 0 10 10">
                <rect x="1" y="1" width="8" height="8" rx="1" transform="rotate(45 5 5)" fill="#C9A84C" />
              </svg>
              <div style={{ height: 1, flex: 1, background: "linear-gradient(to left, transparent, #C9A84C50)" }} />
            </div>
          </motion.div>

          {/* ── Cards grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
            {reviews.map((r, i) => (
              <ReviewCard key={i} r={r} index={i} />
            ))}
          </div>

          {/* ── Footer stamp ── */}
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="hidden sm:block"
            style={{ fontFamily: "sans-serif", fontSize: 7, letterSpacing: "0.45em",
              color: "#a0784035", marginTop: 48, textAlign: "center", textTransform: "uppercase" }}
          >
            Eight Chapters · Artisan Collection · Est. 2021
          </motion.p>
        </div>
      </div>
    </section>
  )
}