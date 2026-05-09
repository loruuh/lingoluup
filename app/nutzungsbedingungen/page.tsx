import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Nutzungsbedingungen - LingoLuup',
  robots: { index: false, follow: false },
};

const toc = [
  { id: 'geltung',      label: '§1 Geltungsbereich' },
  { id: 'hinweis',      label: '§2 Wichtiger Hinweis' },
  { id: 'haftung',      label: '§3 Haftungsausschluss' },
  { id: 'verfuegbar',   label: '§4 Verfügbarkeit' },
  { id: 'preise',       label: '§5 Preise & Kündigung' },
  { id: 'widerruf',     label: '§6 Widerrufsrecht' },
  { id: 'aenderungen',  label: '§7 Änderungen' },
  { id: 'recht',        label: '§8 Anwendbares Recht' },
];

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-xs font-bold px-2 py-0.5 rounded-md flex-shrink-0"
      style={{ background: 'rgba(132,204,22,0.15)', color: '#84cc16', border: '1px solid rgba(132,204,22,0.25)' }}
    >
      {children}
    </span>
  );
}

function Section({ id, badge, title, children }: {
  id: string; badge: string; title: string; children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="rounded-2xl p-6 scroll-mt-24"
      style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="flex items-center gap-3 mb-4">
        <Badge>{badge}</Badge>
        <h2 className="text-lg font-bold text-white">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default function NutzungsbedingungenPage() {
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
        <h1 className="text-3xl md:text-4xl font-bold text-white">Nutzungsbedingungen</h1>
        <p className="text-sm text-gray-500 mt-2">Zuletzt aktualisiert: April 2026</p>
      </div>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-10">

        {/* TL;DR Box */}
        <div
          className="rounded-2xl p-5 mb-8"
          style={{ background: 'rgba(132,204,22,0.07)', border: '1px solid rgba(132,204,22,0.25)' }}
        >
          <p className="text-xs font-bold tracking-widest uppercase text-lime-500 mb-2">TL;DR — Kurzfassung</p>
          <ul className="text-sm text-gray-200 space-y-1">
            <li>✅ <strong>Kostenlos:</strong> Module 1–2 vollständig, ~800 Vokabeln, dauerhaft gratis.</li>
            <li>✅ <strong>Premium:</strong> Alle 5 Module (2.600+ Vokabeln) ab 7,99&nbsp;€/Monat — jederzeit kündbar.</li>
            <li>✅ <strong>Lernwerkzeug:</strong> LingoLuup ersetzt keinen professionellen Sprachkurs oder Lehrer.</li>
            <li>✅ <strong>Kein Abo-Zwang:</strong> Kostenloser Plan bleibt immer kostenlos.</li>
          </ul>
        </div>

        <div className="flex gap-8 items-start">

          {/* Sticky TOC */}
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

            <Section id="geltung" badge="§1" title="Geltungsbereich">
              <div className="text-sm text-gray-300 space-y-2 leading-relaxed">
                <p>
                  Diese Nutzungsbedingungen gelten für die Nutzung von <strong className="text-white">LingoLuup</strong>
                  {' '}— einer webbasierten Plattform für Spanisch-Vokabeltraining (Spanish vocabulary learning).
                </p>
                <p>
                  Anbieter ist Sven Bixenstein, Weidenstr. 10, 72145 Hirrlingen (nachfolgend
                  &quot;LingoLuup&quot; oder &quot;wir&quot;).
                </p>
                <p>
                  Mit der Registrierung oder Nutzung von LingoLuup akzeptieren Sie diese
                  Nutzungsbedingungen sowie unsere{' '}
                  <Link href="/datenschutz" className="text-lime-400 hover:underline">Datenschutzerklärung</Link>.
                  Abweichende Bedingungen des Nutzers werden nicht anerkannt.
                </p>
              </div>
            </Section>

            <Section id="hinweis" badge="§2" title="Wichtiger Hinweis — Lernwerkzeug">
              <div
                className="rounded-xl p-4 mb-4"
                style={{ background: 'rgba(132,204,22,0.06)', border: '1px solid rgba(132,204,22,0.22)' }}
              >
                <p className="text-lime-400 font-semibold text-sm mb-2">LingoLuup ist ein Lernwerkzeug</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Die App bietet Vokabeln, Beispielsätze und Audio-Unterstützung zum Selbststudium.
                  LingoLuup <strong>ersetzt keinen</strong> professionellen Sprachkurs, Lehrer oder
                  zertifizierten Sprachunterricht. Es wird keine Garantie für das Erreichen
                  bestimmter Sprachniveaus (A1–C2, DELE, SIELE etc.) übernommen.
                </p>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Die Inhalte (Vokabeln, Beispielsätze, Audioaufnahmen) werden mit größter Sorgfalt
                erstellt. Dennoch können Fehler, veraltete Wendungen oder regionale Unterschiede
                im Spanischen auftreten. Korrekturen nehmen wir gerne per E-Mail entgegen.
              </p>
            </Section>

            <Section id="haftung" badge="§3" title="Haftungsausschluss">
              <div className="text-sm text-gray-300 space-y-3 leading-relaxed">
                <p>Die Nutzung von LingoLuup erfolgt eigenverantwortlich.</p>
                <p>LingoLuup übernimmt keine Gewähr für:</p>
                <ul className="space-y-1.5 ml-2">
                  {[
                    'Vollständigkeit der Vokabelsammlung (derzeit ~2.600 Einträge)',
                    'Korrektheit aller Übersetzungen und Beispielsätze',
                    'Eignung für spezifische Prüfungen (DELE, SIELE, telc Español etc.)',
                    'Garantierten Lernerfolg oder messbaren Sprachfortschritt',
                    'Unterbrechungsfreie Verfügbarkeit der Plattform (siehe §4)',
                  ].map((item) => (
                    <li key={item} className="flex gap-2 text-gray-400">
                      <span className="text-lime-500 flex-shrink-0 mt-0.5">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-gray-400">
                  Die Haftung für Vorsatz und grobe Fahrlässigkeit sowie für die Verletzung von Leben,
                  Körper und Gesundheit bleibt unberührt. Im Übrigen ist die Haftung auf den
                  vorhersehbaren, vertragstypischen Schaden begrenzt.
                </p>
              </div>
            </Section>

            <Section id="verfuegbar" badge="§4" title="Verfügbarkeit">
              <div className="text-sm text-gray-300 space-y-2 leading-relaxed">
                <p>
                  Wir bemühen uns um eine möglichst hohe Verfügbarkeit von LingoLuup. Es besteht
                  jedoch kein Anspruch auf unterbrechungsfreien Betrieb.
                </p>
                <p className="text-gray-400">
                  Wartungsarbeiten, Updates und technische Störungen können die Verfügbarkeit
                  zeitweise einschränken. Planmäßige Wartungsfenster werden nach Möglichkeit
                  vorab angekündigt. LingoLuup haftet nicht für Ausfälle, die auf Drittanbieter
                  (Vercel, Supabase) zurückzuführen sind.
                </p>
              </div>
            </Section>

            <Section id="preise" badge="§5" title="Geschäftsmodell & Preise">
              <div className="text-sm text-gray-300 space-y-4 leading-relaxed">

                <div>
                  <h3 className="font-semibold text-white mb-2">5.1 Tarife</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div
                      className="rounded-xl p-4"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      <p className="font-bold text-white mb-1">Kostenlos</p>
                      <p className="text-gray-400 text-xs">Module 1–2, ~800 Vokabeln</p>
                      <p className="text-lime-400 font-bold mt-2">0&nbsp;€ — dauerhaft</p>
                    </div>
                    <div
                      className="rounded-xl p-4"
                      style={{ background: 'rgba(132,204,22,0.06)', border: '1px solid rgba(132,204,22,0.25)' }}
                    >
                      <p className="font-bold text-white mb-1">Premium</p>
                      <p className="text-gray-400 text-xs">Alle 5 Module, 2.600+ Vokabeln</p>
                      <p className="text-lime-400 font-bold mt-2">7,99&nbsp;€/Monat</p>
                      <p className="text-gray-500 text-xs">oder ~84&nbsp;€/Jahr (unter 7&nbsp;€/Monat)</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">5.2 Vertragslaufzeit & Kündigung</h3>
                  <ul className="space-y-1 text-gray-400">
                    <li>• Mindestlaufzeit: keine</li>
                    <li>• Kündigung: jederzeit zum Ende des laufenden Abrechnungszeitraums</li>
                    <li>• Nach Kündigung: weiterhin Zugang bis Periodenende</li>
                    <li>• Kündigung über das Kundenportal (Stripe) oder per E-Mail</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">5.3 Zahlung</h3>
                  <p className="text-gray-400">
                    Zahlung über Stripe (Kreditkarte, SEPA-Lastschrift). Abrechnung monatlich oder
                    jährlich im Voraus. Alle Preise inkl. gesetzlicher MwSt.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">5.4 Preisänderungen</h3>
                  <p className="text-gray-400">
                    Preisänderungen werden mindestens 30 Tage vor Inkrafttreten per E-Mail angekündigt.
                    Bei wesentlichen Preiserhöhungen haben Sie ein außerordentliches Kündigungsrecht
                    zum Zeitpunkt des Inkrafttretens.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">5.5 Außerordentliche Kündigung</h3>
                  <p className="text-gray-400">
                    Wir behalten uns vor, Accounts bei schwerwiegenden Verstößen gegen diese
                    Nutzungsbedingungen (z.&nbsp;B. Missbrauch, Reverse Engineering) mit sofortiger
                    Wirkung zu sperren. In diesem Fall erstatten wir den anteiligen Betrag für
                    nicht genutzte Vorauszahlungszeiträume.
                  </p>
                </div>
              </div>
            </Section>

            <Section id="widerruf" badge="§6" title="Widerrufsrecht">
              <div className="text-sm text-gray-300 space-y-4 leading-relaxed">

                <div>
                  <h3 className="font-semibold text-white mb-2">6.1 Widerrufsfrist</h3>
                  <p className="text-gray-400">
                    Sie haben das Recht, binnen 14 Tagen ohne Angabe von Gründen diesen Vertrag zu
                    widerrufen. Die Widerrufsfrist beträgt 14 Tage ab dem Tag des Vertragsabschlusses.
                    Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (Sven Bixenstein,
                    sven.bixenstein@gmail.com) mittels einer eindeutigen Erklärung (z.&nbsp;B. per E-Mail)
                    über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">6.2 Vorzeitiges Erlöschen des Widerrufsrechts</h3>
                  <div
                    className="rounded-lg p-3"
                    style={{ background: 'rgba(132,204,22,0.06)', border: '1px solid rgba(132,204,22,0.20)' }}
                  >
                    <p className="text-gray-300 text-xs leading-relaxed">
                      Das Widerrufsrecht erlischt vorzeitig, wenn wir mit der Ausführung des Vertrags
                      begonnen haben, nachdem Sie ausdrücklich zugestimmt haben, dass wir vor Ablauf der
                      Widerrufsfrist mit der Ausführung beginnen, und Sie Ihre Kenntnis davon bestätigt
                      haben, dass Sie durch Ihre Zustimmung mit Beginn der Ausführung des Vertrags Ihr
                      Widerrufsrecht verlieren (§ 356 Abs. 5 BGB). Diese Zustimmung erteilen Sie
                      beim Checkout durch Aktivierung der entsprechenden Checkbox.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">6.3 Muster-Widerrufsformular</h3>
                  <div
                    className="rounded-xl p-4 text-xs"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', fontFamily: 'monospace' }}
                  >
                    <p className="text-gray-300 whitespace-pre-line leading-relaxed">{`An: Sven Bixenstein, Weidenstr. 10, 72145 Hirrlingen
E-Mail: sven.bixenstein@gmail.com

Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen
Vertrag über den Kauf der folgenden Dienstleistung (*):

Bestellt am (*): _______________
Name: _______________
Adresse: _______________
Datum: _______________

(*) Unzutreffendes streichen.`}</p>
                  </div>
                </div>

              </div>
            </Section>

            <Section id="aenderungen" badge="§7" title="Änderungen der Nutzungsbedingungen">
              <div className="text-sm text-gray-300 space-y-2 leading-relaxed">
                <p>
                  Wir behalten uns vor, diese Nutzungsbedingungen zu ändern. Änderungen werden
                  mindestens <strong className="text-white">6 Wochen</strong> vor Inkrafttreten
                  per E-Mail angekündigt.
                </p>
                <p className="text-gray-400">
                  Wenn Sie den Änderungen nicht zustimmen, können Sie Ihren Account bis zum
                  Inkrafttreten kündigen. Die weitere Nutzung nach Inkrafttreten gilt als Zustimmung.
                </p>
              </div>
            </Section>

            <Section id="recht" badge="§8" title="Anwendbares Recht & Gerichtsstand">
              <div className="text-sm text-gray-300 space-y-2 leading-relaxed">
                <p>
                  Es gilt ausschließlich deutsches Recht unter Ausschluss des UN-Kaufrechts (CISG).
                </p>
                <p className="text-gray-400">
                  Gerichtsstand für Kaufleute und Unternehmen ist Tübingen. Für Verbraucher gelten
                  die gesetzlichen Gerichtsstandsregelungen. Auf die EU-Streitbeilegungsplattform
                  ({' '}
                  <a
                    href="https://ec.europa.eu/consumers/odr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lime-400 hover:underline"
                  >
                    https://ec.europa.eu/consumers/odr/
                  </a>
                  ) wird hingewiesen. Wir nehmen an Schlichtungsverfahren nicht teil.
                </p>
                <p className="text-gray-400">
                  Sollten einzelne Bestimmungen dieser Nutzungsbedingungen unwirksam sein, bleibt
                  die Wirksamkeit der übrigen Bestimmungen unberührt.
                </p>
              </div>
            </Section>

            <p className="text-[11px] text-gray-700 text-center pt-2">
              Stand: April 2026 — Sven Bixenstein, Hirrlingen
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
