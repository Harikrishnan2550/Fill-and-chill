"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useRef, useState } from "react"
import { useInView } from "framer-motion"

/* ── Textures ── */
const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.07'/%3E%3C/svg%3E")`
const DOTS  = `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1.5' cy='1.5' r='1.2' fill='%23a07840' opacity='0.35'/%3E%3C/svg%3E")`
const DIAG  = `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0' y1='24' x2='24' y2='0' stroke='%23a07840' stroke-width='0.5' opacity='0.12'/%3E%3C/svg%3E")`

/* ── Ornamental Rule ── */
function Rule({ color = "#C9A84C" }: { color?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ height: 1, flex: 1, background: `linear-gradient(to right, transparent, ${color}60)` }} />
      <svg width="10" height="10" viewBox="0 0 10 10">
        <rect x="1" y="1" width="8" height="8" rx="1" transform="rotate(45 5 5)" fill={color} />
      </svg>
      <div style={{ height: 1, flex: 1, background: `linear-gradient(to left, transparent, ${color}60)` }} />
    </div>
  )
}

/* ── Outlet data ── */
const outlets = [
  { name: "Biryani House",    sub: "North Indian",  tag: "Heritage Fire",  id: "01", img: "/biriyani.png", hue: "#FB923C" },
  { name: "Dosa & Appam Hub", sub: "South Indian",  tag: "Coastal Ritual", id: "02", img: "/dosa.png",    hue: "#B8763A" },
  { name: "China Wok",        sub: "Indo-Chinese",  tag: "Fusion Flame",   id: "03", img: "/pizza.png",    hue: "#C9A84C" },
  { name: "Shawarma Point",   sub: "Arabian Grill", tag: "Smoke & Spit",   id: "04", img: "/shawarma1.png", hue: "#FB923C" },
]

