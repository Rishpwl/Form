import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:5000/users');
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingUser) {
      await axios.put(`http://localhost:5000/users/${editingUser._id}`, formData);
    } else {
      await axios.post('http://localhost:5000/users', formData);
    }
    setFormData({ name: '', email: '', password: '' });
    setEditingUser(null);
    fetchUsers();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/users/${id}`);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setFormData(user);
    setEditingUser(user);
  };

  return (
    <div>
      <h1>CRUD Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br></br>
        <br></br>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br></br>
        <br></br>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br></br>
        <br></br>
        <button type="submit">{editingUser ? 'Update' : 'Create'}</button>
      </form>
<br></br>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <b>Name</b>:{user.name} 
            <br></br>
            <b>Email</b>- {user.email}
            <br></br>
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
