import { Injectable } from '@stlmpp/di';

import { FsService } from './fs.service.js';
import { PathService } from './path.service.js';
import { SWCOptions } from './type/swc.type.js';

@Injectable({ root: true })
export class SwcService {
  constructor(
    private readonly fsService: FsService,
    private readonly pathService: PathService,
  ) {}

  getSwcDefault(): SWCOptions {
    return {
      $schema: 'https://json.schemastore.org/swcrc',
      sourceMaps: true,
      minify: true,
      jsc: {
        parser: {
          syntax: 'typescript',
          decorators: true,
          dynamicImport: true,
        },
        minify: {
          compress: {
            unused: true,
          },
        },
        keepClassNames: true,
        transform: {
          legacyDecorator: true,
          decoratorMetadata: true,
        },
      },
      module: {
        type: 'es6',
      },
    };
  }

  async writeFile(swcrc: SWCOptions): Promise<void> {
    const path = this.pathService.join(process.cwd(), '.swcrc');
    await this.fsService.writeFile(path, JSON.stringify(swcrc));
  }
}
