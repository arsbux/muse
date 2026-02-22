import { HeroSection } from "@/components/landing/hero-section"
import { HowItWorks } from "@/components/landing/how-it-works"
import { SampleGallery } from "@/components/landing/sample-gallery"
import { StyleShowcase } from "@/components/landing/style-showcase"
import { QualitySection } from "@/components/landing/quality-section"
import { FinalCTA } from "@/components/landing/final-cta"
import { FooterSection } from "@/components/landing/footer-section"

export const metadata = {
  title: "Muse — AI-Powered Wall Art",
  description:
    "Create custom wall art with AI. Discover your style, generate unique artwork, and order museum-quality prints delivered to your door.",
}

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <StyleShowcase />
      <HowItWorks />
      <SampleGallery />
      <QualitySection />
      <FinalCTA />
      <FooterSection />
    </div>
  )
}
