import Link from "next/link";
import { getAllNewsletters } from "@/lib/newsletters";

// Format date for display
function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Extract a preview snippet from newsletter content
function getPreviewSnippet(content: string): string {
  // Remove markdown formatting and get first ~150 chars
  const cleaned = content
    .replace(/^#.*$/gm, "") // Remove headings
    .replace(/\*\*/g, "") // Remove bold
    .replace(/\*/g, "") // Remove italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Convert links to text
    .replace(/---/g, "") // Remove hr
    .replace(/\n+/g, " ") // Convert newlines to spaces
    .trim();

  return cleaned.slice(0, 150) + (cleaned.length > 150 ? "..." : "");
}

export default function NewsletterPage() {
  const newsletters = getAllNewsletters();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-dark)] mb-4">
        Newsletter Archive
      </h1>
      <p className="text-[var(--text)] mb-8">
        Browse past issues of our weekly family events digest.
      </p>

      {newsletters.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-[var(--text)] mb-4">
            No newsletters published yet. Subscribe to be notified when the first issue drops!
          </p>
          <Link
            href="/subscribe"
            className="inline-flex items-center justify-center px-6 py-3 bg-[var(--accent)] text-white font-semibold rounded-lg hover:bg-[var(--accent)]/90 transition-colors no-underline hover:no-underline"
          >
            Subscribe Free
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {newsletters.map((newsletter) => (
            <Link
              key={newsletter.slug}
              href={`/newsletter/${newsletter.slug}`}
              className="block bg-white border border-[var(--muted)]/20 rounded-xl p-6 hover:shadow-lg transition-shadow no-underline"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h2 className="text-lg font-semibold text-[var(--text-dark)] mb-1">
                    {newsletter.dateRange || newsletter.title}
                  </h2>
                  <p className="text-sm text-[var(--muted)]">
                    Published {formatDate(newsletter.generated)}
                  </p>
                </div>
                <span className="text-[var(--primary)] font-medium shrink-0">
                  Read →
                </span>
              </div>
              {/* Preview snippet */}
              <p className="text-sm text-[var(--text)] line-clamp-2">
                {getPreviewSnippet(newsletter.content)}
              </p>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-12 text-center">
        <p className="text-[var(--text)] mb-4">
          Get the latest family events delivered to your inbox every week.
        </p>
        <Link
          href="/subscribe"
          className="inline-flex items-center justify-center px-6 py-3 bg-[var(--accent)] text-white font-semibold rounded-lg hover:bg-[var(--accent)]/90 transition-colors no-underline hover:no-underline"
        >
          Subscribe Free →
        </Link>
      </div>
    </div>
  );
}
