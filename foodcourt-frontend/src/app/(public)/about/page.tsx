"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"

/* ─────────────────── PATTERNS ─────────────────── */
const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.07'/%3E%3C/svg%3E")`
const DOTS  = `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1.5' cy='1.5' r='1.2' fill='%23a07840' opacity='0.35'/%3E%3C/svg%3E")`
const DIAG  = `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0' y1='24' x2='24' y2='0' stroke='%23a07840' stroke-width='0.5' opacity='0.12'/%3E%3C/svg%3E")`

/* ─────────────────── HELPERS ─────────────────── */
function Lozenge({ color = "#C9A84C" }) {
  return (
    <svg width="9" height="9" viewBox="0 0 10 10" style={{ flexShrink: 0 }}>
      <rect x="1" y="1" width="8" height="8" rx="1" transform="rotate(45 5 5)" fill={color} />
    </svg>
  )
}
function Rule({ color = "#C9A84C" }: { color?: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${color}60)` }} />
      <Lozenge color={color} />
      <div className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, ${color}60)` }} />
    </div>
  )
}

/* ─────────────────── DATA ─────────────────── */
const VALUES = [
  { n: "01", title: "Heritage",    desc: "Rooted in the culinary traditions of Malabar — every dish carries decades of memory and craft." },
  { n: "02", title: "Community",   desc: "A gathering place for families, friends, and food lovers — built around the joy of sharing a meal." },
  { n: "03", title: "Excellence",  desc: "Every outlet is held to an unwavering standard of taste, hygiene, and hospitality." },
]

const STATS = [
  { num: "7+", label: "Years of legacy" },
  { num: "6+", label: "Food outlets"    },
  { num: "75+", label: "Unique dishes"  },
  { num: "4.9", label: "Customer rating" },
]

