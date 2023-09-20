import { mock } from 'vitest-mock-extended';

import { DeployService } from './deploy.service.js';
import { FirebaseService } from './firebase.service.js';
import { FsService } from './fs.service.js';
import { PathService } from './path.service.js';
import { ProcessService } from './process.service.js';

describe('deploy.service', () => {
  let service: DeployService;

  const processServiceMock = mock<ProcessService>();
  const fsServiceMock = mock<FsService>();
  const pathServiceMock = mock<PathService>();
  const firebaseServiceMock = mock<FirebaseService>();

  beforeEach(() => {
    vi.resetAllMocks();
    service = new DeployService(
      processServiceMock,
      fsServiceMock,
      pathServiceMock,
      firebaseServiceMock,
    );
  });

  it('should create instance', () => {
    expect(service).toBeDefined();
  });
});
