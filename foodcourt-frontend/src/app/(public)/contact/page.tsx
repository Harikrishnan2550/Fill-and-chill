"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"

/* ─────────────────── PATTERNS ─────────────────── */
const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.07'/%3E%3C/svg%3E")`
const DOTS  = `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1.5' cy='1.5' r='1.2' fill='%23a07840' opacity='0.35'/%3E%3C/svg%3E")`
const DIAG  = `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0' y1='24' x2='24' y2='0' stroke='%23a07840' stroke-width='0.5' opacity='0.12'/%3E%3C/svg%3E")`

/* ─────────────────── HELPERS ─────────────────── */
function Lozenge({ color = "#C9A84C" }: { color?: string }) {
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

/* ─────────────────── FIELD ─────────────────── */
function Field({
  label, type = "text", placeholder, value, onChange, isTextarea = false,
}: {
  label: string; type?: string; placeholder: string;
  value: string; onChange: (v: string) => void; isTextarea?: boolean
}) {
  const [focused, setFocused] = useState(false)
const base: React.CSSProperties = {
    width: "100%",
    background: focused ? "rgba(201,168,76,0.08)" : "rgba(255,255,255,0.05)",
    border: `1.5px solid ${focused ? "#C9A84C" : "rgba(255,255,255,0.12)"}`,
    borderRadius: 12, padding: "13px 16px",
    fontFamily: "sans-serif", fontSize: 13,
    color: "white", outline: "none",
    transition: "border-color 0.25s, background 0.25s",
    resize: "none" as const, boxSizing: "border-box" as const,
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <label style={{ fontFamily: "sans-serif", fontSize: 8, fontWeight: 700, letterSpacing: "0.35em",
        color: focused ? "#C9A84C" : "#a07840", textTransform: "uppercase", transition: "color 0.25s" }}>
        {label}
      </label>
      {isTextarea
        ? <textarea rows={4} placeholder={placeholder} value={value}
            onChange={e => onChange(e.target.value)}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            style={{ ...base, lineHeight: 1.7 }} />
        : <input type={type} placeholder={placeholder} value={value}
            onChange={e => onChange(e.target.value)}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            style={base} />
      }
    </div>
  )
}

/* ─────────────────── INFO CARD ─────────────────── */
function InfoCard({ icon, label, children, index }: {
  icon: React.ReactNode; label: string; children: React.ReactNode; index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-8%" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-start gap-4 p-5 sm:p-6"
      style={{ background: "white", borderRadius: 18, border: "1.5px solid rgba(201,168,76,0.18)", boxShadow: "0 4px 20px rgba(26,14,4,0.05)", position: "relative", overflow: "hidden" }}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: "linear-gradient(to right, #FB923C, #C9A84C)" }} />
      <div className="absolute top-0 right-0 w-10 h-10"
        style={{ background: "#C9A84C", clipPath: "polygon(100% 0, 0 0, 100% 100%)", opacity: 0.1 }} />

      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)" }}>
        {icon}
      </div>

      <div>
        <p style={{ fontFamily: "sans-serif", fontSize: "8px", fontWeight: 700, letterSpacing: "0.35em", color: "#C9A84C", marginBottom: 5, textTransform: "uppercase" }}>
          {label}
        </p>
        {children}
      </div>
    </motion.div>
  )
}

