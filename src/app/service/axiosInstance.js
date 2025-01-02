import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:9091/api',
});

// Function to check if token is expired
const isTokenExpired = (token) => {
  if (!token) return true;
  const { exp } = jwtDecode(token);
  return Date.now() >= exp * 1000;
};

// Response interceptor to handle token refresh and global errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response) {
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Avoid infinite retry loop

        // Check if the token has expired
        const token = localStorage.getItem('jwtToken');
        if (isTokenExpired(token)) {
          try {
            const newToken = await refreshJwtToken();
            if (newToken) {
              originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
              return axiosInstance(originalRequest); // Retry the failed request
            }
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError.message);
            localStorage.clear();
            window.location.href = '/login';
          }
        } else {
          // Token is not expired, retry the request with the current token
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        }
      }

      // Handle other error statuses globally if needed
      if (error.response.status === 403) {
        console.error('Forbidden: You do not have access to this resource.');
      }
    }

    return Promise.reject(error);
  }
);

const refreshJwtToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available. Please login again.');
    }

    const response = await axios.post('/v1/tokens/regenerate-token', { refreshToken });
    const { jwtToken, refreshTokenDto } = response.data.data;

    // Update localStorage with new tokens
    localStorage.setItem('jwtToken', jwtToken);
    localStorage.setItem('refreshToken', refreshTokenDto.token);

    console.log('Tokens refreshed successfully');
    return jwtToken;
  } catch (error) {
    console.error('Failed to refresh token:', error.message);
    localStorage.clear();
    window.location.href = '/login';
  }
};

export default axiosInstance;
