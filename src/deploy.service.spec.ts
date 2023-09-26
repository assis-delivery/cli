import { mock } from 'vitest-mock-extended';

import { DeployOptions, DeployService } from './deploy.service.js';
import { FirebaseService } from './firebase.service.js';
import { FsService } from './fs.service.js';
import { PathService } from './path.service.js';
import { ProcessService } from './process.service.js';

describe('deploy.service', () => {
  let service: DeployService;

  const processServiceMock = mock<ProcessService>({
    cwd: vi.fn(),
  });
  const fsServiceMock = mock<FsService>();
  const pathServiceMock = mock<PathService>({
    join: vi.fn(),
  });
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

  describe('deploy', () => {
    it('should call deploy correctly', async () => {
      await service.deploy();
      expect(firebaseServiceMock.deploy).toHaveBeenCalledWith(false);
    });
  });

  describe('deployCI', () => {
    it('should call deployCI correctly', async () => {
      vi.spyOn(pathServiceMock, 'join').mockReturnValueOnce('root/file.json');
      vi.spyOn(processServiceMock, 'cwd').mockReturnValueOnce('root');
      const options: DeployOptions = {
        projectId: 'id',
        googleApplicationCredentialsFilename: 'file.json',
        googleApplicationCredentialsJson: {},
      };
      await service.deployCI(options);
      expect(pathServiceMock.join).toHaveBeenCalledWith('root', 'file.json');
      expect(fsServiceMock.writeFile).toHaveBeenCalledWith(
        'root/file.json',
        '{}',
      );
      expect(firebaseServiceMock.deploy).toHaveBeenCalledWith(true);
    });
  });
});