/* ── Outlet Card ── */
function OutletCard({ o, index }: { o: typeof outlets[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-8%" })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative" }}
    >
      {/* Corner brackets */}
      <div style={{ position: "absolute", top: -8, left: -8, width: 22, height: 22, zIndex: 20,
        borderTop: `2px solid ${o.hue}`, borderLeft: `2px solid ${o.hue}` }} />
      <div style={{ position: "absolute", bottom: -8, right: -8, width: 22, height: 22, zIndex: 20,
        borderBottom: `2px solid ${o.hue}`, borderRight: `2px solid ${o.hue}` }} />

      {/* Card */}
      <div style={{ borderRadius: 18, border: "6px solid white", overflow: "hidden",
        boxShadow: "0 20px 40px rgba(0,0,0,0.35)", position: "relative" }}>

        {/* Image */}
        <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
          <motion.div
            animate={{ scale: hovered ? 1.07 : 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "absolute", inset: 0 }}
          >
            <Image src={o.img} alt={o.name} fill style={{ objectFit: "cover" }} />
          </motion.div>

          <div style={{ position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(15,6,0,0.85) 0%, rgba(100,50,0,0.15) 45%, transparent 65%)" }} />
          <div style={{ position: "absolute", inset: 0,
            background: `linear-gradient(to bottom, ${o.hue}35, transparent 45%)` }} />

          {/* Top pill badge */}
          <div style={{ position: "absolute", top: 10, left: 10,
            display: "flex", alignItems: "center", gap: 5,
            padding: "4px 10px",
            background: "rgba(240,232,216,0.16)", backdropFilter: "blur(10px)",
            borderRadius: 999, border: "1px solid rgba(255,255,255,0.2)" }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: o.hue }} />
            <span style={{ fontFamily: "sans-serif", fontSize: 7, fontWeight: 700,
              letterSpacing: "0.3em", color: "white" }}>{o.tag.toUpperCase()}</span>
          </div>

          {/* ID stamp top-right */}
          <div style={{ position: "absolute", top: 10, right: 10,
            width: 32, height: 32, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(201,168,76,0.2)", backdropFilter: "blur(8px)",
            border: "1px solid rgba(201,168,76,0.4)" }}>
            <span style={{ fontFamily: "sans-serif", fontSize: 7, fontWeight: 900,
              color: "#C9A84C", lineHeight: 1, textAlign: "center" }}>{o.id}</span>
          </div>

          {/* Bottom text overlay */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "14px 14px 12px" }}>
            <p style={{ fontFamily: "sans-serif", fontSize: 7, fontWeight: 700,
              letterSpacing: "0.35em", color: o.hue, marginBottom: 3 }}>SEC_{o.id}</p>
            <h3 style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 900,
              fontSize: 21, lineHeight: 0.92, letterSpacing: "-0.01em", color: "white" }}>
              {o.name}
            </h3>
            <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic",
              color: "rgba(255,255,255,0.55)", fontSize: 12, marginTop: 3 }}>{o.sub}</p>
          </div>

          {/* Ghost number */}
          <div style={{ position: "absolute", bottom: 8, right: 10, pointerEvents: "none", userSelect: "none" }}>
            <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 900,
              fontSize: 56, color: "white", opacity: 0.07, lineHeight: 1 }}>{o.id}</span>
          </div>
        </div>

        {/* Bottom info strip */}
        <div style={{ background: "#1a0e04", padding: "12px 14px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: DIAG,
            backgroundRepeat: "repeat", opacity: 0.5 }} />
          <div style={{ position: "absolute", top: 0, right: 0, width: 55, height: 55,
            background: o.hue, clipPath: "polygon(100% 0, 0 0, 100% 100%)", opacity: 0.15 }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{ fontFamily: "sans-serif", fontSize: 7, fontWeight: 700,
              letterSpacing: "0.35em", color: "#a07840", marginBottom: 1 }}>OUTLET</p>
            <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic",
              color: "rgba(255,255,255,0.6)", fontSize: 11 }}>View menu & hours</p>
          </div>

          <motion.button
            animate={{ opacity: hovered ? 1 : 0.6, x: hovered ? 0 : -4 }}
            transition={{ duration: 0.3 }}
            style={{ position: "relative", zIndex: 1,
              fontFamily: "sans-serif", background: o.hue, color: "white",
              fontSize: 7, fontWeight: 700, letterSpacing: "0.3em",
              padding: "7px 14px", borderRadius: 999, border: "none", cursor: "pointer",
              textTransform: "uppercase" }}
          >
            Order →
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Main Section ── */
export default function PopularOutlets() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-5%" })

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#1a0e04", fontFamily: "Georgia, serif" }}
    >
      {/* Responsive padding via Tailwind */}
      <div className="px-5 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24">

        {/* Grain overlay */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 50,
          backgroundImage: GRAIN, backgroundSize: "200px", opacity: 0.35 }} />

        {/* Diagonal bg */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: DIAG,
          backgroundRepeat: "repeat", opacity: 0.6 }} />

        {/* Orange triangle — bottom left */}
        <div className="hidden sm:block" style={{ position: "absolute", bottom: 0, left: 0,
          width: 180, height: 150, background: "#FB923C",
          clipPath: "polygon(0 100%, 0 0%, 100% 100%)", opacity: 0.12 }} />

        {/* Gold triangle — top right */}
        <div style={{ position: "absolute", top: 0, right: 0, width: 120, height: 120,
          background: "#C9A84C", clipPath: "polygon(100% 0, 0 0, 100% 100%)", opacity: 0.1 }} />

        {/* Dot strip — left edge */}
        <div className="hidden sm:block" style={{ position: "absolute", top: 0, left: 0,
          bottom: 0, width: 28, backgroundImage: DOTS, backgroundRepeat: "repeat" }} />

        {/* Warm center glow */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at 50% 40%, rgba(251,146,60,0.08) 0%, transparent 70%)" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 10 }}>

          {/* ── Header ── */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 md:mb-14"
          >
            {/* Section label */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 20, height: 1, background: "#C9A84C" }} />
              <span style={{ fontFamily: "sans-serif", fontSize: 9, fontWeight: 700,
                letterSpacing: "0.4em", color: "#C9A84C" }}>ARTISAN COLLECTION</span>
            </div>

            {/* Title row — stacks on mobile */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
              <div>
                <div style={{ position: "relative" }}>
                  <p className="hidden sm:block" style={{ position: "absolute", top: -16, left: -4,
                    pointerEvents: "none", userSelect: "none", fontStyle: "italic", fontWeight: 900,
                    fontSize: "clamp(56px,8vw,100px)", color: "#FB923C", opacity: 0.05,
                    letterSpacing: "-0.04em", lineHeight: 1 }}>OUTLETS</p>
                  <h2 style={{ fontStyle: "italic", fontWeight: 900, color: "white",
                    fontSize: "clamp(32px,4.5vw,58px)", lineHeight: 0.88,
                    letterSpacing: "-0.02em", position: "relative" }}>
                    Popular<br />
                    <span style={{ color: "#FB923C" }}>Outlets</span>
                  </h2>
                </div>
                <p style={{ fontFamily: "sans-serif", fontSize: 11, color: "rgba(255,255,255,0.35)",
                  marginTop: 12, letterSpacing: "0.05em", maxWidth: 340, lineHeight: 1.7 }}>
                  Each outlet is a chapter. Each dish, a sentence written in smoke and spice.
                </p>
              </div>

              {/* Stats + View All */}
              <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-0">
                <div className="text-left sm:text-right">
                  <p style={{ fontFamily: "sans-serif", fontSize: 8, fontWeight: 700,
                    letterSpacing: "0.3em", color: "#FB923C" }}>TOTAL OUTLETS</p>
                  <p style={{ fontStyle: "italic", fontWeight: 900,
                    fontSize: "clamp(32px,5vw,48px)", color: "#FB923C", lineHeight: 1 }}>6+</p>
                </div>
                <Link href="/shops"
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 0,
                    fontFamily: "sans-serif", fontSize: 8, fontWeight: 700, letterSpacing: "0.3em",
                    color: "#a07840", textDecoration: "none", transition: "color 0.2s",
                    whiteSpace: "nowrap" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#FB923C")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#FB923C")}>
                  VIEW ALL →
                </Link>
              </div>
            </div>

            <div style={{ marginTop: 20 }}><Rule /></div>
          </motion.div>

          {/* ── Cards Grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
            {outlets.map((o, i) => (
              <OutletCard key={o.name} o={o} index={i} />
            ))}
          </div>

          {/* ── Footer rule + CTA ── */}
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 md:mt-14 flex flex-col items-center gap-5"
          >
            <Rule />
            <motion.a
              href="/shops"
              whileHover={{ scale: 1.05, background: "#C9A84C" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              style={{ fontFamily: "sans-serif", background: "#FB923C", color: "white",
                fontSize: 9, fontWeight: 700, letterSpacing: "0.35em",
                padding: "13px 36px", borderRadius: 999, textDecoration: "none",
                textTransform: "uppercase", display: "inline-block" }}
            >
              Explore All Outlets
            </motion.a>
            <p className="hidden sm:block" style={{ fontFamily: "sans-serif", fontSize: 7,
              letterSpacing: "0.4em", color: "rgba(160,120,64,0.35)" }}>
              EIGHT CHAPTERS · ARTISAN COLLECTION · EST. 2021
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}