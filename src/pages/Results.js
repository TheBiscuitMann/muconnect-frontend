import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import API from '../services/api';

const NAVY = '#1e2a6e';
const RED  = '#e31e24';
const GREY = '#6b7280';

// ── Sidebar nav item (same as dashboard) ─────────────────────────
function NavItem({ icon, label, path, active, onClick }) {
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
      <span style={{ fontSize: '14px', fontWeight: active ? '700' : '500', fontFamily: 'Segoe UI, sans-serif' }}>{label}</span>
      {active && <div style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: RED }} />}
    </div>
  );
}

// ── Grade color helper ────────────────────────────────────────────
function gradeColor(grade) {
  if (!grade) return { bg: '#f5f5f5', text: GREY, border: '#eee' };
  if (['A', 'A-'].includes(grade))        return { bg: '#f0fdf4', text: '#16a34a', border: '#bbf7d0' };
  if (['B+', 'B', 'B-'].includes(grade))  return { bg: '#eff6ff', text: '#2563eb', border: '#bfdbfe' };
  if (['C+', 'C'].includes(grade))        return { bg: '#fffbeb', text: '#d97706', border: '#fde68a' };
  if (grade === 'D')                       return { bg: '#fff7ed', text: '#ea580c', border: '#fed7aa' };
  if (grade === 'F')                       return { bg: '#fff0f0', text: RED,       border: '#fecaca' };
  return { bg: '#f5f5f5', text: GREY, border: '#eee' };
}

// ── GPA to progress width ─────────────────────────────────────────
function gpaWidth(gpa) { return `${Math.min((parseFloat(gpa) / 4.0) * 100, 100)}%`; }

