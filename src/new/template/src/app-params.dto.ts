import { zodDto } from '@assis-delivery/core';
import { z } from 'zod';

const AppParamsDtoSchema = z.object({
  id: z.string(),
});

export class AppParamsDto extends zodDto(AppParamsDtoSchema) {}

const AppQueryParamsDtoSchema = z.object({
  active: z.string(),
});

export class AppQueryParamsDto extends zodDto(AppQueryParamsDtoSchema) {}
