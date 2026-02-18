"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ClassCard from "@/components/ui/ClassCard";
import { BaltimoreEvent } from "@/lib/supabase";

// Group classes by content pillar or event type
function groupClasses(classes: BaltimoreEvent[]): Map<string, BaltimoreEvent[]> {
  const groups = new Map<string, BaltimoreEvent[]>();

  for (const cls of classes) {
    const key = cls.content_pillar || cls.event_type || "other";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(cls);
  }

  return groups;
}

const categoryLabels: Record<string, string> = {
  swim: "Swimming & Water",
  art: "Art & Creativity",
  stem: "STEM & Science",
  sports: "Sports & Athletics",
  music: "Music & Dance",
  nature: "Nature & Outdoor",
  camp: "Camps",
  class: "Classes",
  educational: "Educational",
  other: "Other",
};

function getCategoryLabel(key: string): string {
  return categoryLabels[key] || key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ");
}

function getCategoryIcon(key: string): string {
  const icons: Record<string, string> = {
    swim: "🏊",
    art: "🎨",
    stem: "🔬",
    sports: "⚽",
    music: "🎵",
    nature: "🌿",
    camp: "⛺",
    class: "📚",
    educational: "📚",
    other: "✨",
  };
  return icons[key] || "📋";
}

export default function ClassesPage() {
  const [classes, setClasses] = useState<BaltimoreEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchClassData() {
      try {
        const response = await fetch("/api/events?classes=true");
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to fetch classes");
        setClasses(data.events || []);
      } catch (err) {
        console.error("Error fetching classes:", err);
        setError(err instanceof Error ? err.message : "Failed to load classes");
      } finally {
        setLoading(false);
      }
    }
    fetchClassData();
  }, []);

  const grouped = groupClasses(classes);

  return (
    <div>
      {/* Hero Header */}
      <section className="relative py-8 sm:py-10 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 30% 30%, rgba(138, 79, 183, 0.06) 0%, transparent 50%),
              linear-gradient(180deg, rgba(138, 79, 183, 0.03) 0%, var(--color-rowhouse) 100%)
            `
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[var(--color-agent-toddler)] font-medium mb-2 tracking-wide uppercase text-sm">
            Ongoing Programs
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-boh)] mb-3">
            Classes & Sign-Ups
          </h1>
          <p className="text-[var(--color-harbor)] max-w-2xl">
            Swim lessons, art classes, STEM camps, and more. These programs require registration — sign up before they fill!
          </p>
        </div>

        {/* Wave divider */}
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

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white border border-[var(--muted)]/20 rounded-xl p-6 animate-pulse">
                <div className="h-4 bg-[var(--muted)]/30 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-[var(--muted)]/20 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-[var(--muted)]/20 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="bg-[var(--color-crossland)]/5 border border-[var(--color-crossland)]/20 rounded-xl p-6 text-center">
            <p className="text-[var(--color-crossland)] mb-4">{error}</p>
          </div>
        )}

        {/* Classes grouped by category */}
        {!loading && !error && classes.length > 0 && (
          <>
            <p className="text-sm text-[var(--muted)] mb-6 flex items-center gap-2">
              <span className="text-[var(--color-crab)]">🦀</span>
              {classes.length} class{classes.length !== 1 ? "es" : ""} & program{classes.length !== 1 ? "s" : ""}
            </p>
            <div className="space-y-8">
              {Array.from(grouped.entries()).map(([category, items]) => (
                <div key={category}>
                  <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-[var(--color-boh)] mb-4">
                    <span>{getCategoryIcon(category)}</span>
                    {getCategoryLabel(category)}
                    <span className="text-sm font-normal text-[var(--muted)]">({items.length})</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((cls) => (
                      <ClassCard key={cls.id} event={cls} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Empty state */}
        {!loading && !error && classes.length === 0 && (
          <div className="bg-[var(--color-formstone)] rounded-xl p-8 text-center">
            <div className="text-4xl mb-4">🎨</div>
            <p className="text-[var(--color-harbor)] mb-2">
              No classes or programs listed right now.
            </p>
            <p className="text-sm text-[var(--muted)]">
              Check back soon — we update weekly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
