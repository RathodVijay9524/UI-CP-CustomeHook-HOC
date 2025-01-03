// BaseAdmin.js
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './admin/AdminDashboard';
import AdminHome from './admin/AdminHome';
import AdminActiveUser from './admin/AdminActiveUser';
import SuperUserDashboard from './user/SuperUserDashboard';
import SideBar from './admin/AdminSideBar';
const BaseAdmin = () => {
  return (
    <div>

      <SideBar>
        <Routes>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="dashboard" element={<SuperUserDashboard />} />
          <Route path="home" element={<AdminHome />} />
          <Route path="active-users" element={<AdminActiveUser />} />
        </Routes>
      </SideBar>

    </div>
  );
};

export default BaseAdmin;
