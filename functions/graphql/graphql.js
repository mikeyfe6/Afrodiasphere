const { ApolloServer, gql } = require('apollo-server-lambda');
const faunadb = require('faunadb');

const q = faunadb.query;

const client = new faunadb.Client({ secret: process.env.GATSBY_FAUNADB });

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

const resolvers = {
  Query: {
    todos: async (parents, args, { user }) => {
      if (!user) {
        return [];
      }
      const results = await client.query(
        q.Paginate(q.Match(q.Index('todos_by_user'), user)),
      );
      return results.data.map(([ref, text, done]) => ({
        id: ref.id,
        text,
        done,
      }));
    },
  },

  Mutation: {
    addTodo: async (_, { text }, { user }) => {
      if (!user) {
        throw new Error('voer ieks goeds in man');
      }
      const results = await client.query(
        q.Create(q.Collection('todos'), {
          data: { text, done: false, owner: user },
        }),
      );

      return {
        ...results.data,
        id: results.ref.id,
      };
    },

    updateTodoDone: async (_, { id }, { user }) => {
      if (!user) {
        throw new Error('voer ieks goeds in man ali boalowii');
      }
      const results = await client.query(
        q.Update(q.Ref(q.Collection('todos'), id), { data: { done: true } }),
      );
      return {
        ...results.data,
        id: results.ref.id,
      };
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
