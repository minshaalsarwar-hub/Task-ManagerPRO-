import { useState } from 'react'

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)

  // -------------------------
  // Handle input changes
  // -------------------------
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  // -------------------------
  // Login (AUTH)
  // -------------------------
  const handleLogin = () => {
    if (!form.email || !form.password) {
      alert('Please fill all fields!')
      return
    }

    // 🔐 Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || []

    // 🔍 Find matching user
    const user = users.find(
      u => u.email === form.email && u.password === form.password
    )

    if (!user) {
      alert('Invalid email or password!')
      return
    }

    // ✅ Login success
    localStorage.setItem('currentUser', JSON.stringify(user))
    alert(`Welcome back, ${user.firstName}!`)

    // Reload app to reflect login state
    window.location.reload()
  }

  // -------------------------
  // Render
  // -------------------------
  return (
    <div className="dashboard" style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h3
        className="dashboard-title"
        style={{ marginBottom: '1.5rem', textAlign: 'center' }}
      >
        Login
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          className="task-input"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <input
            className="task-input"
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={form.password}
            onChange={handleChange}
            style={{ flex: 1 }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '10px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.9rem',
              color: 'whitesmoke'
            }}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <button
          className="add-btn"
          onClick={handleLogin}
          style={{
            marginTop: '1rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Login
