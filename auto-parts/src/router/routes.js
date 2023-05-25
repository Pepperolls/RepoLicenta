import { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from '../history/history';
import HomePage from '../containers/HomePage';
import ProductsPage from '../containers/ProductsPage';
import SignInPage from '../containers/SignInPage';
import SignUpPage from '../containers/SignUpPage';
import CartPage from '../containers/CartPage';
import ToBeContinued from '../containers/ToBeContinuedContainer';

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/Products" component={ProductsPage} />
          <Route path="/Cart" component={CartPage} />
          <Route path="/SignUp" component={SignUpPage} />
          <Route path="/LogIn" component={SignInPage} />
          <Route path="/ToBeContinued" component={ToBeContinued} />
        </Switch>
      </Router>
    );
  }
}
