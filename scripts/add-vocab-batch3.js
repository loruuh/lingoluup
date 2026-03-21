const fs = require('fs');
const path = require('path');

const base = path.join(__dirname, '..');

// ── PART A: Numbers 21–29 (IDs 2503–2511) ────────────────────────────────────
const vocabPath = path.join(base, 'data/vocabulario-es.json');
const vocab = JSON.parse(fs.readFileSync(vocabPath, 'utf8'));

const numberEntries = [
  {
    id: '2503',
    spanish: 'veintiuno',
    german: 'einundzwanzig',
    type: 'number',
    sentence_es: 'Tengo veinti\u00fan a\u00f1os.',
    sentence_de: 'Ich bin einundzwanzig Jahre alt.',
    audio: '',
    word_translations: { 'tengo': 'ich bin', 'veinti\u00fan': 'einundzwanzig', 'a\u00f1os': 'Jahre' }
  },
  {
    id: '2504',
    spanish: 'veintid\u00f3s',
    german: 'zweiundzwanzig',
    type: 'number',
    sentence_es: 'Hoy es veintid\u00f3s de marzo.',
    sentence_de: 'Heute ist der zweiundzwanzigste M\u00e4rz.',
    audio: '',
    word_translations: { 'hoy': 'heute', 'es': 'ist', 'veintid\u00f3s': 'zweiundzwanzig', 'de': 'des', 'marzo': 'M\u00e4rz' }
  },
  {
    id: '2505',
    spanish: 'veintitr\u00e9s',
    german: 'dreiundzwanzig',
    type: 'number',
    sentence_es: 'Son las veintitr\u00e9s horas.',
    sentence_de: 'Es ist dreiundzwanzig Uhr.',
    audio: '',
    word_translations: { 'son': 'es ist', 'las': 'die', 'veintitr\u00e9s': 'dreiundzwanzig', 'horas': 'Uhr/Stunden' }
  },
  {
    id: '2506',
    spanish: 'veinticuatro',
    german: 'vierundzwanzig',
    type: 'number',
    sentence_es: 'El d\u00eda tiene veinticuatro horas.',
    sentence_de: 'Der Tag hat vierundzwanzig Stunden.',
    audio: '',
    word_translations: { 'el': 'der', 'd\u00eda': 'Tag', 'tiene': 'hat', 'veinticuatro': 'vierundzwanzig', 'horas': 'Stunden' }
  },
  {
    id: '2507',
    spanish: 'veinticinco',
    german: 'f\u00fcnfundzwanzig',
    type: 'number',
    sentence_es: 'Mi cumplea\u00f1os es el veinticinco de diciembre.',
    sentence_de: 'Mein Geburtstag ist am f\u00fcnfundzwanzigsten Dezember.',
    audio: '',
    word_translations: { 'mi': 'mein', 'cumplea\u00f1os': 'Geburtstag', 'es': 'ist', 'el': 'am', 'veinticinco': 'f\u00fcnfundzwanzig', 'de': 'des', 'diciembre': 'Dezember' }
  },
  {
    id: '2508',
    spanish: 'veintis\u00e9is',
    german: 'sechsundzwanzig',
    type: 'number',
    sentence_es: 'Vivo en el piso veintis\u00e9is.',
    sentence_de: 'Ich wohne im sechsundzwanzigsten Stock.',
    audio: '',
    word_translations: { 'vivo': 'ich wohne', 'en': 'im', 'el': 'dem', 'piso': 'Stock/Etage', 'veintis\u00e9is': 'sechsundzwanzig' }
  },
  {
    id: '2509',
    spanish: 'veintisiete',
    german: 'siebenundzwanzig',
    type: 'number',
    sentence_es: 'Necesito veintisiete euros.',
    sentence_de: 'Ich brauche siebenundzwanzig Euro.',
    audio: '',
    word_translations: { 'necesito': 'ich brauche', 'veintisiete': 'siebenundzwanzig', 'euros': 'Euro' }
  },
  {
    id: '2510',
    spanish: 'veintiocho',
    german: 'achtundzwanzig',
    type: 'number',
    sentence_es: 'Febrero tiene veintiocho d\u00edas.',
    sentence_de: 'Februar hat achtundzwanzig Tage.',
    audio: '',
    word_translations: { 'febrero': 'Februar', 'tiene': 'hat', 'veintiocho': 'achtundzwanzig', 'd\u00edas': 'Tage' }
  },
  {
    id: '2511',
    spanish: 'veintinueve',
    german: 'neunundzwanzig',
    type: 'number',
    sentence_es: 'Llego el veintinueve de este mes.',
    sentence_de: 'Ich komme am neunundzwanzigsten dieses Monats an.',
    audio: '',
    word_translations: { 'llego': 'ich komme an', 'el': 'am', 'veintinueve': 'neunundzwanzig', 'de': 'dieses', 'este': 'dieses', 'mes': 'Monats' }
  }
];

