import React from 'react'
import './admin.css'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const admin = JSON.parse(localStorage.getItem('currentAdmin'))

  const handleLogout = () => {
    localStorage.removeItem('currentAdmin')
    navigate('/admin/1122')
  }

  if (!admin) {
    navigate('/admin/1122/login')
    return null
  }

  return (
    <div className="admin-dashboard-container">
      <h1 className="admin-title">Welcome, {admin.firstName} 👑</h1>
      <h2 className="admin-heading">Admin Dashboard</h2>
      <p className="admin-desc">
        Yahan se tum users manage, tasks control, aur analytics check kar saktay ho.
      </p>

      <div className="admin-btn-group">
        <button className="admin-btn-primary">Manage Users <span className="shine"></span></button>
        <button className="admin-btn-secondary">View Reports <span className="shine"></span></button>
        <button className="admin-top-login" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default AdminDashboard
