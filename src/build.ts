import { spawn } from 'node:child_process';

import { SWC_DEFAULT } from './constants.js';
import { writeSwcrc } from './write-swcrc.js';

export async function build() {
  const swcrc = SWC_DEFAULT();
  await writeSwcrc(swcrc);
  spawn('npm', ['run', 'build:app'], {
    shell: true,
    stdio: 'inherit',
  });
}
