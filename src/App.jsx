// App.jsx
import { BrowserRouter } from 'react-router-dom';
import Router from './app/router/index';
import Navbar from './app/components/pages/Navbar';
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  const notify = () => toast("Wow so easy!");
  return (
    <BrowserRouter>
      <Navbar />
      <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer />
      </div>
      <Router />
    </BrowserRouter>
  );
};

export default App;
