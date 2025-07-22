/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/src/sanity/lib/fetch';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';

interface ProjectPageProps {
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
            src={value.asset?.url || ''}
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
  },
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  // Await the params Promise
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">{'>'}</span>
          <Link href="/projects" className="hover:text-blue-600">
            Projects
          </Link>
          <span className="mx-2">{'>'}</span>
          <span className="text-gray-900">{project.title}</span>
        </nav>

        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            {project.title}
          </h1>

          <p className="mb-6 text-xl text-gray-600">
            {project.shortDescription}
          </p>

          {/* Project Actions */}
          <div className="flex flex-wrap gap-4">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
              >
                View Live Project
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Featured Image */}
        {project.image && (
          <div className="mb-12">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none">
              <PortableText
                value={project.overview}
                components={portableTextComponents}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Project URL */}
              {project.url && (
                <div className="rounded-lg bg-gray-50 p-6">
                  <h3 className="mb-3 text-lg font-semibold">Project Link</h3>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    View Live Site
                    <svg
                      className="ml-1 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              )}

              {/* Back to Projects */}
              <div className="rounded-lg bg-gray-50 p-6">
                <Link
                  href="/projects"
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
                  Back to Projects
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        {project.imageGallery && project.imageGallery.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-8 text-2xl font-bold">Project Gallery</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {project.imageGallery.map((image, index) => (
                <div
                  key={index}
                  className="group relative aspect-video overflow-hidden rounded-lg shadow-md"
                >
                  <Image
                    src={image.url}
                    alt={image.alt || `Project image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {image.caption && (
                    <div className="bg-opacity-70 absolute right-0 bottom-0 left-0 bg-black p-3 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <p className="text-sm">{image.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
