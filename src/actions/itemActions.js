import Axios from "axios";
import {
  ITEM_AVAILABLEPLACE_LIST_FAIL,
  ITEM_AVAILABLEPLACE_LIST_REQUEST,
  ITEM_AVAILABLEPLACE_LIST_SUCCESS,
  ITEM_CATEGORY_LIST_FAIL,
  ITEM_CATEGORY_LIST_REQUEST,
  ITEM_CATEGORY_LIST_SUCCESS,
  ITEM_CREATE_FAIL,
  ITEM_CREATE_REQUEST,
  ITEM_CREATE_SUCCESS,
  ITEM_DELETE_FAIL,
  ITEM_DELETE_REQUEST,
  ITEM_DELETE_SUCCESS,
  ITEM_DETAILS_FAIL,
  ITEM_DETAILS_REQUEST,
  ITEM_DETAILS_SUCCESS,
  ITEM_LIST_FAIL,
  ITEM_LIST_REQUEST,
  ITEM_LIST_SUCCESS,
  ITEM_REVIEW_CREATE_FAIL,
  ITEM_REVIEW_CREATE_REQUEST,
  ITEM_REVIEW_CREATE_SUCCESS,
  ITEM_UPDATE_FAIL,
  ITEM_UPDATE_REQUEST,
  ITEM_UPDATE_SUCCESS,
} from "../constants/itemConstants";

export const listItem =
  ({
    seller = "",
    name = "",
    category = "",
    rating = 0,
    availablePlace = "",
  }) =>
  async (dispatch) => {
    dispatch({
      type: ITEM_LIST_REQUEST,
    });
    try {
      const { data } = await Axios.get(
        `${process.env.REACT_APP_API}/items?seller=${seller}&name=${name}&category=${category}&rating=${rating}&availablePlace=${availablePlace}`
      );
      dispatch({ type: ITEM_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ITEM_LIST_FAIL, payload: error.message });
    }
  };

export const listItemCategories = () => async (dispatch) => {
  dispatch({
    type: ITEM_CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      `${process.env.REACT_APP_API}/items/categories`
    );
    dispatch({ type: ITEM_CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ITEM_CATEGORY_LIST_FAIL, payload: error.message });
  }
};

export const listItemAvailablePlace = () => async (dispatch) => {
  dispatch({
    type: ITEM_AVAILABLEPLACE_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      `${process.env.REACT_APP_API}/items/availableplace`
    );
    dispatch({ type: ITEM_AVAILABLEPLACE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ITEM_AVAILABLEPLACE_LIST_FAIL, payload: error.message });
  }
};

export const detailsItem = (productId) => async (dispatch) => {
  dispatch({ type: ITEM_DETAILS_REQUEST, payload: productId });
  try {
    const { data } = await Axios.get(
      `${process.env.REACT_APP_API}/items/${productId}`
    );
    dispatch({ type: ITEM_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ITEM_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createItem = () => async (dispatch, getState) => {
  dispatch({ type: ITEM_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `${process.env.REACT_APP_API}/items`,
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: ITEM_CREATE_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ITEM_CREATE_FAIL, payload: message });
  }
};

export const updateItem = (product) => async (dispatch, getState) => {
  dispatch({ type: ITEM_UPDATE_REQUEST, payload: product });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(
      `${process.env.REACT_APP_API}/items/${product._id}`,
      product,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: ITEM_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ITEM_UPDATE_FAIL, error: message });
  }
};

export const createReview =
  (productId, review) => async (dispatch, getState) => {
    dispatch({ type: ITEM_REVIEW_CREATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        `${process.env.REACT_APP_API}/items/${productId}/reviews`,
        review,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: ITEM_REVIEW_CREATE_SUCCESS,
        payload: data.review,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ITEM_REVIEW_CREATE_FAIL, payload: message });
    }
  };

export const deleteItem = (productId) => async (dispatch, getState) => {
  dispatch({ type: ITEM_DELETE_REQUEST, payload: productId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.delete(
      `${process.env.REACT_APP_API}/items/${productId}`,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: ITEM_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ITEM_DELETE_FAIL, payload: message });
  }
};
