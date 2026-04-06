import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import API from '../services/api';

const NAVY = '#1e2a6e';
const RED  = '#e31e24';
const GREY = '#6b7280';

function NavItem({ icon, label, active, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onClick={onClick}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        padding: '11px 16px', borderRadius: '10px', cursor: 'pointer',
        background: active ? NAVY : hovered ? '#f0f3ff' : 'transparent',
        color: active ? '#fff' : hovered ? NAVY : GREY,
        transition: 'all 0.2s', marginBottom: '2px',
        borderLeft: active ? `3px solid ${RED}` : '3px solid transparent',
      }}>
      <span style={{ fontSize: '18px', width: '22px', textAlign: 'center' }}>{icon}</span>
      <span style={{ fontSize: '14px', fontWeight: active ? '700' : '500' }}>{label}</span>
      {active && <div style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: RED }} />}
    </div>
  );
}

export default function Profile() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [profile,  setProfile]  = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [editing,  setEditing]  = useState(false);
  const [saving,   setSaving]   = useState(false);
  const [success,  setSuccess]  = useState(false);
  const [error,    setError]    = useState('');
  const [form,     setForm]     = useState({ first_name: '', last_name: '', phone: '' });

  const navItems = [
    { icon: '🏠', label: 'Dashboard',  path: '/student/dashboard' },
    { icon: '📊', label: 'My Results', path: '/student/results' },
    { icon: '📄', label: 'Transcript', path: '/student/transcript' },
    { icon: '👤', label: 'Profile',    path: '/student/profile' },
  ];

  useEffect(() => {
    API.get('/student/profile/')
      .then(res => {
        setProfile(res.data);
        setForm({
          first_name: res.data.first_name || '',
          last_name:  res.data.last_name  || '',
          phone:      res.data.phone      || '',
        });
      })
      .catch(() => navigate('/login'))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      await API.put('/student/profile/', form);
      setProfile(prev => ({
        ...prev,
        name:       `${form.first_name} ${form.last_name}`,
        first_name: form.first_name,
        last_name:  form.last_name,
        phone:      form.phone,
      }));
      setEditing(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f8fc' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '48px', height: '48px', border: `3px solid ${NAVY}20`, borderTopColor: NAVY, borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 0.8s linear infinite' }} />
        <p style={{ color: GREY, fontSize: '14px' }}>Loading profile...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );

  const initials = `${profile?.first_name?.charAt(0) || ''}${profile?.last_name?.charAt(0) || ''}`;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f7f8fc', fontFamily: 'Segoe UI, sans-serif' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* ── SIDEBAR ── */}
      <div style={{
        width: '240px', flexShrink: 0, background: '#fff',
        borderRight: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column',
        padding: '24px 16px', boxShadow: '2px 0 12px rgba(30,42,110,0.04)',
        position: 'sticky', top: 0, height: '100vh', overflowY: 'auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 8px 24px', borderBottom: '1px solid #f5f5f5', marginBottom: '16px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: NAVY, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '14px', color: '#fff' }}>MU</div>
          <div>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: NAVY }}>MU Connect</p>
            <p style={{ margin: 0, fontSize: '11px', color: GREY }}>Student Portal</p>
          </div>
        </div>

        <p style={{ margin: '0 0 8px 8px', fontSize: '10px', fontWeight: '700', color: '#ccc', letterSpacing: '2px', textTransform: 'uppercase' }}>Menu</p>
        <nav style={{ flex: 1 }}>
          {navItems.map(item => (
            <NavItem key={item.path} icon={item.icon} label={item.label}
              active={location.pathname === item.path}
              onClick={() => navigate(item.path)} />
          ))}
        </nav>

        <div style={{ borderTop: '1px solid #f5f5f5', paddingTop: '16px' }}>
          <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', borderRadius: '10px', cursor: 'pointer', color: GREY, marginBottom: '4px' }}
            onMouseOver={e => { e.currentTarget.style.background = '#f7f8fc'; e.currentTarget.style.color = NAVY; }}
            onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = GREY; }}>
            <span>🌐</span><span style={{ fontSize: '13px', fontWeight: '500' }}>Main Website</span>
          </div>
          <div onClick={() => { localStorage.clear(); navigate('/login'); }} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', borderRadius: '10px', cursor: 'pointer', color: RED }}
            onMouseOver={e => e.currentTarget.style.background = '#fff0f0'}
            onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
            <span>🚪</span><span style={{ fontSize: '13px', fontWeight: '600' }}>Logout</span>
          </div>
        </div>
      </div>

      {/* ── MAIN ── */}
      <div style={{ flex: 1, overflow: 'auto' }}>

        {/* Top bar */}
        <div style={{
          background: '#fff', borderBottom: '1px solid #f0f0f0',
          padding: '16px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 8px rgba(30,42,110,0.04)',
        }}>
          <div>
            <p style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: NAVY, fontFamily: 'Georgia, serif' }}>My Profile</p>
            <p style={{ margin: 0, fontSize: '13px', color: GREY }}>View and update your personal information</p>
          </div>
          {!editing ? (
            <button onClick={() => setEditing(true)} style={{
              padding: '10px 24px', borderRadius: '8px', fontSize: '13px',
              fontWeight: '700', cursor: 'pointer', border: `2px solid ${NAVY}`,
              background: 'transparent', color: NAVY, transition: 'all 0.2s',
            }}
              onMouseOver={e => { e.currentTarget.style.background = NAVY; e.currentTarget.style.color = '#fff'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = NAVY; }}
            >✏️ Edit Profile</button>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => { setEditing(false); setError(''); }} style={{
                padding: '10px 20px', borderRadius: '8px', fontSize: '13px',
                fontWeight: '600', cursor: 'pointer', border: '1px solid #eee',
                background: '#fff', color: GREY, transition: 'all 0.2s',
              }}>Cancel</button>
              <button onClick={handleSave} disabled={saving} style={{
                padding: '10px 24px', borderRadius: '8px', fontSize: '13px',
                fontWeight: '700', cursor: 'pointer', border: 'none',
                background: NAVY, color: '#fff', transition: 'all 0.2s',
              }}
                onMouseOver={e => e.currentTarget.style.background = RED}
                onMouseOut={e => e.currentTarget.style.background = NAVY}
              >{saving ? 'Saving...' : '✓ Save Changes'}</button>
            </div>
          )}
        </div>

        <div style={{ padding: '32px 36px', maxWidth: '860px' }}>

          {/* Success message */}
          {success && (
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderLeft: '3px solid #16a34a', borderRadius: '8px', padding: '12px 16px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>✅</span>
              <p style={{ margin: 0, fontSize: '14px', color: '#15803d', fontWeight: '500' }}>Profile updated successfully!</p>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div style={{ background: '#fff0f0', border: '1px solid #fecaca', borderLeft: `3px solid ${RED}`, borderRadius: '8px', padding: '12px 16px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>⚠️</span>
              <p style={{ margin: 0, fontSize: '14px', color: '#c0392b', fontWeight: '500' }}>{error}</p>
            </div>
          )}

          {/* Profile header card */}
          <div style={{
            background: '#fff', borderRadius: '16px', padding: '32px',
            border: '1px solid #f0f0f0', boxShadow: '0 2px 12px rgba(30,42,110,0.06)',
            marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '28px',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg, ${NAVY}, ${RED})` }} />

            {/* Avatar */}
            <div style={{
              width: '100px', height: '100px', borderRadius: '50%', flexShrink: 0,
              background: `linear-gradient(135deg, ${NAVY}, ${RED})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '36px', fontWeight: '900', color: '#fff',
              fontFamily: 'Georgia, serif', letterSpacing: '-1px',
              boxShadow: `0 8px 24px ${NAVY}30`,
            }}>{initials}</div>

            <div style={{ flex: 1 }}>
              <h2 style={{ margin: '0 0 4px', fontSize: '26px', fontWeight: '900', color: NAVY, fontFamily: 'Georgia, serif', letterSpacing: '-0.5px' }}>
                {profile?.name}
              </h2>
              <p style={{ margin: '0 0 16px', fontSize: '14px', color: GREY }}>{profile?.department} · Batch {profile?.batch}</p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {[
                  { label: 'Student ID', value: profile?.student_id, color: NAVY },
                  { label: 'CGPA',       value: profile?.cgpa,       color: RED  },
                  { label: 'Semester',   value: `Sem ${profile?.current_semester}`, color: '#7c3aed' },
                ].map((badge, i) => (
                  <div key={i} style={{ background: `${badge.color}10`, border: `1px solid ${badge.color}25`, borderRadius: '8px', padding: '8px 16px' }}>
                    <p style={{ margin: '0 0 2px', fontSize: '10px', fontWeight: '700', color: badge.color, textTransform: 'uppercase', letterSpacing: '1px' }}>{badge.label}</p>
                    <p style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: badge.color, fontFamily: 'Georgia, serif' }}>{badge.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Info cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

            {/* Personal information */}
            <div style={{ background: '#fff', borderRadius: '16px', padding: '28px', border: '1px solid #f0f0f0', boxShadow: '0 2px 8px rgba(30,42,110,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: NAVY, fontFamily: 'Georgia, serif' }}>Personal Information</h3>
                <div style={{ width: '4px', height: '20px', background: RED, borderRadius: '2px' }} />
              </div>

              {editing ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {[
                    { label: 'First Name', key: 'first_name', type: 'text' },
                    { label: 'Last Name',  key: 'last_name',  type: 'text' },
                    { label: 'Phone',      key: 'phone',      type: 'tel'  },
                  ].map(field => (
                    <div key={field.key}>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: GREY, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        value={form[field.key]}
                        onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                        style={{
                          width: '100%', boxSizing: 'border-box',
                          padding: '10px 14px', borderRadius: '8px',
                          border: `1.5px solid #e5e7eb`, fontSize: '14px',
                          color: NAVY, outline: 'none', transition: 'border-color 0.2s',
                          fontFamily: 'Segoe UI, sans-serif',
                        }}
                        onFocus={e => e.target.style.borderColor = NAVY}
                        onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {[
                    { label: 'First Name', value: profile?.first_name },
                    { label: 'Last Name',  value: profile?.last_name },
                    { label: 'Phone',      value: profile?.phone || 'Not provided' },
                  ].map((item, i) => (
                    <div key={i} style={{ paddingBottom: '14px', borderBottom: i < 2 ? '1px solid #f5f5f5' : 'none' }}>
                      <p style={{ margin: '0 0 4px', fontSize: '11px', fontWeight: '700', color: GREY, textTransform: 'uppercase', letterSpacing: '1px' }}>{item.label}</p>
                      <p style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: item.value === 'Not provided' ? '#ccc' : NAVY }}>{item.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Academic information (read-only) */}
            <div style={{ background: '#fff', borderRadius: '16px', padding: '28px', border: '1px solid #f0f0f0', boxShadow: '0 2px 8px rgba(30,42,110,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: NAVY, fontFamily: 'Georgia, serif' }}>Academic Information</h3>
                <div style={{ width: '4px', height: '20px', background: NAVY, borderRadius: '2px' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { label: 'Student ID',       value: profile?.student_id },
                  { label: 'Email Address',    value: profile?.email },
                  { label: 'Department',       value: profile?.department },
                  { label: 'Batch',            value: profile?.batch },
                  { label: 'Current Semester', value: `Semester ${profile?.current_semester}` },
                  { label: 'CGPA',             value: profile?.cgpa },
                ].map((item, i) => (
                  <div key={i} style={{ paddingBottom: '14px', borderBottom: i < 5 ? '1px solid #f5f5f5' : 'none' }}>
                    <p style={{ margin: '0 0 4px', fontSize: '11px', fontWeight: '700', color: GREY, textTransform: 'uppercase', letterSpacing: '1px' }}>{item.label}</p>
                    <p style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: NAVY }}>{item.value}</p>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '16px', padding: '10px 14px', background: '#f7f8fc', borderRadius: '8px', border: '1px solid #eee' }}>
                <p style={{ margin: 0, fontSize: '12px', color: GREY }}>
                  🔒 Academic information can only be changed by the Registrar's Office.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}