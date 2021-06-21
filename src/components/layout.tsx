import * as React from 'react';

import '../styles/layout.scss';

import Header from './header';

// import { IdentityProvider } from '../context/identity-context';

export declare interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <div className="container">
      <Header />
      <div style={{ width: '100%', height: '75px' }} />
      <div>{children}</div>
    </div>
  </>
);

export default Layout;
