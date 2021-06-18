import * as React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

// import Pagina from '../components/pagina';

// styles

// data

// markup
const AdminPage = () => {
  return (
    <Layout>
      <SEO
        title="Admin"
        description="Hier kan je alles bewerken enzo"
        keywords="afrodiapshere, test, wordpress, jatoch, halleluja, specialist"
      />
      <h1>Admin pagina</h1>
      <p>Hier komt dan de adminpagina waar je je voorpagina kan wijzigen</p>
      <small>en alle ish</small>
    </Layout>
  );
};

export default AdminPage;
