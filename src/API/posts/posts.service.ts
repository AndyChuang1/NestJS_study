import { Injectable, Logger } from '@nestjs/common';
import { AxiosService } from 'src/axios/axios.service';
import { PostsModel } from './model/posts.model';

@Injectable()
export class PostsService {
  constructor(private axios: AxiosService) {}
  private logger = new Logger('Posts');
  async createPost(payload: PostsModel): Promise<PostsModel> {
    try {
      const response = await this.axios.post('/posts', payload);
      this.logger.log(response.data);
      return response.data;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
