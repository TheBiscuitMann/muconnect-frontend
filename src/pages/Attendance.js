import React, { useEffect, useState, useCallback } from 'react';
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

// ── Step indicator ────────────────────────────────────────────────
function StepBar({ steps, current }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '28px' }}>
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
              background: i < current ? '#059669' : i === current ? NAVY : '#e5e7eb',
              color: i <= current ? '#fff' : GREY,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '12px', fontWeight: '700', transition: 'all 0.3s',
            }}>
              {i < current ? '✓' : i + 1}
            </div>
            <span style={{ fontSize: '13px', fontWeight: i === current ? '700' : '500', color: i === current ? NAVY : GREY }}>
              {s}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div style={{ flex: 1, height: '2px', background: i < current ? '#059669' : '#e5e7eb', margin: '0 10px', transition: 'all 0.3s' }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function Attendance() {
  const navigate = useNavigate();
  const location = useLocation();

  // Wizard state
  const [step,       setStep]       = useState(0); // 0=batch, 1=course, 2=action, 3=mark/summary
  const [batch,      setBatch]      = useState(null);
  const [course,     setCourse]     = useState(null);
  const [action,     setAction]     = useState(null); // 'take' | 'summary' | 'history'

  // Data
  const [batches,    setBatches]    = useState([]);
  const [courses,    setCourses]    = useState([]);
  const [sessions,   setSessions]   = useState([]);
  const [summary,    setSummary]    = useState(null);
  const [sessionDet, setSessionDet] = useState(null);

  // Take attendance form
  const [date,       setDate]       = useState(new Date().toISOString().split('T')[0]);
  const [topic,      setTopic]      = useState('');
  const [attendance, setAttendance] = useState({}); // { student_db_id: true/false }
  const [students,   setStudents]   = useState([]);

  // UI
  const [loading,  setLoading]  = useState(false);
  const [saving,   setSaving]   = useState(false);
  const [success,  setSuccess]  = useState('');
  const [error,    setError]    = useState('');
  const [pendingRetakes, setPendingRetakes] = useState(0);
  const [editSession, setEditSession] = useState(null);

  const navItems = [
    { icon: '🏠', label: 'Dashboard',          path: '/faculty/dashboard' },
    { icon: '📚', label: 'My Courses',          path: '/faculty/courses' },
    { icon: '📋', label: 'Retake Applications', path: '/faculty/retakes', badge: pendingRetakes },
    { icon: '📅', label: 'Attendance',          path: '/faculty/attendance' },
  ];

  // Load batches on mount
  useEffect(() => {
    API.get('/faculty/attendance/batches/')
      .then(res => setBatches(res.data))
      .catch(() => navigate('/login'));
    // Get pending retakes for badge
    API.get('/faculty/retake/')
      .then(res => setPendingRetakes(res.data.filter(a => a.status === 'pending').length))
      .catch(() => {});
  }, [navigate]);

  // Load courses when batch selected
  useEffect(() => {
    if (!batch) return;
    setLoading(true);
    API.get(`/faculty/attendance/batches/${encodeURIComponent(batch)}/courses/`)
      .then(res => { setCourses(res.data); setStep(1); })
      .catch(() => setError('Failed to load courses'))
      .finally(() => setLoading(false));
  }, [batch]);

  // Load students when course selected (for taking attendance)
  const loadStudents = useCallback(() => {
    if (!course) return;
    API.get(`/faculty/courses/${course.id}/students/`)
      .then(res => {
        const studs = res.data.students;
        setStudents(studs);
        const init = {};
        studs.forEach(s => { init[s.enrollment_id] = false; });
        setAttendance(init);
      })
      .catch(() => setError('Failed to load students'));
  }, [course]);

  // Load sessions history
  const loadSessions = useCallback(() => {
    if (!course || !batch) return;
    setLoading(true);
    API.get(`/faculty/attendance/courses/${course.id}/sessions/?batch=${encodeURIComponent(batch)}`)
      .then(res => setSessions(res.data))
      .catch(() => setError('Failed to load sessions'))
      .finally(() => setLoading(false));
  }, [course, batch]);

  // Load summary
  const loadSummary = useCallback(() => {
    if (!course || !batch) return;
    setLoading(true);
    API.get(`/faculty/attendance/courses/${course.id}/summary/?batch=${encodeURIComponent(batch)}`)
      .then(res => setSummary(res.data))
      .catch(() => setError('Failed to load summary'))
      .finally(() => setLoading(false));
  }, [course, batch]);

  const handleActionSelect = (act) => {
    setAction(act);
    setStep(3);
    setError(''); setSuccess('');
    if (act === 'take')    { loadStudents(); }
    if (act === 'summary') { loadSummary(); }
    if (act === 'history') { loadSessions(); }
  };

  const handleMarkAll = (present) => {
    const updated = {};
    students.forEach(s => { updated[s.enrollment_id] = present; });
    setAttendance(updated);
  };

  const handleSubmitAttendance = async () => {
    setSaving(true); setError(''); setSuccess('');
    try {
      const records = students.map(s => ({
        student_id: s.enrollment_id, // enrollment_id maps to student via backend
        present:    attendance[s.enrollment_id] || false,
      }));

      // Build payload using enrollment → student mapping
      // We need student DB IDs — load from summary or re-query
      const summaryRes = await API.get(
        `/faculty/attendance/courses/${course.id}/summary/?batch=${encodeURIComponent(batch)}`
      );
      const studentMap = {};
      summaryRes.data.students.forEach(s => { studentMap[s.student_id] = s.student_db_id; });

      const finalRecords = students.map(s => ({
        student_id: studentMap[s.student_id],
        present:    attendance[s.enrollment_id] || false,
      })).filter(r => r.student_id !== undefined);

      await API.post(`/faculty/attendance/courses/${course.id}/sessions/new/`, {
        batch, date, topic, records: finalRecords,
      });
      setSuccess(`Attendance saved for ${date}!`);
      setDate(new Date().toISOString().split('T')[0]);
      setTopic('');
      // Reset all to false
      const init = {};
      students.forEach(s => { init[s.enrollment_id] = false; });
      setAttendance(init);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to save attendance');
    } finally {
      setSaving(false);
    }
  };

  const loadSessionDetail = async (sessionId) => {
    try {
      const res = await API.get(`/faculty/attendance/sessions/${sessionId}/`);
      setSessionDet(res.data);
    } catch { setError('Failed to load session detail'); }
  };

  const handleUpdateSession = async () => {
    if (!sessionDet) return;
    setSaving(true); setError('');
    try {
      const records = sessionDet.students.map(s => ({
        student_id: s.student_db_id,
        present:    s.present,
      }));
      await API.put(`/faculty/attendance/sessions/${sessionDet.session.id}/update/`, {
        topic: sessionDet.session.topic, records,
      });
      setSuccess('Attendance updated!');
      setSessionDet(null);
      loadSessions();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to update');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSession = async (sessionId) => {
    if (!window.confirm('Delete this session? This cannot be undone.')) return;
    try {
      await API.delete(`/faculty/attendance/sessions/${sessionId}/delete/`);
      loadSessions();
    } catch { setError('Failed to delete session'); }
  };

  const pct = (n, total) => total > 0 ? Math.round((n / total) * 100) : 0;

  // ── RENDER ────────────────────────────────────────────────────
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f7f8fc', fontFamily: 'Segoe UI, sans-serif' }}>
      <style>{`
        @keyframes spin   { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      {/* ── SIDEBAR ── */}
      <div style={{ width: '240px', flexShrink: 0, background: '#fff', borderRight: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', padding: '24px 16px', boxShadow: '2px 0 12px rgba(30,42,110,0.04)', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 8px 24px', borderBottom: '1px solid #f5f5f5', marginBottom: '16px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: NAVY, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '14px', color: '#fff' }}>MU</div>
          <div><p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: NAVY }}>MU Connect</p><p style={{ margin: 0, fontSize: '11px', color: GREY }}>Faculty Portal</p></div>
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
        <div style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', padding: '16px 36px', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 8px rgba(30,42,110,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {step > 0 && (
              <button onClick={() => {
                if (step === 3) { setStep(2); setAction(null); setSessionDet(null); }
                else if (step === 2) { setStep(1); setCourse(null); }
                else if (step === 1) { setStep(0); setBatch(null); setCourses([]); }
              }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: GREY, padding: '4px 8px', borderRadius: '6px' }}
                onMouseOver={e => { e.currentTarget.style.background = '#f7f8fc'; e.currentTarget.style.color = NAVY; }}
                onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = GREY; }}
              >←</button>
            )}
            <div>
              <p style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: NAVY, fontFamily: 'Georgia, serif' }}>Attendance</p>
              <p style={{ margin: 0, fontSize: '13px', color: GREY }}>
                {batch ? `${batch}` : 'Select batch to begin'}
                {course ? ` → ${course.code}` : ''}
                {action === 'take' ? ' → Take Attendance' : action === 'summary' ? ' → Summary' : action === 'history' ? ' → History' : ''}
              </p>
            </div>
          </div>
        </div>

        <div style={{ padding: '28px 36px', maxWidth: '960px' }}>

          {/* Step indicator */}
          <StepBar
            steps={['Select Batch', 'Select Course', 'Choose Action', action === 'take' ? 'Mark Attendance' : action === 'summary' ? 'View Summary' : 'Session History']}
            current={step}
          />

          {/* Messages */}
          {success && (
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderLeft: '3px solid #16a34a', borderRadius: '8px', padding: '12px 16px', marginBottom: '20px' }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#15803d', fontWeight: '600' }}>✅ {success}</p>
            </div>
          )}
          {error && (
            <div style={{ background: '#fff0f0', border: `1px solid ${RED}30`, borderLeft: `3px solid ${RED}`, borderRadius: '8px', padding: '12px 16px', marginBottom: '20px' }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#c0392b', fontWeight: '600' }}>⚠️ {error}</p>
            </div>
          )}

          {/* ── STEP 0: Select Batch ── */}
          {step === 0 && (
            <div style={{ animation: 'fadeIn 0.3s ease' }}>
              <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: '700', color: NAVY, fontFamily: 'Georgia, serif' }}>Select a Batch</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                {batches.map(b => (
                  <div key={b} onClick={() => setBatch(b)} style={{
                    background: '#fff', borderRadius: '14px', padding: '24px',
                    border: `2px solid #f0f0f0`, cursor: 'pointer',
                    textAlign: 'center', transition: 'all 0.2s',
                    boxShadow: '0 2px 8px rgba(30,42,110,0.04)',
                  }}
                    onMouseOver={e => { e.currentTarget.style.borderColor = NAVY; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(30,42,110,0.1)'; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = '#f0f0f0'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(30,42,110,0.04)'; }}
                  >
                    <div style={{ fontSize: '36px', marginBottom: '10px' }}>👥</div>
                    <p style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: NAVY, fontFamily: 'Georgia, serif' }}>{b}</p>
                    <p style={{ margin: '4px 0 0', fontSize: '12px', color: GREY }}>Tap to select</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── STEP 1: Select Course ── */}
          {step === 1 && (
            <div style={{ animation: 'fadeIn 0.3s ease' }}>
              <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: '700', color: NAVY, fontFamily: 'Georgia, serif' }}>Select a Course — <span style={{ color: GREY, fontWeight: '400' }}>{batch}</span></h3>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <div style={{ width: '36px', height: '36px', border: `3px solid ${NAVY}20`, borderTopColor: NAVY, borderRadius: '50%', margin: '0 auto', animation: 'spin 0.8s linear infinite' }} />
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
                  {courses.map(c => (
                    <div key={c.id} onClick={() => { setCourse(c); setStep(2); }} style={{
                      background: '#fff', borderRadius: '14px', padding: '20px',
                      border: '1.5px solid #f0f0f0', cursor: 'pointer', transition: 'all 0.2s',
                      boxShadow: '0 2px 8px rgba(30,42,110,0.04)',
                    }}
                      onMouseOver={e => { e.currentTarget.style.borderColor = NAVY; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(30,42,110,0.1)'; }}
                      onMouseOut={e => { e.currentTarget.style.borderColor = '#f0f0f0'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(30,42,110,0.04)'; }}
                    >
                      <span style={{ fontSize: '11px', fontWeight: '700', color: GREY, letterSpacing: '0.5px' }}>{c.code}</span>
                      <h4 style={{ margin: '4px 0 8px', fontSize: '15px', fontWeight: '700', color: NAVY, fontFamily: 'Georgia, serif' }}>{c.title}</h4>
                      <span style={{ fontSize: '11px', background: `${NAVY}10`, color: NAVY, padding: '2px 8px', borderRadius: '10px', fontWeight: '700' }}>Semester {c.semester}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── STEP 2: Choose Action ── */}
          {step === 2 && course && (
            <div style={{ animation: 'fadeIn 0.3s ease' }}>
              <h3 style={{ margin: '0 0 6px', fontSize: '16px', fontWeight: '700', color: NAVY, fontFamily: 'Georgia, serif' }}>
                {course.code} — {course.title}
              </h3>
              <p style={{ margin: '0 0 20px', fontSize: '13px', color: GREY }}>Batch: {batch} · What would you like to do?</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
                {[
                  { key: 'take',    icon: '✏️', label: 'Take Attendance',   desc: 'Mark present/absent for today or any date',    color: NAVY },
                  { key: 'summary', icon: '📊', label: 'Attendance Summary', desc: 'See overall stats + warning flags per student', color: '#059669' },
                  { key: 'history', icon: '🗓️', label: 'Session History',   desc: 'View, edit or delete past sessions',            color: '#7c3aed' },
                ].map(a => (
                  <div key={a.key} onClick={() => handleActionSelect(a.key)} style={{
                    background: '#fff', borderRadius: '16px', padding: '24px',
                    border: '1.5px solid #f0f0f0', cursor: 'pointer', transition: 'all 0.2s',
                    boxShadow: '0 2px 8px rgba(30,42,110,0.04)', textAlign: 'center',
                  }}
                    onMouseOver={e => { e.currentTarget.style.background = a.color; e.currentTarget.style.borderColor = a.color; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                    onMouseOut={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#f0f0f0'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    <div style={{ fontSize: '36px', marginBottom: '10px' }}>{a.icon}</div>
                    <p style={{ margin: '0 0 6px', fontSize: '14px', fontWeight: '700', color: NAVY }}>{a.label}</p>
                    <p style={{ margin: 0, fontSize: '12px', color: GREY, lineHeight: 1.5 }}>{a.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── STEP 3: TAKE ATTENDANCE ── */}
          {step === 3 && action === 'take' && (
            <div style={{ animation: 'fadeIn 0.3s ease' }}>
              {/* Session info */}
              <div style={{ display: 'flex', gap: '14px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '160px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: GREY, marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date</label>
                  <input type="date" value={date} onChange={e => setDate(e.target.value)}
                    style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #e5e7eb', fontSize: '13px', outline: 'none' }}
                    onFocus={e => e.target.style.borderColor = NAVY}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
                </div>
                <div style={{ flex: 2, minWidth: '200px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: GREY, marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Topic / Lecture (optional)</label>
                  <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. Introduction to SQL..."
                    style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #e5e7eb', fontSize: '13px', outline: 'none' }}
                    onFocus={e => e.target.style.borderColor = NAVY}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
                </div>
              </div>

              {/* Quick select buttons */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: GREY, fontWeight: '600' }}>Mark all:</span>
                <button onClick={() => handleMarkAll(true)} style={{ padding: '6px 14px', borderRadius: '7px', border: 'none', background: '#f0fdf4', color: '#16a34a', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>✓ All Present</button>
                <button onClick={() => handleMarkAll(false)} style={{ padding: '6px 14px', borderRadius: '7px', border: 'none', background: '#fff0f0', color: RED, fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>✕ All Absent</button>
                <span style={{ marginLeft: 'auto', fontSize: '13px', color: GREY }}>
                  <b style={{ color: '#16a34a' }}>{Object.values(attendance).filter(Boolean).length}</b> present &nbsp;·&nbsp;
                  <b style={{ color: RED }}>{Object.values(attendance).filter(v => !v).length}</b> absent
                </span>
              </div>

              {/* Student list */}
              {students.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', background: '#fff', borderRadius: '14px', border: '1px solid #f0f0f0' }}>
                  <p style={{ color: GREY }}>No students enrolled in this course.</p>
                </div>
              ) : (
                <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', overflow: 'hidden', boxShadow: '0 2px 12px rgba(30,42,110,0.04)', marginBottom: '16px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: NAVY }}>
                        {['#', 'Student Name', 'Student ID', 'Status', 'Mark'].map(h => (
                          <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((s, i) => {
                        const isPresent = attendance[s.enrollment_id] || false;
                        return (
                          <tr key={s.enrollment_id} onClick={() => setAttendance(prev => ({ ...prev, [s.enrollment_id]: !prev[s.enrollment_id] }))}
                            style={{ borderBottom: '1px solid #f5f5f5', background: isPresent ? '#f0fdf4' : i % 2 === 0 ? '#fff' : '#fafbfc', cursor: 'pointer', transition: 'background 0.15s' }}
                          >
                            <td style={{ padding: '12px 16px', fontSize: '13px', color: GREY }}>{i + 1}</td>
                            <td style={{ padding: '12px 16px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: isPresent ? '#16a34a' : `linear-gradient(135deg, ${NAVY}, ${RED})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: '700', flexShrink: 0, transition: 'background 0.2s' }}>
                                  {isPresent ? '✓' : s.name?.charAt(0)}
                                </div>
                                <span style={{ fontSize: '14px', fontWeight: '600', color: NAVY }}>{s.name}</span>
                              </div>
                            </td>
                            <td style={{ padding: '12px 16px', fontSize: '12px', color: GREY, fontFamily: 'monospace' }}>{s.student_id}</td>
                            <td style={{ padding: '12px 16px' }}>
                              <span style={{ fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '10px', background: isPresent ? '#f0fdf4' : '#fff0f0', color: isPresent ? '#16a34a' : RED, border: isPresent ? '1px solid #bbf7d0' : `1px solid ${RED}30` }}>
                                {isPresent ? 'Present' : 'Absent'}
                              </span>
                            </td>
                            <td style={{ padding: '12px 16px' }}>
                              <div onClick={e => { e.stopPropagation(); setAttendance(prev => ({ ...prev, [s.enrollment_id]: !prev[s.enrollment_id] })); }}
                                style={{ width: '24px', height: '24px', borderRadius: '6px', border: `2px solid ${isPresent ? '#16a34a' : '#d1d5db'}`, background: isPresent ? '#16a34a' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.15s' }}>
                                {isPresent && <span style={{ color: '#fff', fontSize: '14px', fontWeight: '900' }}>✓</span>}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={handleSubmitAttendance} disabled={saving || students.length === 0} style={{
                  padding: '12px 32px', borderRadius: '8px', border: 'none',
                  background: saving ? GREY : NAVY, color: '#fff',
                  fontSize: '14px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s',
                }}
                  onMouseOver={e => { if (!saving) e.currentTarget.style.background = RED; }}
                  onMouseOut={e => { if (!saving) e.currentTarget.style.background = NAVY; }}
                >
                  {saving ? 'Saving...' : '✓ Save Attendance'}
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3: SUMMARY ── */}
          {step === 3 && action === 'summary' && (
            <div style={{ animation: 'fadeIn 0.3s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: NAVY, fontFamily: 'Georgia, serif' }}>
                  Attendance Summary — {course?.code}
                </h3>
                <button onClick={loadSummary} style={{ padding: '7px 16px', borderRadius: '7px', border: `1px solid ${NAVY}`, background: 'transparent', color: NAVY, fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>↻ Refresh</button>
              </div>

              {loading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <div style={{ width: '36px', height: '36px', border: `3px solid ${NAVY}20`, borderTopColor: NAVY, borderRadius: '50%', margin: '0 auto', animation: 'spin 0.8s linear infinite' }} />
                </div>
              ) : !summary ? null : (
                <>
                  {/* Stats row */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
                    {[
                      { label: 'Total Sessions', value: summary.total_sessions, color: NAVY,      icon: '📅' },
                      { label: 'Warning Students', value: summary.students?.filter(s => s.warning).length || 0, color: '#d97706', icon: '⚠️' },
                      { label: 'Total Students', value: summary.students?.length || 0, color: '#059669', icon: '👥' },
                    ].map((s, i) => (
                      <div key={i} style={{ background: '#fff', borderRadius: '12px', padding: '16px 20px', border: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <p style={{ margin: '0 0 4px', fontSize: '11px', color: GREY, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</p>
                          <p style={{ margin: 0, fontSize: '24px', fontWeight: '900', color: s.color, fontFamily: 'Georgia, serif' }}>{s.value}</p>
                        </div>
                        <span style={{ fontSize: '24px' }}>{s.icon}</span>
                      </div>
                    ))}
                  </div>

                  {/* Warning banner */}
                  {summary.students?.some(s => s.warning) && (
                    <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderLeft: '3px solid #d97706', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px' }}>
                      <p style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#92400e' }}>
                        ⚠️ {summary.students.filter(s => s.warning).length} student(s) below 60% attendance — NOT ELIGIBLE for final exam
                      </p>
                    </div>
                  )}

                  {/* Student table */}
                  <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', overflow: 'hidden', boxShadow: '0 2px 12px rgba(30,42,110,0.04)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ background: NAVY }}>
                          {['#', 'Student Name', 'ID', 'Present', 'Absent', 'Percentage', 'Status'].map(h => (
                            <th key={h} style={{ padding: '11px 14px', textAlign: 'left', fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {summary.students?.map((s, i) => (
                          <tr key={s.student_id} style={{ borderBottom: '1px solid #f5f5f5', background: s.warning ? '#fffbeb' : i % 2 === 0 ? '#fff' : '#fafbfc' }}>
                            <td style={{ padding: '12px 14px', fontSize: '13px', color: GREY }}>{i + 1}</td>
                            <td style={{ padding: '12px 14px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: s.warning ? '#d97706' : `linear-gradient(135deg, ${NAVY}, ${RED})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '11px', fontWeight: '700', flexShrink: 0 }}>
                                  {s.name?.charAt(0)}
                                </div>
                                <span style={{ fontSize: '14px', fontWeight: '600', color: NAVY }}>{s.name}</span>
                              </div>
                            </td>
                            <td style={{ padding: '12px 14px', fontSize: '12px', color: GREY, fontFamily: 'monospace' }}>{s.student_id}</td>
                            <td style={{ padding: '12px 14px', fontSize: '14px', fontWeight: '700', color: '#16a34a' }}>{s.attended}</td>
                            <td style={{ padding: '12px 14px', fontSize: '14px', fontWeight: '700', color: RED }}>{s.absent}</td>
                            <td style={{ padding: '12px 14px' }}>
                              <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                                  <span style={{ fontSize: '13px', fontWeight: '800', color: s.percentage < 60 ? RED : s.percentage < 75 ? '#d97706' : '#059669' }}>
                                    {s.percentage}%
                                  </span>
                                </div>
                                <div style={{ height: '5px', background: '#f0f0f0', borderRadius: '3px', overflow: 'hidden', width: '80px' }}>
                                  <div style={{ height: '100%', width: `${s.percentage}%`, background: s.percentage < 60 ? RED : s.percentage < 75 ? '#d97706' : '#059669', borderRadius: '3px', transition: 'width 0.8s ease' }} />
                                </div>
                              </div>
                            </td>
                            <td style={{ padding: '12px 14px' }}>
                              {s.warning ? (
                                <span style={{ fontSize: '10px', fontWeight: '700', padding: '3px 8px', borderRadius: '8px', background: '#fffbeb', color: '#92400e', border: '1px solid #fde68a' }}>
                                  ⚠️ NOT ELIGIBLE
                                </span>
                              ) : (
                                <span style={{ fontSize: '10px', fontWeight: '700', padding: '3px 8px', borderRadius: '8px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0' }}>
                                  ✓ Eligible
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ── STEP 3: HISTORY ── */}
          {step === 3 && action === 'history' && (
            <div style={{ animation: 'fadeIn 0.3s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: NAVY, fontFamily: 'Georgia, serif' }}>
                  Session History — {course?.code}
                </h3>
                <button onClick={loadSessions} style={{ padding: '7px 16px', borderRadius: '7px', border: `1px solid ${NAVY}`, background: 'transparent', color: NAVY, fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>↻ Refresh</button>
              </div>

              {loading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <div style={{ width: '36px', height: '36px', border: `3px solid ${NAVY}20`, borderTopColor: NAVY, borderRadius: '50%', margin: '0 auto', animation: 'spin 0.8s linear infinite' }} />
                </div>
              ) : sessions.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px', background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0' }}>
                  <div style={{ fontSize: '48px', marginBottom: '12px' }}>📭</div>
                  <h3 style={{ margin: '0 0 8px', color: NAVY, fontFamily: 'Georgia, serif' }}>No sessions yet</h3>
                  <p style={{ margin: 0, color: GREY }}>Take attendance first to see sessions here.</p>
                </div>
              ) : (
                <>
                  {/* Session detail modal */}
                  {sessionDet && (
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                      <div style={{ background: '#fff', borderRadius: '16px', padding: '28px', maxWidth: '600px', width: '100%', maxHeight: '85vh', overflowY: 'auto', boxShadow: '0 24px 64px rgba(0,0,0,0.2)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                          <div>
                            <h3 style={{ margin: 0, fontSize: '17px', fontWeight: '800', color: NAVY, fontFamily: 'Georgia, serif' }}>Edit Session</h3>
                            <p style={{ margin: '4px 0 0', fontSize: '13px', color: GREY }}>{sessionDet.session.date} · {sessionDet.session.batch}</p>
                          </div>
                          <button onClick={() => setSessionDet(null)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: GREY }}>✕</button>
                        </div>

                        <div style={{ marginBottom: '14px' }}>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: GREY, marginBottom: '5px', textTransform: 'uppercase' }}>Topic</label>
                          <input value={sessionDet.session.topic} onChange={e => setSessionDet(prev => ({ ...prev, session: { ...prev.session, topic: e.target.value } }))}
                            style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '7px', border: '1.5px solid #e5e7eb', fontSize: '13px', outline: 'none' }}
                            onFocus={e => e.target.style.borderColor = NAVY}
                            onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
                        </div>

                        {/* Quick marks */}
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                          <button onClick={() => setSessionDet(prev => ({ ...prev, students: prev.students.map(s => ({ ...s, present: true })) }))}
                            style={{ padding: '6px 14px', borderRadius: '7px', border: 'none', background: '#f0fdf4', color: '#16a34a', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>✓ All Present</button>
                          <button onClick={() => setSessionDet(prev => ({ ...prev, students: prev.students.map(s => ({ ...s, present: false })) }))}
                            style={{ padding: '6px 14px', borderRadius: '7px', border: 'none', background: '#fff0f0', color: RED, fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>✕ All Absent</button>
                        </div>

                        <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #f0f0f0', borderRadius: '10px' }}>
                          {sessionDet.students.map((s, i) => (
                            <div key={s.student_db_id} onClick={() => setSessionDet(prev => ({ ...prev, students: prev.students.map(st => st.student_db_id === s.student_db_id ? { ...st, present: !st.present } : st) }))}
                              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', borderBottom: i < sessionDet.students.length - 1 ? '1px solid #f5f5f5' : 'none', cursor: 'pointer', background: s.present ? '#f0fdf4' : '#fff', transition: 'background 0.15s' }}>
                              <div style={{ width: '22px', height: '22px', borderRadius: '5px', border: `2px solid ${s.present ? '#16a34a' : '#d1d5db'}`, background: s.present ? '#16a34a' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                {s.present && <span style={{ color: '#fff', fontSize: '13px', fontWeight: '900' }}>✓</span>}
                              </div>
                              <span style={{ fontSize: '14px', fontWeight: '600', color: NAVY, flex: 1 }}>{s.name}</span>
                              <span style={{ fontSize: '12px', color: GREY, fontFamily: 'monospace' }}>{s.student_id}</span>
                              <span style={{ fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '8px', background: s.present ? '#f0fdf4' : '#fff0f0', color: s.present ? '#16a34a' : RED }}>
                                {s.present ? 'P' : 'A'}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                          <button onClick={() => setSessionDet(null)} style={{ flex: 1, padding: '11px', borderRadius: '8px', border: '1px solid #eee', background: '#fff', color: GREY, fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                          <button onClick={handleUpdateSession} disabled={saving} style={{ flex: 2, padding: '11px', borderRadius: '8px', border: 'none', background: NAVY, color: '#fff', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
                            onMouseOver={e => { if (!saving) e.currentTarget.style.background = RED; }}
                            onMouseOut={e => { if (!saving) e.currentTarget.style.background = NAVY; }}
                          >{saving ? 'Saving...' : '✓ Save Changes'}</button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Sessions list */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {sessions.map((s, i) => (
                      <div key={s.id} style={{ background: '#fff', borderRadius: '14px', padding: '18px 20px', border: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', animation: `fadeIn 0.3s ease ${i * 50}ms both` }}>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                          <div style={{ textAlign: 'center', padding: '10px 14px', background: `${NAVY}08`, borderRadius: '10px', minWidth: '60px' }}>
                            <p style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: NAVY, fontFamily: 'Georgia, serif' }}>
                              {new Date(s.date).getDate()}
                            </p>
                            <p style={{ margin: 0, fontSize: '10px', color: GREY, textTransform: 'uppercase' }}>
                              {new Date(s.date).toLocaleDateString('en-GB', { month: 'short' })}
                            </p>
                          </div>
                          <div>
                            <p style={{ margin: '0 0 2px', fontSize: '14px', fontWeight: '700', color: NAVY }}>
                              {s.topic || 'No topic set'}
                            </p>
                            <p style={{ margin: 0, fontSize: '12px', color: GREY }}>
                              {new Date(s.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                          <div style={{ textAlign: 'center' }}>
                            <p style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: '#16a34a', fontFamily: 'Georgia, serif' }}>{s.present}</p>
                            <p style={{ margin: 0, fontSize: '10px', color: GREY, textTransform: 'uppercase' }}>Present</p>
                          </div>
                          <div style={{ textAlign: 'center' }}>
                            <p style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: RED, fontFamily: 'Georgia, serif' }}>{s.absent}</p>
                            <p style={{ margin: 0, fontSize: '10px', color: GREY, textTransform: 'uppercase' }}>Absent</p>
                          </div>
                          <div style={{ textAlign: 'center' }}>
                            <p style={{ margin: 0, fontSize: '16px', fontWeight: '900', color: pct(s.present, s.total) < 60 ? RED : '#059669', fontFamily: 'Georgia, serif' }}>
                              {pct(s.present, s.total)}%
                            </p>
                            <p style={{ margin: 0, fontSize: '10px', color: GREY, textTransform: 'uppercase' }}>Rate</p>
                          </div>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={() => loadSessionDetail(s.id)} style={{ padding: '7px 14px', borderRadius: '7px', border: `1.5px solid ${NAVY}`, background: 'transparent', color: NAVY, fontSize: '12px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' }}
                              onMouseOver={e => { e.currentTarget.style.background = NAVY; e.currentTarget.style.color = '#fff'; }}
                              onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = NAVY; }}
                            >✏️ Edit</button>
                            <button onClick={() => handleDeleteSession(s.id)} style={{ padding: '7px 14px', borderRadius: '7px', border: `1.5px solid ${RED}`, background: 'transparent', color: RED, fontSize: '12px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' }}
                              onMouseOver={e => { e.currentTarget.style.background = RED; e.currentTarget.style.color = '#fff'; }}
                              onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = RED; }}
                            >🗑️ Delete</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}