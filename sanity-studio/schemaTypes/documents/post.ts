import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().min(5),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) =>
        rule.required().custom((slug) => {
          if (!slug?.current) {
            return 'A slug is required.'
          }

          return /^[a-z0-9-]+$/.test(slug.current) || 'Use lowercase letters, numbers and hyphens only.'
        }),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Section',
      type: 'string',
      initialValue: 'blog',
      options: {
        list: [
          {title: 'Blog', value: 'blog'},
          {title: 'Projects', value: 'projects'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(180).warning('Keep excerpts short for the homepage cards.'),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            annotations: [
              defineField({
                name: 'link',
                type: 'object',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (rule) => rule.required().uri({scheme: ['http', 'https', 'mailto', 'tel']}),
                  }),
                ],
              }),
            ],
          },
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      publishedAt: 'publishedAt',
    },
    prepare(selection) {
      const {title, category, publishedAt} = selection
      const formattedDate = publishedAt ? new Date(publishedAt).toLocaleDateString('en-US') : 'No date'

      return {
        title,
        subtitle: `${category === 'projects' ? 'Project' : 'Blog'} • ${formattedDate}`,
      }
    },
  },
})
