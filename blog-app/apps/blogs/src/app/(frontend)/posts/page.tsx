import type { Metadata } from 'next/types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import PageClient from './page.client'
import { Search } from '@/search/Component'
import { Pagination } from '@/components/Pagination'
import { Card } from '@/components/Card'

export const dynamic = 'force-dynamic'
export const revalidate = 600

type Props = {
  searchParams?: { q?: string }
}

export default async function Page({ searchParams }: Props) {
  const query = searchParams?.q || ''
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 6,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      publishedAt: true,
    },
    ...(query
      ? {
          where: {
            or: [
              { title: { like: query } },
              { slug: { like: query } },
              { 'meta.title': { like: query } },
              { 'meta.description': { like: query } },
            ],
          },
        }
      : {}),
  })

  return (
    <div className="bg-gray-100 min-h-screen w-full py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="space-y-2 py-6 md:space-y-5 border-b border-gray-300 dark:border-gray-700">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-[3.5rem]">
            All posts
          </h1>
          <p className="text-gray-600 md:text-lg md:leading-7 dark:text-gray-400">
            I like to write about stuff I&apos;m into. You&apos;ll find a mix of web dev articles, tech news, and random thoughts from my life. Use the search below to filter by title.
          </p>
          <Search />
        </div>

        {posts.totalDocs > 0 ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 py-10 md:gap-y-16 lg:grid-cols-2 xl:grid-cols-3">
            {posts.docs.map((post, i) => {
              if (typeof post === 'string') return null
              return (
                <div key={i}>
                  <Card doc={post} relationTo="posts" showCategories />
                </div>
              )
            })}
          </div>
        ) : (
          <p className="pt-10 text-gray-500 text-center">No results found</p>
        )}

        {posts.totalPages > 1 && posts.page && (
  <div className="mt-12">
    <div className="max-w-6xl mx-auto px-4">
      <Pagination page={posts.page} totalPages={posts.totalPages} />
    </div>
  </div>
)}

      </div>

      <PageClient />
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Blog | Posts',
    description: 'Discover our latest blog articles',
  }
}
