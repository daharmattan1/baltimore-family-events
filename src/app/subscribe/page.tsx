"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";

export default function SubscribePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to subscribe");
      }

      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <div>
      {/* Hero Section with Wave */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 50% 0%, rgba(0, 119, 182, 0.08) 0%, transparent 50%),
              linear-gradient(180deg, rgba(0, 119, 182, 0.03) 0%, var(--color-rowhouse) 100%)
            `
          }}
        />

        {/* Wave pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "url('/brand/patterns/wave-hero.svg')",
            backgroundSize: "600px",
            backgroundPosition: "center top"
          }}
        />

        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[var(--color-charm)] font-medium mb-3 tracking-wide uppercase text-sm">
            Free Weekly Newsletter
          </p>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-boh)] mb-4">
            Never Miss a <span className="text-[var(--color-crab)]">Weekend</span> Again
          </h1>
          <p className="text-lg text-[var(--color-harbor)] max-w-xl mx-auto">
            The best 5-7 family events for THIS weekend, delivered Thursday at 7am.
            193 sources. Zero scrolling. Always free.
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

      {/* Subscribe Form Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Beehiiv Form Card */}
          <div className="relative mb-12">
            {/* Crab Orange accent bar at top */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-[var(--color-crab)] rounded-t-xl" />

            <div className="bg-white border border-[var(--muted)]/20 rounded-xl p-8 shadow-lg pt-10">
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">🦀</div>
                <h2 className="font-display text-xl font-semibold text-[var(--color-boh)] mb-2">
                  Your Weekend Starts Here
                </h2>
                <p className="text-[var(--color-harbor)]">
                  Every Thursday at 7am — the weekend&apos;s best family events, ready to explore.
                </p>
              </div>

              {status === "success" ? (
                <div className="text-center py-6">
                  <div className="text-4xl mb-3">🎉</div>
                  <h3 className="font-display text-xl font-semibold text-[var(--color-boh)] mb-2">
                    You&apos;re in!
                  </h3>
                  <p className="text-[var(--color-harbor)]">
                    Check your inbox for a welcome email. Your first weekend guide drops Thursday at 7am.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    disabled={status === "loading"}
                    className="w-full px-4 py-3 border border-[var(--muted)]/30 rounded-lg bg-[var(--color-rowhouse)] focus:outline-none focus:ring-2 focus:ring-[var(--color-charm)] focus:border-transparent text-[var(--color-boh)] placeholder:text-[var(--muted)] disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn btn-primary w-full text-lg py-4 disabled:opacity-70"
                  >
                    {status === "loading" ? "Subscribing..." : "Subscribe Free →"}
                  </button>
                  {status === "error" && (
                    <p className="text-red-600 text-sm text-center">
                      {errorMessage}
                    </p>
                  )}
                </form>
              )}

              <p className="text-xs text-[var(--muted)] text-center mt-4">
                No spam. Unsubscribe at any time. Your inbox is sacred.
              </p>
            </div>
          </div>

          {/* What You Get - with crab bullets */}
          <div className="bg-[var(--color-formstone)] rounded-xl p-8">
            <h2 className="font-display text-xl font-bold text-[var(--color-boh)] mb-6 text-center">
              What You&apos;ll Get Every Week
            </h2>
            <ul className="space-y-4 text-[var(--color-harbor)]">
              <li className="flex items-start gap-3">
                <Image
                  src="/brand/icons/crab-bullet.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span><strong className="text-[var(--color-boh)]">Top Pick of the Week</strong> — The one event worth planning around</span>
              </li>
              <li className="flex items-start gap-3">
                <Image
                  src="/brand/icons/crab-bullet.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span><strong className="text-[var(--color-boh)]">Quick Weekend Wins</strong> — Show up, no tickets needed</span>
              </li>
              <li className="flex items-start gap-3">
                <Image
                  src="/brand/icons/crab-bullet.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span><strong className="text-[var(--color-boh)]">Budget-Friendly Finds</strong> — Free and low-cost highlights</span>
              </li>
              <li className="flex items-start gap-3">
                <Image
                  src="/brand/icons/crab-bullet.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span><strong className="text-[var(--color-boh)]">Age-Specific Picks</strong> — Toddler and tween sections</span>
              </li>
              <li className="flex items-start gap-3">
                <Image
                  src="/brand/icons/crab-bullet.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span><strong className="text-[var(--color-boh)]">Book-Ahead Alerts</strong> — Sell-out events flagged early</span>
              </li>
            </ul>
          </div>

          {/* Trust indicators */}
          <div className="mt-10 text-center space-y-2">
            <p className="text-[var(--muted)] text-sm">
              Delivered every Thursday at 7am. 2-minute read.
            </p>
            <p className="text-[var(--color-charm)] text-sm font-medium">
              🦀 Built by a local dad in Baltimore
            </p>
            <p className="text-[var(--muted)] text-xs">
              <a href="/privacy" className="underline hover:text-[var(--color-charm)]">Privacy policy</a> — We never share your email.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
