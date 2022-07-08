import {
  ITEM_AVAILABLEPLACE_LIST_FAIL,
  ITEM_AVAILABLEPLACE_LIST_REQUEST,
  ITEM_AVAILABLEPLACE_LIST_SUCCESS,
  ITEM_CATEGORY_LIST_FAIL,
  ITEM_CATEGORY_LIST_REQUEST,
  ITEM_CATEGORY_LIST_SUCCESS,
  ITEM_CREATE_FAIL,
  ITEM_CREATE_REQUEST,
  ITEM_CREATE_RESET,
  ITEM_CREATE_SUCCESS,
  ITEM_DELETE_FAIL,
  ITEM_DELETE_REQUEST,
  ITEM_DELETE_RESET,
  ITEM_DELETE_SUCCESS,
  ITEM_DETAILS_FAIL,
  ITEM_DETAILS_REQUEST,
  ITEM_DETAILS_SUCCESS,
  ITEM_LIST_FAIL,
  ITEM_LIST_REQUEST,
  ITEM_LIST_SUCCESS,
  ITEM_REVIEW_CREATE_FAIL,
  ITEM_REVIEW_CREATE_REQUEST,
  ITEM_REVIEW_CREATE_RESET,
  ITEM_REVIEW_CREATE_SUCCESS,
  ITEM_UPDATE_FAIL,
  ITEM_UPDATE_REQUEST,
  ITEM_UPDATE_RESET,
  ITEM_UPDATE_SUCCESS,
} from "../constants/itemConstants";

export const itemListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case ITEM_LIST_REQUEST:
      return { loading: true };
    case ITEM_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case ITEM_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const itemCategoryListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case ITEM_CATEGORY_LIST_REQUEST:
      return { loading: true };
    case ITEM_CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case ITEM_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const itemAvailablePlaceListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case ITEM_AVAILABLEPLACE_LIST_REQUEST:
      return { loading: true };
    case ITEM_AVAILABLEPLACE_LIST_SUCCESS:
      return { loading: false, availablePlaces: action.payload };
    case ITEM_AVAILABLEPLACE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const itemDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ITEM_DETAILS_REQUEST:
      return { loading: true };
    case ITEM_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case ITEM_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const itemCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ITEM_CREATE_REQUEST:
      return { loading: true };
    case ITEM_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case ITEM_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ITEM_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const itemUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ITEM_UPDATE_REQUEST:
      return { loading: true };
    case ITEM_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case ITEM_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ITEM_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const itemReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ITEM_REVIEW_CREATE_REQUEST:
      return { loading: true };
    case ITEM_REVIEW_CREATE_SUCCESS:
      return { loading: false, success: true, review: action.payload };
    case ITEM_REVIEW_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ITEM_REVIEW_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const itemDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ITEM_DELETE_REQUEST:
      return { loading: true };
    case ITEM_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ITEM_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case ITEM_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
