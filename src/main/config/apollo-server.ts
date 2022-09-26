import { Express } from 'express'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './graphql/type-defs'
import resolvers from './graphql/resolvers'

export default async (app: Express): Promise <void > => {
  const server = new ApolloServer({
    resolvers,
    typeDefs
  })
  await server.start()
  server.applyMiddleware({ app })
}
