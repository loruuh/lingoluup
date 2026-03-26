'use client';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function UpgradeModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  const handleUpgrade = async () => {
    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Checkout API error:', data);
        alert(data.error === 'Unauthorized'
          ? 'Bitte erst einloggen.'
          : `Fehler: ${data.error || 'Unbekannter Fehler'}`
        );
        return;
      }

      if (!data.url) {
        console.error('No checkout URL in response:', data);
        alert('Fehler: Keine Checkout-URL erhalten');
        return;
      }

      window.location.href = data.url;
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Fehler beim Erstellen des Checkouts');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4 animate-fade-in">
      <div className="bg-gray-900 rounded-2xl max-w-md w-full border border-primary/30 shadow-2xl shadow-primary/10 overflow-hidden animate-slide-up">

        {/* Header gradient stripe */}
        <div className="h-1.5 bg-gradient-to-r from-primary via-primary-light to-purple-500" />

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-1 text-white">
            Upgrade zu Advance
          </h2>
          <p className="text-sm text-gray-400 mb-6">Alles freischalten, jederzeit kündbar</p>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-green-500/15 flex items-center justify-center shrink-0">
                <span className="text-lg">✅</span>
              </div>
              <div>
                <div className="font-semibold text-white text-sm">Alle Module freischalten</div>
                <div className="text-xs text-gray-400">Module 2-5, Redewendungen, Zahlen, Tipps</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                <span className="text-lg">🌟</span>
              </div>
              <div>
                <div className="font-semibold text-white text-sm">2000+ Vokabeln</div>
                <div className="text-xs text-gray-400">Erreiche B2-Niveau</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-secondary/15 flex items-center justify-center shrink-0">
                <span className="text-lg">🔓</span>
              </div>
              <div>
                <div className="font-semibold text-white text-sm">Jederzeit kündbar</div>
                <div className="text-xs text-gray-400">Keine Mindestlaufzeit</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/20 to-purple-600/20 border border-primary/30 rounded-xl p-4 mb-5 text-center">
            <div className="text-white text-4xl font-bold">€2.97</div>
            <div className="text-gray-300 text-sm mt-0.5">pro Monat</div>
          </div>

          <button
            onClick={handleUpgrade}
            className="w-full bg-primary hover:bg-primary-dark active:scale-[0.98] text-white py-3.5 rounded-xl font-bold text-base mb-3 transition-all duration-200 shadow-lg shadow-primary/30 hover:shadow-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
          >
            Jetzt upgraden →
          </button>

          <button
            onClick={onClose}
            className="w-full text-gray-500 hover:text-gray-300 py-2 text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-lg"
          >
            Vielleicht später
          </button>
        </div>
      </div>
    </div>
  );
}
