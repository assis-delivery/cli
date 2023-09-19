#!/usr/bin/env node
import { args } from './args.js';
import { buildCommand } from './build.command.js';
import { CommandType } from './command.js';
import { deployCommand } from './deploy.command.js';
import { devCommand } from './dev.command.js';
import { helpCommand } from './help.command.js';

const command = args._;

const commands: Record<CommandType, () => Promise<void>> = {
  help: helpCommand,
  dev: devCommand,
  build: buildCommand,
  deploy: deployCommand,
};

commands[command]();
