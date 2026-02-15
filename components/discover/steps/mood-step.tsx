"use client"

import Image from "next/image"
import { MOOD_OPTIONS } from "@/lib/mock-data"
import type { MoodOption } from "@/lib/types"
import { cn } from "@/lib/utils"

export function MoodStep({
  selected,
  onSelect,
}: {
  selected: MoodOption | null
  onSelect: (v: MoodOption) => void
}) {
  return (
    <div>
      <h2 className="font-serif text-2xl tracking-tight text-foreground md:text-3xl text-balance">
        What mood should your art evoke?
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Pick one
      </p>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {MOOD_OPTIONS.map((mood) => (
          <button
            key={mood.id}
            onClick={() => onSelect(mood.id)}
            className={cn(
              "group relative aspect-[4/3] overflow-hidden rounded-xl border-2 transition-all",
              selected === mood.id
                ? "border-accent ring-2 ring-accent/20"
                : "border-border hover:border-accent/30"
            )}
          >
            <Image
              src={mood.image}
              alt={mood.label}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-foreground/40" />
            <span className="absolute inset-0 flex items-center justify-center font-serif text-lg text-background">
              {mood.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
