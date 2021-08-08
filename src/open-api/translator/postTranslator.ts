import { PostsModel } from 'src/API/posts/model/posts.model';
import { PostsResponse } from '../dto/postsResponse.dto';

export function translatrToRes(source: PostsModel): PostsResponse {
  const target = new PostsResponse();

  target.id = source.id;
  target.title = source.title;
  target.userId = source.userId;
  target.body = source.body;

  return target;
}
