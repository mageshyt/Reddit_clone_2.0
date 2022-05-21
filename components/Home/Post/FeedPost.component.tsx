import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/outline'
import React from 'react'
import { Post } from '../../../typing'
import Avatar from './Avatar'
import TimeAgo from 'react-timeago'
interface Props {
  post: Post
}
const FeedPost = ({ post }: Props) => {
  console.log({ post })
  return (
    <div className="my-3 flex cursor-pointer rounded-md bg-white shadow-lg hover:border hover:border-gray-600">
      {/* Votes */}
      <div className="flex  flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50  p-4 text-gray-400">
        <ArrowUpIcon className="voteButtons hover:text-red-400" />
        {/* Initial vote in 0 */}
        <p>0</p>
        <ArrowDownIcon className="voteButtons hover:text-purple-400" />
      </div>

      <div className="p-3 pb-1">
        {/* Post Header */}

        <div>
          <Avatar seed={post?.subreddit[0]?.topic} />
          <p className="text-xs text-gray-400">
            <span className="cursor-pointer font-bold  text-black hover:text-sky-500 hover:underline">
              r/{post?.subreddit[0]?.topic}
            </span>
            • Posted by u/{post?.username} <TimeAgo date={post?.created_at} />
          </p>
        </div>
        {/* post Body */}
        <div className="py-4">
          {/* title */}
          <h3 className="text-xl font-bold text-gray-800">{post?.title}</h3>
          {post?.body.split('\n').map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>
        {/* image */}
        {post?.image && (
          <img
            className=" w-full object-cover"
            src={post?.image}
            alt="post image"
          />
        )}

        {/* Footer */}
        <div className="flex space-x-4 text-gray-400">
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default FeedPost
