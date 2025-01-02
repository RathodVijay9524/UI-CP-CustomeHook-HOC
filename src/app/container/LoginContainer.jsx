/* eslint-disable no-unused-vars */

// LoginContainer.js (Container Component)
// LoginContainer.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, fetchUserData, setUser } from '../store/redux/authSlice';
import { useNavigate } from 'react-router-dom';
import useForm from '../hook/useForm';
import LoginForm from '../components/form/LoginForm';

const LoginContainer = () => {
  const initialState = { usernameOrEmail: '', password: '' };
  const [values, handleChange] = useForm(initialState);
  const { loading, error, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      dispatch(setUser(JSON.parse(savedUser)));
    }
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(login(values));
      console.log('Login result:', result);

      if (result.meta.requestStatus === 'fulfilled') {
        const user = result.payload.user;
        console.log('Login payload user:', user);
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          navigateRole(user.roles, navigate); // Redirect based on role
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <LoginForm
      usernameOrEmail={values.usernameOrEmail}
      setUsernameOrEmail={(e) => handleChange({ target: { name: 'usernameOrEmail', value: e.target.value } })}
      password={values.password}
      setPassword={(e) => handleChange({ target: { name: 'password', value: e.target.value } })}
      loading={loading}
      error={error}
      handleSubmit={handleSubmit}
    />
  );
};

const navigateRole = (roles, navigate) => {
  const roleNames = roles.map(role => role.name);
  if (roleNames.includes('ROLE_ADMIN')) {
    navigate('/admin');
  } else if (roleNames.includes('ROLE_WORKER')) {
    navigate('/worker');
  } else if (roleNames.includes('ROLE_NORMAL')) {
    navigate('/user');
  } else {
    navigate('/not-authorized');
  }
};

export default LoginContainer;



/*
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, fetchUserData, setUser } from '../store/redux/authSlice';
import LoginForm from '../components/form/LoginForm';

const LoginContainer = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(login({ usernameOrEmail, password }));

      if (result.meta.requestStatus === 'fulfilled') {
        await dispatch(fetchUserData());

        const user = result.payload && result.payload.data && result.payload.data.user;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));

          const userRoles = user.roles.map(role => role.name);
          if (userRoles.includes('ROLE_ADMIN')) {
            navigate('/admin');
          } else if (userRoles.includes('ROLE_WORKER')) {
            navigate('/worker');
          } else if (userRoles.includes('ROLE_NORMAL')) {
            navigate('/user');
          }
        }
      } else {
        console.error('Login failed:', result.error.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      dispatch(setUser(JSON.parse(savedUser)));
    }
  }, [dispatch]);

  return (
    <LoginForm
      usernameOrEmail={usernameOrEmail}
      setUsernameOrEmail={setUsernameOrEmail}
      password={password}
      setPassword={setPassword}
      loading={loading}
      error={error}
      handleSubmit={handleSubmit}
    />
  );
};

export default LoginContainer;
*/
