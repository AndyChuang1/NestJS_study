import { CacheModule, Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { AxiosModule } from 'src/axios/axios.module';
import { Translator } from './translator/translator';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    AxiosModule.register({ baseURL: 'https://jsonplaceholder.typicode.com/' }),
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
      password: '123456',
      ttl: 1000,
      prefix: 'cache:',
    }),
  ],
  controllers: [TasksController],
  providers: [TasksService, Translator],
})
export class TasksModule {}
