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
      {badge > 0 && (
        <span style={{
          marginLeft: 'auto', background: RED, color: '#fff',
          borderRadius: '10px', padding: '2px 7px',
          fontSize: '10px', fontWeight: '700',
        }}>{badge}</span>
      )}
      {active && !badge && <div style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: RED }} />}
    </div>
  );
}

export default function PeerNetwork() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [tab,           setTab]           = useState('mentors');
  const [mentors,       setMentors]       = useState([]);
  const [conversations, setConversations] = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [startingChat,  setStartingChat]  = useState(null);

  const loadData = () => {
    setLoading(true);
    Promise.all([
      API.get('/student/peer/mentors/'),
      API.get('/student/peer/conversations/'),
    ])
      .then(([mRes, cRes]) => {
        setMentors(mRes.data);
        setConversations(cRes.data);
      })
      .catch(() => navigate('/login'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadData(); }, []);

  const startChat = async (mentorId) => {
    setStartingChat(mentorId);
    try {
      const res = await API.post('/student/peer/start/', { mentor_id: mentorId });
      navigate(`/student/chat/${res.data.id}`);
    } catch (err) {
      alert('Failed to start chat: ' + (err?.response?.data?.message || 'Unknown error'));
    } finally {
      setStartingChat(null);
    }
  };

  const totalUnread = conversations.reduce((sum, c) => sum + (c.unread_count || 0), 0);

  const navItems = [
    { icon: '🏠', label: 'Dashboard',    path: '/student/dashboard' },
    { icon: '📊', label: 'My Results',   path: '/student/results' },
    { icon: '📄', label: 'Transcript',   path: '/student/transcript' },
    { icon: '🤝', label: 'Peer Network', path: '/student/peer-network', badge: totalUnread },
    { icon: '👤', label: 'Profile',      path: '/student/profile' },
  ];

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f8fc' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '48px', height: '48px', border: `3px solid ${NAVY}20`, borderTopColor: NAVY, borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 0.8s linear infinite' }} />
        <p style={{ color: GREY, fontSize: '14px' }}>Loading peer network...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f7f8fc', fontFamily: 'Segoe UI, sans-serif' }}>
      <style>{`
        @keyframes spin   { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

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
            <p style={{ margin: 0, fontSize: '11px', color: GREY }}>Student Portal</p>
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
          <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', borderRadius: '10px', cursor: 'pointer', color: GREY, marginBottom: '4px' }}
            onMouseOver={e => { e.currentTarget.style.background = '#f7f8fc'; e.currentTarget.style.color = NAVY; }}
            onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = GREY; }}>
            <span>🌐</span><span style={{ fontSize: '13px', fontWeight: '500' }}>Main Website</span>
          </div>
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
          padding: '16px 36px', position: 'sticky', top: 0, zIndex: 100,
          boxShadow: '0 1px 8px rgba(30,42,110,0.04)',
        }}>
          <p style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: NAVY, fontFamily: 'Georgia, serif', letterSpacing: '-0.5px' }}>Peer Network</p>
          <p style={{ margin: 0, fontSize: '13px', color: GREY }}>Connect with senior students for academic help and mentorship</p>
        </div>

        <div style={{ padding: '28px 36px' }}>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', borderBottom: '2px solid #f0f0f0' }}>
            {[
              { key: 'mentors', label: 'Find a Mentor', count: mentors.length },
              { key: 'chats',   label: 'My Chats',      count: conversations.length, unread: totalUnread },
            ].map(t => (
              <div key={t.key} onClick={() => setTab(t.key)} style={{
                padding: '12px 24px', cursor: 'pointer',
                borderBottom: tab === t.key ? `3px solid ${NAVY}` : '3px solid transparent',
                marginBottom: '-2px', fontWeight: tab === t.key ? '700' : '500',
                color: tab === t.key ? NAVY : GREY,
                fontSize: '14px', transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                {t.label}
                <span style={{
                  background: tab === t.key ? `${NAVY}15` : '#f0f0f0',
                  color: tab === t.key ? NAVY : GREY,
                  padding: '2px 8px', borderRadius: '10px',
                  fontSize: '11px', fontWeight: '700',
                }}>{t.count}</span>
                {t.unread > 0 && (
                  <span style={{ background: RED, color: '#fff', padding: '2px 7px', borderRadius: '10px', fontSize: '10px', fontWeight: '700' }}>
                    {t.unread} new
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* ── FIND A MENTOR ── */}
          {tab === 'mentors' && (
            <div>
              {mentors.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0' }}>
                  <div style={{ fontSize: '56px', marginBottom: '16px' }}>🔍</div>
                  <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: '700', color: NAVY, fontFamily: 'Georgia, serif' }}>No mentors available yet</h3>
                  <p style={{ margin: 0, fontSize: '14px', color: GREY, maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
                    When high-achieving students (CGPA 3.85+) opt-in as mentors, they'll appear here. Check back soon!
                  </p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
                  {mentors.map((m, i) => (
                    <div key={m.id} style={{
                      background: '#fff', borderRadius: '16px', padding: '24px',
                      border: '1px solid #f0f0f0', boxShadow: '0 2px 8px rgba(30,42,110,0.04)',
                      transition: 'all 0.25s',
                      animation: `fadeIn 0.3s ease ${i * 60}ms both`,
                      position: 'relative', overflow: 'hidden',
                    }}
                      onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(30,42,110,0.1)'; e.currentTarget.style.borderColor = `${NAVY}40`; }}
                      onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(30,42,110,0.04)'; e.currentTarget.style.borderColor = '#f0f0f0'; }}
                    >
                      {/* Top stripe */}
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${NAVY}, ${RED})` }} />

                      {/* Header */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                        <div style={{
                          width: '52px', height: '52px', borderRadius: '50%', flexShrink: 0,
                          background: `linear-gradient(135deg, ${NAVY}, ${RED})`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '18px', fontWeight: '900', color: '#fff',
                          fontFamily: 'Georgia, serif',
                        }}>
                          {m.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h4 style={{ margin: '0 0 2px', fontSize: '15px', fontWeight: '700', color: NAVY, fontFamily: 'Georgia, serif' }}>{m.name}</h4>
                          <p style={{ margin: 0, fontSize: '12px', color: GREY }}>{m.student_id}</p>
                        </div>
                        <div style={{
                          background: '#f0fdf4', border: '1px solid #bbf7d0',
                          padding: '4px 10px', borderRadius: '20px',
                          display: 'flex', alignItems: 'center', gap: '4px',
                        }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16a34a' }} />
                          <span style={{ fontSize: '10px', fontWeight: '700', color: '#16a34a', letterSpacing: '0.5px' }}>MENTOR</span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '14px' }}>
                        <div style={{ background: '#f7f8fc', borderRadius: '8px', padding: '8px', textAlign: 'center' }}>
                          <p style={{ margin: '0 0 2px', fontSize: '10px', color: GREY, textTransform: 'uppercase', letterSpacing: '0.5px' }}>CGPA</p>
                          <p style={{ margin: 0, fontSize: '15px', fontWeight: '900', color: RED, fontFamily: 'Georgia, serif' }}>{m.cgpa}</p>
                        </div>
                        <div style={{ background: '#f7f8fc', borderRadius: '8px', padding: '8px', textAlign: 'center' }}>
                          <p style={{ margin: '0 0 2px', fontSize: '10px', color: GREY, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Sem</p>
                          <p style={{ margin: 0, fontSize: '15px', fontWeight: '900', color: NAVY, fontFamily: 'Georgia, serif' }}>{m.current_semester}</p>
                        </div>
                        <div style={{ background: '#f7f8fc', borderRadius: '8px', padding: '8px', textAlign: 'center' }}>
                          <p style={{ margin: '0 0 2px', fontSize: '10px', color: GREY, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Batch</p>
                          <p style={{ margin: 0, fontSize: '15px', fontWeight: '900', color: NAVY, fontFamily: 'Georgia, serif' }}>{m.batch}</p>
                        </div>
                      </div>

                      {/* Dept */}
                      <div style={{ fontSize: '12px', color: GREY, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        🏛️ {m.department}
                      </div>

                      {/* Bio */}
                      {m.bio && (
                        <div style={{ background: `${NAVY}06`, borderLeft: `2px solid ${NAVY}30`, padding: '10px 12px', borderRadius: '4px', marginBottom: '14px' }}>
                          <p style={{ margin: 0, fontSize: '12px', color: '#444', lineHeight: 1.5, fontStyle: 'italic' }}>"{m.bio}"</p>
                        </div>
                      )}

                      {/* Message button */}
                      <button onClick={() => startChat(m.id)} disabled={startingChat === m.id} style={{
                        width: '100%', padding: '10px', borderRadius: '8px',
                        border: 'none', background: NAVY, color: '#fff',
                        fontSize: '13px', fontWeight: '700',
                        cursor: startingChat === m.id ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s', opacity: startingChat === m.id ? 0.7 : 1,
                      }}
                        onMouseOver={e => { if (startingChat !== m.id) e.currentTarget.style.background = RED; }}
                        onMouseOut={e => { if (startingChat !== m.id) e.currentTarget.style.background = NAVY; }}
                      >
                        {startingChat === m.id ? 'Opening chat...' : '💬 Send Message'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── MY CHATS ── */}
          {tab === 'chats' && (
            <div>
              {conversations.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0' }}>
                  <div style={{ fontSize: '56px', marginBottom: '16px' }}>💬</div>
                  <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: '700', color: NAVY, fontFamily: 'Georgia, serif' }}>No conversations yet</h3>
                  <p style={{ margin: '0 0 20px', fontSize: '14px', color: GREY, maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
                    Start a conversation with a mentor by visiting the "Find a Mentor" tab.
                  </p>
                  <button onClick={() => setTab('mentors')} style={{
                    padding: '10px 24px', borderRadius: '8px',
                    border: 'none', background: NAVY, color: '#fff',
                    fontSize: '13px', fontWeight: '700', cursor: 'pointer',
                  }}>Find a Mentor →</button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {conversations.map((c, i) => (
                    <div key={c.id} onClick={() => navigate(`/student/chat/${c.id}`)} style={{
                      background: '#fff', borderRadius: '14px', padding: '18px 20px',
                      border: '1px solid #f0f0f0', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '16px',
                      transition: 'all 0.2s',
                      animation: `fadeIn 0.3s ease ${i * 60}ms both`,
                    }}
                      onMouseOver={e => { e.currentTarget.style.transform = 'translateX(4px)'; e.currentTarget.style.borderColor = `${NAVY}40`; e.currentTarget.style.boxShadow = '0 8px 24px rgba(30,42,110,0.06)'; }}
                      onMouseOut={e => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.borderColor = '#f0f0f0'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      {/* Avatar */}
                      <div style={{
                        width: '48px', height: '48px', borderRadius: '50%', flexShrink: 0,
                        background: `linear-gradient(135deg, ${NAVY}, ${RED})`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '16px', fontWeight: '900', color: '#fff',
                        fontFamily: 'Georgia, serif',
                      }}>
                        {c.other_student.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>

                      {/* Text */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: NAVY, fontFamily: 'Georgia, serif' }}>
                            {c.other_student.name}
                          </h4>
                          <span style={{
                            fontSize: '10px', fontWeight: '700',
                            padding: '2px 7px', borderRadius: '10px',
                            background: c.my_role === 'mentor' ? '#f0fdf4' : '#eff6ff',
                            color: c.my_role === 'mentor' ? '#16a34a' : '#2563eb',
                            border: c.my_role === 'mentor' ? '1px solid #bbf7d0' : '1px solid #bfdbfe',
                          }}>
                            {c.my_role === 'mentor' ? '🤝 You are mentor' : '💡 You are mentee'}
                          </span>
                        </div>
                        <p style={{ margin: 0, fontSize: '13px', color: GREY, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {c.last_message ? (
                            <>
                              <span style={{ fontWeight: c.unread_count > 0 ? '600' : '400', color: c.unread_count > 0 ? '#333' : GREY }}>
                                {c.last_message.sender_me ? 'You: ' : ''}{c.last_message.text}
                              </span>
                            </>
                          ) : (
                            <span style={{ fontStyle: 'italic' }}>No messages yet — say hi!</span>
                          )}
                        </p>
                      </div>

                      {/* Unread badge */}
                      {c.unread_count > 0 && (
                        <div style={{
                          background: RED, color: '#fff',
                          minWidth: '24px', height: '24px', borderRadius: '12px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '12px', fontWeight: '700', padding: '0 8px',
                        }}>{c.unread_count}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}