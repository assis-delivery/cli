import { mock } from 'vitest-mock-extended';

import { ChildProcessService } from './child-process.service.js';
import { FirebaseService } from './firebase.service.js';
import { FsService } from './fs.service.js';
import { PathService } from './path.service.js';
import { ProcessService } from './process.service.js';

describe('firebase.service', () => {
  let service: FirebaseService;

  const childProcessServiceMock = mock<ChildProcessService>();
  const pathServiceMock = mock<PathService>();
  const fsServiceMock = mock<FsService>();
  const processServiceMock = mock<ProcessService>();

  beforeEach(() => {
    vi.resetAllMocks();
    service = new FirebaseService(
      childProcessServiceMock,
      pathServiceMock,
      fsServiceMock,
      processServiceMock,
    );
  });

  it('should create instance', () => {
    expect(service).toBeDefined();
  });
});
