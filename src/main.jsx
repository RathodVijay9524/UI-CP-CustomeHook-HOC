import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './app/store/redux/stores.js';
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <App />
  </Provider>


)
