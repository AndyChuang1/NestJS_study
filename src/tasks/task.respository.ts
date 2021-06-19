import { Repository, EntityRepository } from 'typeorm';
import { Task } from './task.model.entity';
import { CreateTaskDto, CreateTaskBatchDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { NotFoundException } from '@nestjs/common';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskDto } from './dto/get-task.dto';
@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async getTasks(getTaskDto: GetTaskDto): Promise<Task[]> {
    const { status, search } = getTaskDto;
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status=:status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE :search OR LOWER(task.description) LIKE :search',
        { search: `${search}%` },
      );
    }

    const tasks = await query.getMany();

    return tasks;
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.save(task);

    return task;
  }
  async createTasks(createTaskDto: CreateTaskBatchDto): Promise<Task[]> {
    const { data } = createTaskDto;

    const insertData = data.map((task) => {
      return this.create({
        title: task.title,
        description: task.description,
        status: TaskStatus.OPEN,
      });
    });

    // const result = await this.manager.insert(Task, insertData);
    await this.save(insertData);

    return insertData;
  }

  async deleteTaskById(id: string): Promise<void> {
    const result = await this.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task id: ${id} not found`);
    }
  }

  async updateTaskById(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<void> {
    const { title, description, status } = updateTaskDto;

    const task = {
      title,
      description,
      status,
    };

    const result = await this.update(id, task);
    if (result.affected === 0) {
      throw new NotFoundException(`Task id: ${id} not found`);
    }
  }
}
