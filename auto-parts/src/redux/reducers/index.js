import { combineReducers } from 'redux';
import products from './products.js';
import users from './Users.js';

export default combineReducers({ products, users });
