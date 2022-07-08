import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { signout } from "../actions/userActions";
import HomeSearchBox from "./HomeComponent/HomeSearchBox";

export default function Header() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <div className="headerFix">
      <HomeSearchBox />
      <Navbar
        collapseOnSelect
        expand="lg"
        // bg="light"
        variant="light"
        style={{ padding: "0", zIndex: "200" }}
      >
        <Container>
          <Navbar.Brand href="/">
            <img
              src="https://i.postimg.cc/bJnD20mD/logo1.png"
              className="logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
              <Nav.Link href="/items">Products</Nav.Link>
              <Nav.Link href="/brands">Brands</Nav.Link>
              <NavDropdown
                title={<span>More</span>}
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item href="/more1">more1</NavDropdown.Item>
                <NavDropdown.Item href="/more2">more2</NavDropdown.Item>
                <NavDropdown.Item href="/more3">more3</NavDropdown.Item>
                <NavDropdown.Item href="/more4">more4</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="/cart">
                <i className="fas fa-cart-plus"></i>&nbsp;&nbsp;
                {cartItems.length > 0 && (
                  <span className="cartLength">{cartItems.length}</span>
                )}
              </Nav.Link>
              {userInfo ? (
                <NavDropdown
                  title={<span>{userInfo.name}</span>}
                  id="collasible-nav-dropdown"
                  className="NAV-ITEM"
                >
                  {/* <NavDropdown.Item href="/profile">Profile</NavDropdown.Item> */}
                  <NavDropdown.Item
                    // as={Link}
                    href="#signout"
                    onClick={signoutHandler}
                  >
                    Sign Out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavDropdown
                  title={
                    <span>
                      <i className="fas fa-user"></i>
                    </span>
                  }
                  id="collasible-nav-dropdown"
                  className="NAV-ITEM"
                >
                  <NavDropdown.Item href="/signin">signin</NavDropdown.Item>
                  <NavDropdown.Item href="/signup">signup</NavDropdown.Item>
                </NavDropdown>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  title="Admin"
                  id="collasible-nav-dropdown"
                  className="navItem"
                >
                  <NavDropdown.Item href="/itemslist">
                    Items List
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
