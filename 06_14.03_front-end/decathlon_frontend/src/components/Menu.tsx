import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <Navbar expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/">Kümnevõistlus</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/athletes">Sportlased</Nav.Link>
            <Nav.Link as={Link} to="/results">Tulemused</Nav.Link>
            <NavDropdown title="Admin" id="collapsible-nav-dropdown">
            <NavDropdown.Item as={Link} to="/admin/manage-athlete">Lisa / muuda sportlasi</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/admin/manage-result">Lisa / muuda tulemusi</NavDropdown.Item>
              {/* <NavDropdown.Item as={Link} to="/">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/login">Logi sisse</Nav.Link>
            <Nav.Link as={Link} to="/signup">Registreeri</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;