import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Login() {
  const navigate  = useNavigate();
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await API.post('/login/', { email, password });
      localStorage.setItem('token', res.data.access);
      localStorage.setItem('user',  JSON.stringify(res.data.user));

      if (res.data.user.role === 'student') navigate('/student/dashboard');
      else if (res.data.user.role === 'faculty') navigate('/faculty/dashboard');
      else if (res.data.user.role === 'admin') navigate('/admin/dashboard');

    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        {/* Logo */}
        <div style={styles.logoBox}>
          <span style={styles.logoText}>MU</span>
        </div>
        <h2 style={styles.title}>MU Connect</h2>
        <p style={styles.subtitle}>Metropolitan University Portal</p>

        {/* Error message */}
        {error && <div style={styles.error}>{error}</div>}

        {/* Form */}
        <form onSubmit={handleLogin}>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              style={styles.input}
              placeholder="your@metrouni.edu.bd"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            style={loading ? styles.buttonDisabled : styles.button}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p style={styles.footer}>
          Metropolitan University, Sylhet
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f0f4f8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '40px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    textAlign: 'center',
  },
  logoBox: {
    width: '60px',
    height: '60px',
    background: '#1a3a5c',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
  },
  logoText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: '22px',
  },
  title: {
    margin: '0 0 4px',
    fontSize: '24px',
    color: '#1a3a5c',
  },
  subtitle: {
    margin: '0 0 24px',
    fontSize: '13px',
    color: '#888',
  },
  error: {
    background: '#fff0f0',
    color: '#cc0000',
    padding: '10px',
    borderRadius: '6px',
    marginBottom: '16px',
    fontSize: '13px',
  },
  field: {
    marginBottom: '16px',
    textAlign: 'left',
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '500',
    color: '#444',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    boxSizing: 'border-box',
    outline: 'none',
  },
  button: {
    width: '100%',
    padding: '12px',
    background: '#1a3a5c',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    marginTop: '8px',
  },
  buttonDisabled: {
    width: '100%',
    padding: '12px',
    background: '#aaa',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '15px',
    cursor: 'not-allowed',
    marginTop: '8px',
  },
  footer: {
    marginTop: '24px',
    fontSize: '12px',
    color: '#aaa',
  },
};

export default Login;