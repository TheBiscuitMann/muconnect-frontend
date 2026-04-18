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

export default function AdminFaculty() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [faculty,  setFaculty]  = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search,   setSearch]   = useState('');
  const [loading,  setLoading]  = useState(true);
  const [pending,  setPending]  = useState(0);

  const navItems = [
    { icon: '🏠', label: 'Dashboard',       path: '/admin/dashboard' },
    { icon: '📋', label: 'Publish Results', path: '/admin/results',  badge: pending },
    { icon: '👨‍🎓', label: 'Students',        path: '/admin/students' },
    { icon: '👨‍🏫', label: 'Faculty',         path: '/admin/faculty' },
    { icon: '📢', label: 'Notices',         path: '/admin/notices' },
  ];

  useEffect(() => {
    Promise.all([
      API.get('/portal/faculty/'),
      API.get('/portal/results/unpublished/'),
    ])
      .then(([fRes, rRes]) => {
        setFaculty(fRes.data);
        setFiltered(fRes.data);
        setPending(rRes.data.length);
      })
      .catch(() => navigate('/login'))
      .finally(() => setLoading(false));
  }, [navigate]);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(faculty.filter(f =>
      f.name.toLowerCase().includes(q) ||
      f.faculty_id.toLowerCase().includes(q) ||
      f.email.toLowerCase().includes(q) ||
      f.department.toLowerCase().includes(q) ||
      f.designation.toLowerCase().includes(q)
    ));
  }, [search, faculty]);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f8fc' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '48px', height: '48px', border: `3px solid ${NAVY}20`, borderTopColor: NAVY, borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 0.8s linear infinite' }} />
        <p style={{ color: GREY, fontSize: '14px' }}>Loading faculty...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f7f8fc', fontFamily: 'Segoe UI, sans-serif' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }`}</style>

      {/* SIDEBAR */}
      <div style={{ width: '240px', flexShrink: 0, background: '#fff', borderRight: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', padding: '24px 16px', boxShadow: '2px 0 12px rgba(30,42,110,0.04)', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 8px 24px', borderBottom: '1px solid #f5f5f5', marginBottom: '16px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: NAVY, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '14px', color: '#fff' }}>MU</div>
          <div><p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: NAVY }}>MU Connect</p><p style={{ margin: 0, fontSize: '11px', color: GREY }}>Admin Panel</p></div>
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

      {/* MAIN */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', padding: '16px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 8px rgba(30,42,110,0.04)' }}>
          <div>
            <p style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: NAVY, fontFamily: 'Georgia, serif' }}>Faculty Members</p>
            <p style={{ margin: 0, fontSize: '13px', color: GREY }}>{filtered.length} of {faculty.length} faculty members</p>
          </div>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="🔍  Search by name, ID, email or department..."
            style={{ padding: '10px 16px', borderRadius: '8px', border: '1.5px solid #e5e7eb', fontSize: '13px', width: '320px', outline: 'none' }}
            onFocus={e => e.target.style.borderColor = NAVY}
            onBlur={e => e.target.style.borderColor = '#e5e7eb'}
          />
        </div>

        <div style={{ padding: '28px 36px' }}>

          {/* Summary cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '24px' }}>
            {[
              { label: 'Total Faculty',    value: faculty.length,                          icon: '👨‍🏫', color: NAVY },
              { label: 'Active Faculty',   value: faculty.filter(f => f.is_active).length,  icon: '✅',   color: '#059669' },
              { label: 'Inactive Faculty', value: faculty.filter(f => !f.is_active).length, icon: '⛔',   color: RED },
            ].map((s, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: '14px', padding: '20px', border: '1px solid #f0f0f0', boxShadow: '0 2px 8px rgba(30,42,110,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ margin: '0 0 4px', fontSize: '11px', fontWeight: '700', color: GREY, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</p>
                  <p style={{ margin: 0, fontSize: '28px', fontWeight: '900', color: s.color, fontFamily: 'Georgia, serif' }}>{s.value}</p>
                </div>
                <span style={{ fontSize: '28px' }}>{s.icon}</span>
              </div>
            ))}
          </div>

          {/* Faculty cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '16px' }}>
            {filtered.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0' }}>
                <p style={{ color: GREY, fontSize: '14px' }}>No faculty members match your search.</p>
              </div>
            ) : filtered.map((f, i) => {
              const gradingProgress = f.total_enrolled > 0
                ? Math.round((f.total_graded / f.total_enrolled) * 100)
                : 0;
              const allDone = f.pending_grades === 0 && f.total_enrolled > 0;

              return (
                <div key={f.id} style={{
                  background: '#fff', borderRadius: '16px', padding: '24px',
                  border: '1px solid #f0f0f0', boxShadow: '0 2px 8px rgba(30,42,110,0.04)',
                  position: 'relative', overflow: 'hidden',
                  animation: `fadeIn 0.3s ease ${i * 60}ms both`,
                }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${NAVY}, #7c3aed)` }} />

                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
                    <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: `linear-gradient(135deg, ${NAVY}, #7c3aed)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '18px', fontWeight: '700', flexShrink: 0, fontFamily: 'Georgia, serif' }}>
                      {f.name?.charAt(0)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: '0 0 2px', fontSize: '16px', fontWeight: '700', color: NAVY, fontFamily: 'Georgia, serif' }}>{f.name}</h3>
                      <p style={{ margin: 0, fontSize: '12px', color: GREY }}>{f.faculty_id} · {f.designation}</p>
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: '700', padding: '3px 8px', borderRadius: '10px', background: f.is_active ? '#f0fdf4' : '#fff0f0', color: f.is_active ? '#16a34a' : RED, border: f.is_active ? '1px solid #bbf7d0' : `1px solid ${RED}30` }}>
                      {f.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  {/* Info row */}
                  <div style={{ marginBottom: '16px' }}>
                    <p style={{ margin: '0 0 4px', fontSize: '12px', color: GREY }}>📧 {f.email}</p>
                    <p style={{ margin: '0 0 4px', fontSize: '12px', color: GREY }}>🏛️ {f.department}</p>
                    {f.specialization && <p style={{ margin: 0, fontSize: '12px', color: GREY }}>🎯 {f.specialization}</p>}
                  </div>

                  {/* Stats grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '14px' }}>
                    {[
                      { label: 'Courses',   value: f.total_courses,  color: NAVY },
                      { label: 'Students',  value: f.total_enrolled, color: '#7c3aed' },
                      { label: 'Graded',    value: f.total_graded,   color: '#059669' },
                    ].map((s, j) => (
                      <div key={j} style={{ background: '#f7f8fc', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                        <p style={{ margin: '0 0 2px', fontSize: '10px', color: GREY, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</p>
                        <p style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: s.color, fontFamily: 'Georgia, serif' }}>{s.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Grading progress */}
                  {f.total_enrolled > 0 && (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '11px', color: GREY }}>Grading Progress</span>
                        <span style={{ fontSize: '11px', fontWeight: '700', color: allDone ? '#059669' : f.pending_grades > 0 ? '#d97706' : NAVY }}>
                          {gradingProgress}%
                          {f.pending_grades > 0 && ` (${f.pending_grades} pending)`}
                        </span>
                      </div>
                      <div style={{ height: '6px', background: '#f0f0f0', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%',
                          width: `${gradingProgress}%`,
                          background: allDone ? '#059669' : `linear-gradient(90deg, ${NAVY}, #7c3aed)`,
                          borderRadius: '3px', transition: 'width 0.8s ease',
                        }} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}