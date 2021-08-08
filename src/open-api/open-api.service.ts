import { Injectable } from '@nestjs/common';
import { PostsModel } from 'src/API/posts/model/posts.model';
import { PostsService } from 'src/API/posts/posts.service';
import { CreateOpenApiDto } from './dto/create-open-api.dto';
import { OpenApiRes } from './entities/open-api.entity';

@Injectable()
export class OpenApiService {
  constructor(private postsService: PostsService) {}
  async create(createOpenApiDto: CreateOpenApiDto): Promise<PostsModel> {
    const payLoad = new PostsModel();
    payLoad.userId = createOpenApiDto.userId;
    payLoad.title = createOpenApiDto.title;
    payLoad.body = createOpenApiDto.body;
    return await this.postsService.createPost(payLoad);
  }

  findAll() {
    return `This action returns all openApi`;
  }
}
