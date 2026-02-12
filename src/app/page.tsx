import Link from "next/link";
import Image from "next/image";
import FeaturedEvents from "@/components/sections/FeaturedEvents";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bmore Families | AI-Curated Baltimore Family Events Every Week",
  description:
    "Stop scrolling 20 websites. Get the best family events in Baltimore delivered Thursday. 112+ sources, 5 counties, 5 parent personas. Free forever.",
  keywords: [
    "Baltimore family events",
    "things to do with kids Baltimore",
    "Baltimore weekend activities",
    "family friendly Baltimore",
    "Baltimore events this weekend",
  ],
  openGraph: {
    title: "Bmore Families | Your Weekend, Sorted",
    description:
      "AI-curated family events from 112+ sources across 5 Baltimore counties. Free weekly newsletter.",
    type: "website",
    locale: "en_US",
    siteName: "Bmore Families",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bmore Families | Your Weekend, Sorted",
    description:
      "Stop scrolling 20 websites. Get the best family events in Baltimore delivered every Thursday.",
  },
};

export default function Home() {
  return (
    <div>
      {/* Hero Section with Wave Pattern */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        {/* Background gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 70% 20%, rgba(0, 119, 182, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 30% 80%, rgba(232, 93, 4, 0.05) 0%, transparent 40%),
              linear-gradient(180deg, rgba(0, 119, 182, 0.05) 0%, var(--color-rowhouse) 100%)
            `
          }}
        />

        {/* Wave pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "url('/brand/patterns/wave-hero.svg')",
            backgroundSize: "800px",
            backgroundPosition: "center top"
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Wordmark intro */}
          <p className="text-[var(--color-charm)] font-medium mb-4 tracking-wide uppercase text-sm">
            Baltimore&apos;s AI-Powered Family Event Guide
          </p>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--color-boh)] mb-6 tracking-tight">
            Your Weekend, <span className="text-[var(--color-crab)]">Sorted.</span>
          </h1>

          <p className="font-body text-lg sm:text-xl text-[var(--color-harbor)] max-w-2xl mx-auto mb-10 leading-relaxed">
            112+ sources. 5 counties. 5 parent personas picking the gems.
            <br className="hidden sm:block" />
            The best family events, delivered every Thursday morning.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/subscribe"
              className="btn btn-primary text-lg px-8 py-4"
            >
              Subscribe Free
            </Link>
            <Link
              href="/calendar"
              className="btn btn-secondary text-lg px-8 py-4"
            >
              Browse Calendar
            </Link>
          </div>

          {/* Trust indicator */}
          <p className="mt-8 text-sm text-[var(--muted)]">
            🦀 Free forever • Unsubscribe anytime • Made in Baltimore
          </p>
        </div>

        {/* Wave divider at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-8 overflow-hidden">
          <Image
            src="/brand/dividers/wave-divider.svg"
            alt=""
            fill
            className="object-cover"
            aria-hidden="true"
          />
        </div>
      </section>

      {/* Featured Events - Real data from Supabase */}
      <FeaturedEvents />

      {/* How It Works - Branded */}
      <section className="relative py-20 bg-[var(--color-formstone)]">
        {/* Subtle crosshatch pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "url('/brand/patterns/maryland-crosshatch.svg')",
            backgroundSize: "100px"
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-boh)] mb-4 text-center">
            How It Works
          </h2>
          <p className="text-center text-[var(--color-harbor)] mb-12 max-w-xl mx-auto">
            Think of it like five different parents scouring the harbor for your perfect weekend.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--color-charm)] rounded-2xl flex items-center justify-center text-white font-display font-bold text-2xl mx-auto mb-5 shadow-charm">
                1
              </div>
              <h3 className="font-display text-xl font-semibold text-[var(--color-boh)] mb-3">
                We Gather
              </h3>
              <p className="text-[var(--color-harbor)] leading-relaxed">
                Every week, we scan 112+ sources across 5 counties to catch every family event worth knowing about.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--color-crab)] rounded-2xl flex items-center justify-center text-white font-display font-bold text-2xl mx-auto mb-5 shadow-crab">
                2
              </div>
              <h3 className="font-display text-xl font-semibold text-[var(--color-boh)] mb-3">
                5 Parents Pick
              </h3>
              <p className="text-[var(--color-harbor)] leading-relaxed">
                Five AI parent personas evaluate every event — asking the questions real parents ask.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--color-calvert)] rounded-2xl flex items-center justify-center text-[var(--color-boh)] font-display font-bold text-2xl mx-auto mb-5">
                3
              </div>
              <h3 className="font-display text-xl font-semibold text-[var(--color-boh)] mb-3">
                You Explore
              </h3>
              <p className="text-[var(--color-harbor)] leading-relaxed">
                Thursday morning, the best 5-7 events land in your inbox. Open, pick one, go.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Agent Personas Teaser */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-boh)] mb-4 text-center">
            Meet Your Weekend Crew
          </h2>
          <p className="text-center text-[var(--color-harbor)] mb-12 max-w-xl mx-auto">
            Five parent personas, each with a different take on what makes a great family outing.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {/* Weekend Warrior */}
            <div className="text-center p-4 rounded-xl bg-[var(--color-crab)]/5 border border-[var(--color-crab)]/20">
              <div className="text-3xl mb-2">🏃</div>
              <h4 className="font-semibold text-[var(--color-crab)] text-sm">Weekend Warrior</h4>
              <p className="text-xs text-[var(--muted)] mt-1">Active adventures</p>
            </div>

            {/* Budget-Conscious */}
            <div className="text-center p-4 rounded-xl bg-[var(--color-agent-budget)]/5 border border-[var(--color-agent-budget)]/20">
              <div className="text-3xl mb-2">💰</div>
              <h4 className="font-semibold text-[var(--color-agent-budget)] text-sm">Budget Pro</h4>
              <p className="text-xs text-[var(--muted)] mt-1">Free & affordable</p>
            </div>

            {/* Toddler Wrangler */}
            <div className="text-center p-4 rounded-xl bg-[var(--color-agent-toddler)]/5 border border-[var(--color-agent-toddler)]/20">
              <div className="text-3xl mb-2">👶</div>
              <h4 className="font-semibold text-[var(--color-agent-toddler)] text-sm">Toddler Expert</h4>
              <p className="text-xs text-[var(--muted)] mt-1">Little ones</p>
            </div>

            {/* Tween Entertainer */}
            <div className="text-center p-4 rounded-xl bg-[var(--color-agent-tween)]/5 border border-[var(--color-agent-tween)]/20">
              <div className="text-3xl mb-2">🎮</div>
              <h4 className="font-semibold text-[var(--color-agent-tween)] text-sm">Tween Finder</h4>
              <p className="text-xs text-[var(--muted)] mt-1">Older kids</p>
            </div>

            {/* Plan-Ahead */}
            <div className="text-center p-4 rounded-xl bg-[var(--color-agent-planner)]/5 border border-[var(--color-agent-planner)]/20 col-span-2 sm:col-span-1">
              <div className="text-3xl mb-2">📅</div>
              <h4 className="font-semibold text-[var(--color-agent-planner)] text-sm">Planner</h4>
              <p className="text-xs text-[var(--muted)] mt-1">Coming soon</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/about"
              className="text-[var(--color-charm)] font-medium hover:text-[var(--color-crab)] transition-colors no-underline hover:no-underline"
            >
              Learn how our AI curation works →
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter CTA - Full Brand Treatment */}
      <section className="relative py-20 bg-[var(--color-boh)] text-white overflow-hidden">
        {/* Wave pattern */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "url('/brand/patterns/wave-hero.svg')",
            backgroundSize: "600px"
          }}
        />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Stop Scrolling. Start Exploring.
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Baltimore families are discovering weekend gems every Thursday morning.
            <br />
            Free forever. Unsubscribe anytime. Built by a local dad.
          </p>
          <Link
            href="/subscribe"
            className="inline-flex items-center justify-center px-8 py-4 bg-[var(--color-crab)] text-white font-semibold rounded-xl hover:bg-[var(--color-crab)]/90 transition-all duration-drift text-lg no-underline hover:no-underline shadow-crab hover:shadow-lg"
          >
            Subscribe Free →
          </Link>
        </div>
      </section>
    </div>
  );
}
