import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-dark)] mb-4">
        About Baltimore Family Events
      </h1>
      <p className="text-lg text-[var(--text)] mb-12">
        How we find and curate the best family events in Baltimore.
      </p>

      {/* Who Built This - Founder Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-6">
          Who Built This
        </h2>
        <div className="bg-[var(--card)] rounded-xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Stats */}
            <div className="flex sm:flex-col gap-4 sm:gap-2 text-center sm:text-left flex-wrap justify-center sm:justify-start">
              <div className="bg-white rounded-lg px-4 py-2">
                <div className="text-xl font-bold text-[var(--primary)]">15</div>
                <div className="text-xs text-[var(--muted)]">Years in Tech</div>
              </div>
              <div className="bg-white rounded-lg px-4 py-2">
                <div className="text-xl font-bold text-[var(--primary)]">2</div>
                <div className="text-xs text-[var(--muted)]">Kids</div>
              </div>
              <div className="bg-white rounded-lg px-4 py-2">
                <div className="text-xl font-bold text-[var(--accent)]">1</div>
                <div className="text-xs text-[var(--muted)]">Tired Dad</div>
              </div>
            </div>
            {/* Story */}
            <div className="flex-1">
              <p className="text-[var(--text)] mb-4">
                I&apos;m Victor, a Baltimore dad with two young kids. After 15 years scaling tech companies—including
                building <strong>BurnAlong right here in Baltimore</strong>—I got tired of the weekly ritual:
                scrolling through 20+ websites, Facebook groups, and library calendars just to figure out what
                to do Saturday morning.
              </p>
              <p className="text-[var(--text)] mb-4">
                So I built this. The same systems I use to scale businesses? Now they scan 112 sources every week.
                Five AI &quot;parent personas&quot; evaluate every event—asking the questions real parents ask.
                You get the curated best, delivered Thursday morning.
              </p>
              <p className="text-[var(--text)] italic">
                Your weekend time with your family is too valuable to waste on event research. I fixed that.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Built This */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-4">
          Why This Exists
        </h2>
        <p className="text-[var(--text)] mb-4">
          Finding family events in Baltimore shouldn&apos;t require checking 20 different websites,
          Facebook groups, and community calendars. This service aggregates and
          curates the best family activities so you can spend less time searching and more
          time making memories.
        </p>
        <p className="text-[var(--text)]">
          Every week, AI scans 112+ sources across 5 counties, then 5 specialized personas
          evaluate each event to surface only what&apos;s truly worth your family&apos;s time.
        </p>
      </section>

      {/* The 5-Agent System */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-6">
          The 5-Agent Curation System
        </h2>
        <p className="text-[var(--text)] mb-6">
          Every event is evaluated by 5 AI personas, each bringing a unique perspective
          on what makes an event great for families. They don&apos;t just check boxes—they
          read event descriptions and think critically like real parents would.
        </p>

        <div className="space-y-6">
          <div className="bg-[var(--card)] rounded-xl p-6 border-t-4 border-t-[var(--accent)]">
            <h3 className="text-lg font-semibold text-[var(--accent)] mb-2">
              🎯 Weekend Warrior
            </h3>
            <p className="text-sm text-[var(--muted)] mb-2">Sarah, 38 — &quot;What&apos;s THE thing this Saturday?&quot;</p>
            <p className="text-[var(--text)]">
              Focuses on marquee experiences that justify getting everyone out the door.
              Evaluates whether an event has enough &quot;main character energy&quot; to anchor
              your weekend plans.
            </p>
          </div>

          <div className="bg-[var(--card)] rounded-xl p-6 border-t-4 border-t-green-500">
            <h3 className="text-lg font-semibold text-green-600 mb-2">
              💰 Budget-Conscious
            </h3>
            <p className="text-sm text-[var(--muted)] mb-2">Marcus, 41 — &quot;What&apos;s the best bang for our buck?&quot;</p>
            <p className="text-[var(--text)]">
              Calculates real costs including parking, food, and hidden extras.
              Highlights free events and best value experiences. Knows that &quot;free admission&quot;
              with $20 parking isn&apos;t actually free.
            </p>
          </div>

          <div className="bg-[var(--card)] rounded-xl p-6 border-t-4 border-t-purple-500">
            <h3 className="text-lg font-semibold text-purple-600 mb-2">
              👶 Toddler Wrangler
            </h3>
            <p className="text-sm text-[var(--muted)] mb-2">Jamie, 34 — &quot;Can we actually do this with a toddler?&quot;</p>
            <p className="text-[var(--text)]">
              Evaluates nap window timing, meltdown risk factors, and whether activities
              actually work for ages 0-4. Knows that &quot;family-friendly&quot; doesn&apos;t always
              mean toddler-friendly.
            </p>
          </div>

          <div className="bg-[var(--card)] rounded-xl p-6 border-t-4 border-t-blue-500">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">
              😎 Tween Entertainer
            </h3>
            <p className="text-sm text-[var(--muted)] mb-2">David, 45 — &quot;Will they roll their eyes or tell their friends?&quot;</p>
            <p className="text-[var(--text)]">
              Finds activities that won&apos;t get eye-rolls from your 9-13 year old.
              Looks for experiences they&apos;d actually tell friends about: behind-the-scenes
              access, glow parties, and anything with social clout.
            </p>
          </div>

          <div className="bg-[var(--card)] rounded-xl p-6 border-t-4 border-t-pink-500">
            <h3 className="text-lg font-semibold text-pink-600 mb-2">
              📅 Plan-Ahead
            </h3>
            <p className="text-sm text-[var(--muted)] mb-2">Christina, 39 — &quot;What should I calendar NOW?&quot;</p>
            <p className="text-[var(--text)]">
              Spots events with limited capacity, registration deadlines, or
              sell-out risk. Alerts you to book early for special experiences
              2-4 weeks out.
            </p>
          </div>
        </div>
      </section>

      {/* How Scoring Works */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-4">
          How Events Make the Cut
        </h2>
        <p className="text-[var(--text)] mb-4">
          Events earn consensus scores based on how many agents recommend them and how
          strongly. Our &quot;Top Pick&quot; each week has 4-5 agents in agreement. Section
          placement is driven by which personas care most:
        </p>
        <ul className="space-y-2 text-[var(--text)]">
          <li>• <strong>Top Pick:</strong> Near-unanimous agent agreement (90+ score)</li>
          <li>• <strong>Quick Weekend Win:</strong> Weekend Warrior approved, no tickets needed</li>
          <li>• <strong>Book This Week:</strong> Plan-Ahead flagged, sells out fast</li>
          <li>• <strong>Budget-Friendly:</strong> Budget-Conscious stamp of approval</li>
          <li>• <strong>Toddler Picks:</strong> Toddler Wrangler exclusive</li>
          <li>• <strong>Tween Approved:</strong> Tween Entertainer certified cool</li>
        </ul>
      </section>

      {/* Coverage */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-4">
          Our Coverage
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-[var(--card)] rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-[var(--primary)]">112+</div>
            <div className="text-[var(--text)]">Sources Scanned</div>
          </div>
          <div className="bg-[var(--card)] rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-[var(--primary)]">5</div>
            <div className="text-[var(--text)]">Counties Covered</div>
          </div>
        </div>
        <p className="text-[var(--text)] mb-4">
          We cover Baltimore City, Baltimore County, Anne Arundel, Howard, and Harford counties.
          Sources include libraries, museums, parks departments, community calendars, Facebook
          groups, and local event aggregators.
        </p>
      </section>

      {/* CTA */}
      <section className="bg-[var(--card)] rounded-xl p-8 text-center">
        <h2 className="text-xl font-bold text-[var(--text-dark)] mb-2">
          Get the Best Events Weekly
        </h2>
        <p className="text-[var(--text)] mb-4">
          Join Baltimore families discovering great events every Thursday. Free forever.
        </p>
        <Link
          href="/subscribe"
          className="inline-flex items-center justify-center px-6 py-3 bg-[var(--accent)] text-white font-semibold rounded-lg hover:bg-[var(--accent)]/90 transition-colors no-underline hover:no-underline"
        >
          Subscribe Free →
        </Link>
      </section>
    </div>
  );
}
