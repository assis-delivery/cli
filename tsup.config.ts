import { rimraf } from 'rimraf';
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    bin: './src/bin/bin.ts',
    index: './src/index.ts',
  },
  sourcemap: true,
  minify: true,
  dts: {
    entry: './src/index.ts',
  },
  format: 'esm',
  platform: 'node',
  tsconfig: 'tsconfig.build.json',
  plugins: [
    {
      name: 'clean',
      buildStart: async () => {
        await rimraf('dist');
      },
    },
  ],
});
