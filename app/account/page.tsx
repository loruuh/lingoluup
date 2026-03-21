'use client';

import { useAuth } from '@/lib/useAuth';
import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Subscription {
  status: string;
  stripe_customer_id: string;
  expires_at: string;
  cancel_at_period_end?: boolean;
}

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
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    supabase
      .from('subscriptions')
      .select('status, stripe_customer_id, expires_at, cancel_at_period_end')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .maybeSingle()
      .then(({ data }) => {
        setSubscription(data);
        setLoading(false);
      });
  }, [user]);

  const handleManageSubscription = async () => {
    if (!subscription?.stripe_customer_id) return;
    setPortalLoading(true);

    try {
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: subscription.stripe_customer_id }),
      });

      const { url, error } = await response.json();
      if (error) throw new Error(error);
      window.location.href = url;
    } catch {
      setPortalLoading(false);
    }
  };

  const handleLogout = async () => {
    setLogoutLoading(true);
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  // ── Loading state ──────────────────────────────────────
  if (authLoading || loading) {
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

  const isActive = subscription?.status === 'active' &&
    new Date(subscription.expires_at) > new Date();

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('de-DE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  const subscriptionStatusText = (() => {
    if (!subscription) return null;
    if (subscription.status === 'active' && isActive) {
      return subscription.cancel_at_period_end
        ? `Gekündigt – läuft bis ${formatDate(subscription.expires_at)}`
        : `Erneuert sich am ${formatDate(subscription.expires_at)}`;
    }
    return `Beendet am ${formatDate(subscription.expires_at)}`;
  })();

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
              <div className="flex items-center gap-4 mb-6">
                <Avatar email={user.email ?? 'U'} />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Account</p>
                  <p className="text-white font-medium text-sm truncate">{user.email}</p>
                  {isActive && (
                    <span className="inline-flex items-center gap-1 mt-1.5 text-xs font-semibold text-green-400 bg-green-400/10 border border-green-400/20 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      Advance
                    </span>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/8 mb-6" />

              {/* Subscription section */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Abo-Status</p>

                {isActive ? (
                  <div className={`rounded-xl p-4 border ${
                    subscription?.cancel_at_period_end
                      ? 'bg-yellow-950/30 border-yellow-500/25'
                      : 'bg-green-950/30 border-green-500/25'
                  }`}>
                    <div className="flex items-start gap-3">
                      <span className="text-xl mt-0.5">
                        {subscription?.cancel_at_period_end ? '⏳' : '✅'}
                      </span>
                      <div>
                        <p className={`font-semibold text-sm ${
                          subscription?.cancel_at_period_end ? 'text-yellow-400' : 'text-green-400'
                        }`}>
                          Advance aktiv
                        </p>
                        <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                          {subscriptionStatusText}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/[0.03] border border-white/8 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-xl mt-0.5">🔓</span>
                      <div>
                        <p className="text-gray-300 text-sm font-medium">Free Plan</p>
                        <p className="text-gray-500 text-xs mt-0.5">Nur Modul 1 verfügbar</p>
                        <Link
                          href="/"
                          className="inline-flex items-center gap-1 text-primary text-xs font-semibold mt-2 hover:text-primary-light transition-colors"
                        >
                          Auf Advance upgraden →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Manage subscription button */}
              {isActive && subscription?.stripe_customer_id && (
                <>
                  <div className="h-px bg-white/8 mb-5" />
                  <button
                    onClick={handleManageSubscription}
                    disabled={portalLoading}
                    className="w-full bg-white/6 hover:bg-white/10 border border-white/12 hover:border-white/22 text-white py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {portalLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Lädt...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Abo verwalten / kündigen
                      </span>
                    )}
                  </button>
                </>
              )}
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
