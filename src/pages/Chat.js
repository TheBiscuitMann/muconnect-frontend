import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../services/api';

const NAVY = '#1e2a6e';
const RED  = '#e31e24';
const GREY = '#6b7280';

export default function Chat() {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const [data,     setData]     = useState(null);
  const [text,     setText]     = useState('');
  const [loading,  setLoading]  = useState(true);
  const [sending,  setSending]  = useState(false);
  const messagesEndRef = useRef(null);
  const pollRef        = useRef(null);

  const loadMessages = (silent = false) => {
    if (!silent) setLoading(true);
    API.get(`/student/peer/messages/${conversationId}/`)
      .then(res => setData(res.data))
      .catch(() => navigate('/student/peer-network'))
      .finally(() => { if (!silent) setLoading(false); });
  };

  useEffect(() => {
    loadMessages();
    // Poll for new messages every 4 seconds
    pollRef.current = setInterval(() => loadMessages(true), 4000);
    return () => clearInterval(pollRef.current);
  }, [conversationId]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [data?.messages?.length]);

  const sendMessage = async (e) => {
    e?.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || sending) return;

    setSending(true);
    try {
      const res = await API.post(`/student/peer/messages/${conversationId}/`, { text: trimmed });
      setData(prev => ({
        ...prev,
        messages: [...prev.messages, res.data],
      }));
      setText('');
    } catch {
      alert('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f8fc' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '48px', height: '48px', border: `3px solid ${NAVY}20`, borderTopColor: NAVY, borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 0.8s linear infinite' }} />
        <p style={{ color: GREY, fontSize: '14px' }}>Loading chat...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );

  const other    = data?.conversation?.other;
  const myRole   = data?.conversation?.my_role;
  const messages = data?.messages || [];

  // Group messages by date
  const grouped = [];
  let lastDate = null;
  messages.forEach(m => {
    const d = new Date(m.created_at).toDateString();
    if (d !== lastDate) {
      grouped.push({ type: 'date', date: d });
      lastDate = d;
    }
    grouped.push({ type: 'msg', msg: m });
  });

  const formatDate = (dateStr) => {
    const d     = new Date(dateStr);
    const today = new Date();
    const yest  = new Date(today); yest.setDate(yest.getDate() - 1);
    if (d.toDateString() === today.toDateString()) return 'Today';
    if (d.toDateString() === yest.toDateString())  return 'Yesterday';
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const formatTime = (ts) =>
    new Date(ts).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#f7f8fc', fontFamily: 'Segoe UI, sans-serif' }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* ── HEADER ── */}
      <div style={{
        background: '#fff', borderBottom: '1px solid #f0f0f0',
        padding: '14px 24px', display: 'flex', alignItems: 'center', gap: '14px',
        boxShadow: '0 1px 8px rgba(30,42,110,0.04)',
      }}>
        {/* Back button */}
        <button onClick={() => navigate('/student/peer-network')} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: GREY, fontSize: '20px', padding: '4px 8px',
          borderRadius: '6px', transition: 'all 0.2s',
        }}
          onMouseOver={e => { e.currentTarget.style.background = '#f7f8fc'; e.currentTarget.style.color = NAVY; }}
          onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = GREY; }}
        >←</button>

        {/* Avatar */}
        <div style={{
          width: '44px', height: '44px', borderRadius: '50%', flexShrink: 0,
          background: `linear-gradient(135deg, ${NAVY}, ${RED})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '15px', fontWeight: '900', color: '#fff',
          fontFamily: 'Georgia, serif',
        }}>
          {other?.name?.split(' ').map(n => n[0]).slice(0, 2).join('')}
        </div>

        {/* Info */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: NAVY, fontFamily: 'Georgia, serif' }}>
              {other?.name}
            </h3>
            {other?.is_mentor && (
              <span style={{
                background: '#f0fdf4', border: '1px solid #bbf7d0',
                color: '#16a34a', fontSize: '9px', fontWeight: '700',
                padding: '2px 6px', borderRadius: '8px', letterSpacing: '0.5px',
              }}>MENTOR</span>
            )}
          </div>
          <p style={{ margin: 0, fontSize: '12px', color: GREY }}>
            {other?.student_id} · {other?.department} · CGPA {other?.cgpa}
          </p>
        </div>

        {/* Role badge */}
        <div style={{
          fontSize: '10px', fontWeight: '700',
          padding: '4px 10px', borderRadius: '10px',
          background: myRole === 'mentor' ? '#f0fdf4' : '#eff6ff',
          color: myRole === 'mentor' ? '#16a34a' : '#2563eb',
          border: myRole === 'mentor' ? '1px solid #bbf7d0' : '1px solid #bfdbfe',
        }}>
          {myRole === 'mentor' ? '🤝 MENTORING' : '💡 MENTEE'}
        </div>
      </div>

      {/* ── MESSAGES ── */}
      <div style={{
        flex: 1, overflowY: 'auto', padding: '20px 24px',
        display: 'flex', flexDirection: 'column', gap: '8px',
        backgroundImage: `radial-gradient(circle at 1px 1px, ${NAVY}08 1px, transparent 0)`,
        backgroundSize: '24px 24px',
      }}>
        {grouped.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '80px', color: GREY }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>👋</div>
            <p style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: '700', color: NAVY, fontFamily: 'Georgia, serif' }}>Start the conversation</p>
            <p style={{ margin: 0, fontSize: '13px' }}>
              {myRole === 'mentee'
                ? `Say hi to ${other?.name?.split(' ')[0]} and ask for help!`
                : `${other?.name?.split(' ')[0]} might be seeking help — say hi!`}
            </p>
          </div>
        ) : grouped.map((item, i) => {
          if (item.type === 'date') {
            return (
              <div key={`d-${i}`} style={{ textAlign: 'center', margin: '12px 0 4px' }}>
                <span style={{
                  display: 'inline-block', padding: '4px 12px',
                  background: 'rgba(30,42,110,0.08)', color: NAVY,
                  fontSize: '11px', fontWeight: '700', borderRadius: '12px',
                  letterSpacing: '0.5px',
                }}>{formatDate(item.date)}</span>
              </div>
            );
          }
          const m = item.msg;
          return (
            <div key={m.id} style={{
              display: 'flex',
              justifyContent: m.sender_me ? 'flex-end' : 'flex-start',
              animation: 'slideUp 0.2s ease',
            }}>
              <div style={{
                maxWidth: '65%', padding: '10px 14px',
                borderRadius: m.sender_me ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                background: m.sender_me ? NAVY : '#fff',
                color: m.sender_me ? '#fff' : '#333',
                border: m.sender_me ? 'none' : '1px solid #f0f0f0',
                boxShadow: m.sender_me ? `0 2px 12px ${NAVY}30` : '0 1px 4px rgba(0,0,0,0.04)',
              }}>
                <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.5, wordBreak: 'break-word' }}>{m.text}</p>
                <div style={{
                  fontSize: '10px', marginTop: '4px',
                  color: m.sender_me ? 'rgba(255,255,255,0.6)' : '#999',
                  textAlign: 'right',
                }}>
                  {formatTime(m.created_at)}
                  {m.sender_me && (m.read_at ? ' · ✓✓' : ' · ✓')}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* ── INPUT BAR ── */}
      <form onSubmit={sendMessage} style={{
        background: '#fff', borderTop: '1px solid #f0f0f0',
        padding: '14px 24px', display: 'flex', gap: '12px', alignItems: 'flex-end',
      }}>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Type a message..."
          rows={1}
          style={{
            flex: 1, padding: '12px 16px', borderRadius: '12px',
            border: '1.5px solid #e5e7eb', fontSize: '14px',
            resize: 'none', outline: 'none',
            fontFamily: 'Segoe UI, sans-serif',
            maxHeight: '120px', minHeight: '44px',
            transition: 'border-color 0.2s',
          }}
          onFocus={e => e.target.style.borderColor = NAVY}
          onBlur={e => e.target.style.borderColor = '#e5e7eb'}
        />
        <button type="submit" disabled={!text.trim() || sending} style={{
          padding: '0 24px', height: '44px', borderRadius: '12px',
          border: 'none', background: text.trim() && !sending ? NAVY : '#e5e7eb',
          color: '#fff', fontSize: '14px', fontWeight: '700',
          cursor: text.trim() && !sending ? 'pointer' : 'not-allowed',
          transition: 'all 0.2s',
        }}
          onMouseOver={e => { if (text.trim() && !sending) e.currentTarget.style.background = RED; }}
          onMouseOut={e => { if (text.trim() && !sending) e.currentTarget.style.background = NAVY; }}
        >
          {sending ? '...' : 'Send →'}
        </button>
      </form>
    </div>
  );
}