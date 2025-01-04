// BaseSuperUser.js
import { Routes, Route } from 'react-router-dom';
import SuperUserDashboard from './user/SuperUserDashboard';
import ManageUsers from './user/ManageUsers';
import SuperUserSettings from './user/SuperUserSettings';
import SuperUserSideBar from './user/SuperUserSideBar'


const BaseSuperUser = () => {
  return (
    <div>
      <SuperUserSideBar>
        <Routes>
          <Route path="dashboard" element={<SuperUserDashboard />} />
          <Route path="tasks" element={<ManageUsers />} />
          <Route path="profile" element={<SuperUserSettings />} />
        </Routes>
      </SuperUserSideBar>
    </div>
  );
};

export default BaseSuperUser;
