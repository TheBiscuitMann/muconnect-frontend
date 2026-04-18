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

// ── Edit Student Modal ──────────────────────────────────────────
function EditModal({ student, onClose, onSave }) {
  const [form, setForm] = useState({
    first_name:       student.first_name || '',
    last_name:        student.last_name  || '',
    email:            student.email      || '',
    phone:            student.phone      || '',
    batch:            student.batch      || '',
    current_semester: student.current_semester || '',
  });
  const [saving, setSaving] = useState(false);
  const [error,  setError]  = useState('');

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      await API.put(`/portal/students/${student.id}/`, form);
      onSave();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', maxWidth: '520px', width: '100%', boxShadow: '0 24px 64px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: NAVY, fontFamily: 'Georgia, serif' }}>Edit Student Profile</h3>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: GREY }}>{student.student_id}</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: GREY, padding: '4px' }}>✕</button>
        </div>

        {error && (
          <div style={{ background: '#fff0f0', border: `1px solid ${RED}30`, borderLeft: `3px solid ${RED}`, borderRadius: '8px', padding: '10px 14px', marginBottom: '16px' }}>
            <p style={{ margin: 0, fontSize: '13px', color: '#c0392b' }}>{error}</p>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
          {[
            { label: 'First Name',        key: 'first_name',       type: 'text' },
            { label: 'Last Name',         key: 'last_name',        type: 'text' },
            { label: 'Email',             key: 'email',            type: 'email' },
            { label: 'Phone',             key: 'phone',            type: 'tel' },
            { label: 'Batch (Year)',      key: 'batch',            type: 'number' },
            { label: 'Current Semester',  key: 'current_semester', type: 'number' },
          ].map(field => (
            <div key={field.key}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: GREY, marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {field.label}
              </label>
              <input
                type={field.type}
                value={form[field.key]}
                onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '7px', border: '1.5px solid #e5e7eb', fontSize: '13px', color: NAVY, outline: 'none' }}
                onFocus={e => e.target.style.borderColor = NAVY}
                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>
          ))}
        </div>

        <div style={{ background: '#f7f8fc', borderRadius: '8px', padding: '10px 14px', marginBottom: '20px' }}>
          <p style={{ margin: 0, fontSize: '12px', color: GREY }}>🔒 CGPA and Student ID are read-only and updated automatically by the system.</p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={onClose} style={{ flex: 1, padding: '11px', borderRadius: '8px', border: '1px solid #eee', background: '#fff', color: GREY, fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
            Cancel
          </button>
          <button onClick={handleSave} disabled={saving} style={{ flex: 2, padding: '11px', borderRadius: '8px', border: 'none', background: NAVY, color: '#fff', fontSize: '13px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseOver={e => { if (!saving) e.currentTarget.style.background = RED; }}
            onMouseOut={e => { if (!saving) e.currentTarget.style.background = NAVY; }}
          >
            {saving ? 'Saving...' : '✓ Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminStudents() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [students,    setStudents]    = useState([]);
  const [filtered,    setFiltered]    = useState([]);
  const [search,      setSearch]      = useState('');
  const [loading,     setLoading]     = useState(true);
  const [pending,     setPending]     = useState(0);
  const [editStudent, setEditStudent] = useState(null);
  const [success,     setSuccess]     = useState('');

  const navItems = [
    { icon: '🏠', label: 'Dashboard',       path: '/admin/dashboard' },
    { icon: '📋', label: 'Publish Results', path: '/admin/results',  badge: pending },
    { icon: '👨‍🎓', label: 'Students',        path: '/admin/students' },
    { icon: '👨‍🏫', label: 'Faculty',         path: '/admin/faculty' },
    { icon: '📢', label: 'Notices',         path: '/admin/notices' },
  ];

  const loadData = () => {
    setLoading(true);
    Promise.all([
      API.get('/portal/students/'),
      API.get('/portal/results/unpublished/'),
    ])
      .then(([sRes, rRes]) => {
        setStudents(sRes.data);
        setFiltered(sRes.data);
        setPending(rRes.data.length);
      })
      .catch(() => navigate('/login'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadData(); }, [navigate]);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(students.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.student_id.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.department.toLowerCase().includes(q)
    ));
  }, [search, students]);

  const handleSaved = () => {
    setEditStudent(null);
    setSuccess('Student profile updated successfully!');
    setTimeout(() => setSuccess(''), 3000);
    loadData();
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f8fc' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '48px', height: '48px', border: `3px solid ${NAVY}20`, borderTopColor: NAVY, borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 0.8s linear infinite' }} />
        <p style={{ color: GREY, fontSize: '14px' }}>Loading students...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f7f8fc', fontFamily: 'Segoe UI, sans-serif' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {editStudent && (
        <EditModal
          student={editStudent}
          onClose={() => setEditStudent(null)}
          onSave={handleSaved}
        />
      )}

      {/* SIDEBAR */}
      <div style={{ width: '240px', flexShrink: 0, background: '#fff', borderRight: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', padding: '24px 16px', boxShadow: '2px 0 12px rgba(30,42,110,0.04)', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 8px 24px', borderBottom: '1px solid #f5f5f5', marginBottom: '16px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: NAVY, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '14px', color: '#fff' }}>MU</div>
          <div><p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: NAVY }}>MU Connect</p><p style={{ margin: 0, fontSize: '11px', color: GREY }}>Admin Panel</p></div>
        </div>
        <p style={{ margin: '0 0 8px 8px', fontSize: '10px', fontWeight: '700', color: '#ccc', letterSpacing: '2px', textTransform: 'uppercase' }}>Menu</p>
        <nav style={{ flex: 1 }}>
          {navItems.map(item => <NavItem key={item.path} icon={item.icon} label={item.label} badge={item.badge} active={location.pathname === item.path} onClick={() => navigate(item.path)} />)}
        </nav>
        <div style={{ borderTop: '1px solid #f5f5f5', paddingTop: '16px' }}>
          <div onClick={() => { localStorage.clear(); navigate('/login'); }} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', borderRadius: '10px', cursor: 'pointer', color: RED }} onMouseOver={e => e.currentTarget.style.background = '#fff0f0'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
            <span>🚪</span><span style={{ fontSize: '13px', fontWeight: '600' }}>Logout</span>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', padding: '16px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 8px rgba(30,42,110,0.04)' }}>
          <div>
            <p style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: NAVY, fontFamily: 'Georgia, serif' }}>Students</p>
            <p style={{ margin: 0, fontSize: '13px', color: GREY }}>{filtered.length} of {students.length} students · click Edit to update profile</p>
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

          {success && (
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderLeft: '3px solid #16a34a', borderRadius: '8px', padding: '12px 16px', marginBottom: '16px' }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#15803d', fontWeight: '600' }}>✅ {success}</p>
            </div>
          )}

          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', overflow: 'hidden', boxShadow: '0 2px 12px rgba(30,42,110,0.04)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: NAVY }}>
                  {['#', 'Name', 'Student ID', 'Email', 'Department', 'Semester', 'CGPA', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '12px 14px', textAlign: 'left', fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={9} style={{ textAlign: 'center', padding: '40px', color: GREY, fontSize: '14px' }}>No students match your search.</td></tr>
                ) : filtered.map((s, i) => (
                  <tr key={s.id} style={{ borderBottom: '1px solid #f5f5f5', background: i % 2 === 0 ? '#fff' : '#fafbfc' }}>
                    <td style={{ padding: '12px 14px', fontSize: '13px', color: GREY }}>{i + 1}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: `linear-gradient(135deg, ${NAVY}, ${RED})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: '700', flexShrink: 0 }}>
                          {s.name?.charAt(0)}
                        </div>
                        <span style={{ fontSize: '14px', fontWeight: '600', color: NAVY }}>{s.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 14px', fontSize: '12px', color: GREY, fontFamily: 'monospace' }}>{s.student_id}</td>
                    <td style={{ padding: '12px 14px', fontSize: '12px', color: GREY }}>{s.email}</td>
                    <td style={{ padding: '12px 14px', fontSize: '13px', color: '#444' }}>{s.department}</td>
                    <td style={{ padding: '12px 14px', fontSize: '13px', textAlign: 'center', fontWeight: '700', color: NAVY }}>{s.current_semester}</td>
                    <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                      <span style={{ fontSize: '14px', fontWeight: '900', color: parseFloat(s.cgpa) >= 3.5 ? '#059669' : parseFloat(s.cgpa) >= 2.5 ? NAVY : RED, fontFamily: 'Georgia, serif' }}>{s.cgpa}</span>
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{ fontSize: '10px', fontWeight: '700', padding: '3px 8px', borderRadius: '10px', background: s.is_active ? '#f0fdf4' : '#fff0f0', color: s.is_active ? '#16a34a' : RED, border: s.is_active ? '1px solid #bbf7d0' : `1px solid ${RED}30` }}>
                        {s.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <button onClick={() => setEditStudent(s)} style={{
                        padding: '6px 14px', borderRadius: '6px', border: `1.5px solid ${NAVY}`,
                        background: 'transparent', color: NAVY, fontSize: '12px', fontWeight: '700',
                        cursor: 'pointer', transition: 'all 0.2s',
                      }}
                        onMouseOver={e => { e.currentTarget.style.background = NAVY; e.currentTarget.style.color = '#fff'; }}
                        onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = NAVY; }}
                      >✏️ Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}