"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-art.jpg"
          alt=""
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 py-32 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-sm uppercase tracking-[0.2em] text-muted-foreground"
        >
          AI-Powered Wall Art
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-4xl font-serif text-5xl leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl text-balance"
        >
          Art created by you, printed for your walls
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground"
        >
          Describe what you imagine. Our AI brings it to life. Choose your perfect
          print, frame, and size — delivered to your door.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Button asChild size="lg" className="rounded-full px-8 text-base bg-foreground text-background hover:bg-foreground/90">
            <Link href="/discover">
              Discover Your Style
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 text-base border-foreground/20 text-foreground hover:bg-foreground/5">
            <Link href="/create">Start Creating</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
