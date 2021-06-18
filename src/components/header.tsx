import * as React from 'react';

import { StaticImage } from 'gatsby-plugin-image';

import {
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';

// import { Link } from 'gatsby';

const Header = () => {
  return (
    <Navbar expand="lg">
      <Navbar.Brand href="/">
        <StaticImage
          src="../images/afroadiaspheretest.png"
          alt="A dinosaur"
          width={50}
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto my-2 my-lg-0 w-100 nav-fill">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/admin">Admin</Nav.Link>
          <NavDropdown title="Link" id="collapsible-nav-dropdown">
            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">
              Something else here
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="#" disabled>
            Link
          </Nav.Link>
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
