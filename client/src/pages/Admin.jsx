import { useState } from 'react'
import { useAuth } from '../AuthContext'
import * as api from '../api'

export default function Admin() {
  const { user, token, isAdmin, signIn, signOut } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await api.login(email, password)
      signIn(res.data.token, res.data.user)
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  if (!user) {
    return (
      <div className="admin-page">
        <h1 className="page-title">Admin Login</h1>
        <form onSubmit={handleLogin} className="auth-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />
          {error && <div className="error-msg">{error}</div>}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1 className="page-title">Admin Panel</h1>
        <div className="admin-user">
          <span>{user.email}</span>
          <span className="badge" style={{ backgroundColor: isAdmin ? '#facc15' : '#6b7280', color: '#000' }}>
            {user.role}
          </span>
          <button onClick={signOut} className="btn btn-pagination">Logout</button>
        </div>
      </div>
      <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>
        You are logged in. Admin endpoints require the ADMIN role to create, update, or delete resources via the API.
        Use the API documentation or tools like Postman to manage universe data.
      </p>
      <div className="admin-info">
        <h3>API Credentials</h3>
        <div className="admin-token">
          <span className="detail-label">Token</span>
          <code className="token-display">{token?.slice(0, 50)}...</code>
          <button onClick={() => navigator.clipboard.writeText(token)} className="btn btn-pagination">
            Copy
          </button>
        </div>
      </div>
    </div>
  )
}
