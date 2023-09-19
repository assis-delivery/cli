export const VALID_COMMANDS_ARRAY = ['help', 'dev', 'build', 'deploy'] as const;
export const VALID_COMMANDS: ReadonlySet<string> = new Set(
  VALID_COMMANDS_ARRAY,
);
export type CommandType = (typeof VALID_COMMANDS_ARRAY)[number];
