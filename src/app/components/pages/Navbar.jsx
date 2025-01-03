/* eslint-disable no-unused-vars */
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/redux/authSlice'; // Import the logout action
// Ensure Bootstrap JS for collapse functionality

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Get the authentication status from the Redux store
  const user = useSelector((state) => state.auth.user); // Optionally, access the logged-in user details

  const handleLoginLogout = () => {
    if (isAuthenticated) {
      dispatch(logout()); // Dispatch logout action to clear user state and tokens
    } else {

      navigate('/login'); // Navigate to login page
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light" style={{ background: 'linear-gradient(to right, #0000ff 0%, #ff99cc 75%)', color: 'black' }}>
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="#">Admin Dasbhoard</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link " aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="#">Link</a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success text-dark" type="submit">Search</button>
            </form>
            <button
              className="btn btn-outline-primary ms-2 text-black"
              onClick={handleLoginLogout}
            >
              {isAuthenticated ? 'Logout' : 'Login'}
            </button>
          </div>
        </div>
      </nav>


    </div>
  );
};

export default Navbar;
