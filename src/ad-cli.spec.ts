import { mock } from 'vitest-mock-extended';

import { AdCli } from './ad-cli.js';
import { BuildService } from './build.service.js';
import { DeployService } from './deploy.service.js';
import { DevService } from './dev.service.js';

describe('ad-cli', () => {
  let cli: AdCli;

  const buildServiceMock = mock<BuildService>();
  const deployServiceMock = mock<DeployService>();
  const devServiceMock = mock<DevService>();

  beforeEach(() => {
    vi.resetAllMocks();
    cli = new AdCli(buildServiceMock, deployServiceMock, devServiceMock);
  });

  it('should create instance', () => {
    expect(cli).toBeDefined();
  });
});
