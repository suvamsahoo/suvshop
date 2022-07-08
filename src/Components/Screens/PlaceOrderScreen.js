import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "../Screens/CheckoutSteps";

export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  if (!cart.shippingAddress.fullName) {
    props.history.push("/shipping");
  }

  if (!userInfo) {
    props.history.push("/signin");
  }

  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 500 ? toPrice(0) : toPrice(100);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = () => {
    // TODO: dispatch place order action
    alert("clicked");
  };
  return (
    <div className="overflow-hidden">
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="checkout-row top">
        <div className="COcol-2">
          <ul>
            <li>
              <div className="COcard p-3 m-2 TextAlign-Initial">
                <h3 className="lightBlack FontWeightBold">Delivery Address</h3>
                <hr />
                <p>
                  <strong>Name:</strong> {cart.shippingAddress.fullName}
                  <br />
                  <strong>Email:</strong> {userInfo.email}
                  <br />
                  <strong>Address: </strong> {cart.shippingAddress.address},
                  <br />
                  <strong>PIN code: </strong>
                  {cart.shippingAddress.postalCode}
                  <br />
                  <strong>City: </strong>
                  {cart.shippingAddress.city}
                  <br />
                  <strong>Country: </strong>
                  {cart.shippingAddress.country}
                  <br />
                </p>
              </div>
            </li>
            <li>
              <div className="COcard p-3 m-2 TextAlign-Initial">
                <h3 className="lightBlack FontWeightBold">Order Summary</h3>
                <hr />
                <ul>
                  {cart.cartItems.map((item) => (
                    <li key={item.product}>
                      <div className="checkout-row">
                        <div>
                          <Link to={`/items/${item.product}`}>
                            <img
                              src={item.image[0].location}
                              alt={item.name}
                              className="COsmall my-1"
                            ></img>
                          </Link>
                        </div>

                        <div>
                          <Link to={`/items/${item.product}`}>
                            <span className="font-bold">{item.name}</span>
                          </Link>
                        </div>

                        <div>
                          {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="COcol-1">
          <div className="COcard p-3 m-2">
            <ul>
              <li className="TextAlign-Initial">
                <h3 className="lightBlack FontWeightBold">Price Details</h3>
                <hr />
              </li>
              <li>
                <div className="checkout-row">
                  <div>Price</div>
                  <div>₹{cart.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="checkout-row">
                  <div>Shipping</div>
                  <div>₹{cart.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="checkout-row">
                  <div>GST</div>
                  <div>₹{cart.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="checkout-row">
                  <div>
                    <strong>Total Payable</strong>
                  </div>
                  <div>
                    {/* <strong>₹{cart.totalPrice.toFixed(2)}</strong> */}
                    <strong>₹{cart.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <li className="flexContainer">
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="MenuBtn p-3 FontWeightBold m-2 width100per"
                  disabled={cart.cartItems.length === 0}
                  style={{ fontSize: "15px", color: "white" }}
                >
                  Place Order
                </button>
              </li>
              {/* {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>} */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
