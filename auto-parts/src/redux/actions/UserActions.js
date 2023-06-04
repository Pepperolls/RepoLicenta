import axios from 'axios';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const loginUser = userModel => {
  return (dispatch, getState) => {
    dispatch({ type: LOGIN_USER, userModel });
  };
};

export const logoutUser = () => {
  return (dispatch, getState) => {
    dispatch({ type: LOGOUT_USER });
  };
};
