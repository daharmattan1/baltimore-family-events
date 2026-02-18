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

  // Strip redundant H1 title + bold date line from markdown body
  // (these are now shown in the page header from frontmatter)
  const cleanedContent = newsletter.content
    .replace(/^\s*#\s+[^\n]+\n/, "")       // Remove first H1 line
    .replace(/^\s*\*\*[^\n]*\d{4}\*\*\n?/, "") // Remove bold date line
    .trimStart();

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
        <p className="text-[var(--muted)]">
          Published {formatDate(newsletter.generated)}
        </p>
      </header>

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
              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-boh)] mt-8 mb-4">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-boh)] mt-8 mb-4 border-b border-[var(--muted)]/20 pb-2">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg font-semibold text-[var(--color-boh)] mt-6 mb-2">
                {children}
              </h3>
            ),
            // Style paragraphs
            p: ({ children }) => (
              <p className="text-[var(--color-harbor)] mb-4 leading-relaxed">
                {children}
              </p>
            ),
            // Style lists
            ul: ({ children }) => (
              <ul className="list-disc list-inside mb-4 space-y-2 text-[var(--color-harbor)]">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside mb-4 space-y-2 text-[var(--color-harbor)]">
                {children}
              </ol>
            ),
            // Style blockquotes
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-[var(--color-charm)] pl-4 italic text-[var(--color-harbor)] my-4">
                {children}
              </blockquote>
            ),
            // Style horizontal rules
            hr: () => <hr className="my-8 border-[var(--muted)]/30" />,
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
