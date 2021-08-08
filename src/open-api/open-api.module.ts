import { Module } from '@nestjs/common';
import { OpenApiService } from './open-api.service';
import { OpenApiController } from './open-api.controller';
import { PostsModule } from 'src/API/posts/posts.module';

@Module({
  controllers: [OpenApiController],
  providers: [OpenApiService],
  imports: [PostsModule],
})
export class OpenApiModule {}
