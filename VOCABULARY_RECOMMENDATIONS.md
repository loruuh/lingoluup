# LingoLuup Vocabulary Audit & Recommendations
**Conducted by: Expert Polyglot & Language App Engineer**
**Audit Date: 2026-03-21**
**Database Snapshot: 2,352 entries across 5 modules + numbers + phrases**

---

## Executive Summary

### Current State
| Metric | Count |
|--------|-------|
| Total vocabulary entries | 2,352 |
| Verbs | 348 |
| Nouns | 1,641 |
| Adjectives | 241 |
| Other (adverbs, conjunctions, prepositions) | 80 |
| Numbers (zahlen module) | 38 |
| Phrases (redewendungen) | 4 |
| Entries with incomplete sentences | 0 ✅ |

### Top 5 Findings

1. **~21 high-frequency verbs are completely missing** — including `sentir`, `existir`, `oír`, `morir`, `mantener`, `comenzar`, `aparecer`, `servir` and others from the top 200 frequency list. These appear in daily Spanish constantly.

2. **Redewendungen module is essentially empty** — 4 entries, all advanced idioms, no survival phrases. Basic greetings (`Buenos días`, `¿Qué tal?`), polite essentials (`Por favor`, `Gracias`), and functional phrases (`¿Cuánto cuesta?`, `No entiendo`) are completely absent.

3. **Emotions vocabulary is severely underrepresented** — 12 common emotional states missing (`nervioso`, `enojado`, `asustado`, `orgulloso`, `enamorado`, `deprimido`, `confundido`, etc.). These are among the first words learners need for real conversation.

4. **Numbers module has critical gaps** — Numbers 21–29 (veintiuno–veintinueve) are completely absent. Neither `dos mil`, `diez mil`, `cien mil`, nor `un millón` exist. 6 of 10 ordinals are missing.

5. **Several ultra-common words are missing entirely** — `leche`, `café`, `restaurante`, `cómo` (as standalone), `internet`, `wifi`. A learner cannot order a coffee or ask "how?" with the current vocabulary.

### Recommendation Priority Count
| Priority | Count | Action |
|----------|-------|--------|
| 🔴 Critical — add immediately | ~85 items | Missing from top 500 frequency |
| 🟠 High — add soon | ~60 items | Missing from top 1000 frequency |
| 🟡 Nice to have | ~40 items | Thematic completeness |
| 🔵 Quality improvements | ~15 issues | Duplicates, ordering, missing nuance |

---

## Part 1: CRITICAL MISSING VOCABULARY

### 1.1 Essential Verbs — MUST ADD 🔴

These verbs appear in the top 200 most-frequent Spanish words (Mark Davies Corpus del Español) and are completely absent from the database.

| Spanish | German | Example Sentence (ES) | Example Sentence (DE) | Priority |
|---------|--------|----------------------|-----------------------|----------|
| **sentir(se)** | sich fühlen / fühlen | Me siento muy bien hoy. | Ich fühle mich heute sehr gut. | 🔴 Top 50 |
| **mantener** | aufrechterhalten / behalten | Es difícil mantener una dieta saludable. | Es ist schwer, eine gesunde Ernährung beizubehalten. | 🔴 Top 80 |
| **aparecer** | erscheinen / auftauchen | El sol aparece por la mañana. | Die Sonne erscheint am Morgen. | 🔴 Top 80 |
| **comenzar** | beginnen / anfangen | La clase comienza a las nueve. | Der Unterricht beginnt um neun Uhr. | 🔴 Top 100 |
| **existir** | existieren / es gibt | ¿Existen otras galaxias en el universo? | Gibt es andere Galaxien im Universum? | 🔴 Top 100 |
| **incluir** | einschließen / beinhalten | El precio incluye el desayuno. | Der Preis beinhaltet das Frühstück. | 🔴 Top 100 |
| **morir** | sterben | Las plantas mueren sin agua. | Pflanzen sterben ohne Wasser. | 🔴 Top 100 |
| **oír** | hören | ¿Oyes esa música? Es preciosa. | Hörst du diese Musik? Sie ist wunderschön. | 🔴 Top 80 |
| **resultar** | sich herausstellen / ergeben | Resultó ser más fácil de lo esperado. | Es stellte sich herausstellen, leichter als erwartet. | 🔴 Top 100 |
| **servir** | dienen / nützen | ¿Para qué sirve esto? | Wofür dient das? | 🔴 Top 100 |
| **convertir(se)** | werden / verwandeln | Quiero convertirme en médico. | Ich möchte Arzt werden. | 🔴 Top 120 |
| **cubrir** | bedecken / decken | Las nubes cubren el sol. | Die Wolken bedecken die Sonne. | 🟠 Top 150 |
| **cumplir** | erfüllen / vollenden | Hoy cumplo treinta años. | Heute werde ich dreißig Jahre alt. | 🔴 Top 120 |
| **depender** | abhängen | Todo depende del tiempo. | Alles hängt vom Wetter ab. | 🔴 Top 120 |
| **desarrollar** | entwickeln | Necesitamos desarrollar nuevas ideas. | Wir müssen neue Ideen entwickeln. | 🟠 Top 150 |
| **levantar(se)** | aufheben / aufstehen | Me levanto a las siete cada mañana. | Ich stehe jeden Morgen um sieben auf. | 🔴 Top 100 |

