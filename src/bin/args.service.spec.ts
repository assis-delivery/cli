import { ArgsService } from './args.service.js';

describe('args.service', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should create instance', () => {
    const service = new ArgsService({
      _: ['dev'],
      '--project': undefined,
    });
    expect(service).toBeDefined();
  });
});
