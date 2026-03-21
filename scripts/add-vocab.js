const fs = require('fs');
const path = require('path');

const base = path.join(__dirname, '..');

// ── 1. Add 20 vocab entries to vocabulario-es.json ──────────────────────────
const vocabPath = path.join(base, 'data/vocabulario-es.json');
const vocab = JSON.parse(fs.readFileSync(vocabPath, 'utf8'));

const newEntries = [
  {
    id: '2463',
    spanish: 'c\u00f3mo',
    german: 'wie',
    type: 'other',
    sentence_es: '\u00bfC\u00f3mo est\u00e1s hoy?',
    sentence_de: 'Wie geht es dir heute?',
    audio: '',
    word_translations: { 'c\u00f3mo': 'wie', 'est\u00e1s': 'geht es dir', 'hoy': 'heute' }
  },
  {
    id: '2464',
    spanish: 'sentir / sentirse',
    german: 'f\u00fchlen / sich f\u00fchlen',
    type: 'verb',
    sentence_es: 'Me siento muy bien hoy.',
    sentence_de: 'Ich f\u00fchle mich heute sehr gut.',
    audio: '',
    word_translations: { 'me': 'mich', 'siento': 'f\u00fchle', 'muy': 'sehr', 'bien': 'gut', 'hoy': 'heute' }
  },
  {
    id: '2465',
    spanish: 'la leche',
    german: 'die Milch',
    type: 'noun',
    sentence_es: 'Necesito leche para el caf\u00e9.',
    sentence_de: 'Ich brauche Milch f\u00fcr den Kaffee.',
    audio: '',
    word_translations: { 'necesito': 'ich brauche', 'leche': 'Milch', 'para': 'f\u00fcr', 'el': 'den', 'caf\u00e9': 'Kaffee' }
  },
  {
    id: '2466',
    spanish: 'el caf\u00e9',
    german: 'der Kaffee',
    type: 'noun',
    sentence_es: 'Me encanta tomar caf\u00e9 por la ma\u00f1ana.',
    sentence_de: 'Ich liebe es, morgens Kaffee zu trinken.',
    audio: '',
    word_translations: { 'me': 'mir', 'encanta': 'gef\u00e4llt sehr', 'tomar': 'trinken', 'caf\u00e9': 'Kaffee', 'por': 'am', 'la': 'die', 'ma\u00f1ana': 'Morgen' }
  },
  {
    id: '2467',
    spanish: 'nervioso / nerviosa',
    german: 'nerv\u00f6s',
    type: 'adjective',
    sentence_es: 'Estoy nervioso antes del examen.',
    sentence_de: 'Ich bin vor der Pr\u00fcfung nerv\u00f6s.',
    audio: '',
    word_translations: { 'estoy': 'ich bin', 'nervioso': 'nerv\u00f6s', 'antes': 'vor', 'del': 'der', 'examen': 'Pr\u00fcfung' }
  },
  {
    id: '2468',
    spanish: 'enojado / enojada',
    german: 'w\u00fctend / ver\u00e4rgert',
    type: 'adjective',
    sentence_es: 'Estoy muy enojada con \u00e9l.',
    sentence_de: 'Ich bin sehr w\u00fctend auf ihn.',
    audio: '',
    word_translations: { 'estoy': 'ich bin', 'muy': 'sehr', 'enojada': 'w\u00fctend', 'con': 'auf', '\u00e9l': 'ihn' }
  },
  {
    id: '2469',
    spanish: 'emocionado / emocionada',
    german: 'aufgeregt / begeistert',
    type: 'adjective',
    sentence_es: 'Estoy emocionada por el viaje.',
    sentence_de: 'Ich bin begeistert von der Reise.',
    audio: '',
    word_translations: { 'estoy': 'ich bin', 'emocionada': 'begeistert', 'por': 'von', 'el': 'die', 'viaje': 'Reise' }
  },
  {
    id: '2470',
    spanish: 'mantener',
    german: 'aufrechterhalten / behalten',
    type: 'verb',
    sentence_es: 'Es dif\u00edcil mantener una dieta saludable.',
    sentence_de: 'Es ist schwer, eine gesunde Ern\u00e4hrung beizubehalten.',
    audio: '',
    word_translations: { 'es': 'es ist', 'dif\u00edcil': 'schwer', 'mantener': 'beizubehalten', 'una': 'eine', 'dieta': 'Ern\u00e4hrung', 'saludable': 'gesunde' }
  },
  {
    id: '2471',
    spanish: 'comenzar',
    german: 'beginnen / anfangen',
    type: 'verb',
    sentence_es: 'La clase comienza a las nueve.',
    sentence_de: 'Der Unterricht beginnt um neun Uhr.',
    audio: '',
    word_translations: { 'la': 'der', 'clase': 'Unterricht', 'comienza': 'beginnt', 'a': 'um', 'las': 'die', 'nueve': 'neun' }
  },
  {
    id: '2472',
    spanish: 'morir',
    german: 'sterben',
    type: 'verb',
    sentence_es: 'Las plantas mueren sin agua.',
    sentence_de: 'Pflanzen sterben ohne Wasser.',
    audio: '',
    word_translations: { 'las': 'die', 'plantas': 'Pflanzen', 'mueren': 'sterben', 'sin': 'ohne', 'agua': 'Wasser' }
  },
  {
    id: '2473',
    spanish: 'aparecer',
    german: 'erscheinen / auftauchen',
    type: 'verb',
    sentence_es: 'El sol aparece por la ma\u00f1ana.',
    sentence_de: 'Die Sonne erscheint am Morgen.',
    audio: '',
    word_translations: { 'el': 'die', 'sol': 'Sonne', 'aparece': 'erscheint', 'por': 'am', 'la': 'dem', 'ma\u00f1ana': 'Morgen' }
  },
  {
    id: '2474',
    spanish: 'existir',
    german: 'existieren',
    type: 'verb',
    sentence_es: '\u00bfExisten otras galaxias en el universo?',
    sentence_de: 'Gibt es andere Galaxien im Universum?',
    audio: '',
    word_translations: { 'existen': 'gibt es', 'otras': 'andere', 'galaxias': 'Galaxien', 'en': 'im', 'el': 'das', 'universo': 'Universum' }
  },
  {
    id: '2475',
    spanish: 'o\u00edr',
    german: 'h\u00f6ren',
    type: 'verb',
    sentence_es: '\u00bfOyes esa m\u00fasica? Es preciosa.',
    sentence_de: 'H\u00f6rst du diese Musik? Sie ist wundersch\u00f6n.',
    audio: '',
    word_translations: { 'oyes': 'h\u00f6rst du', 'esa': 'diese', 'm\u00fasica': 'Musik', 'es': 'sie ist', 'preciosa': 'wundersch\u00f6n' }
  },
  {
    id: '2476',
    spanish: 'servir',
    german: 'dienen / n\u00fctzen',
    type: 'verb',
    sentence_es: '\u00bfPara qu\u00e9 sirve esto?',
    sentence_de: 'Wof\u00fcr dient das?',
    audio: '',
    word_translations: { 'para': 'f\u00fcr', 'qu\u00e9': 'was', 'sirve': 'dient', 'esto': 'das' }
  },
  {
    id: '2477',
    spanish: 'el restaurante',
    german: 'das Restaurant',
    type: 'noun',
    sentence_es: 'Vamos a cenar en un restaurante.',
    sentence_de: 'Wir gehen in einem Restaurant essen.',
    audio: '',
    word_translations: { 'vamos': 'wir gehen', 'a': 'zum', 'cenar': 'Abendessen', 'en': 'in', 'un': 'einem', 'restaurante': 'Restaurant' }
  },
  {
    id: '2478',
    spanish: 'internet',
    german: 'das Internet',
    type: 'noun',
    sentence_es: 'Necesito conexi\u00f3n a internet.',
    sentence_de: 'Ich brauche eine Internetverbindung.',
    audio: '',
    word_translations: { 'necesito': 'ich brauche', 'conexi\u00f3n': 'Verbindung', 'a': 'zum', 'internet': 'Internet' }
  },
  {
    id: '2479',
    spanish: 'asustado / asustada',
    german: 'ver\u00e4ngstigt / erschrocken',
    type: 'adjective',
    sentence_es: 'El ni\u00f1o est\u00e1 asustado de la oscuridad.',
    sentence_de: 'Das Kind hat Angst vor der Dunkelheit.',
    audio: '',
    word_translations: { 'el': 'das', 'ni\u00f1o': 'Kind', 'est\u00e1': 'ist', 'asustado': 'ver\u00e4ngstigt', 'de': 'vor', 'la': 'der', 'oscuridad': 'Dunkelheit' }
  },
  {
    id: '2480',
    spanish: 'orgulloso / orgullosa',
    german: 'stolz',
    type: 'adjective',
    sentence_es: 'Estoy muy orgullosa de ti.',
    sentence_de: 'Ich bin sehr stolz auf dich.',
    audio: '',
    word_translations: { 'estoy': 'ich bin', 'muy': 'sehr', 'orgullosa': 'stolz', 'de': 'auf', 'ti': 'dich' }
  },
  {
    id: '2481',
    spanish: 'enamorado / enamorada',
    german: 'verliebt',
    type: 'adjective',
    sentence_es: 'Estoy enamorado de ella.',
    sentence_de: 'Ich bin in sie verliebt.',
    audio: '',
    word_translations: { 'estoy': 'ich bin', 'enamorado': 'verliebt', 'de': 'in', 'ella': 'sie' }
  },
  {
    id: '2482',
    spanish: 'deprimido / deprimida',
    german: 'deprimiert',
    type: 'adjective',
    sentence_es: 'Me siento deprimido \u00faltimamente.',
    sentence_de: 'Ich f\u00fchle mich in letzter Zeit deprimiert.',
    audio: '',
    word_translations: { 'me': 'mich', 'siento': 'f\u00fchle', 'deprimido': 'deprimiert', '\u00faltimamente': 'in letzter Zeit' }
  }
];

