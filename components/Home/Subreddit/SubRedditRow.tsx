import { ChevronUpIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React from 'react'
import Avatar from '../Post/Avatar'

interface Props {
  topic: string
  index: number
}

const SubRedditRow = ({ topic, index }: Props) => {
  return (
    <div className="flex items-center space-x-2 border-t bg-white px-4 py-2 last:rounded-b">
      <p>{index + 1}</p>
      <ChevronUpIcon className="h-4 w-4 text-green-400 " />
      <Avatar seed={topic} />
      <p className="flex-1 truncate"> r/{topic}</p>
      <Link href={`/subreddit/${topic}`}>
        <span className="cursor-pointer rounded-xl bg-sky-400 p-2 text-sm font-bold text-gray-600 hover:text-gray-900">
          View
        </span>
      </Link>
    </div>
  )
}

export default SubRedditRow
