import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--text-dark)] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">
              Baltimore Family Events
            </h3>
            <p className="text-gray-400 text-sm">
              AI-curated family events from 112+ sources across 5 counties.
              Never miss the best activities for your family.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/calendar" className="text-gray-400 hover:text-white transition-colors no-underline hover:no-underline">
                  Event Calendar
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="text-gray-400 hover:text-white transition-colors no-underline hover:no-underline">
                  Newsletter Archive
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors no-underline hover:no-underline">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/subscribe" className="text-gray-400 hover:text-white transition-colors no-underline hover:no-underline">
                  Subscribe
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors no-underline hover:no-underline">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter CTA */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Stay Updated
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Get the best family events delivered to your inbox every week.
            </p>
            <Link
              href="/subscribe"
              className="inline-block bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white font-medium px-4 py-2 rounded-lg transition-colors no-underline hover:no-underline"
            >
              Subscribe Free
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>
            © {currentYear} Baltimore Family Events. Made with ❤️ in Baltimore.
          </p>
        </div>
      </div>
    </footer>
  );
}
