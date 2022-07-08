import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createItem, deleteItem, listItem } from "../../actions/itemActions";
import {
  ITEM_CREATE_RESET,
  ITEM_DELETE_RESET,
} from "../../constants/itemConstants";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import SuccessMessage from "../SuccessMessage";

export default function ItemListScreen(props) {
  const sellerMode = props.match.path.indexOf("/seller") >= 0;

  const itemList = useSelector((state) => state.itemList);
  const { loading, error, products } = itemList;

  const itemCreate = useSelector((state) => state.itemCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = itemCreate;

  const itemDelete = useSelector((state) => state.itemDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = itemDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: ITEM_CREATE_RESET });
      props.history.push(`/items/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: ITEM_DELETE_RESET });
      // window.location.reload();
    }
    dispatch(listItem({ seller: sellerMode ? userInfo._id : "" }));
  }, [
    createdProduct,
    dispatch,
    successDelete,
    props.history,
    sellerMode,
    successCreate,
    userInfo._id,
  ]);

  const deleteHandler = (product) => {
    if (window.confirm(`Are you sure to delete? ${product._id}`)) {
      dispatch(deleteItem(product._id));
    }
  };
  const createHandler = () => {
    dispatch(createItem());
  };
  return (
    <>
      <div>
        <h1 className="Margin10px">Item Admin</h1>

        <button
          type="button"
          className="MenuBtn mb-3 p-2"
          style={{
            fontSize: "10px",
            fontWeight: "600",
          }}
          onClick={createHandler}
        >
          Create New
        </button>
      </div>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <SuccessMessage variant="success">
          User Deleted Successfully
        </SuccessMessage>
      )}

      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>BRAND</th>
              <th>CATEGORY</th>
              <th>PRICE TAG</th>
              <th>PRICE</th>
              <th>AVAILABLE PLACE</th>
              <th>COUNT IN STOCK</th>
              <th>DESCRIPTION</th>
              <th>FILES</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>{product.priceTag}</td>
                <td>{product.price}</td>
                <td>{product.availablePlace}</td>
                <td>{product.countInStock}</td>
                <td>{product.description}</td>
                <td>
                  {product.image.map((pro) => (
                    <p key={pro.location}>{pro.location}</p>
                  ))}
                </td>
                <td>
                  <button
                    type="button"
                    className="MenuBtn my-1 p-2"
                    style={{
                      fontSize: "10px",
                      fontWeight: "600",
                    }}
                    onClick={() =>
                      props.history.push(`/items/${product._id}/edit`)
                    }
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="MenuBtn my-1 p-2"
                    style={{
                      fontSize: "10px",
                      fontWeight: "600",
                    }}
                    onClick={() => deleteHandler(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
