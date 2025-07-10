// import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'
import type { Post } from '@/payload-types'
import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const {  heroImage, populatedAuthors,  title } = post

  const hasAuthors =
    populatedAuthors &&
    populatedAuthors.length > 0 &&
    formatAuthors(populatedAuthors) !== ''

  return (
    <section className="bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black leading-tight">
          {title}
        </h1>

        {/* {categories && categories.length > 0 && (
          <div className="text-sm text-gray-500 uppercase mb-2">
            {categories.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const isLast = index === categories.length - 1
                return (
                  <React.Fragment key={index}>
                    {category.title || 'Untitled'}
                    {!isLast && <span>,&nbsp;</span>}
                  </React.Fragment>
                )
              }
              return null
            })}
          </div>
        )} */}

        {/* Meta Info */}
        <div className="text-sm text-gray-600 space-x-4 mb-6">
          {hasAuthors && (
            <span>
              <strong>By:</strong> {formatAuthors(populatedAuthors)}
            </span>
          )}

        </div>

        {/* Hero Image */}
        {heroImage && typeof heroImage !== 'string' && (
          <div className="mt-8 rounded-xl overflow-hidden shadow-lg">
            <Media
              resource={heroImage}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        )}
      </div>
    </section>
  )
}
