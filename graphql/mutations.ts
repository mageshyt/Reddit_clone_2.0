import { gql } from '@apollo/client'

export const ADD_POST = gql`
  mutation AddPost(
    $body: String!
    $image: String!
    $subreddit_id: String!
    $title: String!
    $username: String!
  ) {
    insertPost(
      body: $body
      image: $image
      subreddit_id: $subreddit_id
      title: $title
      username: $username
    ) {
      id
      body
      image
      subreddit_id
      title
      username
    }
  }
`

export const ADD_SUBREDDIT = gql`
  mutation AddSubreddit($topic: String!) {
    insertSubReddit(topic: $topic) {
      id
      topic
      created_at
    }
  }
`
