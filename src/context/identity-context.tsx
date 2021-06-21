import React, { createContext, useState, useEffect } from 'react';

import * as netlifyIdentity from 'netlify-identity-widget';

const IdentityContext = createContext({});

// const IdentityOpen = () => {
//   netlifyIdentity.open();
// };

// const IdentityInit = () => {
//   netlifyIdentity.init({});
// };

const IdentityProvider = ({ children }) => {
  const [gebruiker, setGebruiker] = useState();

  useEffect(() => {
    netlifyIdentity.init({});

    // const nieuwtoch = localStorage.getItem('gotrue.user');

    // if (nieuwtoch) {
    //   setGebruiker(JSON.parse(nieuwtoch));
    // }
  }, []);
  netlifyIdentity.on('login', (waarde) => {
    setGebruiker(waarde);
    netlifyIdentity.close();
  });
  netlifyIdentity.on('logout', () => setGebruiker());
  netlifyIdentity.close();

  return (
    <IdentityContext.Provider value={{ identity: netlifyIdentity, gebruiker }}>
      {children}
    </IdentityContext.Provider>
  );
};

export default IdentityContext;
export { IdentityProvider };
