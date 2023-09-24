import { Injectable } from '@stlmpp/di';
import packageJson from 'package-json';

export interface NewOptions {
  name: string;
  path: string;
}

interface Dependency {
  name: string;
  version: string | 'latest';
}

@Injectable({ root: true })
export class NewService {
  private devDependencies: Dependency[] = [
    { name: '@assis-delivery/cli', version: 'latest' },
    { name: '@nestjs/cli', version: '~10.1.17' },
    { name: '@nestjs/schematics', version: '~10.0.2' },
    { name: '@nestjs/testing', version: '~10.2.4' },
    { name: '@swc/cli', version: '~0.1.62' },
    { name: '@swc/core', version: '~1.3.83' },
    { name: '@types/node', version: '~18.17.5' },
    { name: '@typescript-eslint/eslint-plugin', version: '~6.6.0' },
    { name: '@typescript-eslint/parser', version: '~6.6.0' },
    { name: '@vitest/coverage-v8', version: '~0.34.4' },
    { name: '@vitest/ui', version: '' },
    { name: 'eslint', version: '' },
    { name: 'eslint-import-resolver-typescript', version: '' },
    { name: 'eslint-plugin-import', version: '' },
    { name: 'eslint-plugin-unicorn', version: '' },
    { name: 'prettier', version: '' },
    { name: 'typescript', version: '' },
    { name: 'unplugin-swc', version: '' },
    { name: 'vitest', version: '' },
    { name: 'vitest-mock-extended', version: '' },
  ];

  async execute(options: NewOptions): Promise<void> {}
}
