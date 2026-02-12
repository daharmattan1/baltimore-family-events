"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/calendar", label: "Calendar" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[var(--muted)]/20">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Wordmark */}
          <Link href="/" className="flex items-center no-underline hover:no-underline">
            <span className="wordmark text-xl sm:text-2xl">
              <span className="wordmark-bmore">Bmore</span>
              <span className="wordmark-families">Families</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors font-medium no-underline hover:no-underline ${
                  isActive(link.href)
                    ? "text-[var(--primary)]"
                    : "text-[var(--text)] hover:text-[var(--primary)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/subscribe"
              className={`px-4 py-2 rounded-lg font-semibold transition-colors no-underline hover:no-underline ${
                isActive("/subscribe")
                  ? "bg-[var(--accent)] text-white"
                  : "bg-[var(--accent)] text-white hover:bg-[var(--accent)]/90"
              }`}
            >
              Subscribe
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[var(--card)] transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="w-6 h-6 text-[var(--text-dark)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-80 pb-4" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg font-medium no-underline hover:no-underline transition-colors ${
                  isActive(link.href)
                    ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                    : "text-[var(--text)] hover:bg-[var(--card)] hover:text-[var(--primary)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/subscribe"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 px-3 py-2.5 rounded-lg bg-[var(--accent)] text-white font-semibold text-center no-underline hover:no-underline hover:bg-[var(--accent)]/90 transition-colors"
            >
              Subscribe Free
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
