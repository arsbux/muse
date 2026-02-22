"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { GALLERY_ITEMS } from "@/lib/mock-data"

const styles = [
  {
    name: "Abstract",
    description: "Bold, expressive forms that evoke emotion and energy beyond the literal world.",
  },
  { name: "Realistic",   description: "Lifelike scenes rendered with stunning clarity and depth." },
  { name: "Illustrated", description: "Hand-drawn warmth with an editorial, artistic feel." },
  { name: "Surreal",     description: "Dreamlike worlds where imagination has no boundaries." },
  { name: "Minimal",     description: "Quiet composition — where simplicity becomes powerful." },
]

export function StyleShowcase() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">

        {/* ── Split header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Artistic Styles
            </p>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-foreground text-balance">
              Every style,{" "}
              <span className="text-accent italic">your</span> vision
            </h2>
          </div>
          <p className="text-muted-foreground text-base max-w-sm leading-relaxed md:text-right">
            Our AI adapts to any aesthetic — from bold abstractions to quiet minimalism.
          </p>
        </motion.div>

        {/* ── Desktop: featured left + 2×2 right ── */}
        <div className="hidden sm:flex gap-4" style={{ height: "520px" }}>

          {/* Featured card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-[40%] shrink-0 overflow-hidden rounded-2xl bg-muted group cursor-pointer"
          >
            <Image
              src={GALLERY_ITEMS[0].url}
              alt={styles[0].name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/25 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/60 font-medium">
                Featured Style
              </span>
              <h3 className="mt-2 font-serif text-3xl text-white">
                {styles[0].name}
              </h3>
              <p className="mt-2 text-sm text-white/75 leading-relaxed max-w-xs">
                {styles[0].description}
              </p>
              <Link
                href="/create"
                className="mt-5 inline-flex items-center gap-2 text-sm text-white/90 hover:text-white transition-colors group/link"
              >
                Try this style
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* 2×2 grid */}
          <div className="grid grid-cols-2 gap-4 flex-1">
            {GALLERY_ITEMS.slice(1, 5).map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i + 1) * 0.1 }}
                className="relative overflow-hidden rounded-2xl bg-muted group cursor-pointer"
              >
                <Image
                  src={item.url}
                  alt={styles[i + 1]?.name || ""}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-serif text-xl text-white">
                    {styles[i + 1]?.name}
                  </h3>
                  <p className="mt-1 text-sm text-white/70 leading-snug line-clamp-2">
                    {styles[i + 1]?.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Mobile: stacked layout ── */}
        <div className="flex flex-col gap-4 sm:hidden">
          {/* Featured */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted"
          >
            <Image
              src={GALLERY_ITEMS[0].url}
              alt={styles[0].name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="font-serif text-2xl text-white">{styles[0].name}</h3>
              <p className="mt-1 text-sm text-white/75">{styles[0].description}</p>
            </div>
          </motion.div>

          {/* 2-col grid */}
          <div className="grid grid-cols-2 gap-4">
            {GALLERY_ITEMS.slice(1, 5).map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative aspect-square overflow-hidden rounded-xl bg-muted"
              >
                <Image src={item.url} alt={styles[i + 1]?.name || ""} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-serif text-base text-white">{styles[i + 1]?.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
