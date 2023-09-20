import { Injectable } from '@stlmpp/di';

import { safe } from '../common/safe.js';
import { DeployService } from '../deploy.service.js';
import { ProcessService } from '../process.service.js';

import { ArgsService } from './args.service.js';
import { Command } from './command.js';

@Injectable({ root: true })
export class DeployCommand implements Command {
  constructor(
    private readonly deployService: DeployService,
    private readonly processService: ProcessService,
    private readonly argsService: ArgsService,
  ) {}

  async execute(): Promise<void> {
    if (this.processService.env.CI === 'true') {
      return this.deployCI();
    }
    await this.deployService.deploy();
  }

  private async deployCI(): Promise<void> {
    const {
      GOOGLE_APPLICATION_CREDENTIALS_JSON,
      GOOGLE_APPLICATION_CREDENTIALS_FILENAME,
      AD_PROJECT_ID,
    } = this.processService.env;

    if (!GOOGLE_APPLICATION_CREDENTIALS_JSON) {
      throw new Error('Missing GOOGLE_APPLICATION_CREDENTIALS_JSON variable');
    }

    const [, googleApplicationCredentialsJsonParsed] = safe(() =>
      JSON.parse(GOOGLE_APPLICATION_CREDENTIALS_JSON),
    );

    if (
      googleApplicationCredentialsJsonParsed ||
      typeof googleApplicationCredentialsJsonParsed !== 'object' ||
      !Object.keys(googleApplicationCredentialsJsonParsed).length
    ) {
      throw new Error('Invalid GOOGLE_APPLICATION_CREDENTIALS_JSON variable');
    }

    if (!GOOGLE_APPLICATION_CREDENTIALS_FILENAME) {
      throw new Error('Missing GOOGLE_APPLICATION_CREDENTIALS variable');
    }

    const projectId = this.argsService.get('project') ?? AD_PROJECT_ID;

    if (!projectId) {
      throw new Error(
        'ProjectID not found. Please use the argumento --project or ' +
          'set the AD_PROJECT_ID in your environment variables',
      );
    }

    await this.deployService.deployCI({
      googleApplicationCredentialsJson: googleApplicationCredentialsJsonParsed,
      googleApplicationCredentialsFilename:
        GOOGLE_APPLICATION_CREDENTIALS_FILENAME,
      projectId,
    });
  }
}
