import type { Block } from 'payload'

export const GalleryBlock: Block = {
  slug: 'gallery',
  labels: {
    singular: 'Gallery',
    plural: 'Galleries',
  },
  fields: [
    // {
    //   name: 'blockTitle',
    //   type: 'text',
    //   label: 'Section Title',
    //   required: false,
    // },
    {
      name: 'gridGallery',
      type: 'relationship',
      relationTo:'grid-galleries',
      required: true,
    },
  ],
}
