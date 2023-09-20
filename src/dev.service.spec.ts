import { mock } from 'vitest-mock-extended';

import { ChildProcessService } from './child-process.service.js';
import { DevService } from './dev.service.js';
import { FirebaseService } from './firebase.service.js';
import { KillPortService } from './kill-port.service.js';
import { SwcService } from './swc.service.js';

describe('dev.service', () => {
  let service: DevService;

  const firebaseServiceMock = mock<FirebaseService>();
  const swcServiceMock = mock<SwcService>();
  const childProcessServiceMock = mock<ChildProcessService>();
  const killPortServiceMock = mock<KillPortService>();

  beforeEach(() => {
    vi.resetAllMocks();
    service = new DevService(
      firebaseServiceMock,
      swcServiceMock,
      childProcessServiceMock,
      killPortServiceMock,
    );
  });

  it('should create instance', () => {
    expect(service).toBeDefined();
  });
});
