import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch,
  Put,
  Query,
} from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { TasksService } from './tasks.service';
import { CreateTaskDto, CreateTaskBatchDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Task } from './task.model.entity';

@ApiTags('Task')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @ApiCreatedResponse({
  //   description: 'The record has been successfully created.',
  //   type: Task,
  // })
  // @Get()
  // getTask(@Query() getTaskDto: GetTaskDto): Task[] {
  //   return this.tasksService.getTask(getTaskDto);
  // }

  @Get('/:id')
  getTasksById(@Param('id') id?: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  // @Post('/batch')
  // batchCreateTask(@Body() createTaskDto: CreateTaskBatchDto): Task[] {
  //   const tasks: Task[] = [];
  //   createTaskDto.data.forEach((task) => {
  //     tasks.push(this.tasksService.createTask(task));
  //   });
  //   return tasks;
  // }
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  delTasksById(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTaskById(id);
  }

  @Put('/:id')
  updateTasksById(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<void> {
    return this.tasksService.updateTaskById(id, updateTaskDto);
  }

  // @Patch('/:id/status')
  // updateStatusById(
  //   @Param('id') id: string,
  //   @Body('status') status: TaskStatus,
  // ): Task {
  //   return this.tasksService.updateStatusById(id, status);
  // }
}
