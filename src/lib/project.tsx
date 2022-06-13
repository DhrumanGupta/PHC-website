import fs from 'fs'
import path from 'path'

const contentPath = path.join(process.cwd(), 'content', 'gallery')

// Get all the slugs
const getAllProjectSlugs = async (): Promise<string[]> => {
  return (await fs.promises.readdir(contentPath))
    .filter((x) => x.endsWith('.json'))
    .map((x) => x.replace(/\.json$/, ''))
}

interface FrontMatter extends Omit<RawFrontMatter, 'date'> {
  date: number
}

interface RawFrontMatter {
  title: string
  date: Date
  description: string
  source: string
  demo: string
}

interface MetaData extends FrontMatter {
  slug: string
}

async function getAllProjectData(): Promise<MetaData[]> {
  const slugs = await getAllProjectSlugs()
  return await Promise.all(
    slugs.map(async (slug): Promise<MetaData> => {
      const filePath = path.join(contentPath, `${slug}.json`)
      const fileContents = await fs.promises.readFile(filePath, 'utf-8')

      const result = JSON.parse(fileContents) as RawFrontMatter

      return {
        ...result,
        date: new Date(result.date).getTime(),
        slug,
      }
    })
  )
}

export { getAllProjectData }
export type { FrontMatter, MetaData }
