import { Injectable } from '@stlmpp/di';

import { BuildService } from '../build.service.js';

import { Command } from './command.js';

@Injectable({ root: true })
export class BuildCommand implements Command {
  constructor(private readonly buildService: BuildService) {}

  async execute(): Promise<void> {
    await this.buildService.build();
  }
}
