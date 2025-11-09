"use client";

import { BlogPost } from "@/types/blog";

interface StructuredDataProps {
  post?: BlogPost;
  type?: "blog" | "website";
}

export default function StructuredData({
  post,
  type = "website",
}: StructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://your-domain.com";

  const getWebsiteStructuredData = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Rahul Panchal - Portfolio",
    description:
      "Full Stack Developer specializing in React, Next.js, and MERN stack applications",
    url: baseUrl,
    author: {
      "@type": "Person",
      name: "Rahul Panchal",
      jobTitle: "Full Stack Developer",
      url: baseUrl,
      sameAs: [
        "https://in.linkedin.com/in/rahul-panchal-05610824a",
        "https://github.com/rahulpanchal0106",
        "https://www.instagram.com/rahulpanchal_._/",
      ],
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/blog?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  });

  const getBlogStructuredData = () => ({
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Rahul Panchal's Blog",
    description:
      "Thoughts on web development, technology, and software engineering",
    url: `${baseUrl}/blog`,
    author: {
      "@type": "Person",
      name: "Rahul Panchal",
      jobTitle: "Full Stack Developer",
      url: baseUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Rahul Panchal",
      url: baseUrl,
    },
  });

  const getArticleStructuredData = () => {
    if (!post) return null;

    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      image: post.featuredImage ? `${baseUrl}${post.featuredImage}` : undefined,
      author: {
        "@type": "Person",
        name: post.author,
        url: baseUrl,
      },
      publisher: {
        "@type": "Person",
        name: "Rahul Panchal",
        url: baseUrl,
      },
      datePublished: post.publishedAt?.toISOString(),
      dateModified: post.updatedAt.toISOString(),
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${baseUrl}/blog/${post.slug}`,
      },
      url: `${baseUrl}/blog/${post.slug}`,
      keywords: post.tags.join(", "),
      wordCount: post.content.split(/\s+/).length,
      timeRequired: `PT${post.readTime}M`,
      articleSection: "Technology",
      inLanguage: "en-US",
    };
  };

  const getBreadcrumbStructuredData = () => {
    if (!post) return null;

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: baseUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${baseUrl}/blog`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: `${baseUrl}/blog/${post.slug}`,
        },
      ],
    };
  };

  const structuredData = [];

  if (type === "website") {
    structuredData.push(getWebsiteStructuredData());
  } else if (type === "blog") {
    structuredData.push(getBlogStructuredData());
  }

  if (post) {
    const articleData = getArticleStructuredData();
    const breadcrumbData = getBreadcrumbStructuredData();

    if (articleData) structuredData.push(articleData);
    if (breadcrumbData) structuredData.push(breadcrumbData);
  }

  return (
    <>
      {structuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}


