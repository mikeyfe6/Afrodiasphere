const { ApolloServer, gql } = require('apollo-server-lambda');

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
    todos: (parents, args, { user }) => {
      if (!user) {
        return [];
      }
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

  context: ({ context }) => {
    if (context.clientContext.user) {
      return { user: context.clientContext.user.sub };
    }
    return {};
  },

  // playground
  playground: true,
  introspection: true,
});

exports.handler = server.createHandler({
  cors: { origin: '*', credentials: true },
});
