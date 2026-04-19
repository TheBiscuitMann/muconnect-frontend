import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import muLogo from '../assets/MU_Logo.jpg';

const NAVY = '#1e2a6e';
const RED  = '#e31e24';
const GREY = '#6b7280';

// ── DUMMY DATA FOR NOTICES ──
const allNotices = [
  { id: 1, date: '15-MAY', year: '2026', category: 'Exam', title: 'Spring Semester 2026 Final Exam Schedule Published', excerpt: 'The final exam schedule for all undergraduate and graduate programs has been published. Please check your student portal to download your specific routine.' },
  { id: 2, date: '12-MAY', year: '2026', category: 'Event', title: 'Vice Chancellor\'s Town Hall Meeting', excerpt: 'Join the VC for an open discussion regarding the new campus expansion plans, library upgrades, and student facilities.' },
  { id: 3, date: '10-MAY', year: '2026', category: 'Academic', title: 'Course Registration for Summer 2026', excerpt: 'Course advising and registration for the upcoming Summer semester will commence next week. Clear all dues to avoid blocks.' },
  { id: 4, date: '08-MAY', year: '2026', category: 'General', title: 'Campus Wi-Fi Maintenance Notice', excerpt: 'The university network and student portal will undergo scheduled maintenance this Sunday from 2 AM to 6 AM.' },
  { id: 5, date: '05-MAY', year: '2026', category: 'Event', title: 'Intra-Department Programming Contest', excerpt: 'Registration is now open for the annual coding competition hosted by the CSE Society. Cash prizes for the top 3 teams.' },
  { id: 6, date: '01-MAY', year: '2026', category: 'Academic', title: 'Notice regarding Tuition Fee Installments', excerpt: 'The deadline for the second installment of tuition fees has been extended due to the recent national holidays.' },
];

// ✨ Updated to match your exact file name
export default function Noticess() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');

  // Filter logic
  const filteredNotices = activeFilter === 'All' 
    ? allNotices 
    : allNotices.filter(notice => notice.category === activeFilter);

  const categories = ['All', 'Academic', 'Exam', 'Event', 'General'];

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", color: NAVY, background: '#fafbfc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* ── NAVBAR ── */}
      <nav style={{ height: '85px', padding: '0 60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #eaeaea', background: '#fff', position: 'sticky', top: 0, zIndex: 100 }}>
        <div onClick={() => navigate('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <img src={muLogo} alt="MU" style={{ height: '65px', objectFit: 'contain' }} />
        </div>
        <button onClick={() => navigate('/')} style={{ background: 'transparent', border: `1.5px solid ${NAVY}30`, color: NAVY, padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}
          onMouseOver={e => { e.currentTarget.style.background = NAVY; e.currentTarget.style.color = '#fff'; }}
          onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = NAVY; }}
        >
          ← Back to Home
        </button>
      </nav>

      {/* ── HERO BANNER ── */}
      <div style={{ background: NAVY, color: '#fff', padding: '80px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '56px', fontWeight: '900', letterSpacing: '-2px', margin: '0 0 16px', lineHeight: 1.1 }}>
            Notice Board
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, margin: 0 }}>
            Stay updated with the latest academic announcements, exam schedules, and campus events.
          </p>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex: 1, maxWidth: '1000px', margin: '0 auto', padding: '60px 40px', width: '100%' }}>
        
        {/* Filter Bar */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '48px', overflowX: 'auto', paddingBottom: '10px' }}>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveFilter(cat)}
              style={{
                padding: '10px 24px', borderRadius: '40px', fontSize: '14px', fontWeight: '700', cursor: 'pointer',
                border: activeFilter === cat ? 'none' : `1px solid #ddd`,
                background: activeFilter === cat ? NAVY : '#fff',
                color: activeFilter === cat ? '#fff' : GREY,
                transition: 'all 0.2s ease',
                boxShadow: activeFilter === cat ? `0 8px 16px ${NAVY}40` : 'none',
                flexShrink: 0
              }}
              onMouseOver={e => { if(activeFilter !== cat) { e.currentTarget.style.borderColor = NAVY; e.currentTarget.style.color = NAVY; } }}
              onMouseOut={e => { if(activeFilter !== cat) { e.currentTarget.style.borderColor = '#ddd'; e.currentTarget.style.color = GREY; } }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Notices Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {filteredNotices.length > 0 ? (
            filteredNotices.map((notice, i) => {
              const catColors = {
                Exam: { color: RED, bg: '#fff0f0' },
                Academic: { color: NAVY, bg: '#f0f3ff' },
                Event: { color: '#16a34a', bg: '#f0fdf4' }, 
                General: { color: GREY, bg: '#f5f5f5' }
              };
              const theme = catColors[notice.category] || catColors.General;

              return (
                <div key={notice.id} style={{ 
                  background: '#fff', borderRadius: '16px', border: '1px solid #eaeaea', padding: '32px', 
                  display: 'flex', gap: '32px', alignItems: 'center', transition: 'all 0.3s ease', cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                }}
                  onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 32px rgba(0,0,0,0.06)'; e.currentTarget.style.borderColor = theme.color; }}
                  onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.02)'; e.currentTarget.style.borderColor = '#eaeaea'; }}
                >
                  
                  {/* Left: Bold Calendar Date */}
                  <div style={{ textAlign: 'center', minWidth: '80px', flexShrink: 0 }}>
                    <span style={{ display: 'block', fontSize: '32px', fontWeight: '900', color: NAVY, lineHeight: 1 }}>
                      {notice.date.split('-')[0]}
                    </span>
                    <span style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: RED, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>
                      {notice.date.split('-')[1]}
                    </span>
                    <span style={{ display: 'block', fontSize: '12px', color: GREY, marginTop: '2px' }}>
                      {notice.year}
                    </span>
                  </div>

                  {/* Middle: Content */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                      <span style={{ background: theme.bg, color: theme.color, fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', padding: '4px 12px', borderRadius: '20px' }}>
                        {notice.category}
                      </span>
                      {i === 0 && activeFilter === 'All' && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: '700', color: RED }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: RED, animation: 'pulse 2s infinite' }} /> New
                        </span>
                      )}
                    </div>
                    <h3 style={{ margin: '0 0 8px', fontSize: '20px', fontWeight: '800', color: NAVY, lineHeight: 1.3 }}>
                      {notice.title}
                    </h3>
                    <p style={{ margin: 0, fontSize: '15px', color: GREY, lineHeight: 1.6 }}>
                      {notice.excerpt}
                    </p>
                  </div>

                  {/* Right: Arrow */}
                  <div style={{ flexShrink: 0, color: '#ccc', fontSize: '24px', fontWeight: 'bold' }}>
                    →
                  </div>

                </div>
              );
            })
          ) : (
            <div style={{ textAlign: 'center', padding: '60px', color: GREY }}>
              <span style={{ fontSize: '40px', display: 'block', marginBottom: '16px' }}>📭</span>
              <p>No notices found for this category at the moment.</p>
            </div>
          )}
        </div>

      </div>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#0a1230', padding: '40px 60px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>© 2026 Metropolitan University, Sylhet. All rights reserved.</p>
        </div>
      </footer>

      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(227, 30, 36, 0.7); }
          70% { box-shadow: 0 0 0 6px rgba(227, 30, 36, 0); }
          100% { box-shadow: 0 0 0 0 rgba(227, 30, 36, 0); }
        }
      `}</style>
      
    </div>
  );
}