import childProcess from 'node:child_process';

import { Injectable } from '@stlmpp/di';

import { getClazz } from './common/get-clazz.js';

@Injectable({ root: true, useFactory: () => childProcess })
export class ChildProcessService extends getClazz<typeof childProcess>() {}
