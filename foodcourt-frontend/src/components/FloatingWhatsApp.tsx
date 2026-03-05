"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingWhatsApp() {
  const phone = "918089693306";
  const message = `Hello 👋\n\nI visited your Food & Chill website and would like to know more details.`;

  const [pulse, setPulse] = useState(true);
  const [tooltip, setTooltip] = useState(false);

  const openWhatsApp = () => {
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // Stop pulse after 6s so it doesn't loop forever
  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 6000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex items-center justify-end">
      {/* Tooltip */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.92 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mr-3 px-4 py-2 rounded-2xl text-white text-xs font-semibold whitespace-nowrap shadow-xl"
            style={{
              background: "#1a1a1a",
              fontFamily: "sans-serif",
              letterSpacing: "0.02em",
              boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
            }}
          >
            Chat with us on WhatsApp
            {/* Arrow */}
            <span
              className="absolute right-[-6px] top-1/2 -translate-y-1/2"
              style={{
                width: 0, height: 0,
                borderTop: "6px solid transparent",
                borderBottom: "6px solid transparent",
                borderLeft: "6px solid #1a1a1a",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulse rings */}
      {pulse && (
        <>
          <span
            className="absolute rounded-full"
            style={{
              width: 56, height: 56,
              background: "rgba(37,211,102,0.35)",
              animation: "wa-ring 1.8s ease-out infinite",
            }}
          />
          <span
            className="absolute rounded-full"
            style={{
              width: 56, height: 56,
              background: "rgba(37,211,102,0.2)",
              animation: "wa-ring 1.8s ease-out 0.6s infinite",
            }}
          />
        </>
      )}

      {/* Button */}
      <motion.button
        onClick={openWhatsApp}
        onHoverStart={() => { setTooltip(true); setPulse(false); }}
        onHoverEnd={() => setTooltip(false)}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.93 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="relative w-14 h-14 rounded-full flex items-center justify-center focus:outline-none"
        style={{
          background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
          boxShadow: "0 6px 28px rgba(37,211,102,0.45), 0 2px 8px rgba(0,0,0,0.15)",
        }}
        aria-label="Chat on WhatsApp"
      >
        {/* Official WhatsApp SVG logo */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="28"
          height="28"
        >
          <path
            fill="white"
            d="M24 4C13 4 4 13 4 24c0 3.6 1 7 2.7 9.9L4 44l10.4-2.7C17 43 20.4 44 24 44c11 0 20-9 20-20S35 4 24 4zm0 36c-3.1 0-6.1-.8-8.7-2.4l-.6-.4-6.2 1.6 1.7-6-.4-.6C8.2 30.1 7.4 27.1 7.4 24c0-9.2 7.4-16.6 16.6-16.6 4.4 0 8.6 1.7 11.7 4.9 3.1 3.1 4.9 7.3 4.9 11.7 0 9.2-7.4 16.6-16.6 16.6zm9.1-12.4c-.5-.3-3-1.5-3.4-1.6-.5-.2-.8-.2-1.1.2-.3.5-1.3 1.6-1.6 2-.3.3-.6.4-1.1.1-.5-.2-2-.7-3.8-2.3-1.4-1.2-2.4-2.8-2.6-3.2-.3-.5 0-.7.2-.9.2-.2.5-.6.7-.8.2-.3.3-.5.5-.8.2-.3.1-.6-.1-.8-.2-.2-1.1-2.6-1.5-3.6-.4-.9-.8-.8-1.1-.8h-.9c-.3 0-.8.1-1.2.6-.4.5-1.7 1.6-1.7 4s1.7 4.6 2 4.9c.2.3 3.4 5.2 8.2 7.3 1.1.5 2 .8 2.7 1 1.1.4 2.2.3 3 .2 1-.1 3-1.2 3.4-2.4.4-1.2.4-2.2.3-2.4-.2-.2-.5-.3-1-.5z"
          />
        </svg>
      </motion.button>

      {/* CSS keyframes injected inline */}
      <style>{`
        @keyframes wa-ring {
          0%   { transform: scale(1);   opacity: 0.7; }
          100% { transform: scale(2.2); opacity: 0;   }
        }
      `}</style>
    </div>
  );
}