const fs = require('fs');
const path = require('path');

const base = path.join(__dirname, '..');

// ── Deduplicate vocabulario-es.json (remove any duplicate IDs) ───────────────
const vocabPath = path.join(base, 'data/vocabulario-es.json');
let vocab = JSON.parse(fs.readFileSync(vocabPath, 'utf8'));

const seenIds = new Set();
vocab = vocab.filter(e => {
  if (seenIds.has(e.id)) return false;
  seenIds.add(e.id);
  return true;
});
console.log('After dedup:', vocab.length, 'entries, last id:', vocab[vocab.length - 1].id);

// ── Batch 2: 20 new entries (IDs 2483–2502) ──────────────────────────────────
const newEntries = [
  {
    id: '2483',
    spanish: 'estresado / estresada',
    german: 'gestresst',
    type: 'adjective',
    sentence_es: 'Estoy muy estresado con el trabajo.',
    sentence_de: 'Ich bin sehr gestresst mit der Arbeit.',
    audio: '',
    word_translations: { 'estoy': 'ich bin', 'muy': 'sehr', 'estresado': 'gestresst', 'con': 'mit', 'el': 'der', 'trabajo': 'Arbeit' }
  },
  {
    id: '2484',
    spanish: 'relajado / relajada',
    german: 'entspannt',
    type: 'adjective',
    sentence_es: 'Me siento relajado en la playa.',
    sentence_de: 'Ich f\u00fchle mich am Strand entspannt.',
    audio: '',
    word_translations: { 'me': 'mich', 'siento': 'f\u00fchle', 'relajado': 'entspannt', 'en': 'am', 'la': 'der', 'playa': 'Strand' }
  },
  {
    id: '2485',
    spanish: 'confundido / confundida',
    german: 'verwirrt',
    type: 'adjective',
    sentence_es: 'Estoy confundido con las instrucciones.',
    sentence_de: 'Ich bin verwirrt von den Anweisungen.',
    audio: '',
    word_translations: { 'estoy': 'ich bin', 'confundido': 'verwirrt', 'con': 'von', 'las': 'den', 'instrucciones': 'Anweisungen' }
  },
  {
    id: '2486',
    spanish: 'sorprendido / sorprendida',
    german: '\u00fcberrascht',
    type: 'adjective',
    sentence_es: 'Estoy sorprendido por su visita.',
    sentence_de: 'Ich bin \u00fcberrascht von seinem Besuch.',
    audio: '',
    word_translations: { 'estoy': 'ich bin', 'sorprendido': '\u00fcberrascht', 'por': 'von', 'su': 'seinem', 'visita': 'Besuch' }
  },
  {
    id: '2487',
    spanish: 'preocupado / preocupada',
    german: 'besorgt',
    type: 'adjective',
    sentence_es: 'Estoy preocupado por mi salud.',
    sentence_de: 'Ich bin besorgt um meine Gesundheit.',
    audio: '',
    word_translations: { 'estoy': 'ich bin', 'preocupado': 'besorgt', 'por': 'um', 'mi': 'meine', 'salud': 'Gesundheit' }
  },
  {
    id: '2488',
    spanish: 'avergonzado / avergonzada',
    german: 'verlegen / besch\u00e4mt',
    type: 'adjective',
    sentence_es: 'Me siento avergonzado por el error.',
    sentence_de: 'Ich sch\u00e4me mich f\u00fcr den Fehler.',
    audio: '',
    word_translations: { 'me': 'mich', 'siento': 'sch\u00e4me', 'avergonzado': 'verlegen', 'por': 'f\u00fcr', 'el': 'den', 'error': 'Fehler' }
  },
  {
    id: '2489',
    spanish: 'celoso / celosa',
    german: 'eifs\u00fcchtig',
    type: 'adjective',
    sentence_es: 'No seas celoso de tu hermano.',
    sentence_de: 'Sei nicht eifs\u00fcchtig auf deinen Bruder.',
    audio: '',
    word_translations: { 'no': 'nicht', 'seas': 'sei', 'celoso': 'eifs\u00fcchtig', 'de': 'auf', 'tu': 'deinen', 'hermano': 'Bruder' }
  },
  {
    id: '2490',
    spanish: 'incluir',
    german: 'einschlie\u00dfen / beinhalten',
    type: 'verb',
    sentence_es: 'El precio incluye el desayuno.',
    sentence_de: 'Der Preis beinhaltet das Fr\u00fchst\u00fcck.',
    audio: '',
    word_translations: { 'el': 'der', 'precio': 'Preis', 'incluye': 'beinhaltet', 'desayuno': 'Fr\u00fchst\u00fcck' }
  },
  {
    id: '2491',
    spanish: 'resultar',
    german: 'sich herausstellen / ergeben',
    type: 'verb',
    sentence_es: 'Result\u00f3 ser m\u00e1s f\u00e1cil de lo esperado.',
    sentence_de: 'Es stellte sich als leichter heraus als erwartet.',
    audio: '',
    word_translations: { 'result\u00f3': 'es stellte sich heraus', 'ser': 'sein', 'm\u00e1s': 'mehr/leichter', 'f\u00e1cil': 'leicht', 'de': 'als', 'lo': 'das', 'esperado': 'erwartet' }
  },
  {
    id: '2492',
    spanish: 'convertirse',
    german: 'werden / sich verwandeln',
    type: 'verb',
    sentence_es: 'Quiero convertirme en m\u00e9dico.',
    sentence_de: 'Ich m\u00f6chte Arzt werden.',
    audio: '',
    word_translations: { 'quiero': 'ich m\u00f6chte', 'convertirme': 'werden', 'en': 'zum', 'm\u00e9dico': 'Arzt' }
  },
  {
    id: '2493',
    spanish: 'cumplir',
    german: 'erf\u00fcllen / vollenden',
    type: 'verb',
    sentence_es: 'Hoy cumplo treinta a\u00f1os.',
    sentence_de: 'Heute werde ich drei\u00dfig Jahre alt.',
    audio: '',
    word_translations: { 'hoy': 'heute', 'cumplo': 'werde ich', 'treinta': 'drei\u00dfig', 'a\u00f1os': 'Jahre' }
  },
  {
    id: '2494',
    spanish: 'depender',
    german: 'abh\u00e4ngen',
    type: 'verb',
    sentence_es: 'Todo depende del tiempo.',
    sentence_de: 'Alles h\u00e4ngt vom Wetter ab.',
    audio: '',
    word_translations: { 'todo': 'alles', 'depende': 'h\u00e4ngt ab', 'del': 'vom', 'tiempo': 'Wetter/Zeit' }
  },
  {
    id: '2495',
    spanish: 'levantar',
    german: 'aufheben / hochheben',
    type: 'verb',
    sentence_es: '\u00bfMe ayudas a levantar esta caja?',
    sentence_de: 'Hilfst du mir, diese Kiste hochzuheben?',
    audio: '',
    word_translations: { 'me': 'mir', 'ayudas': 'hilfst du', 'a': 'beim', 'levantar': 'hochheben', 'esta': 'diese', 'caja': 'Kiste' }
  },
  {
    id: '2496',
    spanish: 'el t\u00e9',
    german: 'der Tee',
    type: 'noun',
    sentence_es: 'Prefiero el t\u00e9 sin az\u00facar.',
    sentence_de: 'Ich bevorzuge Tee ohne Zucker.',
    audio: '',
    word_translations: { 'prefiero': 'ich bevorzuge', 'el': 'den', 't\u00e9': 'Tee', 'sin': 'ohne', 'az\u00facar': 'Zucker' }
  },
  {
    id: '2497',
    spanish: 'el huevo',
    german: 'das Ei',
    type: 'noun',
    sentence_es: 'Quiero huevos fritos para el desayuno.',
    sentence_de: 'Ich m\u00f6chte Spiegeleier zum Fr\u00fchst\u00fcck.',
    audio: '',
    word_translations: { 'quiero': 'ich m\u00f6chte', 'huevos': 'Eier', 'fritos': 'gebraten/Spiegel-', 'para': 'zum', 'el': 'das', 'desayuno': 'Fr\u00fchst\u00fcck' }
  },
  {
    id: '2498',
    spanish: 'el queso',
    german: 'der K\u00e4se',
    type: 'noun',
    sentence_es: 'Me encanta el queso manchego.',
    sentence_de: 'Ich liebe Manchego-K\u00e4se.',
    audio: '',
    word_translations: { 'me': 'mir', 'encanta': 'gef\u00e4llt sehr', 'el': 'der', 'queso': 'K\u00e4se', 'manchego': 'Manchego' }
  },
  {
    id: '2499',
    spanish: 'el hombro',
    german: 'die Schulter',
    type: 'noun',
    sentence_es: 'Me duele el hombro derecho.',
    sentence_de: 'Meine rechte Schulter tut weh.',
    audio: '',
    word_translations: { 'me': 'mir', 'duele': 'tut weh', 'el': 'die', 'hombro': 'Schulter', 'derecho': 'rechte' }
  },
  {
    id: '2500',
    spanish: 'la rodilla',
    german: 'das Knie',
    type: 'noun',
    sentence_es: 'Me lastimu\u00e9 la rodilla jugando f\u00fatbol.',
    sentence_de: 'Ich habe mir beim Fu\u00dfballspielen das Knie verletzt.',
    audio: '',
    word_translations: { 'me': 'mir', 'lastim\u00e9': 'habe verletzt', 'la': 'das', 'rodilla': 'Knie', 'jugando': 'spielend', 'f\u00fatbol': 'Fu\u00dfball' }
  },
  {
    id: '2501',
    spanish: 'el tobillo',
    german: 'der Kn\u00f6chel',
    type: 'noun',
    sentence_es: 'Me torc\u00ed el tobillo corriendo.',
    sentence_de: 'Ich habe mir beim Laufen den Kn\u00f6chel verstaucht.',
    audio: '',
    word_translations: { 'me': 'mir', 'torc\u00ed': 'habe verstaucht', 'el': 'den', 'tobillo': 'Kn\u00f6chel', 'corriendo': 'beim Laufen' }
  },
  {
    id: '2502',
    spanish: 'el o\u00eddo',
    german: 'das Ohr (innen) / das Geh\u00f6r',
    type: 'noun',
    sentence_es: 'Tengo una infecci\u00f3n en el o\u00eddo.',
    sentence_de: 'Ich habe eine Ohrentz\u00fcndung.',
    audio: '',
    word_translations: { 'tengo': 'ich habe', 'una': 'eine', 'infecci\u00f3n': 'Entz\u00fcndung', 'en': 'im', 'el': 'das', 'o\u00eddo': 'Ohr' }
  }
];

