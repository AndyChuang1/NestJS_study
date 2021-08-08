import { TasksModule } from './tasks/tasks.module';
import { AxiosModule } from './axios/axios.module';
import { Module } from '@nestjs/common';
import { PostsModule } from './API/posts/posts.module';
import { OpenApiModule } from './open-api/open-api.module';

@Module({
  imports: [TasksModule, AxiosModule, PostsModule, OpenApiModule],
  providers: [],
})
export class AppModule {}
