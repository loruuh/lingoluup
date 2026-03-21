const fs = require('fs');
const path = require('path');

const base = path.join(__dirname, '..');
const redePath = path.join(base, 'data/modules/redewendungen.json');
const redeData = JSON.parse(fs.readFileSync(redePath, 'utf8'));

const newPhrases = [
  {
    id: 'r20',
    spanish: 'Con permiso',
    german: 'Mit Erlaubnis / Entschuldigung',
    literal: '',
    sentence_es: 'Con permiso, \u00bfpuedo pasar?',
    sentence_de: 'Entschuldigung, darf ich vorbeigehen?',
    audio: '',
    word_translations: { 'con': 'mit', 'permiso': 'Erlaubnis', 'puedo': 'darf ich', 'pasar': 'vorbeigehen' }
  },
  {
    id: 'r21',
    spanish: 'Salud',
    german: 'Gesundheit / Prost',
    literal: '',
    sentence_es: '\u00a1Ach\u00eds! - \u00a1Salud!',
    sentence_de: 'Hatschi! - Gesundheit!',
    audio: '',
    word_translations: { 'salud': 'Gesundheit' }
  },
  {
    id: 'r22',
    spanish: 'Buen provecho',
    german: 'Guten Appetit',
    literal: '',
    sentence_es: '\u00a1Buen provecho! Que disfrutes la comida.',
    sentence_de: 'Guten Appetit! Genie\u00dfe das Essen.',
    audio: '',
    word_translations: { 'buen': 'guten', 'provecho': 'Appetit/Genuss', 'que': 'dass', 'disfrutes': 'du genie\u00dfst', 'la': 'das', 'comida': 'Essen' }
  },
  {
    id: 'r23',
    spanish: '\u00bfMe puede ayudar?',
    german: 'K\u00f6nnen Sie mir helfen?',
    literal: '',
    sentence_es: 'Disculpe, \u00bfme puede ayudar?',
    sentence_de: 'Entschuldigung, k\u00f6nnen Sie mir helfen?',
    audio: '',
    word_translations: { 'me': 'mir', 'puede': 'k\u00f6nnen Sie', 'ayudar': 'helfen', 'disculpe': 'Entschuldigung' }
  },
  {
    id: 'r24',
    spanish: 'No hablo espa\u00f1ol',
    german: 'Ich spreche kein Spanisch',
    literal: '',
    sentence_es: 'Lo siento, no hablo espa\u00f1ol muy bien.',
    sentence_de: 'Es tut mir leid, ich spreche nicht sehr gut Spanisch.',
    audio: '',
    word_translations: { 'no': 'nicht', 'hablo': 'ich spreche', 'espa\u00f1ol': 'Spanisch', 'muy': 'sehr', 'bien': 'gut' }
  },
  {
    id: 'r25',
    spanish: '\u00bfC\u00f3mo se dice...?',
    german: 'Wie sagt man...?',
    literal: '',
    sentence_es: '\u00bfC\u00f3mo se dice \'water\' en espa\u00f1ol?',
    sentence_de: 'Wie sagt man \'water\' auf Spanisch?',
    audio: '',
    word_translations: { 'c\u00f3mo': 'wie', 'se': 'man', 'dice': 'sagt', 'en': 'auf', 'espa\u00f1ol': 'Spanisch' }
  },
  {
    id: 'r26',
    spanish: '\u00bfPuedo pagar con tarjeta?',
    german: 'Kann ich mit Karte zahlen?',
    literal: '',
    sentence_es: '\u00bfPuedo pagar con tarjeta o solo efectivo?',
    sentence_de: 'Kann ich mit Karte zahlen oder nur bar?',
    audio: '',
    word_translations: { 'puedo': 'kann ich', 'pagar': 'zahlen', 'con': 'mit', 'tarjeta': 'Karte', 'o': 'oder', 'solo': 'nur', 'efectivo': 'Bargeld' }
  },
  {
    id: 'r27',
    spanish: 'La cuenta, por favor',
    german: 'Die Rechnung, bitte',
    literal: '',
    sentence_es: 'Camarero, la cuenta, por favor.',
    sentence_de: 'Kellner, die Rechnung, bitte.',
    audio: '',
    word_translations: { 'camarero': 'Kellner', 'la': 'die', 'cuenta': 'Rechnung', 'por': 'f\u00fcr', 'favor': 'Gefallen/bitte' }
  },
  {
    id: 'r28',
    spanish: '\u00bfHay wifi?',
    german: 'Gibt es WLAN?',
    literal: '',
    sentence_es: '\u00bfHay wifi aqu\u00ed? \u00bfCu\u00e1l es la contrase\u00f1a?',
    sentence_de: 'Gibt es hier WLAN? Was ist das Passwort?',
    audio: '',
    word_translations: { 'hay': 'gibt es', 'wifi': 'WLAN', 'aqu\u00ed': 'hier', 'cu\u00e1l': 'was/welches', 'es': 'ist', 'la': 'das', 'contrase\u00f1a': 'Passwort' }
  },
  {
    id: 'r29',
    spanish: '\u00bfD\u00f3nde est\u00e1 el ba\u00f1o?',
    german: 'Wo ist die Toilette?',
    literal: '',
    sentence_es: 'Disculpe, \u00bfd\u00f3nde est\u00e1 el ba\u00f1o?',
    sentence_de: 'Entschuldigung, wo ist die Toilette?',
    audio: '',
    word_translations: { 'd\u00f3nde': 'wo', 'est\u00e1': 'ist', 'el': 'die', 'ba\u00f1o': 'Toilette/Bad' }
  },
  {
    id: 'r30',
    spanish: 'Una mesa para dos',
    german: 'Einen Tisch f\u00fcr zwei Personen',
    literal: '',
    sentence_es: 'Buenas tardes, una mesa para dos, por favor.',
    sentence_de: 'Guten Tag, einen Tisch f\u00fcr zwei Personen, bitte.',
    audio: '',
    word_translations: { 'una': 'einen', 'mesa': 'Tisch', 'para': 'f\u00fcr', 'dos': 'zwei' }
  },
  {
    id: 'r31',
    spanish: '\u00bfQu\u00e9 recomiendas?',
    german: 'Was empfiehlst du?',
    literal: '',
    sentence_es: '\u00bfQu\u00e9 recomiendas del men\u00fa?',
    sentence_de: 'Was empfiehlst du von der Speisekarte?',
    audio: '',
    word_translations: { 'qu\u00e9': 'was', 'recomiendas': 'empfiehlst du', 'del': 'von der', 'men\u00fa': 'Speisekarte' }
  },
  {
    id: 'r32',
    spanish: 'Estoy perdido / Estoy perdida',
    german: 'Ich habe mich verlaufen',
    literal: '',
    sentence_es: 'Estoy perdido, \u00bfme puede ayudar?',
    sentence_de: 'Ich habe mich verlaufen, k\u00f6nnen Sie mir helfen?',
    audio: '',
    word_translations: { 'estoy': 'ich bin', 'perdido': 'verloren/verirrt', 'me': 'mir', 'puede': 'k\u00f6nnen Sie', 'ayudar': 'helfen' }
  },
  {
    id: 'r33',
    spanish: '\u00bfA qu\u00e9 hora...?',
    german: 'Um wie viel Uhr...?',
    literal: '',
    sentence_es: '\u00bfA qu\u00e9 hora abre el museo?',
    sentence_de: 'Um wie viel Uhr \u00f6ffnet das Museum?',
    audio: '',
    word_translations: { 'a': 'um', 'qu\u00e9': 'wie viel', 'hora': 'Uhr', 'abre': '\u00f6ffnet', 'el': 'das', 'museo': 'Museum' }
  },
  {
    id: 'r34',
    spanish: 'Tengo una reserva',
    german: 'Ich habe eine Reservierung',
    literal: '',
    sentence_es: 'Hola, tengo una reserva a nombre de Garc\u00eda.',
    sentence_de: 'Hallo, ich habe eine Reservierung auf den Namen Garc\u00eda.',
    audio: '',
    word_translations: { 'tengo': 'ich habe', 'una': 'eine', 'reserva': 'Reservierung', 'a': 'auf', 'nombre': 'Namen', 'de': 'von' }
  },
  {
    id: 'r35',
    spanish: '\u00bfCu\u00e1nto tiempo?',
    german: 'Wie lange?',
    literal: '',
    sentence_es: '\u00bfCu\u00e1nto tiempo se tarda en llegar?',
    sentence_de: 'Wie lange dauert es, um anzukommen?',
    audio: '',
    word_translations: { 'cu\u00e1nto': 'wie viel/lange', 'tiempo': 'Zeit', 'se': 'man', 'tarda': 'braucht', 'en': 'um', 'llegar': 'anzukommen' }
  },
  {
    id: 'r36',
    spanish: '\u00a1Claro!',
    german: 'Klar! / Nat\u00fcrlich!',
    literal: '',
    sentence_es: '\u00bfVienes a la fiesta? - \u00a1Claro que s\u00ed!',
    sentence_de: 'Kommst du zur Party? - Klar, nat\u00fcrlich!',
    audio: '',
    word_translations: { 'claro': 'klar', 'que': 'dass', 's\u00ed': 'ja', 'vienes': 'kommst du', 'la': 'die', 'fiesta': 'Party/Feier' }
  },
  {
    id: 'r37',
    spanish: 'No s\u00e9',
    german: 'Ich wei\u00df nicht',
    literal: '',
    sentence_es: '\u00bfD\u00f3nde est\u00e1 Mar\u00eda? - No s\u00e9.',
    sentence_de: 'Wo ist Mar\u00eda? - Ich wei\u00df nicht.',
    audio: '',
    word_translations: { 'no': 'nicht', 's\u00e9': 'ich wei\u00df', 'd\u00f3nde': 'wo', 'est\u00e1': 'ist' }
  },
  {
    id: 'r38',
    spanish: 'Un momento, por favor',
    german: 'Einen Moment, bitte',
    literal: '',
    sentence_es: 'Un momento, por favor, ya vengo.',
    sentence_de: 'Einen Moment, bitte, ich komme gleich.',
    audio: '',
    word_translations: { 'un': 'einen', 'momento': 'Moment', 'por': 'f\u00fcr', 'favor': 'Gefallen/bitte', 'ya': 'gleich', 'vengo': 'ich komme' }
  },
  {
    id: 'r39',
    spanish: '\u00a1Que tengas un buen d\u00eda!',
    german: 'Hab einen sch\u00f6nen Tag!',
    literal: '',
    sentence_es: 'Adi\u00f3s, \u00a1que tengas un buen d\u00eda!',
    sentence_de: 'Tsch\u00fcss, hab einen sch\u00f6nen Tag!',
    audio: '',
    word_translations: { 'que': 'dass', 'tengas': 'du haben m\u00f6gest', 'un': 'einen', 'buen': 'sch\u00f6nen', 'd\u00eda': 'Tag', 'adi\u00f3s': 'Tsch\u00fcss' }
  }
];

redeData.phrases = [...redeData.phrases, ...newPhrases];
fs.writeFileSync(redePath, JSON.stringify(redeData, null, 2), 'utf8');
console.log('redewendungen.json: added', newPhrases.length, 'phrases. Total:', redeData.phrases.length);

// ── Verify ────────────────────────────────────────────────────────────────────
const final = JSON.parse(fs.readFileSync(redePath, 'utf8'));
const added = final.phrases.filter(p => {
  const num = parseInt(p.id.replace('r', ''));
  return num >= 20 && num <= 39;
});
const allValid = added.every(p => p.id && p.spanish && p.german && p.sentence_es && p.sentence_de);
const allIds = final.phrases.map(p => p.id);
const uniqueIds = new Set(allIds);

console.log('\n--- Verification ---');
console.log('Phrases r20-r39 found:', added.length, '| All fields valid:', allValid);
console.log('Total phrases:', final.phrases.length, '| All IDs unique:', allIds.length === uniqueIds.size);
console.log('\nNew phrases:');
added.forEach(p => console.log(' ', p.id, '|', p.spanish, '|', p.german));
