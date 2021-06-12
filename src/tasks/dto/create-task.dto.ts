import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

class task {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

export class CreateTaskBatchDto {
  @ValidateNested({ each: true })
  @Type(() => task)
  @IsNotEmpty()
  data: CreateTaskDto[];
}
