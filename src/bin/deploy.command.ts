import { deploy } from '../deploy.js';
import { safe } from '../safe.js';

import { args } from './args.js';

export async function deployCommand(): Promise<void> {
  const {
    GOOGLE_APPLICATION_CREDENTIALS_JSON,
    GOOGLE_APPLICATION_CREDENTIALS_FILENAME,
    AD_PROJECT_ID,
  } = process.env;

  if (!GOOGLE_APPLICATION_CREDENTIALS_JSON) {
    throw new Error('Missing GOOGLE_APPLICATION_CREDENTIALS_JSON variable');
  }

  const [, googleApplicationCredentialsJsonParsed] = safe(() =>
    JSON.parse(GOOGLE_APPLICATION_CREDENTIALS_JSON),
  );

  if (!googleApplicationCredentialsJsonParsed) {
    throw new Error(
      'Missing or invalid GOOGLE_APPLICATION_CREDENTIALS_JSON variable',
    );
  }

  if (!GOOGLE_APPLICATION_CREDENTIALS_FILENAME) {
    throw new Error('Missing GOOGLE_APPLICATION_CREDENTIALS variable');
  }

  const projectId = args.project ?? AD_PROJECT_ID;

  if (!projectId) {
    throw new Error(
      'ProjectID not found. Please use the argumento --project or ' +
      'set the AD_PROJECT_ID in your environment variables',
    );
  }

  await deploy({
    googleApplicationCredentialsJson: googleApplicationCredentialsJsonParsed,
    googleApplicationCredentialsFilename:
    GOOGLE_APPLICATION_CREDENTIALS_FILENAME,
    projectId,
  });
}
