import { Injectable } from '@stlmpp/di';

import { getClazz } from './common/get-clazz.js';

@Injectable({ root: true, useFactory: () => process })
export class ProcessService extends getClazz<typeof process>() {}
