import type { Block } from 'payload'

export const ImageSliderBlock: Block = {
  slug: 'imageSlider',
  labels: {
    singular: 'Image Slider',
    plural: 'Image Sliders',
  },
  fields: [
    {
      name: 'slides',
      type: 'array',
      label: 'Slides',
      required: true,
      fields: [
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          label: 'Caption (optional)',
          type: 'text',
        },
      ],
    },
  ],
}
