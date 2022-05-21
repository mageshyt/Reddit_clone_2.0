//! query ot fet subreddit_By_topic

import { gql } from '@apollo/client'

export const GET_SUBREDDIT_BY_TOPIC = gql`
  query GetSubredditByTopic($topic: String!) {
    getSubredditListByTopic(topic: $topic) {
      id
      topic
    }
  }
`

export const GET_ALL_POSTS = gql`
  query GetAllPosts($topic: String!) {
    getAllPosts(topic: $topic) {
      body
      created_at
      id
      image
      subreddit_id
      title
      username
    }
  }
`
