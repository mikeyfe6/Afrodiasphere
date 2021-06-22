/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */
const React = require('react');

const {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} = require('@apollo/client');

require('bootstrap/dist/css/bootstrap.min.css');

const netlifyIdentity = require('netlify-identity-widget');

const { setContext } = require('apollo-link-context');

const fetch = require('cross-fetch');

const { IdentityProvider } = require('./src/context/identity-context');

const Layout = require('./src/components/layout').default;

const authLink = setContext((_, { headers }) => {
  const user = netlifyIdentity.currentUser();
  const token = user.token.access_token;

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const httpLink = new HttpLink({
  uri: 'https://afrodiasphere.netlify.app/.netlify/functions/graphql',
  fetch,
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
);

exports.wrapPageElement = wrapPageElement;

const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <IdentityProvider>{element}</IdentityProvider>
  </ApolloProvider>
);

exports.wrapRootElement = wrapRootElement;

// export const onPreRouteUpdate = ({ location, prevLocation }) => {
//   console.log('new pathname', location.pathname);
//   console.log('old pathname', prevLocation ? prevLocation.pathname : null);
// };