export default function Results() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [data,     setData]     = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [selected, setSelected] = useState(0);
  const [animate,  setAnimate]  = useState(true);

  useEffect(() => {
    API.get('/student/results/')
      .then(res => setData(res.data))
      .catch(() => navigate('/login'))
      .finally(() => setLoading(false));
  }, [navigate]);

  const semesters = data?.semesters || [];

  const handleSelect = (idx) => {
    setAnimate(false);
    setTimeout(() => { setSelected(idx); setAnimate(true); }, 120);
  };

  const navItems = [
    { icon: '🏠', label: 'Dashboard',    path: '/student/dashboard' },
    { icon: '📊', label: 'My Results',   path: '/student/results' },
    { icon: '📄', label: 'Transcript',   path: '/student/transcript' },
    { icon: '🤝', label: 'Peer Network', path: '/student/peer-network' },
    { icon: '👤', label: 'Profile',      path: '/student/profile' },
  ];

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f8fc' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '48px', height: '48px', border: `3px solid ${NAVY}20`, borderTopColor: NAVY, borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 0.8s linear infinite' }} />
        <p style={{ color: GREY, fontSize: '14px', fontFamily: 'Segoe UI, sans-serif' }}>Loading results...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );

  const currentSem = semesters[selected] || null;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f7f8fc', fontFamily: 'Segoe UI, sans-serif' }}>
      <style>{`
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes fadeIn  { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideIn { from { opacity:0; transform:translateX(-8px); } to { opacity:1; transform:translateX(0); } }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #ddd; border-radius: 3px; }
      `}</style>

      {/* ── SIDEBAR ──────────────────────────────────────── */}
      <div style={{
        width: '240px', flexShrink: 0, background: '#fff',
        borderRight: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column',
        padding: '24px 16px', boxShadow: '2px 0 12px rgba(30,42,110,0.04)',
        position: 'sticky', top: 0, height: '100vh', overflowY: 'auto',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 8px 24px', borderBottom: '1px solid #f5f5f5', marginBottom: '16px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: NAVY, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '14px', color: '#fff', flexShrink: 0 }}>MU</div>
          <div>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: NAVY }}>MU Connect</p>
            <p style={{ margin: 0, fontSize: '11px', color: GREY }}>Student Portal</p>
          </div>
        </div>

        {/* CGPA badge */}
        <div style={{ padding: '14px', background: '#f7f8fc', borderRadius: '12px', marginBottom: '20px', border: '1px solid #eee', textAlign: 'center' }}>
          <p style={{ margin: '0 0 4px', fontSize: '11px', color: GREY, textTransform: 'uppercase', letterSpacing: '1px' }}>Overall CGPA</p>
          <p style={{ margin: 0, fontSize: '36px', fontWeight: '900', color: NAVY, fontFamily: 'Georgia, serif', letterSpacing: '-2px' }}>{data?.cgpa}</p>
          <div style={{ height: '6px', background: '#f0f0f0', borderRadius: '3px', margin: '10px 0 6px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: gpaWidth(data?.cgpa), background: `linear-gradient(90deg, ${NAVY}, ${RED})`, borderRadius: '3px', transition: 'width 1s ease' }} />
          </div>
          <p style={{ margin: 0, fontSize: '11px', color: GREY }}>Out of 4.00</p>
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
            <span style={{ fontSize: '16px' }}>🌐</span>
            <span style={{ fontSize: '13px', fontWeight: '500' }}>Main Website</span>
          </div>
          <div onClick={() => { localStorage.clear(); navigate('/login'); }} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', borderRadius: '10px', cursor: 'pointer', color: RED }}
            onMouseOver={e => e.currentTarget.style.background = '#fff0f0'}
            onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
            <span style={{ fontSize: '16px' }}>🚪</span>
            <span style={{ fontSize: '13px', fontWeight: '600' }}>Logout</span>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────── */}
      <div style={{ flex: 1, overflow: 'auto' }}>

        {/* Top bar */}
        <div style={{
          background: '#fff', borderBottom: '1px solid #f0f0f0',
          padding: '16px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 8px rgba(30,42,110,0.04)',
        }}>
          <div>
            <p style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: NAVY, fontFamily: 'Georgia, serif', letterSpacing: '-0.5px' }}>My Results</p>
            <p style={{ margin: 0, fontSize: '13px', color: GREY }}>
              {semesters.length} semester{semesters.length !== 1 ? 's' : ''} · {semesters.reduce((acc, s) => acc + (s.courses?.length || 0), 0)} courses total
            </p>
          </div>
          <button onClick={() => navigate('/student/transcript')} style={{
            padding: '10px 20px', borderRadius: '8px', fontSize: '13px',
            fontWeight: '700', cursor: 'pointer', border: 'none',
            background: NAVY, color: '#fff', transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}
            onMouseOver={e => e.currentTarget.style.background = RED}
            onMouseOut={e => e.currentTarget.style.background = NAVY}
          >
            📄 Download Transcript
          </button>
        </div>

        {/* No results state */}
        {semesters.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '16px' }}>
            <div style={{ fontSize: '64px' }}>📭</div>
            <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: NAVY, fontFamily: 'Georgia, serif' }}>No results published yet</h3>
            <p style={{ margin: 0, fontSize: '14px', color: GREY, textAlign: 'center', maxWidth: '300px' }}>Your results will appear here once they are published by your faculty and approved by admin.</p>
          </div>
        ) : (
          <div style={{ padding: '28px 36px', display: 'grid', gridTemplateColumns: '280px 1fr', gap: '24px', alignItems: 'start' }}>

            {/* ── LEFT — Semester cards ─────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', position: 'sticky', top: '88px' }}>
              <p style={{ margin: '0 0 8px 4px', fontSize: '11px', fontWeight: '700', color: '#bbb', letterSpacing: '2px', textTransform: 'uppercase' }}>
                Select Semester
              </p>
              {semesters.map((sem, idx) => {
                const isActive = selected === idx;
                const semColor = sem.semester?.toLowerCase().includes('autumn') ? '#d97706'
                  : sem.semester?.toLowerCase().includes('summer') ? '#059669'
                  : NAVY;
                return (
                  <div key={idx} onClick={() => handleSelect(idx)} style={{
                    padding: '16px 18px', borderRadius: '14px', cursor: 'pointer',
                    background: isActive ? NAVY : '#fff',
                    border: `1.5px solid ${isActive ? NAVY : '#f0f0f0'}`,
                    boxShadow: isActive ? `0 8px 24px ${NAVY}30` : '0 2px 8px rgba(0,0,0,0.04)',
                    transition: 'all 0.25s',
                    animation: `slideIn 0.3s ease ${idx * 60}ms both`,
                  }}
                    onMouseOver={e => { if (!isActive) { e.currentTarget.style.borderColor = NAVY; e.currentTarget.style.transform = 'translateX(3px)'; } }}
                    onMouseOut={e => { if (!isActive) { e.currentTarget.style.borderColor = '#f0f0f0'; e.currentTarget.style.transform = 'translateX(0)'; } }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <div>
                        <span style={{
                          fontSize: '10px', fontWeight: '800', textTransform: 'uppercase',
                          letterSpacing: '1px', padding: '2px 8px', borderRadius: '20px',
                          background: isActive ? 'rgba(255,255,255,0.15)' : `${semColor}15`,
                          color: isActive ? 'rgba(255,255,255,0.8)' : semColor,
                        }}>
                          {sem.semester?.split(' ')[0] || 'Semester'}
                        </span>
                        <p style={{ margin: '6px 0 0', fontSize: '15px', fontWeight: '800', color: isActive ? '#fff' : NAVY, fontFamily: 'Georgia, serif', letterSpacing: '-0.5px' }}>
                          {sem.semester}
                        </p>
                      </div>
                      {isActive && (
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: RED, marginTop: '4px', flexShrink: 0 }} />
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: '16px' }}>
                      <div>
                        <p style={{ margin: 0, fontSize: '11px', color: isActive ? 'rgba(255,255,255,0.5)' : '#bbb', textTransform: 'uppercase', letterSpacing: '0.5px' }}>GPA</p>
                        <p style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: isActive ? '#fff' : NAVY, fontFamily: 'Georgia, serif', letterSpacing: '-0.5px' }}>{sem.gpa}</p>
                      </div>
                      <div>
                        <p style={{ margin: 0, fontSize: '11px', color: isActive ? 'rgba(255,255,255,0.5)' : '#bbb', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Courses</p>
                        <p style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: isActive ? '#fff' : NAVY, fontFamily: 'Georgia, serif', letterSpacing: '-0.5px' }}>{sem.courses?.length || 0}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── RIGHT — Results panel ─────────────────────── */}
            <div style={{
              opacity: animate ? 1 : 0,
              transform: animate ? 'translateY(0)' : 'translateY(8px)',
              transition: 'all 0.25s ease',
            }}>
              {currentSem && (
                <>
                  {/* Semester summary header */}
                  <div style={{
                    background: `linear-gradient(135deg, ${NAVY} 0%, #2a1a6e 100%)`,
                    borderRadius: '18px', padding: '28px 32px', marginBottom: '20px',
                    position: 'relative', overflow: 'hidden',
                  }}>
                    <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    <div style={{ position: 'absolute', right: '-30px', top: '-30px', width: '200px', height: '200px', borderRadius: '50%', background: `${RED}20` }} />
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: RED }} />

                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                        <div>
                          <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,0.5)' }}>
                            Semester Results
                          </span>
                          <h2 style={{ margin: '6px 0 0', fontSize: '28px', fontWeight: '900', color: '#fff', fontFamily: 'Georgia, serif', letterSpacing: '-1px' }}>
                            {currentSem.semester}
                          </h2>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <p style={{ margin: '0 0 2px', fontSize: '11px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>Semester GPA</p>
                          <p style={{ margin: 0, fontSize: '44px', fontWeight: '900', color: '#fff', fontFamily: 'Georgia, serif', letterSpacing: '-2px', lineHeight: 1 }}>{currentSem.gpa}</p>
                        </div>
                      </div>

                      <div style={{ marginBottom: '20px' }}>
                        <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: gpaWidth(currentSem.gpa), background: `linear-gradient(90deg, #4ade80, #22c55e)`, borderRadius: '3px' }} />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                        {[
                          { label: 'Total Courses', value: currentSem.courses?.length || 0, icon: '📚' },
                          { label: 'Credits',        value: currentSem.courses?.reduce((a, c) => a + (c.credit || 0), 0) || 0, icon: '⭐' },
                          { label: 'Passed',         value: currentSem.courses?.filter(c => c.grade !== 'F').length || 0, icon: '✅' },
                          { label: 'Failed',         value: currentSem.courses?.filter(c => c.grade === 'F').length || 0, icon: '❌' },
                        ].map((s, i) => (
                          <div key={i} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '14px 16px', textAlign: 'center' }}>
                            <div style={{ fontSize: '18px', marginBottom: '6px' }}>{s.icon}</div>
                            <p style={{ margin: '0 0 2px', fontSize: '22px', fontWeight: '900', color: '#fff', fontFamily: 'Georgia, serif', letterSpacing: '-1px' }}>{s.value}</p>
                            <p style={{ margin: 0, fontSize: '11px', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Course cards */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
                    {currentSem.courses?.map((course, i) => {
                      const gc = gradeColor(course.grade);
                      return (
                        <div key={i} style={{
                          background: '#fff', borderRadius: '14px', padding: '20px',
                          border: '1px solid #f0f0f0',
                          boxShadow: '0 2px 8px rgba(30,42,110,0.04)',
                          transition: 'all 0.25s',
                          animation: `fadeIn 0.3s ease ${i * 60}ms both`,
                          position: 'relative', overflow: 'hidden',
                        }}
                          onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(30,42,110,0.1)'; e.currentTarget.style.borderColor = gc.border; }}
                          onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(30,42,110,0.04)'; e.currentTarget.style.borderColor = '#f0f0f0'; }}
                        >
                          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: gc.text }} />

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <span style={{ fontSize: '11px', fontWeight: '700', color: GREY, letterSpacing: '0.5px' }}>{course.code}</span>
                              <h4 style={{ margin: '4px 0 0', fontSize: '14px', fontWeight: '700', color: NAVY, lineHeight: 1.4, fontFamily: 'Georgia, serif' }}>
                                {course.title}
                              </h4>
                            </div>
                            <div style={{
                              width: '52px', height: '52px', borderRadius: '12px', flexShrink: 0,
                              background: gc.bg, border: `1.5px solid ${gc.border}`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              marginLeft: '12px',
                            }}>
                              <span style={{ fontSize: '18px', fontWeight: '900', color: gc.text, fontFamily: 'Georgia, serif' }}>{course.grade || '—'}</span>
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            <div style={{ flex: 1, background: '#f7f8fc', borderRadius: '8px', padding: '8px 12px', textAlign: 'center' }}>
                              <p style={{ margin: '0 0 2px', fontSize: '11px', color: GREY, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Marks</p>
                              <p style={{ margin: 0, fontSize: '16px', fontWeight: '900', color: NAVY }}>{course.marks || '—'}</p>
                            </div>
                            <div style={{ flex: 1, background: '#f7f8fc', borderRadius: '8px', padding: '8px 12px', textAlign: 'center' }}>
                              <p style={{ margin: '0 0 2px', fontSize: '11px', color: GREY, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Credit</p>
                              <p style={{ margin: 0, fontSize: '16px', fontWeight: '900', color: NAVY }}>{course.credit || '—'}</p>
                            </div>
                            <div style={{ flex: 1, background: gc.bg, border: `1px solid ${gc.border}`, borderRadius: '8px', padding: '8px 12px', textAlign: 'center' }}>
                              <p style={{ margin: '0 0 2px', fontSize: '11px', color: gc.text, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Grade Pt</p>
                              <p style={{ margin: 0, fontSize: '16px', fontWeight: '900', color: gc.text }}>{course.grade_point || '—'}</p>
                            </div>
                          </div>

                          {course.marks && (
                            <div style={{ marginTop: '12px' }}>
                              <div style={{ height: '4px', background: '#f0f0f0', borderRadius: '2px', overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${course.marks}%`, background: gc.text, borderRadius: '2px', transition: 'width 0.8s ease' }} />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}