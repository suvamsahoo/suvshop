import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import MessageBox from "../MessageBox";
import SuccessMessage from "../SuccessMessage";

export default function SignUp() {
  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    buttonText: "Submit",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState({});
  const [nameErr, setNameErr] = useState({});
  const [emailErr, setEmailErr] = useState({});
  const [passwordErr, setPasswordErr] = useState({});

  const formValidation = () => {
    const nameErr = {};
    const passwordErr = {};
    const emailErr = {};
    const confirmPasswordErr = {};

    let isValid = true;

    if (name === "") {
      nameErr.nameEmpty = "name can not be blank.";
      isValid = false;
    }
    if (name.trim().length > 10) {
      nameErr.nameLong = "name text is too long.";
      isValid = false;
    }
    if (email === "") {
      emailErr.nameEmpty = "email can not be blank.";
      isValid = false;
    }
    if (password.trim().length < 6) {
      passwordErr.numberLong = "length of password more then 5";
      isValid = false;
    }
    if (confirmPassword.trim().length < 6) {
      confirmPasswordErr.numberLong = "length of confirm password more then 5";
      isValid = false;
    }

    setNameErr(nameErr);
    setEmailErr(emailErr);
    setPasswordErr(passwordErr);
    setConfirmPasswordErr(confirmPasswordErr);
    return isValid;
  };

  const { name, email, password, buttonText } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();

    const isValid = formValidation();
    if (isValid) {
      if (password !== confirmPassword) {
        // alert("Password and confirm password are not match");
        setSuccessMessage("");
        setFailureMessage("Password and confirm password are not match");
      } else {
        setValues({ ...values, buttonText: "Submitting" });
        axios({
          method: "POST",
          url: `${process.env.REACT_APP_API}/signup`,
          data: { name, email, password },
        })
          .then((response) => {
            console.log("SIGNUP SUCCESS", response);
            setConfirmPassword("")
            setValues({
              ...values,
              name: "",
              email: "",
              password: "",
              buttonText: "Submitted",
            });
           
            // alert(response.data.message);
            setFailureMessage("");
            setSuccessMessage(response.data.message);
          })
          .catch((error) => {
            console.log("SIGNUP ERROR", error.response.data);
            setValues({ ...values, buttonText: "Submit" });
            // alert(error.response.data.error);
            setSuccessMessage("");
            setFailureMessage(error.response.data.error);
          });
      }
    }
  };

  const signupForm = () => (
    <form className="Margin10px TextAlign-Initial FontWeightBold">
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      {failureMessage && <MessageBox>{failureMessage}</MessageBox>}
      <div className="form-group Margin10px_L0px">
        <label className="text-muted" style={{ marginBottom: "5px" }}>
          Name
        </label>
        <input
          onChange={handleChange("name")}
          value={name}
          type="text"
          className="form-control"
          placeholder="enter name"
        />
        {Object.keys(nameErr).map((key) => {
          return (
            <div style={{ color: "red", fontWeight: "bold" }} key={key}>
              {nameErr[key]}
            </div>
          );
        })}
      </div>

      <div className="form-group Margin10px_L0px">
        <label className="text-muted" style={{ marginBottom: "5px" }}>
          Email
        </label>
        <input
          onChange={handleChange("email")}
          value={email}
          type="email"
          className="form-control"
          placeholder="enter email"
        />
        {Object.keys(emailErr).map((key) => {
          return (
            <div style={{ color: "red", fontWeight: "bold" }} key={key}>
              {emailErr[key]}
            </div>
          );
        })}
      </div>

      <div className="form-group Margin10px_L0px">
        <label className="text-muted" style={{ marginBottom: "5px" }}>
          Password
        </label>
        <input
          onChange={handleChange("password")}
          value={password}
          type="password"
          className="form-control"
          placeholder="enter password"
        />
        {Object.keys(passwordErr).map((key) => {
          return (
            <div style={{ color: "red", fontWeight: "bold" }} key={key}>
              {passwordErr[key]}
            </div>
          );
        })}
      </div>

      <div className="form-group Margin10px_L0px">
        <label className="text-muted" style={{ marginBottom: "5px" }}>
          Confirm Password
        </label>
        <input
          className="form-control"
          type="password"
          placeholder="enter confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></input>
        {Object.keys(confirmPasswordErr).map((key) => {
          return (
            <div style={{ color: "red", fontWeight: "bold" }} key={key}>
              {confirmPasswordErr[key]}
            </div>
          );
        })}
      </div>

      <button className="btn btn-success Margin10px_L0px" onClick={clickSubmit}>
        {buttonText}
      </button>
    </form>
  );

  return (
    <div className="col-md-6 offset-md-3">
      <h1 className="p-5 text-center">Sign up</h1>
      {signupForm()}
      <div className="TextAlign-Initial Margin10px">
        <span>
          Already have an account?&nbsp;
          <a href="/signin">Sign in</a>
        </span>
      </div>
    </div>
  );
}
