import { Injectable, NotFoundException } from '@nestjs/common';

import { TasksRepository } from './task.respository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.model.entity';

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
    const found = await this.tasksRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task id: ${id} not found`);
    }
    return found;
  }
  // getTaskById(id: string): Task {
  //   const task = this.tasks.find((task) => (task.id = id));
  //   if (!task) {
  //     throw new NotFoundException(`Task id: ${id} not found`);
  //   }
  //   return task;
  // }

  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // deleteTaskById(id: string): void {
  //   this.getTaskById(id);
  //   const idx = this.tasks.map((task) => task.id).indexOf(id);
  //   this.tasks.splice(idx, 1);
  // }
  // updateTaskById(id: string, updateTaskDto: UpdateTaskDto): void {
  //   const { title, description, status } = updateTaskDto;
  //   this.tasks.map((task) => {
  //     if (task.id === id) {
  //       task.title = title;
  //       task.description = description;
  //       task.status = TaskStatus[status];
  //     }
  //   });
  // }
  // updateStatusById(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
