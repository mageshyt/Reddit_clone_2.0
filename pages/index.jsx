import { useQuery } from '@apollo/client'
import Head from 'next/head'
import Header from '../components/Home/Header/Header.component'
import Feed from '../components/Home/Post/Feed.component.'
import PostBox from '../components/Home/Post/PostBox.component'
import SubRedditRow from '../components/Home/Subreddit/SubRedditRow'
import { GET_SUBREDDIT_WITH_LIMIT } from '../graphql/queries'

const Home = () => {
  const { data } = useQuery(GET_SUBREDDIT_WITH_LIMIT, {
    variables: {
      limit: 10,
    },
  })
  const subreddit = data?.getSubredditListLimit
  return (
    <div className=" my-7 mx-auto max-w-5xl">
      <Head>
        <title>Reddit Clone</title>
      </Head>

      {/* Post box */}
      <PostBox />

      <div className="flex h-full">
        {/* Feed */}
        <Feed />
        {/* Top Communities */}
        <div className="sticky top-36 mx-5 mt-5 hidden h-fit min-w-[300px] rounded-md border-gray-300 bg-[#111213] lg:inline">
          <p className="text-md p-3 font-bold text-white">Top Communities</p>
          <div>
            {/* List by subreddit */}
            {subreddit?.map((sub, idx) => (
              <div key={idx}>
                <SubRedditRow topic={sub.topic} index={idx} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
