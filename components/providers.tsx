"use client"

import { StyleProfileProvider, GenerationProvider, CartProvider } from "@/lib/contexts"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StyleProfileProvider>
      <GenerationProvider>
        <CartProvider>{children}</CartProvider>
      </GenerationProvider>
    </StyleProfileProvider>
  )
}
