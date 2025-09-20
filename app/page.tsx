import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
export const metadata: Metadata = {
  title: 'pairwise.dev — Fair & Fun Pair Programming',
  description:
    'Randomize drivers, rotate roles fairly, and keep mob sessions moving — no setup required.',
};

export default function Home() {
  return (
    <div className="font-sans">
      {/* Nav */}
      <nav className="border-b">
        <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-extrabold">
              {/* <img src="/favicon.ico" alt="pairwise.dev" className="h-6 w-6" /> */}
              <Image src="/favicon.ico" className='h-6 w-6"' alt="pairwise.dev" width={24} height={24} />
              <span>pairwise.dev</span>
          </Link>
          {/* <a href="/" className="flex items-center gap-2 font-extrabold">
            <img src="/favicon.ico" alt="pairwise.dev" className="h-6 w-6" />
            <span>pairwise.dev</span>
          </a> */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-4 text-sm">
              <a href="#features" className="hover:underline">Features</a>
              <a href="#how" className="hover:underline">How it works</a>
              <a
                href="https://github.com/mohammedovich/mob-timer"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                GitHub ↗
              </a>
            </div>
            <a
              href="/app"
              className="rounded-full px-4 py-2 text-sm font-semibold border shadow hover:opacity-90 focus:outline-none"
            >
              Launch App
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header>
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 mb-5 rounded-full border px-3 py-1 text-xs font-semibold">
            <span>New</span>
            <span className="opacity-70">Smart rotation & presets</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-4">
            Fair &amp; Fun Pair Programming
          </h1>

          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Randomly assign drivers, rotate roles fairly, and make mob sessions enjoyable —
            no setup needed. Open, click, and code together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/app"
              className="px-8 py-4 rounded-full font-semibold text-lg transition shadow border hover:opacity-90 focus:outline-none"
              aria-label="Launch pairwise.dev app"
            >
              Launch App →
            </a>
            <a
              href="https://github.com/mohammedovich/mob-timer"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full font-semibold text-lg transition shadow border hover:opacity-90 focus:outline-none"
              aria-label="View source code on GitHub"
            >
              View on GitHub
            </a>
          </div>

          <div className="mt-8 text-sm">
            No login • Works offline • Open source
          </div>
        </div>
      </header>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center mb-12">
            Everything you need to keep momentum
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Feature
              icon={<Badge>🔄</Badge>}
              title="Smart Rotation"
              text="Avoids repeat drivers and cycles through the roster fairly, every time."
            />
            <Feature
              icon={<Badge>⏱️</Badge>}
              title="Preset Timers"
              text="5/10/15/20-minute presets with gentle sounds and optional confetti."
            />
            <Feature
              icon={<Badge>💻</Badge>}
              title="Zero Setup"
              text="Open and go. No accounts, no backend. Your roster can be saved locally."
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <Feature
              icon={<Badge>🎯</Badge>}
              title="Clear Queue"
              text="See who’s driving, who’s next, and how long is left at a glance."
            />
            <Feature
              icon={<Badge>🎚️</Badge>}
              title="On-the-fly Tweaks"
              text="Change the duration mid-session; the next rotation uses the new time."
            />
            <Feature
              icon={<Badge>🔒</Badge>}
              title="Privacy-Friendly"
              text="Everything runs in your browser. No tracking, no data ever leaves."
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center mb-12">
            Start a session in 3 steps
          </h2>

        <ol className="grid md:grid-cols-3 gap-6">
            <Step number="1" title="Select participants" text="Tick who’s joining today from your saved roster." />
            <Step number="2" title="Pick a preset" text="Choose 5/10/15/20 minutes — or adjust anytime." />
            <Step number="3" title="Click Start" text="We randomize the order, start the clock, and auto-rotate." />
          </ol>

          <div className="text-center mt-10">
            <a
              href="/app"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold shadow border transition hover:opacity-90 focus:outline-none"
            >
              Try it now →
            </a>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <figure className="rounded-2xl border p-6 md:p-8 shadow-sm">
            <blockquote className="text-lg md:text-xl">
              “We shaved minutes off every rotation and kept the energy high.
              The team actually <em>asks</em> to use it now.”
            </blockquote>
            <figcaption className="mt-4 text-sm opacity-80">
              — Senior Engineer, Fintech team of 8
            </figcaption>
          </figure>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-4">Ready to rotate roles?</h2>
          <p className="mb-6">
            Join teams around the world making pairing inclusive and effective.
          </p>
          <a
            href="/app"
            className="inline-block px-8 py-3 rounded-full font-semibold shadow border transition hover:opacity-90 focus:outline-none"
          >
            Start Your First Session
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-6 mb-8 text-center text-sm">
        Made with ❤️ for better collaboration •{' '}
        <a
          href="https://buymeacoffee.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:no-underline"
        >
          Support this project
        </a>
      </footer>
    </div>
  );
}

/* ---------- helpers ---------- */

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-12 h-12 rounded-xl grid place-items-center border shadow text-xl">
      {children}
    </div>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border p-6 shadow-sm">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-bold mb-1">{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function Step({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <li className="rounded-2xl border p-6 shadow-sm">
      <div className="w-8 h-8 rounded-full grid place-items-center font-bold mb-3 border">
        {number}
      </div>
      <h3 className="text-lg font-bold mb-1">{title}</h3>
      <p>{text}</p>
    </li>
  );
}
