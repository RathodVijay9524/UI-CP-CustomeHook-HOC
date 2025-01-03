import { useState } from 'react';
import axiosInstance from '../service/axiosInstance';
import checkAvailability from '../service/user-service';
import useForm from './useForm'; // Import the useForm hook


const useRegistration = (initialFormState) => {
  const { values, handleChange, resetForm } = useForm(initialFormState); // Use the useForm hook
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [emailAvailable, setEmailAvailable] = useState(null);
  //const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post('/auth/register/admin', values);
      setLoading(false);
      setSuccess(response.data);
      setError(null);
      resetForm(); // Reset form after successful registration
      //navigate('/login');

    } catch (err) {
      setLoading(false);
      setError(err.response && err.response.data ? err.response.data : 'Registration failed.');
      setSuccess(null);
    }
  };

  const checkUsernameAvailability = async () => {
    if (values.username) {
      const exists = await checkAvailability(values.username);
      setUsernameAvailable(!exists);
    }
  };

  const checkEmailAvailability = async () => {
    if (values.email) {
      const exists = await checkAvailability(values.email);
      setEmailAvailable(!exists);
    }
  };

  return {
    loading,
    error,
    success,
    usernameAvailable,
    emailAvailable,
    handleSubmit,
    checkUsernameAvailability,
    checkEmailAvailability,
    handleChange,
    values,
    resetForm, // Export resetForm method
  };
};

export default useRegistration;
