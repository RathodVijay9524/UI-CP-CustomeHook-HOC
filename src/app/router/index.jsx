import { Routes, Route } from 'react-router-dom';
import LoginContainer from '../container/LoginContainer';
import RegisterForm from '../components/form/RegisterForm';
import BaseAdmin from '../components/master/BaseAdmin';
import BaseWorker from '../components/master/BaseWorker';
import BaseSuperUser from '../components/master/BaseSuperUser';
import NotAuthorized from '../components/pages/NotAuthorized';
import DynamicRoleComponent from '../components/master/DynamicRoleComponent';


const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginContainer />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route
        path="/admin/*"
        element={<DynamicRoleComponent component={BaseAdmin} requiredRole="ROLE_ADMIN" />}
      />
      <Route
        path="/worker/*"
        element={<DynamicRoleComponent component={BaseWorker} requiredRole="ROLE_WORKER" />}
      />
      <Route
        path="/user/*"
        element={<DynamicRoleComponent component={BaseSuperUser} requiredRole="ROLE_NORMAL" />}
      />
      <Route path="/not-authorized" element={<NotAuthorized />} />
      <Route path="/" element={<withRoleRedirect />} /> {/* Adjust this line */}
    </Routes>
  );
};

export default Router;
