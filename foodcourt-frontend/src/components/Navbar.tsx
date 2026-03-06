"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/shops", label: "Shops" },
  { href: "/contact", label: "Contact" },
]

/* ── Icons ── */
const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
)

export default function EditorialNavbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  /* ── Scroll detection ── */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  /* ── Close overlays on route change ── */
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  /* ── Lock body scroll when mobile menu is open ── */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-[100] transition-all duration-500">

        {/* ── MAIN NAVIGATION BAR ── */}
        <div
          className={`relative transition-all duration-500 ${
            scrolled
              ? "py-3 bg-[#FDF8F0]/90 backdrop-blur-lg border-b border-[#1a0f00]/8 shadow-sm"
              : "py-4 sm:py-5 lg:py-6 bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 flex items-center justify-between gap-4">

            {/* ── LOGO ── */}
            <Link href="/" className="relative z-[110]">
              <Image
                src="/logo1.png"
                alt="Food Court Logo"
                width={110}
                height={110}
                className="object-contain w-[65px] sm:w-[85px] md:w-[100px] lg:w-[110px] h-auto"
                priority
              />
            </Link>

            {/* ── DESKTOP NAV (lg+) ── */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map(({ href, label }) => {
                const active = pathname === href
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`relative px-3 xl:px-4 py-2 text-[10px] uppercase tracking-[0.25em] xl:tracking-[0.3em] font-black transition-colors duration-300 ${
                      active ? "text-[#FB923C]" : "text-[#1a0f00]/60 hover:text-[#1a0f00]"
                    }`}
                  >
                    {label}
                    {active && (
                      <motion.span
                        layoutId="navDot"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#FB923C] rounded-full"
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* ── ACTION CLUSTER ── */}
            <div className="flex items-center gap-3 sm:gap-4 md:gap-5 flex-shrink-0">

              {/* Reserve CTA — Orange-400 on hover */}
              <Link
                href="/shops"
                className="hidden sm:block bg-[#1a0f00] text-white px-4 md:px-6 lg:px-7 py-2.5 lg:py-3 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest hover:bg-[#FB923C] transition-all active:scale-95 shadow-lg shadow-black/5 whitespace-nowrap"
              >
                Reserve Now
              </Link>

              {/* Mobile hamburger — visible below lg */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="lg:hidden flex flex-col gap-[5px] p-1.5 touch-manipulation"
              >
                <span
                  className={`block h-0.5 bg-[#1a0f00] transition-all duration-300 origin-center ${
                    menuOpen ? "w-6 rotate-45 translate-y-[7px]" : "w-6"
                  }`}
                />
                <span
                  className={`block h-0.5 bg-[#1a0f00] transition-all duration-300 ${
                    menuOpen ? "opacity-0 w-6" : "w-4"
                  }`}
                />
                <span
                  className={`block h-0.5 bg-[#1a0f00] transition-all duration-300 origin-center ${
                    menuOpen ? "w-6 -rotate-45 -translate-y-[7px]" : "w-6"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* ── MOBILE / TABLET FULL-SCREEN MENU ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed inset-0 bg-[#FB923C] z-[105] flex flex-col lg:hidden overflow-y-auto"
            >
              {/* Close button (top-right) */}
              <div className="flex justify-end px-4 sm:px-6 pt-5">
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-2 text-[#1a0f00] touch-manipulation"
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col gap-6 sm:gap-8 px-8 sm:px-12 pt-8 sm:pt-10 flex-1">
                {navLinks.map((link, i) => {
                  const active = pathname === link.href
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08, ease: "easeOut" }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className={`block text-4xl sm:text-5xl font-black uppercase tracking-tighter transition-all hover:italic touch-manipulation ${
                          active ? "text-white" : "text-[#1a0f00]"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>

              {/* Footer area */}
              <div className="px-8 sm:px-12 pt-8 pb-10 border-t border-[#1a0f00]/10 mt-6">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#1a0f00]/40 mb-1">
                  Reservation Line
                </p>
                <p className="text-xl sm:text-2xl font-black text-[#1a0f00]">+91 Piravom FC</p>

                {/* Reserve CTA for xs screens */}
                <Link
                  href="/shops"
                  onClick={() => setMenuOpen(false)}
                  className="sm:hidden mt-6 inline-flex items-center bg-[#1a0f00] text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest touch-manipulation"
                >
                  Reserve Now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}