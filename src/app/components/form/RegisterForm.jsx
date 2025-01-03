import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import useRegistration from '../../hook/useRegistration'; // Adjust path if necessary

const RegisterForm = () => {
  const registrationEndpoint = '/auth/register/admin'; // Define the registration endpoint

  const {
    values,
    handleChange,
    resetForm,
    handleSubmit,
    loading,
    error,
    success,
    backendErrors,
    checkUsernameAvailability,
    checkEmailAvailability,
    usernameAvailable,
    emailAvailable,
  } = useRegistration(registrationEndpoint); // Use useRegistration with the endpoint

  useEffect(() => {
    console.log('Username Available State:', usernameAvailable);
  }, [usernameAvailable]);

  useEffect(() => {
    console.log('Email Available State:', emailAvailable);
  }, [emailAvailable]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h2 className="card-title text-center mb-4">User Registration</h2>
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success.message}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                />
                {backendErrors.name && <p className="text-danger">{backendErrors.name}</p>}
              </div>
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={checkUsernameAvailability}
                />
                {usernameAvailable === false && (
                  <p className="text-danger">Username already exists! Choose another username.</p>
                )}
                {usernameAvailable === true && <p className="text-success">Username is available</p>}
                {backendErrors.username && <p className="text-danger">{backendErrors.username}</p>}
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={checkEmailAvailability}
                />
                {emailAvailable === false && (
                  <p className="text-danger">Email already exists! Choose another email.</p>
                )}
                {emailAvailable === true && <p className="text-success">Email is available</p>}
                {backendErrors.email && <p className="text-danger">{backendErrors.email}</p>}
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                />
                {backendErrors.password && <p className="text-danger">{backendErrors.password}</p>}
              </div>
              <div className="form-group">
                <label>Phone Number:</label>
                <input
                  type="text"
                  className="form-control"
                  name="phoNo"
                  value={values.phoNo}
                  onChange={handleChange}
                />
                {backendErrors.phoNo && <p className="text-danger">{backendErrors.phoNo}</p>}
              </div>
              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
                  {loading ? 'Registering...' : 'Register'}
                </button>
                <button type="button" className="btn btn-secondary mt-3" onClick={resetForm}>
                  Reset
                </button>
              </div>
            </form>
            <div className="mt-4 text-center">
              Already registered? <Link to="/login">Login here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
