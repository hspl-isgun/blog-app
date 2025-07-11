import React, { Fragment } from 'react'
import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { RoadmapBlock } from './RoadMap'
import { ImageSliderBlock } from './ImageSliderBlock'
import { FaqBlock } from './FaqBlock/Component'
import { GalleryBlock } from './GridGallery/Component'
const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  roadmap: RoadmapBlock,
  imageSlider: ImageSliderBlock,
  faqBlock: FaqBlock,
  gallery: GalleryBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = ({ blocks }) => {
  const hasBlocks = Array.isArray(blocks) && blocks.length > 0

  if (!hasBlocks) return null

  return (
    <Fragment>
      {blocks.map((block, index) => {
        const { blockType } = block

        if (blockType && blockType in blockComponents) {
          const Block = blockComponents[blockType]

          if (Block) {
            const cleanedBlock = JSON.parse(JSON.stringify(block)) // 🔥 removes any server-only values
            return (
              <div className="my-16" key={index}>
                {/* @ts-expect-error */}
                <Block {...cleanedBlock} disableInnerContainer />
              </div>
            )
          }
        }

        return null
      })}
    </Fragment>
  )
}
