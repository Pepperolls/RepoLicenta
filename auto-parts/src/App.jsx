import './index.css';
import CustomAppBar from '../src/components/appbar';
import Routes from '../src/router/routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Footer from './components/footer';
import './App.css';

const App = () => {
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <div className="App">
          <CustomAppBar />
          <Footer />
          <Routes />
        </div>
      </Router>
    </PersistGate>
  </Provider>
}

export default App;
