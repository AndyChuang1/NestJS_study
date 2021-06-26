import { Injectable, NotFoundException } from '@nestjs/common';

import { TasksRepository } from './task.respository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.model.entity';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto, CreateTaskBatchDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository) private tasksRepository: TasksRepository,
  ) {}
  // private tasks: Task[] = [];
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  getTask(getTaskDto: GetTaskDto, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(getTaskDto, user);
  }
  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id, user } });

    if (!found) {
      throw new NotFoundException(`Task id: ${id} not found`);
    }

    return found;
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }
  createTasks(createTaskDto: CreateTaskBatchDto): Promise<Task[]> {
    return this.tasksRepository.createTasks(createTaskDto);
  }
  deleteTaskById(id: string, user: User): Promise<void> {
    return this.tasksRepository.deleteTaskById(id, user);
  }
  updateTaskById(
    id: string,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<void> {
    return this.tasksRepository.updateTaskById(id, updateTaskDto, user);
  }
  // updateStatusById(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
