import { ChildProcess } from 'node:child_process';

import { Injectable } from '@stlmpp/di';

import { ChildProcessService } from './child-process.service.js';
import { FsService } from './fs.service.js';
import { PathService } from './path.service.js';
import { ProcessService } from './process.service.js';
import { FirebaseJson } from './type/firebase-json.type.js';

@Injectable({ root: true })
export class FirebaseService {
  constructor(
    private readonly childProcessService: ChildProcessService,
    private readonly pathService: PathService,
    private readonly fsService: FsService,
    private readonly processService: ProcessService,
  ) {}

  private _emulatorsProgram?: ChildProcess;

  getFirebaseJson(): FirebaseJson {
    return {
      $schema:
        'https://raw.githubusercontent.com/firebase/firebase-tools/master/schema/firebase-config.json',
      functions: [
        {
          source: '.',
          codebase: 'default',
          ignore: [
            'node_modules',
            '.git',
            'firebase-debug.log',
            'firebase-debug.*.log',
            '.env',
            '.secret.local',
          ],
          predeploy: ['pnpm build'],
          runtime: 'nodejs18',
        },
      ],
      emulators: {
        auth: {
          port: 9099,
        },
        functions: {
          port: 5001,
        },
        firestore: {
          port: 8080,
        },
        ui: {
          enabled: true,
        },
        singleProjectMode: true,
        pubsub: {
          port: 8085,
        },
        eventarc: {
          port: 9299,
        },
      },
    };
  }

  getFirebaseJsonPorts(json: FirebaseJson): number[] {
    return Object.values(json.emulators ?? {})
      .filter(
        (item): item is { port: number } =>
          typeof item === 'object' &&
          'port' in item &&
          typeof item.port === 'number',
      )
      .map((item) => item.port);
  }

  useProjectId(projectId: string): void {
    this.childProcessService.spawnSync('firebase', ['use', projectId], {
      shell: true,
      stdio: 'ignore',
    });
  }

  async writeFile(firebaseJson: FirebaseJson): Promise<void> {
    const path = this.pathService.join(
      this.processService.cwd(),
      'firebase.json',
    );
    await this.fsService.writeFile(path, JSON.stringify(firebaseJson));
  }

  startEmulators(): ChildProcess {
    if (this._emulatorsProgram) {
      return this._emulatorsProgram;
    }
    this._emulatorsProgram = this.childProcessService.spawn(
      'firebase',
      ['emulators:start'],
      {
        shell: true,
        stdio: 'inherit',
      },
    );
    return this._emulatorsProgram;
  }

  stopEmulators(): void {
    if (this._emulatorsProgram) {
      this._emulatorsProgram.kill();
      this._emulatorsProgram = undefined;
    }
  }

  deploy(ci: boolean): void {
    const args = ['deploy', '--only', 'functions'];
    if (ci) {
      args.push('-f', '--non-interactive');
    }
    this.childProcessService.spawnSync('firebase', args, {
      shell: true,
      stdio: 'inherit',
    });
  }
}
