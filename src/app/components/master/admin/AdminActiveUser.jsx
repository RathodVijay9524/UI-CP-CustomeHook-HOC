/* eslint-disable no-unused-vars */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, softDeleteUser } from '../../../store/redux/userSlice';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const AdminActiveUser = () => {
  const dispatch = useDispatch();
  const { users, totalElements, totalPages, pageNumber, loading, error, successMessage } = useSelector(state => state.users);
  const { user } = useSelector(state => state.auth);
  console.log("user from state: ", user); // Check this console log to see if user is being accessed

  const [currentPage, setCurrentPage] = useState(pageNumber); // Initialize with pageNumber from state

  // Fetch users when page changes
  useEffect(() => {
    dispatch(fetchAllUsers({ pageNumber: currentPage }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFirstPage = () => {
    setCurrentPage(0);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages - 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const handleSoftDelete = (id) => {
    if (window.confirm('Are you sure you want to soft delete this user?')) {
      dispatch(softDeleteUser(id));
    }
  };

  return (
    <div className="container mt-1">
      <div className="card">
        <div className="card-header">
          <h4>Active Users</h4>
          {/* You can display logged-in user data */}
          <p>Logged-in user: {user?.username || 'Guest'}</p>
        </div>

        <div className="card-body">
          {loading && <p>Loading...</p>}
          {error && <p>{error.errorMessage}</p>}

          {/* Display Success Message */}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}

          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Roles</th>
                <th>Actions</th> {/* Add Actions Column */}
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.username}>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phoNo}</td>
                  <td>{user.roles.map(role => role.name).join(', ')}</td>
                  <td>
                    {/* Soft Delete Button */}
                    <button
                      className="btn btn-danger"
                      onClick={() => handleSoftDelete(user.id)}
                      disabled={user.isDeleted} // Disable if already deleted
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {/* First button */}
              <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={handleFirstPage} disabled={currentPage === 0}>
                  First
                </button>
              </li>

              {/* Previous button */}
              <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={handlePrevPage} disabled={currentPage === 0}>
                  Previous
                </button>
              </li>

              {/* Pagination buttons */}
              {Array.from({ length: totalPages }, (_, index) => (
                <li className={`page-item ${index === currentPage ? 'active' : ''}`} key={index}>
                  <button className="page-link" onClick={() => handlePageChange(index)}>
                    {index + 1}
                  </button>
                </li>
              ))}

              {/* Next button */}
              <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
                  Next
                </button>
              </li>

              {/* Last button */}
              <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={handleLastPage} disabled={currentPage === totalPages - 1}>
                  Last
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AdminActiveUser;
