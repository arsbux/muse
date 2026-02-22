"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GALLERY_ITEMS } from "@/lib/mock-data"

// Vary heights to create masonry feel (desktop); mobile uses aspect-ratio
const itemHeights = [560, 480, 520, 480, 560, 480]

export function SampleGallery() {
  const featured = GALLERY_ITEMS.slice(0, 6)

  return (
    <section className="py-16 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end"
        >
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Gallery
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-foreground md:text-5xl text-balance">
              See what's possible
            </h2>
            <p className="mt-3 text-muted-foreground text-base max-w-md">
              Get inspired by works created with Muse. Each piece tells a unique story.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="shrink-0 rounded-full border-accent/30 text-foreground hover:bg-accent/5 hover:border-accent/50 transition-all"
          >
            <Link href="/gallery">
              Browse All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        {/* Masonry via CSS columns */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="columns-1 sm:columns-2 lg:columns-3 gap-4"
        >
          {featured.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-muted${i >= 3 ? " hidden sm:block" : ""}`}
            >
              <Image
                src={item.url}
                alt={item.title}
                width={600}
                height={itemHeights[i] ?? 600}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Always-visible bottom gradient + title */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/10 to-transparent" />

              {/* Info — always visible */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-serif text-base font-semibold text-white leading-snug">
                  {item.title}
                </p>
                <p className="mt-1 text-xs text-white/70 capitalize">
                  {item.style} &nbsp;·&nbsp; {item.subject}
                </p>

                {/* CTA on hover */}
                <Link
                  href="/create"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs text-white/90 hover:text-white transition-all opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 duration-300"
                >
                  Create similar
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
