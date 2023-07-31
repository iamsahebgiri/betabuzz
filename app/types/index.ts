export interface User {
  interests: any[];
  plan: string;
  email: string;
  name: string;
  avatar: string;
  socials: any[];
  username: string;
  id: string;
}

export interface UserProfile {
  interests: string[];
  plan: string;
  email: string;
  name: string;
  avatar: string;
  socials: any[];
  username: string;
  bio: string;
  gender: string;
  language: string;
  id: string;
}

export interface Comment {
  id: string;
  content: string;
  upvotesCount: number;
  upvoted: boolean;
  product: string;
  parent: string | null;
  author: User;
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
  maker: User;
  createdAt: string;
  updatedAt: string;
}
