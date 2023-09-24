import { Injectable } from '@nestjs/core';

import { AppDto } from './app.dto';

@Injectable()
export class AppService {
  async get(): Promise<AppDto> {
    return {
      name: 'demo',
    }
  }
}