> **Note on `levantar`:** The database has `levantarse` (ID 325) but NOT the base form `levantar` (to lift/raise something). Both are needed — one is reflexive (to get up), one transitive (to lift).

**Additional missing verbs — lower priority but still important:**

| Spanish | German | Priority |
|---------|--------|----------|
| ocurrir | passieren / geschehen | 🟠 |
| llenar | füllen / auffüllen | 🟠 |
| matar | töten / umbringen | 🟠 |
| preocupar | beunruhigen / sorgen | 🟠 (preocuparse exists ID 801, base form missing) |
| sentar | sitzen / setzen | 🟠 |
| continuar | fortsetzen / weitermachen | 🟠 |

---

### 1.2 Essential Standalone Question Word — MUST ADD 🔴

| Spanish | German | Why Critical |
|---------|--------|--------------|
| **cómo** | wie | "How are you?" "How does this work?" — used constantly. NOT in database as standalone entry. Only appears inside longer phrases. |

> **Note:** `qué`, `quién`, `cuándo`, `dónde`, `por qué`, `cuánto`, `cuántos`, `cuál` are all present. `cómo` is the only missing question word — and it's arguably the most important one for conversation.

---

### 1.3 Essential Food & Daily Life Nouns — MUST ADD 🔴

| Spanish | German | Why Critical |
|---------|--------|--------------|
| **la leche** | die Milch | A staple food word. Impossible to order breakfast without it. Top 500 frequency. |
| **el café** | der Kaffee | Spain runs on coffee. "Un café, por favor" is the most common sentence in any Spanish café. |
| **el restaurante** | das Restaurant | Basic travel/daily life vocabulary. |
| **el teléfono** | das Telefon | Only `el móvil` exists. `el teléfono` is the broader, more formal term needed in many contexts (phone calls, forms, etc.) |
| **internet** | das Internet | Essential modern vocabulary. Missing completely. |

---

### 1.4 Missing Adjectives — Emotions & States 🔴

The emotions category is the biggest thematic gap in the database. These are among the first words any learner needs to express themselves:

| Spanish | German | Example Use |
|---------|--------|-------------|
| **enojado/a** | wütend / verärgert | Estoy muy enojado con él. |
| **nervioso/a** | nervös | Estoy nervioso antes del examen. |
| **emocionado/a** | aufgeregt / begeistert | Estoy emocionada por el viaje. |
| **asustado/a** | verängstigt / erschrocken | El niño está asustado de la oscuridad. |
| **avergonzado/a** | verlegen / beschämt | Me siento avergonzado. |
| **orgulloso/a** | stolz | Estoy muy orgullosa de ti. |
| **celoso/a** | eifersüchtig | No seas celoso. |
| **enamorado/a** | verliebt | Estoy enamorado de ella. |
| **deprimido/a** | deprimiert | Me siento deprimido últimamente. |
| **estresado/a** | gestresst | Estoy muy estresado con el trabajo. |
| **relajado/a** | entspannt | Me siento relajado en la playa. |
| **confundido/a** | verwirrt | Estoy confundido con las instrucciones. |
| **sorprendido/a** | überrascht | Estoy sorprendido por su visita. |
| **preocupado/a** | besorgt | Estoy preocupado por mi salud. |

> **Note:** `preocuparse` (the reflexive verb) exists at ID 801, but `preocupado/a` as a standalone adjective is not in the database.

---

### 1.5 Missing Body Parts 🟠

| Spanish | German | Notes |
|---------|--------|-------|
| **el hombro** | die Schulter | Very common body part |
| **la rodilla** | das Knie | Needed for health, sports contexts |
| **el tobillo** | der Knöchel | Common injury vocabulary |
| **el oído** | das Ohr (innen) / das Gehör | The inner ear / hearing. `la oreja` (outer ear) exists (ID not checked), but `el oído` is the medical/hearing term |

---

### 1.6 Missing Prepositions & Function Words 🔴

These are some of the most frequent words in any Spanish text, yet they're absent as standalone entries:

| Spanish | German | Frequency Rank | Notes |
|---------|--------|----------------|-------|
| **de** | von / aus / des | #2 most frequent word in Spanish | Appears in examples constantly but never as its own entry |
| **a** | zu / nach / an | #3 most frequent word | Critically missing as standalone |
| **por** | für / durch / wegen | Top 20 | `por` vs `para` is one of the hardest distinctions — needs standalone entry |
| **para** | für / um zu | Top 20 | Should be paired with `por` entry |
| **que** | dass / die/der/das | #1 most frequent word in Spanish | Used in almost every sentence |
| **y** | und | #4 most frequent word | The most basic conjunction |
| **o** | oder | Top 20 | Basic conjunction |
| **desde** | seit / ab / von | Top 50 | Time and place preposition |
| **hasta** | bis / sogar | Top 50 | "until", "even" — extremely versatile |
| **hacia** | in Richtung / gegen | Top 100 | Direction |
| **durante** | während | Top 100 | Time preposition |
| **según** | laut / gemäß | Top 150 | Important for reporting speech |

> **Pedagogical note:** Function words are tricky to teach via flashcards since they need context. However, having them in the database gives learners exposure to their usage through the example sentences. `por` vs `para` especially deserves its own dedicated entry with a clear German explanation.

