import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getNewsletterBySlug, getAllNewsletterSlugs } from "@/lib/newsletters";

// Generate static params for all newsletters
export function generateStaticParams() {
  const slugs = getAllNewsletterSlugs();
  return slugs.map((slug) => ({ slug }));
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
  params: Promise<{ slug: string }>;
}

export default async function NewsletterIssuePage({ params }: PageProps) {
  const { slug } = await params;
  const newsletter = getNewsletterBySlug(slug);

  if (!newsletter) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back link */}
      <Link
        href="/newsletter"
        className="inline-flex items-center text-[var(--primary)] hover:text-[var(--primary)]/80 mb-8 no-underline"
      >
        ← Back to Archive
      </Link>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-dark)] mb-2">
          {newsletter.dateRange || newsletter.title}
        </h1>
        <p className="text-[var(--muted)]">
          Published {formatDate(newsletter.generated)}
        </p>
      </header>

      {/* Newsletter content */}
      <article className="prose prose-lg max-w-none prose-headings:text-[var(--text-dark)] prose-p:text-[var(--text)] prose-a:text-[var(--primary)] prose-strong:text-[var(--text-dark)] prose-li:text-[var(--text)]">
        <ReactMarkdown
          components={{
            // Custom rendering for links to open in new tab
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary)] hover:underline"
              >
                {children}
              </a>
            ),
            // Style headings
            h1: ({ children }) => (
              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-dark)] mt-8 mb-4">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-dark)] mt-8 mb-4 border-b border-[var(--muted)]/20 pb-2">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg font-semibold text-[var(--text-dark)] mt-6 mb-2">
                {children}
              </h3>
            ),
            // Style paragraphs
            p: ({ children }) => (
              <p className="text-[var(--text)] mb-4 leading-relaxed">
                {children}
              </p>
            ),
            // Style lists
            ul: ({ children }) => (
              <ul className="list-disc list-inside mb-4 space-y-2 text-[var(--text)]">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside mb-4 space-y-2 text-[var(--text)]">
                {children}
              </ol>
            ),
            // Style blockquotes
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-[var(--primary)] pl-4 italic text-[var(--text)] my-4">
                {children}
              </blockquote>
            ),
            // Style horizontal rules
            hr: () => <hr className="my-8 border-[var(--muted)]/30" />,
            // Style strong text
            strong: ({ children }) => (
              <strong className="font-semibold text-[var(--text-dark)]">
                {children}
              </strong>
            ),
            // Style code blocks (often contain agent reasoning)
            code: ({ children, className }) => {
              const isInline = !className;
              if (isInline) {
                return (
                  <code className="bg-[var(--card)] px-1.5 py-0.5 rounded text-sm font-mono text-[var(--text-dark)]">
                    {children}
                  </code>
                );
              }
              return (
                <code className={`block bg-[var(--card)] p-4 rounded-lg text-sm font-mono overflow-x-auto ${className}`}>
                  {children}
                </code>
              );
            },
            // Style pre blocks
            pre: ({ children }) => (
              <pre className="bg-[var(--card)] p-4 rounded-lg overflow-x-auto my-4 text-sm">
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
              <thead className="bg-[var(--primary)]/10">
                {children}
              </thead>
            ),
            th: ({ children }) => (
              <th className="px-4 py-2 text-left text-sm font-semibold text-[var(--text-dark)] border-b border-[var(--muted)]/30">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="px-4 py-2 text-sm text-[var(--text)] border-b border-[var(--muted)]/20">
                {children}
              </td>
            ),
          }}
        >
          {newsletter.content}
        </ReactMarkdown>
      </article>

      {/* CTA */}
      <div className="mt-12 p-8 bg-[var(--card)] rounded-xl text-center">
        <h2 className="text-xl font-bold text-[var(--text-dark)] mb-2">
          Enjoy this newsletter?
        </h2>
        <p className="text-[var(--text)] mb-4">
          Get the best family events delivered to your inbox every week.
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
