// import "bootstrap/dist/css/bootstrap.min.css";
import { Breakpoint, BreakpointProvider } from "react-socks";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import useDropdownMenu from "react-accessible-dropdown-menu-hook";

const ResponsiveHeader = () => {
  return (
    <>
      <div>
        <Breakpoint customQuery="(min-width: 500px)">
          <div>
            <Navbar bg="light" expand="lg">
              <Container fluid>
                <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                  <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: "100px" }}
                    navbarScroll
                  >
                    <Nav.Link href="#action1">Home</Nav.Link>
                    <Nav.Link href="#action2">Link</Nav.Link>

                    <NavDropdown
                      title="this is not new "
                      id="navbarScrollingDropdown"
                    >
                      <NavDropdown.Item
                        href="#action3"
                        style={{ color: "black" }}
                      >
                        Action
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="#action4"
                        style={{ color: "black" }}
                      >
                        Another action
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item
                        href="#action5"
                        style={{ color: "black" }}
                      >
                        Something else here
                      </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#" disabled>
                      Link
                    </Nav.Link>
                  </Nav>
                  <Form className="d-flex">this is new</Form>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>
        </Breakpoint>

        <Breakpoint customQuery="(max-width: 500px)">
          <div style={{ backgroundColor: "yellow" }}>
            Custom breakpoint: (max-width : 1000px)
          </div>
        </Breakpoint>
      </div>
    </>
  );
};
export default ResponsiveHeader;
