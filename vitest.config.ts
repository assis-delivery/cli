import { vitestConfig } from '@assis-delivery/config';
import swc from 'unplugin-swc';
import { InlineConfig } from 'vitest';
import { defineConfig, mergeConfig } from 'vitest/config';

export default defineConfig(async (env) => {
  const defaultConfig = await vitestConfig(env);
  defaultConfig.plugins = [];
  return mergeConfig(defaultConfig, {
    plugins: [
      swc.vite({
        module: { type: 'es6' },
        sourceMaps: true,
      }),
    ],
    test: {
      coverage: {
        exclude: [...defaultConfig.test.coverage.exclude, 'src/bin/bin.ts'],
      },
    } satisfies InlineConfig,
  });
});

import('./vitest.config.ts').then(async (value) =>
  console.log(await value.default()),
);