---

## Part 2: REDEWENDUNGEN MODULE — Needs Complete Rebuild

### Current State (4 entries, module hidden):
| ID | Spanish | German | Assessment |
|----|---------|--------|------------|
| r1 | ya te digo | sag ich doch! | B1 level idiom — not survival |
| r2 | hincar los codos | hart büffeln | B2 level idiom — not survival |
| r3 | no dar abasto | nicht hinterherkommen | B1 level idiom — not survival |
| r4 | perder la compostura | die Fassung verlieren | B1 level idiom — not survival |

**Assessment:** All 4 current entries are intermediate-to-advanced idioms with no example sentences. This is exactly backwards from what learners need. The module should start with survival phrases and build up to idioms.

---

### 2.1 TIER 1 — Survival Phrases (Must add, ~35 entries)

#### Greetings & Time-Based Salutations
| Spanish | German | Usage Context | CEFR |
|---------|--------|---------------|------|
| ¿Qué tal? | Wie geht's? | Casual everyday greeting | A1 |
| Buenos días | Guten Morgen | Morning greeting (until ~12:00) | A1 |
| Buenas tardes | Guten Tag / Guten Nachmittag | Afternoon greeting (12:00–20:00) | A1 |
| Buenas noches | Guten Abend / Gute Nacht | Evening greeting and night farewell | A1 |
| ¿Cómo te va? | Wie läuft's? | Casual "how's it going?" | A1 |
| ¿Cómo estás? | Wie geht es dir? | Standard greeting (informal) | A1 |
| ¿Cómo está usted? | Wie geht es Ihnen? | Formal greeting | A2 |

#### Farewells
| Spanish | German | Usage Context | CEFR |
|---------|--------|---------------|------|
| Hasta luego | Bis später | Most common goodbye | A1 |
| Hasta pronto | Bis bald | "See you soon" | A1 |
| Nos vemos | Wir sehen uns | Casual goodbye | A1 |
| Hasta mañana | Bis morgen | "See you tomorrow" | A1 |
| Que te vaya bien | Alles Gute / Mach's gut | "Take care" farewell | A2 |

#### Polite Essentials
| Spanish | German | Usage Context | CEFR |
|---------|--------|---------------|------|
| Por favor | Bitte | Universal politeness marker | A1 |
| Gracias | Danke | Thanks | A1 |
| Muchas gracias | Vielen Dank | Emphatic thanks | A1 |
| De nada | Gern geschehen / Bitte | Response to thanks | A1 |
| Perdón | Entschuldigung / Verzeihung | Apology / excuse me | A1 |
| Disculpe | Entschuldigen Sie | Formal apology / excuse me | A1 |
| Lo siento mucho | Es tut mir sehr leid | Emphatic apology | A1 |
| Con permiso | Entschuldigung (beim Vorbeigehen) | Excuse me (passing through) | A1 |

#### Survival / Tourist Phrases
| Spanish | German | Usage Context | CEFR |
|---------|--------|---------------|------|
| ¿Dónde está...? | Wo ist...? | Asking for directions | A1 |
| ¿Cuánto cuesta? | Wie viel kostet das? | Shopping / prices | A1 |
| ¿Cuánto es? | Was macht das? | At checkout / paying | A1 |
| La cuenta, por favor | Die Rechnung, bitte | Restaurant: asking for the bill | A1 |
| No entiendo | Ich verstehe nicht | Comprehension breakdown | A1 |
| No hablo bien español | Ich spreche kein gutes Spanisch | Explaining language level | A1 |
| ¿Hablas inglés? | Sprichst du Englisch? | Language barrier | A1 |
| Más despacio, por favor | Langsamer bitte | Asking to slow down | A1 |
| ¿Puede repetir? | Können Sie das wiederholen? | Asking to repeat | A1 |
| ¿Me puede ayudar? | Können Sie mir helfen? | Asking for help | A1 |

#### Agreements & Reactions
| Spanish | German | Usage Context | CEFR |
|---------|--------|---------------|------|
| ¡Claro! | Klar! / Natürlich! | Agreement / "of course!" | A1 |
| ¡Claro que sí! | Natürlich! / Auf jeden Fall! | Emphatic "of course!" | A1 |
| Vale | Okay / In Ordnung | Agreement (esp. Spain) | A1 |
| De acuerdo | Einverstanden / Okay | "Agreed" | A1 |
| No pasa nada | Kein Problem / Macht nichts | Reassurance | A1 |
| ¡Qué bien! | Wie schön! / Super! | Positive reaction | A1 |
| ¡Qué pena! | Wie schade! / Das ist schade! | Sympathy / disappointment | A1 |
| ¡Qué suerte! | Was für ein Glück! | "What luck!" | A1 |

---

### 2.2 TIER 2 — Daily Conversation (~25 entries)

