'use client'

import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import type { Post } from '@/payload-types'
import { Media } from '@/components/Media'
import { formatDateTime } from '@/utilities/formatDateTime'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'publishedAt'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title, publishedAt } = doc || {}
  const metaImage = meta?.image

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const href = `/${relationTo}/${slug}`

  return (
    <article ref={card.ref} className={cn('group', className)}>
      {/* Image */}
      <div className="relative w-full h-74">
        {!metaImage && (
          <div className="flex items-center justify-center h-full text-sm text-gray-400">
            No image
          </div>
        )}

        {metaImage && typeof metaImage !== 'string' && (
          <div className="relative w-full h-79">
            <div className="absolute z-0 top-4 left-4 right-0 bottom-0 rounded-xl border-2 border-gray-800 dark:border-gray-400 bg-cover bg-center bg-[url('/static/images/black-grit.png')] dark:bg-[url('/static/images/white-grit.png')] pointer-events-none" />
            <div className="relative z-10 h-full w-full overflow-hidden rounded-xl shadow-2xl -translate-x-3 -translate-y-3 group-hover:scale-105">
              <Media
  resource={metaImage}
  size="100vw"
  className="object-cover w-full h-full transition-transform duration-500 ease-in-out transform "
/>

            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* {showCategories && hasCategories && (
          <div className="text-sm text-blue-700 font-semibold uppercase mb-3 tracking-wide">
            {categories.map((category, index) => {
              if (typeof category === 'object') {
                const title = category.title || 'Untitled'
                const isLast = index === categories.length - 1
                return (
                  <Fragment key={index}>
                    {title}
                    {!isLast && <span className="text-gray-400">, </span>}
                  </Fragment>
                )
              }
              return null
            })}
          </div>
        )} */}

        {titleToUse && (
          <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
            <Link href={href} className="hover:text-blue-600 transition-colors" ref={link.ref}>
              {titleToUse}
            </Link>
          </h3>
        )}

        {publishedAt && (
          <p className="text-sm text-gray-500 mb-3">
             {formatDateTime(publishedAt)}
          </p>
        )}

        <div className="mt-auto">
          <Link
            href={href}
            className="inline-block text-sm font-medium text-blue-600 hover:underline"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  )
}
