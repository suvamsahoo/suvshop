import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import MessageBox from "../MessageBox";
import { Link } from "react-router-dom";

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };
  return (
    <div className="flexContainer m-4" data-aos="fade-in">
      <div className="CartAllItems p-1">
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <Link to="/items">Order Now</Link>
          </MessageBox>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div className="cart-left" key={item.product}>
                <div style={{ marginRight: "10px" }}>
                  {item.image.length > 0 ? (
                    <img
                      src={item.image[0].location}
                      alt="cart product image"
                      className="COsmall"
                    ></img>
                  ) : (
                    <MessageBox>Empty Image</MessageBox>
                  )}
                </div>

                <div className="TextAlign-Initial">
                  <span>
                    <Link to={`/items/${item.product}`}>{item.name}</Link>
                  </span>
                  <div className="onerow">
                    <>
                      <span className="lightBlack">Quantity:&nbsp;</span>
                      <select
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </>
                    &nbsp;&nbsp;
                    <span className="lightBlack">
                      Price:&nbsp;₹{item.price}
                    </span>
                  </div>

                  <div className="CartRemoveBtn">
                    <div
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="TotalAmount p-2">
        <h3 className="FontWeightBold">
          Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : ₹
          {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
        </h3>

        {cartItems.length === 0 ? (
          <Link to={"/items"}>
            <button
              className="MenuBtn p-3 FontWeightBold m-2"
              style={{ fontSize: "18px", color: "white" }}
            >
              Continue Shopping
            </button>
          </Link>
        ) : (
          <>
            <button
              type="button"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
              className="MenuBtn p-3 FontWeightBold m-2"
              style={{ fontSize: "18px", color: "white" }}
            >
              Proceed to Checkout
            </button>
            <Link to={"/items"}>
              <button
                className="MenuBtn p-3 FontWeightBold m-2"
                style={{ fontSize: "18px", color: "white" }}
              >
                Continue Shopping
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
