import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  getPost(@Param('id') id: string) {
    return this.postsService.getPostById(+id);
  }

  @Post()
  postPost(
    @Body('name') name: string,
    @Body('age') age: number,
    @Body('address') address: string,
  ) {
    return this.postsService.createPost(name, age, address);
  }

  @Put(':id')
  putPost(
    @Param('id') id: string,
    @Body('name') name?: string,
    @Body('age') age?: number,
    @Body('address') address?: string,
  ) {
    return this.postsService.updatePost(+id, name, age, address);
  }

  // Delete
  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(id);
  }
}
