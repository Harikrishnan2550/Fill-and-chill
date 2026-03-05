"use client"

import { motion, useScroll, useTransform, useSpring, Variants } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { Courgette } from "next/font/google"

const courgette = Courgette({ subsets: ["latin"], weight: "400" })

/* ─────────────────── SVG PATTERNS ─────────────────── */
const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.07'/%3E%3C/svg%3E")`
const DOTS  = `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1.5' cy='1.5' r='1.2' fill='%23FB923C' opacity='0.35'/%3E%3C/svg%3E")`
const DIAG  = `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0' y1='24' x2='24' y2='0' stroke='%23FB923C' stroke-width='0.5' opacity='0.12'/%3E%3C/svg%3E")`

/* ─────────────────── HELPERS ─────────────────── */
function Lozenge({ color = "#FB923C" }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" className="shrink-0">
      <rect x="1" y="1" width="8" height="8" rx="1" transform="rotate(45 5 5)" fill={color} />
    </svg>
  )
}

function Rule() {
  return (
    <div className="flex items-center gap-2">
      <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, #FB923C60)" }} />
      <Lozenge />
      <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, #FB923C60)" }} />
    </div>
  )
}

/* ─────────────────── VARIANTS ─────────────────── */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.18,
    },
  },
}

const headlineWordVariants: Variants = {
  hidden: { y: "120%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const springHover = {
  type: "spring",
  stiffness: 420,
  damping: 18,
}

/* ─────────────────── MAIN COMPONENT ─────────────────── */
export default function PremiumEditorialHero() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 24,
    stiffness: 90,
  })

  const dishY      = useTransform(smoothProgress, [0, 1], [0, 180])
  const textY      = useTransform(smoothProgress, [0, 1], [0, -130])
  const dishRotate = useTransform(smoothProgress, [0, 1], [0, 12])
  const opacity    = useTransform(smoothProgress, [0, 0.45], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden flex flex-col justify-center"
      style={{ background: "#F0E8D8", fontFamily: "Georgia, serif" }}
    >
      {/* Overlays */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-40" style={{ backgroundImage: GRAIN, backgroundSize: "200px" }} />
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: DIAG, backgroundRepeat: "repeat" }} />
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse at 68% 45%, rgba(251,146,60,0.15) 0%, transparent 62%)" }}
      />

      {/* Orange panel – desktop */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 1.6, ease: [0.19, 1, 0.22, 1] }}
        className="absolute inset-y-0 right-0 z-[1] hidden md:block"
        style={{
          width: "50%",
          background: "linear-gradient(155deg, #FB923C 0%, #ea580c 100%)",
          clipPath: "polygon(14% 0%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: DIAG, backgroundRepeat: "repeat" }} />
        <div className="absolute inset-y-0 left-0 w-10 opacity-45" style={{ backgroundImage: DOTS, backgroundRepeat: "repeat" }} />
      </motion.div>

      {/* Mobile orange tint */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 z-[1] md:hidden pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(251,146,60,0.18) 0%, transparent 100%)" }}
      />

      {/* Left dot strip */}
      <div className="absolute inset-y-0 left-0 w-6 md:w-10 opacity-50 z-[2]" style={{ backgroundImage: DOTS, backgroundRepeat: "repeat" }} />

      {/* ══════════════════════════════════════════
          MAIN CONTENT GRID
      ══════════════════════════════════════════ */}
      <div className="relative z-10 max-w-6xl mx-auto w-full px-6 sm:px-10 md:px-14 pt-24 sm:pt-28 pb-36 sm:pb-44 md:pb-48 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

        {/* LEFT COLUMN – TEXT */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ opacity, y: textY }}
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUpVariants} className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="w-6 h-px bg-[#FB923C]" />
            <span className="font-sans font-bold uppercase tracking-[0.45em] text-[#5e3718]" style={{ fontSize: "9px" }}>
              THE ART OF KERALA CUISINE
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div className="mb-6 md:mb-8">
            {["Bolder", "Flavor", "Ritual."].map((word, i) => (
              <div className="overflow-hidden" key={word}>
                <motion.h1
                  variants={headlineWordVariants}
                  custom={i}
                  className={`${courgette.className} m-0 leading-[0.95] tracking-[0.01em] ${i === 2 ? "mb-6 md:mb-8" : ""}`}
                  style={{ fontSize: "clamp(52px, 10vw, 118px)", color: "#5e3718  " }}
                >
                  {word}
                </motion.h1>
              </div>
            ))}
          </motion.div>

          {/* Rule */}
          <motion.div variants={fadeUpVariants} className="mb-6 md:mb-7">
            <Rule />
          </motion.div>

          {/* Quote */}
          <motion.div variants={fadeUpVariants} className="pl-4 border-l-2 border-[#FB923C]/50 mb-7 md:mb-9">
            <p className="italic text-[#5a3e1c] leading-relaxed text-[14px] sm:text-[15px] m-0">
              Authentic ingredients. Traditional methods.<br className="hidden sm:block" />Modern atmosphere.
            </p>
            <p className="font-sans font-bold uppercase tracking-[0.35em] text-[#FB923C] mt-2.5" style={{ fontSize: "8px" }}>
              — PIRAVOM , ERANAMKULAM
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUpVariants} className="flex gap-3 flex-wrap">
            <Link href="/shops">
              <motion.span
                whileHover={{ scale: 1.05, background: "#FB923C" }}
                whileTap={{ scale: 0.96 }}
                transition={springHover}
                className="inline-block font-sans font-bold uppercase tracking-[0.35em] text-white bg-[#1a0e04] rounded-full cursor-pointer shadow-2xl px-7 sm:px-8 py-3 sm:py-3.5"
                style={{ fontSize: "9px" }}
              >
                Book a Table
              </motion.span>
            </Link>

            <Link href="/gallery">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                transition={springHover}
                className="inline-flex items-center gap-2 font-sans font-bold uppercase tracking-[0.35em] text-[#1a0e04] bg-transparent border border-[#1a0e04]/20 rounded-full cursor-pointer px-5 sm:px-6 py-3 sm:py-3.5"
                style={{ fontSize: "9px" }}
              >
                View Gallery →
              </motion.span>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeUpVariants} className="grid grid-cols-3 mt-8 md:mt-11 border-t border-[#FB923C]/25">
            {[
              ["8", "Chapters"],
              ["175+", "Recipes"],
              ["4.9", "Rating"],
            ].map(([num, label], i) => (
              <div
                key={label}
                className={`text-center py-3 sm:py-3.5 px-2 ${i < 2 ? "border-r border-[#FB923C]/15" : ""}`}
              >
                <p className="font-black italic text-[#1a0e04] leading-none m-0 text-xl sm:text-2xl">
                  {num}
                </p>
                <p className="font-sans font-bold uppercase tracking-[0.3em] text-[#FB923C] mt-1" style={{ fontSize: "7px" }}>
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN – DISH & GARNISHES */}
        <div className="relative flex items-center justify-center h-[340px] sm:h-[480px] md:h-[620px]">

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="absolute top-3 md:top-5 right-0 md:-right-2 z-30 w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-full border border-white/40 bg-white/20 backdrop-blur-md flex items-center justify-center"
          >
            <span className="font-sans font-black text-white text-center leading-[1.3]" style={{ fontSize: "7px" }}>
              EST<br />2021
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="absolute top-5 md:top-7 left-0 md:-left-4 z-30 flex items-center gap-2 rounded-full px-3 md:px-4 py-2 backdrop-blur-md border border-[#FB923C]/35"
            style={{ background: "rgba(240,232,216,0.92)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#FB923C]" />
            <span className="font-sans font-bold uppercase tracking-[0.3em] text-[#1a0e04]" style={{ fontSize: "7px" }}>
              SIGNATURE DISH
            </span>
          </motion.div>

          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-6 md:w-7 h-6 md:h-7 z-[35] border-t-2 border-l-2 border-[#FB923C]/55" />
          <div className="absolute bottom-0 right-0 w-6 md:w-7 h-6 md:h-7 z-[35] border-b-2 border-r-2 border-[#FB923C]/55" />

          {/* Main dish */}
          <motion.div
            style={{ y: dishY, rotate: dishRotate }}
            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
            animate={{ scale: 1.15, opacity: 1, rotate: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 w-full aspect-square"
            style={{ filter: "drop-shadow(0 60px 80px rgba(0,0,0,0.42))" }}
          >
            <Image
              src="/biriyani.png"
              alt="Signature Biriyani"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Floating garnishes */}
          <div className="absolute inset-0 z-30 pointer-events-none">
            {/* Chilli */}
            <motion.div
              animate={{ y: [0, 16, 0], x: [0, -10, 0], rotate: [-12, 2, -12] }}
              transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40"
              style={{ top: "14%", left: "4%" }}
            >
              <Image
                src="/chilly.png"
                alt="chilli"
                width={220}
                height={220}
                className="object-contain"
                style={{ filter: "drop-shadow(0 12px 20px rgba(0,0,0,0.22))" }}
              />
            </motion.div>

            {/* Star anise top-right */}
            <motion.div
              animate={{ y: [0, -20, 0], rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              className="absolute w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 blur-[0.5px]"
              style={{ top: "4%", right: "2%" }}
            >
              <Image
                src="/star.png"
                alt="star anise"
                width={160}
                height={160}
                className="object-contain opacity-90"
                style={{ filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.2))" }}
              />
            </motion.div>

            {/* Star anise bottom-right */}
            <motion.div
              animate={{ y: [0, 12, 0], rotate: [-18, 18, -18] }}
              transition={{ duration: 7.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
              style={{ bottom: "20%", right: "6%" }}
            >
              <Image
                src="/star.png"
                alt="star anise"
                width={190}
                height={190}
                className="object-contain"
                style={{ filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.22))" }}
              />
            </motion.div>

            {/* Mint */}
            <motion.div
              animate={{ scale: [1, 1.05, 1], y: [0, -10, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute z-40 w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56"
              style={{ bottom: "-16px", left: "8%" }}
            >
              <Image
                src="/mint.png"
                alt="mint"
                width={340}
                height={340}
                className="object-contain"
                style={{ filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.28))" }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          FROSTED INFO BAR
      ══════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-32px)] sm:w-[calc(100%-64px)] max-w-[1200px]"
      >
        <div
          className="relative rounded-2xl sm:rounded-3xl px-4 sm:px-6 py-3 sm:py-4 border border-[#FB923C]/30 shadow-[0_8px_40px_rgba(26,14,4,0.1)] backdrop-blur-xl"
          style={{ background: "rgba(240,232,216,0.65)" }}
        >
          <div className="absolute top-0 left-[10%] right-[10%] h-px" style={{ background: "linear-gradient(to right, transparent, #FB923C90, transparent)" }} />

          {/* Mobile layout */}
          <div className="flex flex-col gap-3 sm:hidden">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="font-sans font-bold uppercase tracking-[0.3em] text-[#FB923C] mb-0.5" style={{ fontSize: "8px" }}>
                  LOCATION
                </p>
                <p className="font-black italic text-[#1a0e04] m-0 text-[14px]">Piravom, Kerala</p>
              </div>
              <div>
                <p className="font-sans font-bold uppercase tracking-[0.3em] text-[#FB923C] mb-0.5" style={{ fontSize: "8px" }}>
                  OPEN HOURS
                </p>
                <p className="font-black italic text-[#1a0e04] m-0 text-[13px]">11 AM – 11:30 PM</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="#FB923C">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="font-black italic text-[#1a0e04] m-0 text-[15px]">4.9</p>
              </div>

              <Link href="/shops">
                <motion.span
                  whileHover={{ scale: 1.05, background: "#FB923C" }}
                  whileTap={{ scale: 0.96 }}
                  transition={springHover}
                  className="inline-block font-sans font-bold uppercase tracking-[0.35em] text-white bg-[#1a0e04] rounded-full cursor-pointer whitespace-nowrap px-5 py-2"
                  style={{ fontSize: "8px" }}
                >
                  Reserve Now →
                </motion.span>
              </Link>
            </div>
          </div>

          {/* Desktop / tablet layout */}
          <div className="hidden sm:flex items-center justify-between gap-3">
            <div className="shrink-0">
              <p className="font-sans font-bold uppercase tracking-[0.3em] text-[#FB923C] mb-0.5" style={{ fontSize: "8px" }}>
                LOCATION
              </p>
              <p className="font-black italic text-[#1a0e04] m-0 text-[15px]">Piravom, Kerala</p>
            </div>

            <div className="w-px h-9 bg-[#FB923C]/35 shrink-0" />

            <div className="shrink-0">
              <p className="font-sans font-bold uppercase tracking-[0.3em] text-[#FB923C] mb-0.5" style={{ fontSize: "8px" }}>
                OPEN HOURS
              </p>
              <p className="font-black italic text-[#1a0e04] m-0 text-[15px]">11:00 AM – 11:30 PM</p>
            </div>

            <div className="w-px h-9 bg-[#FB923C]/35 shrink-0" />

            <div className="w-20 xl:w-24 shrink-0 hidden lg:block">
              <Rule />
            </div>

            <div className="w-px h-9 bg-[#FB923C]/35 shrink-0 hidden lg:block" />

            <div className="flex items-center gap-2.5 shrink-0">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="#FB923C">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <div>
                <p className="font-black italic text-[#1a0e04] leading-none m-0 text-[17px]">4.9</p>
                <p className="font-sans font-bold uppercase tracking-[0.25em] text-[#FB923C] m-0" style={{ fontSize: "7px" }}>
                  CUSTOMER RATING
                </p>
              </div>
            </div>

            <div className="w-px h-9 bg-[#FB923C]/35 shrink-0" />

            <Link href="/shops" className="shrink-0">
              <motion.span
                whileHover={{ scale: 1.05, background: "#FB923C" }}
                whileTap={{ scale: 0.96 }}
                transition={springHover}
                className="inline-block font-sans font-bold uppercase tracking-[0.35em] text-white bg-[#1a0e04] rounded-full cursor-pointer whitespace-nowrap px-5 sm:px-6 py-2 sm:py-2.5"
                style={{ fontSize: "8px" }}
              >
                Reserve Now →
              </motion.span>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}