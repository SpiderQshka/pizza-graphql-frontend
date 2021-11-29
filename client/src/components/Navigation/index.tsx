import { FC, useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

export const Navigation: FC = () => {
  const history = useHistory();
  const [currentLocation, setCurrentLocation] = useState(history.location.pathname);

  useEffect(() => {
    return history.listen(({ pathname }) => {
      setCurrentLocation(pathname);
    });
  }, [history]);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>React Pizza</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" active={currentLocation === "/"}>
              Pizzas
            </Nav.Link>
            <Nav.Link as={Link} to="/cart" active={currentLocation === "/cart"}>
              Cart
            </Nav.Link>
            <Nav.Link as={Link} to="/orders" active={currentLocation === "/orders"}>
              Orders
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
