import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import {
  getTranscriptBySlug,
  getAllTranscriptSlugs,
} from "@/lib/transcripts";
import type { Metadata } from "next";

// Generate static params for all transcripts
export function generateStaticParams() {
  const slugs = getAllTranscriptSlugs();
  return slugs.map((slug) => ({ slug: slug.split("/") }));
}

// Dynamic metadata for each transcript
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const fullSlug = slug.join("/");
  const transcript = getTranscriptBySlug(fullSlug);
  if (!transcript) return { title: "Behind the Scenes" };

  return {
    title: `${transcript.title} — Agent Discussion | BmoreFamilies`,
    description: `Watch 5 AI agents debate Baltimore family events for ${transcript.dateRange || "this weekend"}. ${transcript.rounds} rounds of picks, pushback, and consensus.`,
    openGraph: {
      title: `${transcript.title} — Behind the Scenes`,
      description: `5 AI agents debate Baltimore family events for ${transcript.dateRange || "this weekend"}.`,
    },
  };
}

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function TranscriptDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const fullSlug = slug.join("/");
  const transcript = getTranscriptBySlug(fullSlug);

  if (!transcript) {
    notFound();
  }

  // Clean up the markdown content for web display
  const cleanedContent = transcript.content
    // Remove the H1 title (shown in page header)
    .replace(/^\s*#\s+Newsletter Agent Discussion Transcript[^\n]*\n/, "")
    // Remove Session Info block (metadata shown in header)
    .replace(/## Session Info[\s\S]*?(?=---\n)/, "")
    // Remove first horizontal rule after session info removal
    .replace(/^---\s*\n/, "")
    .trimStart()
    .trimEnd();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back link */}
      <Link
        href="/behind-the-scenes"
        className="inline-flex items-center text-[var(--color-charm)] hover:text-[var(--color-crab)] mb-8 no-underline transition-colors"
      >
        ← Back to Behind the Scenes
      </Link>

      {/* Header */}
      <header className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-boh)] mb-2">
          {transcript.title}
        </h1>
        {transcript.dateRange && (
          <p className="text-lg text-[var(--color-harbor)] mb-3">
            Events for {transcript.dateRange}
          </p>
        )}

        {/* Agent roster */}
        <div className="flex flex-wrap gap-2 mb-3">
          {transcript.agents.map((agent) => (
            <span
              key={agent.name}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[var(--color-charm)]/10 text-[var(--color-charm)]"
            >
              {agent.name} · {agent.role}
            </span>
          ))}
        </div>

        <p className="text-sm text-[var(--muted)]">
          {transcript.rounds} rounds of debate
        </p>
      </header>

      {/* Cross-link to newsletter */}
      {transcript.newsletterSlug && (
        <div className="mb-8 flex items-center gap-3 px-4 py-3 bg-[var(--color-crab)]/5 rounded-lg border border-[var(--color-crab)]/10">
          <span className="text-lg" aria-hidden="true">📰</span>
          <p className="text-sm text-[var(--color-harbor)]">
            See the final picks:{" "}
            <Link
              href={`/newsletter/${transcript.newsletterSlug}`}
              className="text-[var(--color-crab)] font-medium hover:underline no-underline"
            >
              Read the newsletter issue →
            </Link>
          </p>
        </div>
      )}

      {/* Transcript content */}
      <article className="prose prose-lg max-w-none prose-headings:text-[var(--color-boh)] prose-p:text-[var(--color-harbor)] prose-a:text-[var(--color-charm)] prose-strong:text-[var(--color-boh)] prose-li:text-[var(--color-harbor)]">
        <ReactMarkdown
          components={{
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
            p: ({ children }) => (
              <p className="text-[var(--color-harbor)] mb-4 leading-relaxed">
                {children}
              </p>
            ),
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
            li: ({ children }) => (
              <li className="text-[var(--color-harbor)] leading-relaxed pl-1">
                {children}
              </li>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-[var(--color-charm)] pl-4 italic text-[var(--color-harbor)] my-4">
                {children}
              </blockquote>
            ),
            hr: () => (
              <hr className="my-8 border-t border-[var(--muted)]/30" />
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-[var(--color-boh)]">
                {children}
              </strong>
            ),
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
            pre: ({ children }) => (
              <pre className="bg-[var(--color-formstone)] p-4 rounded-lg overflow-x-auto my-4 text-sm">
                {children}
              </pre>
            ),
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
          href={`mailto:?subject=${encodeURIComponent(`Behind the Scenes: ${transcript.title} — BmoreFamilies`)}&body=${encodeURIComponent(`Check out how AI agents debate family events:\n\nhttps://bmorefamilies.com/behind-the-scenes/${fullSlug}`)}`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-formstone)] text-[var(--color-boh)] rounded-lg hover:bg-[var(--color-charm)]/10 transition-colors text-sm font-medium no-underline"
        >
          Forward to a Friend →
        </a>
      </div>

      {/* CTA */}
      <div className="mt-4 p-8 bg-[var(--color-formstone)] rounded-xl text-center">
        <h2 className="font-display text-xl font-bold text-[var(--color-boh)] mb-2">
          Want the final picks?
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
