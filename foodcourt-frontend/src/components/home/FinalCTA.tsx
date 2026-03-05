"use client"

import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"

/* ── Textures ── */
const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.07'/%3E%3C/svg%3E")`
const DIAG  = `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0' y1='24' x2='24' y2='0' stroke='%23ffffff' stroke-width='0.4' opacity='0.05'/%3E%3C/svg%3E")`

/* ── Ornamental Rule ── */
function Rule({ color = "#C9A84C" }: { color?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ height: 1, flex: 1, background: `linear-gradient(to right, transparent, ${color}50)` }} />
      <svg width="9" height="9" viewBox="0 0 10 10">
        <rect x="1" y="1" width="8" height="8" rx="1" transform="rotate(45 5 5)" fill={color} />
      </svg>
      <div style={{ height: 1, flex: 1, background: `linear-gradient(to left, transparent, ${color}50)` }} />
    </div>
  )
}

/* ── Input field ── */
function Field({
  label, type = "text", placeholder, value, onChange, isTextarea = false,
}: {
  label: string; type?: string; placeholder: string;
  value: string; onChange: (v: string) => void; isTextarea?: boolean
}) {
  const [focused, setFocused] = useState(false)

  const baseStyle: React.CSSProperties = {
    width: "100%", background: "rgba(255,255,255,0.05)",
    border: `1.5px solid ${focused ? "#C9A84C" : "rgba(255,255,255,0.12)"}`,
    borderRadius: 12, padding: "14px 18px",
    fontFamily: "sans-serif", fontSize: 13,
    color: "white", outline: "none",
    transition: "border-color 0.25s, background 0.25s",
    resize: "none" as const,
    boxSizing: "border-box" as const,
    ...(focused ? { background: "rgba(201,168,76,0.05)" } : {}),
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label style={{ fontFamily: "sans-serif", fontSize: 8, fontWeight: 700,
        letterSpacing: "0.35em", color: focused ? "#C9A84C" : "rgba(255,255,255,0.35)",
        textTransform: "uppercase", transition: "color 0.25s" }}>{label}</label>
      {isTextarea ? (
        <textarea
          rows={4} placeholder={placeholder} value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{ ...baseStyle, lineHeight: 1.7 }}
        />
      ) : (
        <input
          type={type} placeholder={placeholder} value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={baseStyle}
        />
      )}
    </div>
  )
}

/* ── Info item ── */
function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
      <div style={{ width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
        background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.25)",
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        {icon}
      </div>
      <div>
        <p style={{ fontFamily: "sans-serif", fontSize: 8, fontWeight: 700,
          letterSpacing: "0.3em", color: "#C9A84C", marginBottom: 4, textTransform: "uppercase" }}>{label}</p>
        <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic",
          fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>{value}</p>
      </div>
    </div>
  )
}

