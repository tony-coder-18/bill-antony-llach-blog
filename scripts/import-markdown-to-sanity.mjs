import 'dotenv/config'

import fs from 'node:fs/promises'
import path from 'node:path'

import {htmlToBlocks} from '@portabletext/block-tools'
import {createClient} from '@sanity/client'
import {Schema} from '@sanity/schema'
import matter from 'gray-matter'
import {JSDOM} from 'jsdom'
import {marked} from 'marked'

const rootDir = process.cwd()
const postsDir = path.join(rootDir, '_posts')

const projectId = process.env.SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET
const apiVersion = process.env.SANITY_API_VERSION || '2026-03-27'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
  throw new Error('SANITY_PROJECT_ID, SANITY_DATASET and SANITY_API_WRITE_TOKEN are required for importing content.')
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
})

const portableTextSchema = Schema.compile({
  name: 'import-schema',
  types: [
    {
      type: 'array',
      name: 'body',
      of: [{type: 'block'}],
    },
  ],
})

const blockContentType = portableTextSchema.get('body')
const filenames = (await fs.readdir(postsDir)).filter((filename) => filename.endsWith('.markdown'))

for (const filename of filenames) {
  const filePath = path.join(postsDir, filename)
  const fileContents = await fs.readFile(filePath, 'utf8')
  const {data, content} = matter(fileContents)

  const title = data.title?.trim()
  const slug = slugify(data.title || filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.markdown$/, ''))

  if (!title) {
    console.warn(`Skipping ${filename} because it is missing a title.`)
    continue
  }

  const body = htmlToBlocks(marked.parse(content), blockContentType, {
    parseHtml: (html) => new JSDOM(html).window.document,
  })

  const excerpt = extractExcerpt(content)
  const category = normalizeCategory(data.categories)

  await client.createOrReplace({
    _id: `post-${slug}`,
    _type: 'post',
    title,
    slug: {_type: 'slug', current: slug},
    publishedAt: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    category,
    excerpt,
    body,
  })

  console.log(`Imported ${filename} as post-${slug}.`)
}

function extractExcerpt(markdown) {
  const plainText = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#>*_-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  return plainText.slice(0, 180)
}

function normalizeCategory(categoryValue) {
  if (Array.isArray(categoryValue)) {
    return normalizeCategory(categoryValue[0])
  }

  return categoryValue === 'projects' ? 'projects' : 'blog'
}

function slugify(input) {
  return String(input)
    .toLowerCase()
    .trim()
    .replace(/["']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
