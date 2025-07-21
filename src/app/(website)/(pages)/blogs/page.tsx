import React from 'react';
import { getBlogs } from '@/src/sanity/lib/fetch';
import Link from 'next/link';
import Image from 'next/image';

export default async function Blogs() {
  const blogs = await getBlogs();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Blog Posts</h1>

      {blogs.length === 0 ? (
        <p className="text-gray-600">No blog posts found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <article
              key={blog._id}
              className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
            >
              {blog.image && (
                <div className="relative h-48 w-full">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="p-6">
                <div className="mb-3 flex items-center justify-between">
                  {blog.category && (
                    <span className="rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      {blog.category.title}
                    </span>
                  )}
                  <span className="text-sm text-gray-500">
                    {blog.readTime} min read
                  </span>
                </div>

                <h2 className="mb-3 text-xl font-semibold">
                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="transition-colors hover:text-blue-600"
                  >
                    {blog.title}
                  </Link>
                </h2>

                {blog.author && (
                  <div className="mb-4 flex items-center">
                    {blog.author.image && (
                      <div className="relative mr-3 h-8 w-8 overflow-hidden rounded-full">
                        <Image
                          src={blog.author.image}
                          alt={blog.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium">{blog.author.name}</p>
                      {blog.author.description && (
                        <p className="text-xs text-gray-500">
                          {blog.author.description}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <Link
                  href={`/blogs/${blog.slug}`}
                  className="inline-block rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
                >
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
