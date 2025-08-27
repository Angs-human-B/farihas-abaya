import { Navigation } from "@/components/sections/Navigation"
import { HeroSection } from "@/components/sections/HeroSection"
import { BrandStory } from "@/components/sections/BrandStory"
import { CollectionShowcase } from "@/components/sections/CollectionShowcase"
import { FeaturedProducts } from "@/components/sections/FeaturedProducts"
import { Footer } from "@/components/sections/Footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-midnight">
      <Navigation />
      <HeroSection />
      
      {/* Phase 4: Brand Story Sections */}
      <BrandStory />
      
      {/* Phase 4: Collection Showcase */}
      <CollectionShowcase />
      
      {/* Phase 4: Featured Products Carousel */}
      <FeaturedProducts />

      <Footer />
    </main>
  )
}
