import Link from "next/link"

export function FooterSection() {
  return (
    <footer className="border-t border-border bg-card py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-12 md:flex-row">
          <div>
            <Link href="/" className="font-serif text-2xl tracking-tight text-foreground">
              Muse
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              AI-powered wall art. Imagine it, create it, own it.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                Explore
              </p>
              <ul className="flex flex-col gap-3">
                <li>
                  <Link href="/discover" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                    Style Quiz
                  </Link>
                </li>
                <li>
                  <Link href="/create" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                    Create Art
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                    Gallery
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                About
              </p>
              <ul className="flex flex-col gap-3">
                <li>
                  <span className="text-sm text-foreground/70">Shipping & Returns</span>
                </li>
                <li>
                  <span className="text-sm text-foreground/70">Quality Promise</span>
                </li>
                <li>
                  <span className="text-sm text-foreground/70">Contact</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Muse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
