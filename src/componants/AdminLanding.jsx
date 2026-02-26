import React from 'react'
import './admin.css'
import { useNavigate } from 'react-router-dom'


const AdminLanding = () => {
  const navigate = useNavigate()

  return (
    <div className="admin-landing-container">
      {/* Top-right login button */}
      <button 
        className="admin-top-login"
        onClick={() => navigate('/login')}
      >
        Login
      </button>

      <div className="admin-content">
        <h1 className="admin-title">TaskManagerPro <span className="pro-badge">Pro</span></h1>
        <h2 className="admin-heading">Admin Panel</h2>
        <p className="admin-desc">
          Welcome to the Admin Panel! Manage users, tasks, and stats efficiently.
        </p>

        <div className="admin-btn-group">
          <button 
              onClick={() => navigate('/admin/1122/register')} 
               className="admin-btn-primary"
          >
            Register
            <span className="shine"></span>
          </button>
          <button 
            onClick={() => navigate('/admin/1122/login')} 
            className="admin-btn-secondary"
          >
            Login
            <span className="shine"></span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminLanding
