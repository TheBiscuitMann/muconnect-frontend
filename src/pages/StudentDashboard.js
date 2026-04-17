import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import API from '../services/api';

const NAVY = '#1e2a6e';
const RED  = '#e31e24';
const GREY = '#6b7280';

// ── Sidebar nav item ─────────────────────────────────────────────
function NavItem({ icon, label, path, active, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onClick={onClick}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        padding: '11px 16px', borderRadius: '10px', cursor: 'pointer',
        background: active ? `${NAVY}` : hovered ? '#f0f3ff' : 'transparent',
        color: active ? '#fff' : hovered ? NAVY : GREY,
        transition: 'all 0.2s', marginBottom: '2px',
        borderLeft: active ? `3px solid ${RED}` : '3px solid transparent',
      }}>
      <span style={{ fontSize: '18px', width: '22px', textAlign: 'center' }}>{icon}</span>
      <span style={{ fontSize: '14px', fontWeight: active ? '700' : '500', fontFamily: 'Segoe UI, sans-serif' }}>{label}</span>
      {active && <div style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: RED }} />}
    </div>
  );
}

// ── Stat card ────────────────────────────────────────────────────
function StatCard({ label, value, sub, color, icon, delay }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), delay); }, [delay]);
  return (
    <div style={{
      background: '#fff', borderRadius: '16px', padding: '24px',
      border: '1px solid #f0f0f0',
      boxShadow: '0 2px 12px rgba(30,42,110,0.06)',
      position: 'relative', overflow: 'hidden',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(16px)',
      transition: 'all 0.4s ease',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: color }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: '11px', fontWeight: '700', color: GREY, textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'Segoe UI, sans-serif' }}>{label}</p>
          <p style={{ margin: '0 0 4px', fontSize: '32px', fontWeight: '900', color, letterSpacing: '-1.5px', fontFamily: 'Georgia, serif' }}>{value}</p>
          {sub && <p style={{ margin: 0, fontSize: '12px', color: '#aaa', fontFamily: 'Segoe UI, sans-serif' }}>{sub}</p>}
        </div>
        <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
          {icon}
        </div>
      </div>
    </div>
  );
}

// ── Quick action card ────────────────────────────────────────────
function ActionCard({ icon, label, desc, color, onClick, delay }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), delay); }, [delay]);
  return (
    <div onClick={onClick}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      style={{
        background: hovered ? color : '#fff',
        borderRadius: '14px', padding: '24px',
        border: `1.5px solid ${hovered ? color : '#f0f0f0'}`,
        cursor: 'pointer', transition: 'all 0.25s',
        boxShadow: hovered ? `0 12px 32px ${color}30` : '0 2px 8px rgba(0,0,0,0.04)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
      }}>
      <div style={{ fontSize: '28px', marginBottom: '12px' }}>{icon}</div>
      <p style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: '700', color: hovered ? '#fff' : NAVY, fontFamily: 'Segoe UI, sans-serif', transition: 'color 0.25s' }}>{label}</p>
      <p style={{ margin: 0, fontSize: '12px', color: hovered ? 'rgba(255,255,255,0.7)' : '#aaa', fontFamily: 'Segoe UI, sans-serif', transition: 'color 0.25s' }}>{desc}</p>
    </div>
  );
}

