import { useState } from 'react'

const Register = ({ onRegister }) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [passwordStrength, setPasswordStrength] = useState('') // weak | medium | strong

  // -------------------------
  // Handle input changes
  // -------------------------
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })

    if (name === 'password') {
      evaluatePassword(value)
    }
  }

  // -------------------------
  // Password strength checker
  // -------------------------
  const evaluatePassword = (password) => {
    const hasLower = /[a-z]/.test(password)
    const hasUpper = /[A-Z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    const score = [hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean).length

    if (score < 2) setPasswordStrength('weak')
    else if (score === 2 || score === 3) setPasswordStrength('medium')
    else if (score === 4) setPasswordStrength('strong')
  }

  // -------------------------
  // Register User (AUTH)
  // -------------------------
  const handleRegister = () => {
    const { firstName, lastName, email, password, confirmPassword } = form

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      alert('Please fill all fields!')
      return
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }

    if (passwordStrength !== 'strong') {
      alert('Password must be strong!')
      return
    }

    // 🔐 Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || []

    // ❌ Check duplicate email
    const userExists = users.find(user => user.email === email)
    if (userExists) {
      alert('User already registered with this email!')
      return
    }

    // ✅ Save new user
    const newUser = {
      firstName,
      lastName,
      email,
      password
    }

    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))

    alert('Registration successful! Please login.')
    onRegister()
  }

  // -------------------------
  // UI helpers
  // -------------------------
  const strengthColor = {
    weak: '#f56565',    // red
    medium: '#ecc94b',  // yellow
    strong: '#48bb78'   // green
  }

  const strengthLabel = {
    weak: 'Weak',
    medium: 'Medium',
    strong: 'Strong'
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
        Register
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          className="task-input"
          placeholder="First Name"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
        />

        <input
          className="task-input"
          placeholder="Last Name"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
        />

        <input
          className="task-input"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          className="task-input"
          placeholder="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />

        {/* Password strength bar */}
        {form.password && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div
              style={{
                flex: 1,
                height: '6px',
                borderRadius: '4px',
                backgroundColor: strengthColor[passwordStrength] || '#e2e8f0',
                transition: '0.3s'
              }}
            />
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: '600',
                color: strengthColor[passwordStrength] || '#718096'
              }}
            >
              {strengthLabel[passwordStrength]}
            </span>
          </div>
        )}

        <input
          className="task-input"
          placeholder="Confirm Password"
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        <button
          className="add-btn"
          onClick={handleRegister}
          style={{
            marginTop: '1rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          Register
        </button>
      </div>
    </div>
  )
}

export default Register
