"use client";

import { useState } from "react";
import BlogList from "./BlogList";
import BlogFilters from "./BlogFilters";

export default function BlogPageContent() {
  const [filters, setFilters] = useState<{ tag?: string; search?: string }>({});

  const handleFilterChange = (newFilters: {
    tag?: string;
    search?: string;
  }) => {
    setFilters(newFilters);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        <BlogFilters onFilterChange={handleFilterChange} />
      </div>
      <div className="lg:col-span-3">
        <BlogList filters={filters} />
      </div>
    </div>
  );
}
