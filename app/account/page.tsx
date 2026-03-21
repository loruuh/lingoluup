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

export default function AccountPage() {
  const { user, loading: authLoading } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);

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
        body: JSON.stringify({
          customerId: subscription.stripe_customer_id,
        }),
      });

      const { url, error } = await response.json();
      if (error) throw new Error(error);
      window.location.href = url;
    } catch {
      setPortalLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-400 text-sm">Lädt...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="text-5xl mb-4">🔒</div>
            <h1 className="text-xl font-bold text-white mb-4">Bitte einloggen</h1>
            <Link
              href="/"
              className="text-primary hover:text-primary-light transition-colors text-sm"
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
        : `Aktiv – erneuert sich am ${formatDate(subscription.expires_at)}`;
    }
    return `Beendet am ${formatDate(subscription.expires_at)}`;
  })();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 py-10">
        <div className="w-full max-w-md space-y-6">
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-sm group"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
            Zurück zu Modulen
          </Link>

          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 md:p-8">
            <h1 className="text-2xl font-bold text-white mb-8 tracking-tight">Mein Account</h1>

            {/* User Info */}
            <div className="mb-7">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                E-Mail
              </h2>
              <p className="text-white font-medium">{user.email}</p>
            </div>

            <div className="h-px bg-white/8 mb-7" />

            {/* Subscription Status */}
            <div className="mb-7">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                Abo-Status
              </h2>
              {isActive ? (
                <div className={`border rounded-xl p-4 ${subscription?.cancel_at_period_end ? 'bg-yellow-950/40 border-yellow-500/30' : 'bg-green-950/40 border-green-500/30'}`}>
                  <p className={`font-semibold text-sm ${subscription?.cancel_at_period_end ? 'text-yellow-400' : 'text-green-400'}`}>
                    ✓ Advance aktiv
                  </p>
                  <p className="text-gray-400 text-sm mt-1 leading-relaxed">{subscriptionStatusText}</p>
                </div>
              ) : (
                <div className="bg-white/[0.04] border border-white/10 rounded-xl p-4">
                  <p className="text-gray-400 text-sm">Kein aktives Abo</p>
                  <Link
                    href="/"
                    className="text-primary text-sm hover:text-primary-light transition-colors mt-2 inline-flex items-center gap-1"
                  >
                    Jetzt upgraden →
                  </Link>
                </div>
              )}
            </div>

            {/* Manage Subscription */}
            {isActive && subscription?.stripe_customer_id && (
              <button
                onClick={handleManageSubscription}
                disabled={portalLoading}
                className="w-full bg-white/8 hover:bg-white/12 border border-white/15 hover:border-white/25 text-white py-3 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {portalLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Lädt...
                  </span>
                ) : 'Abo verwalten / kündigen'}
              </button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
