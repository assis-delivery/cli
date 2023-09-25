import { mock } from 'vitest-mock-extended';

import { BuildService } from './build.service.js';
import { ChildProcessService } from './child-process.service.js';
import { SwcService } from './swc.service.js';
import { SWCOptions } from './type/swc.type.js';

describe('build.service', () => {
  let service: BuildService;

  const swcServiceMock = mock<SwcService>({
    getSwcDefault: vi.fn(),
    writeFile: vi.fn(),
  });
  const childProcessServiceMock = mock<ChildProcessService>();

  beforeEach(() => {
    vi.resetAllMocks();
    service = new BuildService(swcServiceMock, childProcessServiceMock);
  });

  it('should create instance', () => {
    expect(service).toBeDefined();
  });

  it('should execute build correctly', async () => {
    const swcrc: SWCOptions = {};
    vi.spyOn(swcServiceMock, 'getSwcDefault').mockReturnValueOnce(swcrc);
    await service.build();
    expect(swcServiceMock.getSwcDefault).toHaveBeenCalledOnce();
    expect(swcServiceMock.writeFile).toHaveBeenCalledWith(swcrc);
    const spawnSyncArgs: Parameters<ChildProcessService['spawnSync']> = [
      'npm',
      ['run', 'build:app'],
      {
        shell: true,
        stdio: 'inherit',
      },
    ];
    expect(childProcessServiceMock.spawnSync).toHaveBeenCalledWith(
      ...spawnSyncArgs,
    );
  });
});
