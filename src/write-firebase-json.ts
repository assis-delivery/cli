import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { FirebaseJson } from './firebase-json.type.js';

export async function writeFirebaseJson(firebaseJson: FirebaseJson): Promise<void> {
  const path = join(process.cwd(), 'firebase.json');
  await writeFile(path, JSON.stringify(firebaseJson));
}