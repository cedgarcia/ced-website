/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from 'next/navigation';
import { getBlogBySlug } from '@/src/sanity/lib/fetch';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Components for rendering portable text content
const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="my-8">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src={value.url || value.asset?.url || ''}
            alt={value.alt || ''}
            fill
            className="object-cover"
          />
        </div>
        {value.caption && (
          <p className="mt-2 text-center text-sm text-gray-600">
            {value.caption}
          </p>
        )}
      </div>
    ),
    codeBlock: ({ value }: any) => (
      <div className="my-8">
        {value.filename && (
          <div className="rounded-t-lg bg-gray-800 px-4 py-2 text-sm text-gray-300">
            {value.filename}
          </div>
        )}
        <pre className="overflow-x-auto rounded-b-lg bg-gray-900 p-4">
          <code
            className={`language-${value.language || 'text'} text-sm text-gray-100`}
          >
            {value.code}
          </code>
        </pre>
      </div>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="mt-8 mb-6 text-3xl font-bold">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="mt-6 mb-4 text-2xl font-semibold">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mt-5 mb-3 text-xl font-medium">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="mt-4 mb-2 text-lg font-medium">{children}</h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="my-6 border-l-4 border-blue-500 bg-blue-50 p-4 italic">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        target={value.blank ? '_blank' : '_self'}
        rel={value.blank ? 'noopener noreferrer' : undefined}
        className="text-blue-600 underline hover:text-blue-800"
      >
        {children}
      </a>
    ),
    strong: ({ children }: any) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm">
        {children}
      </code>
    ),
    underline: ({ children }: any) => <u className="underline">{children}</u>,
    'strike-through': ({ children }: any) => (
      <s className="line-through">{children}</s>
    ),
  },
};

// Function to format date
const formatDate = (dateString: string | undefined) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Function to generate table of contents
const generateTableOfContents = (content: any[]) => {
  if (!content) return [];

  const headings: Array<{ id: string; text: string; level: number }> = [];

  content.forEach((block, index) => {
    if (block._type === 'block' && ['h1', 'h2', 'h3'].includes(block.style)) {
      const text =
        block.children?.map((child: any) => child.text).join('') || '';

      if (text) {
        headings.push({
          id: `heading-${index}`,
          text,
          level: parseInt(block.style.replace('h', '')),
        });
      }
    }
  });

  return headings;
};

export default async function BlogPage({ params }: BlogPageProps) {
  // Await the params Promise
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const tableOfContents = blog.enableTableOfContents
    ? generateTableOfContents(blog.content || [])
    : [];

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">{'>'}</span>
          <Link href="/blogs" className="hover:text-blue-600">
            Blog
          </Link>
          <span className="mx-2">{'>'}</span>
          <span className="text-gray-900">{blog.title}</span>
        </nav>

        {/* Hero Section */}
        <div className="mb-12">
          <div className="mb-4 flex flex-wrap items-center gap-4">
            {blog.category && (
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                {blog.category.title}
              </span>
            )}
            <span className="text-sm text-gray-500">
              {blog.readTime} min read
            </span>
            {blog.publishedDate && (
              <span className="text-sm text-gray-500">
                {formatDate(blog.publishedDate)}
              </span>
            )}
          </div>

          <h1 className="mb-6 text-4xl font-bold text-gray-900">
            {blog.title}
          </h1>

          {/* Author Info */}
          {blog.author && (
            <div className="mb-6 flex items-center">
              {blog.author.image && (
                <div className="relative mr-4 h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={blog.author.image}
                    alt={blog.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <p className="font-medium text-gray-900">{blog.author.name}</p>
                {blog.author.description && (
                  <p className="text-sm text-gray-600">
                    {blog.author.description}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Featured Image */}
        {blog.image && (
          <div className="mb-12">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          {/* Table of Contents Sidebar */}
          {tableOfContents.length > 0 && (
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="rounded-lg bg-gray-50 p-6">
                  <h3 className="mb-4 text-lg font-semibold">
                    Table of Contents
                  </h3>
                  <nav>
                    <ul className="space-y-2">
                      {tableOfContents.map((heading) => (
                        <li
                          key={heading.id}
                          className={`text-sm ${
                            heading.level === 1
                              ? 'font-medium'
                              : heading.level === 2
                                ? 'ml-3'
                                : 'ml-6'
                          }`}
                        >
                          <a
                            href={`#${heading.id}`}
                            className="text-gray-600 hover:text-blue-600"
                          >
                            {heading.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div
            className={
              tableOfContents.length > 0 ? 'lg:col-span-2' : 'lg:col-span-3'
            }
          >
            <div className="prose prose-lg max-w-none">
              {blog.content && (
                <PortableText
                  value={blog.content}
                  components={portableTextComponents}
                />
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Category */}
              {blog.category && (
                <div className="rounded-lg bg-gray-50 p-6">
                  <h3 className="mb-3 text-lg font-semibold">Category</h3>
                  <Link
                    href={`/blogs/category/${blog.category.slug}`}
                    className="inline-block rounded bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 hover:bg-blue-200"
                  >
                    {blog.category.title}
                  </Link>
                </div>
              )}

              {/* Back to Blog */}
              <div className="rounded-lg bg-gray-50 p-6">
                <Link
                  href="/blogs"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back to Blog
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {blog.relatedPosts && blog.relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-8 text-2xl font-bold">Related Posts</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blog.relatedPosts.map((relatedPost) => (
                <article
                  key={relatedPost._id}
                  className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
                >
                  {relatedPost.image && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="mb-3 flex items-center justify-between">
                      {relatedPost.category && (
                        <span className="rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          {relatedPost.category.title}
                        </span>
                      )}
                      <span className="text-sm text-gray-500">
                        {relatedPost.readTime} min read
                      </span>
                    </div>
                    <h3 className="mb-3 text-lg font-semibold">
                      <Link
                        href={`/blogs/${relatedPost.slug}`}
                        className="transition-colors hover:text-blue-600"
                      >
                        {relatedPost.title}
                      </Link>
                    </h3>
                    {relatedPost.author && (
                      <div className="mb-4 flex items-center">
                        {relatedPost.author.image && (
                          <div className="relative mr-3 h-8 w-8 overflow-hidden rounded-full">
                            <Image
                              src={relatedPost.author.image}
                              alt={relatedPost.author.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <p className="text-sm font-medium">
                          {relatedPost.author.name}
                        </p>
                      </div>
                    )}
                    <Link
                      href={`/blogs/${relatedPost.slug}`}
                      className="inline-block rounded bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-600"
                    >
                      Read More
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
