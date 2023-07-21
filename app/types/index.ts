import { type } from "os";

export interface Author {
  email: string;
  name: string;
  avatar: string;
  id: string;
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
