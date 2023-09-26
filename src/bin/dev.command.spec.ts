import { mock } from 'vitest-mock-extended';

import { DevService } from '../dev.service.js';
import { ProcessService } from '../process.service.js';

import { ArgsService } from './args.service.js';
import { DevCommand } from './dev.command.js';

describe('dev.command', () => {
  let command: DevCommand;

  const devServiceMock = mock<DevService>();
  const processServiceMock = mock<ProcessService>();
  const argsServiceMock = mock<ArgsService>();

  beforeEach(() => {
    vi.resetAllMocks();
    command = new DevCommand(
      devServiceMock,
      processServiceMock,
      argsServiceMock,
    );
  });

  it('should create instance', () => {
    expect(command).toBeDefined();
  });
});
