import { Module } from '@nestjs/common';
import { AxiosModule } from 'src/axios/axios.module';
import { PostsService } from './posts.service';

@Module({
  providers: [PostsService],
  imports: [
    AxiosModule.register({ baseURL: 'https://jsonplaceholder.typicode.com/' }),
  ],
  exports: [PostsService],
})
export class PostsModule {}
