import { ChevronDownIcon } from '@heroicons/react/outline'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

interface Props {
  status: string
}

const SignIn = ({ status }: Props) => {
  const { data: session } = useSession()
  return (
    <div>
      <div
        onClick={() => {
          if (status === 'Sign in') {
            signIn()
          } else if (status === 'Sign out') {
            signOut()
          }
        }}
        className="animate hidden cursor-pointer items-center space-x-2  border border-gray-100 p-2 hover:scale-105 hover:shadow-xl lg:flex"
      >
        <div className=" relative h-5 w-5 flex-shrink-0  ">
          <Image
            objectFit="contain"
            src="https://links.papareact.com/23l"
            layout="fill"
          />
        </div>
        <div>
          {session && (
            <p className="truncate text-xs text-white">
              {' '}
              {session?.user?.name}{' '}
            </p>
          )}
        </div>
        {/* when user is logged in then show down icon*/}
        {session && (
          <ChevronDownIcon className="h-5 w-5 flex-shrink-0 text-gray-200" />
        )}
        {/* Show sign in when user is not login */}
        {!session && <span className="text-gray-200">{status}</span>}
      </div>
    </div>
  )
}

export default SignIn
