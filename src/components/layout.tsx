import * as React from 'react';

import Header from './header';

import '../styles/layout.scss';

export declare interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <div className="container">
    <Header />
    <div style={{ width: '100%', height: '75px' }} />
    <main>{children}</main>
  </div>
);

export default Layout;
