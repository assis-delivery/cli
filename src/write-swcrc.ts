import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { SWCOptions } from './swc.type.js';

export async function writeSwcrc(swcrc: SWCOptions) {
  const path = join(process.cwd(), '.swcrc');
  await writeFile(path, JSON.stringify(swcrc));
}
