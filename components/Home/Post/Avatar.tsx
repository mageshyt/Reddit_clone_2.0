import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

interface Props {
  seed?: string
  large?: boolean
}

const Avatar = ({ seed, large }: Props) => {
  const { data: session } = useSession()
  return (
    <div
      className={`relative h-10 w-10 overflow-hidden rounded-full border-gray-300 bg-white  ${
        large && 'h-[70px] w-[70px]'
      }`}
    >
      <Image
        layout="fill"
        src={`https://avatars.dicebear.com/api/open-peeps/${
          seed || session?.user.name || 'Lara'
        }.svg`}
        alt="avatar"
      />
    </div>
  )
}

export default Avatar
