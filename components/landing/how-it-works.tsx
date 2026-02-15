"use client"

import { motion } from "framer-motion"
import { Palette, Sparkles, Frame, Truck } from "lucide-react"

const steps = [
  {
    icon: Palette,
    title: "Discover your style",
    description:
      "Take our visual quiz to define your aesthetic preferences — colors, styles, moods, and the room where your art will live.",
  },
  {
    icon: Sparkles,
    title: "Describe your vision",
    description:
      "Tell us what you imagine in plain language. Our AI enhances your idea and generates four unique artwork options.",
  },
  {
    icon: Frame,
    title: "Configure your print",
    description:
      "Choose your size, medium, and frame. Preview your art in a room mockup to see exactly how it will look on your wall.",
  },
  {
    icon: Truck,
    title: "Delivered to your door",
    description:
      "Museum-quality printing on premium materials. Each piece is made to order and shipped directly to you.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-32 bg-card">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-muted-foreground">
            How It Works
          </p>
          <h2 className="font-serif text-4xl tracking-tight text-foreground md:text-5xl text-balance">
            From imagination to your wall
          </h2>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-start"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-foreground/5">
                <step.icon className="h-5 w-5 text-foreground" />
              </div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                Step {i + 1}
              </p>
              <h3 className="mb-3 font-serif text-xl text-foreground">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
