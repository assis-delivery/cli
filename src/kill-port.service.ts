import { Injectable } from '@stlmpp/di';
import killPort from 'kill-port';

import { noop } from './common/noop.js';

@Injectable({ root: true })
export class KillPortService {
  async kill(...args: Parameters<typeof killPort>): Promise<void> {
    await killPort(...args).catch(noop);
  }

  async killPorts(ports: Parameters<typeof killPort>[]): Promise<void> {
    await Promise.all([ports.map((args) => this.kill(...args))]);
  }
}
