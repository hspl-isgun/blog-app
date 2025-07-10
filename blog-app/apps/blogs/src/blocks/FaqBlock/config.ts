import type { Block } from 'payload'
import {
  lexicalEditor,
  HeadingFeature,
  InlineToolbarFeature,
  FixedToolbarFeature,
} from '@payloadcms/richtext-lexical'

export const FAQBlock: Block = {
  slug: 'faqBlock',
  interfaceName: 'FaqBlock',
  fields: [
    {
      name: 'template',
      type: 'select',
      required: true,
      options: [
        { label: 'Accordion', value: 'accordion' },
        { label: 'Two Column', value: 'twoColumn' },
      ],
    },
    {
      name: 'title',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h3','h2'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: 'ctaText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: 'faqs',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'richText',
          required: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
      ],
    },
  ],
}
