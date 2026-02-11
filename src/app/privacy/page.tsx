import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-dark)] mb-4">
        Privacy Policy
      </h1>
      <p className="text-sm text-[var(--muted)] mb-8">
        Last updated: February 2026
      </p>

      {/* TL;DR */}
      <section className="bg-[var(--card)] rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-[var(--text-dark)] mb-2">
          TL;DR
        </h2>
        <p className="text-[var(--text)]">
          We collect your email to send you the newsletter. That&apos;s it. We don&apos;t sell your data.
          We don&apos;t track you across the web. This is a personal project, not a data business.
        </p>
      </section>

      {/* What We Collect */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-[var(--text-dark)] mb-4">
          What We Collect
        </h2>
        <ul className="space-y-3 text-[var(--text)]">
          <li className="flex items-start gap-3">
            <span className="text-[var(--primary)] font-bold">•</span>
            <span><strong>Email address</strong> — When you subscribe to the newsletter</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[var(--primary)] font-bold">•</span>
            <span><strong>Basic analytics</strong> — Page views via Vercel Analytics (anonymous, no personal data)</span>
          </li>
        </ul>
      </section>

      {/* What We Don't Do */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-[var(--text-dark)] mb-4">
          What We Don&apos;t Do
        </h2>
        <ul className="space-y-3 text-[var(--text)]">
          <li className="flex items-start gap-3">
            <span className="text-red-500 font-bold">✗</span>
            <span>Sell your information to anyone</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-red-500 font-bold">✗</span>
            <span>Share your email with third parties (except Beehiiv for email delivery)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-red-500 font-bold">✗</span>
            <span>Track you across the web</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-red-500 font-bold">✗</span>
            <span>Use your data for advertising</span>
          </li>
        </ul>
      </section>

      {/* Email Delivery */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-[var(--text-dark)] mb-4">
          Email Delivery
        </h2>
        <p className="text-[var(--text)] mb-4">
          We use <strong>Beehiiv</strong> to send our newsletter. When you subscribe, your email
          is stored in Beehiiv&apos;s systems. Beehiiv is a reputable newsletter platform used by
          thousands of publishers. You can read their privacy policy at{" "}
          <a
            href="https://www.beehiiv.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--primary)] hover:underline"
          >
            beehiiv.com/privacy
          </a>.
        </p>
      </section>

      {/* How to Unsubscribe */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-[var(--text-dark)] mb-4">
          How to Unsubscribe
        </h2>
        <p className="text-[var(--text)]">
          Every email has an unsubscribe link at the bottom. One click, you&apos;re out. No guilt trips,
          no &quot;are you sure?&quot; hoops. Your inbox, your choice.
        </p>
      </section>

      {/* About This Project */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-[var(--text-dark)] mb-4">
          About This Project
        </h2>
        <p className="text-[var(--text)]">
          Baltimore Family Events is a personal project built by Victor Sowers, a Baltimore dad
          who wanted a better way to find family activities. This is not a company. There are no
          investors. There is no business model that relies on your data. I built this for my family
          and decided to share it with others.
        </p>
      </section>

      {/* Contact */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-[var(--text-dark)] mb-4">
          Questions?
        </h2>
        <p className="text-[var(--text)]">
          If you have questions about this privacy policy or how your data is handled,
          reach out via the newsletter reply or find me on LinkedIn.
        </p>
      </section>

      {/* Back to Home */}
      <div className="pt-8 border-t border-[var(--muted)]/20">
        <Link
          href="/"
          className="text-[var(--primary)] hover:underline"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
