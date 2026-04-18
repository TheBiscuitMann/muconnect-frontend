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

function StatCard({ icon, label, value, sub, color, delay }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), delay); }, [delay]);
  return (
    <div style={{
      background: '#fff', borderRadius: '16px', padding: '24px',
      border: '1px solid #f0f0f0', boxShadow: '0 2px 12px rgba(30,42,110,0.06)',
      position: 'relative', overflow: 'hidden',
      opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)',
      transition: 'all 0.4s ease',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: color }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: '11px', fontWeight: '700', color: GREY, textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</p>
          <p style={{ margin: '0 0 4px', fontSize: '32px', fontWeight: '900', color, letterSpacing: '-1.5px', fontFamily: 'Georgia, serif' }}>{value}</p>
          {sub && <p style={{ margin: 0, fontSize: '12px', color: '#aaa' }}>{sub}</p>}
        </div>
        <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function FacultyDashboard() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [time,    setTime]    = useState(new Date());

  useEffect(() => {
    API.get('/faculty/dashboard/')
      .then(res => setData(res.data))
      .catch(() => navigate('/login'))
      .finally(() => setLoading(false));
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const navItems = [
    { icon: '🏠', label: 'Dashboard',           path: '/faculty/dashboard' },
    { icon: '📚', label: 'My Courses',           path: '/faculty/courses' },
    { icon: '📋', label: 'Retake Applications',  path: '/faculty/retakes', badge: data?.pending_retakes },
  ];

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f8fc' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '48px', height: '48px', border: `3px solid ${NAVY}20`, borderTopColor: NAVY, borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 0.8s linear infinite' }} />
        <p style={{ color: GREY, fontSize: '14px' }}>Loading faculty portal...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f7f8fc', fontFamily: 'Segoe UI, sans-serif' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`}</style>

      {/* ── SIDEBAR ── */}
      <div style={{ width: '240px', flexShrink: 0, background: '#fff', borderRight: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', padding: '24px 16px', boxShadow: '2px 0 12px rgba(30,42,110,0.04)', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 8px 24px', borderBottom: '1px solid #f5f5f5', marginBottom: '16px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: NAVY, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '14px', color: '#fff' }}>MU</div>
          <div>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: NAVY }}>MU Connect</p>
            <p style={{ margin: 0, fontSize: '11px', color: GREY }}>Faculty Portal</p>
          </div>
        </div>

        <div style={{ padding: '14px', background: '#f7f8fc', borderRadius: '12px', marginBottom: '20px', border: '1px solid #eee' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: `linear-gradient(135deg, ${NAVY}, ${RED})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '700', fontSize: '14px', flexShrink: 0 }}>
              {data?.name?.charAt(0) || 'F'}
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: NAVY, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{data?.name}</p>
              <p style={{ margin: 0, fontSize: '11px', color: GREY }}>{data?.designation}</p>
            </div>
          </div>
          <div style={{ paddingTop: '8px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <p style={{ margin: 0, fontSize: '10px', color: GREY, textTransform: 'uppercase' }}>Faculty ID</p>
              <p style={{ margin: 0, fontSize: '12px', fontWeight: '700', color: NAVY }}>{data?.faculty_id}</p>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '10px', color: GREY, textTransform: 'uppercase' }}>Dept</p>
              <p style={{ margin: 0, fontSize: '12px', fontWeight: '700', color: NAVY }}>CSE</p>
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
        <div style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', padding: '16px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 8px rgba(30,42,110,0.04)' }}>
          <div>
            <p style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: NAVY, fontFamily: 'Georgia, serif' }}>
              {greeting()}, {data?.name?.split(' ')[0]}! 👋
            </p>
            <p style={{ margin: 0, fontSize: '13px', color: GREY }}>
              {time.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} · {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>

        <div style={{ padding: '32px 36px' }}>

          {/* Welcome banner */}
          <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2a1a6e 100%)`, borderRadius: '20px', padding: '28px 36px', marginBottom: '28px', position: 'relative', overflow: 'hidden', animation: 'fadeUp 0.5s ease both' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '5px', background: RED }} />
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: '20px', marginBottom: '12px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80' }} />
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>Faculty Portal</span>
                </div>
                <h2 style={{ margin: '0 0 6px', fontSize: '26px', fontWeight: '900', color: '#fff', fontFamily: 'Georgia, serif', letterSpacing: '-1px' }}>{data?.name}</h2>
                <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>{data?.designation} · {data?.department} · {data?.faculty_id}</p>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                {[
                  { label: 'Courses', value: data?.total_courses },
                  { label: 'Students', value: data?.total_students },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: 'center', padding: '16px 20px', background: 'rgba(255,255,255,0.08)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', minWidth: '80px' }}>
                    <p style={{ margin: '0 0 4px', fontSize: '28px', fontWeight: '900', color: '#fff', fontFamily: 'Georgia, serif' }}>{s.value}</p>
                    <p style={{ margin: 0, fontSize: '11px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stat cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '28px' }}>
            <StatCard icon="📚" label="My Courses"          value={data?.total_courses}   sub="Assigned this semester"  color={NAVY}      delay={100} />
            <StatCard icon="🎓" label="Total Students"      value={data?.total_students}  sub="Across all courses"      color="#7c3aed"   delay={200} />
            <StatCard icon="📋" label="Retake Applications" value={data?.pending_retakes} sub="Awaiting your review"    color={data?.pending_retakes > 0 ? '#d97706' : '#059669'} delay={300} />
          </div>

          {/* Alerts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            {data?.pending_grades > 0 && (
              <div style={{ background: '#fff0f0', border: `1px solid ${RED}30`, borderLeft: `3px solid ${RED}`, borderRadius: '10px', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: RED }}>⚠️ {data?.pending_grades} student{data?.pending_grades !== 1 ? 's' : ''} awaiting grades</p>
                  <p style={{ margin: '2px 0 0', fontSize: '12px', color: GREY }}>Go to My Courses to submit their marks</p>
                </div>
                <button onClick={() => navigate('/faculty/courses')} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: RED, color: '#fff', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>Submit Now →</button>
              </div>
            )}
            {data?.pending_retakes > 0 && (
              <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderLeft: '3px solid #d97706', borderRadius: '10px', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#92400e' }}>📋 {data?.pending_retakes} retake application{data?.pending_retakes !== 1 ? 's' : ''} awaiting review</p>
                  <p style={{ margin: '2px 0 0', fontSize: '12px', color: GREY }}>Students have applied for retake or supplementary exams</p>
                </div>
                <button onClick={() => navigate('/faculty/retakes')} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#d97706', color: '#fff', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>Review Now →</button>
              </div>
            )}
          </div>

          {/* Quick actions */}
          <div style={{ background: '#fff', borderRadius: '16px', padding: '28px', border: '1px solid #f0f0f0', boxShadow: '0 2px 12px rgba(30,42,110,0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: NAVY, fontFamily: 'Georgia, serif' }}>Quick Actions</h3>
              <div style={{ width: '4px', height: '20px', background: RED, borderRadius: '2px' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { icon: '📚', label: 'My Courses',           desc: 'View and manage your courses',              color: NAVY,      path: '/faculty/courses' },
                { icon: '📋', label: 'Retake Applications',  desc: 'Review student retake/supplementary requests', color: '#d97706', path: '/faculty/retakes' },
              ].map((a, i) => (
                <div key={i} onClick={() => navigate(a.path)} style={{ padding: '20px', borderRadius: '12px', cursor: 'pointer', border: '1.5px solid #f0f0f0', background: '#fafbfc', transition: 'all 0.2s', position: 'relative' }}
                  onMouseOver={e => { e.currentTarget.style.background = a.color; e.currentTarget.style.borderColor = a.color; }}
                  onMouseOut={e => { e.currentTarget.style.background = '#fafbfc'; e.currentTarget.style.borderColor = '#f0f0f0'; }}
                >
                  <div style={{ fontSize: '28px', marginBottom: '10px' }}>{a.icon}</div>
                  <p style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: '700', color: NAVY }}>{a.label}</p>
                  <p style={{ margin: 0, fontSize: '12px', color: GREY }}>{a.desc}</p>
                  {a.path === '/faculty/retakes' && data?.pending_retakes > 0 && (
                    <span style={{ position: 'absolute', top: '12px', right: '12px', background: RED, color: '#fff', borderRadius: '10px', padding: '2px 8px', fontSize: '10px', fontWeight: '700' }}>
                      {data.pending_retakes}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}