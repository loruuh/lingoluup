"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t border-white/6 mt-auto">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex justify-center items-center gap-8">
          <Link
            href="/impressum"
            className="text-gray-600 hover:text-gray-300 transition-colors text-xs"
          >
            Impressum
          </Link>
          <Link
            href="/datenschutz"
            className="text-gray-600 hover:text-gray-300 transition-colors text-xs"
          >
            Datenschutz
          </Link>
        </div>
      </div>
    </footer>
  );
}
