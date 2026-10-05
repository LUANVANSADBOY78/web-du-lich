import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

function Header() {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">TravelTicket</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Trang chủ</Nav.Link>
            <Nav.Link as={Link} to="/tickets">Vé vui chơi</Nav.Link>
            <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
          </Nav>
          <Nav>
            <Button variant="outline-primary" as={Link} to="/login" className="d-flex align-items-center gap-2">
              <FaUserCircle /> Đăng nhập
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
