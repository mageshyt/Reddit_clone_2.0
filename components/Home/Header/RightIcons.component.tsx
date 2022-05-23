import React from 'react'
import {
  SparklesIcon,
  VideoCameraIcon,
  ChatIcon,
  BellIcon,
  PlusIcon,
  SpeakerphoneIcon,
} from '@heroicons/react/outline'
import { GlobeIcon, MenuIcon } from '@heroicons/react/solid'
const RightIcons = () => {
  return (
    <div>
      <div className=" mx-5 hidden items-center space-x-2 text-gray-400 lg:inline-flex">
        <SparklesIcon className="icon" />
        <GlobeIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border border-gray-400" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <SpeakerphoneIcon className="icon" />
      </div>

      <div className=" ml-5 flex items-center lg:hidden ">
        <MenuIcon className="icon" />
      </div>
    </div>
  )
}

export default RightIcons
