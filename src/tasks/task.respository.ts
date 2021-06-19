import { Repository, EntityRepository } from 'typeorm';
import { Task } from './task.model.entity';
@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {}