const updatedVocab = [...vocab, ...numberEntries];
fs.writeFileSync(vocabPath, JSON.stringify(updatedVocab, null, 2), 'utf8');
console.log('vocabulario-es.json: added', numberEntries.length, 'numbers. Total:', updatedVocab.length);

// Add number IDs to zahlen.json
const zahlenPath = path.join(base, 'data/modules/zahlen.json');
const zahlen = JSON.parse(fs.readFileSync(zahlenPath, 'utf8'));
zahlen.vocabIds = [...zahlen.vocabIds, ...numberEntries.map(e => e.id)];
fs.writeFileSync(zahlenPath, JSON.stringify(zahlen, null, 2), 'utf8');
console.log('zahlen.json: added 9 IDs. Total:', zahlen.vocabIds.length);

// ── PART B: 10 survival phrases (r10–r19) ────────────────────────────────────
const redePath = path.join(base, 'data/modules/redewendungen.json');
const redeData = JSON.parse(fs.readFileSync(redePath, 'utf8'));

const newPhrases = [
  {
    id: 'r10',
    spanish: 'Buenas tardes',
    german: 'Guten Tag / Guten Nachmittag',
    literal: '',
    sentence_es: 'Buenas tardes, se\u00f1or Garc\u00eda.',
    sentence_de: 'Guten Tag, Herr Garc\u00eda.',
    audio: '',
    word_translations: { 'buenas': 'gute', 'tardes': 'Nachmittag/Tag', 'se\u00f1or': 'Herr' }
  },
  {
    id: 'r11',
    spanish: 'Buenas noches',
    german: 'Guten Abend / Gute Nacht',
    literal: '',
    sentence_es: 'Buenas noches, que descanses.',
    sentence_de: 'Gute Nacht, schlaf gut.',
    audio: '',
    word_translations: { 'buenas': 'gute', 'noches': 'N\u00e4chte/Nacht', 'que': 'dass', 'descanses': 'du dich ausruhst' }
  },
  {
    id: 'r12',
    spanish: 'Hasta luego',
    german: 'Bis sp\u00e4ter',
    literal: '',
    sentence_es: 'Hasta luego, nos vemos ma\u00f1ana.',
    sentence_de: 'Bis sp\u00e4ter, wir sehen uns morgen.',
    audio: '',
    word_translations: { 'hasta': 'bis', 'luego': 'sp\u00e4ter', 'nos': 'uns', 'vemos': 'sehen', 'ma\u00f1ana': 'morgen' }
  },
  {
    id: 'r13',
    spanish: '\u00bfQu\u00e9 tal?',
    german: 'Wie geht\'s?',
    literal: '',
    sentence_es: 'Hola, \u00bfqu\u00e9 tal est\u00e1s?',
    sentence_de: 'Hallo, wie geht\'s dir?',
    audio: '',
    word_translations: { 'qu\u00e9': 'was', 'tal': 'so', 'est\u00e1s': 'geht es dir' }
  },
  {
    id: 'r14',
    spanish: 'De nada',
    german: 'Gern geschehen / Keine Ursache',
    literal: '',
    sentence_es: '\u00a1Gracias! - De nada.',
    sentence_de: 'Danke! - Gern geschehen.',
    audio: '',
    word_translations: { 'de': 'von', 'nada': 'nichts' }
  },
  {
    id: 'r15',
    spanish: 'Perd\u00f3n',
    german: 'Entschuldigung / Verzeihung',
    literal: '',
    sentence_es: 'Perd\u00f3n, \u00bfpuede repetir?',
    sentence_de: 'Entschuldigung, k\u00f6nnen Sie wiederholen?',
    audio: '',
    word_translations: { 'perd\u00f3n': 'Entschuldigung', 'puede': 'k\u00f6nnen Sie', 'repetir': 'wiederholen' }
  },
  {
    id: 'r16',
    spanish: 'Lo siento',
    german: 'Es tut mir leid',
    literal: '',
    sentence_es: 'Lo siento mucho por el retraso.',
    sentence_de: 'Es tut mir sehr leid wegen der Versp\u00e4tung.',
    audio: '',
    word_translations: { 'lo': 'es', 'siento': 'tut mir leid', 'mucho': 'sehr', 'por': 'wegen', 'el': 'der', 'retraso': 'Versp\u00e4tung' }
  },
  {
    id: 'r17',
    spanish: '\u00bfD\u00f3nde est\u00e1...?',
    german: 'Wo ist...?',
    literal: '',
    sentence_es: '\u00bfD\u00f3nde est\u00e1 la estaci\u00f3n de tren?',
    sentence_de: 'Wo ist der Bahnhof?',
    audio: '',
    word_translations: { 'd\u00f3nde': 'wo', 'est\u00e1': 'ist', 'la': 'der', 'estaci\u00f3n': 'Bahnhof', 'de': 'von', 'tren': 'Zug' }
  },
  {
    id: 'r18',
    spanish: '\u00bfHablas ingl\u00e9s?',
    german: 'Sprichst du Englisch?',
    literal: '',
    sentence_es: 'Perd\u00f3n, \u00bfhablas ingl\u00e9s o alem\u00e1n?',
    sentence_de: 'Entschuldigung, sprichst du Englisch oder Deutsch?',
    audio: '',
    word_translations: { 'hablas': 'sprichst du', 'ingl\u00e9s': 'Englisch', 'o': 'oder', 'alem\u00e1n': 'Deutsch' }
  },
  {
    id: 'r19',
    spanish: 'M\u00e1s despacio, por favor',
    german: 'Langsamer, bitte',
    literal: '',
    sentence_es: 'No entiendo, m\u00e1s despacio, por favor.',
    sentence_de: 'Ich verstehe nicht, langsamer, bitte.',
    audio: '',
    word_translations: { 'm\u00e1s': 'mehr/langsamer', 'despacio': 'langsam', 'por': 'f\u00fcr', 'favor': 'Gefallen/bitte' }
  }
];

