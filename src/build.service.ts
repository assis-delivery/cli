import { Injectable } from '@stlmpp/di';

import { ChildProcessService } from './child-process.service.js';
import { SwcService } from './swc.service.js';

@Injectable({ root: true })
export class BuildService {
  constructor(
    private readonly swcService: SwcService,
    private readonly childProcessService: ChildProcessService,
  ) {}

  async build(): Promise<void> {
    const swcrc = this.swcService.getSwcDefault();
    await this.swcService.writeFile(swcrc);
    this.childProcessService.spawnSync('npm', ['run', 'build:app'], {
      shell: true,
      stdio: 'inherit',
    });
  }
}
