'use client'

import { CMSLink } from '@/components/Link'
import type { Header } from '@/payload-types'

export const HeaderNav: React.FC<{ data: Header }> = ({ data }) => {
  const navItems = data.navItems || []

  return (
    <nav className="flex gap-6 items-center">
      {navItems.map((item, i) => {
        const { link, subItems } = item

        if (subItems && subItems.length > 0) {
          return (
            <div key={i} className="relative group">
              <CMSLink {...link} appearance="link" className="cursor-pointer" />
              <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-200 z-50">
                {subItems.map((sub, j) => (
                  <CMSLink
                    key={j}
                    {...sub.link}
                    className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
                    appearance="inline"
                  />
                ))}
              </div>
            </div>
          )
        }

        return <CMSLink key={i}                    className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
 {...link} appearance="link" />
      })}
    </nav>
  )
}
