import { mock } from 'vitest-mock-extended';

import { BuildService } from './build.service.js';
import { ChildProcessService } from './child-process.service.js';
import { SwcService } from './swc.service.js';

describe('build.service', () => {
  let service: BuildService;

  const swcServiceMock = mock<SwcService>();
  const childProcessServiceMock = mock<ChildProcessService>();

  beforeEach(() => {
    vi.resetAllMocks();
    service = new BuildService(swcServiceMock, childProcessServiceMock);
  });

  it('should create instance', () => {
    expect(service).toBeDefined();
  });
});
