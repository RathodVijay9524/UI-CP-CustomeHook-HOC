import { useState, useEffect } from 'react';
import axiosInstance from '../service/axiosInstance';
import checkAvailability from '../service/user-service';
import useForm from './useForm'; // Adjust path if necessary
import useValidation from './useValidation'; // Adjust path if necessary

const useRegistration = (registrationEndpoint) => {
  const initialFormState = {
    name: '',
    username: '',
    email: '',
    password: '',
    phoNo: '',
  };

  const { values, handleChange, resetForm } = useForm(initialFormState);
  const { errors, validate, handleBlur, touched } = useValidation({}); // Initialize validation state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [backendErrors, setBackendErrors] = useState({});
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [emailAvailable, setEmailAvailable] = useState(null);

  useEffect(() => {
    const fieldNames = Object.keys(values);
    fieldNames.forEach((field) => validate(field, values[field]));
  }, [values]); // Call validate function whenever values change

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post(registrationEndpoint, values);
      setLoading(false);
      setSuccess(response.data);
      setError(null);
      setBackendErrors({});
      resetForm(); // Reset form after successful registration
    } catch (err) {
      setLoading(false);
      setError(err.response && err.response.data ? err.response.data : 'Registration failed.');
      setSuccess(null);
      if (err.response && err.response.data && err.response.data.errors) {
        setBackendErrors(err.response.data.errors);
      }
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
  };
};

export default useRegistration;
