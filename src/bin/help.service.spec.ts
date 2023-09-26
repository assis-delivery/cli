import { mock } from 'vitest-mock-extended';

import { ConsoleService } from '../console.service.js';

import { HelpCommand } from './help.command.js';

describe('help.command', () => {
  let command: HelpCommand;

  const consoleServiceMock = mock<ConsoleService>();

  beforeEach(() => {
    vi.resetAllMocks();
    command = new HelpCommand(consoleServiceMock);
  });

  it('should create instance', () => {
    expect(command).toBeDefined();
  });
});
