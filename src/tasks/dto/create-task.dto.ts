import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

export class CreateTaskBatchDto {
  @ValidateNested({ each: true })
  @Type(() => CreateTaskDto)
  @IsNotEmpty()
  data: CreateTaskDto[];
}
