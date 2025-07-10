/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import RichText from '@/components/RichText'

type FAQ = {
  question: string
  answer: any // RichText JSON
}

type Props = {
  title: any // RichText JSON
  description?: any // RichText JSON
  ctaText?: any // RichText JSON
  faqs: FAQ[]
}

export const TwoColumnFAQ: React.FC<Props> = ({ title, faqs, description, ctaText }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index))
  }

  return (
    <section className="w-full px-4 py-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        {/* LEFT COLUMN */}
        <div>
          <span className="inline-block text-xs font-medium border px-2 py-1 rounded-full mb-4">FAQ</span>

          {title && (
            <div className="mb-4">
              <RichText data={title} enableGutter={false} />
            </div>
          )}

          {description && (
            <div className="text-gray-600 mb-6">
              <RichText data={description} enableGutter={false} />
            </div>
          )}

          {ctaText && (
            <div className="mt-4">
              <RichText data={ctaText} enableGutter={false} />
            </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-4 divide-y">
          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                className="w-full flex justify-between items-center py-4 text-left font-medium"
                onClick={() => toggle(index)}
              >
                <span>{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {openIndex === index && (
                <div className="text-sm text-gray-700 pb-4">
                  <RichText data={faq.answer} enableGutter={false} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
