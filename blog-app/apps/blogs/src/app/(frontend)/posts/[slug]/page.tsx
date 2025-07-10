import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'
import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import type { Post } from '@/payload-types'
import Link from 'next/link'


export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return posts.docs.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/posts/' + slug
  const post = await queryPostBySlug({ slug })

  if (!post) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16 bg-white">
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      {/* Shared layout wrapper for consistent alignment */}
      <div className="w-full max-w-6xl mx-auto px-4">
        {/* Hero Section (title, author, image) */}
        <PostHero post={post} />

        {/* Main Blog + Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8 pt-12">
          {/* Blog Body */}
          <div className="flex-1">
            <div className="text-sm text-gray-500 mb-6 space-x-2 border-b-4 border-red-500 pb-4">
              <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'No date'}</span>
              <span>/ 3 mins read</span>
              <span>/ 735 views</span>
            </div>

            <RichText className="prose max-w-none" data={post.content} enableGutter={false} />
          </div>

          {/* Sidebar */}
          <aside className="w-64 shrink-0 hidden lg:block">




<div className="sticky top-24 space-y-4 text-sm text-gray-700">
  <h3 className="font-semibold">Categories</h3>

  {post.categories && post.categories.length > 0 && (
    <ul className="space-y-1 text-gray-600">
      {post.categories.map((category, index) => {
        if (typeof category === 'object' && category !== null) {
          const categoryTitle = category.title || 'Untitled'
          return (
            <li key={index}>
              <Link
               href={`/posts/${category.slug}`}
                className="block bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 transition"
              >
                {categoryTitle}
              </Link>
            </li>
          )
        }
        return null
      })}
    </ul>
  )}
</div>

          </aside>
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug })
  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: { equals: slug },
    },
  })

  return result.docs?.[0] || null
})
