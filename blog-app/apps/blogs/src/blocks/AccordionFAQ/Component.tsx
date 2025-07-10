/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import RichText from '@/components/RichText'

type FAQ = {
  question: string
  answer: any
}

type Props = {
  title: any
  faqs: FAQ[]
}

export const AccordionFAQ: React.FC<Props> = ({ title, faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index))
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      {/* RichText Title */}
      {title && (
        <div className="text-3xl font-bold text-orange-500 mb-8">
          <RichText data={title} enableGutter={false} />
        </div>
      )}

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-gray-100 rounded-lg shadow-sm">
            {/* FAQ Question */}
            <button
              className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-gray-800"
              onClick={() => toggle(index)}
            >
              <span>
                {index + 1}. {faq.question}
              </span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>

            {/* FAQ Answer (RichText) */}
            {openIndex === index && (
              <div className="px-6 pb-4 text-gray-700 text-sm">
                <RichText data={faq.answer} enableGutter={false} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
