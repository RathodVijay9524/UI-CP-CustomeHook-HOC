// BaseAdmin.js
import { Routes, Route, Link } from 'react-router-dom';
import AdminDashboard from './admin/AdminDashboard';
import AdminHome from './admin/AdminHome';
import AdminActiveUser from './admin/AdminActiveUser';
import SuperUserDashboard from './user/SuperUserDashboard';


const BaseAdmin = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
          <li><Link to="/admin/home">Home</Link></li>
          <li><Link to="/user/dashboard">Dashboard of users</Link></li>
          <li><Link to="/admin/active-users">Active Users</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="dashboard" element={<SuperUserDashboard />} />
        <Route path="home" element={<AdminHome />} />
        <Route path="active-users" element={<AdminActiveUser />} />
      </Routes>

    </div>
  );
};

export default BaseAdmin;
