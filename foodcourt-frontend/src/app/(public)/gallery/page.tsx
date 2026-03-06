"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";


const isLocal = API?.includes("localhost");

/* ─────────────────── PATTERNS ─────────────────── */
const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.07'/%3E%3C/svg%3E")`;
const DOTS = `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1.5' cy='1.5' r='1.2' fill='%23a07840' opacity='0.35'/%3E%3C/svg%3E")`;
const DIAG = `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0' y1='24' x2='24' y2='0' stroke='%23a07840' stroke-width='0.5' opacity='0.12'/%3E%3C/svg%3E")`;

/* ─────────────────── HELPERS ─────────────────── */
function Lozenge({ color = "#C9A84C" }: { color?: string }) {
  return (
    <svg width="9" height="9" viewBox="0 0 10 10" className="shrink-0">
      <rect
        x="1"
        y="1"
        width="8"
        height="8"
        rx="1"
        transform="rotate(45 5 5)"
        fill={color}
      />
    </svg>
  );
}

function Rule({ color = "#C9A84C" }: { color?: string }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="h-px flex-1"
        style={{
          background: `linear-gradient(to right, transparent, ${color}60)`,
        }}
      />
      <Lozenge color={color} />
      <div
        className="h-px flex-1"
        style={{
          background: `linear-gradient(to left, transparent, ${color}60)`,
        }}
      />
    </div>
  );
}

/* ─────────────────── DATA ─────────────────── */
const GALLERY_ITEMS = [
  {
    img: "/biriyani.png",
    label: "Malabar Biryani",
    tag: "Heritage Fire",
    id: "01",
    hue: "#FB923C",
  },
  {
    img: "/shawarma1.png",
    label: "Arabian Shawarma",
    tag: "Smoke & Spit",
    id: "02",
    hue: "#B8763A",
  },
  {
    img: "/momos.png",
    label: "Steamed Momos",
    tag: "Fusion Flame",
    id: "03",
    hue: "#C9A84C",
  },
  {
    img: "/fish.png",
    label: "Coastal Fish Curry",
    tag: "Coastal Ritual",
    id: "04",
    hue: "#FB923C",
  },
  {
    img: "/pizza.png",
    label: "Stone-baked Pizza",
    tag: "World Kitchen",
    id: "05",
    hue: "#B8763A",
  },
  {
    img: "/biriyani.png",
    label: "Chef's Special",
    tag: "Signature",
    id: "06",
    hue: "#C9A84C",
  },
  {
    img: "/shawarma1.png",
    label: "Grilled Platter",
    tag: "Tandoor Masters",
    id: "07",
    hue: "#FB923C",
  },
  {
    img: "/momos.png",
    label: "Dim Sum Basket",
    tag: "Asian Corner",
    id: "08",
    hue: "#B8763A",
  },
  {
    img: "/fish.png",
    label: "Seafood Feast",
    tag: "Ocean Fresh",
    id: "09",
    hue: "#C9A84C",
  },
];

