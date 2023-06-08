import { LOGIN_USER, LOGOUT_USER, UPDATE_USER } from '../actions/UserActions';

const initialState = {
  loggedInUser: null,
};

export default function (state = initialState, action) {
  console.log('User reducer', action);
  switch (action.type) {
    case LOGIN_USER: {
      const userModel = action.userModel;
      return {
        ...state,
        loggedInUser: userModel,
      };
    }

    case LOGOUT_USER: {
      return {
        ...state,
        loggedInUser: null,
      };
    }

    case UPDATE_USER: {
      const userModel = action.userModel;
      return {
        ...state,
        loggedInUser: userModel,
      };
    }

    default:
      return state;
  }
}
