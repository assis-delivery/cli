import { Injectable } from '@stlmpp/di';

import { ConsoleService } from '../console.service.js';

import { Command, CommandType } from './command.js';

@Injectable({ root: true })
export class HelpCommand implements Command {
  constructor(private readonly consoleService: ConsoleService) {}

  execute(): void {
    const options: Record<CommandType, string> = {
      help: 'Show this menu',
      dev: 'Command used to develop locally',
      build: 'Build your code to production',
      deploy: 'Deploy your function (CI only)',
    };
    const entries = Object.entries(options);
    this.consoleService.table(
      entries.map(([command, description]) => ({
        command,
        description,
      })),
    );
  }
}
