"use client";

import Link from "next/link";
import { BlogPost } from "@/types/blog";

interface RelatedPostsProps {
  posts: BlogPost[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Posts</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article
            key={post._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {post.featuredImage && (
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-40 object-cover"
                />
              </div>
            )}

            <div className="p-4">
              <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                <span>
                  {new Date(
                    post.publishedAt || post.createdAt
                  ).toLocaleDateString()}
                </span>
                <span>•</span>
                <span>{post.readTime} min read</span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  {post.title}
                </Link>
              </h3>

              {post.excerpt && (
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {post.excerpt}
                </p>
              )}

              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {post.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <Link
                href={`/blog/${post.slug}`}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
              >
                Read more →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}


