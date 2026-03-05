"use client"

import {
  motion,
  useScroll,
  useTransform,
  useInView,
  Variants,
} from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"

/* ─────────────────── DATA ─────────────────── */
const CUISINES = [
  {
    id: "01",
    name: "North Indian",
    sub: "Malabar Kerala",
    tag: "Heritage Fire",
    year: "1847",
    desc: "Tandoor-kissed and smoke-laced. Born along ancient spice routes where every coal tells a story of kings.",
    note: "Signature dish: Raan-e-Sikandari",
    img: "/shawarma1.png",
    hue: "#FB923C",
  },
  {
    id: "02",
    name: "South Indian",
    sub: "Crisp & Golden",
    tag: "Coastal Ritual",
    year: "1923",
    desc: "Fermented batters, coconut chutneys, and the dawn music of a sizzling iron tawa — ritual made edible.",
    note: "Signature dish: Malabar Prawn Masala",
    img: "/fish.png",
    hue: "#F97316",
  },
  {
    id: "03",
    name: "Indo-Chinese",
    sub: "Wok & Fire",
    tag: "Fusion Flame",
    year: "1968",
    desc: "Two civilizations collide in one blazing wok. Schezwan heat. Soy depth. Smoke that lingers.",
    note: "Signature dish: Hakka Chilli Paneer",
    img: "/momos.png",
    hue: "#FB923C",
  },
]

/* ─────────────────── PATTERNS ─────────────────── */
const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.07'/%3E%3C/svg%3E")`
const DOTS = `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1.5' cy='1.5' r='1.2' fill='%23FB923C' opacity='0.35'/%3E%3C/svg%3E")`
const DIAG = `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0' y1='24' x2='24' y2='0' stroke='%23FB923C' stroke-width='0.5' opacity='0.12'/%3E%3C/svg%3E")`

/* ─────────────────── HELPERS ─────────────────── */
function Lozenge({ color }: { color: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" className="shrink-0">
      <rect x="1" y="1" width="8" height="8" rx="1" transform="rotate(45 5 5)" fill={color} />
    </svg>
  )
}

function Rule({ color = "#FB923C" }: { color?: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${color}60)` }} />
      <Lozenge color={color} />
      <div className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, ${color}60)` }} />
    </div>
  )
}

/* ─────────────────── VARIANTS ─────────────────── */
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.18,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] },
  },
}

const springHover = {
  type: "spring",
  stiffness: 400,
  damping: 18,
}

/* ─────────────────── TICKER ─────────────────── */
const TICKER_ITEMS = ["North Indian", "·", "South Indian", "·", "Indo-Chinese", "·", "Arabian Grill", "·", "Fast Food", "·", "Sweet Finales", "·"]

