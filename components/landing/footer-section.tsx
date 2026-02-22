import Link from "next/link"

export function FooterSection() {
  return (
    <footer className="border-t border-border bg-gradient-to-b from-background to-card/30 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block font-serif text-2xl tracking-tight text-foreground hover:text-accent transition-colors">
              Muse
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Transform your imagination into stunning wall art powered by artificial intelligence.
            </p>
            <p className="mt-6 text-xs text-muted-foreground uppercase tracking-[0.1em]">
              Made with ✨ for artists
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
              Explore
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/discover" className="text-sm text-foreground/70 hover:text-accent transition-colors">
                  Discover Your Style
                </Link>
              </li>
              <li>
                <Link href="/create" className="text-sm text-foreground/70 hover:text-accent transition-colors">
                  Create Art
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-sm text-foreground/70 hover:text-accent transition-colors">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
              Support
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <span className="text-sm text-foreground/70 cursor-default">Shipping & Returns</span>
              </li>
              <li>
                <span className="text-sm text-foreground/70 cursor-default">Quality Promise</span>
              </li>
              <li>
                <span className="text-sm text-foreground/70 cursor-default">Contact Us</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Muse. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
