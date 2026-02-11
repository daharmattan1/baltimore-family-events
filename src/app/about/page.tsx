export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-dark)] mb-4">
        About Baltimore Family Events
      </h1>
      <p className="text-lg text-[var(--text)] mb-12">
        How we find and curate the best family events in Baltimore.
      </p>

      {/* Why We Built This */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-4">
          Why We Built This
        </h2>
        <p className="text-[var(--text)] mb-4">
          Finding family events in Baltimore shouldn&apos;t require checking 20 different websites,
          Facebook groups, and community calendars. We built this service to aggregate and
          curate the best family activities so you can spend less time searching and more
          time making memories.
        </p>
      </section>

      {/* The 5-Agent System */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-6">
          The 5-Agent Curation System
        </h2>
        <p className="text-[var(--text)] mb-6">
          Every event is evaluated by 5 specialized AI personas, each bringing a unique
          perspective on what makes an event great for families:
        </p>

        <div className="space-y-6">
          <div className="bg-[var(--card)] rounded-xl p-6">
            <h3 className="text-lg font-semibold text-[var(--primary)] mb-2">
              🎯 The Busy Parent
            </h3>
            <p className="text-[var(--text)]">
              Focuses on practical logistics: parking, timing, cost, and whether the event
              works for tired parents juggling multiple schedules.
            </p>
          </div>

          <div className="bg-[var(--card)] rounded-xl p-6">
            <h3 className="text-lg font-semibold text-[var(--primary)] mb-2">
              🎨 The Creative Explorer
            </h3>
            <p className="text-[var(--text)]">
              Evaluates educational value, hands-on activities, and opportunities for
              creative expression and learning.
            </p>
          </div>

          <div className="bg-[var(--card)] rounded-xl p-6">
            <h3 className="text-lg font-semibold text-[var(--primary)] mb-2">
              🏃 The Active Family
            </h3>
            <p className="text-[var(--text)]">
              Looks for outdoor activities, physical engagement, and events that burn energy
              in productive ways.
            </p>
          </div>

          <div className="bg-[var(--card)] rounded-xl p-6">
            <h3 className="text-lg font-semibold text-[var(--primary)] mb-2">
              💰 The Budget Watcher
            </h3>
            <p className="text-[var(--text)]">
              Assesses value for money, highlights free events, and considers the full cost
              including food, parking, and extras.
            </p>
          </div>

          <div className="bg-[var(--card)] rounded-xl p-6">
            <h3 className="text-lg font-semibold text-[var(--primary)] mb-2">
              👶 The Age Expert
            </h3>
            <p className="text-[var(--text)]">
              Evaluates age-appropriateness, engagement for different developmental stages,
              and whether multiple age groups can enjoy together.
            </p>
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-4">
          Our Coverage
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[var(--card)] rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-[var(--primary)]">112+</div>
            <div className="text-[var(--text)]">Sources</div>
          </div>
          <div className="bg-[var(--card)] rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-[var(--primary)]">5</div>
            <div className="text-[var(--text)]">Counties</div>
          </div>
        </div>
        <p className="text-[var(--text)] mt-4">
          We cover Baltimore City, Baltimore County, Anne Arundel, Howard, and Harford counties.
        </p>
      </section>
    </div>
  );
}
