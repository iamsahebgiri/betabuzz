import { type } from "os";

export interface Author {
  email: string;
  name: string;
  avatar: string;
  id: string;
  username: string;
}

export interface Comment {
  id: string;
  content: string;
  upvotesCount: number;
  upvoted: boolean;
  product: string;
  parent: string | null;
  author: Author;
  createdAt: string;
  updatedAt: string;
}

export type CommentWithChildren = Comment & {
  children: Comment[];
};

export interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  link: string;
  commentsCount: number;
  upvotesCount: number;
  upvoted: boolean;
  maker: Author;
  createdAt: string;
  updatedAt: string;
}
