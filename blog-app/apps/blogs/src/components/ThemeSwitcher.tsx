'use client'

import { useEffect, useState } from 'react'
import { Sun, Moon, Laptop } from 'lucide-react'

const themes = [
  { label: 'Light', value: 'light', icon: <Sun className="w-4 h-4" /> },
  { label: 'Dark', value: 'dark', icon: <Moon className="w-4 h-4" /> },
  { label: 'System', value: 'system', icon: <Laptop className="w-4 h-4" /> },
]

export const ThemeSwitcher = () => {
  const [current, setCurrent] = useState('system')
  const [dropdown, setDropdown] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'system'
    setCurrent(saved)
    applyTheme(saved)
  }, [])

  const applyTheme = (theme: string) => {
    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    } else {
      document.documentElement.setAttribute('data-theme', theme)
    }
  }

  const changeTheme = (theme: string) => {
    setCurrent(theme)
    localStorage.setItem('theme', theme)
    applyTheme(theme)
    setDropdown(false)
  }

  const currentIcon = themes.find(t => t.value === current)?.icon

  return (
    <div
      className="relative cursor-pointer"
      onMouseEnter={() => setDropdown(true)}
      onMouseLeave={() => setDropdown(false)}
    >
      <div className="p-2 hover:bg-gray-200 rounded">{currentIcon}</div>

      {dropdown && (
        <div className="absolute right-0 mt-2 bg-white border rounded shadow w-32 z-50">
          {themes.map((t) => (
            <button
              key={t.value}
              onClick={() => changeTheme(t.value)}
              className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-sm"
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
