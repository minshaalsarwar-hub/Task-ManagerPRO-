// AdminRegister.jsx
import React, { useState } from 'react';
import './admin.css';
import { useNavigate } from 'react-router-dom';

const AdminRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleRegister = () => {
    const { firstName, lastName, email, password, confirmPassword } = form;
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      alert('Please fill all fields!');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Save admin user in localStorage (admin-specific)
    const admins = JSON.parse(localStorage.getItem('admins')) || [];
    const exists = admins.find((a) => a.email === email);
    if (exists) {
      alert('Admin already registered with this email!');
      navigate('/admin/1122/login');
      return;
    }

    const newAdmin = { firstName, lastName, email, password };
    admins.push(newAdmin);
    localStorage.setItem('admins', JSON.stringify(admins));

    // alert('Admin registered successfully!');
    navigate('/admin/1122/login', { replace: true });

  };

  return (
    <div className="admin-register-container">
      <h2 className="admin-register-title">Admin Registration</h2>
      <input
        className="admin-input"
        placeholder="First Name"
        name="firstName"
        value={form.firstName}
        onChange={handleChange}
      />
      <input
        className="admin-input"
        placeholder="Last Name"
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
      />
      <input
        className="admin-input"
        placeholder="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        className="admin-input"
        placeholder="Password"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
      />
      <input
        className="admin-input"
        placeholder="Confirm Password"
        type="password"
        name="confirmPassword"
        value={form.confirmPassword}
        onChange={handleChange}
      />
      <button className="admin-btn-primary" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
};

export default AdminRegister;
