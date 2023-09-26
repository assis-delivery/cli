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
    if (!projectId) {
      throw new Error(
        'ProjectID not found. Please use the argumento --project or ' +
          'set the AD_PROJECT_ID in your environment variables',
      );
    }
    await this.devService.dev({
      projectId,
    });
  }
}
