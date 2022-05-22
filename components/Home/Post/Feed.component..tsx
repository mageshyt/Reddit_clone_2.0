import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_ALL_POSTS, GET_ALL_POSTS_BY_TOPIC } from '../../../graphql/queries'
import { Post } from '../../../typing'
import FeedPost from './FeedPost.component'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
interface Props {
  topic: string
}
const Feed = ({ topic }: Props) => {
  // console.log(topic)
  const { data, loading, error } = !topic
    ? useQuery(GET_ALL_POSTS)
    : useQuery(GET_ALL_POSTS_BY_TOPIC, {
        variables: {
          topic: topic,
        },
      })

  const posts: Post[] = !topic ? data?.getPostList : data?.getPostListByTopic
  if (loading)
    return (
      <div className="mt-10 w-full space-y-5">
        <SkeletonTheme baseColor="#ffffff">
          <Skeleton
            className="my-5 shadow-xl"
            width={'100%'}
            height={500}
            count={5}
          />
        </SkeletonTheme>
      </div>
    )
  return (
    <div className=" mt-4  h-full  p-4 xl:p-0">
      {posts?.map((post, idx) => (
        <FeedPost key={idx} post={post} />
      ))}
    </div>
  )
}

export default Feed
