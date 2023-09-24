import { zodDto } from '@assis-delivery/core';
import { z } from 'zod';

const AppDtoSchema = z.object({
  name: z.string(),
});

export class AppDto extends zodDto(AppDtoSchema) {}
