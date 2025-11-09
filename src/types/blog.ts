export interface BlogPost {
  _id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  images?: string[];
  tags: string[];
  published: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  author: string;
  readTime: number; // in minutes
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

export interface BlogPostInput {
  title: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  images?: string[];
  tags: string[];
  published: boolean;
  author: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

export interface BlogListResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

