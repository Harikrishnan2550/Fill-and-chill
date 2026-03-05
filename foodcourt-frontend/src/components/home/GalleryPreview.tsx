"use client"

import Image from "next/image"
import Link from "next/link"

export default function GalleryPreview() {
  return (
    <section className="py-24 px-6 bg-[#1a0f00] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between mb-10">
          <h2 className="text-5xl font-black">Gallery</h2>
          <Link href="/gallery" className="text-white/50">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="relative h-40 rounded-2xl overflow-hidden">
              <Image src="/biriyani.png" alt="Gallery" fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}