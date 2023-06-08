import {
  FETCHING_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  CHANGE_QUANTITY,
  EMPTY_CART,
} from '../actions/productActions';
import { REHYDRATE } from 'redux-persist';

const initialState = {
  partsWithCars: [],
  isLoadingParts: false,
  partsAddedToCart: [],
  partsAddedToFavorites: [],
  totalSum: 0,
};

export default function (state = initialState, action) {
  console.log('Product reducer', action);
  switch (action.type) {
    case REHYDRATE: {
      return {
        ...initialState,
        partsAddedToCart: action.payload
          ? action.payload.products.partsAddedToCart.map(partAddedToCart => {
              return {
                ...partAddedToCart,
                quantity: parseInt(partAddedToCart.quantity),
              };
            })
          : [],
        partsAddedToFavorites: action.payload
          ? action.payload.products.partsAddedToFavorites
          : [],
        totalSum: action.payload ? action.payload.products.totalSum : 0,
      };
    }
    case FETCHING_PRODUCTS: {
      return {
        ...state,
        isLoadingParts: true,
      };
    }
    case FETCH_PRODUCTS_FAIL: {
      return {
        ...state,
        isLoadingParts: false,
      };
    }
    case FETCH_PRODUCTS_SUCCESS: {
      const partsWithCars = action.partsWithCars;
      return {
        ...state,
        isLoadingParts: false,
        partsWithCars,
      };
    }
    case ADD_TO_CART: {
      const partId = action.partId;
      if (
        state.partsAddedToCart.find(
          partAddedToCart => partAddedToCart.part.partGuid === partId
        ) === undefined
      ) {
        const partAddedToCart = state.partsWithCars.find(
          partWithCar => partWithCar.part.partGuid === partId
        );
        return {
          ...state,
          partsAddedToCart: [
            ...new Set([
              ...state.partsAddedToCart,
              { part: partAddedToCart.part, quantity: 1 },
            ]),
          ],
        };
      } else {
        return {
          ...state,
        };
      }
    }
    case REMOVE_FROM_CART: {
      const partId = action.partId;
      return {
        ...state,
        partsAddedToCart: state.partsAddedToCart.filter(
          partAddedToCart => partAddedToCart.part.partGuid !== partId
        ),
      };
    }
    case EMPTY_CART: {
      return {
        ...state,
        partsAddedToCart: [],
      };
    }
    case CHANGE_QUANTITY: {
      const partId = action.partId;
      const newQuantity = action.quantity;
      return {
        ...state,
        partsAddedToCart: state.partsAddedToCart.map(partAddedToCart =>
          partAddedToCart.part.partGuid === partId
            ? { part: partAddedToCart.part, quantity: newQuantity }
            : partAddedToCart
        ),
      };
    }
    case ADD_TO_FAVORITES: {
      const partId = action.partId;
      return {
        ...state,
        partsAddedToFavorites: [
          ...new Set([...state.partsAddedToFavorites, partId]),
        ],
      };
    }
    case REMOVE_FROM_FAVORITES: {
      const partId = action.partId;
      return {
        ...state,
        partsAddedToFavorites: state.partsAddedToFavorites.filter(
          p => p !== partId
        ),
      };
    }
    default:
      return state;
  }
}
