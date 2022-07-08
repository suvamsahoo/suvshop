import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import Axios from "axios";
import { ITEM_UPDATE_RESET } from "../../constants/itemConstants";
import { detailsItem, updateItem } from "../../actions/itemActions";

export default function ItemEditListScreen(props) {
  const productId = props.match.params.id;
  const [name, setName] = useState("");
  const [image, setImage] = useState([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [priceTag, setPriceTag] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [availablePlace, setAvailablePlace] = useState("");

  const itemDetails = useSelector((state) => state.itemDetails);
  const { loading, error, product } = itemDetails;

  const itemUpdate = useSelector((state) => state.itemUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = itemUpdate;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push("/itemslist");
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: ITEM_UPDATE_RESET });
      dispatch(detailsItem(productId));
    } else {
      setName(product.name);
      setImage(product.image);
      setDescription(product.description);
      setPrice(product.price);
      setPriceTag(product.priceTag);
      setCategory(product.category);
      setBrand(product.brand);
      setCountInStock(product.countInStock);
      setAvailablePlace(product.availablePlace);
    }
  }, [product, dispatch, productId, successUpdate, props.history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateItem({
        _id: productId,
        name,
        image,
        description,
        price,
        priceTag,
        category,
        brand,
        countInStock,
        availablePlace,
      })
    );
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");

  const uploadFileHandler = async (e) => {
    const file = e.target.files;
    const bodyFormData = new FormData();

    for (let i = 0; i < file.length; i++) {
      bodyFormData.append("image", file[i]);
    }
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post(
        `${process.env.REACT_APP_API}/uploads/s3`,
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  return (
    <form
      className="UserAccountform TextAlign-Initial"
      onSubmit={submitHandler}
    >
      <h5 className="FontWeightBold lightBlack m-2">
        ID-:&nbsp;{productId}
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {loading && <LoadingBox></LoadingBox>}
      </h5>

      {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
      {error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div>
            <label htmlFor="name">Name</label>
            <input
              className="UserAccountform-input"
              id="name"
              type="text"
              placeholder="enter item name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>

          <div>
            <label htmlFor="name">Brand</label>
            <input
              className="UserAccountform-input"
              id="name"
              type="text"
              placeholder="enter item brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></input>
          </div>

          <div>
            <label htmlFor="name">Item Category</label>
            <input
              className="UserAccountform-input"
              id="name"
              type="text"
              placeholder="enter item category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></input>
          </div>

          <div>
            <label htmlFor="name">Price Tag</label>
            <input
              className="UserAccountform-input"
              id="name"
              type="text"
              placeholder="enter price tag"
              value={priceTag}
              onChange={(e) => setPriceTag(e.target.value)}
            ></input>
          </div>

          <div>
            <label htmlFor="name">Price</label>
            <input
              className="UserAccountform-input"
              id="name"
              type="text"
              placeholder="enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></input>
          </div>

          <div>
            <label htmlFor="name">Count In Stock</label>
            <input
              className="UserAccountform-input"
              id="name"
              type="text"
              placeholder="enter number"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></input>
          </div>

          <div>
            <label htmlFor="name">Available Place</label>
            <input
              className="UserAccountform-input"
              id="name"
              type="text"
              placeholder="enter place"
              value={availablePlace}
              onChange={(e) => setAvailablePlace(e.target.value)}
            ></input>
          </div>

          <div>
            <label htmlFor="image"> Files</label>
            <input
              className="UserAccountform-input"
              id="image"
              type="text"
              placeholder="Enter image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></input>
          </div>

          <div>
            <label htmlFor="imageFile" className="textAlign-initial">
              Upload Files
            </label>
            <input
              className="UserAccountform-input"
              type="file"
              id="imageFile"
              label="Choose Image"
              onChange={uploadFileHandler}
              multiple
            ></input>
            {loadingUpload && <LoadingBox></LoadingBox>}
            {errorUpload && (
              <MessageBox variant="danger">{errorUpload}</MessageBox>
            )}
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea
              className="UserAccountform-input"
              id="description"
              rows="3"
              type="text"
              placeholder="enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <button className="UserAccountform-btn" type="submit">
            Update
          </button>
        </>
      )}
    </form>
  );
}
