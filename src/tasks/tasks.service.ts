import { Injectable, NotFoundException } from '@nestjs/common';

import { TasksRepository } from './task.respository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.model.entity';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository) private tasksRepository: TasksRepository,
  ) {}
  // private tasks: Task[] = [];
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTask(getTaskDto: GetTaskDto): Task[] {
  //   let tasks = this.getAllTasks();
  //   const { status, search } = getTaskDto;
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   return tasks;
  // }
  async getTaskById(id: string): Promise<Task> {
    let found;
    if (id) {
      found = await this.tasksRepository.findOne(id);
      if (!found) {
        throw new NotFoundException(`Task id: ${id} not found`);
      }
    } else {
      found = await this.tasksRepository.find();
    }

    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }
  deleteTaskById(id: string): Promise<void> {
    return this.tasksRepository.deleteTaskById(id);
  }
  updateTaskById(id: string, updateTaskDto: UpdateTaskDto): Promise<void> {
    return this.tasksRepository.updateTaskById(id, updateTaskDto);
  }
  // updateStatusById(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
