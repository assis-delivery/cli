import { spawn, spawnSync } from 'node:child_process';

import killPort from 'kill-port';

import { SWC_DEFAULT } from './constants.js';
import { FirebaseJson } from './firebase-json.type.js';
import { noop } from './noop.js';
import { writeFirebaseJson } from './write-firebase-json.js';
import { writeSwcrc } from './write-swcrc.js';

async function killFirebasePorts(ports: number[]) {
  await Promise.all(ports.map((port) => killPort(port).catch(noop)));
}

export interface DevelopmentOptions {
  firebaseJson: FirebaseJson;
  projectId: string;
}

function getFirebaseJsonPorts(json: FirebaseJson): number[] {
  return Object.values(json.emulators ?? {})
    .filter(
      (item): item is { port: number } =>
        typeof item === 'object' &&
        'port' in item &&
        typeof item.port === 'number',
    )
    .map((item) => item.port);
}

export async function dev(options: DevelopmentOptions): Promise<void> {
  const ports = getFirebaseJsonPorts(options.firebaseJson);
  const swcrc = SWC_DEFAULT();
  swcrc.minify = false;
  await Promise.all([
    killFirebasePorts(ports),
    writeSwcrc(swcrc),
    writeFirebaseJson(options.firebaseJson),
  ]);
  spawnSync('firebase', ['use', options.projectId], {
    shell: true,
    stdio: 'ignore',
  });
  spawn('npm', ['run', 'build:watch'], {
    shell: true,
    stdio: 'ignore',
  });
  spawn('firebase', ['emulators:start'], {
    shell: true,
    stdio: 'inherit',
  });
}
