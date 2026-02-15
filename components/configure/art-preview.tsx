"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, Home, ZoomIn } from "lucide-react"
import { FRAMES } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import type { RoomOption } from "@/lib/types"

const ROOM_IMAGES: Record<string, string> = {
  "living-room": "/images/rooms/living-room.jpg",
  "bedroom": "/images/rooms/bedroom.jpg",
  "office": "/images/rooms/office.jpg",
  "dining": "/images/rooms/dining.jpg",
  "nursery": "/images/rooms/nursery.jpg",
  "hallway": "/images/rooms/hallway.jpg",
}

type PreviewMode = "art" | "room" | "detail"

const PREVIEW_TABS: { id: PreviewMode; label: string; icon: typeof Eye }[] = [
  { id: "art", label: "Art Only", icon: Eye },
  { id: "room", label: "Room View", icon: Home },
  { id: "detail", label: "Detail", icon: ZoomIn },
]

export function ArtPreview({
  imageUrl,
  frame,
  room,
}: {
  imageUrl: string
  frame: string
  room: string
}) {
  const [mode, setMode] = useState<PreviewMode>("art")
  const frameData = FRAMES.find((f) => f.id === frame)
  const roomImage = ROOM_IMAGES[room] || ROOM_IMAGES["living-room"]

  const frameColor = frameData?.color || "transparent"
  const hasFrame = frame !== "none"

  return (
    <div className="flex flex-col gap-4">
      {/* Preview Mode Tabs */}
      <div className="flex gap-1 rounded-lg border border-border bg-card p-1">
        {PREVIEW_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setMode(tab.id)}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-xs transition-all",
              mode === tab.id
                ? "bg-background text-foreground font-medium shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <tab.icon className="h-3.5 w-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Preview Area */}
      <div className="relative overflow-hidden rounded-lg bg-muted aspect-[4/3]">
        <AnimatePresence mode="wait">
          {mode === "art" && (
            <motion.div
              key="art"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-full items-center justify-center bg-secondary p-8"
            >
              <div
                className={cn(
                  "relative overflow-hidden shadow-2xl",
                  hasFrame ? "p-[6px]" : ""
                )}
                style={hasFrame ? { backgroundColor: frameColor } : undefined}
              >
                <div className="relative aspect-[3/4] w-48 sm:w-64 md:w-72">
                  <Image
                    src={imageUrl}
                    alt="Your art"
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {mode === "room" && (
            <motion.div
              key="room"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative h-full"
            >
              <Image
                src={roomImage}
                alt="Room mockup"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
              {/* Art overlay positioned on wall */}
              <div className="absolute inset-0 flex items-center justify-center" style={{ paddingBottom: "10%" }}>
                <div
                  className={cn(
                    "relative overflow-hidden shadow-2xl",
                    hasFrame ? "p-[5px]" : ""
                  )}
                  style={hasFrame ? { backgroundColor: frameColor } : undefined}
                >
                  <div className="relative aspect-[3/4] w-28 sm:w-36 md:w-44">
                    <Image
                      src={imageUrl}
                      alt="Art in room"
                      fill
                      sizes="200px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {mode === "detail" && (
            <motion.div
              key="detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative h-full"
            >
              <Image
                src={imageUrl}
                alt="Detail view"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover scale-150"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