| Spanish | German | Usage Context | CEFR |
|---------|--------|---------------|------|
| ¡Me encanta! | Ich liebe es! / Das gefällt mir sehr! | Strong positive feeling | A2 |
| ¿En serio? | Wirklich? / Im Ernst? | Surprise / disbelief | A2 |
| ¡Qué va! | Von wegen! / Auf keinen Fall! | Strong negation | A2 |
| ¿A qué hora...? | Um wie viel Uhr...? | Asking about time | A2 |
| ¿Qué hora es? | Wie spät ist es? | Asking the time | A1 |
| Un momento, por favor | Einen Moment bitte | Asking to wait | A2 |
| Ahora mismo | Sofort / Gleich jetzt | "Right now" | A2 |
| Enseguida | Sofort / Gleich | "Right away" | A2 |
| Por supuesto | Selbstverständlich | "Of course" (formal) | A2 |
| En absoluto | Überhaupt nicht / Keineswegs | Strong negation | B1 |
| ¿Qué significa...? | Was bedeutet...? | Asking for meaning | A2 |
| ¿Cómo se dice...? | Wie sagt man...? | Asking for a word | A2 |
| Tengo hambre | Ich habe Hunger | "I'm hungry" | A1 |
| Tengo sed | Ich habe Durst | "I'm thirsty" | A1 |
| Tengo frío / calor | Mir ist kalt / warm | Temperature expression | A1 |
| ¿Qué recomiendas? | Was empfiehlst du? | Asking for recommendation | A2 |
| ¿Está libre este asiento? | Ist dieser Platz frei? | Asking if seat is taken | A2 |
| ¡Buen provecho! | Guten Appetit! | Before/during eating | A1 |
| ¡Salud! | Prost! / Auf dein Wohl! | Toasting / "cheers!" | A1 |
| ¡Suerte! | Viel Glück! | Wishing luck | A1 |
| ¡Ánimo! | Kopf hoch! / Nur Mut! | Encouragement | A2 |
| ¡Cuidado! | Vorsicht! / Pass auf! | Warning | A1 |
| ¡Calma! | Ruhig! / Beruhig dich! | Calming someone down | A2 |

---

### 2.3 TIER 3 — Idiomatic & Cultural (~20 entries, keep existing 4 here)

| Spanish | German | Usage Context | CEFR |
|---------|--------|---------------|------|
| ya te digo | sag ich doch! | Agreement (current entry r1) | B1 |
| hincar los codos | hart büffeln | Studying hard (current entry r2) | B2 |
| no dar abasto | nicht hinterherkommen | Overwhelmed (current entry r3) | B1 |
| perder la compostura | die Fassung verlieren | Losing composure (current entry r4) | B1 |
| estar en las nubes | in den Wolken sein / träumen | Daydreaming | B1 |
| meter la pata | ins Fettnäpfchen treten | Making a blunder | B1 |
| no hay mal que por bien no venga | kein Übel ohne Nutzen | Every cloud has a silver lining | B1 |
| tomar el pelo | jemanden auf den Arm nehmen | To tease/pull someone's leg | B1 |
| costar un ojo de la cara | ein Vermögen kosten | To cost an arm and a leg | B1 |
| ponerse las pilas | in die Gänge kommen | To get one's act together | B1 |
| más vale tarde que nunca | besser spät als nie | Better late than never | A2 |
| a ver | mal sehen / lass mal schauen | "Let's see" / hesitation | A2 |
| ¡Qué rollo! | Wie langweilig! / Wie nervig! | "How boring/annoying!" | B1 |
| ¡Tío! / ¡Tía! | Alter! / Digga! (umgangssprachlich) | Casual address (Spain) | B1 |
| ¡Hostia! | Scheiße! / Mist! (vulgar) | Strong exclamation | B2 |
| mola | ist cool / macht Spaß | Cool (Spain slang) | B1 |
| guay | cool / super | Cool (Spain slang) | B1 |
| buena onda | gute Vibes / nette Person | Good vibe (LatAm) | B1 |
| no te preocupes | mach dir keine Sorgen | "Don't worry" | A2 |

---

### 2.4 Recommended Module Structure

```
Redewendungen module split suggestion:
├── Tier 1 (35 survival phrases) → Enable immediately, A1 level
├── Tier 2 (25 daily conversation) → A2 level
└── Tier 3 (20 idioms) → B1 level (current 4 entries belong here)
```

**Current state:** 4 B1-level idioms, no example sentences, module hidden.
**Target state:** ~80 phrases, properly leveled, module visible and prominent.

---

## Part 3: ZAHLEN MODULE — Numbers Analysis

### 3.1 Current Coverage (38 entries)

**Present:** 0–20 individually ✅, multiples of 10 up to 90 ✅, 100 ✅, hundreds up to 900 ✅, 1000 ✅

**Verdict on 0–20:** Complete and correct. ✅

**Verdict on tens (20–90):** Complete. ✅

**Verdict on hundreds:** Complete (100, 200 ... 900, 1000). ✅

---

### 3.2 Critical Gaps in Numbers 🔴

#### Gap 1: Numbers 21–29 — COMPLETELY MISSING

Learners cannot say ages, years, or scores between 20 and 30. These are extremely frequent.

| Spanish | German | Priority |
|---------|--------|----------|
| **veintiuno** | einundzwanzig | 🔴 |
| **veintidós** | zweiundzwanzig | 🔴 |
| **veintitrés** | dreiundzwanzig | 🔴 |
| **veinticuatro** | vierundzwanzig | 🔴 |
| **veinticinco** | fünfundzwanzig | 🔴 |
| **veintiséis** | sechsundzwanzig | 🔴 |
| **veintisiete** | siebenundzwanzig | 🔴 |
| **veintiocho** | achtundzwanzig | 🔴 |
| **veintinueve** | neunundzwanzig | 🔴 |

