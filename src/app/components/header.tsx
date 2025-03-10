'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaBars, FaSearch, FaTimes } from 'react-icons/fa'

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <header className='bg-slate-200 shadow-md'>
    <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
      <Link href='/'>
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
          <span className='text-slate-500'>Real</span>
          <span className='text-slate-700'>Estate</span>
        </h1>
      </Link>
      <form
        className='bg-slate-100 p-3 rounded-lg flex items-center'
       
      >
        <input
          type='text'
          placeholder='Search...'
          className='bg-transparent focus:outline-none w-24 sm:w-64'
        
        />
        <button>
          <FaSearch className='text-slate-600' />
        </button>
      </form>
      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-4">
          <Link href="/">
            <li className="text-slate-700 hover:underline">Home</li>
          </Link>
          <Link href="/about">
            <li className="text-slate-700 hover:underline">About</li>
          </Link>
          <Link href="/sign-in">
            <li className="text-slate-700 hover:underline">Sign In</li>
          </Link>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
   </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-100 p-4 absolute top-16 left-0 w-full shadow-md">
          <ul className="flex flex-col gap-4">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <li className="text-slate-700 hover:underline">Home</li>
            </Link>
            <Link href="/about" onClick={() => setIsOpen(false)}>
              <li className="text-slate-700 hover:underline">About</li>
            </Link>
            <Link href="/sign-in" onClick={() => setIsOpen(false)}>
              <li className="text-slate-700 hover:underline">Sign In</li>
            </Link>
          </ul>
        </div>
      )}
  </header>
  )
}
