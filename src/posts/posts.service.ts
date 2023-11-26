import { Injectable, NotFoundException } from '@nestjs/common';
export interface PostModel {
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
@Injectable()
export class PostsService {
  getAllPosts() {
    return posts;
  }

  getPostById(id: number) {
    const post = posts.find((result) => result.id === +id);
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }
  createPost(name: string, age: number, address: string) {
    const post: PostModel = {
      id: posts[posts.length - 1].id + 1,
      name,
      age,
      address,
    };
    posts = [...posts, post];
    return post;
  }

  updatePost(postId: number, name: string, age: number, address: string) {
    const post = posts.find((result) => result.id === postId);
    if (!post) {
      throw new NotFoundException();
    }
    if (name) {
      post.name = name;
    }
    if (age) {
      post.age = age;
    }
    if (address) {
      post.address = address;
    }

    posts = posts.map((prevPost) => (prevPost.id === postId ? post : prevPost));
    return post;
  }

  deletePost(postId: string) {
    const post = posts.find((post) => post.id === +postId);
    if (!post) {
      throw new NotFoundException();
    }
    posts = posts.filter((post) => post.id !== +postId);

    return postId;
  }
}
