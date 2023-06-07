import axios from 'axios';

export const FETCHING_PRODUCTS = 'FETCHING_PRODUCTS';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAIL = 'FETCH_PRODUCTS_FAIL';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const EMPTY_CART = 'EMPTY_CART';
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
export const CHANGE_QUANTITY = 'CHANGE_QUANTITY';

export const fetchParts = () => {
  return async (dispatch, getState) => {
    dispatch({ type: FETCHING_PRODUCTS });
    const res = await axios.get(
      process.env.REACT_APP_API_URL + '/GetAllPartsWithCars'
    );
    const partsWithCars = res.data;
    dispatch({ type: FETCH_PRODUCTS_SUCCESS, partsWithCars });
  };
};

export const addToCart = partId => {
  return (dispatch, getState) => {
    dispatch({ type: ADD_TO_CART, partId });
  };
};

export const removeFromCart = partId => {
  return (dispatch, getState) => {
    dispatch({ type: REMOVE_FROM_CART, partId });
  };
};

export const emptyCart = () => {
  return (dispatch, getState) => {
    dispatch({ type: EMPTY_CART });
  };
};

export const addToFavorites = partId => {
  return (dispatch, getState) => {
    dispatch({ type: ADD_TO_FAVORITES, partId });
  };
};

export const removeFromFavorites = partId => {
  return (dispatch, getState) => {
    dispatch({ type: REMOVE_FROM_FAVORITES, partId });
  };
};

export const changeQuantity = (partId, quantity) => {
  return (dispatch, getState) => {
    dispatch({ type: CHANGE_QUANTITY, partId, quantity });
  };
};
