import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const DynamicRoleComponent = ({ component: Component, requiredRole, redirectUrl = '/login', ...rest }) => {
  const { user } = useSelector((state) => state.auth);

  // Check if the user has the required role
  const hasRole = user && user.roles && user.roles.map((role) => role.name).includes(requiredRole);

  if (hasRole) {
    return <Component {...rest} />;
  }

  // Redirect if no required role or user logged out
  return <Navigate to={user ? '/not-authorized' : redirectUrl} />;
};

DynamicRoleComponent.propTypes = {
  component: PropTypes.elementType.isRequired,
  requiredRole: PropTypes.string.isRequired,
  redirectUrl: PropTypes.string, // New optional prop
};

export default DynamicRoleComponent;
