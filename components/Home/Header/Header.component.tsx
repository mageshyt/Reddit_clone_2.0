import Image from 'next/image'
import React, { useState } from 'react'
import { ChevronDownIcon, GlobeIcon } from '@heroicons/react/solid'
import { HomeIcon } from '@heroicons/react/outline'
import Searchbar from '../Searchbar/searchbar.component'
import RightIcons from './RightIcons.component'
import { signIn, useSession } from 'next-auth/react'
import SignIn from './SignIn.component'
import Link from 'next/link'
const styles = {
  ImageContainer: 'relative h-10 w-20 flex-shrink-0  cursor-pointer',
  Icon: 'h-5 w-5',
  wrapper: 'flex px-4 items-center py-2 bg-white shadow-md sticky top-0 z-50',
}
const Header = () => {
  const { data: session } = useSession()
  const [value1, setValue1] = useState('')
  return (
    <div className={styles.wrapper}>
      <div className={styles.ImageContainer}>
        {/* Logo */}
        <Link href="/">
          <Image
            priority
            layout="fill"
            objectFit="contain"
            src="https://links.papareact.com/fqy"
          />
        </Link>
      </div>

      {/* Icons */}

      <div className="sl:min-w-[300px] mx-7 flex items-center space-x-1 ">
        <HomeIcon className={styles.Icon} />
        <span className="hidden flex-1 lg:block ">Home</span>
        <ChevronDownIcon className={styles.Icon} />
      </div>

      {/* SearchBar */}
      <Searchbar />

      {/* right Icons */}
      <RightIcons />
      {!session ? (
        <SignIn session status={'Sign in'} />
      ) : (
        <SignIn session={session} status={'Sign out'} />
      )}
      {/* Sign in and sign out */}
    </div>
  )
}

export default Header
