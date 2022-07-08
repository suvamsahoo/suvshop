import logo from "./logo.svg";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch, Link } from "react-router-dom";
import "./Components/ScreenContainer.css";
import AdminRoute from "././Components/AdminRoute";
import PrivateRoute from "././Components/PrivateRoute";
import Footer from "./Components/Footer";
import HomeScreen from "./Components/HomeComponent/HomeScreen";
import SignUp from "./Components/Auth/SignUp";
import SignIn from "./Components/Auth/SignIn";
import Activate from "./Components/Auth/Activate";
import Forgot from "./Components/Auth/Forgot";
import Reset from "./Components/Auth/Reset";
import ItemListScreen from "./Components/AdminComponent/ItemListScreen";
import ItemEditListScreen from "./Components/AdminComponent/ItemEditListScreen";
import ItemsScreen from "./Components/ItemsComponent/ItemsScreen";
import ItemScreen from "./Components/ItemsComponent/ItemScreen";
import CartScreen from "./Components/Screens/CartScreen";
import { signout } from "./actions/userActions";
import HomeSearchBox from "./Components/HomeComponent/HomeSearchBox";
import SearchScreen from "./Components/Screens/SearchScreen";
import {
  listItemAvailablePlace,
  listItemCategories,
} from "./actions/itemActions";
import LoadingBox from "./Components/LoadingBox";
import MessageBox from "./Components/MessageBox";
import ProfileScreen from "./Components/AdminComponent/ProfileScreen";
import UserListScreen from "./Components/AdminComponent/UserListScreen";
import UserEditScreen from "./Components/AdminComponent/UserEditScreen";
import SellerRoute from "./Components/SellerRoute";
import SellerScreen from "./Components/Screens/SellerScreen";
import ShippingAddressScreen from "./Components/Screens/ShippingAddressScreen";
import PlaceOrderScreen from "./Components/Screens/PlaceOrderScreen";
import BrandsScreen from "./Components/ItemsComponent/BrandsScreen";
import BrandScreen from "./Components/ItemsComponent/BrandScreen";
import BrandCategorie from "./Components/ItemsComponent/BrandCategorie";
import HomeSearchLocationBox from "./Components/HomeComponent/HomeSearchLocationBox";
import ProductScreen from "./Components/Screens/ProductScreen";

function App() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const itemCategoryList = useSelector((state) => state.itemCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = itemCategoryList;

  useEffect(() => {
    dispatch(listItemCategories());
    dispatch(listItemAvailablePlace());
  }, [dispatch]);

  return (
    <div className="App">
      <div className="SCREEN-CONTAINER">
        {/* header start */}
        <div className="headerFix">
          <Route
            render={({ history }) => (
              <>
                <HomeSearchBox history={history}></HomeSearchBox>
                {/* <HomeSearchLocationBox
                  history={history}
                ></HomeSearchLocationBox> */}
              </>
            )}
          ></Route>

          <Navbar
            collapseOnSelect
            expand="lg"
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
                  <Nav.Link onClick={() => setSidebarIsOpen(true)}>
                    <i className="fas fa-bars" />
                    &nbsp;All
                  </Nav.Link>
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
                      <NavDropdown.Item href="/profile">
                        Profile
                      </NavDropdown.Item>
                      <NavDropdown.Item
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

                  {userInfo && userInfo.isSeller && (
                    <NavDropdown
                      title="Seller"
                      id="collasible-nav-dropdown"
                      className="navItem"
                    >
                      <NavDropdown.Item href="/itemslist/seller">
                        Products
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/orderlist/seller">
                        Orders
                      </NavDropdown.Item>
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
                      <NavDropdown.Item href="/userslist">
                        Users List
                      </NavDropdown.Item>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        {/* header end */}

        <aside className={sidebarIsOpen ? "open" : ""}>
          <ul className="categories p-1 overflow-hidden">
            <li>
              <strong>Categories</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="px-2"
                type="button"
              >
                <i className="fas fa-times"></i>
              </button>
            </li>

            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                    className="lightBlack"
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>

        <div className="MAIN">
          <Switch>
            <Route path="/signup" component={SignUp}></Route>
            <Route path="/signin" component={SignIn}></Route>
            <Route
              path="/auth/activate/:token"
              exact
              component={Activate}
            ></Route>
            <Route
              path="/auth/password/forgot"
              exact
              component={Forgot}
            ></Route>
            <Route
              path="/auth/password/reset/:token"
              exact
              component={Reset}
            ></Route>

            <Route path="/items" exact component={ItemsScreen}></Route>
            <Route path="/items/:id" component={ItemScreen} exact></Route>
            <Route
              path="/items/:id/edit"
              component={ItemEditListScreen}
              exact
            ></Route>
            <AdminRoute
              path="/itemslist"
              component={ItemListScreen}
              exact
            ></AdminRoute>
            <SellerRoute
              path="/itemslist/seller"
              component={ItemListScreen}
            ></SellerRoute>

            <Route path="/cart/:id?" component={CartScreen}></Route>

            <Route
              path="/search/name/:name?"
              component={SearchScreen}
              exact
            ></Route>
            <Route
              path="/search/category/:category"
              component={SearchScreen}
              exact
            ></Route>
            {/* <Route
              path="/search/availablePlace/:availablePlace"
              component={SearchScreen}
              exact
            ></Route> */}
            <Route
              path="/search/category/:category/name/:name"
              component={SearchScreen}
              exact
            ></Route>
            <Route
              path="/search/category/:category/name/:name/rating/:rating"
              component={SearchScreen}
              exact
            ></Route>
            <Route
              path="/search/category/:category/name/:name/rating/:rating/availablePlace/:availablePlace"
              component={SearchScreen}
              exact
            ></Route>

            <PrivateRoute
              path="/profile"
              component={ProfileScreen}
            ></PrivateRoute>
            <AdminRoute
              path="/userslist"
              component={UserListScreen}
            ></AdminRoute>
            <AdminRoute
              path="/user/:id/edit"
              component={UserEditScreen}
            ></AdminRoute>

            <Route path="/seller/:id" component={SellerScreen} exact></Route>
            <Route path="/shipping" component={ShippingAddressScreen}></Route>
            <Route path="/placeorder" component={PlaceOrderScreen}></Route>

            <Route path="/brands" exact component={BrandsScreen}></Route>
            <Route path="/brands/:id" component={BrandScreen} exact></Route>
            <Route
              path="/brands/:id/:id2"
              component={BrandCategorie}
              exact
            ></Route>



<Route path="/product/:id" component={ProductScreen}></Route>


            <Route path="/" exact component={HomeScreen}></Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
// https://www.smartmedicalbuyer.com/
