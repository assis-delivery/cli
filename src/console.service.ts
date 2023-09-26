import { Injectable } from '@stlmpp/di';

import { getClazz } from './common/get-clazz.js';

@Injectable({ root: true, useFactory: () => console })
export class ConsoleService extends getClazz<typeof console>() {}
