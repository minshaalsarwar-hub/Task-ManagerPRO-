import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './componants/Header.jsx'
import Register from './componants/Register.jsx'
import Login from './componants/Login.jsx'
import UserTaskDashboard from './componants/UserTaskDashboard.jsx'
import DashboardHeader from './componants/DashboardHeader.jsx'

// NEW
import AdminLanding from './componants/AdminLanding.jsx'
import AdminRegister from './componants/AdminRegister.jsx'
import AdminLogin from './componants/AdminLogin.jsx'
import AdminDashboard from './componants/AdminDashboard.jsx'


function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [view, setView] = useState('home') // user dashboard view

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    if (user) {
      setCurrentUser(user)
      setView('home')
    }
  }, [])

  const handleLogout = () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete your account permanently?'
    )
    if (!confirmDelete) return
    const users = JSON.parse(localStorage.getItem('users')) || []
    const updatedUsers = users.filter(u => u.email !== currentUser.email)
    localStorage.setItem('users', JSON.stringify(updatedUsers))
    localStorage.removeItem('currentUser')
    setCurrentUser(null)
    setView('home')
    alert('Your account has been deleted successfully.')
  }

  return (
    <Routes>
      {/* ------------------ USER DASHBOARD ROUTES ------------------ */}
      <Route
        path="/"
        element={
          <div className="app">
            <div className="container">
              {!currentUser && (
                <Header
                  onGetStarted={() => setView('register')}
                  onLoginClick={() => setView('login')}
                  showHeader={!currentUser}
                />
              )}
              {currentUser && (
                <DashboardHeader
                  currentUser={currentUser}
                  onLogout={handleLogout}
                />
              )}

              <div className="divider"></div>

              {view === 'register' && !currentUser && (
                <Register onRegister={() => setView('login')} />
              )}
              {view === 'login' && !currentUser && <Login />}
              {view === 'home' && currentUser && (
                <UserTaskDashboard
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              )}
              {view === 'home' && !currentUser && (
                <p style={{ textAlign: 'center', opacity: 0.7 }}>
                  🔒 Please login to access your dashboard
                </p>
              )}
            </div>
          </div>
        }
      />

      {/* ------------------ ADMIN PAGE ------------------ */}
      <Route path="/admin/1122" element={<AdminLanding />} />
      <Route path="/admin/1122/register" element={<AdminRegister />} />
      <Route path="/admin/1122/login" element={<AdminLogin />} />
      <Route path="/admin/1122/dashboard" element={<AdminDashboard />} />

    </Routes>
  )
}

export default App
