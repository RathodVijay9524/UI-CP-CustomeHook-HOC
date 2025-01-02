import { Routes, Route, Link } from 'react-router-dom';
import WorkerDashboard from './worker/WorkerDashboard';
import WorkerTasks from './worker/WorkerTasks';
import WorkerProfile from './worker/WorkerProfile';

const BaseWorker = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/worker/dashboard">Dashboard</Link></li>
          <li><Link to="/worker/tasks">Tasks</Link></li>
          <li><Link to="/worker/profile">Profile</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="dashboard" element={<WorkerDashboard />} />
        <Route path="tasks" element={<WorkerTasks />} />
        <Route path="profile" element={<WorkerProfile />} />
      </Routes>
    </div>
  );
};

export default BaseWorker;