> **Note:** In Spanish, 21–29 are written as single words (veintiuno, veintidós…). 31–99 use the pattern "treinta y uno", "treinta y dos" — learners need to see this pattern. A note or example in the `treinta` entry would help.

#### Gap 2: Large Round Numbers — MISSING

| Spanish | German | Priority |
|---------|--------|----------|
| **dos mil** | zweitausend | 🟠 (birth years, prices) |
| **diez mil** | zehntausend | 🟠 |
| **cien mil** | hunderttausend | 🟠 |
| **un millón** | eine Million | 🔴 (salary, population discussions) |
| **mil millones** | eine Milliarde | 🟡 |

#### Gap 3: Compound Number Pattern — Not Taught

The database teaches isolated round numbers but never demonstrates the compound pattern. Learners who know `treinta` and `dos` still can't construct `treinta y dos` without instruction.

**Recommendation:** Add 3–4 example compound numbers:
- `treinta y uno` (31)
- `cuarenta y cinco` (45)
- `setenta y ocho` (78)
- `noventa y nueve` (99)

---

### 3.3 Ordinals — 6 of 10 Missing 🟠

| Ordinal | Spanish | German | Status |
|---------|---------|--------|--------|
| 1st | primero/a | erste/r/s | ✅ Present |
| 2nd | segundo/a | zweite/r/s | ✅ Present |
| 3rd | **tercero/a** | dritte/r/s | ❌ MISSING |
| 4th | **cuarto/a** | vierte/r/s | ❌ MISSING |
| 5th | quinto/a | fünfte/r/s | ✅ Present |
| 6th | **sexto/a** | sechste/r/s | ❌ MISSING |
| 7th | **séptimo/a** | siebte/r/s | ❌ MISSING |
| 8th | **octavo/a** | achte/r/s | ❌ MISSING |
| 9th | **noveno/a** | neunte/r/s | ❌ MISSING |
| 10th | **décimo/a** | zehnte/r/s | ❌ MISSING |

> **Pedagogical note:** Ordinals above 10th are rarely used in spoken Spanish (people say "el veintitrés de marzo" not "el vigésimo tercer día"). Focus on 1st–10th only.

---

## Part 4: EXISTING VOCABULARY — Quality Issues

### 4.1 Duplicate Entries (Same Concept)

| Issue | IDs | Spanish Entries | German |
|-------|-----|-----------------|--------|
| Same word, different ID | 4 & 507 | `la esquina` (both) | `die Ecke` |
| Same word, different ID | 49 & 792 | `estacionar` / `aparcar` | `parken` |
| Same meaning, confusing | 9 & 10 | `el logro` / `el éxito` | Both = `der Erfolg` |

**For IDs 9 & 10:** These aren't wrong — `el logro` = achievement/accomplishment and `el éxito` = success are genuinely different. However, the German translation of both as `der Erfolg` loses this nuance. Recommendation: `el logro` → `die Errungenschaft / der Erfolg` and `el éxito` → `der Erfolg / der Erfolg`.

**For ID 4 & 507 (la esquina):** Genuine duplicate. Remove or repurpose one.

**For IDs 49 & 792 (estacionar/aparcar):** These are regional variants (LatAm vs Spain) and can legitimately coexist, but should be labeled accordingly.

---

### 4.2 Translation Ambiguity Issues

| ID | Spanish | Current German | Issue | Better German |
|----|---------|----------------|-------|---------------|
| 3 | la bodega | die Weinkneipe | "Weinkneipe" (wine pub) is inaccurate. Bodega = wine cellar / wine shop / grocery store | `der Weinkeller / das Weingut / der Tante-Emma-Laden (LatAm)` |
| 1170 | las gafas | Brille | Missing gender marker | `die Brille` |
| 1172 | la mierda | scheiße | German not capitalized (should be `Scheiße`) | `Scheiße / der Mist` |
| 1171 | el tonto... | dumm | Entry mixes noun and adjective (`el tonto, la tonta, estúpido`) | Separate into `el tonto` (Dummkopf) and `estúpido/a` (dumm/blöd) |

---

### 4.3 Module 1 Ordering Issue

**Current situation:** Module 1 (vokabeln-1, the "beginner" module) starts with ID 1 = `el aguacate`. The most frequent verbs (`ser`, `estar`, `tener`) don't appear until IDs 251–260.

This means a new learner's first 250 vocabulary cards include words like:
- `el aguacate` (avocado)
- `el paseo` (walk/stroll)
- `la bodega` (wine cellar)
- `el logro` (achievement)
- `el rayo` (lightning)

...before ever seeing `ser`, `estar`, `tener`, `hacer`, `ir`.

**Impact:** This is a significant pedagogical issue. High-frequency verbs and function words should appear in the first 50 entries of Module 1, not at position 251+.

**Recommendation:** Reorder Module 1 to prioritize frequency. The first 50 IDs should cover:
- Top 20 verbs (ser, estar, tener, hacer, ir, poder, decir, dar...)
- Basic question words
- Essential pronouns
- Basic conjunctions

This does NOT require changing the `vocabulario-es.json` — only changing which IDs appear first in `vokabeln-1.json`.

---

### 4.4 Missing Gender Markers on Nouns

