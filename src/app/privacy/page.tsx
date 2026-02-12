import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Bmore Families",
  description:
    "How Bmore Families handles your data. TL;DR: We collect your email, that's it. We don't sell data.",
};

export default function PrivacyPage() {
  return (
    <div>
      {/* Hero Section with Wave */}
      <section className="relative py-10 sm:py-14 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 50% 30%, rgba(0, 119, 182, 0.06) 0%, transparent 50%),
              linear-gradient(180deg, rgba(0, 119, 182, 0.03) 0%, var(--color-rowhouse) 100%)
            `
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-boh)] mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-[var(--muted)]">
            Last updated: February 2026
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

    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* TL;DR */}
      <section className="bg-[var(--color-formstone)] rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-[var(--color-boh)] mb-2">
          TL;DR
        </h2>
        <p className="text-[var(--color-harbor)]">
          We collect your email to send you the newsletter. That&apos;s it. We don&apos;t sell your data.
          We don&apos;t track you across the web. This is a personal project, not a data business.
        </p>
      </section>

      {/* What We Collect */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-[var(--color-boh)] mb-4">
          What We Collect
        </h2>
        <ul className="space-y-3 text-[var(--color-harbor)]">
          <li className="flex items-start gap-3">
            <span className="text-[var(--color-charm)] font-bold">•</span>
            <span><strong>Email address</strong> — When you subscribe to the newsletter</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[var(--color-charm)] font-bold">•</span>
            <span><strong>Basic analytics</strong> — Page views via Vercel Analytics (anonymous, no personal data)</span>
          </li>
        </ul>
      </section>

      {/* What We Don't Do */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-[var(--color-boh)] mb-4">
          What We Don&apos;t Do
        </h2>
        <ul className="space-y-3 text-[var(--color-harbor)]">
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
        <h2 className="text-xl font-bold text-[var(--color-boh)] mb-4">
          Email Delivery
        </h2>
        <p className="text-[var(--color-harbor)] mb-4">
          We use <strong>Beehiiv</strong> to send our newsletter. When you subscribe, your email
          is stored in Beehiiv&apos;s systems. Beehiiv is a reputable newsletter platform used by
          thousands of publishers. You can read their privacy policy at{" "}
          <a
            href="https://www.beehiiv.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-charm)] hover:underline"
          >
            beehiiv.com/privacy
          </a>.
        </p>
      </section>

      {/* How to Unsubscribe */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-[var(--color-boh)] mb-4">
          How to Unsubscribe
        </h2>
        <p className="text-[var(--color-harbor)]">
          Every email has an unsubscribe link at the bottom. One click, you&apos;re out. No guilt trips,
          no &quot;are you sure?&quot; hoops. Your inbox, your choice.
        </p>
      </section>

      {/* About This Project */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-[var(--color-boh)] mb-4">
          About This Project
        </h2>
        <p className="text-[var(--color-harbor)]">
          Baltimore Family Events is a personal project built by Victor Sowers, a Baltimore dad
          who wanted a better way to find family activities. This is not a company. There are no
          investors. There is no business model that relies on your data. I built this for my family
          and decided to share it with others.
        </p>
      </section>

      {/* Contact */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-[var(--color-boh)] mb-4">
          Questions?
        </h2>
        <p className="text-[var(--color-harbor)]">
          If you have questions about this privacy policy or how your data is handled,
          reach out via the newsletter reply or find me on LinkedIn.
        </p>
      </section>

      {/* Back to Home */}
      <div className="pt-8 border-t border-[var(--muted)]/20">
        <Link
          href="/"
          className="text-[var(--color-charm)] hover:underline no-underline hover:no-underline"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
    </div>
  );
}
