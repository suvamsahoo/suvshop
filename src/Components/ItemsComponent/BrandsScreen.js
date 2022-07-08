import React from "react";
import { useEffect } from "react";
import { Card, CardGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listItem } from "../../actions/itemActions";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";

export default function BrandsScreen() {
  let Brand_3M_Littmann;

  const dispatch = useDispatch();
  const itemList = useSelector((state) => state.itemList);
  const { loading, error, products } = itemList;

  useEffect(() => {
    dispatch(listItem({}));
  }, [dispatch]);

  if (products) {
    Brand_3M_Littmann = products.filter(
      (product) => product.brand === "3M Littmann"
    );
  }

  return (
    <>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <CardGroup className="flexContainer alignCenterJustifyCenter my-4">
            {Brand_3M_Littmann.length > 0 ? (
              <Link to="brands/3m-littmann">
                <Card
                  style={{ width: "12rem", border: "none" }}
                  className="m-2"
                >
                  <Card.Img
                    variant="top"
                    src="https://i.postimg.cc/Xvgv71VR/medicne.webp"
                  />
                  <Card.Body>
                    <Card.Title style={{ margin: "0", fontSize: "16px" }}>
                      3M Littmann
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            ) : null}
          </CardGroup>
        </>
      )}
    </>
  );
}
