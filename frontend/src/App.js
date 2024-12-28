import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  // Fetch users
  useEffect(() => {
    axios
      .get('http://localhost:5000/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  // Add user
  const addUser = () => {
    axios
      .post('http://localhost:5000/users', { name, email })
      .then((response) => {
        setUsers([...users, response.data]);
        setName('');
        setEmail('');
      })
      .catch((error) => console.error('Error adding user:', error));
  };

  // Delete user
  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:5000/users/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => console.error('Error deleting user:', error));
  };

  // Edit user
  const startEditUser = (user) => {
    setEditId(user.id);
    setEditName(user.name);
    setEditEmail(user.email);
  };

  const updateUser = () => {
    axios
      .put(`http://localhost:5000/users/${editId}`, { name: editName, email: editEmail })
      .then((response) => {
        const updatedUsers = users.map((user) =>
          user.id === editId ? response.data : user
        );
        setUsers(updatedUsers);
        setEditId(null);
        setEditName('');
        setEditEmail('');
      })
      .catch((error) => console.error('Error updating user:', error));
  };

  return (
    <div className="container">
      <h1>User Management</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="button" onClick={addUser}>
          Add User
        </button>
      </div>

      <h2>Users List</h2>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            {editId === user.id ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                />
                <button className="button" onClick={updateUser}>
                  Save
                </button>
                <button className="button" onClick={() => setEditId(null)}>
                  Cancel
                </button>
              </div>
            ) : (
              <div className="user-details">
                <span>{user.name} - {user.email}</span>
                <button className="button edit" onClick={() => startEditUser(user)}>
                  Edit
                </button>
                <button className="button delete" onClick={() => deleteUser(user.id)}>
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

