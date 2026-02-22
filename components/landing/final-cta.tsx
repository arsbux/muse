"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FinalCTA() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="relative py-16 sm:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
        />
        <motion.div
          animate={{ y: [40, 0, 40] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl"
        />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center text-center gap-8"
        >
          {/* Heading */}
          <motion.div variants={itemVariants} className="space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-accent font-medium">
              Ready to begin?
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground text-balance leading-tight">
              Your masterpiece is waiting to be created
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Start with a style discovery quiz or dive straight into creation. Either way, you're just a few clicks away from your dream wall art.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 text-base bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:shadow-xl transition-all"
            >
              <Link href="/discover">
                <Sparkles className="mr-2 h-4 w-4" />
                Discover Your Style
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 text-base bg-foreground text-background hover:bg-foreground/90 transition-all"
            >
              <Link href="/create">
                Create Art Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Optional subtext */}
          <motion.p
            variants={itemVariants}
            className="text-xs text-muted-foreground uppercase tracking-wide"
          >
            No credit card required to get started
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
