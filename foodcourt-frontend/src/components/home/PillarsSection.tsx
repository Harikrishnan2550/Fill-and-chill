"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

/* ── Counter ── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    let s = 0; const inc = target / (1200 / 14)
    const t = setInterval(() => {
      s += inc
      if (s >= target) { setCount(target); clearInterval(t) } else setCount(Math.floor(s))
    }, 14)
    return () => clearInterval(t)
  }, [inView, target])
  return <span ref={ref}>{count}{suffix}</span>
}

/* ── Icons ── */
const ICONS = [
  <svg key="1" width="36" height="36" viewBox="0 0 36 36" fill="none">
    <path d="M18 4C12.477 4 8 8.477 8 14c0 8.5 10 18 10 18s10-9.5 10-18c0-5.523-4.477-10-10-10z" stroke="#C9A84C" strokeWidth="2" fill="none"/>
    <circle cx="18" cy="14" r="4" stroke="#C9A84C" strokeWidth="2" fill="none"/>
  </svg>,
  <svg key="2" width="36" height="36" viewBox="0 0 36 36" fill="none">
    <path d="M18 4l12 5v9c0 7-5 12.5-12 15C11 30.5 6 25 6 18V9L18 4z" stroke="#C9A84C" strokeWidth="2" fill="none"/>
    <path d="M12 18l4 4 8-8" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
  <svg key="3" width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle cx="12" cy="11" r="4" stroke="#C9A84C" strokeWidth="2" fill="none"/>
    <circle cx="24" cy="11" r="4" stroke="#C9A84C" strokeWidth="2" fill="none"/>
    <path d="M4 28c0-4.4 3.6-8 8-8h12c4.4 0 8 3.6 8 8" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" fill="none"/>
  </svg>,
]

/* ── Data ── */
const pillars = [
  {
    n: "01", stat: 6, statSuffix: "+", statLabel: "Outlets",
    title: "Scale & Presence",
    desc: "From bustling city squares to quiet neighbourhood lanes — a chapter of flavour is never far. Thirty outlets and growing, each one a home.",
    align: "right" as const,
    icon: ICONS[0],
  },
  {
    n: "02", stat: 100, statSuffix: "%", statLabel: "Certified",
    title: "Hygiene & Honour",
    desc: "Every surface, every hand, every ingredient held to an unwavering standard. No certificate fully captures it — but every bite confirms it.",
    align: "left" as const,
    icon: ICONS[1],
  },
  {
    n: "03", stat: 4, statSuffix: " gen", statLabel: "Trusted",
    title: "Family First",
    desc: "Designed for grandmothers and toddlers alike. Spaces that breathe warmth, portions that feel generous, moments that become memories.",
    align: "right" as const,
    icon: ICONS[2],
  },
]

