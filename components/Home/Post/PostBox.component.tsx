import { LinkIcon, PhotographIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import Avatar from './Avatar'
import { Button } from 'primereact/button'
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

const PostBox = () => {
  const { data: session } = useSession()
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
    console.log('Clicked')
    console.log({ formData })
  })
  return (
    <form onSubmit={onSubmitForm} className={styles.wrapper}>
      <div className={styles.mainContainer}>
        {/* Avatar */}
        <Avatar seed="magesh" />
        <input
          {...register('postTitle', { required: true })}
          type="text"
          disabled={!session}
          placeholder={
            session ? 'Create a post by entering the title' : 'Sign in to post'
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
          <div className={styles.InputContainer}>
            <p className={styles.InputsTitle}>Subreddit</p>
            <input
              {...register('subreddit', { required: true })}
              type="text"
              placeholder={'i.e next js'}
              className={styles.InputStyle}
            />
          </div>
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
