import { useRouter } from 'next/router'
import React from 'react'
import Avatar from '../../components/Home/Post/Avatar'
import Feed from '../../components/Home/Post/Feed.component.'
import PostBox from '../../components/Home/Post/PostBox.component'

const Subreddit = () => {
  const {
    query: { topic },
  } = useRouter()

  return (
    <div className=" h-24 bg-green-400 p-6">
      <div className="-mx-8 mt-10 bg-[#181a1b]  ">
        {/* Avatar */}
        <div className="mx-auto flex max-w-5xl items-center space-x-4 pb-3">
          <div className="-mt-5">
            <Avatar large seed={topic as string} />
          </div>

          <div className="py-2 text-white">
            <span className="text-3xl font-semibold">
              Welcome to teh r/{topic} subreddit
            </span>
            <p className="text-gray-4 cursor-pointer text-sm">r/{topic}</p>
          </div>
        </div>
      </div>
      {/* Posts */}
      <div className="mx-auto mt-4 max-w-5xl pb-10">
        <PostBox subreddit={topic as string} />
        <Feed topic={topic as string} />
      </div>
    </div>
  )
}

export default Subreddit