/* ── Row ── */
function PillarRow({ p, index }: { p: typeof pillars[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-8%" })
  const [hovered, setHovered] = useState(false)
  const isRight = p.align === "right"

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isRight ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── MOBILE layout: stacked card ── */}
      <div className="flex md:hidden flex-col overflow-hidden rounded-2xl shadow-xl"
        style={{ border: "1px solid rgba(201,168,76,0.15)" }}>

        {/* Top: amber panel */}
        <div style={{
          background: "linear-gradient(135deg, #E8A020 0%, #C9871A 60%, #A06010 100%)",
          padding: "24px 20px 20px",
          position: "relative", overflow: "hidden",
        }}>
          {/* Diagonal stripes */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 12px, rgba(0,0,0,0.04) 12px, rgba(0,0,0,0.04) 14px)`,
          }} />
          {/* Ghost number */}
          <div style={{
            position: "absolute", right: 12, bottom: -8, pointerEvents: "none", userSelect: "none",
            fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 900,
            fontSize: 72, lineHeight: 1, letterSpacing: "-0.05em", color: "rgba(0,0,0,0.12)",
          }}>{p.n}</div>

          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Stat */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
              <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 900,
                fontSize: 36, lineHeight: 1, letterSpacing: "-0.03em", color: "#1a0e04" }}>
                <Counter target={p.stat} suffix={p.statSuffix} />
              </span>
              <span style={{ fontFamily: "sans-serif", fontSize: 9, fontWeight: 700,
                letterSpacing: "0.25em", color: "rgba(26,14,4,0.5)", textTransform: "uppercase" }}>
                {p.statLabel}
              </span>
            </div>
            <h3 style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 900,
              fontSize: 20, lineHeight: 1, letterSpacing: "-0.02em",
              color: "#1a0e04", marginBottom: 8 }}>{p.title}</h3>
            <p style={{ fontFamily: "sans-serif", fontSize: 12, color: "rgba(26,14,4,0.65)",
              lineHeight: 1.7 }}>{p.desc}</p>
          </div>
        </div>

        {/* Bottom: dark strip with icon + number */}
        <div style={{
          background: "linear-gradient(135deg, #1e1208, #0e0805)",
          padding: "14px 20px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Icon circle */}
          <div style={{
            width: 52, height: 52, borderRadius: "50%", flexShrink: 0,
            background: "radial-gradient(circle at 35% 35%, #2a2010, #0e0805)",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "2px solid #C9A84C40",
          }}>
            {p.icon}
          </div>
          <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 900,
            fontSize: 40, lineHeight: 1, letterSpacing: "-0.04em", color: "#C9A84C" }}>{p.n}</span>
        </div>
      </div>

      {/* ── DESKTOP layout: original horizontal row ── */}
      <div
        className="hidden md:flex items-center gap-0 relative"
        style={{ flexDirection: isRight ? "row" : "row-reverse" }}
      >
        {/* Yellow content panel */}
        <motion.div
          animate={{ boxShadow: hovered ? "0 16px 48px rgba(201,135,26,0.35)" : "0 4px 20px rgba(0,0,0,0.12)" }}
          transition={{ duration: 0.35 }}
          style={{
            flex: 1,
            background: "linear-gradient(135deg, #E8A020 0%, #C9871A 60%, #A06010 100%)",
            borderRadius: isRight ? "16px 0 0 16px" : "0 16px 16px 0",
            padding: "32px 28px 32px 36px",
            position: "relative", overflow: "hidden", minHeight: 140,
            display: "flex", flexDirection: isRight ? "row" : "row-reverse",
            alignItems: "center", gap: 24,
          }}
        >
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 12px, rgba(0,0,0,0.04) 12px, rgba(0,0,0,0.04) 14px)`,
          }} />

          {/* Ghost big number */}
          <div style={{
            fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 900,
            fontSize: 80, lineHeight: 1, letterSpacing: "-0.05em",
            color: "rgba(0,0,0,0.15)", userSelect: "none", flexShrink: 0,
            position: "absolute",
            ...(isRight ? { right: 24, bottom: -10 } : { left: 24, bottom: -10 }),
          }}>{p.n}</div>

          <div style={{ position: "relative", zIndex: 1, flex: 1 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
              <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 900,
                fontSize: 38, lineHeight: 1, letterSpacing: "-0.03em", color: "#1a0e04" }}>
                <Counter target={p.stat} suffix={p.statSuffix} />
              </span>
              <span style={{ fontFamily: "sans-serif", fontSize: 9, fontWeight: 700,
                letterSpacing: "0.25em", color: "rgba(26,14,4,0.5)", textTransform: "uppercase" }}>
                {p.statLabel}
              </span>
            </div>
            <h3 style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 900,
              fontSize: 22, lineHeight: 1, letterSpacing: "-0.02em",
              color: "#1a0e04", marginBottom: 10 }}>{p.title}</h3>
            <p style={{ fontFamily: "sans-serif", fontSize: 12, color: "rgba(26,14,4,0.65)",
              lineHeight: 1.7, maxWidth: 340 }}>{p.desc}</p>
          </div>
        </motion.div>

        {/* 3D Circle button */}
        <motion.div
          animate={{
            scale: hovered ? 1.08 : 1,
            boxShadow: hovered
              ? "0 0 0 6px #C9A84C40, 0 20px 40px rgba(0,0,0,0.35)"
              : "0 0 0 4px #C9A84C25, 0 8px 24px rgba(0,0,0,0.25)",
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: 96, height: 96, borderRadius: "50%", flexShrink: 0,
            background: "radial-gradient(circle at 35% 35%, #2a2010, #0e0805)",
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative", zIndex: 2,
            marginLeft: isRight ? -48 : 0,
            marginRight: isRight ? 0 : -48,
            border: "3px solid #C9A84C50",
          }}
        >
          <div style={{ position: "absolute", inset: 6, borderRadius: "50%",
            border: "1.5px solid rgba(201,168,76,0.25)" }} />
          <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)",
            width: 40, height: 12, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
          {p.icon}
        </motion.div>

        {/* Dark panel */}
        <div style={{
          width: 90, flexShrink: 0,
          background: "linear-gradient(135deg, #1e1208, #0e0805)",
          borderRadius: isRight ? "0 16px 16px 0" : "16px 0 0 16px",
          display: "flex", alignItems: "center", justifyContent: "center",
          minHeight: 140, position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute",
            ...(isRight ? { top: 0, left: 0, right: 0, height: 3 } : { bottom: 0, left: 0, right: 0, height: 3 }),
            background: "linear-gradient(to right, #C9871A, #C9A84C)",
          }} />
          <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 900,
            fontSize: 44, lineHeight: 1, letterSpacing: "-0.04em", color: "#C9A84C" }}>{p.n}</span>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Main ── */
