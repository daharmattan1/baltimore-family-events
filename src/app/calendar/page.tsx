export default function CalendarPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-dark)] mb-4">
        Event Calendar
      </h1>
      <p className="text-[var(--text)] mb-8">
        Browse family-friendly events across Baltimore and surrounding counties.
      </p>

      {/* Placeholder for filters */}
      <div className="bg-[var(--card)] rounded-xl p-6 mb-8">
        <p className="text-[var(--muted)]">
          Filters coming soon: Date range, Category, Age group, Cost
        </p>
      </div>

      {/* Placeholder for events */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white border border-[var(--muted)]/20 rounded-xl p-6 animate-pulse"
          >
            <div className="h-4 bg-[var(--muted)]/30 rounded w-3/4 mb-4"></div>
            <div className="h-3 bg-[var(--muted)]/20 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-[var(--muted)]/20 rounded w-2/3 mb-2"></div>
            <div className="h-3 bg-[var(--muted)]/20 rounded w-1/3"></div>
          </div>
        ))}
      </div>

      <p className="text-center text-[var(--muted)] mt-8">
        Coming soon: Real events from Supabase with filtering
      </p>
    </div>
  );
}
