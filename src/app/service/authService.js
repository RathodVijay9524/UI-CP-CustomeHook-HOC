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
        throw new Error(error.response.data.errorMessage);
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
      console.log("token - ", token);
      const response = await axiosInstance.get('/auth/current-user');
      console.log('Fetch user data:', response.data);
      return response.data.data;
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        throw new Error(error.response.data.errorMessage);
      } else if (error.request) {
        console.error('Request error:', error.request);
        throw new Error('Network error');
      } else {
        console.error('Setup error:', error.message);
        throw new Error(error.message);
      }
    }
  },

 checkAvailability : async (value) => {
    try {
      const response = await axiosInstance.post('/auth/register/check-availability', null, {
        params: {
          usernameOrEmail: value,  // Send as a query parameter
        },
      });
  
      console.log('Response from Backend:', response.data);
      return response.data.exists;  // Returns true if exists, false if available
    } catch (error) {
      console.error('Error checking availability:', error.response ? error.response.data : error.message);
      return false;  // Default to false if error occurs
    }
  }
};




export default authService;
