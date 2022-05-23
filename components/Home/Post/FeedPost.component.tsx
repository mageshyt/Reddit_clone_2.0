import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChatAltIcon,
} from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'
import { Post, Vote } from '../../../typing'
import Avatar from './Avatar'
import TimeAgo from 'react-timeago'
import { FooterData } from '../../../assets/FooterData'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useSession } from 'next-auth/react'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_VOTE } from '../../../graphql/mutations'
import { GET_VOTES_BY_ID } from '../../../graphql/queries'

interface Props {
  post: Post
}

const styles = {
  wrapper:
    'my-3 flex cursor-pointer rounded-md bg-[#121212] shadow-lg hover:border hover:border-gray-600',
  Votes:
    'flex  flex-col  items-center justify-start space-y-1 rounded-l-md bg-[#191a1b]  p-4 text-gray-400',

  topic:
    'cursor-pointer font-bold  text-blue-300 hover:text-sky-500 hover:underline',
  body: 'text-xl font-bold text-gray-100',

  PostButton:
    'flex items-center text-sm p-2 space-x-1 my-2 rounded-md hover:bg-[#262727] cursor-pointer',
}
const FeedPost = ({ post }: Props) => {
  // ! user
  const { data: session } = useSession()

  //! to track vote
  const [vote, setVote] = useState<boolean>()

  const { data, loading } = useQuery(GET_VOTES_BY_ID, {
    variables: {
      post_id: post?.id,
    },
  })

  //! Add Votes

  const [addVote] = useMutation(ADD_VOTE, {
    refetchQueries: [GET_VOTES_BY_ID, 'getVotesByPostId'],
  })
  //! use effect
  useEffect(() => {
    const votes: Vote[] = data?.getVotesByPostId

    const voteCheck = votes?.find(
      (vote: any) => vote.username === session?.user?.name
    )?.upvote
    setVote(voteCheck)
  }, [data])

  //! to display:  Votes;

  const displayVotes = (data: any) => {
    const votes: Vote[] = data?.getVotesByPostId
    const TotalCount = votes?.reduce(
      (acc, vote) => (vote.upvote ? (acc += 1) : (acc = -1)),
      0
    )
    if (votes?.length === 0) return 0

    if (TotalCount === 0) {
      return votes[0].upvote ? 1 : -1
    }

    return TotalCount
  }

  //! for up vote Function
  const upVote = async (isUpVote: boolean) => {
    if (!session) {
      return toast.error('You must be logged in order to vote')
    }

    // ! if already voted
    if (vote && isUpVote) return
    // if (vote === false && isUpVote) return
    console.log('Voting', isUpVote)

    try {
      await addVote({
        variables: {
          post_id: post.id,
          upvote: isUpVote,
          username: session?.user?.name,
        },
      })
    } catch (error) {
      toast.error('Something went wrong')
      console.log(error)
    }
    toast.success('Voted')
  }

  // //! Loading render
  if (!post)
    return (
      <div className="mt-10 w-full space-y-5">
        <SkeletonTheme highlightColor="#121212" baseColor="#121212">
          <Skeleton
            className="my-5 shadow-xl"
            width={'100%'}
            height={500}
            count={2}
            baseColor="#232628"
          />
        </SkeletonTheme>
      </div>
    )
  return (
    <div className={styles.wrapper}>
      {/* Votes */}
      <div className={styles.Votes}>
        <ArrowUpIcon
          onClick={() => upVote(true)}
          className={`voteButtons hover:text-red-400 ${vote && 'text-red-400'}`}
        />
        {/* Initial vote in 0 */}
        <p>{displayVotes(data)}</p>
        <ArrowDownIcon
          onClick={() => upVote(false)}
          className="voteButtons hover:text-purple-400"
        />
      </div>
      <Link href={`post/${post.id}`}>
        <div className="p-3 pb-1">
          {/* Post Header */}

          <div className="flex items-center space-x-3">
            <Avatar seed={post?.subreddit[0]?.topic} />
            <p className="text-xs text-gray-100">
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
              <p className="text-gray-400" key={idx}>
                {line}
              </p>
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
      </Link>
    </div>
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
