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

function gradeColor(grade) {
  if (['A', 'A-'].includes(grade))       return '#16a34a';
  if (['B+', 'B', 'B-'].includes(grade)) return '#2563eb';
  if (['C+', 'C'].includes(grade))       return '#d97706';
  if (grade === 'D')                      return '#ea580c';
  if (grade === 'F')                      return RED;
  return GREY;
}

export default function AdminResults() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [results,   setResults]   = useState([]);
  const [selected,  setSelected]  = useState(new Set());
  const [loading,   setLoading]   = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [success,   setSuccess]   = useState('');
  const [dashData,  setDashData]  = useState(null);

  const navItems = [
    { icon: '🏠', label: 'Dashboard',       path: '/admin/dashboard' },
    { icon: '📋', label: 'Publish Results', path: '/admin/results',  badge: results.length },
    { icon: '👨‍🎓', label: 'Students',        path: '/admin/students' },
    { icon: '👨‍🏫', label: 'Faculty',         path: '/admin/faculty' },
    { icon: '📢', label: 'Notices',         path: '/admin/notices' },
  ];

  const loadData = () => {
    setLoading(true);
    Promise.all([
      API.get('/portal/results/unpublished/'),
      API.get('/portal/dashboard/'),
    ])
      .then(([rRes, dRes]) => { setResults(rRes.data); setDashData(dRes.data); })
      .catch(() => navigate('/login'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadData(); }, []);

  const toggleSelect = (id) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === results.length) setSelected(new Set());
    else setSelected(new Set(results.map(r => r.result_id)));
  };

  const publishSelected = async () => {
    if (selected.size === 0) return;
    setPublishing(true);
    try {
      await API.post('/portal/results/publish/', { result_ids: [...selected] });
      setSuccess(`✅ ${selected.size} result(s) published successfully!`);
      setSelected(new Set());
      setTimeout(() => setSuccess(''), 4000);
      loadData();
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to publish. Try again.');
    } finally {
      setPublishing(false);
    }
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f8fc' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '48px', height: '48px', border: `3px solid ${NAVY}20`, borderTopColor: NAVY, borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 0.8s linear infinite' }} />
        <p style={{ color: GREY, fontSize: '14px' }}>Loading results...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );

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
            <p style={{ margin: 0, fontSize: '11px', color: GREY }}>Admin Panel</p>
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
        <div style={{
          background: '#fff', borderBottom: '1px solid #f0f0f0',
          padding: '16px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 8px rgba(30,42,110,0.04)',
        }}>
          <div>
            <p style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: NAVY, fontFamily: 'Georgia, serif' }}>Publish Results</p>
            <p style={{ margin: 0, fontSize: '13px', color: GREY }}>{results.length} result{results.length !== 1 ? 's' : ''} waiting for approval</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {results.length > 0 && (
              <button onClick={toggleAll} style={{
                padding: '10px 18px', borderRadius: '8px', fontSize: '13px',
                fontWeight: '600', cursor: 'pointer', border: `1.5px solid ${NAVY}`,
                background: 'transparent', color: NAVY,
              }}>
                {selected.size === results.length ? 'Deselect All' : 'Select All'}
              </button>
            )}
            <button onClick={publishSelected} disabled={selected.size === 0 || publishing} style={{
              padding: '10px 24px', borderRadius: '8px', fontSize: '13px',
              fontWeight: '700', cursor: selected.size === 0 || publishing ? 'not-allowed' : 'pointer',
              border: 'none', background: selected.size > 0 ? NAVY : '#eee',
              color: selected.size > 0 ? '#fff' : GREY, transition: 'all 0.2s',
            }}
              onMouseOver={e => { if (selected.size > 0 && !publishing) e.currentTarget.style.background = RED; }}
              onMouseOut={e => { if (selected.size > 0 && !publishing) e.currentTarget.style.background = NAVY; }}
            >
              {publishing ? 'Publishing...' : `✓ Publish (${selected.size})`}
            </button>
          </div>
        </div>

        <div style={{ padding: '28px 36px' }}>

          {success && (
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderLeft: '3px solid #16a34a', borderRadius: '8px', padding: '12px 16px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#15803d', fontWeight: '600' }}>{success}</p>
            </div>
          )}

          {results.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px', background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0' }}>
              <div style={{ fontSize: '56px', marginBottom: '16px' }}>✅</div>
              <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: '700', color: NAVY, fontFamily: 'Georgia, serif' }}>All results are published!</h3>
              <p style={{ margin: 0, color: GREY, fontSize: '14px' }}>No pending results from faculty at this time.</p>
            </div>
          ) : (
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', overflow: 'hidden', boxShadow: '0 2px 12px rgba(30,42,110,0.04)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: NAVY }}>
                    <th style={{ padding: '12px 16px', width: '40px' }}>
                      <input type="checkbox"
                        checked={selected.size === results.length && results.length > 0}
                        onChange={toggleAll}
                        style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: RED }}
                      />
                    </th>
                    {['Student', 'Student ID', 'Course', 'Semester', 'Marks', 'Grade', 'Submitted By'].map(h => (
                      <th key={h} style={{ padding: '12px 14px', textAlign: 'left', fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, i) => (
                    <tr key={r.result_id} style={{ borderBottom: '1px solid #f5f5f5', background: selected.has(r.result_id) ? `${NAVY}06` : i % 2 === 0 ? '#fff' : '#fafbfc', cursor: 'pointer' }}
                      onClick={() => toggleSelect(r.result_id)}>
                      <td style={{ padding: '12px 16px' }}>
                        <input type="checkbox"
                          checked={selected.has(r.result_id)}
                          onChange={() => toggleSelect(r.result_id)}
                          onClick={e => e.stopPropagation()}
                          style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: NAVY }}
                        />
                      </td>
                      <td style={{ padding: '12px 14px', fontSize: '14px', fontWeight: '600', color: NAVY }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: `linear-gradient(135deg, ${NAVY}, ${RED})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '11px', fontWeight: '700', flexShrink: 0 }}>
                            {r.student_name?.charAt(0)}
                          </div>
                          {r.student_name}
                        </div>
                      </td>
                      <td style={{ padding: '12px 14px', fontSize: '12px', color: GREY, fontFamily: 'monospace' }}>{r.student_id}</td>
                      <td style={{ padding: '12px 14px' }}>
                        <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: NAVY }}>{r.course_title}</p>
                        <p style={{ margin: 0, fontSize: '11px', color: GREY }}>{r.course_code}</p>
                      </td>
                      <td style={{ padding: '12px 14px', fontSize: '13px', color: GREY }}>{r.semester}</td>
                      <td style={{ padding: '12px 14px', fontSize: '14px', fontWeight: '700', color: NAVY }}>{r.marks}</td>
                      <td style={{ padding: '12px 14px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '800', color: gradeColor(r.grade), background: `${gradeColor(r.grade)}15`, padding: '3px 10px', borderRadius: '4px' }}>
                          {r.grade}
                        </span>
                      </td>
                      <td style={{ padding: '12px 14px', fontSize: '13px', color: GREY }}>{r.submitted_by}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}