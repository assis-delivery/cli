import { vitestConfig } from '@assis-delivery/config';
import { InlineConfig } from 'vitest';
import { defineConfig, mergeConfig } from 'vitest/config';

export default defineConfig(async (env) => {
  const defaultConfig = await vitestConfig(env);
  return mergeConfig(defaultConfig, {
    test: {
      coverage: {
        exclude: [...defaultConfig.test.coverage.exclude, 'src/bin/bin.ts'],
        // Coverage does not seem to be working... at all,
        // so it is disabled for now
        branches: 0,
        functions: 0,
        statements: 0,
        lines: 0,
      },
    } satisfies InlineConfig,
  });
});
