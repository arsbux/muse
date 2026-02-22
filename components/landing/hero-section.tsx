"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="px-3 pb-4 pt-3 sm:px-6 sm:pb-8 lg:px-8">
      {/* Framed Card */}
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-card py-20 sm:py-36">

        {/* ── Blob decorations ── */}
        <motion.div
          className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 sm:-left-28 sm:-top-28 sm:h-96 sm:w-96 bg-accent/20"
          style={{ borderRadius: "60% 40% 70% 30% / 50% 70% 30% 60%" }}
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 sm:-bottom-28 sm:-right-28 sm:h-96 sm:w-96 bg-accent/15"
          style={{ borderRadius: "40% 60% 30% 70% / 70% 40% 60% 30%" }}
          animate={{ rotate: [0, -10, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Small accent blob — top right */}
        <motion.div
          className="pointer-events-none absolute right-6 top-6 h-16 w-16 sm:right-12 sm:top-12 sm:h-24 sm:w-24 bg-accent/25"
          style={{ borderRadius: "50% 70% 40% 60% / 60% 40% 70% 50%" }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Small accent blob — bottom left */}
        <motion.div
          className="pointer-events-none absolute bottom-6 left-6 h-12 w-12 sm:bottom-12 sm:left-12 sm:h-16 sm:w-16 bg-accent/20"
          style={{ borderRadius: "70% 30% 50% 50% / 40% 60% 40% 60%" }}
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* ── Center Content ── */}
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-5 text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 sm:mb-8 inline-flex items-center gap-2 rounded-full bg-accent/15 px-4 py-2 sm:px-5 sm:py-2.5 border border-accent/30 backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4 text-accent animate-pulse" />
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
              AI-Powered Creativity
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl text-balance"
          >
            Art created by{" "}
            <span className="text-accent italic">you</span>,
            <br />
            printed for your walls
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 sm:mt-8 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground"
          >
            Describe your vision. Watch AI bring it to life. Choose your perfect
            print and receive museum-quality art delivered to your door.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
          >
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 text-base font-medium bg-accent text-accent-foreground hover:bg-accent/85 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              <Link href="/discover">
                <Sparkles className="mr-2 h-4 w-4" />
                Discover Your Style
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-8 text-base font-medium border-foreground/20 text-foreground hover:bg-accent/10 hover:border-accent/50 hover:-translate-y-0.5 transition-all duration-300"
            >
              <Link href="/create">
                Start Creating
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Social proof */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 text-sm text-muted-foreground italic"
          >
            Join thousands of artists creating their perfect wall art
          </motion.p>
        </div>
      </div>
    </section>
  )
}
