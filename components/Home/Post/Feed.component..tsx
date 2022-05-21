import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_ALL_POSTS } from '../../../graphql/queries'
import { Post } from '../../../typing'
import FeedPost from './FeedPost.component'

const Feed = () => {
  const { data, error } = useQuery(GET_ALL_POSTS)
  console.log({ data, error })
  const posts: Post[] = data?.getPostList
  return (
    <div>
      {posts?.map((post, idx) => (
        <FeedPost key={idx} post={post} />
      ))}
    </div>
  )
}

export default Feed
