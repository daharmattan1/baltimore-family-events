import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[var(--color-boh)] text-white overflow-hidden">
      {/* Row House Silhouette Divider */}
      <div className="absolute top-0 left-0 right-0 h-20 overflow-hidden opacity-20">
        <Image
          src="/brand/dividers/rowhouse-silhouette.svg"
          alt=""
          fill
          className="object-cover object-bottom"
          aria-hidden="true"
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="wordmark text-xl mb-4">
              <span className="text-white">Bmore</span>
              <span className="text-[var(--color-crab)]">Families</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              AI-curated family events from 310+ sources across 5 counties.
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
                <Link href="/calendar" className="text-gray-400 hover:text-[var(--color-crab)] transition-colors duration-drift no-underline hover:no-underline">
                  Event Calendar
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="text-gray-400 hover:text-[var(--color-crab)] transition-colors duration-drift no-underline hover:no-underline">
                  Newsletter Archive
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-[var(--color-crab)] transition-colors duration-drift no-underline hover:no-underline">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/subscribe" className="text-gray-400 hover:text-[var(--color-crab)] transition-colors duration-drift no-underline hover:no-underline">
                  Subscribe
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-[var(--color-crab)] transition-colors duration-drift no-underline hover:no-underline">
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
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Get the best family events delivered to your inbox every week.
            </p>
            <Link
              href="/subscribe"
              className="btn btn-primary inline-flex"
            >
              Subscribe Free
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>
            © {currentYear} Bmore Families. Made with 🦀 in Baltimore.
          </p>
        </div>
      </div>
    </footer>
  );
}
