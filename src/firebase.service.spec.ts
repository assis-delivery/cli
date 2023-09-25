import { ChildProcess } from 'node:child_process';

import { mock } from 'vitest-mock-extended';

import { ChildProcessService } from './child-process.service.js';
import { FirebaseService } from './firebase.service.js';
import { FsService } from './fs.service.js';
import { PathService } from './path.service.js';
import { ProcessService } from './process.service.js';
import { FirebaseJson } from './type/firebase-json.type.js';

describe('firebase.service', () => {
  let service: FirebaseService;

  const childProcessServiceMock = mock<ChildProcessService>({
    spawnSync: vi.fn() as never,
    spawn: vi.fn() as never,
  });
  const pathServiceMock = mock<PathService>({
    join: vi.fn(),
  });
  const fsServiceMock = mock<FsService>({
    writeFile: vi.fn(),
  });
  const processServiceMock = mock<ProcessService>({
    cwd: vi.fn().mockReturnValue('root'),
  });

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

  it('should get firebaseJson', () => {
    const json = service.getFirebaseJson();
    expect(json).toBeDefined();
    expect(json).toBeTypeOf('object');
  });

  it('should get firebaseJson ports', () => {
    const json: FirebaseJson = {
      emulators: {
        auth: { port: 1 },
        ui: { port: 2 },
        eventarc: { port: 3 },
        functions: { port: 4 },
        firestore: { port: 5 },
        singleProjectMode: true,
        pubsub: { port: 6 },
        database: { port: 7 },
      },
    };
    const ports = service.getFirebaseJsonPorts(json);
    expect(ports).toBeDefined();
    expect(ports).toHaveLength(7);
    expect(ports).toEqual(expect.arrayContaining([1, 2, 3, 4, 5, 6, 7]));
  });

  it('should change project', () => {
    service.useProjectId('id');
    const args: Parameters<ChildProcessService['spawnSync']> = [
      'firebase',
      ['use', 'id'],
      {
        shell: true,
        stdio: 'ignore',
      },
    ];
    expect(childProcessServiceMock.spawnSync).toHaveBeenCalledWith(...args);
  });

  it('should write firebase.json', async () => {
    vi.spyOn(pathServiceMock, 'join').mockReturnValueOnce('root/firebase.json');
    vi.spyOn(processServiceMock, 'cwd').mockReturnValueOnce('root');
    await service.writeFile({});
    expect(pathServiceMock.join).toHaveBeenCalledWith('root', 'firebase.json');
    expect(fsServiceMock.writeFile).toHaveBeenCalledWith(
      'root/firebase.json',
      '{}',
    );
  });

  describe('startEmulators', () => {
    it('should start emulator and save the program', () => {
      service.startEmulators();
      const args: Parameters<ChildProcessService['spawn']> = [
        'firebase',
        ['emulators:start'],
        {
          shell: true,
          stdio: 'inherit',
        },
      ];
      expect(childProcessServiceMock.spawn).toHaveBeenCalledWith(...args);
    });

    it('should use the cached program', () => {
      vi.spyOn(childProcessServiceMock, 'spawn').mockReturnValueOnce(
        mock<ChildProcess>(),
      );
      const program1 = service.startEmulators();
      const program2 = service.startEmulators();
      expect(program1).toBe(program2);
      expect(childProcessServiceMock.spawn).toHaveBeenCalledTimes(1);
    });
  });

  it('stopEmulators', () => {
    it('should stop emulators', () => {
      const programMock = mock<ChildProcess>({
        kill: vi.fn(),
      });
      vi.spyOn(childProcessServiceMock, 'spawn').mockReturnValueOnce(
        programMock,
      );
      service.startEmulators();
      service.stopEmulators();
      expect(programMock.kill).toHaveBeenCalled();
    });

    it('should do nothing', () => {
      const programMock = mock<ChildProcess>({
        kill: vi.fn(),
      });
      vi.spyOn(childProcessServiceMock, 'spawn').mockReturnValueOnce(
        programMock,
      );
      service.stopEmulators();
      expect(programMock.kill).not.toHaveBeenCalled();
    });
  });

  describe('deploy', () => {
    it('should deploy (no CI)', () => {
      service.deploy(false);
      const args: Parameters<ChildProcessService['spawnSync']> = [
        'firebase',
        ['deploy', '--only', 'functions'],
        {
          shell: true,
          stdio: 'inherit',
        },
      ];
      expect(childProcessServiceMock.spawnSync).toHaveBeenCalledWith(...args);
    });

    it('should deploy (CI)', () => {
      service.deploy(true);
      const args: Parameters<ChildProcessService['spawnSync']> = [
        'firebase',
        ['deploy', '--only', 'functions', '-f', '--non-interactive'],
        {
          shell: true,
          stdio: 'inherit',
        },
      ];
      expect(childProcessServiceMock.spawnSync).toHaveBeenCalledWith(...args);
    });
  });
});
