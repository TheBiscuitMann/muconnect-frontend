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

const STATUS_COLORS = {
  pending:  { bg: '#fffbeb', text: '#d97706', border: '#fde68a' },
  approved: { bg: '#f0fdf4', text: '#16a34a', border: '#bbf7d0' },
  rejected: { bg: '#fff0f0', text: RED,       border: '#fecaca' },
};

export default function FacultyRetakes() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [apps,     setApps]     = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [updating, setUpdating] = useState(null);
  const [success,  setSuccess]  = useState('');

  const pendingCount = apps.filter(a => a.status === 'pending').length;

  const navItems = [
    { icon: '🏠', label: 'Dashboard',  path: '/faculty/dashboard' },
    { icon: '📚', label: 'My Courses', path: '/faculty/courses' },
    { icon: '📋', label: 'Retake Applications', path: '/faculty/retakes', badge: pendingCount },
    { icon: '📅', label: 'Attendance', path: '/faculty/attendance' },
  ];

  const loadApps = () => {
    setLoading(true);
    API.get('/faculty/retake/')
      .then(res => setApps(res.data))
      .catch(() => navigate('/login'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadApps(); }, []);

  const handleUpdate = async (appId, status) => {
    setUpdating(appId);
    try {
      await API.post(`/faculty/retake/${appId}/`, { status });
      setSuccess(`Application ${status} successfully!`);
      setTimeout(() => setSuccess(''), 3000);
      loadApps();
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to update application');
    } finally {
      setUpdating(null);
    }
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f8fc' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '48px', height: '48px', border: `3px solid ${NAVY}20`, borderTopColor: NAVY, borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 0.8s linear infinite' }} />
        <p style={{ color: GREY, fontSize: '14px' }}>Loading applications...</p>
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
          <div>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: NAVY }}>MU Connect</p>
            <p style={{ margin: 0, fontSize: '11px', color: GREY }}>Faculty Portal</p>
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

      {/* MAIN */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', padding: '16px 36px', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 8px rgba(30,42,110,0.04)' }}>
          <p style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: NAVY, fontFamily: 'Georgia, serif' }}>Retake Applications</p>
          <p style={{ margin: 0, fontSize: '13px', color: GREY }}>
            {pendingCount} pending · {apps.filter(a => a.status === 'approved').length} approved · {apps.filter(a => a.status === 'rejected').length} rejected
          </p>
        </div>

        <div style={{ padding: '28px 36px', maxWidth: '900px' }}>

          {success && (
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderLeft: '3px solid #16a34a', borderRadius: '8px', padding: '12px 16px', marginBottom: '20px' }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#15803d', fontWeight: '600' }}>✅ {success}</p>
            </div>
          )}

          {apps.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px', background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0' }}>
              <div style={{ fontSize: '56px', marginBottom: '16px' }}>📭</div>
              <h3 style={{ margin: '0 0 8px', color: NAVY, fontFamily: 'Georgia, serif' }}>No retake applications</h3>
              <p style={{ margin: 0, color: GREY, fontSize: '14px' }}>Students who fail your courses can apply for retake or supplementary exams here.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Pending first */}
              {pendingCount > 0 && (
                <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderLeft: '3px solid #d97706', borderRadius: '10px', padding: '10px 16px', marginBottom: '8px' }}>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#92400e' }}>
                    ⚠️ {pendingCount} application{pendingCount !== 1 ? 's' : ''} awaiting your review
                  </p>
                </div>
              )}

              {apps.map((a, i) => {
                const sc = STATUS_COLORS[a.status] || STATUS_COLORS.pending;
                const isPending = a.status === 'pending';
                return (
                  <div key={a.id} style={{
                    background: '#fff', borderRadius: '14px', padding: '22px 24px',
                    border: `1px solid ${isPending ? '#fde68a' : '#f0f0f0'}`,
                    boxShadow: isPending ? '0 4px 12px rgba(217,119,6,0.08)' : '0 2px 8px rgba(30,42,110,0.04)',
                    animation: `fadeIn 0.3s ease ${i * 60}ms both`,
                    position: 'relative', overflow: 'hidden',
                  }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: sc.text }} />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: `linear-gradient(135deg, ${NAVY}, ${RED})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '16px', fontWeight: '700', flexShrink: 0 }}>
                          {a.student_name?.charAt(0)}
                        </div>
                        <div>
                          <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: NAVY, fontFamily: 'Georgia, serif' }}>{a.student_name}</h4>
                          <p style={{ margin: 0, fontSize: '12px', color: GREY }}>{a.student_id}</p>
                        </div>
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '10px', background: sc.bg, color: sc.text, border: `1px solid ${sc.border}`, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {a.status}
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '14px' }}>
                      {[
                        { label: 'Course', value: `${a.course_code} — ${a.course_title}` },
                        { label: 'Semester', value: a.semester },
                        { label: 'Exam Type', value: a.exam_type === 'retake' ? '🔄 Retake Exam' : '📝 Supplementary Exam' },
                      ].map((item, j) => (
                        <div key={j} style={{ background: '#f7f8fc', borderRadius: '8px', padding: '10px 12px' }}>
                          <p style={{ margin: '0 0 2px', fontSize: '10px', fontWeight: '700', color: GREY, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.label}</p>
                          <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: NAVY }}>{item.value}</p>
                        </div>
                      ))}
                    </div>

                    {a.reason && (
                      <div style={{ background: `${NAVY}06`, borderLeft: `2px solid ${NAVY}20`, padding: '10px 12px', borderRadius: '4px', marginBottom: '14px' }}>
                        <p style={{ margin: '0 0 2px', fontSize: '10px', fontWeight: '700', color: GREY, textTransform: 'uppercase' }}>Student's Reason</p>
                        <p style={{ margin: 0, fontSize: '13px', color: '#444', lineHeight: 1.5 }}>{a.reason}</p>
                      </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ margin: 0, fontSize: '12px', color: GREY }}>Applied: {formatDate(a.applied_at)}</p>
                      {isPending && (
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={() => handleUpdate(a.id, 'rejected')} disabled={updating === a.id} style={{
                            padding: '8px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: '700',
                            cursor: 'pointer', border: `1.5px solid ${RED}`, background: 'transparent', color: RED, transition: 'all 0.2s',
                          }}
                            onMouseOver={e => { e.currentTarget.style.background = RED; e.currentTarget.style.color = '#fff'; }}
                            onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = RED; }}
                          >✕ Reject</button>
                          <button onClick={() => handleUpdate(a.id, 'approved')} disabled={updating === a.id} style={{
                            padding: '8px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: '700',
                            cursor: 'pointer', border: 'none', background: '#16a34a', color: '#fff', transition: 'all 0.2s',
                          }}
                            onMouseOver={e => e.currentTarget.style.background = '#15803d'}
                            onMouseOut={e => e.currentTarget.style.background = '#16a34a'}
                          >
                            {updating === a.id ? 'Updating...' : '✓ Approve'}
                          </button>
                        </div>
                      )}
                    </div>
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