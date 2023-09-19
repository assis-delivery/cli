import { FirebaseJson } from './firebase-json.type.js';
import { SWCOptions } from './swc.type.js';

export const SWC_DEFAULT = (): SWCOptions => ({
  $schema: 'https://json.schemastore.org/swcrc',
  sourceMaps: true,
  minify: true,
  jsc: {
    parser: {
      syntax: 'typescript',
      decorators: true,
      dynamicImport: true,
    },
    minify: {
      compress: {
        unused: true,
      },
    },
    keepClassNames: true,
    transform: {
      legacyDecorator: true,
      decoratorMetadata: true,
    },
  },
  module: {
    type: 'es6',
  },
});

export const FIREBASE_JSON = (): FirebaseJson => ({
  $schema:
    'https://raw.githubusercontent.com/firebase/firebase-tools/master/schema/firebase-config.json',
  functions: [
    {
      source: '.',
      codebase: 'default',
      ignore: [
        'node_modules',
        '.git',
        'firebase-debug.log',
        'firebase-debug.*.log',
        '.env',
        '.secret.local',
      ],
      predeploy: ['pnpm build'],
      runtime: 'nodejs18',
    },
  ],
  emulators: {
    auth: {
      port: 9099,
    },
    functions: {
      port: 5001,
    },
    firestore: {
      port: 8080,
    },
    ui: {
      enabled: true,
    },
    singleProjectMode: true,
    pubsub: {
      port: 8085,
    },
    eventarc: {
      port: 9299,
    },
  },
});
