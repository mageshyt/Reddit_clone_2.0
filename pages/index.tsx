import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Home/Header/Header.component'
import Feed from '../components/Home/Post/Feed.component.'
import PostBox from '../components/Home/Post/PostBox.component'

const Home: NextPage = () => {
  return (
    <div className=" my-7 mx-auto max-w-5xl">
      <Head>
        <title>Reddit Clone</title>
      </Head>

      {/* Post box */}
      <PostBox  />

      <div className="flex h-full">
        {/* Feed */}
        <Feed />
      </div>
      {/* Sub reddit */}
    </div>
  )
}

export default Home
