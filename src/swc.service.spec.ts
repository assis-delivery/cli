import { mock } from 'vitest-mock-extended';

import { FsService } from './fs.service.js';
import { PathService } from './path.service.js';
import { SwcService } from './swc.service.js';

describe('swc.service', () => {
  let service: SwcService;

  const fsServiceMock = mock<FsService>();
  const pathServiceMock = mock<PathService>();

  beforeEach(() => {
    vi.resetAllMocks();
    service = new SwcService(fsServiceMock, pathServiceMock);
  });

  it('should create instance', () => {
    expect(service).toBeDefined();
  });
});
