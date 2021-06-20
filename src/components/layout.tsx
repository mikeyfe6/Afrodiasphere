import * as React from 'react';

import Header from './header';

import '../styles/layout.scss';

import { IdentityProvider } from '../context/identity-context';

export declare interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <IdentityProvider>
      <div className="container">
        <Header />
        <div style={{ width: '100%', height: '75px' }} />
        <div>{children}</div>
      </div>
    </IdentityProvider>
  );
};

export default Layout;
