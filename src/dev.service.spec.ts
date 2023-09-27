import { mock } from 'vitest-mock-extended';

import { ChildProcessService } from './child-process.service.js';
import { DevelopmentOptions, DevService } from './dev.service.js';
import { FirebaseService } from './firebase.service.js';
import { KillPortService } from './kill-port.service.js';
import { ProcessService } from './process.service.js';
import { SwcService } from './swc.service.js';
import { FirebaseJson } from './type/firebase-json.type.js';
import { SWCOptions } from './type/swc.type.js';

describe('dev.service', () => {
  let service: DevService;

  const firebaseServiceMock = mock<FirebaseService>({
    getFirebaseJson: vi.fn(),
    getFirebaseJsonPorts: vi.fn(),
  });
  const swcServiceMock = mock<SwcService>({
    getSwcDefault: vi.fn(),
  });
  const childProcessServiceMock = mock<ChildProcessService>();
  const killPortServiceMock = mock<KillPortService>();
  const processServiceMock = mock<ProcessService>({
    env: {},
  });

  beforeEach(() => {
    vi.resetAllMocks();
    service = new DevService(
      firebaseServiceMock,
      swcServiceMock,
      childProcessServiceMock,
      killPortServiceMock,
      processServiceMock,
    );
  });

  it('should create instance', () => {
    expect(service).toBeDefined();
  });

  it('should change project id', async () => {
    const firebaseJson: FirebaseJson = {};
    vi.spyOn(firebaseServiceMock, 'getFirebaseJson').mockReturnValueOnce(
      firebaseJson,
    );
    vi.spyOn(firebaseServiceMock, 'getFirebaseJsonPorts').mockReturnValueOnce([
      3000, 3001,
    ]);
    const swcrc: SWCOptions = {};
    vi.spyOn(swcServiceMock, 'getSwcDefault').mockReturnValueOnce(swcrc);
    const options: DevelopmentOptions = {
      projectId: 'id',
    };
    await service.dev(options);
    expect(firebaseServiceMock.getFirebaseJson).toHaveBeenCalledOnce();
    expect(firebaseServiceMock.getFirebaseJsonPorts).toHaveBeenCalledWith(
      firebaseJson,
    );
    expect(swcServiceMock.getSwcDefault).toHaveBeenCalledOnce();
    const killPortsArgs: Parameters<KillPortService['killPorts']> = [
      [[3000], [3001]],
    ];
    expect(killPortServiceMock.killPorts).toHaveBeenCalledWith(
      ...killPortsArgs,
    );
    expect(swcServiceMock.writeFile).toHaveBeenCalledWith({
      ...swcrc,
      minify: false,
    });
    expect(firebaseServiceMock.writeFile).toHaveBeenCalledWith(firebaseJson);
    expect(firebaseServiceMock.useProjectId).toHaveBeenCalledWith(
      options.projectId,
    );
    const spawnArgs: Parameters<ChildProcessService['spawn']> = [
      'npm',
      ['run', 'build:watch'],
      {
        shell: true,
        stdio: 'ignore',
      },
    ];
    expect(childProcessServiceMock.spawn).toHaveBeenCalledWith(...spawnArgs);
    expect(firebaseServiceMock.startEmulators).toHaveBeenCalledOnce();
  });

  it('should not change project id', async () => {
    const firebaseJson: FirebaseJson = {};
    vi.spyOn(firebaseServiceMock, 'getFirebaseJson').mockReturnValueOnce(
      firebaseJson,
    );
    vi.spyOn(firebaseServiceMock, 'getFirebaseJsonPorts').mockReturnValueOnce([
      3000, 3001,
    ]);
    const swcrc: SWCOptions = {};
    vi.spyOn(swcServiceMock, 'getSwcDefault').mockReturnValueOnce(swcrc);
    const options: DevelopmentOptions = {};
    await service.dev(options);
    expect(firebaseServiceMock.getFirebaseJson).toHaveBeenCalledOnce();
    expect(firebaseServiceMock.getFirebaseJsonPorts).toHaveBeenCalledWith(
      firebaseJson,
    );
    expect(swcServiceMock.getSwcDefault).toHaveBeenCalledOnce();
    const killPortsArgs: Parameters<KillPortService['killPorts']> = [
      [[3000], [3001]],
    ];
    expect(killPortServiceMock.killPorts).toHaveBeenCalledWith(
      ...killPortsArgs,
    );
    expect(swcServiceMock.writeFile).toHaveBeenCalledWith({
      ...swcrc,
      minify: false,
    });
    expect(firebaseServiceMock.writeFile).toHaveBeenCalledWith(firebaseJson);
    expect(firebaseServiceMock.useProjectId).not.toHaveBeenCalled();
    const spawnArgs: Parameters<ChildProcessService['spawn']> = [
      'npm',
      ['run', 'build:watch'],
      {
        shell: true,
        stdio: 'ignore',
      },
    ];
    expect(childProcessServiceMock.spawn).toHaveBeenCalledWith(...spawnArgs);
    expect(firebaseServiceMock.startEmulators).toHaveBeenCalledOnce();
  });
});
