import { build } from '../build.js';

export async function buildCommand(): Promise<void> {
  await build();
}
