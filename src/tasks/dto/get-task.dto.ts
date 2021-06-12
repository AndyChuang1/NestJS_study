import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task.model';

export class GetTaskDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  @ApiProperty()
  status?: TaskStatus;
  @IsOptional()
  @IsString()
  @ApiProperty()
  search?: string;
}
