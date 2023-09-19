import { FIREBASE_JSON } from '../constants.js';
import { dev } from '../dev.js';

import { args } from './args.js';

export async function devCommand(): Promise<void> {
  const projectId = args.project ?? process.env.AD_PROJECT_ID;
  if (!projectId) {
    throw new Error(
      'ProjectID not found. Please use the argumento --project or ' +
        'set the AD_PROJECT_ID in your environment variables',
    );
  }
  await dev({
    firebaseJson: FIREBASE_JSON(),
    projectId,
  });
}
