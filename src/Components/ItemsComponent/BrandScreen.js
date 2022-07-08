import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listItem } from "../../actions/itemActions";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import CardScreen from "../HomeComponent/CardScreen";
import { Image } from "react-bootstrap";

export default function BrandScreen(props) {
  const brandId = props.match.params.id;

  let brandAllProducts;
  let brandAllCategory = [];

  const dispatch = useDispatch();
  const itemList = useSelector((state) => state.itemList);
  const { loading, error, products } = itemList;

  useEffect(() => {
    dispatch(listItem({}));
  }, [dispatch]);

  if (products) {
    brandAllProducts = products.filter(
      (product) => product.brand.replace(/\s+/g, "-").toLowerCase() === brandId
    );
  }
  if (brandAllProducts) {
    brandAllProducts.map(
      (product, index) => (brandAllCategory[index] = product.category)
    );
  }

  let removeDuplicateBrandAllCategory = [...new Set(brandAllCategory)];

  return (
    <>
      <div className="MenuDetailContainer">
        <Image
          src="https://i.postimg.cc/Xvgv71VR/medicne.webp"
          className="MenuImage"
        />
        <h1 className="MenuName">{brandId.replace(/-|\s/g," ").toUpperCase()}</h1>
      </div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="overflow-hidden">
          <div className="row">
            <div className="TotalAmount p-3 TextAlign-Initial">
              {brandAllCategory ? (
                <>
                  <details className="BS4">
                    <summary className="p-2 BGcolor-f7f7f2 lightBlack FontWeightBold">
                      Categories
                    </summary>
                    <ul style={{ height: "100px", overflowY: "scroll" }}>
                      {removeDuplicateBrandAllCategory.map(
                        (brandCategory, index) => (
                          <Link to={`${brandId}/${brandCategory}`} key={index}>
                            <li className="p-2 m-1 BGcolor-f7f7f2 lightBlack">
                              {brandCategory}
                            </li>
                          </Link>
                        )
                      )}
                    </ul>
                  </details>
                </>
              ) : null}
            </div>

            <div className="CartAllItems flexContainer alignCenterJustifyCenter">
              {brandAllProducts.length > 0 ? (
                <>
                  {brandAllProducts.map((brandProduct) => (
                    <CardScreen
                      key={brandProduct._id}
                      menu={brandProduct}
                    ></CardScreen>
                  ))}
                </>
              ) : (
                <MessageBox variant="danger">No Products</MessageBox>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
