export default function NewsletterPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-dark)] mb-4">
        Newsletter Archive
      </h1>
      <p className="text-[var(--text)] mb-8">
        Browse past issues of our weekly family events digest.
      </p>

      {/* Placeholder for newsletter list */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="bg-[var(--card)] rounded-xl p-6 animate-pulse"
          >
            <div className="h-5 bg-[var(--muted)]/30 rounded w-2/3 mb-3"></div>
            <div className="h-3 bg-[var(--muted)]/20 rounded w-1/3"></div>
          </div>
        ))}
      </div>

      <p className="text-center text-[var(--muted)] mt-8">
        Coming soon: Real newsletter archive from markdown files
      </p>
    </div>
  );
}