/* ─────────────────── PAGE ─────────────────── */
export default function ContactPage() {
  const headerRef = useRef(null)
  const formRef   = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: "-5%" })
  const formInView   = useInView(formRef,   { once: true, margin: "-5%" })

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

 const handleSubmit = async () => {
  if (!form.name || !form.email || !form.message) {
    alert("Please fill required fields")
    return
  }

  try {
    const API = process.env.NEXT_PUBLIC_API_URL

    const res = await fetch(`${API}/api/contact/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })

    if (!res.ok) {
      throw new Error("Failed to send message")
    }

    setSubmitted(true)

    // reset form
    setForm({
      name: "",
      email: "",
      phone: "",
      message: "",
    })

  } catch (err) {
    console.error(err)
    alert("Something went wrong. Please try again.")
  }
}
  return (
    <main
      style={{ background: "#F0E8D8", fontFamily: "Georgia, serif" }}
      className="relative overflow-hidden"
    >
      {/* ── BACKGROUND ASSETS ── */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-35"
        style={{ backgroundImage: GRAIN, backgroundSize: "200px" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: DIAG, backgroundRepeat: "repeat" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 60% 30%, rgba(251,146,60,0.1) 0%, transparent 60%)" }} />
      <div className="absolute top-0 left-0 bottom-0 w-8 hidden sm:block pointer-events-none"
        style={{ backgroundImage: DOTS, backgroundRepeat: "repeat" }} />

      {/* ══════════════════════════════════════════
          PAGE HEADER
      ══════════════════════════════════════════ */}
      <section ref={headerRef} className="relative z-10 px-5 pt-20 pb-12 sm:px-10 sm:pt-24 sm:pb-14 md:px-16 md:pt-28 md:pb-16">
        <div className="absolute top-0 right-0 w-28 h-28 md:w-44 md:h-44 pointer-events-none"
          style={{ background: "#C9A84C", clipPath: "polygon(100% 0, 0 0, 100% 100%)", opacity: 0.1 }} />

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="w-5 h-px" style={{ background: "#C9A84C" }} />
            <span style={{ fontFamily: "sans-serif", fontSize: "9px", fontWeight: 700, letterSpacing: "0.45em", color: "#C9A84C" }}>
              GET IN TOUCH
            </span>
          </motion.div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 sm:gap-8">
            <div className="relative">
              <p className="absolute -top-4 -left-2 select-none pointer-events-none font-black italic hidden sm:block"
                style={{ fontSize: "clamp(60px,9vw,120px)", color: "#C9A84C", opacity: 0.05, letterSpacing: "-0.05em", lineHeight: 1 }}>
                CONTACT
              </p>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "110%", opacity: 0 }}
                  animate={headerInView ? { y: "0%", opacity: 1 } : {}}
                  transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="font-black italic relative"
                  style={{ fontSize: "clamp(36px,6vw,80px)", color: "#1a0e04", lineHeight: 0.88, letterSpacing: "-0.03em" }}
                >
                  Say Hello,
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "110%", opacity: 0 }}
                  animate={headerInView ? { y: "0%", opacity: 1 } : {}}
                  transition={{ duration: 1, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="font-black italic"
                  style={{ fontSize: "clamp(36px,6vw,80px)", color: "#FB923C", lineHeight: 0.88, letterSpacing: "-0.03em" }}
                >
                  We Listen.
                </motion.h1>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="max-w-xs sm:text-right pb-1"
            >
              <p style={{ fontFamily: "sans-serif", fontSize: "clamp(12px,1.3vw,13px)", color: "#7a5c38", lineHeight: 1.8, fontStyle: "italic" }}>
                Questions about our Piravom location or artisan collection? Reach out and we'll respond within 24 hours.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 md:mt-10"
          >
            <Rule />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTACT GRID
      ══════════════════════════════════════════ */}
      <section className="relative z-10 px-5 pb-20 sm:px-10 sm:pb-24 md:px-16 md:pb-28">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-14 items-start">

          {/* ── LEFT: Info cards ── */}
          <div className="flex flex-col gap-4">

            <InfoCard index={0} label="Address"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#C9A84C" strokeWidth="1.5"/>
                  <circle cx="12" cy="9" r="2.5" stroke="#C9A84C" strokeWidth="1.5"/>
                </svg>
              }
            >
              <p className="italic" style={{ fontFamily: "Georgia, serif", fontSize: 14, color: "#5a3e1c", lineHeight: 1.8 }}>
                Eight Chapters Food Court<br />
                Piravom, Ernakulam<br />
                Kerala 686664
              </p>
            </InfoCard>

            <InfoCard index={1} label="Phone"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C9.6 21 3 14.4 3 6c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" stroke="#C9A84C" strokeWidth="1.5"/>
                </svg>
              }
            >
              <a href="tel:+919876543210"
                style={{ display: "block", fontFamily: "Georgia, serif", fontSize: 15, fontWeight: 700, fontStyle: "italic", color: "#1a0e04", textDecoration: "none" }}
                className="hover:text-[#FB923C] transition-colors">
                +91 98765 43210
              </a>
            </InfoCard>

            <InfoCard index={2} label="Open Hours"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="#C9A84C" strokeWidth="1.5"/>
                  <path d="M12 7v5l3 3" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              }
            >
              <p className="italic" style={{ fontFamily: "Georgia, serif", fontSize: 14, color: "#5a3e1c" }}>
                Mon – Sun: 11:00 AM – 11:00 PM
              </p>
            </InfoCard>

            {/* ── LIVE MAP INTEGRATION ── */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden"
              style={{ 
                borderRadius: 18, 
                border: "1.5px solid rgba(201,168,76,0.3)", 
                height: 200, 
                background: "#ede4d3",
                boxShadow: "0 10px 30px rgba(26,14,4,0.06)"
              }}
            >
              <iframe
                title="Eight Chapters Piravom"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15725.123456789!2d76.4862!3d9.8724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b07e0f666666667%3A0x6666666666666666!2sPiravom%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ 
                  border: 0, 
                  filter: "grayscale(0.2) sepia(0.3) contrast(0.9) brightness(0.95)" 
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-3 left-3 pointer-events-none" style={{ zIndex: 10 }}>
                <div className="px-3 py-1 rounded-full backdrop-blur-md" style={{ background: "rgba(26,14,4,0.7)", border: "1px solid rgba(201,168,76,0.4)" }}>
                   <p style={{ fontFamily: "sans-serif", fontSize: "7px", fontWeight: 700, letterSpacing: "0.2em", color: "#C9A84C", textTransform: "uppercase", margin: 0 }}>
                    Piravom, Ernakulam
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: Contact Form ── */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: 28 }}
            animate={formInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="p-6 sm:p-8 md:p-10"
              style={{ background: "#1a0e04", borderRadius: 24, position: "relative", overflow: "hidden" }}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: "linear-gradient(to right, #FB923C, #C9A84C)" }} />
              <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: DIAG, backgroundRepeat: "repeat" }} />
              <div className="absolute top-0 right-0 w-20 h-20"
                style={{ background: "#C9A84C", clipPath: "polygon(100% 0, 0 0, 100% 100%)", opacity: 0.1 }} />

              <div className="relative z-10 mb-7">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-4 h-px" style={{ background: "#C9A84C" }} />
                  <span style={{ fontFamily: "sans-serif", fontSize: "9px", fontWeight: 700, letterSpacing: "0.4em", color: "#C9A84C" }}>
                    WRITE TO US
                  </span>
                </div>
                <h2 className="font-black italic text-white"
                  style={{ fontSize: "clamp(24px,3vw,38px)", lineHeight: 0.9, letterSpacing: "-0.02em" }}>
                  Send a<br />
                  <span style={{ color: "#FB923C" }}>Message</span>
                </h2>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10 text-center py-12"
                >
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: "rgba(201,168,76,0.12)", border: "1.5px solid rgba(201,168,76,0.3)" }}>
                    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                      <path d="M6 14l6 6 10-10" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h4 className="font-black italic text-white" style={{ fontSize: 22, letterSpacing: "-0.02em", marginBottom: 8 }}>
                    Message Sent!
                  </h4>
                  <p style={{ fontFamily: "sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, maxWidth: 260, margin: "0 auto" }}>
                    We'll get back to you within 24 hours. Thank you for reaching out.
                  </p>
                </motion.div>
              ) : (
                <div className="relative z-10 flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Your Name" placeholder="Full name"
                      value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} />
                    <Field label="Email" type="email" placeholder="your@email.com"
                      value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} />
                  </div>
                  <Field label="Phone (optional)" type="tel" placeholder="+91 00000 00000"
                    value={form.phone} onChange={v => setForm(f => ({ ...f, phone: v }))} />
                  <Field label="Message" placeholder="Tell us how we can help..."
                    value={form.message} onChange={v => setForm(f => ({ ...f, message: v }))} isTextarea />

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-1">
                    <p style={{ fontFamily: "sans-serif", fontSize: 10, color: "rgba(255,255,255,0.25)", lineHeight: 1.6, maxWidth: 200, fontStyle: "italic" }}>
                      We respond to all messages within 24 hours.
                    </p>
                    <motion.button
                      onClick={handleSubmit}
                      whileHover={{ scale: 1.04, background: "#C9A84C" }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.2 }}
                      className="w-full sm:w-auto"
                      style={{ fontFamily: "sans-serif", background: "#FB923C", color: "white", fontSize: 9, fontWeight: 700, letterSpacing: "0.35em", padding: "13px 28px", borderRadius: 999, border: "none", cursor: "pointer", textTransform: "uppercase", whiteSpace: "nowrap", boxShadow: "0 8px 24px rgba(251,146,60,0.3)" }}
                    >
                      Send Message →
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="hidden sm:block text-center mt-14 md:mt-16"
          style={{ fontFamily: "sans-serif", fontSize: "7px", letterSpacing: "0.45em", color: "rgba(160,120,64,0.4)", textTransform: "uppercase" }}
        >
          Eight Chapters · Artisan Collection · Est. 2021
        </motion.p>
      </section>
    </main>
  )
}