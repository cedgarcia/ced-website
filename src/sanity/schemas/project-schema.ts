import { defineType, defineField } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'media',
      title: 'Media',
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
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
      description: 'This will be used in the URL: /projects/your-slug',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      group: 'content',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
      description: 'Brief description for project cards and previews',
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
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
                        scheme: ['http', 'https', 'mailto'],
                      }),
                  },
                  {
                    title: 'Open in new tab',
                    name: 'blank',
                    type: 'boolean',
                    initialValue: true,
                  },
                ],
              },
            ],
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
      description: 'Detailed project description with rich text and images',
    }),
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      group: 'media',
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
      ],
      validation: (Rule) => Rule.required(),
      description: 'Main project image for cards and hero sections',
    }),
    defineField({
      name: 'imageGallery',
      title: 'Image Gallery',
      type: 'array',
      group: 'media',
      of: [
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
      description: 'Additional project screenshots and images',
    }),
    defineField({
      name: 'url',
      title: 'Project URL',
      type: 'url',
      group: 'settings',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
      description: 'Live project URL or demo link',
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      group: 'settings',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description:
        'Technologies used in this project (e.g., React, Node.js, MongoDB)',
    }),
    defineField({
      name: 'status',
      title: 'Project Status',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          { title: 'In Progress', value: 'in-progress' },
          { title: 'Completed', value: 'completed' },
          { title: 'On Hold', value: 'on-hold' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      initialValue: 'completed',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      group: 'settings',
      initialValue: false,
      description: 'Show this project in featured sections',
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
      subtitle: 'shortDescription',
      status: 'status',
      featured: 'featured',
    },
  },
  orderings: [
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: '_createdAt', direction: 'desc' },
      ],
    },
    {
      title: 'Created Date, New',
      name: 'createdDateDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
});