const updatedVocab = [...vocab, ...newEntries];
fs.writeFileSync(vocabPath, JSON.stringify(updatedVocab, null, 2), 'utf8');
console.log('vocabulario-es.json: added', newEntries.length, 'entries. Total:', updatedVocab.length);

// ── 2. Add 5 phrases to redewendungen.json ──────────────────────────────────
const redePath = path.join(base, 'data/modules/redewendungen.json');
const redeData = JSON.parse(fs.readFileSync(redePath, 'utf8'));

const newPhrases = [
  {
    id: 'r5',
    spanish: 'Buenos d\u00edas',
    german: 'Guten Morgen',
    literal: '',
    sentence_es: 'Buenos d\u00edas, \u00bfc\u00f3mo est\u00e1 usted?',
    sentence_de: 'Guten Morgen, wie geht es Ihnen?',
    audio: '',
    word_translations: { 'buenos': 'gute', 'd\u00edas': 'Tage/Morgen', 'c\u00f3mo': 'wie', 'est\u00e1': 'geht', 'usted': 'Ihnen' }
  },
  {
    id: 'r6',
    spanish: 'Por favor',
    german: 'Bitte',
    literal: '',
    sentence_es: '\u00bfMe puede ayudar, por favor?',
    sentence_de: 'K\u00f6nnen Sie mir bitte helfen?',
    audio: '',
    word_translations: { 'me': 'mir', 'puede': 'k\u00f6nnen Sie', 'ayudar': 'helfen', 'por': 'f\u00fcr', 'favor': 'Gefallen/bitte' }
  },
  {
    id: 'r7',
    spanish: 'Gracias',
    german: 'Danke',
    literal: '',
    sentence_es: 'Muchas gracias por tu ayuda.',
    sentence_de: 'Vielen Dank f\u00fcr deine Hilfe.',
    audio: '',
    word_translations: { 'muchas': 'vielen', 'gracias': 'Dank/Danke', 'por': 'f\u00fcr', 'tu': 'deine', 'ayuda': 'Hilfe' }
  },
  {
    id: 'r8',
    spanish: '\u00bfCu\u00e1nto cuesta?',
    german: 'Wie viel kostet das?',
    literal: '',
    sentence_es: '\u00bfCu\u00e1nto cuesta este caf\u00e9?',
    sentence_de: 'Wie viel kostet dieser Kaffee?',
    audio: '',
    word_translations: { 'cu\u00e1nto': 'wie viel', 'cuesta': 'kostet', 'este': 'dieser', 'caf\u00e9': 'Kaffee' }
  },
  {
    id: 'r9',
    spanish: 'No entiendo',
    german: 'Ich verstehe nicht',
    literal: '',
    sentence_es: 'No entiendo, \u00bfpuede repetir?',
    sentence_de: 'Ich verstehe nicht, k\u00f6nnen Sie wiederholen?',
    audio: '',
    word_translations: { 'no': 'nicht', 'entiendo': 'ich verstehe', 'puede': 'k\u00f6nnen Sie', 'repetir': 'wiederholen' }
  }
];

