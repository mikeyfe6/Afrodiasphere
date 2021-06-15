import React, { useState, useEffect } from 'react';

import moment from 'moment';
import 'moment/locale/nl';

// interface Props {}

import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';

import axios from 'axios';

const siteurl = 'https://cdn.contentful.com';

interface Post {
  fields: any;
  sys: any;
}

// const defaultProps = {
//   post: 21,
// };

const Pagina = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [images, setImages] = useState<Post[]>([]);
  // const [accup, setAccup] = useState<Post[]>([]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get(
          `${siteurl}/spaces/0ktrqgmkb077/environments/master/entries?access_token=oka2GP-0UuAUx1HA1SCxVVl8ZGeuwz1xqF1ZQQbhaMg&content_type=bedrijf`,
        );
        setPosts(res.data.items);
        setImages(res.data.includes.Asset);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // console.log(posts);
  // console.log(images);

  const postsWithImage = posts.map((post) => {
    return {
      ...post,
      img: images.find((img) => img.sys.id === post.fields.logo.sys.id), // or some relation between posts and images
    };
  });

  // console.log(postsWithImage);

  return (
    <CardDeck
      style={{
        display: 'flex',
      }}
    >
      {postsWithImage.map((post) => (
        <Card
          key={post.sys.id}
          style={{
            maxWidth: '18rem',
            margin: '0.5rem',
          }}
        >
          <Card.Img variant="top" src={post.img?.fields.file.url} />
          <Card.Body className="d-flex flex-column">
            <div className="mt-auto">
              <Card.Title>Naam: {post.fields.bedrijfsnaam}</Card.Title>
              <Card.Text>{post.fields.omschrijving}</Card.Text>
              <Card.Text>Tel: {post.fields.telefoon}</Card.Text>
            </div>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">
              Aangemaakt op {moment(post.fields.aangemaakt).format('LL')}
            </small>

            {post.fields.werkzaam ? <p>Particulier</p> : <p>Bedrijvelijk</p>}
          </Card.Footer>
        </Card>
      ))}
    </CardDeck>
  );
};

export default Pagina;
