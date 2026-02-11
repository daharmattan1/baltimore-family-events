export default function SubscribePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-dark)] mb-4">
          Subscribe to Baltimore Family Events
        </h1>
        <p className="text-lg text-[var(--text)] mb-8">
          Get the best family-friendly events delivered to your inbox every Thursday.
          AI-curated from 112+ sources. Always free. Unsubscribe anytime.
        </p>
      </div>

      {/* Beehiiv Embed - Replace the div below with actual Beehiiv embed code */}
      <div className="mb-8">
        {/*
          TODO: Replace this placeholder with Beehiiv embed code
          Get your embed code from: Beehiiv Dashboard > Grow > Subscribe Form
          It will look something like:
          <iframe src="https://embeds.beehiiv.com/..." ... />
        */}
        <div className="bg-white border border-[var(--muted)]/20 rounded-xl p-8 shadow-sm">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-[var(--text-dark)] mb-2">
              Join the Newsletter
            </h2>
            <p className="text-[var(--text)]">
              Enter your email to get the weekly family events digest.
            </p>
          </div>

          {/* Placeholder form - will be replaced by Beehiiv */}
          <form
            action="https://baltimorefamilyevents.beehiiv.com/subscribe"
            method="POST"
            className="space-y-4"
          >
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              className="w-full px-4 py-3 border border-[var(--muted)]/30 rounded-lg bg-[var(--bg)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent text-[var(--text-dark)]"
            />
            <button
              type="submit"
              className="w-full px-6 py-3 bg-[var(--accent)] text-white font-semibold rounded-lg hover:bg-[var(--accent)]/90 transition-colors"
            >
              Subscribe Free →
            </button>
          </form>

          <p className="text-xs text-[var(--muted)] text-center mt-4">
            No spam. Unsubscribe at any time.
          </p>
        </div>
      </div>

      {/* What You Get */}
      <div className="bg-[var(--card)] rounded-xl p-8">
        <h2 className="text-xl font-bold text-[var(--text-dark)] mb-4">
          What You&apos;ll Get Every Week
        </h2>
        <ul className="space-y-3 text-[var(--text)]">
          <li className="flex items-start gap-3">
            <span className="text-[var(--accent)] font-bold">✓</span>
            <span><strong>Top Pick of the Week</strong> — The one event worth planning around</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[var(--accent)] font-bold">✓</span>
            <span><strong>Quick Weekend Wins</strong> — Show up, no tickets needed</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[var(--accent)] font-bold">✓</span>
            <span><strong>Budget-Friendly Finds</strong> — Free and low-cost highlights</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[var(--accent)] font-bold">✓</span>
            <span><strong>Age-Specific Picks</strong> — Toddler and tween sections</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[var(--accent)] font-bold">✓</span>
            <span><strong>Book-Ahead Alerts</strong> — Sell-out events flagged early</span>
          </li>
        </ul>
      </div>

      {/* Trust indicators */}
      <div className="mt-8 text-center">
        <p className="text-[var(--muted)] text-sm">
          Join Baltimore families discovering great events every week. Built by a local dad.
        </p>
      </div>
    </div>
  );
}
