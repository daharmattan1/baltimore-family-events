import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getNewsletterBySlug, getAllNewsletterSlugs } from "@/lib/newsletters";
import type { Metadata } from "next";

// Generate static params for all newsletters
// Catch-all routes need slug as string[]
export function generateStaticParams() {
  const slugs = getAllNewsletterSlugs();
  return slugs.map((slug) => ({ slug: slug.split("/") }));
}

// Dynamic metadata for each newsletter issue
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const fullSlug = slug.join("/");
  const newsletter = getNewsletterBySlug(fullSlug);
  if (!newsletter) return { title: "Newsletter" };

  return {
    title: `${newsletter.title} | BmoreFamilies`,
    description: `Baltimore family events for ${newsletter.dateRange || "this weekend"}. AI-curated picks from 112+ sources across 5 counties.`,
    openGraph: {
      title: newsletter.title,
      description: `Baltimore family events for ${newsletter.dateRange || "this weekend"}. Curated from 112+ sources.`,
    },
  };
}

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function NewsletterIssuePage({ params }: PageProps) {
  const { slug } = await params;
  const fullSlug = slug.join("/");
  const newsletter = getNewsletterBySlug(fullSlug);

  if (!newsletter) {
    notFound();
  }

  // Clean up the markdown content for web display
  const cleanedContent = newsletter.content
    // Remove redundant H1 title + bold date line (shown in page header)
    .replace(/^\s*#\s+[^\n]+\n/, "")
    .replace(/^\s*\*\*[^\n]*\d{4}\*\*\n?/, "")
    // Remove <details> agent reasoning section (internal, not for readers)
    .replace(/<details>[\s\S]*?<\/details>/g, "")
    // Remove horizontal rules (--- separators) — section headers are enough
    .replace(/^---\s*$/gm, "")
    // Remove trailing sign-off (redundant with CTA section below)
    .replace(/Got a family event to share\?[\s\S]*$/, "")
    .trimStart()
    .trimEnd();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back link */}
      <Link
        href="/newsletter"
        className="inline-flex items-center text-[var(--color-charm)] hover:text-[var(--color-crab)] mb-8 no-underline transition-colors"
      >
        ← Back to Archive
      </Link>

      {/* Header */}
      <header className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-boh)] mb-2">
          {newsletter.title}
        </h1>
        {newsletter.dateRange && (
          <p className="text-lg text-[var(--color-harbor)] mb-1">
            {newsletter.dateRange}
          </p>
        )}
      </header>

      {/* Calendar link */}
      <div className="mb-8 flex items-center gap-3 px-4 py-3 bg-[var(--color-charm)]/5 rounded-lg border border-[var(--color-charm)]/10">
        <span className="text-lg" aria-hidden="true">📅</span>
        <p className="text-sm text-[var(--color-harbor)]">
          Want the full list?{" "}
          <Link
            href="/calendar"
            className="text-[var(--color-charm)] font-medium hover:underline no-underline"
          >
            Browse all events on the calendar →
          </Link>
        </p>
      </div>

      {/* Newsletter content */}
      <article className="prose prose-lg max-w-none prose-headings:text-[var(--color-boh)] prose-p:text-[var(--color-harbor)] prose-a:text-[var(--color-charm)] prose-strong:text-[var(--color-boh)] prose-li:text-[var(--color-harbor)]">
        <ReactMarkdown
          components={{
            // Custom rendering for links to open in new tab
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-charm)] hover:underline"
              >
                {children}
              </a>
            ),
            // Style headings
            h1: ({ children }) => (
              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-boh)] mt-10 mb-4">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-boh)] mt-10 mb-4">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg font-semibold text-[var(--color-boh)] mt-8 mb-3">
                {children}
              </h3>
            ),
            // Style paragraphs
            p: ({ children }) => (
              <p className="text-[var(--color-harbor)] mb-4 leading-relaxed">
                {children}
              </p>
            ),
            // Style lists — generous spacing for multi-line event items
            ul: ({ children }) => (
              <ul className="list-disc pl-5 mb-6 space-y-4 text-[var(--color-harbor)]">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal pl-5 mb-6 space-y-4 text-[var(--color-harbor)]">
                {children}
              </ol>
            ),
            // List items need breathing room for event descriptions
            li: ({ children }) => (
              <li className="text-[var(--color-harbor)] leading-relaxed pl-1">
                {children}
              </li>
            ),
            // Style blockquotes
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-[var(--color-charm)] pl-4 italic text-[var(--color-harbor)] my-4">
                {children}
              </blockquote>
            ),
            // Hide horizontal rules — section headers provide enough separation
            hr: () => <></>,
            // Style strong text
            strong: ({ children }) => (
              <strong className="font-semibold text-[var(--color-boh)]">
                {children}
              </strong>
            ),
            // Style code blocks (often contain agent reasoning)
            code: ({ children, className }) => {
              const isInline = !className;
              if (isInline) {
                return (
                  <code className="bg-[var(--color-formstone)] px-1.5 py-0.5 rounded text-sm font-mono text-[var(--color-boh)]">
                    {children}
                  </code>
                );
              }
              return (
                <code className={`block bg-[var(--color-formstone)] p-4 rounded-lg text-sm font-mono overflow-x-auto ${className}`}>
                  {children}
                </code>
              );
            },
            // Style pre blocks
            pre: ({ children }) => (
              <pre className="bg-[var(--color-formstone)] p-4 rounded-lg overflow-x-auto my-4 text-sm">
                {children}
              </pre>
            ),
            // Style tables for agent reasoning traces
            table: ({ children }) => (
              <div className="overflow-x-auto my-4">
                <table className="min-w-full border border-[var(--muted)]/30 rounded-lg overflow-hidden">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="bg-[var(--color-charm)]/10">
                {children}
              </thead>
            ),
            th: ({ children }) => (
              <th className="px-4 py-2 text-left text-sm font-semibold text-[var(--color-boh)] border-b border-[var(--muted)]/30">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="px-4 py-2 text-sm text-[var(--color-harbor)] border-b border-[var(--muted)]/20">
                {children}
              </td>
            ),
          }}
        >
          {cleanedContent}
        </ReactMarkdown>
      </article>

      {/* Share + Forward */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center py-6 border-t border-[var(--muted)]/20">
        <p className="text-sm text-[var(--color-harbor)]">Know a Baltimore parent who&apos;d love this?</p>
        <a
          href={`mailto:?subject=${encodeURIComponent(`Check out BmoreFamilies: ${newsletter.title}`)}&body=${encodeURIComponent(`I thought you'd like this weekly Baltimore family events newsletter:\n\nhttps://bmorefamilies.com/newsletter/${fullSlug}`)}`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-formstone)] text-[var(--color-boh)] rounded-lg hover:bg-[var(--color-charm)]/10 transition-colors text-sm font-medium no-underline"
        >
          Forward to a Friend →
        </a>
      </div>

      {/* CTA */}
      <div className="mt-4 p-8 bg-[var(--color-formstone)] rounded-xl text-center">
        <h2 className="font-display text-xl font-bold text-[var(--color-boh)] mb-2">
          Enjoy this issue? 🦀
        </h2>
        <p className="text-[var(--color-harbor)] mb-4">
          Get the best family events delivered every Thursday morning.
        </p>
        <Link
          href="/subscribe"
          className="inline-flex items-center justify-center px-6 py-3 bg-[var(--color-crab)] text-white font-semibold rounded-xl hover:bg-[var(--color-crab)]/90 transition-all no-underline hover:no-underline shadow-crab"
        >
          Subscribe Free →
        </Link>
      </div>
    </div>
  );
}
