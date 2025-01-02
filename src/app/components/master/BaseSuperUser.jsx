// BaseSuperUser.js
import { Routes, Route, Link } from 'react-router-dom';
import SuperUserDashboard from './user/SuperUserDashboard';
import ManageUsers from './user/ManageUsers';
import SuperUserSettings from './user/SuperUserSettings';



const BaseSuperUser = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/user/dashboard">Dashboard</Link></li>
          <li><Link to="/user/tasks">Tasks</Link></li>
          <li><Link to="/user/profile">Profile</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="dashboard" element={<SuperUserDashboard />} />
        <Route path="tasks" element={<ManageUsers />} />
        <Route path="profile" element={<SuperUserSettings />} />
      </Routes>
    </div>
  );
};

export default BaseSuperUser;
