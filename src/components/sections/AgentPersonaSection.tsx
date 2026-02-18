const AGENTS = [
  {
    name: "Sarah",
    age: 38,
    persona: "Weekend Warrior",
    color: "var(--color-agent-warrior)",
    question: "Is this worth leaving the house for?",
    bio: "Finds the main-event energy for your family\u2019s Saturday.",
    criteria: ["High energy", "Unique experiences", "Worth the drive", "Group-friendly"],
    voice:
      "Skip the mall playground. The Walters Art Museum has free drop-in art every Saturday and your kids won\u2019t even know they\u2019re learning.",
  },
  {
    name: "Marcus",
    age: 41,
    persona: "Budget Pro",
    color: "var(--color-agent-budget)",
    question: "What\u2019s the real cost \u2014 parking, snacks, and all?",
    bio: "Calculates the true cost so you don\u2019t discover hidden fees at the door.",
    criteria: ["Free or low-cost", "No hidden fees", "Value per hour", "Free parking"],
    voice:
      "Patterson Park has free tennis clinics every Sunday. Bring a water bottle, skip the $6 concession stand.",
  },
  {
    name: "Jamie",
    age: 34,
    persona: "Toddler Wrangler",
    color: "var(--color-agent-toddler)",
    question: "Can I get out fast if someone melts down?",
    bio: "Maps every exit, nap window, and stroller-friendly path.",
    criteria: ["Nap-friendly timing", "Easy exits", "Stroller access", "Sensory-safe"],
    voice:
      "Maryland Science Center opens at 10. Get there by 10:15, hit the Kids Room first, and you\u2019re home by noon nap.",
  },
  {
    name: "David",
    age: 45,
    persona: "Tween Finder",
    color: "var(--color-agent-tween)",
    question: "Will my 12-year-old actually think this is cool?",
    bio: "Filters for the stuff that passes the eye-roll test.",
    criteria: ["Cool factor", "Ages 9\u201314", "Instagram-worthy", "Not babyish"],
    voice:
      "Charm City Skatepark\u2019s Saturday sessions are free and the older kids actually show up. Bring a helmet.",
  },
  {
    name: "Christina",
    age: 39,
    persona: "Planner",
    color: "var(--color-agent-planner)",
    question: "Do I need to register, and will it sell out?",
    bio: "Tracks registration deadlines, capacity limits, and booking windows.",
    criteria: ["Registration required", "Sells out fast", "Book ahead", "Limited spots"],
    voice:
      "The aquarium\u2019s Slumber Safari books 6 weeks out. Set a reminder now or you\u2019ll be refreshing a sold-out page.",
  },
];

export default function AgentPersonaSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-boh)] mb-4 text-center">
          Meet Your Weekend Crew
        </h2>
        <p className="text-center text-[var(--color-harbor)] mb-12 max-w-2xl mx-auto">
          Five AI parent personas, each asking the questions real parents ask.
          Plus one real dad who reviews everything before it reaches you.
        </p>

        {/* Agent Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {AGENTS.map((agent) => (
            <div
              key={agent.name}
              className="bg-[var(--color-formstone)] rounded-xl p-6 border-l-4"
              style={{ borderLeftColor: agent.color }}
            >
              {/* Name + Age */}
              <div className="flex items-center justify-between mb-2">
                <h3
                  className="font-display font-semibold text-lg"
                  style={{ color: agent.color }}
                >
                  {agent.name}, {agent.age}
                </h3>
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: agent.color }}
                >
                  {agent.persona}
                </span>
              </div>

              {/* Signature Question */}
              <p
                className="font-accent text-sm mb-3"
                style={{ color: agent.color }}
              >
                &ldquo;{agent.question}&rdquo;
              </p>

              {/* Bio */}
              <p className="text-sm text-[var(--color-harbor)] mb-3">
                {agent.bio}
              </p>

              {/* Criteria Pills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {agent.criteria.map((criterion) => (
                  <span
                    key={criterion}
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${agent.color} 10%, transparent)`,
                      color: agent.color,
                    }}
                  >
                    {criterion}
                  </span>
                ))}
              </div>

              {/* Voice Sample */}
              <blockquote
                className="text-sm text-[var(--color-harbor)] italic border-l-2 pl-3"
                style={{ borderLeftColor: `color-mix(in srgb, ${agent.color} 30%, transparent)` }}
              >
                &ldquo;{agent.voice}&rdquo;
              </blockquote>
            </div>
          ))}
        </div>

        {/* Victor "Real Human" Card */}
        <div
          className="rounded-xl p-6 border-l-4 border-[var(--color-charm)]"
          style={{ backgroundColor: "rgba(0, 119, 182, 0.04)" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-display font-semibold text-xl text-[var(--color-charm)]">
                  Victor
                </h3>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[var(--color-charm)] text-white uppercase tracking-wide">
                  Real Human
                </span>
              </div>
              <p className="text-[var(--color-harbor)] mb-2">
                Baltimore dad. Reviews every recommendation before it reaches you.
              </p>
              <p className="text-sm text-[var(--color-muted)] italic">
                &ldquo;The AI finds the events. I make sure they&apos;re worth your Saturday.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
