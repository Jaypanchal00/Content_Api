import { MetadataRoute } from "next";
import { getDatabase } from "@/lib/mongodb";
import { BlogPost } from "@/types/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://rahulpanchal.dev";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  try {
    // Dynamic blog pages
    // const db = await getDatabase();
    // const collection = db.collection<BlogPost>("blogs");
    // const publishedPosts = await collection.find({ published: true }).toArray();

    // const blogPages: MetadataRoute.Sitemap = publishedPosts.map((post) => ({
    //   url: `${baseUrl}/blog/${post.slug}`,
    //   lastModified: post.updatedAt,
    //   changeFrequency: "monthly",
    //   priority: 0.6,
    // }));

    return [...staticPages];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return staticPages;
  }
}


