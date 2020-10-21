import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./TopBar.css";
import { withRouter } from "react-router-dom";

import { Form, FormControl, Button } from "react-bootstrap";

function TopBar({ location }) {
  const { pathname } = location;
  return (
    <>
      <Navbar className="nav_bar" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
        </Nav>
        {/* <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form> */}
      </Navbar>
      <br />
      {/* <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
        </Nav> */}
      {/* <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-light">Search</Button>
        </Form> */}
      {/* </Navbar> */}

      <br />
      {/* <Navbar bg="light" variant="light">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
        </Nav> */}
      {/* <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-primary">Search</Button>
        </Form> */}
      {/* </Navbar> */}
    </>
  );
}
export default withRouter(TopBar);
