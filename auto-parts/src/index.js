import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Footer from './components/Footer';
import './App.css';
import { StyledEngineProvider } from '@mui/material/styles';
import AppHeader from './components/AppHeader';
import HomePage from './containers/HomePage';
import AdminHomePage from './containers/AdminHomePage';
import AdminUsersPage from './containers/AdminUsersPage';
import AdminCarsPage from './containers/AdminCarsPage';
import AdminPartsPage from './containers/AdminPartsPage';
import ProductsPage from './containers/ProductsPage';
import CartPage from './containers/CartPage';
import SignUpPage from './containers/SignUpPage';
import SignInPage from './containers/SignInPage';
import ToBeContinued from './containers/ToBeContinuedContainer';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StyledEngineProvider injectFirst>
        <Router>
          <div className="App">
            <AppHeader />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/AdminHomePage" element={<AdminHomePage />} />
              <Route path="/AdminUsersPage" element={<AdminUsersPage />} />
              <Route path="/AdminCarsPage" element={<AdminCarsPage />} />
              <Route path="/AdminPartsPage" element={<AdminPartsPage />} />
              <Route path="/Products" element={<ProductsPage />} />
              <Route path="/Cart" element={<CartPage />} />
              <Route path="/SignUp" element={<SignUpPage />} />
              <Route path="/LogIn" element={<SignInPage />} />
              <Route path="/ToBeContinued" element={<ToBeContinued />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </StyledEngineProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
