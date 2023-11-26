import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';

interface PostModel {
  id: number;
  name: string;
  age: number;
  address: string;
}

let posts: PostModel[] = [
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

  // POST
  @Post()
  postPost(
    @Body('name') name: string,
    @Body('age') age: number,
    @Body('address') address: string,
  ) {
    const post: PostModel = {
      id: posts[posts.length - 1].id + 1,
      name,
      age,
      address,
    };
    posts = [...posts, post];
    return post;
  }
}
