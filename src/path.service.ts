import path from 'node:path';

import { Injectable } from '@stlmpp/di';

import { getClazz } from './common/get-clazz.js';

@Injectable({ root: true, useFactory: () => path })
export class PathService extends getClazz<typeof path>() {}
