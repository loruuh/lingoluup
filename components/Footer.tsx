"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t border-white/[0.06] mt-auto">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
          <Link
            href="/impressum"
            className="text-gray-600 hover:text-lime-500 transition-colors text-xs"
          >
            Impressum
          </Link>
          <span className="text-gray-700 text-xs">·</span>
          <Link
            href="/datenschutz"
            className="text-gray-600 hover:text-lime-500 transition-colors text-xs"
          >
            Datenschutz
          </Link>
          <span className="text-gray-700 text-xs">·</span>
          <Link
            href="/nutzungsbedingungen"
            className="text-gray-600 hover:text-lime-500 transition-colors text-xs"
          >
            Nutzungsbedingungen
          </Link>
        </div>
      </div>
    </footer>
  );
}
