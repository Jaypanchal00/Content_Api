"use client";

import { useState } from "react";
import { BlogPost } from "@/types/blog";

interface BlogListProps {
  blogs: BlogPost[];
  adminKey: string;
  onEdit: (post: BlogPost) => void;
  onRefresh: () => void;
}

export default function BlogList({
  blogs,
  adminKey,
  onEdit,
  onRefresh,
}: BlogListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (post: BlogPost) => {
    if (!confirm(`Are you sure you want to delete "${post.title}"?`)) {
      return;
    }

    setDeletingId(post._id!);

    try {
      const response = await fetch(`/api/blogs/${post.slug}`, {
        method: "DELETE",
        headers: {
          "x-admin-key": adminKey,
        },
      });

      if (response.ok) {
        onRefresh();
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to delete blog post");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleTogglePublish = async (post: BlogPost) => {
    try {
      const response = await fetch(`/api/blogs/${post.slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({
          published: !post.published,
        }),
      });

      if (response.ok) {
        onRefresh();
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to update blog post");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    }
  };

  if (blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          No blog posts
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by creating a new blog post.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {blogs.map((post) => (
          <li key={post._id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {post.title}
                    </h3>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        post.published
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                    <span>By {post.author}</span>
                    <span>•</span>
                    <span>{post.readTime} min read</span>
                    <span>•</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    {post.publishedAt && (
                      <>
                        <span>•</span>
                        <span>
                          Published{" "}
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </span>
                      </>
                    )}
                  </div>
                  {post.excerpt && (
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                  {post.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          +{post.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleTogglePublish(post)}
                    className={`px-3 py-1 text-xs font-medium rounded-md ${
                      post.published
                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                        : "bg-green-100 text-green-800 hover:bg-green-200"
                    }`}
                  >
                    {post.published ? "Unpublish" : "Publish"}
                  </button>
                  <button
                    onClick={() => onEdit(post)}
                    className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post)}
                    disabled={deletingId === post._id}
                    className="px-3 py-1 text-xs font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200 disabled:opacity-50"
                  >
                    {deletingId === post._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

