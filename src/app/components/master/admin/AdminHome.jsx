import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminHome = () => {
  const { user, token } = useSelector(state => state.auth);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select a file to upload!");
      return;
    }

    const formData = new FormData();
    formData.append("userImage", selectedFile);

    try {
      const response = await axios.post("http://localhost:9091/api/users/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(response.data.message);
      fetchUserImage(user.id);
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessage("Failed to upload image");
    }
  };

  const fetchUserImage = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:9091/api/users/image/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });

      const imageUrl = URL.createObjectURL(response.data);
      setImageUrl(imageUrl);
    } catch (error) {
      console.error("Error fetching user image:", error);
      setMessage("Failed to fetch user image");
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserImage(user.id);
    }
  }, [user, token]);

  console.log('Token:', token);
  console.log('Current User:', user);

  if (!user) {
    return <p className="text-center mt-5">No user logged in</p>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Current User Information</h2>
      <div className="card">
        <div className="card-body">
          <ul className="list-group">
            <li className="list-group-item"><strong>ID:</strong> {user.id}</li>
            <li className="list-group-item"><strong>Name:</strong> {user.name}</li>
            <li className="list-group-item"><strong>Username:</strong> {user.username}</li>
            <li className="list-group-item"><strong>Email:</strong> {user.email}</li>
            <li className="list-group-item"><strong>Phone Number:</strong> {user.phoNo}</li>
            <li className="list-group-item"><strong>Roles:</strong> {user.roles.map(role => role.name).join(', ')}</li>
          </ul>
          {imageUrl && (
            <div className="text-center mt-3">
              <img src={imageUrl} alt="User" className="img-thumbnail" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
            </div>
          )}
        </div>
      </div>

      <h2 className="text-center mt-5 mb-4">Upload User Image</h2>
      <div className="card">
        <div className="card-body">
          <input type="file" onChange={handleFileChange} />
          <button className="btn btn-primary mt-3" onClick={handleUpload}>Upload</button>
          {message && <p className="alert alert-info mt-3">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
