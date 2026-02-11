import Link from "next/link";
import FeaturedEvents from "@/components/sections/FeaturedEvents";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[var(--primary)]/5 to-[var(--bg)] py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-dark)] mb-6">
            Find the Best Family Events in Baltimore
          </h1>
          <p className="text-lg sm:text-xl text-[var(--text)] max-w-2xl mx-auto mb-8">
            AI-curated from 112+ sources across 5 counties.
            Get a personalized weekly digest of the events your family will actually love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/subscribe"
              className="inline-flex items-center justify-center px-6 py-3 bg-[var(--accent)] text-white font-semibold rounded-lg hover:bg-[var(--accent)]/90 transition-colors no-underline hover:no-underline"
            >
              Subscribe Free
            </Link>
            <Link
              href="/calendar"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-[var(--primary)] text-[var(--primary)] font-semibold rounded-lg hover:bg-[var(--primary)] hover:text-white transition-colors no-underline hover:no-underline"
            >
              Browse Calendar
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Events - Real data from Supabase */}
      <FeaturedEvents />

      {/* How It Works */}
      <section className="py-16 bg-[var(--card)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-dark)] mb-12 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-dark)] mb-2">
                We Aggregate
              </h3>
              <p className="text-[var(--text)]">
                Our AI scans 112+ sources across 5 counties for family events every week.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-dark)] mb-2">
                5 Agents Curate
              </h3>
              <p className="text-[var(--text)]">
                Five specialized AI personas evaluate each event for family appeal.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-dark)] mb-2">
                You Discover
              </h3>
              <p className="text-[var(--text)]">
                Get a curated digest every Thursday with the best events for your family.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-dark)] mb-4">
            Never Miss a Great Event
          </h2>
          <p className="text-[var(--text)] mb-8">
            Join hundreds of Baltimore families who get our free weekly digest.
            Unsubscribe anytime.
          </p>
          <Link
            href="/subscribe"
            className="inline-flex items-center justify-center px-8 py-4 bg-[var(--accent)] text-white font-semibold rounded-lg hover:bg-[var(--accent)]/90 transition-colors text-lg no-underline hover:no-underline"
          >
            Subscribe Free →
          </Link>
        </div>
      </section>
    </div>
  );
}
