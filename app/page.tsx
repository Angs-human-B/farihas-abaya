import { Navigation } from "@/components/sections/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { BrandStory } from "@/components/sections/BrandStory";
import { CollectionShowcase } from "@/components/sections/CollectionShowcase";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Testimonials } from "@/components/sections/Testimonials";
import { StoreLocations } from "@/components/sections/StoreLocations";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
import { Newsletter } from "@/components/sections/Newsletter";
import { Footer } from "@/components/sections/Footer";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Temporary debug to verify exports are defined at runtime (will remove once stable)
console.log('DBG components:', {
  Navigation: typeof Navigation,
  HeroSection: typeof HeroSection,
  BrandStory: typeof BrandStory,
  CollectionShowcase: typeof CollectionShowcase,
  FeaturedProducts: typeof FeaturedProducts,
  Testimonials: typeof Testimonials,
  StoreLocations: typeof StoreLocations,
  InstagramFeed: typeof InstagramFeed,
  Newsletter: typeof Newsletter,
  Footer: typeof Footer,
});

export default function HomePage() {
  return (
    <main className="min-h-screen bg-midnight">
      <ErrorBoundary name="Navigation"><Navigation /></ErrorBoundary>
      <ErrorBoundary name="HeroSection"><HeroSection /></ErrorBoundary>
      <ErrorBoundary name="BrandStory"><BrandStory /></ErrorBoundary>
      <ErrorBoundary name="CollectionShowcase"><CollectionShowcase /></ErrorBoundary>
      <ErrorBoundary name="FeaturedProducts"><FeaturedProducts /></ErrorBoundary>
      <ErrorBoundary name="Testimonials"><Testimonials /></ErrorBoundary>
      <ErrorBoundary name="StoreLocations"><StoreLocations /></ErrorBoundary>
      <ErrorBoundary name="InstagramFeed"><InstagramFeed /></ErrorBoundary>
      <ErrorBoundary name="Newsletter"><Newsletter /></ErrorBoundary>
      <ErrorBoundary name="Footer"><Footer /></ErrorBoundary>
    </main>
  );
}