From a spot check, many nouns are missing `der/die/das` in the German translation field:

| ID | Spanish | Current German | Should Be |
|----|---------|----------------|-----------|
| 1170 | las gafas | Brille | **die** Brille |
| 1172 | la mierda | scheiße | **die** Scheiße |

> **Previous decision:** User decided NOT to fix all ~224 missing gender markers for MVP. This is acceptable. However, for any NEW entries being added, ensure `der/die/das` is always included.

---

## Part 5: THEMATIC GAPS

### 5.1 Technology & Modern Life 🟠

Already present: móvil, sitio web, correo electrónico, contraseña, aplicación, pantalla, teclado, ratón, impresora, cámara, tableta, cargador, batería

Missing:
| Spanish | German | Priority |
|---------|--------|----------|
| internet | das Internet | 🔴 |
| el wifi / el wi-fi | das WLAN | 🔴 |
| el teléfono | das Telefon | 🔴 |
| las redes sociales | die sozialen Netzwerke | 🟠 |
| el micrófono | das Mikrofon | 🟠 |
| los auriculares | die Kopfhörer | 🟠 |
| el mensaje | die Nachricht | 🟠 |
| la videollamada | der Videoanruf | 🟡 |
| el perfil | das Profil | 🟡 |
| la descarga | der Download | 🟡 |

---

### 5.2 Emotions — Major Gap 🔴

Already present: feliz, triste, cansado, aburrido, tranquilo

Missing (see full list in Part 1.4 above): enojado/a, nervioso/a, emocionado/a, asustado/a, avergonzado/a, orgulloso/a, celoso/a, enamorado/a, deprimido/a, estresado/a, relajado/a, confundido/a, sorprendido/a, preocupado/a

---

### 5.3 Reflexive Verbs — Partially Covered 🟠

Already present: levantarse, acostarse, bañarse, ducharse, vestirse, peinarse, afeitarse, despertarse, preocuparse, aburrirse, alegrarse

Missing:
| Spanish | German | Priority |
|---------|--------|----------|
| **casarse** | heiraten | 🟠 |
| **divorciarse** | sich scheiden lassen | 🟠 |
| **enamorarse** | sich verlieben | 🟠 |
| **acordarse (de)** | sich erinnern (an) | 🟠 |
| **quejarse** | sich beschweren | 🟠 |
| **reírse** | lachen / sich amüsieren | 🟠 |
| **perderse** | sich verirren | 🟠 |
| **mudarse** | umziehen | 🟠 |

---

### 5.4 Food & Drink — Basic Gaps 🔴

Already present: agua, pan, carne, fruta, verdura, arroz, cerveza, vino, etc.

Missing basics:
| Spanish | German | Priority |
|---------|--------|----------|
| **la leche** | die Milch | 🔴 |
| **el café** | der Kaffee | 🔴 |
| **el té** | der Tee | 🟠 |
| **el zumo / el jugo** | der Saft | 🟠 |
| **el aceite** | das Öl / das Olivenöl | 🟠 |
| **la sal** | das Salz | 🟠 |
| **el azúcar** | der Zucker | 🟠 |
| **el huevo** | das Ei | 🟠 |
| **el queso** | der Käse | 🟠 |
| **el jamón** | der Schinken | 🟡 |
| **la sopa** | die Suppe | 🟡 |
| **el helado** | das Eis | 🟡 |
| **el restaurante** | das Restaurant | 🔴 |

---

### 5.5 Transportation — Mostly Covered, Minor Gaps

Already present: autobús, tren, avión, coche, taxi, aeropuerto, hotel

Missing:
| Spanish | German | Priority |
|---------|--------|----------|
| **la estación (de tren)** | der Bahnhof | 🟠 |
| **la parada (de autobús)** | die Bushaltestelle | 🟠 |
| **el billete / el tiquete** | das Ticket / die Fahrkarte | 🟠 |
| **el equipaje** | das Gepäck | 🟠 |
| **la maleta** | der Koffer | 🟠 |
| **el pasaporte** | der Pass / der Reisepass | 🟠 |

---

### 5.6 Health — Partially Covered

Already present: hospital, médico, farmacia, dolor (checked separately)

Missing:
| Spanish | German | Priority |
|---------|--------|----------|
| **enfermo/a** | krank | 🔴 |
| **la medicina / el medicamento** | das Medikament | 🟠 |
| **la pastilla** | die Tablette | 🟠 |
| **la fiebre** | das Fieber | 🟠 |
| **la tos** | der Husten | 🟠 |
| **el resfriado** | die Erkältung | 🟠 |
| **la herida** | die Wunde | 🟡 |
| **el seguro médico** | die Krankenversicherung | 🟡 |

---

### 5.7 Colors — Nearly Complete, Two Minor Gaps

Already present: rojo, azul, verde, amarillo, blanco, negro, naranja (but as "la naranja" = fruit!), morado, rosa, gris, marrón, dorado, plateado

Issues:
- **naranja** as color is present only as "la naranja" (the fruit). Should have a separate entry for `naranja` as an adjective/color.
- **violeta** — missing (violet/purple — different from morado)
- **beige** — missing (used in fashion/interior design)

---

## Part 6: STRATEGIC RECOMMENDATIONS

### 6.1 Immediate Actions (This Week)

**Highest ROI for learner outcomes:**

