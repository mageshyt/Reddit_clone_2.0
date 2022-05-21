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
}

export type subreddit = {
  created_at: string
  id: number
  topic: string
}

export type Post = {
  image: string
  subreddit_id: number
  created_at: string
  id: number
  title: string
  username: string
  body: string
  votes: Vote[]
  comments: Comment[]
  subreddit: Subreddit[]
}
