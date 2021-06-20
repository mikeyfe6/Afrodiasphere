import React from 'react';
import { IdentityProvider } from './src/context/identity-context';

import 'bootstrap/dist/css/bootstrap.min.css';

export const wrapRootElement = ({ element }) => (
  <IdentityProvider>{element}</IdentityProvider>
);
