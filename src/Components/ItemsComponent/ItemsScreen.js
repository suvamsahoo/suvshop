import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listItem } from "../../actions/itemActions";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import CardScreen from "../HomeComponent/CardScreen";

export default function ItemsScreen() {
  const dispatch = useDispatch();
  const itemList = useSelector((state) => state.itemList);
  const { loading, error, products } = itemList;

  useEffect(() => {
    dispatch(listItem({}));
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <div className="CenterBody">
            {products.map((menu) => (
              <CardScreen key={menu._id} menu={menu}></CardScreen>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
