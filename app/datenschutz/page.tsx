import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung - LingoLuup',
  robots: { index: false, follow: false },
};

const toc = [
  { id: 'ueberblick',    label: '§1 Auf einen Blick' },
  { id: 'verantwortl',   label: '§2 Verantwortlicher' },
  { id: 'hosting',       label: '§3 Hosting & Datenspeicherung' },
  { id: 'daten',         label: '§4 Erhobene Daten' },
  { id: 'stripe',        label: '§5 Zahlungsdienstleister' },
  { id: 'dritte',        label: '§6 Weitergabe an Dritte' },
  { id: 'rechte',        label: '§7 Ihre Rechte' },
  { id: 'cookies',       label: '§8 Cookies' },
  { id: 'sicherheit',    label: '§9 Datensicherheit' },
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

function ProviderCard({ name, address, privacy }: { name: string; address: string; privacy: string }) {
  return (
    <div
      className="rounded-xl p-4 mt-3"
      style={{ background: 'rgba(132,204,22,0.04)', border: '1px solid rgba(132,204,22,0.15)' }}
    >
      <p className="text-sm font-semibold text-lime-400 mb-1">{name}</p>
      <p className="text-xs text-gray-400 leading-relaxed">{address}</p>
      <a
        href={privacy}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-lime-500 hover:underline mt-1 inline-block"
      >
        Datenschutzerklärung →
      </a>
    </div>
  );
}

export default function DatenschutzPage() {
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
        <h1 className="text-3xl md:text-4xl font-bold text-white">Datenschutzerklärung</h1>
        <p className="text-sm text-gray-500 mt-2">Zuletzt aktualisiert: April 2026</p>
      </div>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-10">
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

            <Section id="ueberblick" badge="§1" title="Datenschutz auf einen Blick">
              <div className="space-y-3 text-gray-300 text-sm leading-relaxed">
                <p>
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
                  personenbezogenen Daten passiert, wenn Sie LingoLuup nutzen.
                </p>
                <p>
                  <span className="font-semibold text-white">Welche Daten erfassen wir?</span><br />
                  Bei der Registrierung: E-Mail-Adresse. Bei der Nutzung: Lernfortschritt,
                  gespeicherte Vokabeln (Vokabelheft), Abo-Status. Bei Zahlung: Stripe verarbeitet
                  Zahlungsdaten direkt — wir speichern keine Kartendaten.
                </p>
                <p>
                  <span className="font-semibold text-white">Wofür nutzen wir die Daten?</span><br />
                  Ausschließlich zur Bereitstellung der Lernplattform, Ihrer persönlichen Statistiken
                  und der Premium-Zahlungsabwicklung.
                </p>
                <p>
                  <span className="font-semibold text-white">Welche Rechte haben Sie?</span><br />
                  Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit,
                  Widerspruch — jederzeit per E-Mail an{' '}
                  <a href="mailto:sven.bixenstein@gmail.com" className="text-lime-400 hover:underline">
                    sven.bixenstein@gmail.com
                  </a>.
                </p>
              </div>
            </Section>

            <Section id="verantwortl" badge="§2" title="Verantwortlicher">
              <p className="text-gray-300 text-sm leading-relaxed">
                Verantwortlicher im Sinne der DSGVO:<br /><br />
                <strong className="text-white">Sven Bixenstein</strong><br />
                Weidenstr. 10<br />
                72145 Hirrlingen<br />
                Deutschland<br /><br />
                E-Mail:{' '}
                <a href="mailto:sven.bixenstein@gmail.com" className="text-lime-400 hover:underline">
                  sven.bixenstein@gmail.com
                </a>
              </p>
            </Section>

            <Section id="hosting" badge="§3" title="Hosting & Datenspeicherung">
              <p className="text-gray-300 text-sm leading-relaxed mb-2">
                Wir setzen folgende Dienstleister ein:
              </p>

              <ProviderCard
                name="Vercel (Hosting)"
                address="Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA. Vercel hostet die LingoLuup-Webanwendung. Datenverarbeitung auf Servern in den USA; Vercel ist unter dem EU-US Data Privacy Framework zertifiziert."
                privacy="https://vercel.com/legal/privacy-policy"
              />

              <ProviderCard
                name="Supabase (Datenbank & Authentifizierung)"
                address="Supabase Inc., 970 Toa Payoh North, #07-04, Singapur 318992. Speicherung von Nutzerkonten, Lernfortschritt und Vokabelheft-Daten. Empfohlene Region: eu-central-1 (Frankfurt, Deutschland). Supabase-Projekt-ID: [SUPABASE_PROJEKT_ID — im Dashboard unter Settings → General einsehbar]."
                privacy="https://supabase.com/privacy"
              />

              <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) sowie
                Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an sicherem Betrieb der Plattform).
              </p>
            </Section>

            <Section id="daten" badge="§4" title="Erhobene Daten">
              <div className="space-y-4 text-sm text-gray-300">
                <div>
                  <h3 className="font-semibold text-white mb-1">Bei der Registrierung</h3>
                  <ul className="space-y-1 text-gray-400">
                    <li>• E-Mail-Adresse (Pflichtfeld für Account-Erstellung)</li>
                    <li>• Passwort (verschlüsselt gespeichert — kein Klartext)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Bei der Nutzung</h3>
                  <ul className="space-y-1 text-gray-400">
                    <li>• Vokabelheft-Einträge (favorisierte Vokabeln)</li>
                    <li>• Lernfortschritt & Statistiken (täglich gelernte Vokabeln)</li>
                    <li>• Ausgewähltes Modul & Subscription-Status</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Technische Daten (automatisch)</h3>
                  <ul className="space-y-1 text-gray-400">
                    <li>• IP-Adresse (Serverlog Vercel, kurzfristig)</li>
                    <li>• Browser-Typ & Betriebssystem</li>
                    <li>• Zugriffszeitpunkt</li>
                  </ul>
                </div>
                <div
                  className="rounded-lg p-3 text-xs"
                  style={{ background: 'rgba(132,204,22,0.06)', border: '1px solid rgba(132,204,22,0.20)' }}
                >
                  <strong className="text-lime-400">Was wir NICHT speichern:</strong>
                  <span className="text-gray-400"> Kreditkartendaten, Dateien, Profilbilder.</span>
                </div>
                <p className="text-gray-400">
                  Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) für Account- und
                  Lerndaten; Art. 6 Abs. 1 lit. f DSGVO für technische Logs.
                </p>
              </div>
            </Section>

            <Section id="stripe" badge="§5" title="Zahlungsdienstleister (Stripe)">
              <div className="text-sm text-gray-300 space-y-3">
                <p>
                  Für die Abwicklung von Premium-Abonnements (7,99&nbsp;€/Monat) nutzen wir{' '}
                  <strong className="text-white">Stripe</strong>.
                </p>
                <ProviderCard
                  name="Stripe Payments Europe Ltd."
                  address="Stripe Payments Europe Ltd., 1 Grand Canal Street Lower, Grand Canal Dock, Dublin D02 H210, Irland (EU-Niederlassung)"
                  privacy="https://stripe.com/privacy"
                />
                <p className="text-gray-400 leading-relaxed">
                  Stripe verarbeitet Ihre Zahlungsdaten (Kreditkarten-, SEPA- oder PayPal-Daten)
                  direkt und eigenständig. Wir erhalten von Stripe ausschließlich eine Transaktions-ID
                  und den Zahlungsstatus — keine Kartendaten.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Zur Betrugsprävention kann Stripe Ihr Verhalten auf unserer Website analysieren
                  (Stripe.js). Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) und
                  Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse: Zahlungssicherheit).
                </p>
                <p className="text-gray-400">
                  Stripe ist unter dem EU-US Data Privacy Framework zertifiziert (Daten können in
                  die USA übermittelt werden).
                </p>
              </div>
            </Section>

            <Section id="dritte" badge="§6" title="Weitergabe an Dritte">
              <div className="text-sm text-gray-300 space-y-3">
                <p>Wir geben Ihre Daten ausschließlich an folgende Dienstleister weiter:</p>

                <div className="space-y-2">
                  {[
                    { name: '6.1 Vercel', desc: 'Hosting — technischer Betrieb der Plattform' },
                    { name: '6.2 Supabase', desc: 'Datenbank — Speicherung von Account- und Lerndaten' },
                    { name: '6.3 Stripe', desc: 'Zahlungsabwicklung — ausschließlich bei Premium-Kauf' },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="flex gap-3 p-3 rounded-lg"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <span className="text-lime-400 font-semibold text-xs w-28 flex-shrink-0">{item.name}</span>
                      <span className="text-gray-400 text-xs">{item.desc}</span>
                    </div>
                  ))}
                </div>

                {/* Placeholder for analytics */}
                {/* Add analytics section here if Microsoft Clarity or Google Analytics is used */}

                <p className="text-gray-400 leading-relaxed">
                  Eine Weitergabe an weitere Dritte, insbesondere zu Werbezwecken, findet nicht statt.
                  Eine Übermittlung an Behörden erfolgt nur bei gesetzlicher Verpflichtung.
                </p>
              </div>
            </Section>

            <Section id="rechte" badge="§7" title="Ihre Rechte">
              <div className="text-sm text-gray-300 space-y-3">
                <p>Sie haben gegenüber uns folgende Rechte (Art. 15–22 DSGVO):</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    { r: 'Auskunft', d: 'Art. 15 DSGVO — welche Daten wir über Sie speichern' },
                    { r: 'Berichtigung', d: 'Art. 16 DSGVO — Korrektur unrichtiger Daten' },
                    { r: 'Löschung', d: 'Art. 17 DSGVO — vollständige Account-Löschung' },
                    { r: 'Einschränkung', d: 'Art. 18 DSGVO — eingeschränkte Verarbeitung' },
                    { r: 'Datenübertragbarkeit', d: 'Art. 20 DSGVO — Export Ihrer Daten' },
                    { r: 'Widerspruch', d: 'Art. 21 DSGVO — gegen berechtigtes Interesse' },
                  ].map((item) => (
                    <div
                      key={item.r}
                      className="p-3 rounded-lg"
                      style={{ background: 'rgba(132,204,22,0.04)', border: '1px solid rgba(132,204,22,0.12)' }}
                    >
                      <p className="font-semibold text-lime-400 text-xs">{item.r}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{item.d}</p>
                    </div>
                  ))}
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Anfragen richten Sie bitte an:{' '}
                  <a href="mailto:sven.bixenstein@gmail.com" className="text-lime-400 hover:underline">
                    sven.bixenstein@gmail.com
                  </a>
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Sie haben außerdem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.
                  Zuständig ist der Landesbeauftragte für den Datenschutz und die Informationsfreiheit
                  Baden-Württemberg (LfDI BW), Königstraße 10a, 70173 Stuttgart.
                </p>
              </div>
            </Section>

            <Section id="cookies" badge="§8" title="Cookies">
              <div className="text-sm text-gray-300 space-y-3">
                {/* Variante A - Nur technisch notwendige Cookies */}
                <div
                  className="rounded-lg p-3"
                  style={{ background: 'rgba(132,204,22,0.06)', border: '1px solid rgba(132,204,22,0.20)' }}
                >
                  <p className="text-lime-400 font-semibold text-xs mb-1">Nur technisch notwendige Cookies</p>
                  <p className="text-gray-300 text-xs">
                    Wir setzen ausschließlich technisch notwendige Cookies ein — insbesondere
                    ein Session-Cookie für die Authentifizierung (Supabase). Es werden keine
                    Tracking- oder Werbe-Cookies eingesetzt. Eine Einwilligung ist dafür nicht erforderlich
                    (§ 25 Abs. 2 TDDDG).
                  </p>
                </div>
                {/* If analytics is added later, replace with Variante B and implement cookie banner */}
                <p className="text-gray-400">
                  Sie können Cookies in Ihrem Browser deaktivieren. Die Kernanwendung (Login,
                  Lernfortschritt) funktioniert jedoch nur mit aktivierten Session-Cookies.
                </p>
              </div>
            </Section>

            <Section id="sicherheit" badge="§9" title="Datensicherheit">
              <div className="text-sm text-gray-300 space-y-3">
                <p className="text-gray-400 leading-relaxed">
                  Diese Website nutzt HTTPS (TLS-Verschlüsselung) für alle Datenübertragungen.
                  Passwörter werden ausschließlich als Bcrypt-Hash gespeichert — kein Klartext.
                  Supabase verwendet Row-Level Security (RLS), sodass Nutzer ausschließlich auf
                  ihre eigenen Daten zugreifen können.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Trotz technischer und organisatorischer Maßnahmen kann keine absolute Sicherheit
                  der Datenübertragung im Internet garantiert werden.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Speicherdauer: Ihre Daten werden gespeichert, solange Ihr Account besteht. Nach
                  Account-Löschung werden alle personenbezogenen Daten innerhalb von 30 Tagen entfernt,
                  sofern keine gesetzliche Aufbewahrungspflicht entgegensteht.
                </p>
              </div>
            </Section>

            <p className="text-[11px] text-gray-700 text-center pt-2">
              Stand: April 2026 — Diese Erklärung kann bei Änderungen der Dienste aktualisiert werden.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
