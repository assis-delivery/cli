import { mock } from 'vitest-mock-extended';

import { ArgsService } from './args.service.js';
import { BinCommand } from './bin.command.js';
import { BuildCommand } from './build.command.js';
import { DeployCommand } from './deploy.command.js';
import { DevCommand } from './dev.command.js';
import { HelpCommand } from './help.command.js';

describe('bin.command', () => {
  let command: BinCommand;

  const argsServiceMock = mock<ArgsService>();
  const helpCommandMock = mock<HelpCommand>();
  const devCommandMock = mock<DevCommand>();
  const buildCommandMock = mock<BuildCommand>();
  const deployCommandMock = mock<DeployCommand>();

  beforeEach(() => {
    vi.resetAllMocks();
    command = new BinCommand(
      argsServiceMock,
      helpCommandMock,
      devCommandMock,
      buildCommandMock,
      deployCommandMock,
    );
  });

  it('should create instance', () => {
    expect(command).toBeDefined();
  });
});
