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

// ── 1. Update existing entries ───────────────────────────────────────────────
const vocabPath = path.join(__dirname, '../data/vocabulario-es.json');
const vocab = readJson(vocabPath);

const updates = {
  '1701': { german: 'die Unterstützung / der Rückhalt' },
  '2384': { german: 'das Handgelenk / die Puppe' },
  '2378': { german: 'werfen / starten / auf den Markt bringen' },
  '905':  { german: 'gegrillt / gebraten' },
};
vocab.forEach(v => {
  if (updates[v.id]) Object.assign(v, updates[v.id]);
});
console.log('Updated existing entries: 1701, 2384, 2378, 905');

// ── 2. New entries ────────────────────────────────────────────────────────────
const newEntries = [
  {
    id: '2927', spanish: 'almorzar', german: 'zu Mittag essen', type: 'verb',
    sentence_es: 'Solemos almorzar a las dos de la tarde.',
    sentence_de: 'Wir essen normalerweise um zwei Uhr zu Mittag.',
    audio: '',
    word_translations: { solemos: 'wir pflegen/gewöhnlich', almorzar: 'zu Mittag essen', 'a las dos': 'um zwei Uhr', 'de la tarde': 'nachmittags' }
  },
  {
    id: '2928', spanish: 'el horario', german: 'der Zeitplan / der Fahrplan / die Öffnungszeiten', type: 'noun',
    sentence_es: '¿Cuál es el horario de apertura de la tienda?',
    sentence_de: 'Was sind die Öffnungszeiten des Geschäfts?',
    audio: '',
    word_translations: { cuál: 'welche/welcher', es: 'ist', el: 'der/die/das', horario: 'Zeitplan/Fahrplan/Öffnungszeiten', de: 'von', apertura: 'Öffnung', tienda: 'Geschäft/Laden' }
  },
  {
    id: '2929', spanish: 'el enfado', german: 'der Ärger / der Unmut', type: 'noun',
    sentence_es: 'Su enfado era completamente comprensible.',
    sentence_de: 'Sein Ärger war vollkommen verständlich.',
    audio: '',
    word_translations: { su: 'sein/ihr', enfado: 'Ärger', era: 'war', completamente: 'vollkommen', comprensible: 'verständlich' }
  },
  {
    id: '2930', spanish: 'la cuna', german: 'die Wiege', type: 'noun',
    sentence_es: 'El bebé duerme tranquilamente en su cuna.',
    sentence_de: 'Das Baby schläft ruhig in seiner Wiege.',
    audio: '',
    word_translations: { el: 'der', bebé: 'Baby', duerme: 'schläft', tranquilamente: 'ruhig/friedlich', en: 'in', su: 'seiner/ihrer', cuna: 'Wiege' }
  },
  {
    id: '2931', spanish: 'la hierba', german: 'das Kraut / das Gras', type: 'noun',
    sentence_es: 'Añade un poco de hierba fresca al plato.',
    sentence_de: 'Füge ein bisschen frisches Kraut zum Gericht hinzu.',
    audio: '',
    word_translations: { añade: 'füge hinzu', 'un poco de': 'ein bisschen', hierba: 'Kraut/Gras', fresca: 'frisch', al: 'zum/zur', plato: 'Gericht/Teller' }
  },
  {
    id: '2932', spanish: 'regar', german: 'gießen / bewässern', type: 'verb',
    sentence_es: 'Hay que regar las plantas todos los días en verano.',
    sentence_de: 'Man muss die Pflanzen im Sommer jeden Tag gießen.',
    audio: '',
    word_translations: { 'hay que': 'man muss', regar: 'gießen/bewässern', 'las plantas': 'die Pflanzen', 'todos los días': 'jeden Tag', 'en verano': 'im Sommer' }
  },
  {
    id: '2933', spanish: 'caramelizado / caramelizada', german: 'karamellisiert', type: 'adjective',
    sentence_es: 'Las cebollas caramelizadas están perfectas con el queso.',
    sentence_de: 'Die karamellisierten Zwiebeln passen perfekt zum Käse.',
    audio: '',
    word_translations: { las: 'die', cebollas: 'Zwiebeln', caramelizadas: 'karamellisiert', están: 'sind', perfectas: 'perfekt', con: 'mit', el: 'der', queso: 'Käse' }
  },
  {
    id: '2934', spanish: 'harto / harta', german: 'genervt / überdrüssig — estar harto de = die Nase voll haben von', type: 'adjective',
    sentence_es: 'Estoy harto de esperar en esta cola.',
    sentence_de: 'Ich habe die Nase voll davon, in dieser Schlange zu warten.',
    audio: '',
    word_translations: { estoy: 'ich bin', harto: 'genervt/überdrüssig', de: 'von', esperar: 'warten', en: 'in', esta: 'dieser', cola: 'Schlange/Warteschlange' }
  },
  {
    id: '2935', spanish: 'el agujero', german: 'das Loch', type: 'noun',
    sentence_es: 'Hay un agujero en la pared que hay que reparar.',
    sentence_de: 'Es gibt ein Loch in der Wand, das repariert werden muss.',
    audio: '',
    word_translations: { hay: 'es gibt', un: 'ein', agujero: 'Loch', en: 'in', la: 'der/die', pared: 'Wand', reparar: 'reparieren' }
  },
  {
    id: '2936', spanish: 'el infierno', german: 'die Hölle', type: 'noun',
    sentence_es: 'El atasco en la ciudad era un infierno esta mañana.',
    sentence_de: 'Der Stau in der Stadt war heute Morgen die Hölle.',
    audio: '',
    word_translations: { el: 'der', atasco: 'Stau', en: 'in', la: 'der/die', ciudad: 'Stadt', era: 'war', un: 'eine', infierno: 'Hölle', 'esta mañana': 'heute Morgen' }
  },
  {
    id: '2937', spanish: 'la tasa de criminalidad', german: 'die Kriminalitätsrate', type: 'noun',
    sentence_es: 'La tasa de criminalidad ha bajado en los últimos años.',
    sentence_de: 'Die Kriminalitätsrate ist in den letzten Jahren gesunken.',
    audio: '',
    word_translations: { la: 'die', tasa: 'Rate/Quote', de: 'von', criminalidad: 'Kriminalität', 'ha bajado': 'ist gesunken', 'los últimos años': 'die letzten Jahre' }
  },
  {
    id: '2938', spanish: 'la pajita', german: 'der Strohhalm', type: 'noun',
    sentence_es: 'Prefiero beber el batido con pajita.',
    sentence_de: 'Ich trinke den Milchshake lieber mit einem Strohhalm.',
    audio: '',
    word_translations: { prefiero: 'ich bevorzuge', beber: 'trinken', el: 'den', batido: 'Milchshake', con: 'mit', pajita: 'Strohhalm' }
  },
  {
    id: '2939', spanish: 'coincidir', german: 'übereinstimmen / zusammentreffen', type: 'verb',
    sentence_es: 'Nuestras opiniones coinciden en este punto.',
    sentence_de: 'Unsere Meinungen stimmen in diesem Punkt überein.',
    audio: '',
    word_translations: { nuestras: 'unsere', opiniones: 'Meinungen', coinciden: 'stimmen überein', en: 'in', este: 'diesem', punto: 'Punkt' }
  },
  {
    id: '2940', spanish: 'el frasco de mermelada', german: 'das Marmeladenglas', type: 'noun',
    sentence_es: 'Abrí un frasco de mermelada de fresas para el desayuno.',
    sentence_de: 'Ich öffnete ein Glas Erdbeermarmelade zum Frühstück.',
    audio: '',
    word_translations: { abrí: 'ich öffnete', un: 'ein', frasco: 'Glas/Gefäß', de: 'von/mit', mermelada: 'Marmelade', fresas: 'Erdbeeren', para: 'für', 'el desayuno': 'das Frühstück' }
  },
  {
    id: '2941', spanish: 'los pedidos', german: 'die Bestellungen', type: 'noun',
    sentence_es: 'El camarero anotó todos los pedidos de la mesa.',
    sentence_de: 'Der Kellner notierte alle Bestellungen des Tisches.',
    audio: '',
    word_translations: { el: 'der', camarero: 'Kellner', anotó: 'notierte', todos: 'alle', los: 'die', pedidos: 'Bestellungen', 'la mesa': 'der Tisch' }
  },
  {
    id: '2942', spanish: 'asar', german: 'grillen / braten', type: 'verb',
    sentence_es: 'Vamos a asar la carne a la parrilla esta tarde.',
    sentence_de: 'Wir werden das Fleisch heute Nachmittag auf dem Grill braten.',
    audio: '',
    word_translations: { 'vamos a': 'wir werden', asar: 'grillen/braten', la: 'das', carne: 'Fleisch', 'a la parrilla': 'auf dem Grill', 'esta tarde': 'heute Nachmittag' }
  },
  {
    id: '2943', spanish: 'el carbón', german: 'die Kohle', type: 'noun',
    sentence_es: 'Necesitamos más carbón para mantener el fuego del asado.',
    sentence_de: 'Wir brauchen mehr Kohle, um das Feuer des Grills am Brennen zu halten.',
    audio: '',
    word_translations: { necesitamos: 'wir brauchen', más: 'mehr', carbón: 'Kohle', para: 'um', mantener: 'aufrechterhalten', el: 'das', fuego: 'Feuer', del: 'des', asado: 'Grills/Grillgerichts' }
  },
  {
    id: '2944', spanish: 'la parrilla', german: 'der Grill / der Rost', type: 'noun',
    sentence_es: 'Pon la parrilla sobre las brasas antes de colocar la carne.',
    sentence_de: 'Lege den Rost auf die Glut, bevor du das Fleisch auflegst.',
    audio: '',
    word_translations: { pon: 'lege/stelle', la: 'den/die', parrilla: 'Grill/Rost', sobre: 'auf', 'las brasas': 'die Glut', 'antes de': 'bevor', colocar: 'platzieren/auflegen', 'la carne': 'das Fleisch' }
  },
  {
    id: '2945', spanish: 'encendido / encendida', german: 'brennend / angezündet / eingeschaltet', type: 'adjective',
    sentence_es: 'Asegúrate de que el carbón esté bien encendido antes de cocinar.',
    sentence_de: 'Stelle sicher, dass die Kohle gut brennt, bevor du anfängst zu kochen.',
    audio: '',
    word_translations: { 'asegúrate de que': 'stelle sicher, dass', el: 'die', carbón: 'Kohle', esté: 'ist/sei', bien: 'gut/richtig', encendido: 'angezündet/am Brennen', 'antes de': 'bevor', cocinar: 'kochen' }
  },
  {
    id: '2946', spanish: 'la Unión Europea', german: 'die Europäische Union', type: 'noun',
    sentence_es: 'España es miembro de la Unión Europea desde 1986.',
    sentence_de: 'Spanien ist seit 1986 Mitglied der Europäischen Union.',
    audio: '',
    word_translations: { España: 'Spanien', es: 'ist', miembro: 'Mitglied', de: 'von/der', la: 'die', 'Unión Europea': 'Europäische Union', desde: 'seit' }
  },
  {
    id: '2947', spanish: 'las achuras', german: 'Innereien vom Grill (Argentinien)', type: 'noun',
    note: 'Argentinien — typisch für den asado: chinchulines (Kutteln), mollejas (Bries), riñones (Nieren)',
    sentence_es: 'Las achuras son una parte esencial del asado argentino.',
    sentence_de: 'Gegrillte Innereien sind ein wesentlicher Bestandteil des argentinischen Grillgerichts.',
    audio: '',
    word_translations: { las: 'die', achuras: 'Innereien vom Grill', son: 'sind', 'una parte': 'ein Teil', esencial: 'wesentlich/essenziell', del: 'des', asado: 'Grillgerichts', argentino: 'argentinischen' }
  },
];

