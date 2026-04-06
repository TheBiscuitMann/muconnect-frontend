import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import muLogo from '../assets/MU_Logo.jpg';

const NAVY = '#1e2a6e';
const RED  = '#e31e24';

export default function Login() {
  const navigate  = useNavigate();
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [mounted,  setMounted]  = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await API.post('/login/', { email, password });
      localStorage.setItem('token', res.data.access);
      localStorage.setItem('user',  JSON.stringify(res.data.user));
      const role = res.data.user.role;
      if (role === 'student') navigate('/student/dashboard');
      else if (role === 'faculty') navigate('/faculty/dashboard');
      else if (role === 'admin') navigate('/admin/dashboard');
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Login failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: '#f7f8fc',
    }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-12px) rotate(2deg); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-8px) rotate(-3deg); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.4; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .login-input {
          width: 100%; box-sizing: border-box;
          padding: 14px 16px; border-radius: 10px;
          border: 1.5px solid #e5e7eb;
          font-size: 15px; font-family: 'Segoe UI', sans-serif;
          color: #1a1a2e; background: #fff;
          outline: none; transition: border-color 0.2s, box-shadow 0.2s;
        }
        .login-input:focus {
          border-color: ${NAVY};
          box-shadow: 0 0 0 3px ${NAVY}18;
        }
        .login-input::placeholder { color: #9ca3af; }
        .login-btn {
          width: 100%; padding: 15px;
          border-radius: 10px; border: none;
          font-size: 15px; font-weight: 700;
          font-family: 'Segoe UI', sans-serif;
          cursor: pointer; transition: all 0.25s;
          background: ${NAVY}; color: #fff;
          letter-spacing: 0.3px;
          position: relative; overflow: hidden;
        }
        .login-btn:hover:not(:disabled) {
          background: ${RED};
          transform: translateY(-1px);
          box-shadow: 0 8px 24px ${RED}50;
        }
        .login-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .back-link {
          color: #6b7280; font-size: 13px;
          font-family: 'Segoe UI', sans-serif;
          cursor: pointer; transition: color 0.2s;
          text-decoration: none; display: inline-flex; align-items: center; gap: 4px;
        }
        .back-link:hover { color: ${NAVY}; }
      `}</style>

      {/* ── LEFT PANEL — branded ─────────────────────────────── */}
      <div style={{
        width: '48%', flexShrink: 0,
        background: `linear-gradient(160deg, #0d1542 0%, ${NAVY} 60%, #2a1a6e 100%)`,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', padding: '52px',
        position: 'relative', overflow: 'hidden',
      }}>

        {/* Background geometric shapes */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {/* Large circle top right */}
          <div style={{
            position: 'absolute', top: '-120px', right: '-120px',
            width: '480px', height: '480px', borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.06)',
          }} />
          <div style={{
            position: 'absolute', top: '-60px', right: '-60px',
            width: '340px', height: '340px', borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.04)',
          }} />
          {/* Floating card 1 */}
          <div style={{
            position: 'absolute', top: '30%', right: '40px',
            width: '180px', padding: '18px 20px',
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '14px',
            animation: 'float 6s ease-in-out infinite',
          }}>
            <div style={{ fontSize: '22px', marginBottom: '6px' }}>🎓</div>
            <p style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#fff', fontFamily: 'Segoe UI, sans-serif' }}>6,000+</p>
            <p style={{ margin: 0, fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontFamily: 'Segoe UI, sans-serif' }}>Active Students</p>
          </div>
          {/* Floating card 2 */}
          <div style={{
            position: 'absolute', top: '52%', right: '80px',
            width: '160px', padding: '16px 18px',
            background: `rgba(227,30,36,0.15)`,
            border: `1px solid ${RED}40`,
            borderRadius: '12px',
            animation: 'floatB 7s ease-in-out infinite',
          }}>
            <div style={{ fontSize: '20px', marginBottom: '6px' }}>📊</div>
            <p style={{ margin: 0, fontSize: '12px', fontWeight: '700', color: '#fff', fontFamily: 'Segoe UI, sans-serif' }}>Digital Results</p>
            <p style={{ margin: 0, fontSize: '11px', color: 'rgba(255,255,255,0.45)', fontFamily: 'Segoe UI, sans-serif' }}>Instant access</p>
          </div>
          {/* Floating card 3 */}
          <div style={{
            position: 'absolute', bottom: '22%', left: '32px',
            width: '150px', padding: '14px 16px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px',
            animation: 'float 8s ease-in-out infinite 1s',
          }}>
            <div style={{ fontSize: '18px', marginBottom: '6px' }}>📄</div>
            <p style={{ margin: 0, fontSize: '12px', fontWeight: '700', color: '#fff', fontFamily: 'Segoe UI, sans-serif' }}>Transcripts</p>
            <p style={{ margin: 0, fontSize: '11px', color: 'rgba(255,255,255,0.45)', fontFamily: 'Segoe UI, sans-serif' }}>Download anytime</p>
          </div>
          {/* Dot grid */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.04,
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }} />
          {/* Red bottom glow */}
          <div style={{
            position: 'absolute', bottom: '-100px', left: '-100px',
            width: '400px', height: '400px', borderRadius: '50%',
            background: `radial-gradient(circle, ${RED}30 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }} />
        </div>

        {/* Top — logo */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            background: '#fff', display: 'inline-block',
            padding: '8px 16px', borderRadius: '10px',
            marginBottom: '0',
          }}>
            <img src={muLogo} alt="MU" style={{ height: '36px', objectFit: 'contain', display: 'block' }} />
          </div>
        </div>

        {/* Middle — headline */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* Live badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderLeft: `3px solid ${RED}`,
            padding: '6px 14px', borderRadius: '4px',
            marginBottom: '28px',
          }}>
            <div style={{
              width: '7px', height: '7px', borderRadius: '50%', background: '#4ade80',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute', inset: '-3px', borderRadius: '50%',
                border: '1px solid #4ade80',
                animation: 'pulse-ring 1.5s ease-out infinite',
              }} />
            </div>
            <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '11px', fontWeight: '600', letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: 'Segoe UI, sans-serif' }}>
              Portal Live · Spring 2026
            </span>
          </div>

          <h1 style={{
            margin: '0 0 16px', fontSize: '52px', fontWeight: '900',
            color: '#fff', lineHeight: 1.05, letterSpacing: '-2px',
            fontFamily: 'Georgia, serif',
          }}>
            Your academic<br />
            life, <span style={{ color: RED }}>unified.</span>
          </h1>
          <p style={{
            margin: 0, fontSize: '16px', color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.75, maxWidth: '340px',
            fontFamily: 'Segoe UI, sans-serif', fontWeight: '400',
          }}>
            Results, transcripts, notices and more — all in one secure place for MU students.
          </p>
        </div>

        {/* Bottom — stats row */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', gap: '32px' }}>
          {[
            { val: '22+',    label: 'Years' },
            { val: '250+',   label: 'Faculty' },
            { val: '100%',   label: 'Chartered' },
          ].map((s, i) => (
            <div key={i}>
              <p style={{ margin: '0 0 2px', fontSize: '22px', fontWeight: '900', color: '#fff', letterSpacing: '-1px', fontFamily: 'Georgia, serif' }}>{s.val}</p>
              <p style={{ margin: 0, fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'Segoe UI, sans-serif' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL — login form ─────────────────────────── */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '48px', background: '#f7f8fc',
        position: 'relative',
      }}>

        {/* Back to website */}
        <div style={{ position: 'absolute', top: '32px', right: '40px' }}>
          <span className="back-link" onClick={() => navigate('/')}>
            ← Back to website
          </span>
        </div>

        <div style={{
          width: '100%', maxWidth: '400px',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.5s ease',
        }}>

          {/* Form header */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{
              margin: '0 0 8px', fontSize: '32px', fontWeight: '900',
              color: NAVY, letterSpacing: '-1px',
              fontFamily: 'Georgia, serif',
            }}>Welcome back</h2>
            <p style={{ margin: 0, fontSize: '15px', color: '#6b7280', fontFamily: 'Segoe UI, sans-serif' }}>
              Sign in to your MU Connect account
            </p>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: '#fff0f0', border: `1px solid ${RED}30`,
              borderLeft: `3px solid ${RED}`,
              borderRadius: '8px', padding: '12px 16px',
              marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <span style={{ fontSize: '16px' }}>⚠️</span>
              <p style={{ margin: 0, fontSize: '13px', color: '#c0392b', fontFamily: 'Segoe UI, sans-serif', fontWeight: '500' }}>{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin}>

            {/* Email field */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: NAVY, fontFamily: 'Segoe UI, sans-serif', letterSpacing: '0.3px' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px', pointerEvents: 'none' }}>✉️</span>
                <input
                  type="email"
                  className="login-input"
                  placeholder="your@metrouni.edu.bd"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{ paddingLeft: '44px' }}
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: NAVY, fontFamily: 'Segoe UI, sans-serif', letterSpacing: '0.3px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px', pointerEvents: 'none' }}>🔒</span>
                <input
                  type={showPass ? 'text' : 'password'}
                  className="login-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ paddingLeft: '44px', paddingRight: '44px' }}
                  required
                />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{
                  position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px',
                  color: '#9ca3af', padding: 0, fontFamily: 'Segoe UI, sans-serif',
                }}>
                  {showPass ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div style={{ textAlign: 'right', marginBottom: '28px' }}>
              <span style={{ fontSize: '13px', color: NAVY, cursor: 'pointer', fontFamily: 'Segoe UI, sans-serif', fontWeight: '500' }}
                onMouseOver={e => e.target.style.color = RED}
                onMouseOut={e => e.target.style.color = NAVY}
              >Forgot password?</span>
            </div>

            {/* Submit */}
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <span style={{
                    width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: '#fff', borderRadius: '50%',
                    display: 'inline-block', animation: 'spin-slow 0.7s linear infinite',
                  }} />
                  Signing in...
                </span>
              ) : 'Sign In →'}
            </button>

          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '28px 0' }}>
            <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
            <span style={{ fontSize: '12px', color: '#9ca3af', fontFamily: 'Segoe UI, sans-serif' }}>Metropolitan University</span>
            <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
          </div>

          {/* Quick login hint */}
          <div style={{
            background: '#fff', border: '1px solid #eee',
            borderRadius: '10px', padding: '16px 18px',
          }}>
            <p style={{ margin: '0 0 10px', fontSize: '12px', fontWeight: '700', color: NAVY, fontFamily: 'Segoe UI, sans-serif', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Need help signing in?
            </p>
            <p style={{ margin: '0 0 6px', fontSize: '13px', color: '#6b7280', fontFamily: 'Segoe UI, sans-serif', lineHeight: 1.6 }}>
              Contact the Registrar's Office or IT Support for login assistance.
            </p>
            <p style={{ margin: 0, fontSize: '13px', color: NAVY, fontFamily: 'Segoe UI, sans-serif', fontWeight: '600' }}>
              📞 +880 821 000000
            </p>
          </div>

          {/* Footer text */}
          <p style={{ textAlign: 'center', marginTop: '32px', fontSize: '12px', color: '#9ca3af', fontFamily: 'Segoe UI, sans-serif' }}>
            © 2026 Metropolitan University, Sylhet
          </p>
        </div>
      </div>
    </div>
  );
}