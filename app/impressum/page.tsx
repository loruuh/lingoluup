import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Impressum - LingoLuup',
  robots: { index: false, follow: false },
};

const toc = [
  { id: 'angaben', label: '§1 Angaben gemäß DDG' },
  { id: 'kontakt', label: '§2 Kontakt' },
  { id: 'verantwortlich', label: '§3 Verantwortlich' },
  { id: 'streit', label: '§4 Streitschlichtung' },
];

export default function ImpressumPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0d1117' }}>
      <Header />

      {/* Hero */}
      <div
        className="py-10 px-4 text-center border-b border-white/[0.06]"
        style={{ background: 'linear-gradient(135deg, rgba(132,204,22,0.08) 0%, transparent 60%)' }}
      >
        <div
          className="inline-block text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
          style={{ background: 'rgba(132,204,22,0.12)', border: '1px solid rgba(132,204,22,0.25)', color: '#84cc16' }}
        >
          Rechtliches
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white">Impressum</h1>
        <p className="text-sm text-gray-500 mt-2">Angaben gemäß § 5 DDG</p>
      </div>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-10">
        <div className="flex gap-8 items-start">

          {/* Sticky TOC — desktop only */}
          <aside className="hidden lg:block w-52 flex-shrink-0 sticky top-20">
            <div
              className="rounded-xl p-4 text-sm"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(132,204,22,0.15)' }}
            >
              <p className="text-[10px] font-bold tracking-widest uppercase text-lime-500 mb-3">Inhalt</p>
              <ul className="space-y-2">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-gray-400 hover:text-lime-400 transition-colors text-xs leading-tight block"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-3 border-t border-white/[0.06]">
                <Link href="/" className="text-xs text-gray-600 hover:text-lime-500 transition-colors">
                  ← Zurück
                </Link>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-4">

            {/* §1 */}
            <section
              id="angaben"
              className="rounded-2xl p-6 scroll-mt-24"
              style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-md flex-shrink-0"
                  style={{ background: 'rgba(132,204,22,0.15)', color: '#84cc16', border: '1px solid rgba(132,204,22,0.25)' }}
                >
                  §1
                </span>
                <h2 className="text-lg font-bold text-white">Angaben gemäß § 5 DDG</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Sven Bixenstein<br />
                Weidenstr. 10<br />
                72145 Hirrlingen<br />
                Deutschland
              </p>
            </section>

            {/* §2 */}
            <section
              id="kontakt"
              className="rounded-2xl p-6 scroll-mt-24"
              style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-md flex-shrink-0"
                  style={{ background: 'rgba(132,204,22,0.15)', color: '#84cc16', border: '1px solid rgba(132,204,22,0.25)' }}
                >
                  §2
                </span>
                <h2 className="text-lg font-bold text-white">Kontakt</h2>
              </div>
              <p className="text-gray-300">
                E-Mail:{' '}
                <a href="mailto:sven.bixenstein@gmail.com" className="text-lime-400 hover:underline">
                  sven.bixenstein@gmail.com
                </a>
              </p>
            </section>

            {/* §3 */}
            <section
              id="verantwortlich"
              className="rounded-2xl p-6 scroll-mt-24"
              style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-md flex-shrink-0"
                  style={{ background: 'rgba(132,204,22,0.15)', color: '#84cc16', border: '1px solid rgba(132,204,22,0.25)' }}
                >
                  §3
                </span>
                <h2 className="text-lg font-bold text-white">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Sven Bixenstein<br />
                Weidenstr. 10<br />
                72145 Hirrlingen
              </p>
            </section>

            {/* §4 */}
            <section
              id="streit"
              className="rounded-2xl p-6 scroll-mt-24"
              style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-md flex-shrink-0"
                  style={{ background: 'rgba(132,204,22,0.15)', color: '#84cc16', border: '1px solid rgba(132,204,22,0.25)' }}
                >
                  §4
                </span>
                <h2 className="text-lg font-bold text-white">Streitschlichtung</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-3">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lime-400 hover:underline"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p className="text-gray-400 leading-relaxed">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

            {/* Haftung für Inhalte */}
            <section
              className="rounded-2xl p-6"
              style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <h3 className="text-sm font-semibold text-gray-400 mb-2">Haftung für Inhalte</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten
                nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
                Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
                Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
                Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
              </p>
              <h3 className="text-sm font-semibold text-gray-400 mt-4 mb-2">Haftung für Links</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
                Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder
                Betreiber verantwortlich. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist
                ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar.
              </p>
              <h3 className="text-sm font-semibold text-gray-400 mt-4 mb-2">Urheberrecht</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
                deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung
                des jeweiligen Autors bzw. Erstellers.
              </p>
            </section>

            <p className="text-[11px] text-gray-700 text-center pt-2">
              Stand: April 2026
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
