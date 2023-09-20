import { mock } from 'vitest-mock-extended';

import { BuildService } from '../build.service.js';

import { BuildCommand } from './build.command.js';

describe('build.command', () => {
  let command: BuildCommand;

  const buildServiceMock = mock<BuildService>();

  beforeEach(() => {
    vi.resetAllMocks();
    command = new BuildCommand(buildServiceMock);
  });

  it('should create instance', () => {
    expect(command).toBeDefined();
  });

  it('should call build service', async () => {
    await command.execute();
    expect(buildServiceMock.build).toHaveBeenCalled();
  });
});
