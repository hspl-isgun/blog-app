'use client'

import React from 'react'
import type { GridGallery } from '../payload-types'
import { Media } from '../components/Media'
import RichText from '../components/RichText'

type Props = {
  gridGallery?: GridGallery
}

export const GalleryBlock: React.FC<Props> = ({ gridGallery }) => {
  if (!gridGallery || typeof gridGallery === 'string') return null

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-[#f9fafb] to-[#f3f4f6]">
      <div className="max-w-6xl mx-auto">
        {gridGallery.title && (
          <div className="mb-8 text-center">
            <RichText
              data={gridGallery.title}
              enableGutter={false}
              className="text-4xl font-bold text-gray-800"
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {gridGallery.images?.map((img, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md group hover:shadow-xl transition-shadow duration-300"
            >
              {typeof img.image === 'object' && (
                <Media
                  resource={img.image}
                  imgClassName="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  fill={false}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
