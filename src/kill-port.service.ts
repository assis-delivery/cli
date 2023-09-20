import { Inject, Injectable, InjectionToken } from '@stlmpp/di';
import killPort from 'kill-port';

import { noop } from './common/noop.js';

type KillPortFunctionType = typeof killPort;
const KillPortFunctionToken = new InjectionToken<KillPortFunctionType>(
  'KillPortFunction',
  {
    useFactory: () => killPort,
  },
);

@Injectable({ root: true })
export class KillPortService {
  constructor(
    @Inject(KillPortFunctionToken)
    private readonly killPortFunction: KillPortFunctionType,
  ) {}

  async kill(...args: Parameters<typeof killPort>): Promise<void> {
    await this.killPortFunction(...args).catch(noop);
  }

  async killPorts(ports: Parameters<typeof killPort>[]): Promise<void> {
    await Promise.all([ports.map((args) => this.kill(...args))]);
  }
}
