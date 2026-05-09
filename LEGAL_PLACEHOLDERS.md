# LingoLuup — Rechtliche Seiten: Offene Platzhalter

Diese Datei listet alle Stellen, die vor dem offiziellen Launch ausgefüllt werden müssen.
Die persönlichen Daten (Name, Adresse, E-Mail) sind bereits in allen 3 Seiten eingetragen.

---

## Status

| Seite | Persönliche Daten | Fertig? |
|-------|------------------|---------|
| /impressum | Sven Bixenstein, Weidenstr. 10, 72145 Hirrlingen | ✅ |
| /datenschutz | Sven Bixenstein, sven.bixenstein@gmail.com | ✅ |
| /nutzungsbedingungen | Sven Bixenstein, Hirrlingen | ✅ |

---

## Noch ausstehend

### Supabase (Datenschutz §3)

In `app/datenschutz/page.tsx` befindet sich folgender Platzhalter:

```
Supabase-Projekt-ID: [SUPABASE_PROJEKT_ID — im Dashboard unter Settings → General einsehbar]
```

**So findest du sie:**
1. Öffne https://supabase.com/dashboard
2. Wähle dein Projekt
3. Gehe zu Settings → General
4. Kopiere die "Reference ID" (z. B. `abcdefghijklmnop`)

**Empfohlene Region:** eu-central-1 (Frankfurt, Deutschland)
Prüfe in Supabase Dashboard → Settings → General → "Region"

---

### Wenn du später Analytics hinzufügst

#### Microsoft Clarity oder Google Analytics
Wenn du ein Analyse-Tool einbindest:

1. In `app/datenschutz/page.tsx`: Kommentar `{/* Add analytics section here ... */}` ersetzen
2. Cookie-Banner implementieren (z. B. mit `react-cookie-consent`)
3. §8 Cookies von Variante A (nur notwendige) auf Variante B (mit Tracking) umstellen
4. Einwilligung nach § 25 TDDDG einholen

---

## Bereits enthalten (kein Handlungsbedarf)

- ✅ Impressum nach § 5 DDG (neu, ersetzt TMG)
- ✅ Datenschutz: Stripe-Abschnitt vollständig
- ✅ Datenschutz: Google OAuth entfernt (LingoLuup nutzt Email/Passwort)
- ✅ Datenschutz: Cookies Variante A (kein Banner nötig)
- ✅ Nutzungsbedingungen: Widerrufsformular enthalten
- ✅ Nutzungsbedingungen: Preise (7,99 €/Monat, ~84 €/Jahr)
- ✅ robots: {index: false} auf allen 3 Seiten
- ✅ Footer-Links auf allen Seiten
- ✅ Aufsichtsbehörde: LfDI Baden-Württemberg (Stuttgart)
- ✅ Gerichtsstand: Tübingen
