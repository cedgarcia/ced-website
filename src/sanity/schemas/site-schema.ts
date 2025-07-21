import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'GitHub', value: 'github' },
                  { title: 'Twitter/X', value: 'twitter' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'Other', value: 'other' },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'label',
              title: 'Custom Label',
              type: 'string',
              description: 'Custom label for "Other" platform type',
            },
          ],
          preview: {
            select: {
              platform: 'platform',
              url: 'url',
              label: 'label',
            },
            prepare({ platform, url, label }) {
              return {
                title: label || platform,
                subtitle: url,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'resumeFile',
      title: 'Resume/CV File',
      type: 'file',
      options: {
        accept: '.pdf,.doc,.docx',
      },
    }),
    defineField({
      name: 'seoImage',
      title: 'Default SEO Image',
      type: 'image',
      description:
        'Default image for social sharing when no specific image is set',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'logo',
    },
  },
});

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  groups: [
    {
      name: 'hero',
      title: 'Hero Section',
    },
    {
      name: 'about',
      title: 'About Section',
    },
    {
      name: 'cta',
      title: 'Call to Action',
    },
  ],
  fields: [
    // Hero Section
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      group: 'hero',
      rows: 2,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      group: 'hero',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'heroCTAText',
      title: 'Hero CTA Button Text',
      type: 'string',
      group: 'hero',
      initialValue: 'View My Work',
    }),
    defineField({
      name: 'heroCTALink',
      title: 'Hero CTA Link',
      type: 'string',
      group: 'hero',
      description: 'e.g., /projects, #contact, or external URL',
    }),

    // About Section
    defineField({
      name: 'aboutTitle',
      title: 'About Section Title',
      type: 'string',
      group: 'about',
      initialValue: 'About Me',
    }),
    defineField({
      name: 'aboutText',
      title: 'About Text',
      type: 'array',
      group: 'about',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'aboutImage',
      title: 'About Image',
      type: 'image',
      group: 'about',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'skills',
      title: 'Skills/Technologies',
      type: 'array',
      group: 'about',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),

    // Featured Projects/Blogs
    defineField({
      name: 'showFeaturedProjects',
      title: 'Show Featured Projects',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'featuredProjectsTitle',
      title: 'Featured Projects Title',
      type: 'string',
      initialValue: 'Featured Projects',
    }),
    defineField({
      name: 'showLatestBlogs',
      title: 'Show Latest Blog Posts',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'latestBlogsTitle',
      title: 'Latest Blogs Title',
      type: 'string',
      initialValue: 'Latest Blog Posts',
    }),

    // Contact CTA
    defineField({
      name: 'ctaTitle',
      title: 'CTA Section Title',
      type: 'string',
      group: 'cta',
      initialValue: "Let's Work Together",
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'text',
      group: 'cta',
      rows: 2,
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA Button Text',
      type: 'string',
      group: 'cta',
      initialValue: 'Get In Touch',
    }),
    defineField({
      name: 'ctaButtonLink',
      title: 'CTA Button Link',
      type: 'string',
      group: 'cta',
      description: 'e.g., /contact, mailto:you@email.com',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Homepage Content',
      };
    },
  },
});

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'experience',
      title: 'Experience',
    },
    {
      name: 'skills',
      title: 'Skills',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
      initialValue: 'About Me',
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
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
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),

    // Experience Timeline
    defineField({
      name: 'experience',
      title: 'Experience Timeline',
      type: 'array',
      group: 'experience',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Job Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'company',
              title: 'Company',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'companyLogo',
              title: 'Company Logo',
              type: 'image',
              options: {
                hotspot: false,
              },
              fields: [
                {
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  description: 'e.g., "Acme Inc. logo"',
                },
              ],
            },
            {
              name: 'location',
              title: 'Location',
              type: 'string',
            },
            {
              name: 'startDate',
              title: 'Start Date',
              type: 'date',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'endDate',
              title: 'End Date',
              type: 'date',
              description: 'Leave empty if current position',
            },
            {
              name: 'current',
              title: 'Current Position',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            },
            {
              name: 'technologies',
              title: 'Technologies Used',
              type: 'array',
              of: [{ type: 'string' }],
              options: {
                layout: 'tags',
              },
            },
          ],
          preview: {
            select: {
              title: 'title',
              company: 'company',
              startDate: 'startDate',
              current: 'current',
              media: 'companyLogo', // Added media to preview
            },
            prepare({ title, company, startDate, current, media }) {
              return {
                title: `${title} at ${company}`,
                subtitle: `${startDate ? new Date(startDate).getFullYear() : ''} ${current ? '(Current)' : ''}`,
                media, // Show company logo in preview
              };
            },
          },
        },
      ],
    }),

    // Skills
    defineField({
      name: 'skillCategories',
      title: 'Skill Categories',
      type: 'array',
      group: 'skills',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'category',
              title: 'Category Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'skills',
              title: 'Skills',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'name',
                      title: 'Skill Name',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'level',
                      title: 'Proficiency Level',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Beginner', value: 'beginner' },
                          { title: 'Intermediate', value: 'intermediate' },
                          { title: 'Advanced', value: 'advanced' },
                          { title: 'Expert', value: 'expert' },
                        ],
                      },
                    },
                  ],
                  preview: {
                    select: {
                      name: 'name',
                      level: 'level',
                    },
                    prepare({ name, level }) {
                      return {
                        title: name,
                        subtitle: level,
                      };
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              category: 'category',
              skills: 'skills',
            },
            prepare({ category, skills }) {
              return {
                title: category,
                subtitle: `${skills?.length || 0} skills`,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'About Page Content',
      };
    },
  },
});
