import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Home/Header/Header.component'
import PostBox from '../components/Home/Post/PostBox.component'

const Home: NextPage = () => {
  return (
    <div className=" my-7 mx-auto max-w-5xl">
      <Head>
        <title>Reddit Clone</title>
      </Head>

      {/* Post box */}
      {/* <main className="mx-auto max-w-4xl"> */}
      <PostBox />
      {/* </main> */}

      {/* Feed */}
      {/* Sub reddit */}
    </div>
  )
}

export default Home
