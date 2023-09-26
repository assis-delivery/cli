import { Injectable } from '@stlmpp/di';

import { FirebaseService } from './firebase.service.js';
import { FsService } from './fs.service.js';
import { PathService } from './path.service.js';
import { ProcessService } from './process.service.js';

export interface DeployOptions {
  googleApplicationCredentialsJson: object;
  googleApplicationCredentialsFilename: string;
  projectId: string;
}

@Injectable({ root: true })
export class DeployService {
  constructor(
    private readonly processService: ProcessService,
    private readonly fsService: FsService,
    private readonly pathService: PathService,
    private readonly firebaseService: FirebaseService,
  ) {}

  async deploy(): Promise<void> {
    this.firebaseService.deploy(false);
  }

  async deployCI(options: DeployOptions): Promise<void> {
    const {
      googleApplicationCredentialsJson,
      googleApplicationCredentialsFilename,
      projectId,
    } = options;
    const googleApplicationCredentialsPath = this.pathService.join(
      this.processService.cwd(),
      googleApplicationCredentialsFilename,
    );
    await this.fsService.writeFile(
      googleApplicationCredentialsPath,
      JSON.stringify(googleApplicationCredentialsJson),
    );
    this.firebaseService.useProjectId(projectId);
    this.firebaseService.deploy(true);
  }
}
