import { PortableTextComponents } from '@portabletext/react';
import Image from 'next/image';

// Custom components for PortableText rendering
export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?.url) return null;

      return (
        <div className="my-8">
          <div className="relative h-64 w-full overflow-hidden rounded-lg md:h-96">
            <Image
              src={value.asset.url}
              alt={value.alt || 'Blog image'}
              fill
              className="object-cover"
            />
          </div>
          {value.alt && (
            <p className="mt-2 text-center text-sm text-gray-600 italic">
              {value.alt}
            </p>
          )}
        </div>
      );
    },

    codeBlock: ({ value }) => {
      if (!value?.code) return null;

      return (
        <div className="my-6">
          {value.filename && (
            <div className="rounded-t-lg bg-gray-800 px-4 py-2 font-mono text-sm text-gray-200">
              {value.filename}
            </div>
          )}
          <pre
            className={`overflow-x-auto bg-gray-900 p-4 text-gray-100 ${
              value.filename ? 'rounded-b-lg' : 'rounded-lg'
            }`}
          >
            <code className={`language-${value.language || 'text'}`}>
              {value.code}
            </code>
          </pre>
          {value.language && (
            <div className="mt-1 text-right text-xs text-gray-500">
              {value.language}
            </div>
          )}
        </div>
      );
    },
  },

  block: {
    h1: ({ children }) => (
      <h1 className="mt-8 mb-4 text-3xl font-bold">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-6 mb-3 text-2xl font-semibold">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-5 mb-2 text-xl font-medium">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-4 mb-2 text-lg font-medium">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-blue-500 pl-4 text-gray-700 italic">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-inside list-disc space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-inside list-decimal space-y-2">{children}</ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => <li className="ml-4">{children}</li>,
    number: ({ children }) => <li className="ml-4">{children}</li>,
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-800">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={
          value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined
        }
        className="text-blue-600 underline hover:text-blue-800"
      >
        {children}
      </a>
    ),
  },
};
