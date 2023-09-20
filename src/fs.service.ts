import fs from 'node:fs/promises';

import { Injectable } from '@stlmpp/di';

import { getClazz } from './common/get-clazz.js';

@Injectable({ root: true, useFactory: () => fs })
export class FsService extends getClazz<typeof fs>() {}
