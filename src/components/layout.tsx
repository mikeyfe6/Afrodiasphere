import * as React from 'react';

import '../styles/layout.scss';

import Header from './header';

import IdentityContext from '../context/identity-context';

export declare interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <IdentityContext.Consumer>
      {() => {
        return (
          <div className="container">
            <Header />
            <div style={{ width: '100%', height: '75px' }} />
            <div>{children}</div>
          </div>
          // </ApolloProvider>
        );
      }}
    </IdentityContext.Consumer>
  );
};

export default Layout;
