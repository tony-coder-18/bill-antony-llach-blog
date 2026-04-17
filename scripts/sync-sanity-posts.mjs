import 'dotenv/config'

import fs from 'node:fs/promises'
import path from 'node:path'

import {toHTML} from '@portabletext/to-html'
import yaml from 'js-yaml'

const rootDir = process.cwd()
const outputDir = path.join(rootDir, '_sanity_posts')

const projectId = process.env.SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET
const apiVersion = process.env.SANITY_API_VERSION || '2026-03-27'
const readToken = process.env.SANITY_API_READ_TOKEN

const postsQuery = `
  *[_type == "post" && defined(slug.current) && defined(publishedAt)]
    | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      "categories": [coalesce(category, "blog")],
      excerpt,
      body
    }
`

if (!projectId || !dataset) {
  console.warn('Skipping Sanity sync because SANITY_PROJECT_ID or SANITY_DATASET is missing.')
  process.exit(0)
}

const searchParams = new URLSearchParams({
  query: postsQuery,
  perspective: 'published',
})

const queryUrl = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?${searchParams.toString()}`

const response = await fetch(queryUrl, {
  headers: readToken ? {Authorization: `Bearer ${readToken}`} : undefined,
})

if (!response.ok) {
  const errorText = await response.text()
  throw new Error(`Sanity sync failed (${response.status}): ${errorText}`)
}

const {result: posts = []} = await response.json()

await fs.mkdir(outputDir, {recursive: true})

const existingEntries = await fs.readdir(outputDir, {withFileTypes: true})
for (const entry of existingEntries) {
  if (entry.isFile() && entry.name.endsWith('.md')) {
    await fs.unlink(path.join(outputDir, entry.name))
  }
}

for (const post of posts) {
  const slug = post.slug || post._id
  const frontMatter = {
    layout: 'single',
    title: post.title,
    date: post.publishedAt,
    categories: Array.isArray(post.categories) ? post.categories : ['blog'],
    permalink: `/${slug}/`,
    excerpt: post.excerpt || '',
    sanity_id: post._id,
  }

  const html = toHTML(post.body || [], {
    components: {
      types: {
        code: ({value}) => {
          const language = value.language ? ` language-${escapeHtml(value.language)}` : ''
          return `<pre><code class="${language.trim()}">${escapeHtml(value.code || '')}</code></pre>`
        },
      },
      marks: {
        link: ({children, value}) => {
          const href = value?.href || '#'
          const rel = href.startsWith('http') ? ' rel="noreferrer noopener"' : ''
          return `<a href="${escapeHtml(href)}"${rel}>${children}</a>`
        },
      },
    },
  })

  const document = `---\n${yaml.dump(frontMatter, {lineWidth: 0})}---\n${html}\n`
  await fs.writeFile(path.join(outputDir, `${slug}.md`), document, 'utf8')
}

console.log(`Synced ${posts.length} Sanity posts into ${path.relative(rootDir, outputDir)}.`)

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}
