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

//! to add comment
export const ADD_COMMENT = gql`
  mutation AddComment($post_id: ID!, $text: String!, $username: String!) {
    insertComment(post_id: $post_id, text: $text, username: $username) {
      id
      post_id
      text
      username
      created_at
    }
  }
`

//! upvote

export const ADD_VOTE = gql`
  mutation Upvote($post_id: ID!, $username: String!, $upvote: Boolean!) {
    insertVote(post_id: $post_id, username: $username, upvote: $upvote) {
      id
      post_id
      username
      upvote
    }
  }
`
