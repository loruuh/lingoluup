require('dotenv').config();
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const VOCAB_FILE = path.join(__dirname, '..', 'data', 'vocabulario-es.json');
const AUDIO_DIR = path.join(__dirname, '..', 'public', 'audio');
const RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 1000;
const RATE_LIMIT_DELAY = 100;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function retryAsync(fn, attempts = RETRY_ATTEMPTS) {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === attempts - 1) throw error;
      console.log(`  Retry ${i + 1}/${attempts - 1}...`);
      await sleep(RETRY_DELAY);
    }
  }
}

async function generateAudio(text, outputPath) {
  const apiKey = process.env.GOOGLE_CLOUD_TTS_API_KEY;
  const response = await axios.post(
    `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
    {
      input: { text },
      voice: {
        languageCode: 'es-ES',
        name: 'es-ES-Standard-A'
      },
      audioConfig: {
        audioEncoding: 'MP3',
        speakingRate: 0.85
      }
    }
  );
  const audioContent = Buffer.from(response.data.audioContent, 'base64');
  await fs.writeFile(outputPath, audioContent);
}

// Target specific ID ranges (as strings to match JSON data)
const TARGET_IDS = new Set([
  ...Array.from({length: 55}, (_, i) => String(2463 + i)), // 2463-2517
  ...Array.from({length: 15}, (_, i) => String(2602 + i))  // 2602-2616
]);

async function main() {
  console.log('Starting audio generation for IDs 2463-2517 and 2602-2616 (70 entries)\n');

  if (!process.env.GOOGLE_CLOUD_TTS_API_KEY) {
    throw new Error('GOOGLE_CLOUD_TTS_API_KEY environment variable is not set');
  }

  await fs.mkdir(AUDIO_DIR, { recursive: true });

  const vocabData = JSON.parse(await fs.readFile(VOCAB_FILE, 'utf-8'));

  // Find target entries whose audio file doesn't exist on disk
  const newEntries = [];
  for (const vocab of vocabData) {
    if (!TARGET_IDS.has(String(vocab.id))) continue;
    const audioPath = path.join(AUDIO_DIR, `${vocab.id}.mp3`);
    try {
      await fs.access(audioPath);
    } catch {
      newEntries.push(vocab);
    }
  }

  console.log(`Found ${newEntries.length} entries missing audio files`);
  if (newEntries.length === 0) { console.log('Nothing to do!'); return; }
  console.log(`ID range: ${newEntries[0].id} - ${newEntries[newEntries.length - 1].id}\n`);

  const failed = [];

  for (let i = 0; i < newEntries.length; i++) {
    const vocab = newEntries[i];
    const audioPath = path.join(AUDIO_DIR, `${vocab.id}.mp3`);

    console.log(`[${i + 1}/${newEntries.length}] ${vocab.spanish} (ID: ${vocab.id})`);

    if (!vocab.sentence_es) {
      console.log('  Skipped: no sentence_es found');
      failed.push({ id: vocab.id, error: 'no sentence_es' });
      continue;
    }

    try {
      await retryAsync(() => generateAudio(vocab.sentence_es, audioPath));
      console.log(`  OK: ${audioPath}`);
    } catch (error) {
      console.log(`  FAILED: ${error.message}`);
      failed.push({ id: vocab.id, error: error.message });
    }

    if (i < newEntries.length - 1) {
      await sleep(RATE_LIMIT_DELAY);
    }
  }

  console.log(`\nDone. ${newEntries.length - failed.length}/${newEntries.length} succeeded.`);

  if (failed.length > 0) {
    console.log('Failed:');
    failed.forEach(f => console.log(`  ID ${f.id}: ${f.error}`));
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
