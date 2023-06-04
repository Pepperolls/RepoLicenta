import { combineReducers } from 'redux';
import products from './Products.js';
import users from './Users.js';

export default combineReducers({ products, users });
