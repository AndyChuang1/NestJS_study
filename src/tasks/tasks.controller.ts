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
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskDto } from './dto/get-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTask(@Query() getTaskDto: GetTaskDto): Task[] {
    return this.tasksService.getTask(getTaskDto);
  }

  @Get('/:id')
  getTasksById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto[]): Task[] {
    const tasks: Task[] = [];
    createTaskDto.forEach((task) => {
      tasks.push(this.tasksService.createTask(task));
    });
    return tasks;
  }

  @Delete('/:id')
  delTasksById(@Param('id') id: string): void {
    this.tasksService.deleteTaskById(id);
  }

  @Put('/:id')
  updateTasksById(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): void {
    this.tasksService.updateTaskById(id, updateTaskDto);
  }

  @Patch('/:id/status')
  updateStatusById(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasksService.updateStatusById(id, status);
  }
}
