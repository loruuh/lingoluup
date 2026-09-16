'use client';

import { useAuth } from '@/lib/useAuth';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function Avatar({ email }: { email: string }) {
  const initials = email
    .split('@')[0]
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg shadow-primary/25 shrink-0">
      <span className="text-white text-xl font-bold">{initials}</span>
    </div>
  );
}

export default function AccountPage() {
  const { user, loading: authLoading } = useAuth();
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogout = async () => {
    setLogoutLoading(true);
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  // ── Loading state ──────────────────────────────────────
  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500 text-sm">Lädt...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ── Not logged in ──────────────────────────────────────
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-4xl">
              🔒
            </div>
            <div>
              <h1 className="text-xl font-bold text-white mb-1">Bitte einloggen</h1>
              <p className="text-gray-500 text-sm">Du musst eingeloggt sein, um deinen Account zu sehen.</p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-primary hover:text-primary-light transition-colors text-sm"
            >
              ← Zurück zur Startseite
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-4 py-10">
        <div className="max-w-md mx-auto space-y-5">

          {/* ── Back link ── */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors text-sm group"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
            Zurück zu Modulen
          </Link>

          {/* ── User card ── */}
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden">

            {/* Header stripe */}
            <div className="h-1 bg-gradient-to-r from-primary via-primary-light to-purple-500" />

            <div className="p-6">
              {/* Avatar + email row */}
              <div className="flex items-center gap-4">
                <Avatar email={user.email ?? 'U'} />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Account</p>
                  <p className="text-white font-medium text-sm truncate">{user.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Logout card ── */}
          <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm font-medium">Ausloggen</p>
                <p className="text-gray-600 text-xs mt-0.5">Von diesem Gerät abmelden</p>
              </div>
              <button
                onClick={handleLogout}
                disabled={logoutLoading}
                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 text-red-400 text-sm font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {logoutLoading ? (
                  <span className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                    Lädt...
                  </span>
                ) : 'Ausloggen'}
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
