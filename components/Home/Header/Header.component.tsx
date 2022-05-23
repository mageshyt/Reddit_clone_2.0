import Image from 'next/image'
import React, { useState } from 'react'
import { ChevronDownIcon, GlobeIcon } from '@heroicons/react/solid'
import { HomeIcon } from '@heroicons/react/outline'
import RightIcons from './RightIcons.component'
import { useSession } from 'next-auth/react'
import SignIn from './SignIn.component'
import Logo from '../../../assets/Logo.png'
import Link from 'next/link'
import Searchbar from '../Searchbar/searchbar.component'
const styles = {
  ImageContainer: 'relative h-10 w-20 flex-shrink-0  cursor-pointer',
  Icon: 'h-5 w-5',
  wrapper:
    'flex bg-[#1e2122] head px-4 items-center py-2 bg-white shadow-md sticky top-0 z-50',
}
const Header = () => {
  const { data: session } = useSession()
  return (
    <div className={styles.wrapper}>
      <div className={styles.ImageContainer}>
        {/* Logo */}
        <Link href="/">
          <Image
            priority
            layout="fill"
            objectFit="contain"
            src={Logo}
            height={200}
            width={200}
          />
        </Link>
      </div>

      {/* Icons */}

      <div className="sl:min-w-[300px] mx-7 flex items-center space-x-1 text-white ">
        <HomeIcon className={styles.Icon} />
        <span className="hidden flex-1 lg:block ">Home</span>
        <ChevronDownIcon className={styles.Icon} />
      </div>

      {/* SearchBar */}
      <Searchbar />

      {/* right Icons */}
      <RightIcons />
      {!session ? (
        <SignIn status={'Sign in'} />
      ) : (
        <SignIn status={'Sign out'} />
      )}
      {/* Sign in and sign out */}
    </div>
  )
}

export default Header
