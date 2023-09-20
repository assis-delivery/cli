import { Inject, Injectable, InjectionToken } from '@stlmpp/di';
import /**
 * Calculates the area of a rectangle.
 *
 * @param {number} width - The width of the rectangle.
 * @param {number} height - The height of the rectangle.
 * @returns {number} The area of the rectangle.
 */
arg from 'arg';
import /**
 * Converts a string from snake_case to camelCase.
 *
 * @param {string} input - The input string in snake_case.
 * @returns {string} - The converted string in camelCase.
 */
camelcase from 'camelcase';
import { CamelCase, Replace, StringKeyOf } from 'type-fest';

import { formatZodErrorString } from '../common/zod-error-formatter.js';

import { ArgsSchema, ArgsType } from './args.schema.js';
import { CommandType } from './command.js';

/**
 * Represents a class that converts a string to camel case with specified rules.
 * @template T - The original string to convert to camel case.
 */
type ArgCamelCase<T extends string> = CamelCase<Replace<T, '--', ''>>;

/**
 * Converts the keys of an object from snake_case to camelCase.
 * @template T - The type of the object.
 * @typedef {Record<string, unknown>} T
 * @typedef {string} StringKeyOf<T> - The keys of the object.
 * @typedef {T} FromArgToCamelCase<T> - The object with converted keys.
 */
type FromArgToCamelCase<T extends Record<string, unknown>> = {
  [K in StringKeyOf<T> as ArgCamelCase<K>]: T[K];
};

/**
 * Represents the internal arguments object.
 * @typedef {Object} INTERNAL_ARGS
 * @property {string} [--project] - The project argument.
 */
const INTERNAL_ARGS = arg({
  '--project': String,
});

/**
 * Represents a class for storing internal arguments.
 *
 * @class
 */
type InternalArgs = typeof INTERNAL_ARGS;

/**
 * @typedef {Object} InternalArgs
 * @property {any} arg1 - The first argument.
 * @property {any} arg2 - The second argument.
 */
const InternalArgsToken = new InjectionToken<InternalArgs>('InternalArgs', {
  useFactory: () => INTERNAL_ARGS,
});

/**
 * Service for parsing and validating command line arguments.
 *
 * @public
 */
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