export default function PillarsSection() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: "-5%" })

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #1a0e04 0%, #0e0805 40%, #1a1000 100%)",
        fontFamily: "Georgia, serif",
      }}
    >
      {/* Responsive padding */}
      <div className="px-5 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24">

        {/* Background decorations */}
        <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500,
          borderRadius: "50%", border: "1px solid rgba(201,168,76,0.06)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 360, height: 360,
          borderRadius: "50%", border: "1px solid rgba(201,168,76,0.08)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)",
          width: 700, height: 700, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,135,26,0.04) 0%, transparent 70%)",
          pointerEvents: "none" }} />

        <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* ── Header ── */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: "center", marginBottom: 48 }}
          >
            <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 28, height: 1, background: "#C9A84C60" }} />
              <span style={{ fontFamily: "sans-serif", fontSize: 9, fontWeight: 700,
                letterSpacing: "0.45em", color: "#C9A84C", textTransform: "uppercase" }}>Our Promise</span>
              <div style={{ width: 28, height: 1, background: "#C9A84C60" }} />
            </div>

            <h2 style={{
              fontStyle: "italic", fontWeight: 900, color: "white",
              fontSize: "clamp(32px, 5vw, 62px)", lineHeight: 0.9,
              letterSpacing: "-0.03em", margin: 0,
            }}>
              Why Families<br />
              <span style={{ color: "#FB923C" }}>Choose Us</span>
            </h2>

            <p style={{ fontFamily: "sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)",
              marginTop: 20, lineHeight: 1.8, fontStyle: "italic", maxWidth: 400, margin: "20px auto 0" }}>
              Three pillars. One unwavering commitment — to serve food that feels like family.
            </p>
          </motion.div>

          {/* ── Pillar rows ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {pillars.map((p, i) => (
              <PillarRow key={p.n} p={p} index={i} />
            ))}
          </div>

          {/* ── Footer ── */}
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{ fontFamily: "sans-serif", fontSize: 8, letterSpacing: "0.4em",
              color: "rgba(160,120,64,0.3)", marginTop: 48, textAlign: "center", textTransform: "uppercase" }}
          >
            Eight Chapters · Artisan Collection · Est. 2021
          </motion.p>
        </div>
      </div>
    </section>
  )
}