"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

type ShopType = {
  id: string;
  name: string;
  sub: string;
  tag: string;
  img: string;
  hue: string;
  desc: string;
  hours: string;
  rating: string;
  phone?: string;
};

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
        style={{ background: `linear-gradient(to right, transparent, ${color}60)` }}
      />
      <Lozenge color={color} />
      <div
        className="h-px flex-1"
        style={{ background: `linear-gradient(to left, transparent, ${color}60)` }}
      />
    </div>
  );
}

/* ─────────────────── DATA ─────────────────── */
const SHOPS = [
  {
    id: "01",
    name: "Biryani House",
    sub: "North Indian",
    tag: "Heritage Fire",
    img: "/biriyani.png",
    hue: "#FB923C",
    desc: "Tandoor-kissed and smoke-laced. Born along ancient spice routes where every coal tells a story.",
    hours: "11 AM – 11 PM",
    rating: "4.9",
  },
  {
    id: "02",
    name: "Shawarma Point",
    sub: "Arabian Grill",
    tag: "Smoke & Spit",
    img: "/shawarma1.png",
    hue: "#B8763A",
    desc: "Marinated rotisserie meats, house garlic sauce, and freshly baked bread straight from the stone.",
    hours: "11 AM – 11 PM",
    rating: "4.8",
  },
  {
    id: "03",
    name: "China Wok",
    sub: "Indo-Chinese",
    tag: "Fusion Flame",
    img: "/momos.png",
    hue: "#C9A84C",
    desc: "Two civilizations collide in one blazing wok. Schezwan heat. Soy depth. Smoke that lingers.",
    hours: "12 PM – 10 PM",
    rating: "4.7",
  },
  {
    id: "04",
    name: "Coastal Kitchen",
    sub: "Kerala Seafood",
    tag: "Coastal Ritual",
    img: "/fish.png",
    hue: "#FB923C",
    desc: "Fresh-catch curries, coconut-laced gravies, and the earthy scent of a Kerala backwater kitchen.",
    hours: "11 AM – 10 PM",
    rating: "4.9",
  },
  {
    id: "05",
    name: "Stone Oven",
    sub: "World Kitchen",
    tag: "Global Craft",
    img: "/pizza.png",
    hue: "#B8763A",
    desc: "Stone-baked flatbreads and handcrafted pies — slow fermentation, high heat, maximum flavour.",
    hours: "12 PM – 11 PM",
    rating: "4.6",
  },
  {
    id: "06",
    name: "Sweet Finales",
    sub: "Desserts & More",
    tag: "Sweet Ritual",
    img: "/biriyani.png",
    hue: "#C9A84C",
    desc: "From warm halwa to chilled kulfi — the perfect ending to every chapter of the meal.",
    hours: "11 AM – 11 PM",
    rating: "4.8",
  },
];


