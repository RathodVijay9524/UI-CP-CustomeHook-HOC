import axiosInstance from './axiosInstance';

const authService = {
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post('/auth/login', credentials);
      console.log('Login response:', response.data);
      return response.data.data;
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        throw new Error(error.response.data.message);
      } else if (error.request) {
        console.error('Request error:', error.request);
        throw new Error('Network error');
      } else {
        console.error('Setup error:', error.message);
        throw new Error(error.message);
      }
    }
  },

  fetchUserData: async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      console.log("token - ",token)
      const response = await axiosInstance.get('/auth/current-user');
      console.log('Fetch user data:', response.data);
      return response.data.data;
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        throw new Error(error.response.data.message);
      } else if (error.request) {
        console.error('Request error:', error.request);
        throw new Error('Network error');
      } else {
        console.error('Setup error:', error.message);
        throw new Error(error.message);
      }
    }
  },
};

export default authService;
