'use client'

import React from 'react'
import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { FileText, Link2, ClipboardList } from 'lucide-react'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  const hasContent = richText || (links && links.length > 0)

  return (
    <section className="relative overflow-hidden py-16 bg-gradient-to-br from-indigo-100 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        {hasContent ? (
          <>
            {/* Rich Text Content */}
            {richText && (
              <div className="max-w-3xl mb-8 text-gray-800 dark:text-gray-100">
                <RichText
                  data={richText}
                  enableGutter={false}
                  enableProse={false}
                  className="text-2xl md:text-3xl font-semibold leading-snug"
                />
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              {(links || []).map(({ link }, i) => (
                <CMSLink
                  key={i}
                  {...link}
                  className="px-6 py-3 text-lg font-semibold rounded-lg shadow transition-all duration-200"
                />
              ))}
            </div>
          </>
        ) : (
          <div className="w-full max-w-lg mx-auto border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-10 bg-white/70 dark:bg-gray-900/30 shadow-sm animate-fade-in">
            <div className="flex justify-center mb-6 gap-4 text-indigo-600 dark:text-indigo-400">
              <div className="bg-indigo-100 dark:bg-indigo-900/20 p-3 rounded-xl shadow-sm">
                <FileText className="h-6 w-6" />
              </div>
              <div className="bg-indigo-100 dark:bg-indigo-900/20 p-3 rounded-xl shadow-sm">
                <Link2 className="h-6 w-6" />
              </div>
              <div className="bg-indigo-100 dark:bg-indigo-900/20 p-3 rounded-xl shadow-sm">
                <ClipboardList className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Call to Action
            </h3>
            <p className="text-muted-foreground">
              Add some rich text or buttons to show your CTA section.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
