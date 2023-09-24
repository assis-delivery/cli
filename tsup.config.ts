import { tsupConfig } from '@assis-delivery/config';
import { defineConfig } from 'tsup';

export default defineConfig({
  ...tsupConfig,
  entry: {
    bin: './src/bin/bin.ts',
    index: './src/index.ts',
  },
  dts: {
    entry: './src/index.ts',
  },
});
