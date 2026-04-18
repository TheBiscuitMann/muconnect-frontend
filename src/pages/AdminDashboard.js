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

export default function AdminDashboard() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [time,    setTime]    = useState(new Date());

  useEffect(() => {
    API.get('/portal/dashboard/')
      .then(res => setData(res.data))
      .catch(() => navigate('/login'))
      .finally(() => setLoading(false));
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  const navItems = [
    { icon: '🏠', label: 'Dashboard',       path: '/admin/dashboard' },
    { icon: '📋', label: 'Publish Results', path: '/admin/results',  badge: data?.unpublished_results },
    { icon: '👨‍🎓', label: 'Students',        path: '/admin/students' },
    { icon: '👨‍🏫', label: 'Faculty',         path: '/admin/faculty' },
    { icon: '📢', label: 'Notices',         path: '/admin/notices' },
  ];

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f8fc' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '48px', height: '48px', border: `3px solid ${NAVY}20`, borderTopColor: NAVY, borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 0.8s linear infinite' }} />
        <p style={{ color: GREY, fontSize: '14px' }}>Loading admin panel...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );

  const stats = [
    { icon: '👨‍🎓', label: 'Total Students',      value: data?.total_students,      color: NAVY,      sub: 'Registered users' },
    { icon: '👨‍🏫', label: 'Total Faculty',        value: data?.total_faculty,       color: '#7c3aed', sub: 'Teaching staff' },
    { icon: '📚', label: 'Total Courses',         value: data?.total_courses,       color: '#059669', sub: 'All departments' },
    { icon: '📋', label: 'Pending Results',       value: data?.unpublished_results, color: data?.unpublished_results > 0 ? RED : '#059669', sub: 'Awaiting publish' },
    { icon: '✅', label: 'Published Results',     value: data?.published_results,   color: '#059669', sub: 'Visible to students' },
    { icon: '📢', label: 'Active Notices',        value: data?.active_notices,      color: '#f59e0b', sub: 'Live announcements' },
    { icon: '📝', label: 'Total Enrollments',     value: data?.total_enrollments,   color: '#0891b2', sub: 'Course registrations' },
    { icon: '🏛️', label: 'Departments',           value: data?.total_departments,   color: '#6366f1', sub: 'Academic units' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f7f8fc', fontFamily: 'Segoe UI, sans-serif' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }`}</style>

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
            <p style={{ margin: 0, fontSize: '11px', color: GREY }}>Admin Panel</p>
          </div>
        </div>

        <div style={{ padding: '10px 14px', background: '#f7f8fc', borderRadius: '10px', marginBottom: '20px', border: '1px solid #eee' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: `linear-gradient(135deg, ${NAVY}, ${RED})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '700', fontSize: '13px' }}>A</div>
            <div>
              <p style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: NAVY }}>Administrator</p>
              <p style={{ margin: 0, fontSize: '11px', color: GREY }}>Full access</p>
            </div>
          </div>
        </div>

        <p style={{ margin: '0 0 8px 8px', fontSize: '10px', fontWeight: '700', color: '#ccc', letterSpacing: '2px', textTransform: 'uppercase' }}>Menu</p>
        <nav style={{ flex: 1 }}>
          {navItems.map(item => (
            <NavItem key={item.path} icon={item.icon} label={item.label} badge={item.badge}
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

        {/* Top bar */}
        <div style={{
          background: '#fff', borderBottom: '1px solid #f0f0f0',
          padding: '16px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 8px rgba(30,42,110,0.04)',
        }}>
          <div>
            <p style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: NAVY, fontFamily: 'Georgia, serif' }}>Admin Dashboard</p>
            <p style={{ margin: 0, fontSize: '13px', color: GREY }}>
              {time.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} · {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>

        <div style={{ padding: '32px 36px' }}>

          {/* Alert for unpublished results */}
          {data?.unpublished_results > 0 && (
            <div style={{ background: '#fff0f0', border: `1px solid ${RED}30`, borderLeft: `3px solid ${RED}`, borderRadius: '10px', padding: '14px 18px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', animation: 'fadeUp 0.3s ease' }}>
              <div>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: RED }}>⚠️ {data?.unpublished_results} result{data?.unpublished_results !== 1 ? 's' : ''} pending publication</p>
                <p style={{ margin: '2px 0 0', fontSize: '13px', color: GREY }}>Faculty have submitted grades that are waiting for your review and publishing.</p>
              </div>
              <button onClick={() => navigate('/admin/results')} style={{
                padding: '10px 20px', borderRadius: '8px', border: 'none',
                background: RED, color: '#fff', fontSize: '13px', fontWeight: '700', cursor: 'pointer',
                flexShrink: 0,
              }}>Review & Publish →</button>
            </div>
          )}

          {/* Stats grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '28px' }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: '14px', padding: '20px',
                border: '1px solid #f0f0f0', boxShadow: '0 2px 8px rgba(30,42,110,0.04)',
                position: 'relative', overflow: 'hidden',
                animation: `fadeUp 0.3s ease ${i * 50}ms both`,
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: s.color }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ margin: '0 0 6px', fontSize: '11px', fontWeight: '700', color: GREY, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</p>
                    <p style={{ margin: '0 0 2px', fontSize: '28px', fontWeight: '900', color: s.color, fontFamily: 'Georgia, serif', letterSpacing: '-1px' }}>{s.value}</p>
                    <p style={{ margin: 0, fontSize: '11px', color: '#bbb' }}>{s.sub}</p>
                  </div>
                  <div style={{ fontSize: '24px' }}>{s.icon}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick nav cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
            {[
              { icon: '📋', title: 'Publish Results',   desc: `${data?.unpublished_results} pending — review faculty submissions and make them visible to students`, color: RED,      path: '/admin/results' },
              { icon: '📢', title: 'Manage Notices',    desc: 'Create and manage university announcements shown on the public website', color: '#f59e0b', path: '/admin/notices' },
              { icon: '👨‍🎓', title: 'View Students',     desc: `${data?.total_students} registered students — browse and view their academic records`, color: NAVY,     path: '/admin/students' },
              { icon: '👨‍🏫', title: 'View Faculty',      desc: `${data?.total_faculty} faculty members — view their profiles and department info`, color: '#7c3aed', path: '/admin/faculty' },
            ].map((a, i) => (
              <div key={i} onClick={() => navigate(a.path)} style={{
                background: '#fff', borderRadius: '14px', padding: '22px',
                border: '1px solid #f0f0f0', cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(30,42,110,0.04)', transition: 'all 0.2s',
                display: 'flex', gap: '16px', alignItems: 'flex-start',
              }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(30,42,110,0.1)'; e.currentTarget.style.borderColor = `${a.color}50`; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(30,42,110,0.04)'; e.currentTarget.style.borderColor = '#f0f0f0'; }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${a.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>
                  {a.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 6px', fontSize: '15px', fontWeight: '700', color: NAVY, fontFamily: 'Georgia, serif' }}>{a.title}</h3>
                  <p style={{ margin: 0, fontSize: '13px', color: GREY, lineHeight: 1.5 }}>{a.desc}</p>
                </div>
                <span style={{ color: GREY, fontSize: '18px', flexShrink: 0 }}>→</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}