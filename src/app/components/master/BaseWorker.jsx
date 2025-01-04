import { Routes, Route } from 'react-router-dom';
import WorkerDashboard from './worker/WorkerDashboard';
import WorkerTasks from './worker/WorkerTasks';
import WorkerProfile from './worker/WorkerProfile';
import WorkerSideBar from './worker/WorkerSideBar'
const BaseWorker = () => {
  return (
    <div>
      <WorkerSideBar>
        <Routes>
          <Route path="dashboard" element={<WorkerDashboard />} />
          <Route path="tasks" element={<WorkerTasks />} />
          <Route path="profile" element={<WorkerProfile />} />
        </Routes>
      </WorkerSideBar>
    </div>
  );
};

export default BaseWorker;
