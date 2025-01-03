/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, setUser } from '../store/redux/authSlice';
import { useNavigate } from 'react-router-dom';
import useForm from '../hook/useForm';
import LoginForm from '../components/form/LoginForm';

const LoginContainer = () => {
  const initialState = { usernameOrEmail: '', password: '' };
  const { values, handleChange, resetForm } = useForm(initialState); // Destructuring useForm return values correctly
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
    const result = await dispatch(login(values));
    console.log('Login result:', result);

    if (result.meta.requestStatus === 'fulfilled') {
      const user = result.payload.user;
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        navigateRole(user.roles, navigate); // Redirect based on role
      }
    }
  };

  return (
    <LoginForm
      usernameOrEmail={values.usernameOrEmail}
      setUsernameOrEmail={e => handleChange({ target: { name: 'usernameOrEmail', value: e.target.value } })}
      password={values.password}
      setPassword={e => handleChange({ target: { name: 'password', value: e.target.value } })}
      loading={loading}
      error={error ? { errorMessage: error } : null} // Ensure the error is always an object
      handleSubmit={handleSubmit}
    />
  );
};

const navigateRole = (roles, navigate) => {
  if (!roles || !Array.isArray(roles)) {
    navigate('/not-authorized');
    return;
  }

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

