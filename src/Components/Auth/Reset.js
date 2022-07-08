import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import axios from "axios";
import MessageBox from "../MessageBox";
import SuccessMessage from "../SuccessMessage";

export default function Reset(props) {
  // props.match from react router dom
  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");
  const [values, setValues] = useState({
    name: "",
    token: "",
    newPassword: "",
    buttonText: "Reset password",
  });

  useEffect(() => {
    let token = props.match.params.token;
    let { name } = jwt.decode(token);
    if (token) {
      setValues({ ...values, name, token });
    }
  }, []);

  const { name, token, newPassword, buttonText } = values;

  const handleChange = (event) => {
    setValues({ ...values, newPassword: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/reset-password`,
      data: { newPassword, resetPasswordLink: token },
    })
      .then((response) => {
        console.log("RESET PASSWORD SUCCESS", response);
        setValues({ ...values, buttonText: "Done" });
        alert(response.data.message);
        // setFailureMessage("");
        // setSuccessMessage(response.data.message);
        props.history.push("/signin");
      })
      .catch((error) => {
        console.log("RESET PASSWORD ERROR", error.response.data);
        // alert(error.response.data.error);
        setValues({ ...values, buttonText: "Reset password" });
        setSuccessMessage("");
        setFailureMessage(error.response.data.error);
      });
  };

  const passwordResetForm = () => (
    <form className="Margin10px TextAlign-Initial FontWeightBold">
       {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      {failureMessage && <MessageBox>{failureMessage}</MessageBox>}
      <div className="form-group Margin10px_L0px">
        <label className="text-muted" style={{ marginBottom: "5px" }}>Password</label>
        <input
          onChange={handleChange}
          value={newPassword}
          type="password"
          className="form-control"
          placeholder="type new password"
          required
        />
      </div>

     
        <button className="btn btn-success Margin10px_L0px" onClick={clickSubmit}>
          {buttonText}
        </button>
     
    </form>
  );

  return (
    <div className="col-md-6 offset-md-3">
      <h1 className="p-5 text-center">Hey {name}, Type your new password</h1>
      {passwordResetForm()}
    </div>
  );
}
