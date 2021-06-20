import { ApolloServer, gql } from 'apollo-server-lambda';

const typeDefs = gql`
  type Query {
    hello: string
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello World',
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,

  // playground
  playground: true,
  introspection: true,
});

export const handler = server.createHandler();
