import React, { useContext } from 'react';

import { Router, Link } from '@reach/router';
import { Button } from 'react-bootstrap';
import IdentityContext from '../context/identity-context';

// import Layout from '../components/layout';
import SEO from '../components/seo';

import Dashboard from '../components/dashboard';

// import Homepage from './index';
// import ErrorPage from './404';

// styles

// data

const SeoApp = ({ seoTitle }: string) => {
  return (
    <SEO
      title={seoTitle}
      description="Afrodiasphere uit Amsterdam staat garant voor al uw sociale mediatering."
      keywords="afrodiapshere, test, wordpress, jatoch, halleluja, specialist"
    />
  );
};

const DashLoggedOut = () => {
  const { gebruiker, identity: netlifyIdentity } = useContext(IdentityContext);

  return (
    <div>
      <span>Zorg dat je inlogt, anders zie je deze content niet!</span>

      {!gebruiker && (
        <Button
          variant="outline-warning"
          type="button"
          className="px-4 mx-4"
          onClick={() => {
            netlifyIdentity.open();
          }}
        >
          Log In
        </Button>
      )}
    </div>
  );
};

const App = () => {
  const { gebruiker } = useContext(IdentityContext);

  if (!gebruiker) {
    return (
      <>
        <SeoApp seoTitle="Niet ingelogd" />
        <Router>
          <DashLoggedOut path="/app" />
        </Router>
      </>
    );
  }
  return (
    <>
      <SeoApp seoTitle="Ingelogd" />
      <Router>
        <Dashboard path="/app" />
      </Router>
    </>
  );
};

export default App;
