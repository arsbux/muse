"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Palette, Sparkles, Frame, Truck, ArrowRight } from "lucide-react"

const steps = [
  {
    icon: Palette,
    number: "01",
    title: "Discover your style",
    description:
      "Take our visual quiz to define your aesthetic — colors, styles, moods, and the room where your art will live.",
    href: "/discover",
    cta: "Take the quiz",
  },
  {
    icon: Sparkles,
    number: "02",
    title: "Describe your vision",
    description:
      "Tell us what you imagine in plain language. Our AI enhances your idea and generates four unique artwork options.",
    href: "/create",
    cta: "Start creating",
  },
  {
    icon: Frame,
    number: "03",
    title: "Configure your print",
    description:
      "Choose your size, medium, and frame. Preview your art in a room mockup to see exactly how it will look.",
    href: "/create",
    cta: "See options",
  },
  {
    icon: Truck,
    number: "04",
    title: "Delivered to your door",
    description:
      "Museum-quality printing on premium materials. Each piece is made to order and shipped directly to you.",
    href: "/discover",
    cta: "Learn more",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 sm:py-32 bg-card/40">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-muted-foreground">
              How It Works
            </p>
            <h2 className="font-serif text-4xl tracking-tight text-foreground md:text-5xl text-balance">
              From imagination to your wall
            </h2>
          </div>
          <p className="text-muted-foreground text-base max-w-sm leading-relaxed md:text-right">
            Four simple steps from idea to a piece of art on your wall.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid gap-px bg-border/40 rounded-2xl overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative flex flex-col bg-card p-8 hover:bg-accent/5 transition-colors"
              >
                {/* Number + Icon row */}
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-serif text-5xl font-semibold text-accent/20 group-hover:text-accent/40 transition-colors leading-none">
                    {step.number}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="mb-3 font-serif text-xl text-foreground group-hover:text-accent transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground flex-1">
                  {step.description}
                </p>

                {/* CTA */}
                <Link
                  href={step.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm text-accent opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {step.cta}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
