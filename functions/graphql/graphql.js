import { ApolloServer, gql } from 'apollo-server-lambda';

const typeDefs = gql`
  type Query {
    todos: [Todo]!
  }
  type Todo {
    id: ID!
    text: String!
    done: Boolean!
  }
  type Mutation {
    addTodo(text: String!): Todo
    updateTodoDone(id: ID!): Todo
  }
`;

const todos = {};
let todoIndex = 0;

const resolvers = {
  Query: {
    todos: () => {
      return Object.values(todos);
    },
  },
  Mutation: {
    addTodo: (_, { text }) => {
      todoIndex += 1;
      const id = `key-${todoIndex}`;
      todos[id] = { id, text, done: false };
      return todos[id];
    },
    updateTodoDone: (_, { id }) => {
      todos[id].done = true;
      return todos[id];
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,

  // playground
  playground: true,
  introspection: true,
});

export const handler = server.createHandler({
  cors: { origin: '*', credentials: true },
});
