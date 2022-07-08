import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import Rating from "../ItemsComponent/Rating";
import { listItem } from "../../actions/itemActions";
import { detailsUser } from "../../actions/userActions";
import CardScreen from "../HomeComponent/CardScreen";

export default function SellerScreen(props) {
  const sellerId = props.match.params.id;
  const [sellerName, setSellerName] = React.useState(null);
  const [sellerEmail, setSellerEmail] = React.useState(null);
  const [sellerDescription, setSellerDescription] = React.useState(null);
  const [sellerLogo, setSellerLogo] = React.useState(null);

  // const userDetails = useSelector((state) => state.userDetails);
  // const { loading, error, user } = userDetails;

  const itemList = useSelector((state) => state.itemList);
  const { loading: loadingProducts, error: errorProducts, products } = itemList;

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(detailsUser(sellerId));
    dispatch(listItem({ seller: sellerId }));

    fetch(`${process.env.REACT_APP_API}/seller/${sellerId}`)
      .then((results) => results.json())
      .then((data) => {
        setSellerName(data.sellerInfo.name);
        setSellerDescription(data.sellerInfo.description);
        setSellerLogo(data.sellerInfo.logo);
        setSellerEmail(data.sellerEmail);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch, sellerId]);

  return (
    <>
      {/* {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="my-4">
          <div className="flexContainer alignCenterJustifyCenter">
            <img
              src={user.seller.logo}
              style={{ width: "200px" }}
              className="BS4"
            />
            <div className="TextAlign-Initial p-3">
              <h5 className="FontWeightBold">{user.seller.name}</h5>
              <Rating
                rating={user.seller.rating}
                numReviews={user.seller.numReviews}
              ></Rating>
              <a href={`mailto:${user.email}`}>
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
          <p className="p-2 CenterBody hyphens-auto">
            {user.seller.description}
          </p>
        </div>
      )} */}

      {sellerName && sellerEmail ? (
        <div className="my-4">
          <div className="flexContainer alignCenterJustifyCenter">
            <img src={sellerLogo} style={{ width: "200px" }} className="BS4" />
            <div className="TextAlign-Initial p-3">
              <h5 className="FontWeightBold">{sellerName}</h5>
              {/* <Rating
                rating={user.seller.rating}
                numReviews={user.seller.numReviews}
              ></Rating> */}
              <a href={`mailto:${sellerEmail}`}>
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
          <div className="CenterBody p-2 hyphens-auto">{sellerDescription}</div>
        </div>
      ) : (
        <>
          <LoadingBox></LoadingBox>
          <MessageBox variant="danger">No Seller</MessageBox>
        </>
      )}

      {loadingProducts ? (
        <LoadingBox></LoadingBox>
      ) : errorProducts ? (
        <MessageBox variant="danger">{errorProducts}</MessageBox>
      ) : (
        <>
          {products.length === 0 ? (
            <MessageBox>No Product Found</MessageBox>
          ) : (
            <div className="CenterBody">
              {products.map((product) => (
                <CardScreen key={product._id} menu={product}></CardScreen>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
