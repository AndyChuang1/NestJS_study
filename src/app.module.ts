import { Module } from '@nestjs/common';

import { TasksModule } from './tasks/tasks.module';
import { AxiosModule } from './axios/axios.module';

@Module({
  imports: [TasksModule, AxiosModule],
})
export class AppModule {}
