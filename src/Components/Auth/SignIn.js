import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../actions/userActions";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";

export default function SignIn(props) {
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const [values, setValues] = useState({
    email: "",
    password: "",
    buttonText: "Sign in",
  });

  const { email, password, buttonText } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const dispatch = useDispatch();
  const clickSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  const signinForm = () => (
    <form className="Margin10px TextAlign-Initial FontWeightBold">
      {loading && <LoadingBox></LoadingBox>}
      {error && <MessageBox>{error}</MessageBox>}
      <div className="form-group Margin10px_L0px">
        <label className="text-muted" style={{ marginBottom: "5px" }}>
          Email
        </label>
        <input
          onChange={handleChange("email")}
          value={email}
          type="email"
          className="form-control"
          placeholder="example@gmail.com"
        />
      </div>

      <div className="form-group Margin10px_L0px">
        <label className="text-muted " style={{ marginBottom: "5px" }}>
          Password
        </label>

        <input
          onChange={handleChange("password")}
          value={password}
          type="password"
          className="form-control"
          placeholder="enter password"
        />
      </div>

      <button className="btn btn-success Margin10px_L0px" onClick={clickSubmit}>
        {buttonText}
      </button>
    </form>
  );

  return (
    <div className="col-md-6 offset-md-3">
      <h1 className="p-5 text-center">Sign in</h1>
      {signinForm()}
      <div className="TextAlign-Initial Margin10px">
        <a href="/auth/password/forgot">Forgot Password ?</a>
        <br />
        <span>
          New to Amabze?&nbsp;<a href="/signup">Create an account</a>.
        </span>
      </div>
    </div>
  );
}
