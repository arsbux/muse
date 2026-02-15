"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/contexts"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { href: "/create", label: "Create" },
  { href: "/cart", label: "Cart" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const { itemCount } = useCart()

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-serif text-2xl tracking-tight text-foreground">
          AI Art Generator
        </Link>

        <div className="flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm tracking-wide transition-colors hover:text-foreground flex items-center gap-2",
                pathname === link.href ? "text-foreground font-medium" : "text-muted-foreground"
              )}
            >
              {link.label}
              {link.href === "/cart" && itemCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-accent-foreground">
                  {itemCount}
                </span>
              )}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
