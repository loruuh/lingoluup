/* eslint-disable */
const fs = require('fs');
const path = require('path');

function readJson(p) {
  let raw = fs.readFileSync(p, 'utf8');
  if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
  return JSON.parse(raw);
}
function writeJson(p, data) {
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

const lektionenPath = path.join(__dirname, '../data/modules/lektionen.json');
const lektionen = readJson(lektionenPath);

const newLessons = [

  // ── Lesson 8: Verneinung ────────────────────────────────────────────────────
  {
    id: 'leccion-8',
    title: 'Lección 8 – Verneinung: nunca, nadie, nada...',
    category: 'Grammatik',
    difficulty: 'intermediate',
    explanation_de: [
      'Kernregel: Im Spanischen bleibt **no** stehen, auch wenn ein weiteres Negationswort nach dem Verb folgt. Doppelte Verneinung ist Pflicht — kein Fehler.',
      '',
      '---',
      '',
      '| Spanisch | Deutsch | Beispiel |',
      '|----------|---------|---------|',
      '| **no** | nicht / nein | No entiendo. — Ich verstehe nicht. |',
      '| **nunca** / **jamás** | nie / niemals | No viene nunca. — Er kommt nie. |',
      '| **nadie** | niemand | No veo a nadie. — Ich sehe niemanden. |',
      '| **nada** | nichts | No quiero nada. — Ich will nichts. |',
      '| **ninguno/a** | kein / keine | No hay ningún problema. — Es gibt kein Problem. |',
      '| **ni...ni** | weder...noch | No tengo ni tiempo ni dinero. |',
      '| **tampoco** | auch nicht | Yo tampoco. — Ich auch nicht. |',
      '',
      '---',
      '',
      '**Doppelte Verneinung — der wichtigste Unterschied zum Deutschen**',
      '',
      'Im Deutschen genügt ein Negationswort: „Ich sehe niemanden." Im Spanischen bleibt **no** stehen, wenn das Negationswort NACH dem Verb kommt:',
      '',
      '> No veo a **nadie**. — Ich sehe niemanden.',
      '> No quiero **nada**. — Ich will nichts.',
      '> No viene **nunca**. — Er kommt nie.',
      '',
      'Kommt das Negationswort **vor** dem Verb, fällt **no** weg:',
      '',
      '> **Nadie** viene. — Niemand kommt.',
      '> **Nunca** como carne. — Ich esse nie Fleisch.',
      '> **Nada** me interesa. — Nichts interessiert mich.',
      '',
      '---',
      '',
      '**ni...ni und tampoco**',
      '',
      '- **ni...ni** (weder...noch) — immer mit **no** vor dem Verb:',
      '> No me gusta ni el café ni el té. — Ich mag weder Kaffee noch Tee.',
      '',
      '- **tampoco** (auch nicht) — das Gegenteil von también:',
      '> No me gusta. — Mir gefällt es nicht.',
      '> A mí **tampoco**. — Mir auch nicht.',
    ].join('\n'),
    examples: [
      {
        spanish: 'No veo a nadie en la calle.',
        german: 'Ich sehe niemanden auf der Straße.',
        explanation: 'Doppelte Verneinung: no + nadie. Nadie steht nach dem Verb → no bleibt.'
      },
      {
        spanish: 'Nunca he estado en México.',
        german: 'Ich war noch nie in Mexiko.',
        explanation: 'Nunca steht VOR dem Verb → kein no. Alternativ: "No he estado nunca en México."'
      },
      {
        spanish: 'No quiero nada, gracias.',
        german: 'Ich möchte nichts, danke.',
        explanation: 'no + nada — die Standard-Ablehnung im Alltag.'
      },
      {
        spanish: 'No tengo ni tiempo ni ganas.',
        german: 'Ich habe weder Zeit noch Lust.',
        explanation: 'ni...ni immer mit no vor dem Verb.'
      },
      {
        spanish: 'A mí tampoco me gusta.',
        german: 'Mir gefällt es auch nicht.',
        explanation: 'tampoco = auch nicht. Kein zusätzliches no nötig.'
      },
      {
        spanish: 'Nadie sabe la respuesta.',
        german: 'Niemand kennt die Antwort.',
        explanation: 'Nadie vor dem Verb → kein no. Wäre nadie nach dem Verb, käme no: "No sabe nadie..."'
      }
    ],
    quiz: [
      {
        question: '„Ich sehe niemanden." — Welche Übersetzung ist korrekt?',
        options: [
          'Veo a nadie.',
          'No veo a nadie.',
          'No veo a alguien.'
        ],
        correct: 1,
        explanation: '"No veo a nadie" — doppelte Verneinung ist Pflicht. Ohne no ist der Satz falsch. Alguien ist positiv (jemanden).'
      },
      {
        question: 'Welcher Satz ist korrekt?',
        options: [
          'No tengo nada.',
          'Tengo nada.',
          'No tengo algo.'
        ],
        correct: 0,
        explanation: 'no + nada (doppelte Verneinung). "Tengo nada" ist falsch (ohne no). "Algo" ist positiv — mit no muss "nada" kommen.'
      },
      {
        question: '„Mir gefällt es auch nicht." — Spanisch?',
        options: [
          'A mí también no me gusta.',
          'A mí tampoco me gusta.',
          'A mí no también me gusta.'
        ],
        correct: 1,
        explanation: 'tampoco = auch nicht (Gegenteil von también). Kein zusätzliches "no" nötig.'
      }
    ]
  },

  // ── Lesson 9: bien oder bueno ────────────────────────────────────────────────
  {
    id: 'leccion-9',
    title: 'Lección 9 – bien oder bueno?',
    category: 'Adjektive & Adverbien',
    difficulty: 'beginner',
    explanation_de: [
      '**bueno** = Adjektiv (beschreibt ein Nomen). **bien** = Adverb (beschreibt ein Verb oder Zustand). Diese eine Unterscheidung deckt 95 % der Fälle ab.',
      '',
      '---',
      '',
      '| Wort | Funktion | Beispiel |',
      '|------|----------|---------|',
      '| **bueno/buena** | Adjektiv — passt sich ans Nomen an | un libro **bueno** — la comida está **buena** |',
      '| **buen** | Adjektiv vor mask. Singular (Apokope) | un **buen** día — un **buen** hombre |',
      '| **bien** | Adverb — unveränderlich | Hablas muy **bien**. — Estoy **bien**. |',
      '| **mejor** | Komparativ beider Formen | Es **mejor** así. — Habla **mejor** que yo. |',
      '',
      '---',
      '',
      '**bueno/buen — das Adjektiv**',
      '',
      '- Passt sich in Genus und Numerus ans Nomen an: bueno / buena / buenos / buenas',
      '- Vor maskulinem Singular → **buen** (Apokope): un buen momento, un buen hombre',
      '- Mit ser: Es es **bueno** → er ist ein guter Mensch (Charakter)',
      '- Mit estar: Está **buena** → es schmeckt gut / sie ist attraktiv (Zustand)',
      '',
      '**bien — das Adverb**',
      '',
      '- Beschreibt, WIE man etwas tut: Habla **bien**. — Er spricht gut.',
      '- Beschreibt einen Zustand nach estar: Estoy **bien**. — Mir geht es gut.',
      '- Immer unveränderlich — kein Genus, kein Plural.',
      '',
      '---',
      '',
      '**⚠️ Die peinlichste Verwechslung**',
      '',
      '> Estoy **bien**. — Mir geht es gut. ✅',
      '> Estoy **bueno**. — Ich bin attraktiv / heiß. 😬',
      '',
      'Wenn jemand fragt **¿Cómo estás?** — immer **Estoy bien** antworten!',
    ].join('\n'),
    examples: [
      {
        spanish: 'Hablas muy bien el español.',
        german: 'Du sprichst sehr gut Spanisch.',
        explanation: 'BIEN als Adverb — beschreibt das Verb "sprechen". Wie sprichst du? → bien'
      },
      {
        spanish: 'Es un buen restaurante.',
        german: 'Es ist ein gutes Restaurant.',
        explanation: 'BUEN: Adjektiv vor maskulinem Singular (restaurante = maskulin). bueno → buen'
      },
      {
        spanish: 'Estoy bien, gracias.',
        german: 'Mir geht es gut, danke.',
        explanation: 'BIEN beim Befinden — die einzig richtige Antwort auf ¿Cómo estás?'
      },
      {
        spanish: 'La película está muy buena.',
        german: 'Der Film ist sehr gut.',
        explanation: 'BUENA: Adjektiv mit estar — Qualitätszustand (feminin → buena, nicht bueno)'
      }
    ],
    quiz: [
      {
        question: 'Hablas muy ___ español.',
        options: ['bien', 'bueno'],
        correct: 0,
        explanation: 'BIEN — Adverb, beschreibt das Verb. Wie sprichst du? → bien. Bueno würde eine Person oder Sache beschreiben.'
      },
      {
        question: '¿Cómo estás? — Estoy ___.',
        options: ['bien', 'bueno'],
        correct: 0,
        explanation: '"Estoy bien" = Mir geht es gut. "Estoy bueno" = Ich bin attraktiv — einer der häufigsten Anfängerfehler!'
      },
      {
        question: 'Es un ___ momento para hablar.',
        options: ['bien', 'bueno', 'buen'],
        correct: 2,
        explanation: 'BUN: Adjektiv vor maskulinem Singular (momento = maskulin). bueno → buen (Apokope). "Bien" ist Adverb, kein Adjektiv.'
      }
    ]
  },

  // ── Lesson 10: llegar ───────────────────────────────────────────────────────
  {
    id: 'leccion-10',
    title: 'Lección 10 – llegar: ankommen und mehr',
    category: 'Verben',
    difficulty: 'intermediate',
    explanation_de: [
      '**llegar** = ankommen. Aber kombiniert mit verschiedenen Ergänzungen deckt es weit mehr ab — von „pünktlich sein" bis „Präsident werden".',
      '',
      '---',
      '',
      '| Verwendung | Beispiel (ES) | Deutsch |',
      '|------------|--------------|---------|',
      '| ankommen | El tren llega a las ocho. | Der Zug kommt um 8 an. |',
      '| pünktlich | Siempre llega a tiempo. | Er kommt immer pünktlich. |',
      '| zu spät / zu früh | Hoy llegué tarde. | Heute kam ich zu spät. |',
      '| werden (nach langem Weg) | Llegó a ser directora. | Sie wurde Direktorin. |',
      '| es schaffen (+ Inf.) | Llegué a entenderlo. | Ich habe es schließlich verstanden. |',
      '| eine Grenze erreichen | El precio llegó a 200 €. | Der Preis stieg auf 200 €. |',
      '| eine Einigung | Llegaron a un acuerdo. | Sie erzielten eine Einigung. |',
      '| nicht reichen | El sueldo no llega. | Das Gehalt reicht nicht. |',
      '',
      '---',
      '',
      '**llegar a ser — werden nach einem langen Weg**',
      '',
      '> Llegó a ser presidente. — Er wurde (schließlich) Präsident.',
      '> ¿Llegarás a ser médico? — Wirst du (einmal) Arzt werden?',
      '',
      'Unterschied zu **ponerse**: ponerse beschreibt kurzfristige Zustandsänderungen (Gefühle). llegar a ser beschreibt ein langfristiges Ziel.',
      '',
      '**llegar a + Infinitiv — es wirklich schaffen**',
      '',
      '> Nunca llegué a conocerlo bien. — Ich habe ihn nie wirklich gut kennengelernt.',
      '> Por fin llegué a terminar el libro. — Ich habe das Buch endlich fertig gelesen.',
    ].join('\n'),
    examples: [
      {
        spanish: 'El tren llega a las ocho en punto.',
        german: 'Der Zug kommt um Punkt acht an.',
        explanation: 'Grundbedeutung: ankommen. Gilt für Transportmittel, Personen, Pakete.'
      },
      {
        spanish: 'Llegó a ser directora de la empresa.',
        german: 'Sie wurde schließlich Direktorin des Unternehmens.',
        explanation: 'llegar a ser = werden (nach einem langen Weg). Für kurzfristiges Werden: ponerse.'
      },
      {
        spanish: 'Nunca llegué a conocerlo bien.',
        german: 'Ich habe ihn nie wirklich gut kennengelernt.',
        explanation: 'llegar a + Infinitiv = es schaffen, etwas wirklich zu tun. Hier negiert: nie wirklich geschafft.'
      },
      {
        spanish: 'El nivel del agua llegó a dos metros.',
        german: 'Der Wasserstand erreichte zwei Meter.',
        explanation: 'llegar a + Grenze/Zahl = eine Grenze oder einen Wert erreichen.'
      },
      {
        spanish: 'Por favor, no llegues tarde.',
        german: 'Bitte komm nicht zu spät.',
        explanation: 'llegar tarde = zu spät kommen — häufige Alltagsphrase.'
      }
    ],
    quiz: [
      {
        question: '„Sie wurde schließlich Ärztin." — Welches passt?',
        options: [
          'Llegó a ser médica.',
          'Llegó a médica.',
          'Llegó ser médica.'
        ],
        correct: 0,
        explanation: '"Llegar a ser" = werden (nach einem langen Weg). Beide Teile — "a" und "ser" — sind nötig.'
      },
      {
        question: 'Was bedeutet „No me llega el dinero"?',
        options: [
          'Das Geld kommt nicht an.',
          'Mir reicht das Geld nicht.',
          'Ich finde das Geld nicht.'
        ],
        correct: 1,
        explanation: '"No llegar" im Sinne von ausreichen = nicht reichen. "No me llega el dinero" = Das Geld reicht mir nicht.'
      },
      {
        question: '„Ich habe das Buch endlich fertig gelesen." — Spanisch?',
        options: [
          'Por fin llegué a terminar el libro.',
          'Por fin llegué terminar el libro.',
          'Por fin llegué a terminar libro.'
        ],
        correct: 0,
        explanation: '"Llegar a + Infinitiv" = es schließlich schaffen. Das "a" darf nicht fehlen. "El libro" braucht den Artikel.'
      }
    ]
  },

  // ── Lesson 11: algo, alguien, alguno ────────────────────────────────────────
  {
    id: 'leccion-11',
    title: 'Lección 11 – algo, alguien, alguno...',
    category: 'Grammatik',
    difficulty: 'beginner',
    explanation_de: [
      'Die ALG-Wörter sind die positiven Gegenstücke zu den Negationswörtern aus Lección 8. Am einfachsten lernt man sie als Paare.',
      '',
      '---',
      '',
      '| Positiv | Deutsch | Negativ | Deutsch |',
      '|---------|---------|---------|---------|',
      '| **algo** | etwas | **nada** | nichts |',
      '| **alguien** | jemand | **nadie** | niemand |',
      '| **alguno/a** | irgendein/e | **ninguno/a** | kein/e |',
      '| **alguna vez** | jemals / irgendwann | **nunca** / **jamás** | nie |',
      '| **también** | auch | **tampoco** | auch nicht |',
      '',
      '---',
      '',
      '**algo und alguien**',
      '',
      '- **algo** = etwas — für Dinge und Ideen:',
      '> ¿Quieres algo de beber? — Möchtest du etwas zu trinken?',
      '> Hay algo raro aquí. — Hier ist etwas seltsam.',
      '',
      '- **alguien** = jemand — für Personen (mit personalem **a**!):',
      '> ¿Conoces a alguien aquí? — Kennst du hier jemanden?',
      '> Alguien llamó. — Jemand hat angerufen.',
      '',
      '**alguno/a und ninguno/a**',
      '',
      'Passen sich ans Nomen an. Vor maskulinem Singular: **algún / ningún** (Apokope wie buen):',
      '',
      '- ¿Tienes **algún** consejo? — Hast du irgendeinen Rat?',
      '- No hay **ningún** problema. — Es gibt kein Problem.',
      '- **Alguna** vez iré a Cuba. — Irgendwann werde ich nach Kuba fahren.',
      '',
      '---',
      '',
      '**⚠️ In Fragen: algo oder nada?**',
      '',
      '> ¿Quieres **algo**? — Möchtest du etwas? (echtes Angebot → algo)',
      '> ¿No quieres **nada**? — Willst du wirklich nichts? (Verneinung bereits im Satz → nada)',
    ].join('\n'),
    examples: [
      {
        spanish: '¿Quieres algo de comer?',
        german: 'Möchtest du etwas essen?',
        explanation: 'algo in Fragen = etwas. Positiver Kontext → algo, nicht nada.'
      },
      {
        spanish: '¿Conoces a alguien en Madrid?',
        german: 'Kennst du jemanden in Madrid?',
        explanation: 'alguien = jemand. Beachte das "a" — es ist eine Person (persönliches "a").'
      },
      {
        spanish: '¿Has estado alguna vez en Argentina?',
        german: 'Warst du jemals in Argentinien?',
        explanation: 'alguna vez = jemals / irgendwann. Häufig in Fragen über Erfahrungen.'
      },
      {
        spanish: '¿Tienes algún problema?',
        german: 'Hast du irgendein Problem?',
        explanation: 'algún (nicht alguno) vor maskulinem Singular — Apokope wie buen bei bueno.'
      },
      {
        spanish: 'No tengo ningún plan para mañana.',
        german: 'Ich habe keinen Plan für morgen.',
        explanation: 'ningún vor maskulinem Singular + no vor dem Verb = doppelte Verneinung.'
      }
    ],
    quiz: [
      {
        question: '¿Quieres ___ más? (Möchtest du noch etwas?)',
        options: ['algo', 'nada'],
        correct: 0,
        explanation: 'algo = etwas — für positive Fragen und Angebote. "Nada" wäre ein Angebot von Nichts.'
      },
      {
        question: 'No veo a ___. (Ich sehe niemanden.)',
        options: ['alguien', 'nadie'],
        correct: 1,
        explanation: 'nadie = niemand. Mit "no" vor dem Verb kommt nadie (doppelte Verneinung). Alguien = jemanden — positiv.'
      },
      {
        question: '¿Tienes ___ problema? (Hast du irgendein Problem?)',
        options: ['alguno', 'algún', 'alguna'],
        correct: 1,
        explanation: 'algún: Vor maskulinem Singular (problema ist maskulin) wird alguno zu algún verkürzt — Apokope wie bueno → buen.'
      }
    ]
  },

  // ── Lesson 12: lo, la, le ───────────────────────────────────────────────────
  {
    id: 'leccion-12',
    title: 'Lección 12 – lo, la, le — Objektpronomen',
    category: 'Grammatik',
    difficulty: 'intermediate',
    explanation_de: [
      'Objektpronomen ersetzen Nomen im Satz. **lo/la** ersetzen das direkte Objekt (wen? was?), **le** das indirekte Objekt (wem?).',
      '',
      '---',
      '',
      '| Funktion | Singular | Plural |',
      '|----------|---------|--------|',
      '| Direktobjekt maskulin | **lo** — ihn / es | **los** — sie |',
      '| Direktobjekt feminin | **la** — sie / es | **las** — sie |',
      '| Indirektobjekt (m+f) | **le** — ihm / ihr | **les** — ihnen |',
      '| Neutral „es" (Aussagen) | **lo** | — |',
      '',
      '---',
      '',
      '**lo / la — direktes Objekt (wen? was?)**',
      '',
      'Das Genus des ersetzten Nomens bestimmt lo oder la:',
      '',
      '> Veo el coche → **Lo** veo. — Ich sehe ihn/es. (el coche = maskulin → lo)',
      '> Veo la casa → **La** veo. — Ich sehe sie/es. (la casa = feminin → la)',
      '',
      '**lo als neutrales „es"** — für Aussagen und Ideen ohne Genus:',
      '> ¿Sabes que llegó? — **Lo** sé. — Ich weiß es.',
      '> Es difícil, pero **lo** entiendo. — Es ist schwierig, aber ich verstehe es.',
      '',
      '**le / les — indirektes Objekt (wem?)**',
      '',
      '> Doy el libro a Ana → **Le** doy el libro. — Ich gebe ihr das Buch.',
      '> Escribo a mis padres → **Les** escribo. — Ich schreibe ihnen.',
      '',
      '**⚠️ le/les + lo/la → se lo / se la**',
      '',
      'Wenn le oder les direkt vor lo/la steht, wird le/les zu **se**:',
      '> Le lo doy → **Se lo** doy. — Ich gebe es ihr/ihm.',
      '> Les la mando → **Se la** mando. — Ich schicke sie (Nachricht) ihnen.',
      '',
      '---',
      '',
      '**Position der Pronomen**',
      '',
      '- Vor konjugiertem Verb: **Lo** veo. / **Le** escribo.',
      '- An Infinitiv angehängt ODER davor — beides korrekt: Quiero ver**lo**. = **Lo** quiero ver.',
      '- Positiver Imperativ → immer angehängt: ¡Dá**melo**! — ¡Llá**mala**!',
    ].join('\n'),
    examples: [
      {
        spanish: '¿Dónde está el libro? Lo veo en la mesa.',
        german: 'Wo ist das Buch? Ich sehe es auf dem Tisch.',
        explanation: 'lo = direktes Objekt, maskulin (el libro). Lo steht vor dem konjugierten Verb.'
      },
      {
        spanish: '¿Conoces a María? Sí, la conozco.',
        german: 'Kennst du María? Ja, ich kenne sie.',
        explanation: 'la = direktes Objekt, feminin (María). Das Pronomen richtet sich nach Genus.'
      },
      {
        spanish: 'Le escribí una carta a mi abuela.',
        german: 'Ich schrieb meiner Oma einen Brief.',
        explanation: 'le = indirektes Objekt (wem schrieb ich? → ihr). Das direkte Objekt ist "una carta".'
      },
      {
        spanish: '¿Lo sabes? — Sí, lo sé.',
        german: 'Weißt du es? — Ja, ich weiß es.',
        explanation: 'lo als neutrales "es" — bezieht sich auf eine Aussage, nicht auf ein bestimmtes Nomen.'
      },
      {
        spanish: 'Se lo expliqué ayer.',
        german: 'Ich habe es ihm/ihr gestern erklärt.',
        explanation: 'le + lo → se lo (le wird zu se, wenn lo/la folgt). se = ihm/ihr, lo = es.'
      },
      {
        spanish: 'Quiero verla este fin de semana.',
        german: 'Ich möchte sie dieses Wochenende sehen.',
        explanation: 'la angehängt an den Infinitiv "ver". Gleichbedeutend: "La quiero ver este fin de semana."'
      }
    ],
    quiz: [
      {
        question: '„Ich kenne ihn." — Spanisch? (él = maskulin)',
        options: ['Le conozco.', 'Lo conozco.', 'La conozco.'],
        correct: 1,
        explanation: 'lo = direktes Objekt, maskulin (wen kenne ich? → ihn). Le wäre indirektes Objekt. La wäre feminin.'
      },
      {
        question: '„Ich gebe es ihr." — Spanisch? (lo = es, le = ihr)',
        options: ['Le lo doy.', 'Lo le doy.', 'Se lo doy.'],
        correct: 2,
        explanation: 'le + lo → se lo (Pflicht). Zwei Pronomen mit l hintereinander werden vermieden. Se = ihr, lo = es.'
      },
      {
        question: '¿Tienes el número? — Sí, ___ tengo.',
        options: ['lo', 'la', 'le'],
        correct: 0,
        explanation: 'lo: "el número" ist maskulin → direktes Objekt maskulin = lo. La wäre feminin, le wäre indirektes Objekt.'
      }
    ]
  }

];

// Append to existing lessons
const existingIds = new Set(lektionen.lessons.map(l => l.id));
let added = 0;
for (const lesson of newLessons) {
  if (existingIds.has(lesson.id)) {
    console.log('SKIP (already exists):', lesson.id);
  } else {
    lektionen.lessons.push(lesson);
    added++;
    console.log('ADDED:', lesson.id, '-', lesson.title);
  }
}

writeJson(lektionenPath, lektionen);
console.log('\nTotal lessons now:', lektionen.lessons.length, '(added', added, ')');
