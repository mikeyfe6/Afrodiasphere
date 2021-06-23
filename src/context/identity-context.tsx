import React, { createContext, useState, useEffect } from 'react';

import * as netlifyIdentity from 'netlify-identity-widget';

const IdentityContext = createContext({});

const IdentityProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    netlifyIdentity.init({});

    // const nieuwtoch = localStorage.getItem('gotrue.user');

    // if (nieuwtoch) {
    //   setGebruiker(JSON.parse(nieuwtoch));
    // }
  }, [user]);
  netlifyIdentity.on('login', (loginUser) => {
    setUser(loginUser);
    console.log(loginUser);
    netlifyIdentity.close();
  });
  netlifyIdentity.on('logout', () => setUser());
  netlifyIdentity.close();

  return (
    <IdentityContext.Provider value={{ identity: netlifyIdentity, user }}>
      {children}
    </IdentityContext.Provider>
  );
};

export default IdentityContext;
export { IdentityProvider };
