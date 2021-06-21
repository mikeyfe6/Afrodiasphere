import * as React from 'react';

// import Layout from '../components/layout';
import SEO from '../components/seo';

import Pagina from '../components/pagina';

// styles

// data

// markup
const IndexPage = () => {
  return (
    // <Layout>
    <>
      <SEO
        title="Home"
        description="Afrodiasphere uit Amsterdam staat garant voor al uw sociale mediatering."
        keywords="afrodiapshere, test, wordpress, jatoch, halleluja, specialist"
      />
      <h1>Homepagina</h1>
      <p>Hier komt dan de voorpagina met info over bedrijven</p>
      <br />
      <Pagina />
      <br />
    </>
    // </Layout>
  );
};

export default IndexPage;
