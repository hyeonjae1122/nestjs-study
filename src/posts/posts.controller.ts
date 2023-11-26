import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { PostsService } from './posts.service';

interface PostModel {
  id: number;
  name: string;
  age: number;
  address: string;
}

const posts: PostModel[] = [
  {
    id: 1,
    name: 'lee',
    age: 26,
    address: 'kanagawa',
  },
  {
    id: 2,
    name: 'ishida',
    age: 25,
    address: 'miyagi',
  },
];

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // GET /posts/:id
  @Get(':id')
  getPost(@Param('id') id: string) {
    const post = posts.find((result) => result.id === +id);
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }
}
