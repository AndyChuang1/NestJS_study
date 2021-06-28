import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { AxiosModule } from 'src/axios/axios.module';

@Module({
  imports: [
    AxiosModule.register({ baseURL: 'https://jsonplaceholder.typicode.com/' }),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
