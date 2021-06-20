import React, { useContext } from 'react';
import { Link } from 'gatsby';

import { StaticImage } from 'gatsby-plugin-image';

import {
  Nav,
  Navbar,
  // NavDropdown,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';

import IdentityContext, { IdentityOpen } from '../context/identity-context';

const Header = () => {
  const { gebruiker } = useContext(IdentityContext);
  console.log(gebruiker);

  return (
    <Navbar expand="lg">
      <Navbar.Brand href="/">
        <StaticImage
          src="../images/afroadiaspheretest.png"
          alt="A dinosaur"
          width={50}
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      {/* mr-auto my-2 my-lg-0 nav-fill w-100 */}
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="w-100">
          <Nav.Link as={Link} to="/" className="px-4 mx-4">
            Home
          </Nav.Link>

          <Nav.Link as={Link} to="/app" className="px-4 mx-4">
            App
          </Nav.Link>

          {/* <Nav.Link
            as={Button}
            className="px-4 mx-4"
            style={{
              backgroundColor: '#cc9932',
              border: 'none',
              color: 'white',
            }}
            onClick={(event) => {
              event.preventDefault();
              IdentityOpen();
              // logout(() => navigate(`/app/login`));
            }}
          >
            Login / Logout
          </Nav.Link> */}

          {gebruiker ? (
            <Nav.Link
              as={Button}
              to="/"
              className="px-4 mx-4"
              style={{
                backgroundColor: '#cc9932',
                border: 'none',
                color: 'white',
              }}
              onClick={(event) => {
                event.preventDefault();
                IdentityOpen();
              }}
            >
              Logout
            </Nav.Link>
          ) : (
            <Nav.Link
              as={Button}
              to="/"
              className="px-4 mx-4"
              onClick={(event) => {
                event.preventDefault();
                IdentityOpen();
              }}
              style={{
                backgroundColor: '#cc9932',
                border: 'none',
                color: 'white',
              }}
            >
              Login
            </Nav.Link>
          )}

          {gebruiker && (
            <Nav.Link href="#!" disabled>
              {gebruiker.user_metadata.full_name}
            </Nav.Link>
          )}

          {/* <NavDropdown
            title="Link"
            id="collapsible-nav-dropdown"
            className="px-5 mx-5"
          >
            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">
              Something else here
            </NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="mx-2"
            aria-label="Search"
          />
          <Button variant="dark">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
