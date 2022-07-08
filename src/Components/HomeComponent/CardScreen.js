import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../ItemsComponent/Rating";
import MessageBox from "../MessageBox";

export default function CardScreen(props) {
  return (
    <Link to={`/items/${props.menu._id}`}>
      <Card style={{ width: "15rem" }} className="CardScreen-card Margin10px">
        {props.menu.image.length > 0 ? (
          <Card.Img
            variant="top"
            src={props.menu.image[0].location}
            style={{ width: "90%", height: "150px", margin: "5px" }}
          />
        ) : (
          <MessageBox>Empty Image</MessageBox>
        )}

        <Card.Body className="hyphens-auto">
          <Card.Subtitle
            className="FontWeightBold lightBlack-hover"
            style={{ fontSize: "14px" }}
          >
            {props.menu.name.length > 25 ? (
              <span>{props.menu.name.slice(0, 25)}...</span>
            ) : (
              <span>{props.menu.name}</span>
            )}
          </Card.Subtitle>

          {props.menu.priceTag ? (
            <Card.Subtitle style={{ marginTop: "10px" }}>
              <span className="danger">₹{props.menu.price}.00</span>&nbsp;&nbsp;
              <span className="lightBlack">
                <del>₹{props.menu.priceTag}.00</del>
              </span>
            </Card.Subtitle>
          ) : (
            <Card.Subtitle style={{ marginTop: "10px" }}>
              <span className="danger">₹{props.menu.price}.00</span>&nbsp;
            </Card.Subtitle>
          )}
          <Rating
            rating={props.menu.rating}
            numReviews={`${props.menu.numReviews} reviews`}
          />

          {/* <Link to={`/seller/${props.menu.seller._id}`}>
            {props.menu.seller.seller.name}
          </Link> */}
        </Card.Body>
      </Card>
    </Link>
  );
}
