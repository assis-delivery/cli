#!/usr/bin/env node
import { build } from '../build.js';
import { FIREBASE_JSON } from '../constants.js';
import { deploy } from '../deploy.js';
import { dev } from '../dev.js';
import { safe } from '../safe.js';

import { args } from './args.js';

const command = args._;

const commands: Record<typeof command, () => Promise<void>> = {
  help: async () => {
    const options: Record<typeof command, string> = {
      help: 'Show this menu',
      dev: 'Command used to develop locally',
      build: 'Build your code to production',
      deploy: 'Deploy your function (CI only)',
    };
    // eslint-disable-next-line no-console
    console.table(
      Object.entries(options).map(([key, value]) => ({
        command: key,
        description: value,
      })),
    );
  },
  dev: async () => {
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
  },
  build: async () => {
    await build();
  },
  deploy: async () => {
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
  },
};

commands[command]();
