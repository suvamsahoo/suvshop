import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../actions/cartActions";
import CheckoutSteps from "../Screens/CheckoutSteps";

export default function ShippingAddressScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!userInfo) {
    props.history.push("/signin");
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );
    props.history.push("/placeorder");
  };

  return (
    <div className="overflow-hidden">
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="col-md-6 offset-md-3">
        <form
          onSubmit={submitHandler}
          className="Margin10px TextAlign-Initial FontWeightBold"
        >
          <div className="form-group my-3">
            <label htmlFor="fullName" className="text-muted">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="form-control"
            ></input>
          </div>
          <div className="form-group my-3">
            <label htmlFor="address" className="text-muted">
              Address
            </label>
            <input
              type="text"
              id="address"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="form-control"
            ></input>
          </div>
          <div className="form-group my-3">
            <label htmlFor="city" className="text-muted">
              City
            </label>
            <input
              type="text"
              id="city"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="form-control"
            ></input>
          </div>
          <div className="form-group my-3">
            <label htmlFor="postalCode" className="text-muted">
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              placeholder="Enter postal code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
              className="form-control"
            ></input>
          </div>
          <div className="form-group my-3">
            <label htmlFor="country" className="text-muted">
              Country
            </label>
            <input
              type="text"
              id="country"
              placeholder="Enter country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className="form-control"
            ></input>
          </div>
          <div className="flexContainer">
            <button
              className="MenuBtn p-3 FontWeightBold m-2 width100per"
              type="submit"
              style={{ fontSize: "15px", color:"white" }}
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
