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

const CATEGORIES = ['exam', 'academic', 'event', 'general'];
const CAT_COLORS = { exam: RED, academic: NAVY, event: '#059669', general: '#f59e0b' };
const CAT_LABELS = { exam: 'Exam', academic: 'Academic', event: 'Event', general: 'General' };

export default function AdminNotices() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [notices,  setNotices]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [pending,  setPending]  = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [saving,   setSaving]   = useState(false);
  const [success,  setSuccess]  = useState('');
  const [form,     setForm]     = useState({ title: '', body: '', category: 'general' });

  const navItems = [
    { icon: '🏠', label: 'Dashboard',       path: '/admin/dashboard' },
    { icon: '📋', label: 'Publish Results', path: '/admin/results',  badge: pending },
    { icon: '👨‍🎓', label: 'Students',        path: '/admin/students' },
    { icon: '👨‍🏫', label: 'Faculty',         path: '/admin/faculty' },
    { icon: '📢', label: 'Notices',         path: '/admin/notices' },
  ];

  const loadNotices = () => {
    setLoading(true);
    Promise.all([
      API.get('/notices/'),
      API.get('/portal/results/unpublished/'),
    ])
      .then(([nRes, rRes]) => { setNotices(nRes.data); setPending(rRes.data.length); })
      .catch(() => navigate('/login'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadNotices(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.body.trim()) return;
    setSaving(true);
    try {
      await API.post('/portal/notices/', form);
      setSuccess('Notice published successfully!');
      setForm({ title: '', body: '', category: 'general' });
      setShowForm(false);
      setTimeout(() => setSuccess(''), 3000);
      loadNotices();
    } catch (err) {
      alert('Failed to create notice: ' + (err?.response?.data?.message || 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to deactivate this notice?')) return;
    try {
      await API.delete(`/portal/notices/${id}/`);
      loadNotices();
    } catch { alert('Failed to deactivate notice.'); }
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f8fc' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '48px', height: '48px', border: `3px solid ${NAVY}20`, borderTopColor: NAVY, borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 0.8s linear infinite' }} />
        <p style={{ color: GREY, fontSize: '14px' }}>Loading notices...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f7f8fc', fontFamily: 'Segoe UI, sans-serif' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

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
            <p style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: NAVY, fontFamily: 'Georgia, serif' }}>Notices</p>
            <p style={{ margin: 0, fontSize: '13px', color: GREY }}>{notices.length} active notice{notices.length !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} style={{
            padding: '10px 24px', borderRadius: '8px', fontSize: '13px',
            fontWeight: '700', cursor: 'pointer', border: 'none',
            background: showForm ? GREY : NAVY, color: '#fff', transition: 'all 0.2s',
          }}
            onMouseOver={e => { if (!showForm) e.currentTarget.style.background = RED; }}
            onMouseOut={e => { if (!showForm) e.currentTarget.style.background = NAVY; }}
          >
            {showForm ? '✕ Cancel' : '+ New Notice'}
          </button>
        </div>

        <div style={{ padding: '28px 36px', maxWidth: '860px' }}>

          {success && (
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderLeft: '3px solid #16a34a', borderRadius: '8px', padding: '12px 16px', marginBottom: '20px' }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#15803d', fontWeight: '600' }}>✅ {success}</p>
            </div>
          )}

          {/* Create form */}
          {showForm && (
            <form onSubmit={handleCreate} style={{ background: '#fff', borderRadius: '16px', padding: '28px', border: `1.5px solid ${NAVY}30`, boxShadow: '0 4px 16px rgba(30,42,110,0.08)', marginBottom: '24px' }}>
              <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '700', color: NAVY, fontFamily: 'Georgia, serif' }}>Create New Notice</h3>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: GREY, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Title</label>
                <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} required
                  placeholder="Notice title..."
                  style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #e5e7eb', fontSize: '14px', outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = NAVY}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: GREY, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Category</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {CATEGORIES.map(cat => (
                    <button key={cat} type="button" onClick={() => setForm(p => ({ ...p, category: cat }))} style={{
                      padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '700', cursor: 'pointer',
                      border: `1.5px solid ${form.category === cat ? CAT_COLORS[cat] : '#e5e7eb'}`,
                      background: form.category === cat ? `${CAT_COLORS[cat]}15` : '#fff',
                      color: form.category === cat ? CAT_COLORS[cat] : GREY,
                    }}>{CAT_LABELS[cat]}</button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: GREY, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Body</label>
                <textarea value={form.body} onChange={e => setForm(p => ({ ...p, body: e.target.value }))} required rows={5}
                  placeholder="Write the notice content here..."
                  style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #e5e7eb', fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'Segoe UI, sans-serif' }}
                  onFocus={e => e.target.style.borderColor = NAVY}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
              </div>

              <button type="submit" disabled={saving} style={{ padding: '11px 28px', borderRadius: '8px', border: 'none', background: NAVY, color: '#fff', fontSize: '14px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseOver={e => e.currentTarget.style.background = RED}
                onMouseOut={e => e.currentTarget.style.background = NAVY}
              >{saving ? 'Publishing...' : '📢 Publish Notice'}</button>
            </form>
          )}

          {/* Notices list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {notices.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px', background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0' }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>📢</div>
                <h3 style={{ margin: '0 0 8px', color: NAVY, fontFamily: 'Georgia, serif' }}>No active notices</h3>
                <p style={{ margin: 0, color: GREY, fontSize: '14px' }}>Create your first notice using the button above.</p>
              </div>
            ) : notices.map((n, i) => (
              <div key={n.id} style={{ background: '#fff', borderRadius: '14px', padding: '20px 22px', border: '1px solid #f0f0f0', boxShadow: '0 2px 8px rgba(30,42,110,0.04)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: CAT_COLORS[n.category] || GREY }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '10px', background: `${CAT_COLORS[n.category] || GREY}15`, color: CAT_COLORS[n.category] || GREY }}>
                        {CAT_LABELS[n.category] || n.category}
                      </span>
                      <span style={{ fontSize: '11px', color: GREY }}>{formatDate(n.published_at)}</span>
                    </div>
                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: NAVY, fontFamily: 'Georgia, serif' }}>{n.title}</h4>
                  </div>
                  <button onClick={() => handleDelete(n.id)} style={{
                    padding: '6px 12px', borderRadius: '6px', border: '1px solid #fecaca',
                    background: '#fff0f0', color: RED, fontSize: '12px', fontWeight: '600', cursor: 'pointer',
                    flexShrink: 0, marginLeft: '12px', transition: 'all 0.2s',
                  }}
                    onMouseOver={e => { e.currentTarget.style.background = RED; e.currentTarget.style.color = '#fff'; }}
                    onMouseOut={e => { e.currentTarget.style.background = '#fff0f0'; e.currentTarget.style.color = RED; }}
                  >
                    Deactivate
                  </button>
                </div>
                <p style={{ margin: 0, fontSize: '13px', color: '#555', lineHeight: 1.6, paddingLeft: '4px' }}>
                  {n.body.length > 200 ? n.body.slice(0, 200) + '...' : n.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}