import { CommandType } from './command.js';

export async function helpCommand(): Promise<void> {
  const options: Record<CommandType, string> = {
    help: 'Show this menu',
    dev: 'Command used to develop locally',
    build: 'Build your code to production',
    deploy: 'Deploy your function (CI only)',
  };
  const entries = Object.entries(options);
  // eslint-disable-next-line no-console
  console.table(
    entries.map(([command, description]) => ({
      command,
      description,
    })),
  );
}
