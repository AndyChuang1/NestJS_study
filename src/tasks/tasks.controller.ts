import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch,
  Put,
} from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTasksById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
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
