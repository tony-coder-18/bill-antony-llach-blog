import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-project-id'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'default',
  title: 'Bill Antony Blog',
  projectId,
  dataset,
  plugins: [
    structureTool({structure}),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
