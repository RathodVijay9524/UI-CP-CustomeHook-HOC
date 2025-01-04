import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const uid = searchParams.get('uid');
  const token = searchParams.get('token');

  useEffect(() => {
    console.log('Complete query parameters:', location.search);
    console.log('UID:', uid);
    console.log('Token:', token);
  }, [location.search, uid, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!uid || !token) {
      toast.error('Invalid reset link');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:9091/api/v1/home/reset-password',
        {
          uid,
          token,
          newPassword,
          confirmPassword
        }
      );

      console.log('Response from server:', response.data);

      if (response.data.status === 'success') {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast.error(response.data.errorMessage);
      }
    } catch (err) {
      if (err.response) {
        console.error('Server error:', err.response.data);
        toast.error(err.response.data.errorMessage || 'Failed to reset password.');
      } else {
        console.error('Client error:', err);
        toast.error('Failed to reset password. Please check your connection and try again.');
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center my-5">
      <div className="col-md-6">
        <div className="card shadow p-4">
          <h2 className="card-title text-center mb-4">Reset Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block mt-4">Reset Password</button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
