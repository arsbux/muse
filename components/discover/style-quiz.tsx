"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useStyleProfile } from "@/lib/contexts"
import type { StyleProfile, PaletteOption, StyleOption, SubjectOption, MoodOption, RoomOption } from "@/lib/types"
import { PaletteStep } from "./steps/palette-step"
import { StyleStep } from "./steps/style-step"
import { SubjectStep } from "./steps/subject-step"
import { MoodStep } from "./steps/mood-step"
import { RoomStep } from "./steps/room-step"
import { QuizResults } from "./quiz-results"

const TOTAL_STEPS = 5

export function StyleQuiz() {
  const router = useRouter()
  const { setProfile } = useStyleProfile()
  const [step, setStep] = useState(0)
  const [showResults, setShowResults] = useState(false)

  const [palettes, setPalettes] = useState<PaletteOption[]>([])
  const [styles, setStyles] = useState<StyleOption[]>([])
  const [subjects, setSubjects] = useState<SubjectOption[]>([])
  const [mood, setMood] = useState<MoodOption | null>(null)
  const [room, setRoom] = useState<RoomOption | null>(null)

  const canProceed = () => {
    switch (step) {
      case 0: return palettes.length >= 1
      case 1: return styles.length >= 1
      case 2: return subjects.length >= 1
      case 3: return mood !== null
      case 4: return room !== null
      default: return false
    }
  }

  const handleNext = () => {
    if (step < TOTAL_STEPS - 1) {
      setStep(step + 1)
    } else {
      const profile: StyleProfile = { palettes, styles, subjects, mood, room }
      setProfile(profile)
      setShowResults(true)
    }
  }

  const handleBack = () => {
    if (step > 0) setStep(step - 1)
  }

  if (showResults) {
    return (
      <QuizResults
        profile={{ palettes, styles, subjects, mood, room }}
        onCreateArt={() => router.push("/create")}
        onBrowseGallery={() => router.push("/gallery")}
      />
    )
  }

  const stepLabels = ["Color Palette", "Art Style", "Subject Matter", "Mood", "Room"]

  return (
    <div className="mx-auto flex min-h-[calc(100vh-73px)] max-w-5xl flex-col px-6 py-12">
      {/* Progress */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-sm font-medium text-foreground">{stepLabels[step]}</p>
      </div>
      <div className="mb-10 h-1 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full bg-foreground"
          initial={false}
          animate={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </div>

      {/* Step Content */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            {step === 0 && (
              <PaletteStep
                selected={palettes}
                onSelect={setPalettes}
                maxSelections={2}
              />
            )}
            {step === 1 && (
              <StyleStep
                selected={styles}
                onSelect={setStyles}
                maxSelections={2}
              />
            )}
            {step === 2 && (
              <SubjectStep
                selected={subjects}
                onSelect={setSubjects}
                maxSelections={3}
              />
            )}
            {step === 3 && (
              <MoodStep selected={mood} onSelect={setMood} />
            )}
            {step === 4 && (
              <RoomStep selected={room} onSelect={setRoom} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
        <button
          onClick={handleBack}
          disabled={step === 0}
          className="text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className="rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {step === TOTAL_STEPS - 1 ? "See Results" : "Continue"}
        </button>
      </div>
    </div>
  )
}
