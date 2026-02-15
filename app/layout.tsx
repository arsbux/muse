import type { Metadata } from "next"
import { DM_Sans, Playfair_Display } from "next/font/google"
import { Toaster } from "sonner"

import "./globals.css"
import { Providers } from "@/components/providers"
import { SiteHeader } from "@/components/site-header"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "Muse — AI-Powered Wall Art",
  description:
    "Create custom wall art with AI. Discover your style, generate unique artwork, and order museum-quality prints delivered to your door.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <Providers>
          <SiteHeader />
          <main>{children}</main>
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  )
}
