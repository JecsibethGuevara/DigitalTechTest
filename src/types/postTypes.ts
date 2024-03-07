export interface Post {
    image?: string;
    text?: string;
    likes?: Post[];
    author?: string;
    createdAt?: string;
    status?: string;
  }