/* ─────────────────── PAGE ─────────────────── */
export default function AboutPage() {
  const heroRef  = useRef(null)
  const storyRef = useRef(null)
  const valRef   = useRef(null)
  const statRef  = useRef(null)

  const storyInView = useInView(storyRef, { once: true, margin: "-8%" })
  const valInView   = useInView(valRef,   { once: true, margin: "-8%" })
  const statInView  = useInView(statRef,  { once: true, margin: "-8%" })

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"])

  return (
    <main
      style={{ background: "#F0E8D8", fontFamily: "Georgia, serif" }}
      className="relative overflow-hidden"
    >
      {/* ── GRAIN ── */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-35"
        style={{ backgroundImage: GRAIN, backgroundSize: "200px" }} />

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[90vh] sm:min-h-[110vh] flex flex-col justify-end overflow-hidden">

        {/* Parallax image bg */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 h-[90%] sm:h-[160%] top-[0%]">
          <Image
            src="/burger3.png"
            alt="About Food Court"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(15,6,0,0.92) 0%, rgba(15,6,0,0.3) 55%, transparent 80%)" }} />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(201,135,26,0.25) 0%, transparent 60%)" }} />
        </motion.div>

        {/* Diagonal texture */}
        <div className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ backgroundImage: DIAG, backgroundRepeat: "repeat" }} />

        {/* Dot strip — left */}
        <div className="absolute top-0 left-0 bottom-0 w-8 hidden sm:block"
          style={{ backgroundImage: DOTS, backgroundRepeat: "repeat" }} />

        {/* Gold triangle top-right */}
        <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48"
          style={{ background: "#C9A84C", clipPath: "polygon(100% 0, 0 0, 100% 100%)", opacity: 0.12 }} />

        {/* Hero text */}
        <div className="relative z-10 px-5 pb-12 sm:px-10 sm:pb-16 md:px-16 md:pb-20 max-w-5xl">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="w-6 h-px" style={{ background: "#C9A84C" }} />
            <span style={{ fontFamily: "sans-serif", fontSize: "9px", fontWeight: 700, letterSpacing: "0.45em", color: "#C9A84C" }}>
              OUR STORY
            </span>
          </motion.div>

          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-black italic text-white"
              style={{ fontSize: "clamp(44px, 8vw, 96px)", lineHeight: 0.88, letterSpacing: "-0.03em" }}
            >
              About Our
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 1, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="font-black italic"
              style={{ fontSize: "clamp(44px, 8vw, 96px)", lineHeight: 0.88, letterSpacing: "-0.03em", color: "#C9A84C" }}
            >
              Food Court.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "sans-serif", fontSize: "clamp(12px,1.4vw,14px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: 480, fontStyle: "italic" }}
          >
            A space designed to bring people together through food, comfort, and unforgettable experiences — rooted in piravom, Kerala.
          </motion.p>
        </div>

        {/* Bottom rule */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="relative z-10 px-5 pb-6 sm:px-10 md:px-16"
        >
          <Rule color="#C9A84C40" />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          STORY SECTION
      ══════════════════════════════════════════ */}
      <section ref={storyRef} className="relative px-5 py-16 sm:px-10 sm:py-20 md:px-16 md:py-28 overflow-hidden">

        {/* Diagonal bg */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: DIAG, backgroundRepeat: "repeat" }} />
        {/* Warm glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(201,135,26,0.1) 0%, transparent 65%)" }} />

        {/* Gold panel — right side, desktop only */}
        <motion.div
          initial={{ x: "100%" }}
          animate={storyInView ? { x: "0%" } : {}}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="absolute inset-y-0 right-0 w-2/5 z-[1] hidden lg:block"
          style={{
            background: "linear-gradient(155deg, #FB923C 0%, #9a5e0e 100%)",
            clipPath: "polygon(16% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
        >
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: DIAG, backgroundRepeat: "repeat" }} />
          <div className="absolute inset-y-0 left-0 w-10 opacity-45"
            style={{ backgroundImage: DOTS, backgroundRepeat: "repeat" }} />
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={storyInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-5 h-px" style={{ background: "#C9A84C" }} />
              <span style={{ fontFamily: "sans-serif", fontSize: "9px", fontWeight: 700, letterSpacing: "0.4em", color: "#C9A84C" }}>
                WHO WE ARE
              </span>
            </div>

            <h2 className="font-black italic" style={{ fontSize: "clamp(32px, 4vw, 54px)", color: "#1a0e04", lineHeight: 0.88, letterSpacing: "-0.03em", marginBottom: "28px" }}>
              A gathering place<br />
              <span style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(26,14,4,0.2)" }}>for everyone</span>
            </h2>

            <Rule />

            <blockquote className="mt-6 pl-4 border-l-2 mb-7" style={{ borderColor: "#C9A84C" }}>
              <p className="italic" style={{ color: "#5a3e1c", fontSize: "clamp(14px,1.5vw,16px)", lineHeight: 1.8 }}>
                "Our food court was created with a simple idea — to offer a variety of cuisines under one roof while maintaining quality, comfort, and a welcoming atmosphere."
              </p>
              <p style={{ fontFamily: "sans-serif", fontSize: "8px", fontWeight: 700, letterSpacing: "0.35em", color: "#C9A84C", marginTop: "10px" }}>
                — THE FOUNDERS
              </p>
            </blockquote>

            <p style={{ fontFamily: "sans-serif", fontSize: "clamp(12px,1.3vw,13px)", color: "#7a5c38", lineHeight: 1.9 }}>
              From local favourites to international flavours, each outlet is carefully selected to deliver great taste and memorable moments for families, friends, and food lovers. Since 2024, we've been more than a food court — we've been a destination.
            </p>

            <div className="mt-8 flex gap-3 flex-wrap">
              <Link href="/shops">
                <motion.span
                  whileHover={{ scale: 1.04, background: "#C9A84C" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: "inline-block", fontFamily: "sans-serif", background: "#1a0e04", color: "white", fontSize: "9px", fontWeight: 700, letterSpacing: "0.35em", padding: "12px 28px", borderRadius: "999px", cursor: "pointer" }}
                  className="uppercase"
                >
                  Explore Outlets →
                </motion.span>
              </Link>
              <Link href="/contact">
                <motion.span
                  whileHover={{ scale: 1.04 }}
                  style={{ display: "inline-block", fontFamily: "sans-serif", color: "#1a0e04", fontSize: "9px", fontWeight: 700, letterSpacing: "0.35em", padding: "12px 24px", borderRadius: "999px", cursor: "pointer", border: "1.5px solid rgba(26,14,4,0.2)" }}
                  className="uppercase"
                >
                  Get in Touch
                </motion.span>
              </Link>
            </div>
          </motion.div>

          {/* Right: image card (sits on top of gold panel on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={storyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Corner brackets */}
            <div className="absolute -top-3 -left-3 w-7 h-7 z-20" style={{ borderTop: "2px solid #C9A84C", borderLeft: "2px solid #C9A84C" }} />
            <div className="absolute -bottom-3 -right-3 w-7 h-7 z-20" style={{ borderBottom: "2px solid #C9A84C", borderRight: "2px solid #C9A84C" }} />

            <div className="relative overflow-hidden shadow-2xl aspect-[4/3] sm:aspect-[14/11]"
              style={{ borderRadius: "20px", border: "7px solid white" }}>
              <Image
                src="/shawarma1.png"
                alt="Our Food Court"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(15,6,0,0.5) 0%, transparent 60%)" }} />
              {/* Floating label */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5"
                style={{ background: "rgba(240,232,216,0.9)", backdropFilter: "blur(10px)", borderRadius: "999px", border: "1px solid rgba(201,168,76,0.3)" }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#FB923C" }} />
                <span style={{ fontFamily: "sans-serif", fontSize: "7px", fontWeight: 700, letterSpacing: "0.3em", color: "#1a0e04" }}>
                  EST. 2024 · Piravom, KERALA
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS BAND
      ══════════════════════════════════════════ */}
      <section ref={statRef} className="relative overflow-hidden"
        style={{ background: "#1a0e04" }}>
        <div className="absolute inset-0 opacity-50 pointer-events-none"
          style={{ backgroundImage: DIAG, backgroundRepeat: "repeat" }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(201,135,26,0.07) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-5 py-12 sm:px-10 sm:py-14 md:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ border: "1px solid rgba(201,168,76,0.1)" }}>
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={statInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center py-8 px-4"
                style={{ background: "#1a0e04", borderRight: i < 3 ? "1px solid rgba(201,168,76,0.1)" : "none" }}
              >
                <p className="font-black italic" style={{ fontSize: "clamp(28px,4vw,44px)", color: "#C9A84C", lineHeight: 1, letterSpacing: "-0.03em" }}>
                  {s.num}
                </p>
                <p style={{ fontFamily: "sans-serif", fontSize: "8px", fontWeight: 700, letterSpacing: "0.3em", color: "rgba(255,255,255,0.35)", marginTop: "6px", textTransform: "uppercase" }}>
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          VALUES SECTION
      ══════════════════════════════════════════ */}
      <section ref={valRef} className="relative px-5 py-16 sm:px-10 sm:py-20 md:px-16 md:py-28">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: DIAG, backgroundRepeat: "repeat" }} />

        <div className="relative z-10 max-w-6xl mx-auto">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={valInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 md:mb-16"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-px" style={{ background: "#C9A84C" }} />
              <span style={{ fontFamily: "sans-serif", fontSize: "9px", fontWeight: 700, letterSpacing: "0.4em", color: "#C9A84C" }}>
                WHAT WE STAND FOR
              </span>
            </div>
            <h2 className="font-black italic" style={{ fontSize: "clamp(30px,4vw,54px)", color: "#1a0e04", lineHeight: 0.88, letterSpacing: "-0.03em" }}>
              Our Core<br />
              <span style={{ color: "#FB923C" }}>Values</span>
            </h2>
            <div className="mt-5 max-w-2xl"><Rule /></div>
          </motion.div>

          {/* Values cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.n}
                initial={{ opacity: 0, y: 40 }}
                animate={valInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.13, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden p-6 md:p-8"
                style={{ background: "white", borderRadius: "20px", border: "1px solid rgba(201,168,76,0.2)", boxShadow: "0 4px 24px rgba(26,14,4,0.06)" }}
              >
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: "linear-gradient(to right, #FB923C, #C9A84C)" }} />
                {/* Corner bracket */}
                <div className="absolute top-0 right-0 w-12 h-12"
                  style={{ background: "#C9A84C", clipPath: "polygon(100% 0, 0 0, 100% 100%)", opacity: 0.1 }} />

                {/* Number */}
                <p style={{ fontFamily: "sans-serif", fontSize: "9px", fontWeight: 700, letterSpacing: "0.4em", color: "#C9A84C", marginBottom: "12px" }}>
                  {v.n}
                </p>
                {/* Ghost big number */}
                <div className="absolute bottom-3 right-4 select-none pointer-events-none">
                  <span className="font-black italic" style={{ fontSize: "64px", color: "#1a0e04", opacity: 0.04, lineHeight: 1 }}>{v.n}</span>
                </div>

                <h3 className="font-black italic" style={{ fontSize: "clamp(20px,2vw,26px)", color: "#1a0e04", lineHeight: 0.9, letterSpacing: "-0.02em", marginBottom: "14px" }}>
                  {v.title}
                </h3>
                <div className="mb-4"><Rule /></div>
                <p style={{ fontFamily: "sans-serif", fontSize: "12px", color: "#7a5c38", lineHeight: 1.8 }}>
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER CTA STRIP
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden px-5 py-14 sm:px-10 sm:py-16 md:px-16 md:py-20"
        style={{ background: "#1a0e04" }}>
        <div className="absolute inset-0 opacity-40 pointer-events-none"
          style={{ backgroundImage: DIAG, backgroundRepeat: "repeat" }} />
        <div className="absolute bottom-0 left-0 w-48 h-40 md:w-64 md:h-52"
          style={{ background: "#FB923C", clipPath: "polygon(0 100%, 0 0, 100% 100%)", opacity: 0.1 }} />
        <div className="absolute top-0 right-0 w-32 h-32"
          style={{ background: "#C9A84C", clipPath: "polygon(100% 0, 0 0, 100% 100%)", opacity: 0.08 }} />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-3xl mx-auto text-center"
        >
          <div className="mb-6"><Rule color="#C9A84C40" /></div>
          <p style={{ fontFamily: "sans-serif", fontSize: "9px", fontWeight: 700, letterSpacing: "0.45em", color: "#C9A84C", marginBottom: "12px" }}>
            COME VISIT US
          </p>
          <h2 className="font-black italic text-white" style={{ fontSize: "clamp(32px,5vw,64px)", lineHeight: 0.88, letterSpacing: "-0.03em", marginBottom: "28px" }}>
            Ready to experience<br />
            <span style={{ color: "#C9A84C" }}>the difference?</span>
          </h2>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link href="/shops">
              <motion.span
                whileHover={{ scale: 1.05, background: "#C9A84C" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                style={{ display: "inline-block", fontFamily: "sans-serif", background: "#FB923C", color: "white", fontSize: "9px", fontWeight: 700, letterSpacing: "0.35em", padding: "14px 36px", borderRadius: "999px", cursor: "pointer", boxShadow: "0 8px 24px rgba(201,135,26,0.35)" }}
                className="uppercase"
              >
                View Outlets →
              </motion.span>
            </Link>
            <Link href="/contact">
              <motion.span
                whileHover={{ scale: 1.04, borderColor: "#C9A84C", color: "#C9A84C" }}
                style={{ display: "inline-block", fontFamily: "sans-serif", color: "rgba(255,255,255,0.5)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.35em", padding: "14px 28px", borderRadius: "999px", cursor: "pointer", border: "1.5px solid rgba(255,255,255,0.15)" }}
                className="uppercase"
              >
                Get in Touch
              </motion.span>
            </Link>
          </div>
          <div className="mt-8"><Rule color="#C9A84C30" /></div>
          <p className="mt-3 hidden sm:block" style={{ fontFamily: "sans-serif", fontSize: "7px", letterSpacing: "0.45em", color: "rgba(160,120,64,0.3)" }}>
            EIGHT CHAPTERS · ARTISAN COLLECTION · EST. 2024
          </p>
        </motion.div>
      </section>
    </main>
  )
}