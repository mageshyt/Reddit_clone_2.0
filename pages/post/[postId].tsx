import { useMutation, useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import FeedPost from '../../components/Home/Post/FeedPost.component'
import { GET_ALL_POSTS_BY_ID } from '../../graphql/queries'
import { Comments, Post } from '../../typing'
import { useForm, SubmitHandler } from 'react-hook-form'
import { ADD_COMMENT } from '../../graphql/mutations'
import toast, { Toaster } from 'react-hot-toast'
import Avatar from '../../components/Home/Post/Avatar'
import TimeAgo from 'react-timeago'


// !from data
interface FormData {
  comment: string
}

const PostPage = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  //! router
  const router = useRouter()

  const { data, loading, error } = useQuery(GET_ALL_POSTS_BY_ID, {
    variables: {
      post_id: router?.query?.postId,
    },
  })

  const posts: Post[] = data?.getPostById

  //! session user
  const { data: session } = useSession()
  //! to add comment
  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_ALL_POSTS_BY_ID, 'getPostById'],
  })
  //! onsubmit
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { comment } = data
    const postId = router.query.postId
    const notification = toast.loading('Posting Your comment...')

    try {
      await addComment({
        variables: {
          text: comment,
          post_id: postId,
          username: session?.user?.name,
        },
      })
      toast.success('Successfully posted your comment', {
        id: notification,
      })
      setValue('comment', '')
    } catch (error) {
      toast.error('Something went wrong', {
        id: notification,
      })
      console.log(error)
    }


  }

  return (
    <div className="mx-auto my-6 max-w-5xl p-4 lg:p-0">
      <Toaster />
      <FeedPost post={posts} />
      <div className="-mt-2 rounded-b-md border border-t-0 border-gray-300 bg-white p-5 pl-16">
        {!loading && (
          <>
            <p className="text-sm">
              comment as {' '}
              <span className="font-semibold text-sky-400">
                {session?.user?.name}
              </span>
            </p>
            {/* Comment */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center"
            >
              <textarea
                {...register('comment', { required: true })}
                className="h-24 w-full rounded-md border border-gray-300 p-2 pl-4 outline-none disabled:bg-gray-50"
                placeholder={
                  session
                    ? 'Write a comment...'
                    : 'You must be logged in to comment'
                }
                disabled={session ? false : true}
              />
              {/* Button to submit */}
              <button
                type="submit"
                disabled={session ? false : true}
                className=" w-full rounded-full bg-sky-400 p-2 px-3 text-white disabled:bg-red-400"
              >
                comment
              </button>
            </form>
          </>
        )}
      </div>
      {/* display the comments */}
      <div className=" -my-5 rounded-b-md  border border-t-0 bg-white py-10">
        <hr className="py-2" />
        {posts?.comments.map((comment: Comments, idx: number) => (
          <div
            key={idx}
            className=" relative flex items-center space-x-2 space-y-5"
          >
            {/* Connection line */}

            <hr className="absolute left-7 top-12 z-0 h-16 border " />

            {/* Avatar */}
            <div className="z-10">
              <Avatar seed={comment.username} />
            </div>
            {/* Comment */}
            <div className="flex flex-col items-start p-3">
              <p className="space-x-3 text-xs text-gray-400">
                <span className=" text-sm font-semibold">
                  {comment.username}
                </span>
                <TimeAgo
                  className="font-bold text-black"
                  date={comment?.created_at}
                />
              </p>
              <p className="text-sm">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostPage
