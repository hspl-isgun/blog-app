import { AccordionFAQ } from '@/blocks/AccordionFAQ/Component'
import { TwoColumnFAQ } from '@/blocks/TwoColumnFAQ/Component'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FaqBlock: React.FC<any> = ({ template, title, description, faqs, ctaText }) => {
  if (template === 'accordion') {
    return <AccordionFAQ title={title} faqs={faqs} />
  }

  if (template === 'twoColumn') {
    return <TwoColumnFAQ title={title} description={description} faqs={faqs} ctaText={ctaText} />
  }

  return null
}
