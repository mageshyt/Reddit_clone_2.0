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
  query GetAllPosts {
    getPostList {
      body
      title
      username
      created_at
      id
      image
      comments {
        created_at
        id
        post_id
        text
        username
      }
      subreddit {
        created_at
        id
        topic
      }
      votes {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`

//! get post by topic
export const GET_ALL_POSTS_BY_TOPIC = gql`
  query GetAllPosts($topic: String!) {
    getPostListByTopic(topic: $topic) {
      body
      title
      username
      created_at
      id
      image
      comments {
        created_at
        id
        post_id
        text
        username
      }
      subreddit {
        created_at
        id
        topic
      }
      votes {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`

//! get post by id
export const GET_ALL_POSTS_BY_ID = gql`
  query GetAllPosts($post_id: ID!) {
    getPostById(post_id: $post_id) {
      body
      title
      username
      created_at
      id
      image
      
      comments {
        created_at
        id
        post_id
        text
        username
      }
      subreddit {
        created_at
        id
        topic
      }
      votes {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`
