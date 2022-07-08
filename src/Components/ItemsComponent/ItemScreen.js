import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createReview, detailsItem, listItem } from "../../actions/itemActions";
import { ITEM_REVIEW_CREATE_RESET } from "../../constants/itemConstants";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import Rating from "./Rating";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { Dropdown, DropdownButton, Modal } from "react-bootstrap";

export default function ItemScreen(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [clothMeasurement, setClothMeasurement] = useState("in");

  let relatedProducts;
  const dispatch = useDispatch();

  const [index, setIndex] = useState(0);
  const [qty, setQty] = useState(1);

  const productId = props.match.params.id;

  const itemList = useSelector((state) => state.itemList);
  const { loading: loadingItemList, error: errorItemList, products } = itemList;

  const itemDetails = useSelector((state) => state.itemDetails);
  const { loading, error, product } = itemDetails;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const itemReviewCreate = useSelector((state) => state.itemReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = itemReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (successReviewCreate) {
      window.alert("Review Submitted Successfully");
      setRating("");
      setComment("");
      dispatch({ type: ITEM_REVIEW_CREATE_RESET });
    }

    dispatch(detailsItem(productId));
    dispatch(listItem({}));
  }, [dispatch, productId, successReviewCreate]);

  if (products && product) {
    relatedProducts = products.filter(
      (pro) => pro.category === product.category
    );
  }

  const handleTab = (index) => {
    setIndex(index);
  };

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, {
          rating,
          comment,
          name: userInfo.name,
          customerId: userInfo._id,
        })
      );
    } else {
      alert("Please enter comment and rating");
    }
  };

  const reviewSigninHandler = () => {
    props.history.push(`/signin?redirect=items/${productId}`);
  };

  const PreviousBtn = (props) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <ArrowBackIos style={{ fontSize: "30px" }} className="lightBlack" />
      </div>
    );
  };
  const NextBtn = (props) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <ArrowForwardIos style={{ fontSize: "30px" }} className="lightBlack" />
      </div>
    );
  };

  const carouselProperties = {
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
    slidesToShow: 3,
    infinite: true,
    slidesToScroll: 1,
    // centerMode: true,
    // centerPadding: "170px",
    // responsive: [
    //   {
    //     breakpoint: 426,
    //     settings: {
    //       slidesToShow: 1,
    //       centerMode: false,
    //     },
    //   },
    //   {
    //     breakpoint: 769,
    //     settings: {
    //       slidesToShow: 3,
    //       centerMode: false,
    //     },
    //   },
    //   {
    //     breakpoint: 1025,
    //     settings: {
    //       slidesToShow: 4,
    //       centerMode: false,
    //       slidesToScroll: 2,
    //     },
    //   },
    // ],
  };

  const Card = ({ item }) => {
    return (
      <div className="TextAlign-Center">
        <img
          className="multi__image"
          src={item.image[0].location}
          alt="image"
          style={{
            width: "100%",
            height: "170px",
            objectFit: "contain",
            marginBottom: "10px",
          }}
        />
        <p style={{ fontSize: "14px" }} className="p-1 lightBlack">
          {item.name}
        </p>
        <Rating
          rating={item.rating}
          numReviews={`${item.numReviews} reviews`}
        />
        <p style={{ fontSize: "16px" }} className="p-1 danger">
          ₹{item.price}.00
        </p>
      </div>
    );
  };

  return (
    <>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <section className="container ItemScreenSection">
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-5 col-md-12 col-12">
              {product.image.length > 0 ? (
                <>
                  <img
                    className="img-fluid w-100 mb-3 BS4"
                    src={product.image[index].location}
                  ></img>
                  <div className="ItemScreenSection-img-group mb-3">
                    {product.image.map((img, index) => (
                      <div className="ItemScreenSection-img-col" key={index}>
                        <img
                          width="100%"
                          src={img.location}
                          onClick={() => handleTab(index)}
                        ></img>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <MessageBox>Empty Image</MessageBox>
              )}
            </div>
            <div className="col-lg-5 col-md-12 col-12 TextAlign-Initial">
              <div className="p-3 BS32 BGcolor-f7f7f2">
                <h4>{product.name}</h4>
                <Rating
                  rating={product.rating}
                  numReviews={`${product.numReviews} reviews`}
                />
                {product.seller.seller.name ? (
                  <>
                    <span className="lightBlack">
                      Seller:&nbsp;
                      <Link to={`/seller/${product.seller._id}`}>
                        {product.seller.seller.name}
                      </Link>
                    </span>
                    <br />
                  </>
                ) : null}
                {product.brand ? (
                  <>
                    <span className="lightBlack">
                      Brand:&nbsp;
                      <a
                        href={`/brands/${product.brand
                          .replace(/\s+/g, "-")
                          .toLowerCase()}`}
                      >
                        {product.brand}
                      </a>
                    </span>
                    <br />
                  </>
                ) : null}

                <span className="lightBlack">
                  Status:&nbsp;
                  {product.countInStock > 0 ? (
                    <span className="success FontWeightBold">Available</span>
                  ) : (
                    <span className="danger FontWeightBold">Unavailable</span>
                  )}
                </span>
                <br />
                {product.availablePlace ? (
                  <span className="lightBlack">
                    Available Place:&nbsp;
                    <a
                      href={`https://en.wikipedia.org/wiki/${product.availablePlace}`}
                    >
                      {product.availablePlace}
                    </a>
                  </span>
                ) : null}

                {product.priceTag ? (
                  <div className="onerow">
                    <span className="lightBlack">Price:&nbsp;</span>
                    <h5 style={{ marginTop: "10px" }}>
                      <span className="danger">₹{product.price}.00</span>
                      &nbsp;&nbsp;
                      <span className="lightBlack">
                        <del>₹{product.priceTag}.00</del>
                      </span>
                    </h5>
                  </div>
                ) : (
                  <div className="onerow">
                    <span className="lightBlack">Price:&nbsp;</span>
                    <h5 style={{ marginTop: "10px" }}>
                      <span className="danger">₹{product.price}.00</span>&nbsp;
                    </h5>
                  </div>
                )}
                {product.countInStock > 0 && (
                  <>
                    <div className="onerow">
                      <span className="lightBlack">Quantity:&nbsp;</span>
                      <select
                        style={{
                          backgroundColor: "white",
                          border: "1px solid black",
                        }}
                        className="p-1"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* s */}
                    <div className="ClothSizeMain">
                      Select Size
                      <div className="ClothSize">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>2XL</div>
                        <div>3XL</div>
                      </div>
                    </div>

                    {/* ps */}

                    <p onClick={handleShow}>Size Chart</p>

                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>FIND YOUR SIZE</Modal.Title>
                      </Modal.Header>
                      <Modal.Body className="TextAlign-Center">
                        <img
                          width="250px"
                          src="https://images.bewakoof.com/sizeguide/men-half-sleeves-tshirts-1484025744-1623075051.jpg"
                        />

                        <div className="ClothMeasurementMain flexContainer alignCenterJustifyCenter">
                          <p
                            onClick={() => setClothMeasurement("in")}
                            style={
                              clothMeasurement === "in"
                                ? { backgroundColor: "black", color: "white" }
                                : null
                            }
                          >
                            in
                          </p>
                          <p
                            onClick={() => setClothMeasurement("cm")}
                            style={
                              clothMeasurement === "cm"
                                ? { backgroundColor: "black", color: "white" }
                                : null
                            }
                          >
                            cm
                          </p>
                        </div>

                        {clothMeasurement === "in" ? (
                          <img src="/images/ts_in.png"  width="250px" />
                        ) : (
                          <img src="/images/ts_cms.png" width="250px" />
                        )}
                      </Modal.Body>
                    </Modal>

                    {/* pe */}

                    {/* e */}

                    <div className="TextAlign-Initial mt-3">
                      <button
                        type="button"
                        className="MenuBtn width100per p-3 FontWeightBold"
                        onClick={addToCartHandler}
                        style={{ fontSize: "18px", color: "white" }}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </>
                )}
              </div>

              <p className="hyphens-auto my-3">{product.description}</p>
            </div>
          </div>

          {loadingItemList ? (
            <LoadingBox></LoadingBox>
          ) : errorItemList ? (
            <MessageBox>{error}</MessageBox>
          ) : (
            <>
              {relatedProducts.length > 2 ? (
                <div className="TextAlign-Initial">
                  <h3 className="FontWeightBold">Similar products</h3>
                  <hr />
                  {relatedProducts ? (
                    <div style={{ margin: "30px" }} className="carousel">
                      <Slider {...carouselProperties}>
                        {relatedProducts.map((item) => (
                          <Link to={`/items/${item._id}`} key={item._id}>
                            <Card item={item} />
                          </Link>
                        ))}
                      </Slider>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </>
          )}

          <div className="TextAlign-Initial my-5">
            <h3 id="reviews" className="FontWeightBold">
              Customer reviews
            </h3>
            <hr />
            {product.reviews.length === 0 && (
              <MessageBox>There is no review</MessageBox>
            )}

            {product.reviews.map((review) => (
              <div key={review._id}>
                <strong>{review.name}</strong>
                <br />
                <span className="lightBlack">
                  Reviewed on&nbsp;{review.createdAt.substring(0, 10)}
                </span>
                <Rating
                  rating={review.rating}
                  numReviews="verified review"
                ></Rating>

                <p className="mt-2 mb-4">{review.comment}</p>
              </div>
            ))}

            {userInfo ? (
              <form
                className="form p-3 BS32 BGcolor-f7f7f2"
                onSubmit={submitHandler}
              >
                <h4>Review this product</h4>
                <span className="text-muted">
                  Share your thoughts with other customers
                </span>

                <div className="my-1">
                  <label htmlFor="rating">Rating</label>
                  &nbsp;
                  <select
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    style={{
                      backgroundColor: "white",
                      border: "1px solid black",
                    }}
                    className="p-1"
                  >
                    <option value="">Select</option>
                    <option value="1">Poor</option>
                    <option value="2">Fair</option>
                    <option value="3">Good</option>
                    <option value="4">Very good</option>
                    <option value="5">Excelent</option>
                  </select>
                </div>
                <div className="my-1">
                  <label htmlFor="comment">Comment</label>
                  <br />
                  <textarea
                    style={{ width: "50%" }}
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </div>
                <div>
                  <button className="btn btn-success my-2" type="submit">
                    Submit
                  </button>
                </div>
                <div>
                  {loadingReviewCreate && <LoadingBox></LoadingBox>}
                  {errorReviewCreate && (
                    <MessageBox variant="danger">
                      {errorReviewCreate}
                    </MessageBox>
                  )}
                </div>
              </form>
            ) : (
              <MessageBox>
                Please{" "}
                <span
                  className="lightBlack"
                  onClick={reviewSigninHandler}
                  style={{ cursor: "pointer" }}
                >
                  Sign In
                </span>
                , Share your thoughts with other customers
              </MessageBox>
            )}
          </div>
        </section>
      )}
    </>
  );
}
