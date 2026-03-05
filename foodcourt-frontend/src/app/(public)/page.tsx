"use client"

import HeroSection from "@/components/home/HeroSection"
import Ticker from "@/components/home/Ticker"
import CuisinesSection from "@/components/home/CuisinesSection"
import PopularOutlets from "@/components/home/PopularOutlets"
import PillarsSection from "@/components/home/PillarsSection"
// import GalleryPreview from "@/components/home/GalleryPreview"
import TestimonialsSection from "@/components/home/TestimonialsSection"
import FinalCTA from "@/components/home/FinalCTA"

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <Ticker />
      <CuisinesSection />
      <PopularOutlets />
      <PillarsSection />
      {/* <GalleryPreview /> */}
      <TestimonialsSection />
      <FinalCTA />
    </main>
  )
}