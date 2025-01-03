/* eslint-disable no-case-declarations */
import { useState } from 'react';

const useValidation = (initialValues) => {
  const [errors, setErrors] = useState(initialValues);
  const [touched, setTouched] = useState({});

  const validate = (name, value) => {
    let error;
    switch (name) {
      case 'name':
        if (!value) {
          error = 'Name is required';
        } else if (value.length < 2) {
          error = 'Name should be at least 2 characters long';
        }
        break;
      case 'username':
        if (!value) {
          error = 'Username is required';
        } else if (value.length < 3) {
          error = 'Username must be at least 3 characters long';
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          error = 'Email is required';
        } else if (!emailRegex.test(value)) {
          error = 'Email is not valid';
        }
        break;
      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (value.length < 6) {
          error = 'Password must be at least 6 characters long';
        }
        break;
      case 'phoNo':
        const phoneRegex = /^[0-9]{10}$/;
        if (!value) {
          error = 'Phone number is required';
        } else if (!phoneRegex.test(value)) {
          error = 'Phone number must be 10 digits';
        }
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleBlur = (name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  return { errors, validate, handleBlur, touched };
};

export default useValidation;
