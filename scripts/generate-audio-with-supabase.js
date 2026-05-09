require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const axios = require('axios');
const fs    = require('fs');
const path  = require('path');

// ─── Config ───────────────────────────────────────────────────────────────────

const RATE_LIMIT_DELAY = 150;
const RETRY_ATTEMPTS   = 3;
const RETRY_DELAY      = 1500;

// ─── Paths ────────────────────────────────────────────────────────────────────

const MISSING_IDS_PATH = path.join(__dirname, 'missing-audio-ids.json');
const VOCAB_PATH       = path.join(__dirname, '..', 'data', 'vocabulario-es.json');
const AUDIO_DIR        = path.join(__dirname, '..', 'public', 'audio');

// ─── Helpers ──────────────────────────────────────────────────────────────────

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function retryAsync(fn) {
  for (let i = 0; i < RETRY_ATTEMPTS; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === RETRY_ATTEMPTS - 1) throw err;
      console.log(`    Retry ${i + 1}/${RETRY_ATTEMPTS - 1}...`);
      await sleep(RETRY_DELAY);
    }
  }
}

async function generateTTS(text) {
  const response = await axios.post(
    `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.GOOGLE_CLOUD_TTS_API_KEY}`,
    {
      input: { text },
      voice: { languageCode: 'es-ES', name: 'es-ES-Standard-A' },
      audioConfig: { audioEncoding: 'MP3', speakingRate: 0.85 },
    }
  );
  return Buffer.from(response.data.audioContent, 'base64');
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  if (!process.env.GOOGLE_CLOUD_TTS_API_KEY) {
    throw new Error('GOOGLE_CLOUD_TTS_API_KEY not set in .env');
  }

  console.log('🎵 LingoLuup — Audio Generation\n');

  const missingIds = JSON.parse(fs.readFileSync(MISSING_IDS_PATH, 'utf8'));
  const vocab      = JSON.parse(fs.readFileSync(VOCAB_PATH, 'utf8'));

  // Only process entries that actually need it (no file on disk yet)
  const toProcess = [];
  for (const id of missingIds) {
    const entry = vocab.find(v => String(v.id) === String(id));
    if (!entry) continue;
    const filePath = path.join(AUDIO_DIR, `${id}.mp3`);
    if (!fs.existsSync(filePath)) toProcess.push(entry);
  }

  console.log(`📋 Missing IDs      : ${missingIds.length}`);
  console.log(`🎯 To generate      : ${toProcess.length} (rest already on disk)\n`);

  if (toProcess.length === 0) {
    console.log('Nothing to do — all files already exist!');
    return;
  }

  let ok = 0, failed = 0;
  const errors = [];

  for (let i = 0; i < toProcess.length; i++) {
    const entry = toProcess[i];
    const text  = entry.sentence_es || entry.spanish || '';

    if (!text) {
      console.log(`[${i+1}/${toProcess.length}] ⚠️  ID ${entry.id}: no text — skipped`);
      failed++;
      continue;
    }

    process.stdout.write(`[${i+1}/${toProcess.length}] ID ${entry.id}: "${entry.spanish}" ... `);

    try {
      const buffer   = await retryAsync(() => generateTTS(text));
      const filePath = path.join(AUDIO_DIR, `${entry.id}.mp3`);
      fs.writeFileSync(filePath, buffer);

      // Update vocab entry to match existing format
      entry.audio = `/audio/${entry.id}.mp3`;

      console.log('✅');
      ok++;
    } catch (err) {
      console.log(`❌  ${err.message}`);
      errors.push({ id: entry.id, error: err.message });
      failed++;
    }

    if (i < toProcess.length - 1) await sleep(RATE_LIMIT_DELAY);
  }

  // Persist updated vocab
  fs.writeFileSync(VOCAB_PATH, JSON.stringify(vocab, null, 2));
  console.log('\n💾 vocabulario-es.json saved.\n');

  console.log('═══════════════════════════════════════════');
  console.log(`  ✅ Success : ${ok}`);
  console.log(`  ❌ Failed  : ${failed}`);
  console.log('═══════════════════════════════════════════');

  if (errors.length) {
    console.log('\nFailed IDs:');
    errors.forEach(e => console.log(`  ${e.id}: ${e.error}`));
  }
}

main()
  .then(() => { console.log('\n🎉 Done!'); process.exit(0); })
  .catch(err => { console.error('\n💥 Fatal:', err.message); process.exit(1); });
