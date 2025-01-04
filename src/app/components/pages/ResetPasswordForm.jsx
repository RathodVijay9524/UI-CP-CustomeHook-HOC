import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPasswordRequest = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:9091/api/v1/home/send-email-reset?email=${email}`
      );
      toast.success(response.data.message);
      setLoading(false);
    } catch (err) {
      toast.error(err.response ? err.response.data.errorMessage : 'Failed to send email');
      setLoading(false);
    }
  };

  return (
    <div className="container margin-top">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h2 className="card-title text-center mb-4">Forgot Password</h2>
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
      <ToastContainer /> {/* Add ToastContainer to render the toasts */}
    </div>
  );
};

export default ResetPasswordRequest;
