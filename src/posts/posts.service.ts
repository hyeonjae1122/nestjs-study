import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostsModel } from './entities/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
export interface PostModel {
  id: number;
  name: string;
  age: number;
  address: string;
}

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsModel)
    private readonly postsRepository: Repository<PostsModel>,
  ) {}

  async getAllPosts() {
    return this.postsRepository.find();
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
    });
    // const post = posts.find((result) => result.id === +id);
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }
  async createPost(name: string, age: number, address: string) {
    //1) create -> make object to save
    //2) save -> save obejct
    const post = this.postsRepository.create({
      name,
      age,
      address,
    });
    const newPost = await this.postsRepository.save(post);
    return newPost;
    // const post: PostModel = {
    //   id: posts[posts.length - 1].id + 1,
    //   name,
    //   age,
    //   address,
    // };
    // posts = [...posts, post];
    // return post;
  }

  async updatePost(postId: number, name: string, age: number, address: string) {
    // save function
    // 1) if data is not, make new data by id
    // 2) if data is(if same id value is), id value is updated

    const post = await this.postsRepository.findOne({
      where: {
        id: postId,
      },
    });
    if (name) {
      post.name = name;
    }
    if (age) {
      post.age = age;
    }
    if (address) {
      post.address = address;
    }
    const newPost = await this.postsRepository.save(post);
    return newPost;
  }

  async deletePost(postId: string) {
    const post = await this.postsRepository.findOne({
      where: { id: +postId },
    });

    if (!post) {
      throw new NotFoundException();
    }
    await this.postsRepository.delete(postId);

    return postId;
  }
}