redeData.phrases = [...redeData.phrases, ...newPhrases];
fs.writeFileSync(redePath, JSON.stringify(redeData, null, 2), 'utf8');
console.log('redewendungen.json: added', newPhrases.length, 'phrases. Total:', redeData.phrases.length);

// ── 3. Add IDs to module files ────────────────────────────────────────────────
// vokabeln-2: ultra-basics (cómo, sentir, leche, café)
const v2Path = path.join(base, 'data/modules/vokabeln-2.json');
const v2 = JSON.parse(fs.readFileSync(v2Path, 'utf8'));
v2.vocabIds = [...v2.vocabIds, '2463', '2464', '2465', '2466'];
fs.writeFileSync(v2Path, JSON.stringify(v2, null, 2), 'utf8');
console.log('vokabeln-2.json: added 4 IDs. Total:', v2.vocabIds.length);

// vokabeln-3: remaining 16 entries (2467–2482)
const v3Path = path.join(base, 'data/modules/vokabeln-3.json');
const v3 = JSON.parse(fs.readFileSync(v3Path, 'utf8'));
const v3New = Array.from({ length: 16 }, (_, i) => String(2467 + i));
v3.vocabIds = [...v3.vocabIds, ...v3New];
fs.writeFileSync(v3Path, JSON.stringify(v3, null, 2), 'utf8');
console.log('vokabeln-3.json: added 16 IDs. Total:', v3.vocabIds.length);

console.log('\nAll done!');
