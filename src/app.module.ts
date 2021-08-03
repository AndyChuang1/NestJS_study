import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';

import { TasksModule } from './tasks/tasks.module';
import { AxiosModule } from './axios/axios.module';

@Module({
  imports: [TasksModule, AxiosModule],
})
export class AppModule {}
