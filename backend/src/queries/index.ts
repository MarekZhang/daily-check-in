import { gql } from "@apollo/client/core";

export const userPublicProfile = gql`
  query userPublicProfile($username: String!) {
    matchedUser(username: $username) {
      username
      githubUrl
      twitterUrl
      linkedinUrl
      profile {
        userAvatar
        realName
      }
    }
  }
`.loc?.source.body;

export const allTimeSubmission = gql`
  query userProblemsSolved($username: String!) {
    matchedUser(username: $username) {
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
  }
`.loc?.source.body;

export const recentSubmission = gql`
  query recentAcSubmissions($username: String!, $limit: Int!) {
    recentAcSubmissionList(username: $username, limit: $limit) {
      id
      title
      titleSlug
      timestamp
    }
  }
`.loc?.source.body;