/* ─────────────────── GALLERY CARD ─────────────────── */
function GalleryCard({
  item,
  index,
  wide = false,
}: {
  item: (typeof GALLERY_ITEMS)[0];
  index: number;
  wide?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: (index % 3) * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative group ${wide ? "sm:col-span-2" : ""}`}
    >
      {/* Corner brackets */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="absolute -top-2 -left-2 w-6 h-6 z-20"
        style={{
          borderTop: `2px solid ${item.hue}`,
          borderLeft: `2px solid ${item.hue}`,
        }}
      />
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="absolute -bottom-2 -right-2 w-6 h-6 z-20"
        style={{
          borderBottom: `2px solid ${item.hue}`,
          borderRight: `2px solid ${item.hue}`,
        }}
      />

      <motion.div
        animate={{
          boxShadow: hovered
            ? `0 24px 48px rgba(0,0,0,0.2), 0 0 0 1.5px ${item.hue}40`
            : "0 4px 20px rgba(0,0,0,0.08)",
        }}
        transition={{ duration: 0.4 }}
        className="overflow-hidden rounded-[18px] border-[6px] border-white"
      >
        {/* Image */}
        <div
          className={`relative overflow-hidden ${wide ? "aspect-[16/7]" : "aspect-[4/3]"}`}
        >
          <motion.div
            animate={{ scale: hovered ? 1.07 : 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={item.img}
              alt={item.label}
              fill
              className="object-cover"
              unoptimized={isLocal}
            />
          </motion.div>

          {/* Bottom-to-top dark gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(15,6,0,0.82) 0%, rgba(100,50,0,0.1) 45%, transparent 65%)",
            }}
          />
          {/* Top tint gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${item.hue}30, transparent 40%)`,
            }}
          />

          {/* Top-left tag pill */}
          <div
            className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1.5 z-10 rounded-full border border-white/20 backdrop-blur-[10px]"
            style={{ background: "rgba(240,232,216,0.18)" }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: item.hue }}
            />
            <span className="font-sans text-[7px] font-bold tracking-[0.3em] text-white uppercase">
              {item.tag}
            </span>
          </div>

          {/* Top-right ID badge */}
          <div
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-[8px] border"
            style={{
              background: "rgba(201,168,76,0.2)",
              borderColor: "rgba(201,168,76,0.4)",
            }}
          >
            <span className="font-sans text-[7px] font-black text-[#C9A84C]">
              {item.id}
            </span>
          </div>

          {/* Bottom text */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
            <div className="flex items-end justify-between">
              <div>
                <p
                  className="font-sans text-[7px] font-bold tracking-[0.35em] mb-[3px]"
                  style={{ color: item.hue }}
                >
                  SEC_{item.id}
                </p>
                <h3
                  className="font-black italic text-white leading-[0.92] tracking-[-0.01em]"
                  style={{
                    fontSize: wide
                      ? "clamp(18px,2.5vw,28px)"
                      : "clamp(16px,2vw,22px)",
                  }}
                >
                  {item.label}
                </h3>
              </div>

              {/* Hover CTA */}
              <motion.div
                animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 8 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="px-3 py-1.5 rounded-full text-white font-sans text-[7px] font-bold tracking-[0.25em] whitespace-nowrap"
                  style={{ background: item.hue }}
                >
                  VIEW →
                </div>
              </motion.div>
            </div>
          </div>

          {/* Ghost number */}
          <div className="absolute bottom-3 right-4 select-none pointer-events-none">
            <span
              className="font-black italic text-white leading-none"
              style={{ fontSize: "clamp(40px,6vw,70px)", opacity: 0.07 }}
            >
              {item.id}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────── PAGE ─────────────────── */
export default function GalleryPage() {
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-5%" });
  const [galleryItems, setGalleryItems] = useState<any[]>([]);

  useEffect(() => {
  const fetchGallery = async () => {
    try {
      const res = await fetch(`${API}/api/gallery`);
      const data = await res.json();

      const mapped = data.map((item: any, index: number) => ({
        img: `${API}${item.image}`,
        label: item.title || "Gallery Image",
        tag: item.featured ? "Featured" : "Food Court",
        featured: item.featured || false,
        id: String(index + 1).padStart(2, "0"),
        hue: ["#FB923C", "#B8763A", "#C9A84C"][index % 3],
      }));

      const featured = mapped.find((i: any) => i.featured);
      const others = mapped.filter((i: any) => !i.featured);

      const finalGallery = featured ? [featured, ...others] : mapped;

      setGalleryItems(finalGallery);

    } catch (err) {
      console.error("Gallery fetch failed", err);
    }
  };

  fetchGallery();
}, []);

  return (
    <main
      className="relative overflow-hidden font-serif"
      style={{ background: "#F0E8D8" }}
    >
      {/* ── GRAIN ── */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-35"
        style={{ backgroundImage: GRAIN, backgroundSize: "200px" }}
      />

      {/* ── DIAGONAL bg ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: DIAG, backgroundRepeat: "repeat" }}
      />

      {/* ── Warm glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 60% 20%, rgba(251,146,60,0.1) 0%, transparent 60%)",
        }}
      />

      {/* ── Dot strip left ── */}
      <div
        className="absolute top-0 left-0 bottom-0 w-8 hidden sm:block pointer-events-none"
        style={{ backgroundImage: DOTS, backgroundRepeat: "repeat" }}
      />

      {/* ══════════════════════════════════════════
          PAGE HEADER
      ══════════════════════════════════════════ */}
      <section
        ref={headerRef}
        className="relative z-10 px-5 pt-20 pb-12 sm:px-10 sm:pt-24 sm:pb-14 md:px-16 md:pt-28 md:pb-16"
      >
        {/* Gold triangle top-right */}
        <div
          className="absolute top-0 right-0 w-28 h-28 md:w-40 md:h-40 pointer-events-none"
          style={{
            background: "#C9A84C",
            clipPath: "polygon(100% 0, 0 0, 100% 100%)",
            opacity: 0.1,
          }}
        />

        <div className="max-w-6xl mx-auto">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="w-5 h-px bg-[#C9A84C]" />
            <span className="font-sans text-[9px] font-bold tracking-[0.45em] text-[#C9A84C] uppercase">
              Artisan Collection
            </span>
          </motion.div>

          {/* Headline + subtitle row */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 sm:gap-8">
            <div>
              <div className="relative">
                {/* Ghost watermark */}
                <p
                  className="absolute -top-4 -left-2 select-none pointer-events-none font-black italic hidden sm:block text-[#C9A84C] leading-none tracking-[-0.05em]"
                  style={{ fontSize: "clamp(60px,9vw,120px)", opacity: 0.05 }}
                >
                  GALLERY
                </p>
                <div className="overflow-hidden ">
                  <motion.h1
                    initial={{ y: "110%", opacity: 0 }}
                    animate={headerInView ? { y: "0%", opacity: 1 } : {}}
                    transition={{
                      duration: 1,
                      delay: 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="font-black italic relative text-[#1a0e04] leading-[0.88] tracking-[-0.03em]"
                    style={{ fontSize: "clamp(38px, 6vw, 80px)" }}
                  >
                    A Feast
                  </motion.h1>
                </div>
                <div className="overflow-hidden pb-3">
                  <motion.h1
                    initial={{ y: "110%", opacity: 0 }}
                    animate={headerInView ? { y: "0%", opacity: 1 } : {}}
                    transition={{
                      duration: 1,
                      delay: 0.22,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="font-black italic text-[#FB923C] leading-[0.88] tracking-[-0.03em]"
                    style={{ fontSize: "clamp(38px, 6vw, 80px)" }}
                  >
                    for the Eyes.
                  </motion.h1>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="max-w-xs sm:text-right pb-1"
            >
              <p
                className="font-sans italic text-[#7a5c38] leading-[1.8]"
                style={{ fontSize: "clamp(12px,1.3vw,13px)" }}
              >
                Take a look at the ambience, food, and moments that make our
                food court special. Each frame tells a story.
              </p>
              <p className="font-sans text-[8px] font-bold tracking-[0.3em] text-[#C9A84C] mt-2 uppercase">
                {galleryItems.length} Featured Shots
              </p>
            </motion.div>
          </div>

          {/* Rule */}
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
          GALLERY GRID
      ══════════════════════════════════════════ */}
      <section
        ref={gridRef}
        className="relative z-10 px-5 pb-20 sm:px-10 sm:pb-24 md:px-16 md:pb-28"
      >
        <div className="max-w-6xl mx-auto">
          {/* Featured wide card — first item */}
          <div className="mb-5 md:mb-6">
            {galleryItems[0] && (
              <GalleryCard item={galleryItems[0]} index={0} wide />
            )}
          </div>

          {/* 2-col then 3-col bento rows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {galleryItems.slice(1).map((item, i) => (
              <GalleryCard key={item.id} item={item} index={i + 1} />
            ))}
          </div>

          {/* Bottom Rule + CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-14 md:mt-16 flex flex-col items-center gap-5"
          >
            <Rule />
            <Link href="/shops">
              <motion.span
                whileHover={{ scale: 1.05, background: "#C9A84C" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="inline-block font-sans bg-[#1a0e04] text-white text-[9px] font-bold tracking-[0.35em] px-9 py-[13px] rounded-full cursor-pointer uppercase"
              >
                Explore Our Outlets →
              </motion.span>
            </Link>
            <p className="hidden sm:block font-sans text-[7px] tracking-[0.45em] text-[#a07840]/40 uppercase">
              Eight Chapters · Artisan Collection · Est. 2021
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
