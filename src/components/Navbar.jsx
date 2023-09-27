import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap'; 
import { NavLink } from 'react-router-dom';
import './navbar.css';

function Barra() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="justify-content-center">
      <Container>
        <Navbar.Brand href="/">Navbar</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-center">
          <Nav className="me-auto">
            <NavLink className="navi" to='/about'>About</NavLink>
            <NavLink className="navi" to='/calendar'>Calendar</NavLink>
            <NavLink className="navi" to='/table'>Table</NavLink>
            <NavLink className="navi" to='/cliente'>Add Client</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Barra;