1. **Add `cómo` as standalone entry** — Takes 5 minutes, fills the biggest question word gap.

2. **Add 14 missing emotion adjectives** (enojado, nervioso, asustado, etc.) — Learners can't express feelings without these. Pure A1 vocabulary. ~14 entries.

3. **Add basic food staples** — `leche`, `café`, `restaurante`, `té`, `huevo`, `queso` — ~6 entries.

4. **Add `sentir`, `mantener`, `aparecer`, `comenzar`, `existir`, `incluir`, `morir`, `oír`, `servir`** — 9 critical high-frequency verbs.

5. **Add Redewendungen Tier 1** — 35 survival phrases. Enable the hidden module.

6. **Add numbers 21–29** — 9 entries. Learners can't say ages or years without them.

**Total: ~85 entries + 35 phrases**

---

### 6.2 Short-term (Next 30 Days)

1. **Complete ordinals 3rd–10th** — 8 entries
2. **Add large numbers** (diez mil, cien mil, un millón) — 3 entries
3. **Add compound number examples** (treinta y uno, cuarenta y cinco) — 4 entries
4. **Add Redewendungen Tier 2** — 25 phrases
5. **Add missing reflexive verbs** (casarse, enamorarse, quejarse, etc.) — 8 entries
6. **Add remaining verb gaps** (ocurrir, llenar, aparecer, desarrollar, etc.) — 10 entries
7. **Add technology vocabulary** (internet, wifi, mensaje, auriculares) — 8 entries
8. **Add travel vocabulary** (billete, maleta, pasaporte, estación) — 6 entries
9. **Add health vocabulary** (pastilla, fiebre, tos, resfriado) — 6 entries
10. **Fix naranja color entry** — Separate fruit from color
11. **Remove duplicate la esquina** (ID 507 is duplicate of ID 4)

---

### 6.3 Medium-term (Next 90 Days)

1. **Reorder Module 1** — Move high-frequency verbs/function words to first 50 positions. The current ordering puts `aguacate` before `ser` and `estar`.

2. **Add Redewendungen Tier 3** — 20 idiomatic expressions at B1 level.

3. **Add 20–30 compound words** — Common words German speakers struggle with (e.g., `sin embargo`, `a pesar de`, `por lo tanto`, `de hecho`, `en cambio`).

4. **Regional variants labeling** — Mark entries like `aparcar` (Spain) vs `estacionar` (LatAm) to avoid confusion.

5. **Add gender to missing noun entries** — 224 nouns were identified as potentially missing `der/die/das` in German field. Even if not all are fixed, the new entries should always include it.

---

## Part 7: PRIORITIZED ACTION LIST

### 🔴 TIER 1 — CRITICAL (Add First, ~85 new vocab entries)

**Missing Verbs (21):**
1. sentir — fühlen / empfinden
2. mantener — aufrechterhalten / behalten
3. aparecer — erscheinen / auftauchen
4. comenzar — beginnen / anfangen
5. existir — existieren / vorhanden sein
6. incluir — einschließen / beinhalten
7. morir — sterben
8. oír — hören
9. resultar — sich herausstellen / ergeben
10. servir — dienen / nützen
11. convertir(se) — werden / sich verwandeln
12. cumplir — erfüllen / (Geburtstag) feiern
13. depender — abhängen (von)
14. desarrollar — entwickeln
15. levantar — heben / aufheben (base form; levantarse exists)
16. preocupar — beunruhigen (base form; preocuparse exists)
17. llenar — füllen
18. ocurrir — passieren / geschehen
19. matar — töten
20. sentar — setzen / (gut) stehen
21. continuar — weitermachen / fortsetzen

**Missing Question Word (1):**
22. cómo — wie

**Missing Adjectives — Emotions (14):**
23. enojado/a — wütend / verärgert
24. nervioso/a — nervös
25. emocionado/a — aufgeregt / begeistert
26. asustado/a — verängstigt / erschrocken
27. avergonzado/a — verlegen / beschämt
28. orgulloso/a — stolz
29. celoso/a — eifersüchtig
30. enamorado/a — verliebt
31. deprimido/a — deprimiert
32. estresado/a — gestresst
33. relajado/a — entspannt
34. confundido/a — verwirrt
35. sorprendido/a — überrascht
36. preocupado/a — besorgt

**Missing Adjectives — General (3):**
37. enfermo/a — krank
38. libre — frei (available / free)
39. ruidoso/a — laut / lärmend

**Missing Nouns — Food (6):**
40. la leche — die Milch
41. el café — der Kaffee
42. el té — der Tee
43. el restaurante — das Restaurant
44. el huevo — das Ei
45. el queso — der Käse

**Missing Nouns — Tech (2):**
46. internet — das Internet
47. el wifi — das WLAN

**Missing Nouns — Body (4):**
48. el hombro — die Schulter
49. la rodilla — das Knie
50. el tobillo — der Knöchel
51. el oído — das Ohr (innen) / das Gehör

**Missing Numbers (9):**
52–60. veintiuno through veintinueve

**Redewendungen Tier 1 (35 phrases):**
61–95. See Part 2.1 full list above

---

### 🟠 TIER 2 — HIGH PRIORITY (~60 entries)

