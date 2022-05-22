export type Comments = {
  created_at: string
  id: number
  post_id: number
  text: string
  username: string
}

export type Vote = {
  created_at: string
  id: number
  post_id: number
  text: string
  username: string
  upvote: boolean
}

export type subreddit = {
  created_at: string
  id: number
  topic: string
}

export interface Post {
  image: string
  subreddit_id: number
  created_at: string
  id: number
  image: string
  title: string
  username: string
  body: string
  votes: Vote[]
  comments: Comments[]
  subreddit: Subreddit[]
}
