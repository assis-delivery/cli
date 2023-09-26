#!/usr/bin/env node
import { ROOT_INJECTOR } from '@stlmpp/di';

import { BinCommand } from './bin.command.js';

const bin = await ROOT_INJECTOR.resolve(BinCommand);

bin.execute();
