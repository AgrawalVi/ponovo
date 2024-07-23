import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative z-50 flex h-20 w-full items-center justify-between border-t border-border bg-background/50 px-5 text-muted-foreground backdrop-blur-lg backdrop-saturate-150">
      <Link
        href="https://zealous-tie-73d.notion.site/27faa9398cf64060a1b11f8fee865a07"
        target="_blank"
        rel="noreferrer noopener"
        className="transition-all hover:text-primary"
      >
        Roadmap
      </Link>
      <div className="flex items-center space-x-2">
        <div>
          © 2024{' '}
          <Link
            href="https://vishrut.tech"
            target="_blank"
            rel="noreferrer noopener"
            className="transition-all hover:text-primary"
          >
            Vishrut Agrawal
          </Link>
        </div>
        <Link
          href="https://github.com/AgrawalVi/ponovo"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Button variant="ghost" size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
            </svg>
          </Button>
        </Link>
      </div>
    </footer>
  )
}
