import {
  IsEmail,
  IsNotEmpty,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;
  @ApiProperty({ description: 'Task description' })
  @IsNotEmpty()
  description: string;
}

export class CreateTaskBatchDto {
  @ValidateNested({ each: true })
  @Type(() => CreateTaskDto)
  @IsNotEmpty()
  @ApiProperty({ type: [CreateTaskDto] })
  data: CreateTaskDto[];
}