const updated = [...vocab, ...newEntries];
fs.writeFileSync(vocabPath, JSON.stringify(updated, null, 2), 'utf8');
console.log('vocabulario-es.json: added', newEntries.length, 'entries. Total:', updated.length);

// ── Add IDs to vokabeln-3.json ────────────────────────────────────────────────
const v3Path = path.join(base, 'data/modules/vokabeln-3.json');
const v3 = JSON.parse(fs.readFileSync(v3Path, 'utf8'));

// Deduplicate existing vokabeln-3 IDs too (in case of double-run)
const seen3 = new Set();
v3.vocabIds = v3.vocabIds.filter(id => {
  if (seen3.has(id)) return false;
  seen3.add(id);
  return true;
});

const batch2Ids = newEntries.map(e => e.id);
v3.vocabIds = [...v3.vocabIds, ...batch2Ids];
fs.writeFileSync(v3Path, JSON.stringify(v3, null, 2), 'utf8');
console.log('vokabeln-3.json: added 20 IDs. Total:', v3.vocabIds.length);

// ── Verify ────────────────────────────────────────────────────────────────────
const final = JSON.parse(fs.readFileSync(vocabPath, 'utf8'));
const batch2 = final.filter(e => parseInt(e.id) >= 2483 && parseInt(e.id) <= 2502);
const allFields = batch2.every(e => e.id && e.spanish && e.german && e.type && e.sentence_es && e.sentence_de && e.word_translations);
const allIds = batch2.map(e => e.id);
const uniqueIds = new Set(allIds);

console.log('\n--- Verification ---');
console.log('Batch 2 entries found:', batch2.length);
console.log('All required fields:', allFields);
console.log('All IDs unique:', allIds.length === uniqueIds.size);
console.log('ID range:', allIds[0], '-', allIds[allIds.length - 1]);
console.log('\nEntries added:');
batch2.forEach(e => console.log(' ', e.id, '|', e.spanish, '|', e.german, '|', e.type));
