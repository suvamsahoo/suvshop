import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listItem } from "../../actions/itemActions";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import CardScreen from "../HomeComponent/CardScreen";

export default function BrandCategorie(props) {
  const brandId = props.match.params.id;
  const brandCategorieId = props.match.params.id2;

  let categorieAllProducts;

  const dispatch = useDispatch();
  const itemList = useSelector((state) => state.itemList);
  const { loading, error, products } = itemList;

  useEffect(() => {
    dispatch(listItem({}));
    if (products === undefined || products.length == 0) {
      props.history.push(`/brands/${brandId}`);
    }
  }, [dispatch]);

  if (products) {
    categorieAllProducts = products.filter(
      (product) =>
        product.category.replace(/\s+/g, "-").toLowerCase() ===
        brandCategorieId.toLowerCase()
    );
  }

  return (
    <>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="flexContainer alignCenterJustifyCenter">
          {categorieAllProducts.length > 0 ? (
            <>
              {categorieAllProducts.map((product) => (
                <CardScreen key={product._id} menu={product}></CardScreen>
              ))}
            </>
          ) : (
            <MessageBox variant="danger">No Products</MessageBox>
          )}
        </div>
      )}
    </>
  );
}
