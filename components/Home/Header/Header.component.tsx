import Image from 'next/image'
import React, { useState } from 'react'
import { ChevronDownIcon, GlobeIcon } from '@heroicons/react/solid'
import { HomeIcon } from '@heroicons/react/outline'
import Searchbar from '../Searchbar/searchbar.component'
import RightIcons from './RightIcons.component'

const styles = {
  ImageContainer: 'relative h-10 w-20 flex-shrink-0  cursor-pointer',
  Icon: 'h-5 w-5',
  wrapper: 'flex px-4 py-2 bg-white shadow-md sticky top-0 z-50',
}
const Header = () => {
  const [value1, setValue1] = useState('')
  return (
    <div className={styles.wrapper}>
      <div className={styles.ImageContainer}>
        {/* Logo */}
        <Image
          layout="fill"
          objectFit="contain"
          src="https://links.papareact.com/fqy"
        />
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

      {/* Sign in and sign out */}
      <div className="animate hidden cursor-pointer items-center space-x-2  border border-gray-100 p-2 hover:scale-105 hover:shadow-xl lg:flex">
        <div className=" relative h-5 w-5 flex-shrink-0  ">
          <Image
            objectFit="contain"
            src="https://links.papareact.com/23l"
            height={5}
            width={5}
            layout="fill"
          />
        </div>
        <span className="text-gray-500">Sign in</span>
      </div>
    </div>
  )
}

export default Header
