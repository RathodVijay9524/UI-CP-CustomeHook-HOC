import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm = ({ usernameOrEmail, setUsernameOrEmail, password, setPassword, loading, error, handleSubmit, message }) => (
  <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow p-4">
          <h2 className="card-title text-center mb-4">Login</h2>
          {message && <p className="text-success">{message}</p>} {/* Display the success message */}
          {error && <p className="text-danger">{error.errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username or Email:</label>
              <input
                type="text"
                className="form-control"
                value={usernameOrEmail}
                onChange={setUsernameOrEmail}
                name="usernameOrEmail"
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={setPassword}
                name="password"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block mt-3" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <button className="btn btn-link mt-3 p-0 text-left">
            Forgot Password?
          </button>
          <div className="mt-4 text-center">
            Dont have an account? <Link to="/register">Register here</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

LoginForm.propTypes = {
  usernameOrEmail: PropTypes.string.isRequired,
  setUsernameOrEmail: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  message: PropTypes.string, // Add message propType
};

export default LoginForm;
