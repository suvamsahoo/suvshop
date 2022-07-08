import React, { useState } from "react";
import axios from "axios";
import MessageBox from "../MessageBox";
import SuccessMessage from "../SuccessMessage";

export default function Forgot() {
  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");
  const [values, setValues] = useState({
    email: "",
    buttonText: "Request password reset link",
  });

  const { email, buttonText } = values;

  const handleChange = (name) => (event) => {
    // console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/forgot-password`,
      data: { email },
    })
      .then((response) => {
        console.log("FORGOT PASSWORD SUCCESS", response);
        // alert(response.data.message);
        setValues({ ...values, buttonText: "Requested" });
        setFailureMessage("");
        setSuccessMessage(response.data.message);
      })
      .catch((error) => {
        console.log("FORGOT PASSWORD ERROR", error.response.data);
        // alert(error.response.data.error);
        setValues({ ...values, buttonText: "Request password reset link" });
        setSuccessMessage("");
        setFailureMessage(error.response.data.error);
      });
  };

  const passwordForgotForm = () => (
    <form className="Margin10px TextAlign-Initial FontWeightBold">
       {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      {failureMessage && <MessageBox>{failureMessage}</MessageBox>}
      <div className="form-group Margin10px_L0px">
        <span>
          Enter your user account's verified email address and we will send you
          a password reset link to your register email address.
        </span><br /><br />
        <label className="text-muted" style={{ marginBottom: "5px" }}>
          Email
        </label>
        <input
          onChange={handleChange("email")}
          value={email}
          type="email"
          className="form-control"
          placeholder="enter your email"
        />
      </div>

      <button className="btn btn-success Margin10px_L0px" onClick={clickSubmit}>
        {buttonText}
      </button>
    </form>
  );

  return (
    <div className="col-md-6 offset-md-3">
      <h1 className="p-5 text-center">Forgot password</h1>
      {passwordForgotForm()}
    </div>
  );
}
