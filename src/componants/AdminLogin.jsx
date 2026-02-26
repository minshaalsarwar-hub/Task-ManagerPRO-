import React, { useState } from 'react'
import './admin.css'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = e => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleLogin = () => {
    const admins = JSON.parse(localStorage.getItem('admins')) || []

    const admin = admins.find(
      a => a.email === form.email && a.password === form.password
    )

    if (!admin) {
      alert('Invalid admin credentials')
      return
    }

    localStorage.setItem('currentAdmin', JSON.stringify(admin))
    alert(`Welcome Admin ${admin.firstName}`)
    navigate('/admin/1122/dashboard') // later dashboard
  }

  return (
    <div className="admin-register-container">
      <h2 className="admin-register-title">Admin Login</h2>

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

      <button className="admin-btn-primary" onClick={handleLogin}>
        Login
      </button>
    </div>
  )
}

export default AdminLogin