function Ticker() {
  return (
    <div className="overflow-hidden py-3 border-y" style={{ borderColor: "#FB923C30", background: "#FB923C08" }}>
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
      >
        {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
          <span
            key={i}
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "11px",
              color: t === "·" ? "#FB923C" : "#7a5c38",
              fontStyle: t !== "·" ? "italic" : "normal",
              letterSpacing: "0.1em",
            }}
          >
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/* ─────────────────── MAIN ─────────────────── */
export default function PremiumEditorialCuisine() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] })

  const heroScale = useTransform(scrollYProgress, [0, 0.28], [1.08, 1])
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])

  return (
    <div ref={containerRef} style={{ background: "#F0E8D8", fontFamily: "Georgia, serif" }} className="relative overflow-hidden">

      {/* Grain overlay */}
      <div className="fixed inset-0 pointer-events-none z-50" style={{ backgroundImage: GRAIN, backgroundSize: "200px", opacity: 0.38 }} />

      {/* ═══════════════════════════════════════════════════
          HERO SECTION — staggered text + subtle parallax image
      ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col md:grid md:grid-cols-12">

        {/* Hero image panel */}
        <div className="relative overflow-hidden h-[55vw] min-h-[320px] md:h-auto md:col-span-7">
          <motion.div style={{ scale: heroScale, y: heroY }} className="absolute inset-0">
            <Image src={CUISINES[0].img} alt="hero" fill className="object-cover" priority />
            <div className="absolute inset-0" style={{ background: "linear-gradient(120deg, rgba(15,8,2,0.12) 0%, rgba(15,8,2,0.58) 100%)" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(251,146,60,0.48) 0%, transparent 52%)" }} />
          </motion.div>

          {/* Floating chapter badge – fade + slide */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.1 }}
            className="absolute bottom-8 left-6 md:left-10 z-10"
          >
            <div className="flex items-end gap-3 md:gap-4">
              <div className="w-px h-12 md:h-16" style={{ background: "linear-gradient(to bottom, transparent, #FB923C)" }} />
              <div>
                <p style={{ fontFamily: "sans-serif", fontSize: "9px", fontWeight: 700, letterSpacing: "0.4em", color: "#FB923C", marginBottom: "4px" }}>
                  CHAPTER ONE
                </p>
                <p className="font-black italic text-white" style={{ fontSize: "clamp(22px,4vw,48px)", lineHeight: 1 }}>
                  North Indian
                </p>
                <p className="italic" style={{ color: "#FB923C", fontSize: "clamp(13px,1.5vw,16px)" }}>
                  Malabar Kerala
                </p>
              </div>
            </div>
          </motion.div>

          {/* Year stamp */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="absolute top-6 left-6 md:top-8 md:left-10 z-10"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center" style={{ borderColor: "rgba(251,146,60,0.5)" }}>
              <span style={{ fontFamily: "sans-serif", fontSize: "7px", fontWeight: 900, color: "#FB923C", letterSpacing: "0.05em", textAlign: "center", lineHeight: 1.3 }}>
                EST<br />1847
              </span>
            </div>
          </motion.div>

          <div className="absolute top-0 right-0 bottom-0 w-10 z-10 hidden md:block" style={{ backgroundImage: DOTS, backgroundRepeat: "repeat" }} />
        </div>

        {/* Editorial text – staggered children */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="relative flex flex-col justify-center px-6 py-12 md:col-span-5 md:px-10 md:py-16"
        >
          <div className="absolute inset-0" style={{ backgroundImage: DIAG, backgroundRepeat: "repeat" }} />
          <div className="absolute top-0 right-0 w-32 h-32 md:w-40 md:h-40 hidden md:block" style={{ background: "#FB923C", clipPath: "polygon(100% 0, 0 0, 100% 100%)" }} />

          <div className="relative z-10">
            <motion.div variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <div className="w-6 h-px" style={{ background: "#FB923C" }} />
                <span style={{ fontFamily: "sans-serif", fontSize: "9px", fontWeight: 700, letterSpacing: "0.4em", color: "#FB923C" }}>
                  THE CULINARY DIRECTORY
                </span>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} transition={{ delay: 0.15 }}>
              <h1 style={{ fontSize: "clamp(50px,7vw,100px)", color: "#1a0e04", lineHeight: 0.82, letterSpacing: "-0.03em" }} className="font-black italic">
                EIGHT
              </h1>
              <h1 style={{ fontSize: "clamp(36px,5.5vw,76px)", color: "#1a0e04", lineHeight: 0.82, letterSpacing: "-0.03em" }} className="font-black italic">
                on
              </h1>
              <h1 style={{ fontSize: "clamp(40px,6vw,84px)", color: "#1a0e04", lineHeight: 0.82, letterSpacing: "-0.03em" }} className="font-black italic">
                Chapters.
              </h1>
              <h1
                style={{
                  fontSize: "clamp(40px,6vw,84px)",
                  lineHeight: 0.82,
                  letterSpacing: "-0.03em",
                  color: "transparent",
                  WebkitTextStroke: "1.5px rgba(26,14,4,0.14)",
                  marginTop: "-3px",
                }}
                className="font-black italic select-none hidden sm:block"
              >
                Chapters.
              </h1>
            </motion.div>

            <motion.div variants={fadeInUp} transition={{ delay: 0.4 }}>
              <Rule />
              <blockquote className="mt-4 md:mt-5 pl-4 border-l-2" style={{ borderColor: "#FB923C" }}>
                <p className="italic leading-relaxed" style={{ color: "#5a3e1c", fontSize: "clamp(13px,1.4vw,15px)" }}>
                  "Every dish is a letter from the land, sealed with smoke, spice, and centuries of memory."
                </p>
                <p style={{ fontFamily: "sans-serif", fontSize: "8px", fontWeight: 700, letterSpacing: "0.35em", color: "#FB923C", marginTop: "10px" }}>
                  — THE HOUSE CHEF, VOL. VIII
                </p>
              </blockquote>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-8 md:mt-10 flex gap-3 flex-wrap">
              <motion.button
                whileHover={{ scale: 1.05, background: "#FB923C" }}
                whileTap={{ scale: 0.96 }}
                transition={springHover}
                style={{
                  fontFamily: "sans-serif",
                  background: "#1a0e04",
                  color: "white",
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.35em",
                  padding: "12px 28px",
                  borderRadius: "999px",
                }}
                className="uppercase shadow-xl"
              >
                Explore Menu
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                transition={springHover}
                style={{
                  fontFamily: "sans-serif",
                  background: "transparent",
                  color: "#1a0e04",
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.35em",
                  padding: "12px 20px",
                  borderRadius: "999px",
                  border: "1.5px solid rgba(26,14,4,0.25)",
                }}
                className="uppercase"
              >
                Our Story
              </motion.button>
            </motion.div>

            {/* Stats – fade stagger */}
            <motion.div variants={staggerContainer} className="mt-8 md:mt-12 grid grid-cols-3 gap-2 md:gap-4">
              {[
                ["8", "Chapters"],
                ["175+", "Recipes"],
                ["3", "Cultures"],
              ].map(([num, label]) => (
                <motion.div
                  key={label}
                  variants={fadeInUp}
                  className="text-center py-3 px-2"
                  style={{ borderTop: "1px solid rgba(251,146,60,0.3)" }}
                >
                  <p className="font-black italic" style={{ fontSize: "clamp(20px,2.5vw,28px)", color: "#1a0e04", lineHeight: 1 }}>
                    {num}
                  </p>
                  <p style={{ fontFamily: "sans-serif", fontSize: "7px", fontWeight: 700, letterSpacing: "0.3em", color: "#FB923C", marginTop: "2px" }}>
                    {label.toUpperCase()}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-8 md:h-10" style={{ backgroundImage: DOTS, backgroundRepeat: "repeat" }} />
        </motion.div>
      </section>

      <Ticker />

      {/* ═══════════════════════════════════════════════════
          CUISINE CARDS — staggered grid with hover lift
      ═══════════════════════════════════════════════════ */}
      <section className="relative px-4 sm:px-8 md:px-12 py-14 md:py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-6xl mx-auto mb-10 md:mb-16"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <motion.div variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-5 h-px" style={{ background: "#FB923C" }} />
                <span style={{ fontFamily: "sans-serif", fontSize: "9px", fontWeight: 700, letterSpacing: "0.4em", color: "#FB923C" }}>
                  ARTISAN COLLECTION
                </span>
              </div>
              <h2 className="font-black italic" style={{ fontSize: "clamp(30px,4.5vw,60px)", color: "#1a0e04", lineHeight: 0.9, letterSpacing: "-0.02em" }}>
                The Eight<br />Chapters
              </h2>
            </motion.div>

            <motion.div variants={fadeInUp} transition={{ delay: 0.15 }} className="sm:text-right pb-0 sm:pb-2">
              <p className="italic" style={{ color: "#7a5c38", fontSize: "13px" }}>
                Curated across
              </p>
              <p className="font-black italic" style={{ fontSize: "clamp(28px,4vw,40px)", color: "#FB923C", lineHeight: 1 }}>
                3
              </p>
              <p style={{ fontFamily: "sans-serif", fontSize: "8px", fontWeight: 700, letterSpacing: "0.3em", color: "#FB923C" }}>
                CULINARY TRADITIONS
              </p>
            </motion.div>
          </div>
          <motion.div variants={fadeInUp} className="mt-5 md:mt-6">
            <Rule color="#FB923C" />
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-5"
        >
          {CUISINES.map((item, i) => (
            <CuisineCard key={item.id} item={item} index={i} />
          ))}
          <InfoCard />
        </motion.div>
      </section>

      <Ticker />

      <GallerySection />

      {/* Footer CTA – fade + slight scale entrance */}
      <section className="relative py-20 md:py-28 px-6 md:px-12 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-48 h-40 md:w-72 md:h-60" style={{ background: "#FB923C", clipPath: "polygon(0 100%, 0 0%, 100% 100%)", opacity: 0.75 }} />
        <div className="absolute top-0 right-0 w-10 md:w-14 h-full" style={{ backgroundImage: DOTS, backgroundRepeat: "repeat" }} />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative z-10 max-w-3xl mx-auto text-center"
        >
          <p
            className="absolute inset-x-0 -top-8 md:-top-10 select-none pointer-events-none font-black italic"
            style={{ fontSize: "clamp(50px,10vw,120px)", color: "#FB923C", opacity: 0.05, letterSpacing: "-0.04em" }}
          >
            EXPLORE
          </p>

          <div className="mb-6 md:mb-8"><Rule color="#FB923C" /></div>

          <p style={{ fontFamily: "sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.45em", color: "#FB923C", marginBottom: "12px" }}>
            BEGIN THE EXPERIENCE
          </p>

          <h2 className="font-black italic" style={{ fontSize: "clamp(36px,6vw,80px)", color: "#1a0e04", lineHeight: 0.88, letterSpacing: "-0.03em" }}>
            Ready to start
          </h2>
          <h2
            className="font-black italic"
            style={{
              fontSize: "clamp(36px,6vw,80px)",
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(26,14,4,0.22)",
              lineHeight: 0.88,
              letterSpacing: "-0.03em",
              marginBottom: "28px",
            }}
          >
            the journey?
          </h2>

          <div className="flex items-center justify-center gap-3 md:gap-4 flex-wrap">
            <div className="h-px w-8 md:w-10" style={{ background: "rgba(251,146,60,0.5)" }} />
            <motion.button
              whileHover={{ scale: 1.06, background: "#FB923C" }}
              whileTap={{ scale: 0.96 }}
              transition={springHover}
              style={{
                fontFamily: "sans-serif",
                background: "#1a0e04",
                color: "white",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.35em",
                padding: "15px 36px",
                borderRadius: "999px",
              }}
              className="uppercase shadow-2xl"
            >
              View Full Menu
            </motion.button>
            <div className="h-px w-8 md:w-10" style={{ background: "rgba(251,146,60,0.5)" }} />
          </div>

          <div className="mt-10 md:mt-12"><Rule color="#FB923C" /></div>
          <p className="mt-3 hidden sm:block" style={{ fontFamily: "sans-serif", fontSize: "8px", letterSpacing: "0.45em", color: "rgba(251,146,60,0.25)" }}>
            EIGHT CHAPTERS · ARTISAN COLLECTION · HERITAGE RECIPES · EST. 2021
          </p>
        </motion.div>
      </section>
    </div>
  )
}

/* ─────────────────── CUISINE CARD ─────────────────── */
function CuisineCard({ item, index }: { item: any; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })
  const [hovered, setHovered] = useState(false)

  const lgColSpan = index === 0 ? "lg:col-span-7" : "lg:col-span-5"
  const mdColSpan = index === 0 ? "md:col-span-2" : "md:col-span-1"
  const aspect = index === 0 ? "aspect-[16/10] md:aspect-[16/10]" : index === 1 ? "aspect-[4/3] md:aspect-[3/4]" : "aspect-[4/3]"

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay: index * 0.13 }}
      className={`${lgColSpan} ${mdColSpan} relative group`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute -top-2 -left-2 w-6 h-6 md:w-7 md:h-7 z-20" style={{ borderTop: `2px solid ${item.hue}`, borderLeft: `2px solid ${item.hue}` }} />
      <div className="absolute -bottom-2 -right-2 w-6 h-6 md:w-7 md:h-7 z-20" style={{ borderBottom: `2px solid ${item.hue}`, borderRight: `2px solid ${item.hue}` }} />

      <motion.div
        className={`relative overflow-hidden ${aspect} shadow-xl`}
        style={{ borderRadius: "16px", border: "6px solid white" }}
        whileHover={{ scale: 1.03, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.3)" }}
        transition={springHover}
      >
        <motion.div animate={{ scale: hovered ? 1.07 : 1 }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0">
          <Image src={item.img} alt={item.name} fill className="object-cover brightness-[0.97] group-hover:brightness-105 transition-all duration-700" />
        </motion.div>

        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,6,0,0.82) 0%, rgba(251,146,60,0.18) 45%, transparent 65%)" }} />
        <div className="absolute top-0 left-0 right-0 h-1/3" style={{ background: `linear-gradient(to bottom, ${item.hue}35, transparent)` }} />

        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 + index * 0.1 }}
          className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1.5 z-10"
          style={{ background: "rgba(240,232,216,0.18)", backdropFilter: "blur(10px)", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.22)" }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: item.hue }} />
          <span style={{ fontFamily: "sans-serif", fontSize: "7px", fontWeight: 700, letterSpacing: "0.3em", color: "white" }}>
            {item.tag.toUpperCase()}
          </span>
        </motion.div>

        {/* Year badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + index * 0.1 }}
          className="absolute top-3 right-3 z-10"
        >
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(251,146,60,0.22)", backdropFilter: "blur(8px)", border: "1px solid rgba(251,146,60,0.4)" }}>
            <span style={{ fontFamily: "sans-serif", fontSize: "6px", fontWeight: 900, color: "#FB923C", lineHeight: 1.2, textAlign: "center" }}>
              {item.year.slice(0, 2)}<br />{item.year.slice(2)}
            </span>
          </div>
        </motion.div>

        {/* Bottom content – reveal on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 z-10">
          <div className="flex justify-between items-end">
            <div className="flex-1">
              <p style={{ fontFamily: "sans-serif", fontSize: "7px", fontWeight: 700, letterSpacing: "0.35em", color: item.hue, marginBottom: "3px" }}>
                SEC_{item.id}
              </p>
              <h3 className="font-black italic text-white" style={{ fontSize: index === 0 ? "clamp(22px,3vw,40px)" : "clamp(18px,2.5vw,32px)", lineHeight: 0.9, letterSpacing: "-0.01em" }}>
                {item.name}
              </h3>
              <p className="italic" style={{ color: "rgba(255,255,255,0.6)", fontSize: "clamp(11px,1.2vw,13px)", marginTop: "2px" }}>
                {item.sub}
              </p>

              <motion.p
                animate={{ opacity: hovered ? 1 : 0.75, y: hovered ? 0 : 6 }}
                transition={{ duration: 0.5 }}
                style={{ fontFamily: "sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.75)", lineHeight: 1.6, maxWidth: "360px", marginTop: "8px" }}
              >
                {item.desc}
              </motion.p>

              <motion.p
                animate={{ opacity: hovered ? 0.7 : 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                style={{ fontFamily: "sans-serif", fontSize: "9px", color: item.hue, marginTop: "6px", fontStyle: "italic" }}
              >
                {item.note}
              </motion.p>
            </div>

            <div className="ml-3 flex-shrink-0">
              <p className="font-black italic" style={{ fontSize: "clamp(36px,5vw,52px)", color: "white", opacity: 0.12, lineHeight: 1, userSelect: "none" }}>
                {item.id}
              </p>
            </div>
          </div>

          <motion.div
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 12 }}
            transition={{ duration: 0.4 }}
            className="mt-3 md:mt-4"
          >
            <button
              style={{
                fontFamily: "sans-serif",
                background: item.hue,
                color: "white",
                fontSize: "8px",
                fontWeight: 700,
                letterSpacing: "0.35em",
                padding: "8px 18px",
                borderRadius: "999px",
              }}
              className="uppercase"
            >
              Explore Dishes →
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─────────────────── INFO CARD ─────────────────── */
function InfoCard() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay: 0.39 }}
      className="col-span-1 md:col-span-2 lg:col-span-7 relative"
    >
      <div className="h-full relative overflow-hidden" style={{ background: "#1a0e04", borderRadius: "16px", minHeight: "220px", display: "flex", flexDirection: "column" }}>
        <div className="flex flex-col sm:flex-row h-full">
          <div className="relative sm:w-48 md:w-52 flex-shrink-0 overflow-hidden h-40 sm:h-auto">
            <Image src="/biriyani.png" alt="featured" fill className="object-cover opacity-65" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent, #1a0e04 90%)" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(251,146,60,0.38) 0%, transparent 60%)" }} />
            <div className="absolute bottom-4 left-4">
              <p style={{ fontFamily: "sans-serif", fontSize: "7px", fontWeight: 700, letterSpacing: "0.3em", color: "#FB923C" }}>
                CHEF'S PICK
              </p>
            </div>
          </div>

          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: DIAG, backgroundRepeat: "repeat" }} />
          <div className="absolute top-0 right-0 w-28 h-28 md:w-32 md:h-32" style={{ background: "#FB923C", clipPath: "polygon(100% 0, 0 0, 100% 100%)", opacity: 0.18 }} />

          <div className="relative z-10 flex-1 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <p style={{ fontFamily: "sans-serif", fontSize: "9px", fontWeight: 700, letterSpacing: "0.4em", color: "#FB923C", marginBottom: "10px" }}>
                FEATURED EXPERIENCE
              </p>
              <h3 className="font-black italic text-white" style={{ fontSize: "clamp(20px,2.5vw,34px)", lineHeight: 0.9, letterSpacing: "-0.02em", marginBottom: "10px" }}>
                Arabian Grill<br />
                <span style={{ color: "#FB923C" }}>&amp; Fast Food</span>
              </h3>
              <p style={{ fontFamily: "sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, maxWidth: "300px" }}>
                Experience the pinnacle of craftsmanship — techniques passed down through generations, now plated for the modern table.
              </p>
            </div>
            <div className="flex items-center justify-between mt-5 md:mt-6 flex-wrap gap-3">
              <div>
                <p style={{ fontFamily: "sans-serif", fontSize: "8px", fontWeight: 700, letterSpacing: "0.3em", color: "rgba(255,255,255,0.25)" }}>
                  SEASONAL MENU
                </p>
                <p className="font-black italic" style={{ fontSize: "clamp(20px,2.5vw,28px)", color: "rgba(255,255,255,0.06)", lineHeight: 1 }}>
                  2024
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.07, background: "#FB923C" }}
                whileTap={{ scale: 0.95 }}
                transition={springHover}
                style={{
                  fontFamily: "sans-serif",
                  background: "#EA580C",
                  color: "white",
                  fontSize: "8px",
                  fontWeight: 700,
                  letterSpacing: "0.35em",
                  padding: "10px 20px",
                  borderRadius: "999px",
                }}
                className="uppercase whitespace-nowrap"
              >
                Explore Dishes
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────── GALLERY SECTION ─────────────────── */
/* ─────────────────── GALLERY SECTION ─────────────────── */
function GallerySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })

  const imgParallax1 = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"])
  const imgParallax2 = useTransform(scrollYProgress, [0, 1], ["0%", "9%"])
  const imgParallax3 = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"])
  const imgParallax4 = useTransform(scrollYProgress, [0, 1], ["0%", "7%"])

  return (
    <section ref={ref} className="relative px-4 sm:px-8 md:px-12 py-14 md:py-24 overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundImage: DIAG, backgroundRepeat: "repeat", opacity: 0.7 }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(251,146,60,0.1) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 md:mb-14"
        >
          <motion.div variants={fadeInUp}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-5 h-px" style={{ background: "#FB923C" }} />
              <span style={{ fontFamily: "sans-serif", fontSize: "9px", fontWeight: 700, letterSpacing: "0.4em", color: "#FB923C" }}>
                SIGNATURE DISHES
              </span>
            </div>
            <h2 className="font-black italic" style={{ fontSize: "clamp(28px,4.5vw,58px)", color: "#1a0e04", lineHeight: 0.88, letterSpacing: "-0.02em" }}>
              A Feast<br />for the Eyes
            </h2>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            transition={{ delay: 0.15 }}
            className="italic sm:max-w-xs sm:text-right"
            style={{ color: "#7a5c38", fontSize: "clamp(12px,1.4vw,14px)", lineHeight: 1.7 }}
          >
            Each frame is a window into the soul of a cuisine — composed with the same care as the dish itself.
          </motion.div>
        </motion.div>

        {/* ── Grid ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-5 items-start"
        >

          {/* ════ LEFT — tall card ════ */}
          <motion.div
            variants={cardVariants}
            className="relative group md:col-span-1 lg:col-span-4"
            style={{ height: "clamp(300px, 45vw, 520px)" }}
          >
            <div className="absolute -top-2 -left-2 w-6 h-6 md:w-7 md:h-7 z-20" style={{ borderTop: "2px solid #FB923C", borderLeft: "2px solid #FB923C" }} />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 md:w-7 md:h-7 z-20" style={{ borderBottom: "2px solid #FB923C", borderRight: "2px solid #FB923C" }} />

            <div className="relative w-full h-full overflow-hidden shadow-2xl" style={{ borderRadius: "16px", border: "6px solid white" }}>
              <motion.div style={{ y: imgParallax1 }} className="absolute inset-0 h-[118%] top-[-9%]">
                <Image src="/shawarma.png" alt="tandoor" fill className="object-cover transition-transform duration-900 group-hover:scale-105" />
              </motion.div>
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,6,0,0.88) 0%, rgba(251,146,60,0.22) 50%, transparent 70%)" }} />
              <div className="absolute top-0 left-0 right-0 h-1/4" style={{ background: "linear-gradient(to bottom, rgba(251,146,60,0.38), transparent)" }} />

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1.5 z-10"
                style={{ background: "rgba(255,255,255,0.14)", backdropFilter: "blur(10px)", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#FB923C" }} />
                <span style={{ fontFamily: "sans-serif", fontSize: "7px", fontWeight: 700, letterSpacing: "0.3em", color: "white" }}>HERITAGE FIRE</span>
              </motion.div>

              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 z-10">
                <p style={{ fontFamily: "sans-serif", fontSize: "7px", fontWeight: 700, letterSpacing: "0.35em", color: "#FB923C", marginBottom: "4px" }}>SEC_01</p>
                <h4 className="font-black italic text-white" style={{ fontSize: "clamp(20px,2.5vw,26px)", lineHeight: 0.9 }}>
                  Tandoor<br />Heritage
                </h4>
                <p className="italic" style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", marginTop: "4px" }}>North Indian</p>
                <div className="mt-3 md:mt-4 w-8 h-px" style={{ background: "#FB923C" }} />
              </div>

              <div className="absolute bottom-4 right-5 select-none pointer-events-none">
                <span className="font-black italic" style={{ fontSize: "clamp(50px,8vw,80px)", color: "white", opacity: 0.07, lineHeight: 1 }}>01</span>
              </div>
            </div>
          </motion.div>

          {/* ════ CENTER column ════ */}
          <div className="flex flex-col gap-4 md:gap-5 md:col-span-1 lg:col-span-4">

            {/* Momos image */}
            <motion.div variants={cardVariants} className="relative group" style={{ height: "clamp(200px, 30vw, 280px)" }}>
              <div className="relative w-full h-full overflow-hidden shadow-xl" style={{ borderRadius: "14px", border: "6px solid white" }}>
                <motion.div style={{ y: imgParallax2 }} className="absolute inset-0 h-[118%] top-[-9%]">
                  <Image src="/momos.png" alt="dosa" fill className="object-cover transition-transform duration-900 group-hover:scale-105" />
                </motion.div>
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,6,0,0.82) 0%, transparent 55%)" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(251,146,60,0.32) 0%, transparent 40%)" }} />

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="absolute top-3 right-3 z-10"
                >
                  <div className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(251,146,60,0.25)", backdropFilter: "blur(8px)", border: "1px solid rgba(251,146,60,0.45)" }}>
                    <span style={{ fontFamily: "sans-serif", fontSize: "6px", fontWeight: 900, color: "#FB923C", lineHeight: 1.2, textAlign: "center" }}>19<br />23</span>
                  </div>
                </motion.div>

                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 z-10">
                  <p style={{ fontFamily: "sans-serif", fontSize: "7px", fontWeight: 700, letterSpacing: "0.35em", color: "#F97316", marginBottom: "3px" }}>SEC_02</p>
                  <h4 className="font-black italic text-white" style={{ fontSize: "clamp(18px,2vw,22px)", lineHeight: 0.9 }}>Crisp & Golden</h4>
                  <p className="italic" style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", marginTop: "3px" }}>South Indian</p>
                </div>
              </div>
            </motion.div>

            {/* Editorial quote block */}
            <motion.div
              variants={fadeInUp}
              className="relative p-5 md:p-8 overflow-hidden"
              style={{ background: "#1a0e04", borderRadius: "14px", minHeight: "180px" }}
            >
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: DIAG, backgroundRepeat: "repeat" }} />
              <div className="absolute top-0 left-0 w-20 h-20 md:w-24 md:h-24" style={{ background: "#FB923C", clipPath: "polygon(0 0, 0 100%, 100% 0)", opacity: 0.15 }} />
              <div className="relative z-10">
                <p style={{ fontFamily: "sans-serif", fontSize: "8px", fontWeight: 700, letterSpacing: "0.35em", color: "#FB923C", marginBottom: "8px" }}>THE PHILOSOPHY</p>
                <blockquote className="italic" style={{ fontSize: "clamp(13px,1.5vw,16px)", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
                  "Food is memory made edible — a spice carries the ghost of a grandmother's kitchen."
                </blockquote>
                <p style={{ fontFamily: "sans-serif", fontSize: "8px", fontWeight: 700, letterSpacing: "0.3em", color: "#FB923C", marginTop: "12px" }}>— HEAD CHEF, VOL. VIII</p>
                <div className="mt-4 flex gap-2 flex-wrap">
                  {["Artisan", "Heritage", "Seasonal"].map((t) => (
                    <span
                      key={t}
                      style={{ fontFamily: "sans-serif", fontSize: "7px", fontWeight: 700, letterSpacing: "0.2em", color: "#FB923C", border: "1px solid rgba(251,146,60,0.35)", borderRadius: "4px", padding: "4px 8px", background: "rgba(251,146,60,0.05)" }}
                    >
                      {t.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ════ RIGHT column — stat → morning ritual → biriyani ════ */}
          <div className="flex flex-col gap-4 md:gap-5 md:col-span-2 lg:col-span-4">

            {/* Stat card */}
            <motion.div
              variants={fadeInUp}
              className="relative p-5 overflow-hidden"
              style={{ background: "#FB923C", borderRadius: "14px" }}
            >
              <div className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20" style={{ background: "rgba(255,255,255,0.12)", clipPath: "polygon(100% 0, 0 0, 100% 100%)", borderRadius: "0 14px 0 0" }} />
              <p style={{ fontFamily: "sans-serif", fontSize: "8px", fontWeight: 700, letterSpacing: "0.35em", color: "rgba(255,255,255,0.65)", marginBottom: "6px" }}>CULINARY LEGACY</p>
              <h4 className="font-black italic text-white" style={{ fontSize: "clamp(20px,2.5vw,32px)", lineHeight: 0.9 }}>
                175+<br />Recipes
              </h4>
              <p style={{ fontFamily: "sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.7)", marginTop: "8px", lineHeight: 1.5 }}>
                Across three culinary traditions, curated over 175 years.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.25)" }} />
                <Lozenge color="rgba(255,255,255,0.5)" />
              </div>
            </motion.div>
           
            {/* Biriyani tall card — fully fluid width, no fixed px */}
            <motion.div
              variants={cardVariants}
              className="relative group"
              style={{ height: "clamp(260px, 32vw, 380px)" }}
            >
              <div className="absolute -top-2 -right-2 w-6 h-6 md:w-7 md:h-7 z-20" style={{ borderTop: "2px solid #FB923C", borderRight: "2px solid #FB923C" }} />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 md:w-7 md:h-7 z-20" style={{ borderBottom: "2px solid #FB923C", borderLeft: "2px solid #FB923C" }} />

              <div className="relative w-full h-full overflow-hidden shadow-2xl" style={{ borderRadius: "16px", border: "6px solid white" }}>
                <motion.div style={{ y: imgParallax3 }} className="absolute inset-0 h-[150%] top-[-16%]">
                  <Image src="/biriyani.png" alt="wok" fill className="object-cover transition-transform duration-900 group-hover:scale-105" />
                </motion.div>
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,6,0,0.88) 0%, rgba(251,146,60,0.22) 50%, transparent 70%)" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(251,146,60,0.28) 0%, transparent 35%)" }} />

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1.5 z-10"
                  style={{ background: "rgba(255,255,255,0.14)", backdropFilter: "blur(10px)", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.2)" }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#FB923C" }} />
                  <span style={{ fontFamily: "sans-serif", fontSize: "7px", fontWeight: 700, letterSpacing: "0.3em", color: "white" }}>FUSION FLAME</span>
                </motion.div>

                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 z-10">
                  <p style={{ fontFamily: "sans-serif", fontSize: "7px", fontWeight: 700, letterSpacing: "0.35em", color: "#FB923C", marginBottom: "4px" }}>SEC_03</p>
                  <h4 className="font-black italic text-white" style={{ fontSize: "clamp(18px,2vw,24px)", lineHeight: 0.9 }}>
                    Wok &<br />Fire
                  </h4>
                  <p className="italic" style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", marginTop: "4px" }}>Indo-Chinese</p>
                </div>

                <div className="absolute bottom-4 right-5 select-none pointer-events-none">
                  <span className="font-black italic" style={{ fontSize: "clamp(50px,8vw,80px)", color: "white", opacity: 0.07, lineHeight: 1 }}>03</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-10 md:mt-14">
          <Rule color="#FB923C" />
        </motion.div>
      </div>
    </section>
  )
}