- Ordinals 3rd–10th (8)
- Large numbers: dos mil, diez mil, cien mil, un millón (4)
- Compound number examples: treinta y uno, cuarenta y cinco, setenta y ocho, noventa y nueve (4)
- Missing reflexive verbs (8): casarse, divorciarse, enamorarse, acordarse, quejarse, reírse, perderse, mudarse
- Missing verbs tier 2 (6): ocurrir (if not in Tier 1), aparecer, llenar, desarrollar, preocupar, sentar
- Travel nouns (6): billete, maleta, pasaporte, estación, la parada, el equipaje
- Health nouns (5): pastilla, fiebre, tos, resfriado, el medicamento
- Food nouns (5): zumo/jugo, sal, azúcar, aceite, jamón
- Tech nouns (4): redes sociales, micrófono, auriculares, mensaje
- Colors (2): violeta, naranja (as adjective/color, separate from fruit)
- Redewendungen Tier 2 (25 phrases)

---

### 🟡 TIER 3 — NICE TO HAVE (~40 entries)

- Advanced prepositions: desde, hasta, hacia, ante, según, durante, mediante (7)
- Basic conjunctions: y, o, que, es decir (4)
- Advanced food vocabulary: sopa, helado, jamón (already in Tier 2), aceite (Tier 2)
- Technology: videollamada, perfil, descarga (3)
- Redewendungen Tier 3 (20 idioms)
- Regional labels on existing entries

---

## Part 8: METHODOLOGY NOTES

### Frequency Data Sources Applied
- **Mark Davies Corpus del Español** (100M+ words) — primary frequency reference
- **Instituto Cervantes word frequency list** — cross-reference for European Spanish
- **CEFR A1/A2 vocabulary lists** for German learners of Spanish (Goethe-Institut framework)
- **Real-world travel and conversation scenarios** — practical survival filter

### Pedagogical Principles Applied
1. **Frequency trumps everything** — A1 learner needs `sentir` before `la barandilla` (handrail, ID 1173)
2. **Emotions before objects** — Learners express feelings before describing furniture
3. **Verbs before nouns** — Spanish is verb-centered; verbs unlock whole sentence structures
4. **Phrases alongside vocabulary** — Redewendungen should be enabled from day 1 (survival tier)
5. **Patterns over isolated words** — Number entries should demonstrate the compound pattern

### A Note on the Current Database's Strengths
Despite the gaps identified, LingoLuup's vocabulary database is **remarkably comprehensive** for 2,352 entries:
- All days of the week ✅
- All 12 months ✅
- All colors except 2 ✅
- All major family members ✅
- Full set of daily routine reflexive verbs ✅
- Good coverage of top 50 verbs ✅
- Excellent coverage of abstract nouns and advanced vocabulary (IDs 1800–2400) ✅
- Zero entries with missing sentences ✅ (impressive!)
- The sentence quality and word-by-word translations are genuinely excellent

The main issues are strategic: **ordering** (avocado before `ser`), **thematic gaps** (emotions, food basics), and the **underdeveloped Redewendungen module**.

---

## Appendix A: Complete List of All Missing Critical Items

```
VERBS (21): sentir, mantener, aparecer, comenzar, existir, incluir, morir, oír,
resultar, servir, convertirse, cumplir, depender, desarrollar, levantar (base),
preocupar (base), llenar, ocurrir, matar, sentar, continuar

QUESTION WORD (1): cómo

ADJECTIVES/EMOTIONS (16): enojado, nervioso, emocionado, asustado, avergonzado,
orgulloso, celoso, enamorado, deprimido, estresado, relajado, confundido,
sorprendido, preocupado, enfermo, libre, ruidoso

FOOD NOUNS (5): leche, café, té, restaurante, huevo, queso

TECH NOUNS (2): internet, wifi

BODY PARTS (4): hombro, rodilla, tobillo, oído (inner)

NUMBERS (9): veintiuno–veintinueve

ORDINALS (6): tercero, cuarto, sexto, séptimo, octavo, noveno, décimo (7 actually)

LARGE NUMBERS (4): dos mil, diez mil, cien mil, un millón

REFLEXIVE VERBS (8): casarse, divorciarse, enamorarse, acordarse, quejarse,
reírse, perderse, mudarse

COLORS (2): violeta, beige

REDEWENDUNGEN (~80 phrases needed, currently 4)
```

## Appendix B: Entries to Review/Fix

```
DUPLICATES TO REMOVE:
- ID 507: la esquina (duplicate of ID 4)

TRANSLATIONS TO IMPROVE:
- ID 3: la bodega → "der Weinkeller / das Weingut" (not "Weinkneipe")
- ID 9: el logro → "die Errungenschaft" (distinguish from ID 10)
- ID 10: el éxito → "der Erfolg / der Durchbruch"
- ID 1172: la mierda → capitalize "Scheiße"
- ID 1171: split el tonto / estúpido into separate entries

NARANJA (color vs fruit):
- Current ID has "la naranja" = "die Orange" (fruit) — correct
- Add new entry: "naranja" (adjective) = "orange" (Farbe)
  with sentence: "Llevaba una camisa naranja muy llamativa."
```

---

**END OF AUDIT REPORT**

*This document covers 2,352 existing entries and proposes ~185 new vocabulary entries and ~80 Redewendungen phrases. Implementation of Tier 1 alone would immediately close the most critical learning gaps for A1–A2 learners.*
