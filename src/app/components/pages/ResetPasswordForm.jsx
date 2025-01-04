import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const ResetPasswordRequest = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await axios.get(
        `http://localhost:9091/api/v1/home/send-email-reset?email=${email}`
      );
      setMessage(response.data.message); // Assuming response has a message field
      setLoading(false);
    } catch (err) {
      setError(err.response ? err.response.data.errorMessage : 'Failed to send email');
      setLoading(false);
    }
  };

  return (
    <div className="container margin-top">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h2 className="card-title text-center mb-4">Forgot Password</h2>
            {message && <p className="text-success">{message}</p>}
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block mt-3"
                disabled={loading}
              >
                {loading ? 'Sending Email...' : 'Send Reset Link'}
              </button>
            </form>
            <div className="mt-4 text-center">
              Remembered your password? <Link to="/login">Login here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordRequest;
