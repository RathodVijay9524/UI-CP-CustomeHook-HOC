/* eslint-disable react/display-name */
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


const withRoleRedirect = (Component) => (props) => {
  const { user } = useSelector(state => state.auth);

  if (user) {
    const userRoles = user.roles.map(role => role.name);
    console.log('User roles:', userRoles);

    if (userRoles.includes('ROLE_ADMIN')) {
      return <Navigate to="/admin" />;
    } else if (userRoles.includes('ROLE_WORKER')) {
      return <Navigate to="/worker" />;
    } else if (userRoles.includes('ROLE_NORMAL')) {
      return <Navigate to="/user" />;
    }
  }

  return <Component {...props} />;
};

export default withRoleRedirect;



