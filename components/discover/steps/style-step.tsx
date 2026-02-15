"use client"

import Image from "next/image"
import { STYLE_OPTIONS } from "@/lib/mock-data"
import type { StyleOption } from "@/lib/types"
import { cn } from "@/lib/utils"

export function StyleStep({
  selected,
  onSelect,
  maxSelections,
}: {
  selected: StyleOption[]
  onSelect: (v: StyleOption[]) => void
  maxSelections: number
}) {
  const toggle = (id: StyleOption) => {
    if (selected.includes(id)) {
      onSelect(selected.filter((s) => s !== id))
    } else if (selected.length < maxSelections) {
      onSelect([...selected, id])
    }
  }

  return (
    <div>
      <h2 className="font-serif text-2xl tracking-tight text-foreground md:text-3xl text-balance">
        What art styles do you gravitate toward?
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Pick up to {maxSelections}
      </p>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {STYLE_OPTIONS.map((style) => (
          <button
            key={style.id}
            onClick={() => toggle(style.id)}
            className={cn(
              "group relative aspect-[4/5] overflow-hidden rounded-xl border-2 transition-all",
              selected.includes(style.id)
                ? "border-accent ring-2 ring-accent/20"
                : "border-border hover:border-accent/30"
            )}
          >
            <Image
              src={style.image}
              alt={style.label}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
            <span className="absolute bottom-4 left-4 font-serif text-lg text-background">
              {style.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
