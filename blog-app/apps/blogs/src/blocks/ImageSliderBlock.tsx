/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/free-mode'

export const ImageSliderBlock: React.FC<{
  slides: {
    image: {
      url?: string
      alt?: string
    }
  }[]
}> = ({ slides }) => {
  if (!slides || slides.length === 0) return null

  return (
    <section className="w-full py-8 overflow-hidden">
      <Swiper
        modules={[Autoplay, FreeMode]}
        slidesPerView="auto"
        spaceBetween={30}
        loop={true}
        speed={3000}
        autoplay={{
          delay: 1,
          disableOnInteraction: false,
        }}
        freeMode={true}
        allowTouchMove={false}
        className="w-full"
      >
        {/* Duplicate slides for seamless loop */}
        {[...slides, ...slides].map((slide, index) => (
          <SwiperSlide
            key={index}
            style={{ width: 'auto' }}
            className="!w-auto flex-shrink-0"
          >
            <img
              src={slide.image?.url || ''}
              alt={slide.image?.alt || `Slide ${index + 1}`}
              className="h-64 w-auto object-cover rounded-xl shadow-md"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
