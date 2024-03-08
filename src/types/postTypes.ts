export interface Post {
    id: string;
    image?: string;
    text?: string;
    likes?: Post[];
    author?: string;
    createdAt?: string;
    status?: string;
  }

