import { vitestConfig } from '@assis-delivery/config';
import { InlineConfig } from 'vitest';
import { defineConfig, mergeConfig } from 'vitest/config';

export default defineConfig(async (env) => {
  const defaultConfig = await vitestConfig(env);
  return mergeConfig(defaultConfig, {
    test: {
      coverage: {
        exclude: [...defaultConfig.test.coverage.exclude, 'src/bin/bin.ts'],
      },
    } satisfies InlineConfig,
  });
});
