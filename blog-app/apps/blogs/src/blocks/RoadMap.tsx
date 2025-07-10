/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React from 'react'
import { CheckCircle, Clock, Circle } from 'lucide-react'
import RichText from '@/components/RichText'

type Step = {
  stepTitle?: any // richText JSON
  stepDescription?: any // richText JSON
  status: 'not-started' | 'in-progress' | 'completed'
}

type Props = {
  title?: any // richText JSON
  description?: any // richText JSON
  steps?: Step[]
}

export const RoadmapBlock: React.FC<Props> = ({ title, description, steps }) => {
  const getStatusIcon = (status: Step['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500 w-5 h-5" />
      case 'in-progress':
        return <Clock className="text-yellow-500 w-5 h-5" />
      default:
        return <Circle className="text-gray-400 w-5 h-5" />
    }
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-purple-100">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        {title && (
          <div className="text-center mb-4">
            <RichText data={title} enableGutter={false} />
          </div>
        )}

        {/* Description */}
        {description && (
          <div className="text-center mb-10 text-gray-700">
            <RichText data={description} enableGutter={false} />
          </div>
        )}

        {/* Steps */}
        {steps?.length > 0 ? (
          <ol className="space-y-8 relative pl-6 sm:pl-8 border-l-4 border-blue-200">
            {steps.map((step, i) => (
              <li key={i} className="relative group flex items-start gap-4">
                {/* Status Icon */}
                <div className="flex-shrink-0 pt-1">
                  {getStatusIcon(step.status)}
                </div>

                {/* Step Card */}
                <div className="flex-1 bg-white/70 backdrop-blur-md border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                  {/* Step Title */}
                  {step.stepTitle && (
                    <div className="text-xl font-semibold text-gray-800">
                      <RichText data={step.stepTitle} enableGutter={false} />
                    </div>
                  )}

                  {/* Step Description */}
                  {step.stepDescription && (
                    <div className="mt-2 text-sm text-gray-700">
                      <RichText data={step.stepDescription} enableGutter={false} />
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-gray-500 text-center mt-6">No roadmap steps added yet.</p>
        )}
      </div>
    </section>
  )
}
