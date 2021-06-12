import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../task.model';

export class UpdateTaskDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string;
  @IsNotEmpty()
  @ApiProperty()
  description: string;
  @ApiProperty()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
