import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskDto } from './dto/get-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTask(getTaskDto: GetTaskDto): Task[] {
    let tasks = this.getAllTasks();
    const { status, search } = getTaskDto;

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => (task.id = id));
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);

    return task;
  }

  deleteTaskById(id: string): void {
    const idx = this.tasks.map((task) => task.id).indexOf(id);
    this.tasks.splice(idx, 1);
  }

  updateTaskById(id: string, updateTaskDto: UpdateTaskDto): void {
    const { title, description, status } = updateTaskDto;

    this.tasks.map((task) => {
      if (task.id === id) {
        task.title = title;
        task.description = description;
        task.status = TaskStatus[status];
      }
    });
  }
  updateStatusById(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;

    return task;
  }
}
