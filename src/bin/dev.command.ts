import { Injectable } from '@stlmpp/di';

import { DevService } from '../dev.service.js';
import { ProcessService } from '../process.service.js';

import { ArgsService } from './args.service.js';
import { Command } from './command.js';

@Injectable({ root: true })
export class DevCommand implements Command {
  constructor(
    private readonly devService: DevService,
    private readonly processService: ProcessService,
    private readonly argsService: ArgsService,
  ) {}

  async execute(): Promise<void> {
    const projectId =
      this.argsService.get('project') ?? this.processService.env.AD_PROJECT_ID;
    await this.devService.dev({
      projectId,
    });
  }
}
