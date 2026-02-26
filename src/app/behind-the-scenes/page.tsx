import Link from "next/link";
import Image from "next/image";
import { getAllTranscripts } from "@/lib/transcripts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How We Pick Events — Agent Transcripts | BmoreFamilies",
  description:
    "Curious how our AI agents decide which Baltimore family events make the newsletter? Read the full debate transcripts from each week's curation process.",
};

// Extract a preview snippet from transcript content
function getPreviewSnippet(content: string): string {
  // Find Round 1 content and extract first agent's opening
  const round1Match = content.match(/## Round 1[^\n]*\n([\s\S]*?)(?=## Round 2|$)/);
  const text = round1Match ? round1Match[1] : content;

  const cleaned = text
    .replace(/^#.*$/gm, "")
    .replace(/\*\*[^*]+\*\*/g, "")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/---/g, "")
    .replace(/\([^)]*\)/g, "")
    .replace(/\n+/g, " ")
    .trim();

  return cleaned.slice(0, 150) + (cleaned.length > 150 ? "..." : "");
}

export default function BehindTheScenesPage() {
  const transcripts = getAllTranscripts();

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
            How We Pick Events
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-boh)] mb-3">
            Agent Debate Transcripts
          </h1>
          <p className="text-[var(--color-harbor)] max-w-2xl">
            Ever wonder how the newsletter gets made? Each week, 5 AI agents with different parenting styles debate hundreds of events to find the best picks. Here are the unedited transcripts.
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
        {transcripts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🦀</div>
            <p className="text-[var(--color-harbor)] mb-4">
              No discussion transcripts published yet. Subscribe to catch the first issue!
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
            {transcripts.map((transcript) => (
              <Link
                key={transcript.slug}
                href={`/behind-the-scenes/${transcript.slug}`}
                className="block bg-white border border-[var(--muted)]/20 rounded-xl p-6 hover:shadow-lg transition-shadow no-underline"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h2 className="text-lg font-display font-semibold text-[var(--color-boh)] mb-1">
                      How We Picked: {transcript.title}
                    </h2>
                    {transcript.dateRange && (
                      <p className="text-sm text-[var(--muted)]">
                        Week of {transcript.dateRange}
                      </p>
                    )}
                  </div>
                  <span className="text-[var(--color-charm)] font-medium shrink-0">
                    Read →
                  </span>
                </div>

                {/* Agent roster */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {transcript.agents.map((agent) => (
                    <span
                      key={agent.name}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--color-charm)]/10 text-[var(--color-charm)]"
                    >
                      {agent.name} · {agent.role}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-[var(--color-harbor)] line-clamp-2">
                  {transcript.rounds} rounds of debate · {getPreviewSnippet(transcript.content)}
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
