import ReactDOM from 'react-dom';
import './index.css';
import Routes from './router/routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Footer from './components/Footer';
import './App.css';
import { StyledEngineProvider } from '@mui/material/styles';
import AppHeader from './components/AppHeader';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StyledEngineProvider injectFirst>
        <Router>
          <div className="App">
            <AppHeader />
            <Footer />
            <Routes />
          </div>
        </Router>
      </StyledEngineProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
