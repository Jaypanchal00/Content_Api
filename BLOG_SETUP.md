# Blog Setup Instructions

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/portfolio

# Admin Key for blog management (set a strong secret key)
ADMIN_KEY=your-secret-admin-key-here

# Base URL for your site (used for SEO and sitemap)
NEXT_PUBLIC_BASE_URL=https://your-domain.com

# Google Site Verification (optional)
GOOGLE_SITE_VERIFICATION=your-google-verification-code
```

## Features

### Admin Interface

- Access at `/admin/blogs`
- Protected with admin key authentication
- Create, edit, delete, and publish/unpublish blog posts
- Image upload functionality
- SEO optimization fields

### Public Blog

- Access at `/blog`
- Responsive design with filters and search
- SEO optimized with structured data
- Pagination support
- Related posts functionality

### SEO Features

- Dynamic sitemap generation
- Robots.txt configuration
- Structured data (JSON-LD)
- Open Graph and Twitter Card support
- Meta tags optimization

## Usage

1. Set up your environment variables
2. Start your development server: `npm run dev`
3. Access admin panel at `/admin/blogs`
4. Create your first blog post
5. Publish and view at `/blog`

## Database Schema

The blog posts are stored in MongoDB with the following structure:

```typescript
interface BlogPost {
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
  readTime: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}
```

## API Endpoints

- `GET /api/blogs` - Get published blog posts with pagination and filters
- `POST /api/blogs` - Create new blog post (admin only)
- `GET /api/blogs/[slug]` - Get specific blog post
- `PUT /api/blogs/[slug]` - Update blog post (admin only)
- `DELETE /api/blogs/[slug]` - Delete blog post (admin only)
- `GET /api/blogs/tags` - Get all unique tags
- `POST /api/upload` - Upload images (admin only)


