import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import API from '../services/api';

const NAVY = '#1e2a6e';
const RED  = '#e31e24';
const GREY = '#6b7280';

function NavItem({ icon, label, active, onClick, badge }) {
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
      {badge > 0 && <span style={{ marginLeft: 'auto', background: RED, color: '#fff', borderRadius: '10px', padding: '2px 7px', fontSize: '10px', fontWeight: '700' }}>{badge}</span>}
      {active && !badge && <div style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: RED }} />}
    </div>
  );
}

export default function FacultyCourses() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/faculty/courses/')
      .then(res => setCourses(res.data))
      .catch(() => navigate('/login'))
      .finally(() => setLoading(false));
  }, [navigate]);

  const navItems = [
    { icon: '🏠', label: 'Dashboard',          path: '/faculty/dashboard' },
    { icon: '📚', label: 'My Courses',          path: '/faculty/courses' },
    { icon: '📋', label: 'Retake Applications', path: '/faculty/retakes' },
    { icon: '📅', label: 'Attendance',          path: '/faculty/attendance' },
  ];

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f8fc' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '48px', height: '48px', border: `3px solid ${NAVY}20`, borderTopColor: NAVY, borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 0.8s linear infinite' }} />
        <p style={{ color: GREY, fontSize: '14px' }}>Loading courses...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f7f8fc', fontFamily: 'Segoe UI, sans-serif' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }`}</style>

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
            <p style={{ margin: 0, fontSize: '11px', color: GREY }}>Faculty Portal</p>
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
          <div onClick={() => { localStorage.clear(); navigate('/login'); }} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', borderRadius: '10px', cursor: 'pointer', color: RED }}
            onMouseOver={e => e.currentTarget.style.background = '#fff0f0'}
            onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
            <span>🚪</span><span style={{ fontSize: '13px', fontWeight: '600' }}>Logout</span>
          </div>
        </div>
      </div>

      {/* ── MAIN ── */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <div style={{
          background: '#fff', borderBottom: '1px solid #f0f0f0',
          padding: '16px 36px', position: 'sticky', top: 0, zIndex: 100,
          boxShadow: '0 1px 8px rgba(30,42,110,0.04)',
        }}>
          <p style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: NAVY, fontFamily: 'Georgia, serif' }}>My Courses</p>
          <p style={{ margin: 0, fontSize: '13px', color: GREY }}>{courses.length} course{courses.length !== 1 ? 's' : ''} assigned to you this semester</p>
        </div>

        <div style={{ padding: '28px 36px' }}>
          {courses.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0' }}>
              <div style={{ fontSize: '56px', marginBottom: '16px' }}>📭</div>
              <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: '700', color: NAVY, fontFamily: 'Georgia, serif' }}>No courses assigned yet</h3>
              <p style={{ margin: 0, color: GREY, fontSize: '14px' }}>Your courses will appear here once assigned by the admin.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '16px' }}>
              {courses.map((c, i) => {
                const allGraded = c.pending === 0;
                return (
                  <div key={c.id} style={{
                    background: '#fff', borderRadius: '16px', padding: '24px',
                    border: '1px solid #f0f0f0', boxShadow: '0 2px 8px rgba(30,42,110,0.04)',
                    transition: 'all 0.25s', cursor: 'pointer',
                    animation: `fadeIn 0.3s ease ${i * 80}ms both`,
                    position: 'relative', overflow: 'hidden',
                  }}
                    onClick={() => navigate(`/faculty/grades/${c.id}`)}
                    onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(30,42,110,0.1)'; e.currentTarget.style.borderColor = `${NAVY}40`; }}
                    onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(30,42,110,0.04)'; e.currentTarget.style.borderColor = '#f0f0f0'; }}
                  >
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: allGraded ? '#059669' : RED }} />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: '11px', fontWeight: '700', color: GREY, letterSpacing: '0.5px' }}>{c.code}</span>
                        <h3 style={{ margin: '4px 0 0', fontSize: '16px', fontWeight: '700', color: NAVY, fontFamily: 'Georgia, serif', lineHeight: 1.3 }}>{c.title}</h3>
                      </div>
                      <div style={{
                        padding: '4px 10px', borderRadius: '20px', flexShrink: 0, marginLeft: '12px',
                        background: allGraded ? '#f0fdf4' : '#fff0f0',
                        border: allGraded ? '1px solid #bbf7d0' : `1px solid ${RED}30`,
                        color: allGraded ? '#16a34a' : RED,
                        fontSize: '10px', fontWeight: '700',
                      }}>
                        {allGraded ? '✓ All Graded' : `${c.pending} Pending`}
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px' }}>
                      {[
                        { label: 'Credit',    value: c.credit },
                        { label: 'Enrolled',  value: c.enrolled },
                        { label: 'Graded',    value: c.graded },
                      ].map((s, j) => (
                        <div key={j} style={{ background: '#f7f8fc', borderRadius: '8px', padding: '8px', textAlign: 'center' }}>
                          <p style={{ margin: '0 0 2px', fontSize: '10px', color: GREY, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</p>
                          <p style={{ margin: 0, fontSize: '16px', fontWeight: '900', color: NAVY, fontFamily: 'Georgia, serif' }}>{s.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Progress bar */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '11px', color: GREY }}>Grading Progress</span>
                        <span style={{ fontSize: '11px', fontWeight: '700', color: allGraded ? '#059669' : NAVY }}>
                          {c.enrolled > 0 ? Math.round((c.graded / c.enrolled) * 100) : 0}%
                        </span>
                      </div>
                      <div style={{ height: '6px', background: '#f0f0f0', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%',
                          width: `${c.enrolled > 0 ? (c.graded / c.enrolled) * 100 : 0}%`,
                          background: allGraded ? '#059669' : `linear-gradient(90deg, ${NAVY}, ${RED})`,
                          borderRadius: '3px', transition: 'width 0.8s ease',
                        }} />
                      </div>
                    </div>

                    <button style={{
                      marginTop: '14px', width: '100%', padding: '10px', borderRadius: '8px',
                      border: 'none', background: NAVY, color: '#fff',
                      fontSize: '13px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s',
                    }}
                      onMouseOver={e => e.currentTarget.style.background = RED}
                      onMouseOut={e => e.currentTarget.style.background = NAVY}
                    >
                      {allGraded ? '✓ View Grades' : '✏️ Submit Grades →'}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}