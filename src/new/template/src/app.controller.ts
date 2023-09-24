import { exception, Exceptions, Response, Params, QueryParams } from '@assis-delivery/core';
import { Controller, Post, HttpStatus, Get } from '@nestjs/common';

import { AppParamsDto, AppQueryParamsDto } from './app-params.dto';
import { AppDto } from './app.dto';
import { AppService } from "./app.service";


const ERROR_01 = exception({
  errorCode: 'APP-0001',
  status: HttpStatus.NOT_FOUND,
  error: 'Something not found',
});

@Controller({ version: '1' })
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Exceptions([ERROR_01])
  @Response(AppDto)
  @Post(':id')
  async post(
    @Params() { id }: AppParamsDto,
    @QueryParams() { name }: AppQueryParamsDto,
  ): Promise<AppDto> {
    // Do POST operations here
    return {
      name: 'demo',
    }
  }

  @Exceptions([ERROR_01])
  @Response(AppDto)
  @Get()
  async get(): Promise<AppDto> {
    // Do get operation here
    return this.appService.get();
  }
}
