import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function DesktopMenu() {
  return (
    <ul className="hidden md:flex gap-4">
      <Link href="/">
        <li className="text-slate-700 hover:underline">Home</li>
      </Link>
      <Link href="/about">
        <li className="text-slate-700 hover:underline">About</li>
      </Link>
      <SignedIn>
                <UserButton/>
            </SignedIn>
            <SignedOut>
      <Link href="/sign-in">
        <li className="text-slate-700 hover:underline">Sign In</li>
      </Link>
      </SignedOut>
    </ul>
  )
}
