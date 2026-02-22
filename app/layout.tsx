import type { Metadata } from "next"
import { DM_Sans, Crimson_Pro } from "next/font/google"
import { Toaster } from "sonner"

import "./globals.css"
import { Providers } from "@/components/providers"
import { SiteHeader } from "@/components/site-header"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "600", "700"],
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
    <html lang="en" className={`${dmSans.variable} ${crimsonPro.variable}`}>
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