export default function StudentDashboard() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const user      = JSON.parse(localStorage.getItem('user') || '{}');
  const [dashboard, setDashboard] = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [time,      setTime]      = useState(new Date());

  useEffect(() => {
    API.get('/student/dashboard/')
      .then(res => setDashboard(res.data))
      .catch(() => navigate('/login'))
      .finally(() => setLoading(false));
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  const handleLogout = () => { localStorage.clear(); navigate('/login'); };

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // ADDED PEER NETWORK ROUTE HERE
  const navItems = [
    { icon: '🏠', label: 'Dashboard',  path: '/student/dashboard' },
    { icon: '📊', label: 'My Results', path: '/student/results' },
    { icon: '📄', label: 'Transcript', path: '/student/transcript' },
    { icon: '🤝', label: 'Peer Network', path: '/student/peer-network' },
    { icon: '👤', label: 'Profile',    path: '/student/profile' },
  ];

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f8fc' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '48px', height: '48px', border: `3px solid ${NAVY}20`, borderTopColor: NAVY, borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 0.8s linear infinite' }} />
        <p style={{ color: GREY, fontSize: '14px', fontFamily: 'Segoe UI, sans-serif' }}>Loading your portal...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f7f8fc', fontFamily: 'Segoe UI, sans-serif' }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #ddd; border-radius: 3px; }
      `}</style>

      {/* ── SIDEBAR ──────────────────────────────────────────── */}
      <div style={{
        width: '240px', flexShrink: 0,
        background: '#fff',
        borderRight: '1px solid #f0f0f0',
        display: 'flex', flexDirection: 'column',
        padding: '24px 16px',
        boxShadow: '2px 0 12px rgba(30,42,110,0.04)',
        position: 'sticky', top: 0, height: '100vh', overflowY: 'auto',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 8px 24px', borderBottom: '1px solid #f5f5f5', marginBottom: '16px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: NAVY, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '14px', color: '#fff', flexShrink: 0 }}>
            MU
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: NAVY }}>MU Connect</p>
            <p style={{ margin: 0, fontSize: '11px', color: GREY }}>Student Portal</p>
          </div>
        </div>

        {/* Student mini profile */}
        <div style={{ padding: '14px', background: '#f7f8fc', borderRadius: '12px', marginBottom: '20px', border: '1px solid #eee' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: `linear-gradient(135deg, ${NAVY}, ${RED})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '700', fontSize: '14px', flexShrink: 0 }}>
              {dashboard?.name?.charAt(0) || 'S'}
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: NAVY, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{dashboard?.name?.split(' ')[0] || 'Student'}</p>
              <p style={{ margin: 0, fontSize: '11px', color: GREY }}>{dashboard?.student_id}</p>
            </div>
          </div>
          <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <p style={{ margin: 0, fontSize: '11px', color: GREY }}>CGPA</p>
              <p style={{ margin: 0, fontSize: '15px', fontWeight: '900', color: NAVY }}>{dashboard?.cgpa}</p>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '11px', color: GREY }}>Semester</p>
              <p style={{ margin: 0, fontSize: '15px', fontWeight: '900', color: RED }}>{dashboard?.current_semester}</p>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '11px', color: GREY }}>Batch</p>
              <p style={{ margin: 0, fontSize: '15px', fontWeight: '900', color: NAVY }}>{dashboard?.batch}</p>
            </div>
          </div>
        </div>

        {/* Nav section label */}
        <p style={{ margin: '0 0 8px 8px', fontSize: '10px', fontWeight: '700', color: '#ccc', letterSpacing: '2px', textTransform: 'uppercase' }}>Menu</p>

        {/* Nav items */}
        <nav style={{ flex: 1 }}>
          {navItems.map(item => (
            <NavItem key={item.path}
              icon={item.icon} label={item.label} path={item.path}
              active={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            />
          ))}
        </nav>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid #f5f5f5', paddingTop: '16px' }}>
          <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', borderRadius: '10px', cursor: 'pointer', color: GREY, marginBottom: '4px' }}
            onMouseOver={e => { e.currentTarget.style.background = '#f7f8fc'; e.currentTarget.style.color = NAVY; }}
            onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = GREY; }}>
            <span style={{ fontSize: '16px' }}>🌐</span>
            <span style={{ fontSize: '13px', fontWeight: '500' }}>Main Website</span>
          </div>
          <div onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', borderRadius: '10px', cursor: 'pointer', color: RED }}
            onMouseOver={e => { e.currentTarget.style.background = '#fff0f0'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'transparent'; }}>
            <span style={{ fontSize: '16px' }}>🚪</span>
            <span style={{ fontSize: '13px', fontWeight: '600' }}>Logout</span>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────── */}
      <div style={{ flex: 1, overflow: 'auto' }}>

        {/* Top bar */}
        <div style={{
          background: '#fff', borderBottom: '1px solid #f0f0f0',
          padding: '16px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          position: 'sticky', top: 0, zIndex: 100,
          boxShadow: '0 1px 8px rgba(30,42,110,0.04)',
        }}>
          <div>
            <p style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: NAVY, fontFamily: 'Georgia, serif', letterSpacing: '-0.5px' }}>
              {greeting()}, {dashboard?.name?.split(' ')[0]}! 👋
            </p>
            <p style={{ margin: 0, fontSize: '13px', color: GREY }}>
              {time.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} · {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f7f8fc', border: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '18px' }}>
                🔔
              </div>
              <div style={{ position: 'absolute', top: '-3px', right: '-3px', width: '10px', height: '10px', borderRadius: '50%', background: RED, border: '2px solid #fff' }} />
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `linear-gradient(135deg, ${NAVY}, ${RED})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '700', fontSize: '15px', cursor: 'pointer' }}>
              {dashboard?.name?.charAt(0) || 'S'}
            </div>
          </div>
        </div>

        {/* Page content */}
        <div style={{ padding: '32px 36px' }}>

          {/* Welcome banner */}
          <div style={{
            background: `linear-gradient(135deg, ${NAVY} 0%, #2a1a6e 100%)`,
            borderRadius: '20px', padding: '32px 40px', marginBottom: '28px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            position: 'relative', overflow: 'hidden',
            animation: 'fadeUp 0.5s ease both',
          }}>
            {/* Background pattern */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            <div style={{ position: 'absolute', right: '-40px', top: '-40px', width: '280px', height: '280px', borderRadius: '50%', background: `${RED}20` }} />
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '5px', background: RED }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: '20px', marginBottom: '12px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80' }} />
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>Active Student</span>
              </div>
              <h2 style={{ margin: '0 0 6px', fontSize: '28px', fontWeight: '900', color: '#fff', letterSpacing: '-1px', fontFamily: 'Georgia, serif' }}>
                {dashboard?.name}
              </h2>
              <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
                {dashboard?.department} &nbsp;·&nbsp; Batch {dashboard?.batch} &nbsp;·&nbsp; ID: {dashboard?.student_id}
              </p>
            </div>

            <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '20px' }}>
              {[
                { label: 'CGPA',     value: dashboard?.cgpa,             color: '#4ade80' },
                { label: 'Semester', value: dashboard?.current_semester,  color: '#60a5fa' },
                { label: 'Batch',    value: dashboard?.batch,             color: '#f59e0b' },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '16px 20px', background: 'rgba(255,255,255,0.08)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', minWidth: '80px' }}>
                  <p style={{ margin: '0 0 4px', fontSize: '24px', fontWeight: '900', color: s.color, fontFamily: 'Georgia, serif', letterSpacing: '-1px' }}>{s.value}</p>
                  <p style={{ margin: 0, fontSize: '11px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stat cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '28px' }}>
            <StatCard label="Current CGPA"    value={dashboard?.cgpa}             sub="Out of 4.00"        color={NAVY}       icon="🎯" delay={100} />
            <StatCard label="Semester"         value={`${dashboard?.current_semester}th`} sub="Spring 2026"  color={RED}        icon="📅" delay={200} />
            <StatCard label="Department"       value="CSE"                          sub={dashboard?.department} color="#7c3aed" icon="🏛️" delay={300} />
            <StatCard label="Student Batch"    value={dashboard?.batch}             sub="Year of enrollment" color="#059669"    icon="🎓" delay={400} />
          </div>

          {/* Quick actions + Recent notices */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '20px' }}>

            {/* Quick actions */}
            <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #f0f0f0', boxShadow: '0 2px 12px rgba(30,42,110,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: NAVY, fontFamily: 'Georgia, serif' }}>Quick Actions</h3>
                <div style={{ width: '4px', height: '20px', background: RED, borderRadius: '2px' }} />
              </div>
              {/* ADDED NEW MENTOR BUTTON TO GRID HERE */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <ActionCard icon="📊" label="View Results"    desc="Check all published grades"     color={NAVY}       onClick={() => navigate('/student/results')}     delay={150} />
                <ActionCard icon="📄" label="My Transcript"   desc="Download official transcript"   color={RED}        onClick={() => navigate('/student/transcript')}  delay={200} />
                <ActionCard icon="🤝" label="Find a Mentor"   desc="Connect with peer tutors"       color="#7c3aed"    onClick={() => navigate('/student/peer-network')} delay={250} />
                <ActionCard icon="👤" label="My Profile"      desc="View and edit your info"        color="#059669"    onClick={() => navigate('/student/profile')}     delay={300} />
              </div>
            </div>

            {/* Sidebar panel — semester progress */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Semester progress card */}
              <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #f0f0f0', boxShadow: '0 2px 12px rgba(30,42,110,0.04)', animation: 'fadeUp 0.5s ease 0.3s both' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: NAVY, fontFamily: 'Georgia, serif' }}>Degree Progress</h3>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: RED }}>75%</span>
                </div>
                <div style={{ height: '8px', background: '#f0f0f0', borderRadius: '4px', marginBottom: '8px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '75%', background: `linear-gradient(90deg, ${NAVY}, ${RED})`, borderRadius: '4px', transition: 'width 1s ease' }} />
                </div>
                <p style={{ margin: '0 0 16px', fontSize: '12px', color: GREY }}>Semester {dashboard?.current_semester} of 8 completed</p>
                {[
                  { label: 'Credits Earned',   value: '112',  total: '160', color: NAVY },
                  { label: 'Courses Passed',   value: '38',   total: '52',  color: '#059669' },
                  { label: 'CGPA Standing',    value: dashboard?.cgpa, total: '4.00', color: RED },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < 2 ? '1px solid #f8f8f8' : 'none' }}>
                    <span style={{ fontSize: '13px', color: GREY }}>{item.label}</span>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: item.color }}>{item.value} <span style={{ color: '#ddd', fontWeight: '400' }}>/ {item.total}</span></span>
                  </div>
                ))}
              </div>

              {/* Current semester info */}
              <div style={{ background: `linear-gradient(135deg, ${RED}08, ${RED}04)`, borderRadius: '16px', padding: '20px', border: `1px solid ${RED}20`, animation: 'fadeUp 0.5s ease 0.4s both' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `${RED}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>📅</div>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: NAVY }}>Spring 2026</p>
                </div>
                <p style={{ margin: '0 0 4px', fontSize: '12px', color: GREY }}>Current Semester</p>
                <p style={{ margin: '0 0 12px', fontSize: '13px', color: '#444' }}>Semester {dashboard?.current_semester} — {dashboard?.department}</p>
                <button onClick={() => navigate('/student/results')} style={{
                  width: '100%', padding: '10px', borderRadius: '8px',
                  border: `1.5px solid ${RED}`, background: 'transparent', color: RED,
                  fontSize: '13px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s',
                }}
                  onMouseOver={e => { e.currentTarget.style.background = RED; e.currentTarget.style.color = '#fff'; }}
                  onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = RED; }}
                >View My Results →</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}