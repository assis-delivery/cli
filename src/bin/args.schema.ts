import { z } from 'zod';

import { VALID_COMMANDS, VALID_COMMANDS_ARRAY } from './command.js';

export const ArgsSchema = z
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

export type ArgsType = z.infer<typeof ArgsSchema>;
