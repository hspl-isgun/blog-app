'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'
import { HeaderNav } from './Nav'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
   <header
  className="fixed top-5 left-1/2 z-50 -translate-x-1/2 w-full max-w-6xl bg-white/80 backdrop-blur-md border border-gray-200 shadow-2xl rounded-3xl px-6 py-3 flex items-center justify-between transition-all"
  {...(theme ? { 'data-theme': theme } : {})}
>
  <Link href="/" className="text-base font-semibold text-gray-900 hover:text-blue-600">
    CommunityBlog
  </Link>

  <div className="flex items-center gap-5">
    <HeaderNav data={data} />
    <ThemeSwitcher />
  </div>
</header>

  )
}
