import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import useRegistration from '../../hook/useRegistration'; // Adjust path if 

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
    errors,
    handleBlur,
    touched,
  } = useRegistration(registrationEndpoint); // Use useRegistration with the endpoint

  useEffect(() => {
    console.log('Username Available State:', usernameAvailable);
  }, [usernameAvailable]);

  useEffect(() => {
    console.log('Email Available State:', emailAvailable);
  }, [emailAvailable]);

  return (
    <div className="container margin-top">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h2 className="card-title text-center mb-4">User Registration</h2>
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success.message}</p>}
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={() => handleBlur('name')}
                    />
                    {backendErrors.name && <p className="text-danger">{backendErrors.name}</p>}
                    {touched.name && errors.name && <p className="text-danger">{errors.name}</p>}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Username:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={() => {
                        handleBlur('username');
                        checkUsernameAvailability();
                      }}
                    />
                    {usernameAvailable === false && (
                      <p className="text-danger">Username already exists! Choose another username.</p>
                    )}
                    {usernameAvailable === true && <p className="text-success">Username is available</p>}
                    {backendErrors.username && <p className="text-danger">{backendErrors.username}</p>}
                    {touched.username && errors.username && <p className="text-danger">{errors.username}</p>}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={() => {
                        handleBlur('email');
                        checkEmailAvailability();
                      }}
                    />
                    {emailAvailable === false && (
                      <p className="text-danger">Email already exists! Choose another email.</p>
                    )}
                    {emailAvailable === true && <p className="text-success">Email is available</p>}
                    {backendErrors.email && <p className="text-danger">{backendErrors.email}</p>}
                    {touched.email && errors.email && <p className="text-danger">{errors.email}</p>}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={() => handleBlur('password')}
                    />
                    {backendErrors.password && <p className="text-danger">{backendErrors.password}</p>}
                    {touched.password && errors.password && <p className="text-danger">{errors.password}</p>}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Phone Number:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phoNo"
                      value={values.phoNo}
                      onChange={handleChange}
                      onBlur={() => handleBlur('phoNo')}
                    />
                    {backendErrors.phoNo && <p className="text-danger">{backendErrors.phoNo}</p>}
                    {touched.phoNo && errors.phoNo && <p className="text-danger">{errors.phoNo}</p>}
                  </div>
                </div>
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
