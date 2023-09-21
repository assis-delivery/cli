import { ROOT_INJECTOR } from '@stlmpp/di';
import { mock } from 'vitest-mock-extended';

import { AdCli } from './ad-cli.js';
import { BuildService } from './build.service.js';
import { DeployOptions, DeployService } from './deploy.service.js';
import { DevelopmentOptions, DevService } from './dev.service.js';

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

  it('should call build', async () => {
    await cli.build();
    expect(buildServiceMock.build).toHaveBeenCalledOnce();
  });

  it('should call deploy', async () => {
    await cli.deploy();
    expect(deployServiceMock.deploy).toHaveBeenCalledOnce();
  });

  it('should call deploy', async () => {
    const options: DeployOptions = {
      googleApplicationCredentialsJson: {},
      googleApplicationCredentialsFilename: 'file.json',
      projectId: 'id',
    };
    await cli.deployCI(options);
    expect(deployServiceMock.deployCI).toHaveBeenCalledWith(options);
  });

  it('should call dev', async () => {
    const options: DevelopmentOptions = {
      projectId: 'id',
    };
    await cli.dev(options);
    expect(devServiceMock.dev).toHaveBeenCalledWith(options);
  });

  it('should create a new instance', async () => {
    ROOT_INJECTOR.register([
      { provide: BuildService, useFactory: () => buildServiceMock },
      { provide: DeployService, useFactory: () => deployServiceMock },
      { provide: DevService, useFactory: () => devServiceMock },
    ]);
    const newCli = await AdCli.create();
    expect(newCli).toBeDefined();
    expect(newCli).toBeInstanceOf(AdCli);
  });
});
