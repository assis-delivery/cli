import { Injectable, ROOT_INJECTOR } from '@stlmpp/di';

import { BuildService } from './build.service.js';
import { DeployOptions, DeployService } from './deploy.service.js';
import { DevelopmentOptions, DevService } from './dev.service.js';

@Injectable({ root: true })
export class AdCli {
  constructor(
    private readonly buildService: BuildService,
    private readonly deployService: DeployService,
    private readonly devService: DevService,
  ) {}

  async build(): Promise<void> {
    await this.buildService.build();
  }

  async deploy(): Promise<void> {
    await this.deployService.deploy();
  }

  async deployCI(options: Required<DeployOptions>): Promise<void> {
    await this.deployService.deployCI(options);
  }

  async dev(options: DevelopmentOptions): Promise<void> {
    await this.devService.dev(options);
  }

  static async create(): Promise<AdCli> {
    return ROOT_INJECTOR.resolve(AdCli);
  }
}
