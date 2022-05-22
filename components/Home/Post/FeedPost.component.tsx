import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChatAltIcon,
} from '@heroicons/react/outline'
import React from 'react'
import { Post } from '../../../typing'
import Avatar from './Avatar'
import TimeAgo from 'react-timeago'
import { FooterData } from '../../../assets/FooterData'
import Link from 'next/link'

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
interface Props {
  post: Post
}

const styles = {
  wrapper:
    'my-3 flex cursor-pointer rounded-md bg-white shadow-lg hover:border hover:border-gray-600',
  Votes:
    'flex  flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50  p-4 text-gray-400',

  topic:
    'cursor-pointer font-bold  text-black hover:text-sky-500 hover:underline',
  body: 'text-xl font-bold text-gray-800',

  PostButton:
    'flex items-center text-sm p-2 space-x-1 my-2 rounded-md hover:bg-gray-100 cursor-pointer',
}
const FeedPost = ({ post }: Props) => {
  if (!post)
    return (
      <div className="mt-10 w-full space-y-5">
        <SkeletonTheme baseColor="#ffffff">
          <Skeleton
            className="my-5 shadow-xl"
            width={'100%'}
            height={500}
            count={2}
          />
        </SkeletonTheme>
      </div>
    )
  return (
    <Link href={`post/${post.id}`}>
      <div className={styles.wrapper}>
        {/* Votes */}
        <div className={styles.Votes}>
          <ArrowUpIcon className="voteButtons hover:text-red-400" />
          {/* Initial vote in 0 */}
          <p>0</p>
          <ArrowDownIcon className="voteButtons hover:text-purple-400" />
        </div>

        <div className="p-3 pb-1">
          {/* Post Header */}

          <div className="flex items-center space-x-3">
            <Avatar seed={post?.subreddit[0]?.topic} />
            <p className="text-xs text-gray-400">
              <Link href={`/subreddit/${post?.subreddit[0]?.topic}`}>
                <span className={styles.topic}>
                  r/{post?.subreddit[0]?.topic}
                </span>
              </Link>
              • Posted by u/{post?.username} <TimeAgo date={post?.created_at} />
            </p>
          </div>
          {/* post Body */}
          <div className="py-4">
            {/* title */}
            <h3 className={styles.body}>{post?.title}</h3>
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
            <div className={styles.PostButton}>
              <ChatAltIcon className="h-6 w-6" />
              <p className="text-sm ">{post?.comments.length} comments</p>
            </div>
            {FooterData.map((item, idx) => (
              <FooterIcons name={item.name} Icon={item.icon} key={idx} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default FeedPost

interface FooterProps {
  name: string
  Icon: any
}

const FooterIcons = ({ Icon, name }: FooterProps) => {
  return (
    <div className={styles.PostButton}>
      <Icon className="h-6 w-6" />
      <p className="hidden text-xs text-gray-400 sm:inline">{name}</p>
    </div>
  )
}
