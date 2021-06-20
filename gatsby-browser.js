import React from 'react';
import { IdentityProvider } from './src/context/identity-context';

import 'bootstrap/dist/css/bootstrap.min.css';

export const wrapRootElement = ({ element }) => (
  <IdentityProvider>{element}</IdentityProvider>
);

// export const onPreRouteUpdate = ({ location, prevLocation }) => {
//   console.log('new pathname', location.pathname);
//   console.log('old pathname', prevLocation ? prevLocation.pathname : null);
// };
