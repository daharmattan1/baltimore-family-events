import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 30% 20%, rgba(0, 119, 182, 0.08) 0%, transparent 50%),
              linear-gradient(180deg, rgba(0, 119, 182, 0.03) 0%, var(--color-rowhouse) 100%)
            `
          }}
        />

        {/* Wave pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "url('/brand/patterns/wave-hero.svg')",
            backgroundSize: "600px"
          }}
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[var(--color-charm)] font-medium mb-3 tracking-wide uppercase text-sm">
            How It Works
          </p>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-boh)] mb-4">
            About <span className="text-[var(--color-crab)]">Bmore Families</span>
          </h1>
          <p className="text-lg text-[var(--color-harbor)] max-w-2xl">
            How we find and curate the best family events in Baltimore using AI and local expertise.
          </p>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 h-6 overflow-hidden">
          <Image
            src="/brand/dividers/wave-divider.svg"
            alt=""
            fill
            className="object-cover"
            aria-hidden="true"
          />
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Who Built This - Founder Section */}
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-[var(--color-boh)] mb-6">
            Who Built This
          </h2>
          <div className="bg-[var(--color-formstone)] rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Stats */}
              <div className="flex sm:flex-col gap-4 sm:gap-3 text-center sm:text-left flex-wrap justify-center sm:justify-start">
                <div className="bg-white rounded-xl px-5 py-3 shadow-sm">
                  <div className="text-2xl font-display font-bold text-[var(--color-charm)]">15</div>
                  <div className="text-xs text-[var(--muted)]">Years in Tech</div>
                </div>
                <div className="bg-white rounded-xl px-5 py-3 shadow-sm">
                  <div className="text-2xl font-display font-bold text-[var(--color-charm)]">2</div>
                  <div className="text-xs text-[var(--muted)]">Kids</div>
                </div>
                <div className="bg-white rounded-xl px-5 py-3 shadow-sm">
                  <div className="text-2xl font-display font-bold text-[var(--color-crab)]">1</div>
                  <div className="text-xs text-[var(--muted)]">Tired Dad</div>
                </div>
              </div>
              {/* Story */}
              <div className="flex-1">
                <p className="text-[var(--color-harbor)] mb-4 leading-relaxed">
                  I&apos;m Victor, a Baltimore dad with two young kids. After 15 years scaling tech companies—including
                  building <strong className="text-[var(--color-boh)]">BurnAlong right here in Baltimore</strong>—I got tired of the weekly ritual:
                  scrolling through 20+ websites, Facebook groups, and library calendars just to figure out what
                  to do Saturday morning.
                </p>
                <p className="text-[var(--color-harbor)] mb-4 leading-relaxed">
                  So I built this. The same systems I use to scale businesses? Now they scan 112 sources every week.
                  Five AI &quot;parent personas&quot; evaluate every event—asking the questions real parents ask.
                  You get the curated best, delivered Thursday morning.
                </p>
                <p className="text-[var(--color-charm)] italic font-medium">
                  Your weekend time with your family is too valuable to waste on event research. I fixed that.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why We Built This */}
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-[var(--color-boh)] mb-4">
            Why This Exists
          </h2>
          <p className="text-[var(--color-harbor)] mb-4 leading-relaxed">
            Finding family events in Baltimore shouldn&apos;t require checking 20 different websites,
            Facebook groups, and community calendars. This service aggregates and
            curates the best family activities so you can spend less time searching and more
            time making memories.
          </p>
          <p className="text-[var(--color-harbor)] leading-relaxed">
            Every week, AI scans 112+ sources across 5 counties, then 5 specialized personas
            evaluate each event to surface only what&apos;s truly worth your family&apos;s time.
          </p>
        </section>

        {/* The 5-Agent System */}
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-[var(--color-boh)] mb-4">
            The 5-Agent Curation System
          </h2>
          <p className="text-[var(--color-harbor)] mb-8 leading-relaxed">
            Every event is evaluated by 5 AI personas, each bringing a unique perspective
            on what makes an event great for families. They don&apos;t just check boxes—they
            read event descriptions and think critically like real parents would.
          </p>

          <div className="space-y-6">
            {/* Weekend Warrior */}
            <div className="bg-white rounded-2xl p-6 border-l-4 border-l-[var(--color-crab)] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[var(--color-crab)]/10 rounded-xl flex items-center justify-center">
                  <span className="text-xl">🏃</span>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-[var(--color-crab)]">Weekend Warrior</h3>
                  <p className="text-xs text-[var(--muted)]">Sarah, 38 — &quot;What&apos;s THE thing this Saturday?&quot;</p>
                </div>
              </div>
              <p className="text-[var(--color-harbor)] text-sm leading-relaxed">
                Focuses on marquee experiences that justify getting everyone out the door.
                Evaluates whether an event has enough &quot;main character energy&quot; to anchor
                your weekend plans.
              </p>
            </div>

            {/* Budget-Conscious */}
            <div className="bg-white rounded-2xl p-6 border-l-4 border-l-[var(--color-agent-budget)] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[var(--color-agent-budget)]/10 rounded-xl flex items-center justify-center">
                  <span className="text-xl">💰</span>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-[var(--color-agent-budget)]">Budget-Conscious</h3>
                  <p className="text-xs text-[var(--muted)]">Marcus, 41 — &quot;What&apos;s the best bang for our buck?&quot;</p>
                </div>
              </div>
              <p className="text-[var(--color-harbor)] text-sm leading-relaxed">
                Calculates real costs including parking, food, and hidden extras.
                Highlights free events and best value experiences. Knows that &quot;free admission&quot;
                with $20 parking isn&apos;t actually free.
              </p>
            </div>

            {/* Toddler Wrangler */}
            <div className="bg-white rounded-2xl p-6 border-l-4 border-l-[var(--color-agent-toddler)] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[var(--color-agent-toddler)]/10 rounded-xl flex items-center justify-center">
                  <span className="text-xl">👶</span>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-[var(--color-agent-toddler)]">Toddler Wrangler</h3>
                  <p className="text-xs text-[var(--muted)]">Jamie, 34 — &quot;Can we actually do this with a toddler?&quot;</p>
                </div>
              </div>
              <p className="text-[var(--color-harbor)] text-sm leading-relaxed">
                Evaluates nap window timing, meltdown risk factors, and whether activities
                actually work for ages 0-4. Knows that &quot;family-friendly&quot; doesn&apos;t always
                mean toddler-friendly.
              </p>
            </div>

            {/* Tween Entertainer */}
            <div className="bg-white rounded-2xl p-6 border-l-4 border-l-[var(--color-agent-tween)] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[var(--color-agent-tween)]/10 rounded-xl flex items-center justify-center">
                  <span className="text-xl">🎮</span>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-[var(--color-agent-tween)]">Tween Entertainer</h3>
                  <p className="text-xs text-[var(--muted)]">David, 45 — &quot;Will they roll their eyes or tell their friends?&quot;</p>
                </div>
              </div>
              <p className="text-[var(--color-harbor)] text-sm leading-relaxed">
                Finds activities that won&apos;t get eye-rolls from your 9-13 year old.
                Looks for experiences they&apos;d actually tell friends about: behind-the-scenes
                access, glow parties, and anything with social clout.
              </p>
            </div>

            {/* Plan-Ahead */}
            <div className="bg-white rounded-2xl p-6 border-l-4 border-l-[var(--color-agent-planner)] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[var(--color-agent-planner)]/10 rounded-xl flex items-center justify-center">
                  <span className="text-xl">📅</span>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-[var(--color-agent-planner)]">Plan-Ahead</h3>
                  <p className="text-xs text-[var(--muted)]">Christina, 39 — &quot;What should I calendar NOW?&quot;</p>
                </div>
              </div>
              <p className="text-[var(--color-harbor)] text-sm leading-relaxed">
                Spots events with limited capacity, registration deadlines, or
                sell-out risk. Alerts you to book early for special experiences
                2-4 weeks out.
              </p>
            </div>
          </div>
        </section>

        {/* How Scoring Works */}
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-[var(--color-boh)] mb-4">
            How Events Make the Cut
          </h2>
          <p className="text-[var(--color-harbor)] mb-6 leading-relaxed">
            Events earn consensus scores based on how many agents recommend them and how
            strongly. Our &quot;Top Pick&quot; each week has 4-5 agents in agreement. Section
            placement is driven by which personas care most:
          </p>
          <ul className="space-y-3 text-[var(--color-harbor)]">
            <li className="flex items-start gap-3">
              <Image src="/brand/icons/crab-bullet.svg" alt="" width={18} height={18} className="flex-shrink-0 mt-1" aria-hidden="true" />
              <span><strong className="text-[var(--color-boh)]">Top Pick:</strong> Near-unanimous agent agreement (90+ score)</span>
            </li>
            <li className="flex items-start gap-3">
              <Image src="/brand/icons/crab-bullet.svg" alt="" width={18} height={18} className="flex-shrink-0 mt-1" aria-hidden="true" />
              <span><strong className="text-[var(--color-boh)]">Quick Weekend Win:</strong> Weekend Warrior approved, no tickets needed</span>
            </li>
            <li className="flex items-start gap-3">
              <Image src="/brand/icons/crab-bullet.svg" alt="" width={18} height={18} className="flex-shrink-0 mt-1" aria-hidden="true" />
              <span><strong className="text-[var(--color-boh)]">Book This Week:</strong> Plan-Ahead flagged, sells out fast</span>
            </li>
            <li className="flex items-start gap-3">
              <Image src="/brand/icons/crab-bullet.svg" alt="" width={18} height={18} className="flex-shrink-0 mt-1" aria-hidden="true" />
              <span><strong className="text-[var(--color-boh)]">Budget-Friendly:</strong> Budget-Conscious stamp of approval</span>
            </li>
            <li className="flex items-start gap-3">
              <Image src="/brand/icons/crab-bullet.svg" alt="" width={18} height={18} className="flex-shrink-0 mt-1" aria-hidden="true" />
              <span><strong className="text-[var(--color-boh)]">Toddler Picks:</strong> Toddler Wrangler exclusive</span>
            </li>
            <li className="flex items-start gap-3">
              <Image src="/brand/icons/crab-bullet.svg" alt="" width={18} height={18} className="flex-shrink-0 mt-1" aria-hidden="true" />
              <span><strong className="text-[var(--color-boh)]">Tween Approved:</strong> Tween Entertainer certified cool</span>
            </li>
          </ul>
        </section>

        {/* Coverage */}
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-[var(--color-boh)] mb-6">
            Our Coverage
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[var(--color-charm)]/5 rounded-2xl p-6 text-center border border-[var(--color-charm)]/10">
              <div className="text-4xl font-display font-bold text-[var(--color-charm)]">112+</div>
              <div className="text-[var(--color-harbor)] text-sm mt-1">Sources Scanned</div>
            </div>
            <div className="bg-[var(--color-crab)]/5 rounded-2xl p-6 text-center border border-[var(--color-crab)]/10">
              <div className="text-4xl font-display font-bold text-[var(--color-crab)]">5</div>
              <div className="text-[var(--color-harbor)] text-sm mt-1">Counties Covered</div>
            </div>
          </div>
          <p className="text-[var(--color-harbor)] leading-relaxed">
            We cover Baltimore City, Baltimore County, Anne Arundel, Howard, and Harford counties.
            Sources include libraries, museums, parks departments, community calendars, Facebook
            groups, and local event aggregators.
          </p>
        </section>

        {/* CTA */}
        <section className="relative bg-[var(--color-boh)] rounded-2xl p-8 sm:p-10 text-center text-white overflow-hidden">
          {/* Wave pattern */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: "url('/brand/patterns/wave-hero.svg')",
              backgroundSize: "400px"
            }}
          />

          <div className="relative">
            <h2 className="font-display text-2xl font-bold mb-3">
              Get the Best Events Weekly
            </h2>
            <p className="text-gray-300 mb-6">
              Join Baltimore families discovering great events every Thursday. Free forever.
            </p>
            <Link
              href="/subscribe"
              className="inline-flex items-center justify-center px-8 py-4 bg-[var(--color-crab)] text-white font-semibold rounded-xl hover:bg-[var(--color-crab)]/90 transition-all duration-drift no-underline hover:no-underline shadow-crab"
            >
              Subscribe Free →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
