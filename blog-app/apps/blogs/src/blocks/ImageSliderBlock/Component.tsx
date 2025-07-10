/* eslint-disable @next/next/no-img-element */
'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

type Props = {
  slides: {
    image: {
      url: string
      alt?: string
    }
    caption?: string
  }[]
}

export function ImageSliderBlock({ slides }: Props) {
  if (!slides?.length) return null

  return (
    <div className="my-10">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={20}
        className="rounded-xl overflow-hidden"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <img
              src={slide.image.url}
              alt={slide.image.alt || ''}
              className="w-full h-auto object-cover rounded-xl"
            />
            {slide.caption && (
              <p className="text-center text-sm text-gray-600 mt-2">{slide.caption}</p>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
