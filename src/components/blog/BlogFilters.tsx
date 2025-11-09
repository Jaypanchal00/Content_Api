"use client";

import { useState, useEffect } from "react";

interface BlogFiltersProps {
  onFilterChange?: (filters: { tag?: string; search?: string }) => void;
}

export default function BlogFilters({ onFilterChange }: BlogFiltersProps) {
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await fetch("/api/blogs/tags?published=true");
      if (response.ok) {
        const data = await response.json();
        setTags(data.tags);
      }
    } catch (error) {
      console.error("Error fetching tags:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTagChange = (tag: string) => {
    const newTag = tag === selectedTag ? "" : tag;
    setSelectedTag(newTag);
    onFilterChange?.({ tag: newTag, search: searchQuery });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    onFilterChange?.({ tag: selectedTag, search: query });
  };

  const clearFilters = () => {
    setSelectedTag("");
    setSearchQuery("");
    onFilterChange?.({});
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>

      {/* Search */}
      <div className="mb-6">
        <label
          htmlFor="search"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Search
        </label>
        <input
          type="text"
          id="search"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search blog posts..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Tags */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tags
        </label>
        {loading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="h-8 bg-gray-200 rounded animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagChange(tag)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
                  selectedTag === tag
                    ? "bg-blue-100 text-blue-800 border border-blue-200"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Clear Filters */}
      {(selectedTag || searchQuery) && (
        <button
          onClick={clearFilters}
          className="w-full px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200"
        >
          Clear Filters
        </button>
      )}

      {/* Recent Posts */}
      <div className="mt-8">
        <h4 className="text-md font-medium text-gray-900 mb-3">Recent Posts</h4>
        <div className="space-y-3">
          {/* This would typically fetch and display recent posts */}
          <div className="text-sm text-gray-500">
            <p>Recent posts will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
}