/* ─────────────────── SHOP CARD ─────────────────── */
function ShopCard({ shop, index }: { shop: ShopType; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.85,
        delay: (index % 3) * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group"
    >
      {/* Corner brackets */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="absolute -top-2 -left-2 w-6 h-6 z-20"
        style={{
          borderTop: `2px solid ${shop.hue}`,
          borderLeft: `2px solid ${shop.hue}`,
        }}
      />
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="absolute -bottom-2 -right-2 w-6 h-6 z-20"
        style={{
          borderBottom: `2px solid ${shop.hue}`,
          borderRight: `2px solid ${shop.hue}`,
        }}
      />

      <motion.div
        animate={{
          boxShadow: hovered
            ? `0 28px 52px rgba(0,0,0,0.16), 0 0 0 1.5px ${shop.hue}35`
            : "0 4px 20px rgba(0,0,0,0.07)",
          y: hovered ? -6 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden flex flex-col rounded-[20px] border-[6px] border-white bg-white"
      >
        {/* ── Image ── */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.div
            animate={{ scale: hovered ? 1.07 : 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <img
              src={shop.img}
              alt={shop.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>

          {/* Bottom-to-top dark gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(15,6,0,0.85) 0%, rgba(100,50,0,0.1) 45%, transparent 65%)",
            }}
          />
          {/* Top tint gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${shop.hue}30, transparent 40%)`,
            }}
          />

          {/* Tag pill */}
          <div
            className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1.5 z-10 rounded-full border border-white/20 backdrop-blur-[10px]"
            style={{ background: "rgba(240,232,216,0.18)" }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: shop.hue }}
            />
            <span className="font-sans text-[7px] font-bold tracking-[0.3em] text-white uppercase">
              {shop.tag}
            </span>
          </div>

          {/* Rating badge */}
          <div
            className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1.5 rounded-full border backdrop-blur-[8px]"
            style={{
              background: "rgba(201,168,76,0.22)",
              borderColor: "rgba(201,168,76,0.4)",
            }}
          >
            <svg width="9" height="9" viewBox="0 0 14 14" fill="#C9A84C">
              <path d="M7 1l1.5 3.5L12 5l-2.5 2.5.5 3.5L7 9.5 4 11l.5-3.5L2 5l3.5-.5L7 1z" />
            </svg>
            <span className="font-sans text-[8px] font-black text-[#C9A84C]">
              {shop.rating}
            </span>
          </div>

          {/* Bottom image text */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
            <p className="font-sans text-[7px] font-bold tracking-[0.35em] mb-[3px]"
              style={{ color: shop.hue }}>
              SEC_{shop.id}
            </p>
            <h3
              className="font-black italic text-white leading-[0.92] tracking-[-0.01em]"
              style={{ fontSize: "clamp(18px,2vw,24px)" }}
            >
              {shop.name}
            </h3>
            <p className="italic text-white/55 text-[12px] mt-[2px]">
              {shop.sub}
            </p>
          </div>

          {/* Ghost number */}
          <div className="absolute bottom-3 right-4 select-none pointer-events-none">
            <span
              className="font-black italic text-white leading-none"
              style={{ fontSize: "clamp(44px,6vw,68px)", opacity: 0.07 }}
            >
              {shop.id}
            </span>
          </div>
        </div>

        {/* ── Card body ── */}
        <div className="flex flex-col flex-1 p-5 bg-white relative overflow-hidden">
          {/* Triangle accent */}
          <div
            className="absolute top-0 right-0 w-14 h-14"
            style={{
              background: shop.hue,
              clipPath: "polygon(100% 0, 0 0, 100% 100%)",
              opacity: 0.07,
            }}
          />

          <p className="font-sans text-[12px] text-[#7a5c38] leading-[1.8] mb-4 line-clamp-1">
            {shop.desc}
          </p>

          <Rule color={`${shop.hue}60`} />

          <div className="flex items-center justify-between mt-4">
            <div>
              <p className="font-sans text-[7px] font-bold tracking-[0.3em] text-[#a07840] mb-[2px] uppercase">
                Open Hours
              </p>
              <p className="font-serif italic text-[13px] text-[#5a3e1c]">
                {shop.hours}
              </p>
            </div>
            <motion.button
  onClick={() => {
    const message = `Hello 👋

I found your shop on Food & Chill.

Shop: ${shop.name}
Cuisine: ${shop.sub}

Can you share more details about the menu?`;

    const whatsappUrl = `https://wa.me/${shop.phone}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  }}
  animate={{ opacity: hovered ? 1 : 0.55, x: hovered ? 0 : -4 }}
  transition={{ duration: 0.3 }}
  className="font-sans text-[7px] font-bold tracking-[0.3em] text-white px-4 py-2 rounded-full border-none cursor-pointer uppercase whitespace-nowrap"
  style={{ background: shop.hue }}
>
  Connect →
</motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────── PAGE ─────────────────── */
export default function ShopsPage() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-5%" });
  const [shops, setShops] = useState<ShopType[]>([]);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const API = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${API}/api/shops`);
        const data = await res.json();

        const mapped = data.map((item: any, index: number) => ({
  id: String(index + 1).padStart(2, "0"),
  name: item.name,
  sub: item.cuisine,
  tag: item.cuisine,
  img: item.image ? `${API}${item.image}` : "/biriyani.png",
  hue: SHOPS[index % SHOPS.length].hue,
  desc: item.longDescription || "No description available.",
  hours: `${item.openTime || "11 AM"} – ${item.closeTime || "11 PM"}`,
  rating: item.rating ? Number(item.rating).toFixed(1) : "4.5",
  phone: item.phone || "919876543210",
}));

        setShops(mapped);
      } catch (err) {
        console.error("Failed to fetch shops:", err);
      }
    };

    fetchShops();
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
          className="absolute top-0 right-0 w-28 h-28 md:w-44 md:h-44 pointer-events-none"
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
            <div className="relative">
              {/* Ghost background word */}
              <p
                className="absolute -top-4 -left-2 select-none pointer-events-none font-black italic hidden sm:block text-[#C9A84C] leading-none tracking-[-0.05em]"
                style={{ fontSize: "clamp(60px,9vw,120px)", opacity: 0.05 }}
              >
                SHOPS
              </p>

              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "110%", opacity: 0 }}
                  animate={headerInView ? { y: "0%", opacity: 1 } : {}}
                  transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="font-black italic relative text-[#1a0e04] leading-[0.88] tracking-[-0.03em]"
                  style={{ fontSize: "clamp(36px,6vw,80px)" }}
                >
                  Our Food
                </motion.h1>
              </div>
              <div className="overflow-hidden pb-3">
                <motion.h1
                  initial={{ y: "110%", opacity: 0 }}
                  animate={headerInView ? { y: "0%", opacity: 1 } : {}}
                  transition={{ duration: 1, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="font-black italic text-[#FB923C] leading-[0.88] tracking-[-0.03em]"
                  style={{ fontSize: "clamp(36px,6vw,80px)" }}
                >
                  Shops.
                </motion.h1>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="max-w-xs sm:text-right pb-1"
            >
              <p
                className="font-sans italic text-[#7a5c38] leading-[1.8]"
                style={{ fontSize: "clamp(12px,1.3vw,13px)" }}
              >
                Explore a variety of outlets offering delicious cuisines
                prepared with care and the finest ingredients.
              </p>
              <p className="font-sans text-[8px] font-bold tracking-[0.3em] text-[#C9A84C] mt-2 uppercase">
                {shops.length} Outlets Available
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
          SHOPS GRID
      ══════════════════════════════════════════ */}
      <section className="relative z-10 px-5 pb-20 sm:px-10 sm:pb-24 md:px-16 md:pb-28">
        <div className="max-w-6xl mx-auto">
          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-10 md:mb-12"
          >
            <p className="font-sans text-[8px] font-bold tracking-[0.3em] text-[#a07840] uppercase">
  Showing {shops.length} outlets
</p>
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-[#C9A84C]/40" />
              <Lozenge color="#C9A84C60" />
              <p className="font-serif italic text-[11px] text-[#a07840]">
                Crafted with care · Piravom ,Eranamkulam
              </p>
            </div>
          </motion.div>

          {/* Grid: 1 col → 2 col → 3 col */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {shops.map((shop, i) => (
  <ShopCard key={i} shop={shop} index={i} />
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
            <Link href="/contact">
              <motion.span
                whileHover={{ scale: 1.05, background: "#C9A84C" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="inline-block font-sans bg-[#1a0e04] text-white text-[9px] font-bold tracking-[0.35em] px-9 py-[13px] rounded-full cursor-pointer uppercase"
              >
                connect with us  →
              </motion.span>
            </Link>
            <p className="hidden sm:block font-sans text-[7px] tracking-[0.45em] text-[#a07840]/40 uppercase">
             · Fill And Chill · Artisan Collection ·
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}