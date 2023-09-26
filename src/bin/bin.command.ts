import { Injectable } from '@stlmpp/di';

import { ArgsService } from './args.service.js';
import { BuildCommand } from './build.command.js';
import { Command, CommandType } from './command.js';
import { DeployCommand } from './deploy.command.js';
import { DevCommand } from './dev.command.js';
import { HelpCommand } from './help.command.js';

@Injectable({ root: true })
export class BinCommand implements Command {
  constructor(
    private readonly argsService: ArgsService,
    helpCommand: HelpCommand,
    devCommand: DevCommand,
    buildCommand: BuildCommand,
    deployCommand: DeployCommand,
  ) {
    this.commands = {
      help: helpCommand,
      dev: devCommand,
      build: buildCommand,
      deploy: deployCommand,
    };
  }

  private readonly commands: Record<CommandType, Command>;

  execute(): void | Promise<void> {
    const command = this.argsService.getCommand();
    return this.commands[command].execute();
  }
}
