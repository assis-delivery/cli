import { CoreModule, DrizzleOrmModule, FirebaseAdminModule } from '@assis-delivery/core';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller.js';

@Module({
  imports: [
    DrizzleOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connectionString: config.getOrThrow('DATABASE_URL'),
      }),
    }),
    CoreModule.forRoot(),
    FirebaseAdminModule.forRoot(),
  ],
  controllers: [AppController],
})
export class AppModule {}
