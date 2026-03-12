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
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl max-w-md w-full p-6 border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-white">
          Upgrade zu Advance
        </h2>

        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">✅</span>
            <div>
              <div className="font-semibold text-white">Alle Module freischalten</div>
              <div className="text-sm text-gray-400">Module 2-5, Redewendungen, Zahlen, Tipps</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <div className="font-semibold text-white">2000+ Vokabeln</div>
              <div className="text-sm text-gray-400">Erreiche B2-Niveau</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-2xl">❌</span>
            <div>
              <div className="font-semibold text-white">Jederzeit kündbar</div>
              <div className="text-sm text-gray-400">Keine Mindestlaufzeit</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-4 mb-6 text-center">
          <div className="text-white text-3xl font-bold">€2.97</div>
          <div className="text-white text-sm">pro Monat</div>
        </div>

        <button
          onClick={handleUpgrade}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg mb-3"
        >
          Jetzt upgraden →
        </button>

        <button
          onClick={onClose}
          className="w-full text-gray-400 hover:text-white py-2"
        >
          Vielleicht später
        </button>
      </div>
    </div>
  );
}
