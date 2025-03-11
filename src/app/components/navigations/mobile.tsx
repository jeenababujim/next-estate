'use client'
import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import Link from 'next/link'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function MobileMenuIcon() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Mobile Menu Button */}
      <button className="text-slate-700" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="bg-slate-100 p-4 absolute top-16 left-0 w-full shadow-md">
          <ul className="flex flex-col gap-4">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <li className="text-slate-700 hover:underline">Home</li>
            </Link>
            <Link href="/about" onClick={() => setIsOpen(false)}>
              <li className="text-slate-700 hover:underline">About</li>
            </Link>
            <SignedIn>
                <UserButton/>
            </SignedIn>
            <SignedOut>
            <Link href="/sign-in" onClick={() => setIsOpen(false)}>
              <li className="text-slate-700 hover:underline">Sign In</li>
            </Link>
            </SignedOut>
          </ul>
        </div>
      )}
    </div>
  )
}
