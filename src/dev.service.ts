import { Injectable } from '@stlmpp/di';

import { ChildProcessService } from './child-process.service.js';
import { FirebaseService } from './firebase.service.js';
import { KillPortService } from './kill-port.service.js';
import { SwcService } from './swc.service.js';

export interface DevelopmentOptions {
  projectId?: string;
}

@Injectable({ root: true })
export class DevService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly swcService: SwcService,
    private readonly childProcessService: ChildProcessService,
    private readonly killPortService: KillPortService,
  ) {}

  async dev(options: DevelopmentOptions): Promise<void> {
    const firebaseJson = this.firebaseService.getFirebaseJson();
    const ports = this.firebaseService.getFirebaseJsonPorts(firebaseJson);
    const swcrc = this.swcService.getSwcDefault();
    swcrc.minify = false;
    await Promise.all([
      this.killPortService.killPorts(ports.map((port) => [port])),
      this.swcService.writeFile(swcrc),
      this.firebaseService.writeFile(firebaseJson),
    ]);
    if (options.projectId) {
      this.firebaseService.useProjectId(options.projectId);
    }
    this.childProcessService.spawn('npm', ['run', 'build:watch'], {
      shell: true,
      stdio: 'ignore',
    });
    this.firebaseService.startEmulators();
  }
}
