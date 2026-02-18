const SOURCE_CATEGORIES = [
  {
    name: "Museums & Attractions",
    count: 22,
    icon: "\u{1F3DB}\uFE0F",
    color: "var(--color-charm)",
    examples: "Walters Art Museum, Port Discovery, National Aquarium",
  },
  {
    name: "Faith & Community",
    count: 24,
    icon: "\u{1F54D}",
    color: "var(--color-agent-toddler)",
    examples: "Synagogues, churches, community centers, JCCs",
  },
  {
    name: "Sports & Fitness",
    count: 15,
    icon: "\u26BD",
    color: "var(--color-crab)",
    examples: "Swim schools, rec leagues, YMCA programs",
  },
  {
    name: "Creative & STEM",
    count: 12,
    icon: "\u{1F3A8}",
    color: "var(--color-calvert)",
    examples: "Art studios, coding camps, maker spaces",
  },
  {
    name: "Play & Party Venues",
    count: 14,
    icon: "\u{1F389}",
    color: "var(--color-agent-planner)",
    examples: "Indoor playgrounds, trampoline parks, bowling",
  },
  {
    name: "Theaters & Performance",
    count: 10,
    icon: "\u{1F3AD}",
    color: "var(--color-crossland)",
    examples: "Children's theater, puppet shows, concerts",
  },
  {
    name: "Parks & Nature",
    count: 13,
    icon: "\u{1F333}",
    color: "var(--color-seafoam)",
    examples: "State parks, nature centers, botanical gardens",
  },
  {
    name: "Libraries",
    count: 5,
    icon: "\u{1F4DA}",
    color: "var(--color-charm)",
    examples: "Enoch Pratt, county library systems",
  },
  {
    name: "Farms & Seasonal",
    count: 8,
    icon: "\u{1F33B}",
    color: "var(--color-crab)",
    examples: "Pick-your-own, pumpkin patches, holiday events",
  },
  {
    name: "News & Family Media",
    count: 20,
    icon: "\u{1F4F0}",
    color: "var(--color-slate)",
    examples: "Baltimore Sun, Baltimore Fishbowl, Patch",
  },
  {
    name: "Facebook & Reddit",
    count: 21,
    icon: "\u{1F4AC}",
    color: "var(--color-agent-tween)",
    examples: "Parent groups, neighborhood forums, local subreddits",
  },
  {
    name: "Deals & Savings",
    count: 6,
    icon: "\u{1F4B0}",
    color: "var(--color-agent-budget)",
    examples: "Groupon, free museum days, seasonal passes",
  },
];

const COUNTIES = [
  "Baltimore City",
  "Baltimore County",
  "Howard County",
  "Anne Arundel County",
  "Harford County",
];

export default function SourceDepthGrid() {
  const totalSources = SOURCE_CATEGORIES.reduce((sum, cat) => sum + cat.count, 0);

  return (
    <section className="py-20 bg-[var(--color-formstone)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-boh)] mb-4 text-center">
          What We Cover
        </h2>
        <p className="text-center text-[var(--color-harbor)] mb-12 max-w-2xl mx-auto">
          <span className="font-semibold text-[var(--color-crab)]">{totalSources} sources</span>{" "}
          and growing across 12 categories. You&apos;re not going to check them all — we already did.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SOURCE_CATEGORIES.map((category) => (
            <div
              key={category.name}
              className="bg-white rounded-xl p-5 border-l-4 shadow-sm"
              style={{ borderLeftColor: category.color }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl" aria-hidden="true">
                  {category.icon}
                </span>
                <h3 className="font-display font-semibold text-[var(--color-boh)] text-base flex-1">
                  {category.name}
                </h3>
                <span
                  className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 rounded-full text-white text-sm font-semibold bg-[var(--color-crab)]"
                >
                  {category.count}
                </span>
              </div>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                {category.examples}
              </p>
            </div>
          ))}
        </div>

        {/* County Coverage Bar */}
        <div className="mt-10 bg-white rounded-xl p-6 shadow-sm">
          <p className="text-sm font-semibold text-[var(--color-boh)] mb-3 text-center">
            Covering 5 Counties
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {COUNTIES.map((county) => (
              <span
                key={county}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-charm)]/5 text-[var(--color-charm)] rounded-full text-sm font-medium"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {county}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
