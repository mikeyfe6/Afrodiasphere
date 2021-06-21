import React from 'react';

import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

import 'bootstrap/dist/css/bootstrap.min.css';

import { IdentityProvider } from './src/context/identity-context';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://afrodiasphere.netlify.app/.netlify/functions/graphql',
  }),
});

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <IdentityProvider>{element}</IdentityProvider>
  </ApolloProvider>
);

// export const onPreRouteUpdate = ({ location, prevLocation }) => {
//   console.log('new pathname', location.pathname);
//   console.log('old pathname', prevLocation ? prevLocation.pathname : null);
// };