newEntries.forEach(e => vocab.push(e));
writeJson(vocabPath, vocab);
console.log('Added', newEntries.length, 'new entries (IDs 2927-2947)');
console.log('New total:', vocab.length);

// ── 3. Update module vocabIds ────────────────────────────────────────────────
const moduleAssignments = {
  'vokabeln-3.json':        ['2927', '2928'],
  'vokabeln-4.json':        ['2929', '2931', '2934', '2935'],
  'vokabeln-5.json':        ['2932', '2939'],
  'vokabeln-6.json':        ['2936'],
  'vokabeln-7.json':        ['2930', '2938'],
  'vokabeln-8.json':        ['2933'],
  'vokabeln-10.json':       ['2937'],
  'essen-und-trinken.json': ['2940', '2941', '2942', '2943', '2944', '2945'],
  'formale-vokabeln.json':  ['2946'],
  'latam.json':             ['2947'],
};

const modDir = path.join(__dirname, '../data/modules');
Object.entries(moduleAssignments).forEach(([file, ids]) => {
  const p = path.join(modDir, file);
  const mod = readJson(p);
  const before = (mod.vocabIds || []).length;
  ids.forEach(id => {
    if (!mod.vocabIds.includes(id)) mod.vocabIds.push(id);
  });
  writeJson(p, mod);
  console.log(file + ': added [' + ids.join(', ') + '] (was ' + before + ', now ' + mod.vocabIds.length + ')');
});

console.log('\nDone.');
