import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    surveys: [Survey!]! @auth
  }

  extend type Mutation {
    saveSurveyResult(surveyId: String!, answer: String!): SurveyResult! @auth 
  }

  type Survey {
    id: ID!
    question: String!
    answers: [SurveyAnswer!]!
    date: String!
  }

  type SurveyAnswer {
    answer: String!
    image: String
  }   

  type SurveyResult {
    id: ID!
    surveyId: ID!
    accountId: ID!
    answer: String!
    date: String!
  }

`
