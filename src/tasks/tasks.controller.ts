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
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Task, TaskStatus } from './entity/task.model.entity';
import { TasksService } from './tasks.service';
import { CreateTaskDto, CreateTaskBatchDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { OpenAPI, OpenAPIRes } from './entity/openAPI.entity';
import { Translator } from './translator/translator';

@ApiTags('task')
@Controller('tasks')
export class TasksController {
  constructor(
    private tasksService: TasksService,
    private translator: Translator,
  ) {}

  // @ApiCreatedResponse({
  //   description: 'The record has been successfully created.',
  //   type: Task,
  // })
  @Get()
  getTask(@Query() getTaskDto: GetTaskDto): Task[] {
    return this.tasksService.getTask(getTaskDto);
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/openAPI')
  async getApiSample(@Req() req): Promise<OpenAPIRes> {
    const result = await this.tasksService.getOpenAPI();
    const res = this.translator.translatorToResponse(result);
    console.log(res);
    return res;
  }

  @Get('/:id')
  getTasksById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post('/batch')
  batchCreateTask(@Body() createTaskDto: CreateTaskBatchDto): Task[] {
    const tasks: Task[] = [];
    createTaskDto.data.forEach((task) => {
      tasks.push(this.tasksService.createTask(task));
    });
    return tasks;
  }
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
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
