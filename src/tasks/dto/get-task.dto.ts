import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../task.model';
import { IsEnum, IsOptional, IsString } from 'class-validator';

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
