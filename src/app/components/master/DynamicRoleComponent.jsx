
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const DynamicRoleComponent = ({ component: Component, requiredRole, ...rest }) => {
  const { user } = useSelector(state => state.auth);

  const hasRole = user && user.roles && user.roles.map(role => role.name).includes(requiredRole);
  if (hasRole) {
    return <Component {...rest} />;
  }
  return <Navigate to="/not-authorized" />;
};

DynamicRoleComponent.propTypes = {
  component: PropTypes.elementType.isRequired,
  requiredRole: PropTypes.string.isRequired,
};

export default DynamicRoleComponent;
