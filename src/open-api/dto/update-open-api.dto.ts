import { PartialType } from '@nestjs/swagger';
import { CreateOpenApiDto } from './create-open-api.dto';

export class UpdateOpenApiDto extends PartialType(CreateOpenApiDto) {}
