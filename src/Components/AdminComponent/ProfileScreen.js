import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import SuccessMessage from "../SuccessMessage";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [sellerLogo, setSellerLogo] = useState("");
  const [sellerDescription, setSellerDescription] = useState("");

  const [nameErr, setNameErr] = useState({});
  const [passwordErr, setPasswordErr] = useState({});

  const formValidation = () => {
    const nameErr = {};
    const passwordErr = {};

    let isValid = true;

    if (name.trim().length > 6) {
      nameErr.nameLong = "name text is too long.";
      isValid = false;
    }

    if (password.trim().length < 6 && password.trim() != "") {
      passwordErr.numberLong = "length of password more then 5";
      isValid = false;
    }

    setNameErr(nameErr);
    setPasswordErr(passwordErr);
    return isValid;
  };

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
      if (user.seller) {
        setSellerName(user.seller.name);
        setSellerLogo(user.seller.logo);
        setSellerDescription(user.seller.description);
      }
    }
  }, [dispatch, userInfo._id, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    if (isValid) {
      if (password !== confirmPassword) {
        alert("Password and Confirm Password Are Not Matched");
      } else {
        dispatch(
          updateUserProfile({
            userId: user._id,
            name,
            email,
            password,
            sellerName,
            sellerLogo,
            sellerDescription,
          })
        );
      }
    }
  };

  return (
    <div className="col-md-6 offset-md-3">
      <form
        className="Margin10px TextAlign-Initial FontWeightBold"
        onSubmit={submitHandler}
      >
        <h3 className="pt-4 FontWeightBold lightBlack">My Profile</h3>
        <hr />

        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <SuccessMessage variant="success">
                Profile Updated Successfully
              </SuccessMessage>
            )}
            <div className="form-group Margin10px_L0px">
              <label
                htmlFor="name"
                className="text-muted"
                style={{ marginBottom: "5px" }}
              >
                Name
              </label>
              <input
                id="name"
                className="form-control"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
              {Object.keys(nameErr).map((key) => {
                return (
                  <div style={{ color: "red", fontWeight: "bold" }} key={key}>
                    {nameErr[key]}
                  </div>
                );
              })}
            </div>
            <div className="form-group Margin10px_L0px">
              <label htmlFor="email" className="text-muted">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                className="form-control"
                value={email}
                disabled
              ></input>
            </div>
            <div className="form-group Margin10px_L0px">
              <label htmlFor="password" className="text-muted">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              {Object.keys(passwordErr).map((key) => {
                return (
                  <div style={{ color: "red", fontWeight: "bold" }} key={key}>
                    {passwordErr[key]}
                  </div>
                );
              })}
            </div>
            <div className="form-group Margin10px_L0px">
              <label htmlFor="confirmPassword" className="text-muted">
                confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Enter confirm password"
                className="form-control"
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>

            {user.isSeller && (
              <>
                <h3 className="pt-4 FontWeightBold lightBlack">
                  My seller profile
                </h3>
                <hr />
                <div className="form-group Margin10px_L0px">
                  <label htmlFor="sellerName" className="text-muted">
                    Seller Name
                  </label>
                  <input
                    className="form-control"
                    id="sellerName"
                    type="text"
                    placeholder="Enter Seller Name"
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                  ></input>
                </div>
                <div className="form-group Margin10px_L0px">
                  <label htmlFor="sellerLogo" className="text-muted">
                    Seller Logo
                  </label>
                  <input
                    className="form-control"
                    id="sellerLogo"
                    type="text"
                    placeholder="Enter Seller Logo"
                    value={sellerLogo}
                    onChange={(e) => setSellerLogo(e.target.value)}
                  ></input>
                </div>
                <div className="form-group Margin10px_L0px">
                  <label htmlFor="sellerDescription" className="text-muted">
                    Seller Description
                  </label>
                  <input
                    className="form-control"
                    id="sellerDescription"
                    type="text"
                    placeholder="Enter Seller Description"
                    value={sellerDescription}
                    onChange={(e) => setSellerDescription(e.target.value)}
                  ></input>
                </div>
              </>
            )}

            <button className="btn btn-success Margin10px_L0px" type="submit">
              Update
            </button>
          </>
        )}
      </form>
    </div>
  );
}
