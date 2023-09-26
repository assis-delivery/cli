import { KillPortService } from './kill-port.service.js';

describe('kill-port.service', () => {
  let service: KillPortService;

  const killPortFunctionMock = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    service = new KillPortService(killPortFunctionMock);
  });

  it('should create instance', () => {
    expect(service).toBeDefined();
  });
});
