import Link from "next/link";
import Image from "next/image";
import { getAllNewsletters } from "@/lib/newsletters";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter Archive | Bmore Families",
  description:
    "Browse past issues of the Bmore Families weekly newsletter. AI-curated family events across 5 Baltimore counties.",
};

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
    <div>
      {/* Hero Section with Wave */}
      <section className="relative py-12 sm:py-16 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 50% 30%, rgba(0, 119, 182, 0.06) 0%, transparent 50%),
              linear-gradient(180deg, rgba(0, 119, 182, 0.03) 0%, var(--color-rowhouse) 100%)
            `
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "url('/brand/patterns/wave-hero.svg')",
            backgroundSize: "600px"
          }}
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[var(--color-charm)] font-medium mb-2 tracking-wide uppercase text-sm">
            Past Issues
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-boh)] mb-3">
            Newsletter Archive
          </h1>
          <p className="text-[var(--color-harbor)] max-w-2xl">
            Catch up on past issues of our weekly family events digest.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-4 overflow-hidden">
          <Image
            src="/brand/dividers/wave-divider.svg"
            alt=""
            fill
            className="object-cover"
            aria-hidden="true"
          />
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {newsletters.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🦀</div>
            <p className="text-[var(--color-harbor)] mb-4">
              No newsletters published yet. Subscribe to catch the first issue!
            </p>
            <Link
              href="/subscribe"
              className="btn btn-primary"
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
                    <h2 className="text-lg font-display font-semibold text-[var(--color-boh)] mb-1">
                      {newsletter.dateRange || newsletter.title}
                    </h2>
                    <p className="text-sm text-[var(--muted)]">
                      Published {formatDate(newsletter.generated)}
                    </p>
                  </div>
                  <span className="text-[var(--color-charm)] font-medium shrink-0">
                    Read →
                  </span>
                </div>
                <p className="text-sm text-[var(--color-harbor)] line-clamp-2">
                  {getPreviewSnippet(newsletter.content)}
                </p>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-[var(--color-harbor)] mb-4">
            Get the latest family events delivered to your inbox every Thursday.
          </p>
          <Link
            href="/subscribe"
            className="inline-flex items-center justify-center px-6 py-3 bg-[var(--color-crab)] text-white font-semibold rounded-xl hover:bg-[var(--color-crab)]/90 transition-all no-underline hover:no-underline shadow-crab"
          >
            Subscribe Free →
          </Link>
        </div>
      </div>
    </div>
  );
}
