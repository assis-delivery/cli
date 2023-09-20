import { mock } from 'vitest-mock-extended';

import { DeployService } from '../deploy.service.js';
import { ProcessService } from '../process.service.js';

import { ArgsService } from './args.service.js';
import { DeployCommand } from './deploy.command.js';

describe('deploy.command', () => {
  let command: DeployCommand;

  const deployServiceMock = mock<DeployService>();
  const processServiceMock = mock<ProcessService>();
  const argsServiceMock = mock<ArgsService>();

  beforeEach(() => {
    vi.resetAllMocks();
    command = new DeployCommand(
      deployServiceMock,
      processServiceMock,
      argsServiceMock,
    );
  });

  it('should create instance', () => {
    expect(command).toBeDefined();
  });
});
