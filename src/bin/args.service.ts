import { Inject, Injectable, InjectionToken } from '@stlmpp/di';
import arg from 'arg';
import camelcase from 'camelcase';
import { CamelCase, Replace, StringKeyOf } from 'type-fest';

import { formatZodErrorString } from '../common/zod-error-formatter.js';

import { ArgsSchema, ArgsType } from './args.schema.js';
import { CommandType } from './command.js';

type ArgCamelCase<T extends string> = CamelCase<Replace<T, '--', ''>>;

type FromArgToCamelCase<T extends Record<string, unknown>> = {
  [K in StringKeyOf<T> as ArgCamelCase<K>]: T[K];
};

const INTERNAL_ARGS = arg({
  '--project': String,
});

type InternalArgs = typeof INTERNAL_ARGS;

const InternalArgsToken = new InjectionToken<InternalArgs>('InternalArgs', {
  useFactory: () => INTERNAL_ARGS,
});

@Injectable({ root: true })
export class ArgsService {
  constructor(
    @Inject(InternalArgsToken)
    private readonly internalArgs: InternalArgs,
  ) {
    this.parsedArgs = this.parseArgs();
    this.args = this.validateAndGetArgs();
  }

  private readonly parsedArgs: FromArgToCamelCase<InternalArgs>;
  private readonly args: ArgsType;

  private parseArgs(): FromArgToCamelCase<InternalArgs> {
    return Object.fromEntries(
      Object.entries(this.internalArgs).map(([key, value]) => {
        if (key !== '_') {
          key = key.replace(/^--/, '');
          key = camelcase(key);
        }
        return [key, value];
      }),
    ) as FromArgToCamelCase<InternalArgs>;
  }

  private validateAndGetArgs(): ArgsType {
    const result = ArgsSchema.safeParse(this.parsedArgs);
    if (!result.success) {
      throw new Error(
        `Error parsing arguments. ${formatZodErrorString(result.error)}`,
      );
    }
    return result.data;
  }

  getCommand(): CommandType {
    return this.args._;
  }

  get<K extends Exclude<keyof ArgsType, '_'>>(key: K): ArgsType[K] {
    return this.args[key];
  }
}
