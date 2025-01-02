// App.jsx
import { BrowserRouter } from 'react-router-dom';
import Router from './app/router/index';
import Navbar from './app/components/pages/Navbar';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Router />
    </BrowserRouter>
  );
};

export default App;
