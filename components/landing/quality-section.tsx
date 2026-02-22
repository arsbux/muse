"use client"

import { motion } from "framer-motion"
import { Check, Package, Palette, Zap } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "AI-Powered Creation",
    description: "Advanced AI transforms your imagination into stunning visual art in seconds.",
  },
  {
    icon: Palette,
    title: "Infinite Variations",
    description: "Generate multiple versions and refine endlessly until it's exactly what you envision.",
  },
  {
    icon: Package,
    title: "Museum Quality",
    description: "Premium materials and professional printing ensure gallery-quality results.",
  },
  {
    icon: Check,
    title: "Made to Order",
    description: "Each piece is hand-crafted and made fresh, just for you. No mass production.",
  },
]

export function QualitySection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-20 sm:py-32 bg-gradient-to-b from-accent/5 via-background to-background">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Why Muse
          </p>
          <h2 className="font-serif text-4xl tracking-tight text-foreground md:text-5xl text-balance">
            Crafted with care, delivered with pride
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-muted-foreground text-base leading-relaxed">
            We believe that AI should enhance creativity, not replace it. Every piece celebrates your unique vision.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="group relative p-8 rounded-lg border border-border/50 bg-card/30 hover:bg-card/60 hover:border-accent/30 transition-all hover:shadow-lg"
              >
                {/* Icon */}
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <Icon className="h-6 w-6 text-accent" />
                </div>

                {/* Content */}
                <h3 className="mb-3 font-serif text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 grid gap-8 md:grid-cols-3 text-center"
        >
          <div className="p-6">
            <p className="text-3xl font-serif font-bold text-accent mb-2">10,000+</p>
            <p className="text-sm text-muted-foreground uppercase tracking-wide">Artworks Created</p>
          </div>
          <div className="p-6 border-l border-r border-border">
            <p className="text-3xl font-serif font-bold text-accent mb-2">99%</p>
            <p className="text-sm text-muted-foreground uppercase tracking-wide">Customer Satisfaction</p>
          </div>
          <div className="p-6">
            <p className="text-3xl font-serif font-bold text-accent mb-2">2-3 Days</p>
            <p className="text-sm text-muted-foreground uppercase tracking-wide">Shipping Time</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
