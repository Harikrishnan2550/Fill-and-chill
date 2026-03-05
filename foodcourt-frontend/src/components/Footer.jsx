"use client"

import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

/* ─────────────────── PATTERNS ─────────────────── */
const DIAG = `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0' y1='24' x2='24' y2='0' stroke='%23a07840' stroke-width='0.5' opacity='0.06'/%3E%3C/svg%3E")`

/* ─────────────────── HELPERS ─────────────────── */
function Lozenge({ color = "#C9A84C" }) {
  return (
    <svg width="8" height="8" viewBox="0 0 10 10" style={{ flexShrink: 0 }}>
      <rect x="1" y="1" width="8" height="8" rx="1" transform="rotate(45 5 5)" fill={color} />
    </svg>
  )
}

function Rule({ color = "#C9A84C" }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${color}50)` }} />
      <Lozenge color={color} />
      <div className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, ${color}50)` }} />
    </div>
  )
}

/* ─────────────────── DATA ─────────────────── */
const QUICK_LINKS = [
  { label: "Home",    href: "/" },
  { label: "About",   href: "/about" },
  { label: "Shops",   href: "/shops" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
]

const HOURS = [
  { day: "Mon – Thu", time: "11:00 – 22:00" },
  { day: "Fri – Sat", time: "11:00 – 23:30" },
  { day: "Sunday",    time: "12:00 – 21:00" },
]

const SOCIALS = [
  {
    label: "IG", href: "#",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "FB", href: "#",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "X", href: "#",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
]

/* ─────────────────── FOOTER ─────────────────── */
export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-5%" })

  return (
    <footer
      ref={ref}
      style={{ background: "#ffffff", fontFamily: "Georgia, serif", borderTop: "1px solid rgba(201,168,76,0.2)" }}
      className="relative overflow-hidden"
    >
      {/* Subtle diagonal texture */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: DIAG, backgroundRepeat: "repeat" }} />
      {/* Top gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "linear-gradient(to right, transparent, #C9A84C, transparent)" }} />

      {/* ══ MAIN BODY ══ */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 py-10 sm:px-8 sm:py-12 md:px-12 md:py-14">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* ── BRAND ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-1 sm:col-span-2 lg:col-span-4"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-4 h-px" style={{ background: "#C9A84C" }} />
              <span style={{ fontFamily: "sans-serif", fontSize: "8px", fontWeight: 700, letterSpacing: "0.45em", color: "#C9A84C" }}>
                EST. 2021
              </span>
            </div>

            <h2 className="font-black italic" style={{ fontSize: "clamp(28px,3.5vw,44px)", color: "#1a0e04", lineHeight: 0.85, letterSpacing: "-0.03em" }}>
              Food
            </h2>
            <h2 className="font-black italic" style={{ fontSize: "clamp(28px,3.5vw,44px)", lineHeight: 0.85, letterSpacing: "-0.03em", color: "transparent", WebkitTextStroke: "1.5px rgba(26,14,4,0.15)", marginBottom: "16px" }}>
              Court.
            </h2>

            <Rule color="#C9A84C" />

            <p style={{ fontFamily: "sans-serif", fontSize: "11px", color: "#7a5c38", lineHeight: 1.8, marginTop: "14px" }}>
              A vibrant destination bringing together multiple cuisines, fresh flavors, and memorable dining experiences under one roof.
            </p>

            {/* Socials */}
            <div className="flex gap-2 mt-7">
              {SOCIALS.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  whileHover={{ scale: 1.12, background: "#C9A84C", color: "white" }}
                  transition={{ duration: 0.2 }}
                  style={{
                    width: "32px", height: "32px", borderRadius: "999px",
                    border: "1px solid rgba(201,168,76,0.4)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#FB923C", cursor: "pointer", textDecoration: "none",
                    background: "transparent",
                  }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── QUICK LINKS ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-1 lg:col-span-2"
          >
            <div className="flex items-center gap-2 mb-5">
              <Lozenge />
              <p style={{ fontFamily: "sans-serif", fontSize: "8px", fontWeight: 700, letterSpacing: "0.35em", color: "#C9A84C" }}>
                NAVIGATE
              </p>
            </div>
            <ul className="space-y-3">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.18 }}>
                    <Link
                      href={l.href}
                      style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "#7a5c38", fontStyle: "italic", textDecoration: "none", display: "block", transition: "color 0.2s" }}
                      className="hover:text-[#FB923C]"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── CONTACT + HOURS ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-1 lg:col-span-3"
          >
            <div className="flex items-center gap-2 mb-5">
              <Lozenge />
              <p style={{ fontFamily: "sans-serif", fontSize: "8px", fontWeight: 700, letterSpacing: "0.35em", color: "#C9A84C" }}>
                CONTACT
              </p>
            </div>

            <address style={{ fontStyle: "normal" }}>
              <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "#7a5c38", fontStyle: "italic", lineHeight: 1.9 }}>
                Piravom , Eranamkulam
              </p>
              <motion.a
                href="tel:+918089693306"
                whileHover={{ color: "#FB923C" }}
                style={{ display: "block", fontFamily: "sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", color: "#a07840", textDecoration: "none", marginTop: "5px", transition: "color 0.2s" }}
              >
                +91 8089693306
              </motion.a>
              <motion.a
                href="mailto:info@foodcourt.com"
                whileHover={{ color: "#FB923C" }}
                style={{ display: "block", fontFamily: "Georgia, serif", fontSize: "12px", fontStyle: "italic", color: "#a07840", textDecoration: "none", marginTop: "3px", transition: "color 0.2s" }}
              >
                info@fillandchill.in
              </motion.a>
            </address>

            {/* Hours */}
            <div className="mt-7">
              <div className="flex items-center gap-2 mb-4">
                <Lozenge />
                <p style={{ fontFamily: "sans-serif", fontSize: "8px", fontWeight: 700, letterSpacing: "0.35em", color: "#C9A84C" }}>
                  HOURS
                </p>
              </div>
              <div className="space-y-2">
                {HOURS.map((h) => (
                  <div key={h.day} className="flex items-center gap-3">
                    <span style={{ fontFamily: "sans-serif", fontSize: "8px", fontWeight: 700, letterSpacing: "0.06em", color: "#a07840", whiteSpace: "nowrap" }}>
                      {h.day.toUpperCase()}
                    </span>
                    <div className="flex-1 h-px" style={{ background: "rgba(201,168,76,0.25)" }} />
                    <span style={{ fontFamily: "Georgia, serif", fontSize: "11px", color: "#7a5c38", fontStyle: "italic", whiteSpace: "nowrap" }}>
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── VISIT US CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-1 sm:col-span-2 lg:col-span-3"
          >
            <div
              className="relative overflow-hidden p-6"
              style={{ background: "#F0E8D8", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "20px" }}
            >
              <div className="absolute top-0 left-0 w-6 h-6" style={{ borderTop: "2px solid #C9A84C80", borderLeft: "2px solid #C9A84C80" }} />
              <div className="absolute bottom-0 right-0 w-6 h-6" style={{ borderBottom: "2px solid #C9A84C80", borderRight: "2px solid #C9A84C80" }} />
              <div className="absolute top-0 right-0 w-16 h-16" style={{ background: "#C9A84C", clipPath: "polygon(100% 0, 0 0, 100% 100%)", opacity: 0.18 }} />

              <p style={{ fontFamily: "sans-serif", fontSize: "8px", fontWeight: 700, letterSpacing: "0.4em", color: "#C9A84C", marginBottom: "8px" }}>
                VISIT US
              </p>
              <h3 className="font-black italic" style={{ fontSize: "clamp(18px,2vw,24px)", color: "#1a0e04", lineHeight: 0.9, letterSpacing: "-0.02em", marginBottom: "10px" }}>
                Come taste<br />
                <span style={{ color: "#FB923C" }}>the difference.</span>
              </h3>
              <p style={{ fontFamily: "sans-serif", fontSize: "10px", color: "#7a5c38", lineHeight: 1.7, marginBottom: "16px" }}>
                Enjoy a variety of tastes in a warm and welcoming space.
              </p>

              <Rule color="#C9A84C" />

              <div className="mt-5">
                <Link href="/contact">
                  <motion.span
                    whileHover={{ scale: 1.04, background: "#C9A84C" }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      display: "block", textAlign: "center",
                      fontFamily: "sans-serif", background: "#1a0e04",
                      color: "white", fontSize: "8px", fontWeight: 700,
                      letterSpacing: "0.35em", padding: "11px 20px",
                      borderRadius: "999px", cursor: "pointer",
                    }}
                    className="uppercase"
                  >
                    Get in Touch →
                  </motion.span>
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ══ DIVIDER ══ */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 md:px-12">
        <Rule color="#C9A84C" />
      </div>

      {/* ══ BOTTOM BAR ══ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10 max-w-6xl mx-auto px-5 py-5 sm:px-8 md:px-12"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="flex flex-col gap-1.5">
            <p style={{ fontFamily: "sans-serif", fontSize: "8px", letterSpacing: "0.3em", color: "#a07840" }}>
              © {new Date().getFullYear()} FILL AND CHILL · ALL RIGHTS RESERVED
            </p>
            <p style={{ fontFamily: "sans-serif", fontSize: "8px", letterSpacing: "0.2em", color: "#a07840" }}>
              DEVELOPED BY{" "}
              <motion.a
                href="https://winshineinfotech.com/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ color: "#FB923C" }}
                style={{ color: "#C9A84C", textDecoration: "none", fontWeight: 700, letterSpacing: "0.2em", cursor: "pointer", transition: "color 0.2s" }}
              >
                WINSHINE
              </motion.a>
            </p>
          </div>

          {/* Centre ornament */}
          <div className="hidden md:flex items-center gap-3">
            <div className="h-px w-8" style={{ background: "rgba(201,168,76,0.3)" }} />
            <Lozenge color="#C9A84C60" />
            <p style={{ fontFamily: "Georgia, serif", fontSize: "10px", fontStyle: "italic", color: "#a07840" }}>
              Eight Chapters · Artisan Collection
            </p>
            <Lozenge color="#C9A84C60" />
            <div className="h-px w-8" style={{ background: "rgba(201,168,76,0.3)" }} />
          </div>

          <div className="flex items-center gap-4 sm:gap-5">
            {["Privacy", "Terms", "Sitemap"].map((l) => (
              <motion.a
                key={l}
                href="#"
                whileHover={{ color: "#FB923C" }}
                style={{ fontFamily: "sans-serif", fontSize: "8px", letterSpacing: "0.3em", color: "#a07840", textDecoration: "none", cursor: "pointer", transition: "color 0.2s" }}
              >
                {l.toUpperCase()}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  )
}