import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import Link from 'next/link'
import type { Footer } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Linkedin, X, Instagram, Facebook } from 'lucide-react'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []

  return (
    <footer className="bg-black text-white py-12 mt-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10 text-left">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">CommunityBlog</h2>
          <p className="text-gray-400 text-sm">
            Share your voice. Learn from the community. Stay inspired.
          </p>
          <p className="text-gray-500 text-xs mt-2">© {new Date().getFullYear()} CommunityBlog</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            {navItems.map(({ link }, i) => (
              <li key={i}>
                <CMSLink {...link} className="hover:text-white transition-colors" />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link href="/docs" className="hover:text-white">Documentation</Link>
            </li>
            <li>
              <Link href="/tutorials" className="hover:text-white">Tutorials</Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-white">FAQs</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Column 4 - Follow Us */}
        <div>
          <h3 className="text-sm font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 mb-4">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <X className="w-5 h-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
              <Facebook className="w-5 h-5" />
            </a>
          </div>
          <p className="text-xs text-gray-500">Join our community for updates and tips.</p>
        </div>
      </div>
    </footer>
  )
}