/* ── Main ── */
export default function FinalCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-5%" })

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Failed to send message")
      setSubmitted(true)
      setForm({ name: "", email: "", phone: "", message: "" })
    } catch (err) {
      console.error(err)
      alert("Something went wrong. Please try again.")
    }
  }

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#0e0805", fontFamily: "Georgia, serif" }}
    >
      {/* ── Grain ── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: GRAIN, backgroundSize: "200px", opacity: 0.4 }} />

      {/* ── Diagonal texture ── */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: DIAG,
        backgroundRepeat: "repeat", pointerEvents: "none" }} />

      {/* ── Gold left stripe ── */}
      <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 3,
        background: "linear-gradient(to bottom, transparent, #C9A84C60, #FB923C80, transparent)" }} />

      {/* ── Ambient glows ── */}
      <div style={{ position: "absolute", top: "10%", left: "20%", width: "40vw", height: "40vw",
        borderRadius: "50%", background: "radial-gradient(circle, rgba(251,146,60,0.07) 0%, transparent 70%)",
        filter: "blur(40px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "15%", width: "25vw", height: "25vw",
        borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)",
        filter: "blur(30px)", pointerEvents: "none" }} />

      {/* ── Triangles ── */}
      <div style={{ position: "absolute", top: 0, right: 0, width: 160, height: 160,
        background: "#C9A84C", clipPath: "polygon(100% 0, 0 0, 100% 100%)", opacity: 0.07 }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, width: 200, height: 160,
        background: "#FB923C", clipPath: "polygon(0 100%, 0 0, 100% 100%)", opacity: 0.08 }} />

      {/* Responsive padding wrapper */}
      <div
        ref={ref}
        className="max-w-[1200px] mx-auto px-5 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24 relative z-[1]"
      >

        {/* ══════════════ HERO CTA ROW ══════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 md:mb-20"
        >
          {/* Section label */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <div style={{ width: 20, height: 1, background: "#C9A84C" }} />
            <span style={{ fontFamily: "sans-serif", fontSize: 9, fontWeight: 700,
              letterSpacing: "0.45em", color: "#C9A84C", textTransform: "uppercase" }}>Begin The Experience</span>
          </div>

          {/* Headline + CTAs */}
          <div className="flex flex-col md:grid md:items-end gap-8 md:gap-12"
            style={{ gridTemplateColumns: "1fr auto" }}>

            <div style={{ position: "relative" }}>
              <p className="hidden sm:block" style={{ position: "absolute", top: -28, left: -8,
                userSelect: "none", pointerEvents: "none",
                fontStyle: "italic", fontWeight: 900,
                fontSize: "clamp(70px, 11vw, 140px)", color: "#C9A84C", opacity: 0.04,
                letterSpacing: "-0.05em", lineHeight: 1 }}>VISIT</p>

              <h2 style={{ fontStyle: "italic", fontWeight: 900, color: "white",
                fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 0.86,
                letterSpacing: "-0.03em", position: "relative", margin: 0 }}>
                Come<br />
                <span style={{ color: "#FB923C" }}>Hungry.</span>
              </h2>

              <p style={{ fontFamily: "sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)",
                marginTop: 20, lineHeight: 1.8, fontStyle: "italic", maxWidth: 380 }}>
                Spacious seating, easy access, unforgettable taste. Eight chapters of food, all under one roof.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-row md:flex-col gap-3" style={{ paddingBottom: 4 }}>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.04, background: "#C9A84C" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="flex-1 md:flex-none"
                style={{ fontFamily: "sans-serif", background: "#FB923C", color: "white",
                  fontSize: 9, fontWeight: 700, letterSpacing: "0.35em",
                  padding: "14px 28px", borderRadius: 999, textDecoration: "none",
                  textTransform: "uppercase", display: "block", textAlign: "center",
                  boxShadow: "0 8px 24px rgba(251,146,60,0.35)" }}
              >
                Get Directions →
              </motion.a>
              <motion.a
                href="/shops"
                whileHover={{ scale: 1.04, borderColor: "#C9A84C", color: "#C9A84C" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="flex-1 md:flex-none"
                style={{ fontFamily: "sans-serif", background: "transparent", color: "rgba(255,255,255,0.5)",
                  fontSize: 9, fontWeight: 700, letterSpacing: "0.35em",
                  padding: "14px 28px", borderRadius: 999, textDecoration: "none",
                  textTransform: "uppercase", display: "block", textAlign: "center",
                  border: "1.5px solid rgba(255,255,255,0.15)" }}
              >
                Browse Outlets
              </motion.a>
            </div>
          </div>

          <div style={{ marginTop: 40 }}><Rule /></div>
        </motion.div>

        {/* ══════════════ CONTACT GRID ══════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">

          {/* ── LEFT: Info panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 16, height: 1, background: "#C9A84C" }} />
              <span style={{ fontFamily: "sans-serif", fontSize: 9, fontWeight: 700,
                letterSpacing: "0.4em", color: "#C9A84C", textTransform: "uppercase" }}>Find Us</span>
            </div>

            <h3 style={{ fontStyle: "italic", fontWeight: 900, color: "white",
              fontSize: "clamp(24px, 3vw, 38px)", lineHeight: 0.9,
              letterSpacing: "-0.02em", marginBottom: 28 }}>
              Visit Our<br />
              <span style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(255,255,255,0.25)" }}>Food</span>
              {" "}<span style={{ color: "#C9A84C" }}>Court</span>
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 32 }}>
              <InfoItem
                label="Address"
                value="Eight Chapters Food Court, Main Road, Piravom, Kerala 676101"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                      stroke="#C9A84C" strokeWidth="1.5"/>
                    <circle cx="12" cy="9" r="2.5" stroke="#C9A84C" strokeWidth="1.5"/>
                  </svg>
                }
              />
              <InfoItem
                label="Hours"
                value="Mon – Sun, 10:00 AM – 11:00 PM"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="#C9A84C" strokeWidth="1.5"/>
                    <path d="M12 7v5l3 3" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                }
              />
              <InfoItem
                label="Phone"
                value="+91 8089693306"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C9.6 21 3 14.4 3 6c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"
                      stroke="#C9A84C" strokeWidth="1.5"/>
                  </svg>
                }
              />
            </div>

            {/* ── Real Google Map: Piravom, Ernakulam ── */}
            <div style={{
              borderRadius: 16,
              overflow: "hidden",
              border: "1.5px solid rgba(201,168,76,0.25)",
              position: "relative",
              height: 220,
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}>
              {/* Gold top accent bar */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3, zIndex: 2,
                background: "linear-gradient(to right, #FB923C, #C9A84C)",
                pointerEvents: "none",
              }} />

              <iframe
                title="Eight Chapters Food Court — Piravom, Ernakulam"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.0!2d76.4897!3d9.9969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0872e1be6d5b0f%3A0x0!2sPiravom%2C%20Ernakulam%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  display: "block",
                  filter: "invert(90%) hue-rotate(180deg) saturate(0.8) brightness(0.85)",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* "Open in Maps" overlay button */}
              <a
                href="https://maps.google.com/?q=Piravom,Ernakulam,Kerala"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  position: "absolute", bottom: 10, right: 10, zIndex: 3,
                  background: "#FB923C",
                  color: "white",
                  fontFamily: "sans-serif",
                  fontSize: 8,
                  fontWeight: 700,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  padding: "7px 14px",
                  borderRadius: 999,
                  textDecoration: "none",
                  boxShadow: "0 4px 16px rgba(251,146,60,0.45)",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                </svg>
                Open in Maps
              </a>
            </div>
          </motion.div>

          {/* ── RIGHT: Contact Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="p-6 sm:p-8 md:p-10"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1.5px solid rgba(255,255,255,0.08)",
                borderRadius: 24, position: "relative", overflow: "hidden",
              }}
            >
              {/* Top accent bar */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3,
                background: "linear-gradient(to right, #FB923C, #C9A84C)" }} />

              {/* Gold triangle accent */}
              <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80,
                background: "#C9A84C", clipPath: "polygon(100% 0, 0 0, 100% 100%)", opacity: 0.08 }} />

              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <div style={{ width: 16, height: 1, background: "#C9A84C" }} />
                <span style={{ fontFamily: "sans-serif", fontSize: 9, fontWeight: 700,
                  letterSpacing: "0.4em", color: "#C9A84C", textTransform: "uppercase" }}>Write To Us</span>
              </div>

              <h3 style={{ fontStyle: "italic", fontWeight: 900, color: "white",
                fontSize: "clamp(22px, 2.5vw, 34px)", lineHeight: 0.9,
                letterSpacing: "-0.02em", marginBottom: 28 }}>
                Send a<br /><span style={{ color: "#FB923C" }}>Message</span>
              </h3>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{ textAlign: "center", padding: "40px 0" }}
                >
                  <div style={{ width: 64, height: 64, borderRadius: "50%",
                    background: "rgba(201,168,76,0.12)", border: "1.5px solid rgba(201,168,76,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <path d="M6 14l6 6 10-10" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h4 style={{ fontStyle: "italic", fontWeight: 900, color: "white",
                    fontSize: 24, letterSpacing: "-0.02em", marginBottom: 8 }}>Message Sent!</h4>
                  <p style={{ fontFamily: "sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)",
                    lineHeight: 1.7, maxWidth: 280, margin: "0 auto" }}>
                    We'll get back to you within 24 hours. Thank you for reaching out.
                  </p>
                </motion.div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
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
                    <p style={{ fontFamily: "sans-serif", fontSize: 10, color: "rgba(255,255,255,0.25)",
                      lineHeight: 1.6, maxWidth: 200, fontStyle: "italic" }}>
                      We respond to all messages within 24 hours.
                    </p>
                    <motion.button
                      onClick={handleSubmit}
                      whileHover={{ scale: 1.04, background: "#C9A84C" }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.2 }}
                      className="w-full sm:w-auto"
                      style={{ fontFamily: "sans-serif", background: "#FB923C", color: "white",
                        fontSize: 9, fontWeight: 700, letterSpacing: "0.35em",
                        padding: "14px 28px", borderRadius: 999, border: "none",
                        cursor: "pointer", textTransform: "uppercase", whiteSpace: "nowrap",
                        boxShadow: "0 8px 24px rgba(251,146,60,0.3)" }}
                    >
                      Send Message →
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* ══════════════ FOOTER BAND ══════════════ */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-14 md:mt-20"
        >
          <Rule />
          <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="hidden sm:block" style={{ fontFamily: "sans-serif", fontSize: 7,
              letterSpacing: "0.45em", color: "rgba(160,120,64,0.3)", textTransform: "uppercase" }}>
              Eight Chapters · Artisan Collection · Est. 2021
            </p>
            <div style={{ display: "flex", gap: 20 }}>
              {["Instagram", "Facebook", "WhatsApp"].map(s => (
                <span key={s} style={{ fontFamily: "sans-serif", fontSize: 8, fontWeight: 700,
                  letterSpacing: "0.25em", color: "rgba(255,255,255,0.2)",
                  textTransform: "uppercase", cursor: "pointer" }}>{s}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 