import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import { CMSLink } from '../../components/Link'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className="container my-20">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-8">
        {columns?.map((col, index) => {
          const { enableLink, link, richText, size } = col
          const span = colsSpanClasses[size || 'full']

          return (
            <div
              key={index}
              className={cn(
                `col-span-4 lg:col-span-${span} group relative transition-all duration-300`,
              )}
            >
              <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col justify-between">
                {richText && (
                  <div className="prose prose-lg max-w-none text-gray-800 group-hover:translate-y-[-2px] transition-transform duration-200">
                    <RichText data={richText} enableGutter={false} />
                  </div>
                )}

                {enableLink && link?.label && (
                  <div className="mt-6">
                    <CMSLink
                      {...link}
                      className="text-blue-600 font-medium underline underline-offset-4 hover:text-blue-800 transition-colors duration-200"
                    />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
