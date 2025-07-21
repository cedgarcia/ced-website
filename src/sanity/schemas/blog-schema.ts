import { defineType, defineField } from 'sanity';

export const blogAuthor = defineType({
  name: 'blogAuthor',
  title: 'Blog Authors',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      subtitle: 'description',
    },
  },
});

export const blogCategory = defineType({
  name: 'blogCategory',
  title: 'Blog Categories',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(50),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
});

export const blog = defineType({
  name: 'blog',
  title: 'Blog Posts',
  type: 'document',
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'settings',
      title: 'Settings',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time (minutes)',
      type: 'number',
      group: 'settings',
      validation: (Rule) => Rule.required().min(1).max(60),
    }),
    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'datetime',
      group: 'settings',
      options: {
        dateFormat: 'MMMM D, YYYY',
        timeFormat: 'h:mm A',
        timeStep: 15,
      },
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      group: 'settings',
      to: [{ type: 'blogAuthor' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      group: 'settings',
      to: [{ type: 'blogCategory' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Underline', value: 'underline' },
              { title: 'Strike', value: 'strike-through' },
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                  {
                    title: 'Open in new tab',
                    name: 'blank',
                    type: 'boolean',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'object',
          name: 'codeBlock',
          title: 'Code Block',
          fields: [
            {
              name: 'code',
              title: 'Code',
              type: 'text',
              rows: 10,
              validation: (Rule) => Rule.required(),
              options: {
                language: 'javascript',
              },
            },
            {
              name: 'language',
              title: 'Language',
              type: 'string',
              options: {
                list: [
                  { title: 'JavaScript', value: 'javascript' },
                  { title: 'TypeScript', value: 'typescript' },
                  { title: 'Python', value: 'python' },
                  { title: 'HTML', value: 'html' },
                  { title: 'CSS', value: 'css' },
                  { title: 'JSON', value: 'json' },
                  { title: 'Bash', value: 'bash' },
                  { title: 'SQL', value: 'sql' },
                  { title: 'PHP', value: 'php' },
                  { title: 'Java', value: 'java' },
                  { title: 'C++', value: 'cpp' },
                  { title: 'Go', value: 'go' },
                  { title: 'Rust', value: 'rust' },
                  { title: 'Swift', value: 'swift' },
                  { title: 'Kotlin', value: 'kotlin' },
                  { title: 'Dart', value: 'dart' },
                  { title: 'Other', value: 'text' },
                ],
              },
              initialValue: 'javascript',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'filename',
              title: 'Filename (optional)',
              type: 'string',
              description: 'e.g., index.js, component.tsx',
            },
            {
              name: 'highlightLines',
              title: 'Highlight Lines (optional)',
              type: 'string',
              description: 'e.g., 1,3-5,10 (line numbers to highlight)',
            },
          ],
          preview: {
            select: {
              code: 'code',
              language: 'language',
              filename: 'filename',
            },
            prepare({ code, language, filename }) {
              return {
                title: filename || `${language} code block`,
                subtitle: code
                  ? code.slice(0, 100) + '...'
                  : 'Empty code block',
              };
            },
          },
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'enableTableOfContents',
      title: 'Enable Table of Contents',
      type: 'boolean',
      group: 'settings',
      initialValue: false,
      description: 'Show table of contents based on headings (H1, H2, H3)',
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      group: 'settings',
      of: [
        {
          type: 'reference',
          to: [{ type: 'blog' }],
        },
      ],
      validation: (Rule) => Rule.max(3),
      description: 'Select up to 3 related blog posts',
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      group: 'seo',
      validation: (Rule) => Rule.max(60),
      description: 'SEO title (max 60 characters)',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      group: 'seo',
      rows: 2,
      validation: (Rule) => Rule.max(160),
      description: 'SEO description (max 160 characters)',
    }),
    defineField({
      name: 'metaKeywords',
      title: 'Meta Keywords',
      type: 'string',
      group: 'seo',
      description: 'Comma-separated keywords for SEO',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      author: 'author.name',
      date: 'publishedDate',
      category: 'category.title',
    },
    prepare({ title, media, author, date, category }) {
      const formattedDate = date
        ? new Date(date).toLocaleDateString()
        : 'No date';
      return {
        title,
        media,
        subtitle: `${author} • ${category} • ${formattedDate}`,
      };
    },
  },
  orderings: [
    {
      title: 'Created Date, New',
      name: 'createdDateDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
    {
      title: 'Created Date, Old',
      name: 'createdDateAsc',
      by: [{ field: '_createdAt', direction: 'asc' }],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
});
