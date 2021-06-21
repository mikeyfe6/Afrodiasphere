/* eslint-disable react/jsx-props-no-spreading */
const React = require('react');

const {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} = require('@apollo/client');

const fetch = require('node-fetch');

require('bootstrap/dist/css/bootstrap.min.css');

const { IdentityProvider } = require('./src/context/identity-context');

const Layout = require('./src/components/layout');

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://afrodiasphere.netlify.app/.netlify/functions/graphql',
    fetch,
  }),
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
