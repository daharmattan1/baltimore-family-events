export default function SubscribePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-dark)] mb-4">
          Subscribe to Baltimore Family Events
        </h1>
        <p className="text-lg text-[var(--text)] mb-8">
          Get the best family-friendly events delivered to your inbox every Thursday.
        </p>
      </div>

      {/* What You Get */}
      <div className="bg-[var(--card)] rounded-xl p-8 mb-8">
        <h2 className="text-xl font-bold text-[var(--text-dark)] mb-4">
          What You&apos;ll Get
        </h2>
        <ul className="space-y-3 text-[var(--text)]">
          <li className="flex items-start gap-3">
            <span className="text-[var(--accent)]">✓</span>
            <span>Weekly digest of the best family events (every Thursday)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[var(--accent)]">✓</span>
            <span>AI-curated picks from 112+ sources</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[var(--accent)]">✓</span>
            <span>Coverage across 5 Baltimore-area counties</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[var(--accent)]">✓</span>
            <span>Free events highlighted</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[var(--accent)]">✓</span>
            <span>No spam, ever. Unsubscribe anytime.</span>
          </li>
        </ul>
      </div>

      {/* Beehiiv Embed Placeholder */}
      <div className="bg-white border-2 border-dashed border-[var(--muted)] rounded-xl p-8 text-center">
        <p className="text-[var(--muted)] mb-4">
          Beehiiv signup form will be embedded here
        </p>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="your@email.com"
            disabled
            className="w-full px-4 py-3 border border-[var(--muted)]/30 rounded-lg bg-[var(--bg)]"
          />
          <button
            disabled
            className="w-full px-6 py-3 bg-[var(--accent)] text-white font-semibold rounded-lg opacity-50 cursor-not-allowed"
          >
            Subscribe (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  );
}
