import arg from 'arg';
import camelcase from 'camelcase';
import { CamelCase, Replace, StringKeyOf } from 'type-fest';
import { z } from 'zod';

import { formatZodErrorString } from '../zod-error-formatter.js';

const internalArgs = arg({
  '--project': String,
});

type ArgCamelCase<T extends string> = CamelCase<Replace<T, '--', ''>>;

type FromArgToCamelCase<T extends Record<string, unknown>> = {
  [K in StringKeyOf<T> as ArgCamelCase<K>]: T[K];
};

function parseArgs<T extends Record<string, unknown>>(
  obj: T,
): FromArgToCamelCase<T> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      if (key === '_') {
        return [key, value];
      }
      key = key.replace(/^--/, '');
      key = camelcase(key);
      return [key, value];
    }),
  ) as FromArgToCamelCase<T>;
}

const VALID_COMMANDS_ARRAY = ['help', 'dev', 'build', 'deploy'] as const;
const VALID_COMMANDS: ReadonlySet<string> = new Set(VALID_COMMANDS_ARRAY);

const ArgsSchema = z
  .object({
    _: z
      .array(z.string().trim(), {
        required_error: `Command is required.
Please use one of the following: ${VALID_COMMANDS_ARRAY.join(', ')}`,
      })
      .transform((array) => array.find((item) => VALID_COMMANDS.has(item)))
      .pipe(
        z.enum(VALID_COMMANDS_ARRAY, {
          invalid_type_error: `Command must be one of the following: ${VALID_COMMANDS_ARRAY.join(
            ', ',
          )}`,
        }),
      ),
    project: z.string().trim().nonempty('project must not be empty').optional(),
  })
  .passthrough();

function getArgs() {
  const parsedArgs = parseArgs(internalArgs);
  const result = ArgsSchema.safeParse(parsedArgs);
  if (!result.success) {
    throw new Error(
      `Error parsing arguments. ${formatZodErrorString(result.error)}`,
    );
  }
  return result.data;
}

export const args = getArgs();