redeData.phrases = [...redeData.phrases, ...newPhrases];
fs.writeFileSync(redePath, JSON.stringify(redeData, null, 2), 'utf8');
console.log('redewendungen.json: added', newPhrases.length, 'phrases. Total:', redeData.phrases.length);

// ── Verify ────────────────────────────────────────────────────────────────────
const finalVocab = JSON.parse(fs.readFileSync(vocabPath, 'utf8'));
const addedNums = finalVocab.filter(e => parseInt(e.id) >= 2503 && parseInt(e.id) <= 2511);
const addedNumsOk = addedNums.every(e => e.id && e.spanish && e.german && e.type === 'number' && e.sentence_es && e.sentence_de);

const finalRede = JSON.parse(fs.readFileSync(redePath, 'utf8'));
const addedPhrases = finalRede.phrases.filter(p => ['r10','r11','r12','r13','r14','r15','r16','r17','r18','r19'].includes(p.id));
const addedPhrasesOk = addedPhrases.every(p => p.id && p.spanish && p.german && p.sentence_es && p.sentence_de);

console.log('\n--- Verification ---');
console.log('Numbers added:', addedNums.length, '| Fields valid:', addedNumsOk);
addedNums.forEach(e => console.log(' ', e.id, '|', e.spanish, '|', e.german));
console.log('\nPhrases added:', addedPhrases.length, '| Fields valid:', addedPhrasesOk);
addedPhrases.forEach(p => console.log(' ', p.id, '|', p.spanish, '|', p.german));
console.log('\nFinal zahlen.json vocabIds:', JSON.parse(fs.readFileSync(zahlenPath,'utf8')).vocabIds.length);
console.log('Final redewendungen phrases:', finalRede.phrases.length);
console.log('Final vocabulario-es.json total:', finalVocab.length);
