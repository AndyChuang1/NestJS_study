import {
  Injectable,
  NotFoundException,
  Logger,
  Inject,
  CACHE_MANAGER,
} from '@nestjs/common';
import { Task, TaskStatus } from './entity/task.model.entity';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { AxiosService } from 'src/axios/axios.service';
import { OpenAPI } from './entity/openAPI.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class TasksService {
  constructor(
    private axios: AxiosService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  private tasks: Task[] = [];
  private logger = new Logger('Task');

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
    const task = this.tasks.find((task) => (task.id = id));

    if (!task) {
      throw new NotFoundException(`Task id: ${id} not found`);
    }
    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.cacheManager.store
      .set('key', 'value')
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });

    this.cacheManager
      .get('key')
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });

    this.tasks.push(task);

    return task;
  }

  deleteTaskById(id: string): void {
    this.getTaskById(id);
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

  async getOpenAPI(): Promise<OpenAPI> {
    try {
      const response = await this.axios.get('/todos/1');
      this.logger.log(response.data);
      return response.data;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
