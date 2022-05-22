import { LinkIcon, PhotographIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import Avatar from './Avatar'

import { useMutation } from '@apollo/client'

import { ADD_POST, ADD_SUBREDDIT } from '../../../graphql/mutations'

import client from '../../../apollo-client'

import { GET_ALL_POSTS, GET_SUBREDDIT_BY_TOPIC } from '../../../graphql/queries'

import toast, { Toaster } from 'react-hot-toast'

const styles = {
  wrapper:
    ' sticky top-16 z-50 rounded-xl border border-gray-400 bg-white p-2 ',
  mainContainer: 'flex items-center space-x-3 ',
  TitleInput: 'pl- flex-1 rounded-md bg-gray-50 p-2 outline-none',
  //   ! style for input Container
  InputContainer: 'flex items-center px-2',
  InputsTitle: 'min-w-[90px]',
  // ! style for body and subreddit image input
  InputStyle: 'm-2 flex-1 bg-blue-50  p-2 outline-none',
  Icon: 'h-6 cursor-pointer text-gray-400 hover:text-black',
  TextWarning: 'text-red-500',
}

//! data going to be sent to the server and form
interface FormData {
  postTitle: string
  postBody: string
  subreddit: string
  postImage: string
}

interface Props {
  subreddit: string
}

const PostBox = ({ subreddit }: Props) => {
  //! for tost

  //! session
  const { data: session } = useSession()
  //! mutation
  const [createPost] = useMutation(ADD_POST, {
    refetchQueries: [GET_ALL_POSTS, 'getPostList'],
  })
  const [addSubreddit] = useMutation(ADD_SUBREDDIT)
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()

  //   ! to keep track of image box
  const [imageBox, setImageBox] = React.useState(false)

  //! to handle submit

  const onSubmitForm = handleSubmit(async (formData) => {
    //! success tost
    const post_notification = toast.loading('creating post...')
    try {
      //! query for subreddit topic
      const { data: getSubredditListByTopic } = await client.query({
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: {
          topic: subreddit || formData.subreddit,
        },
      })
      const Is_SubReddit_exist =
        getSubredditListByTopic.getSubredditListByTopic.length > 0
      if (!Is_SubReddit_exist) {
        //! if not exist then create it
        console.log('subreddit not exist so we are creating')

        const {
          data: { insertSubReddit: newSubreddit },
        } = await addSubreddit({
          variables: {
            topic: formData.subreddit,
          },
        })

        const image = formData.postImage || ''
        console.log({ newSubreddit })

        const {
          data: { insertPost: newPost },
        } = await createPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: newSubreddit?.id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        })
        console.log('new post', newPost)
        //! after post added
        toast.success('post added successfully', {
          id: post_notification,
        })
      } else {
        //! if exist then create it
        console.log('subreddit exist so we are creating')
        const image = formData.postImage || ''

        const {
          data: { insertPost: newPost },
        } = await createPost({
          variables: {
            title: formData.postTitle,
            body: formData.postBody,
            image,
            subreddit_id: getSubredditListByTopic.getSubredditListByTopic[0].id,
            username: session?.user?.name,
          },
        })
        console.log('new post', newPost)
      }
      //! after post added
      setValue('postTitle', '')
      setValue('postBody', '')
      setValue('subreddit', '')
      setValue('postImage', '')
      setImageBox(false)
      //! after post added
      toast.success('post added successfully', {
        id: post_notification,
      })
    } catch (error) {
      //! to handle errors
      toast.error('oops something went wrong', {
        id: post_notification,
      })
      console.log(error)
    }
  })
  return (
    <form onSubmit={onSubmitForm} className={styles.wrapper}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={styles.mainContainer}>
        {/* Avatar */}
        <Avatar seed="magesh" />
        <input
          {...register('postTitle', { required: true })}
          type="text"
          disabled={!session}
          placeholder={
            session
              ? subreddit
                ? ` Create a post in r/${subreddit}`
                : 'Create a post by entering the title'
              : 'Sign in to post'
          }
          className={styles.TitleInput}
        />

        {/* to insert image and to add url */}
        <PhotographIcon
          onClick={() => setImageBox(true)}
          className={`${styles.Icon} ${imageBox && 'text-blue-400'}`}
        />
        <LinkIcon className={`${styles.Icon} ${imageBox && 'text-blue-400'}`} />
      </div>

      {!!watch('postTitle') && (
        <div className="flex flex-col space-y-4 py-3">
          {/* Body */}
          <div className={styles.InputContainer}>
            <p className={styles.InputsTitle}>Body</p>

            <input
              {...register('postBody', { required: true })}
              type="text"
              placeholder={'Text'}
              className={styles.InputStyle}
            />
          </div>

          {/* Subreddit */}
          {!subreddit && (
            <div className={styles.InputContainer}>
              <p className={styles.InputsTitle}>Subreddit</p>
              <input
                {...register('subreddit', { required: true })}
                type="text"
                placeholder={'i.e next js'}
                className={styles.InputStyle}
              />
            </div>
          )}
          {/* Image */}
          {imageBox ? (
            <div className={styles.InputContainer}>
              <p className={styles.InputsTitle}>Image Url</p>
              <input
                {...register('postImage', { required: true })}
                type="text"
                placeholder={'Image'}
                className={styles.InputStyle}
              />
            </div>
          ) : null}
          {/* //! Error message */}
          {Object.keys(errors).length > 0 && (
            <div>
              {errors.subreddit && (
                <p className={styles.TextWarning}>- Subreddit Required</p>
              )}
            </div>
          )}

          {/* Submit */}
          {!!watch('postTitle') && (
            <button
              className="rounded-xl bg-blue-400 p-2 text-white"
              type="submit"
            >
              Create post
            </button>
          )}
        </div>
      )}
    </form>
  )
}

export default PostBox
