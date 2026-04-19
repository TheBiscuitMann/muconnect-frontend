import React from 'react';
import { useNavigate } from 'react-router-dom';
import muLogo from '../assets/MU_Logo.jpg';

const NAVY = '#1e2a6e';
const GREY = '#6b7280';

// ⬇️ --- SWAP THIS DATA PACK FOR OTHER DEPARTMENTS --- ⬇️

const DEPT_COLOR = '#4A148C'; // Royal Purple
const DEPT_NAME = 'English';
const SCHOOL_NAME = 'School of Humanities';

const deptHead = {
  name: "Dr. [Head's Name]",
  title: "Head, Department of English",
  message: "Welcome to the Department of English. We believe in the profound power of literature and language to shape society. Our students engage deeply with global narratives, critical theory, and linguistic structures, emerging as articulate communicators and creative thinkers ready for a diverse range of careers.",
};

const quickLinks = [ "BA (Hons) in English", "MA in English", "Literary & Debate Club", "Creative Writing Workshop", "Academic Calendar" ];

const notices = [
  { date: '20-MAY', title: 'Annual Shakespeare Drama Festival' },
  { date: '12-MAY', title: 'Guest Lecture: Post-Colonial Literature' },
  { date: '04-MAY', title: 'Call for Submissions: MU Literary Magazine' },
];

const contact = {
  office: "Room 102, Humanities Block",
  phone: "+880-1234-567894",
  email: "head_english@metrouni.edu.bd",
};

// ⬆️ --- END OF DATA PACK --- ⬆️

export default function   EnglishDept() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", color: NAVY, background: '#fff', minHeight: '100vh' }}>
      
      {/* ── MINIMAL NAVBAR ── */}
      <nav style={{ height: '68px', padding: '0 60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0', background: '#fff', position: 'sticky', top: 0, zIndex: 100 }}>
        <div onClick={() => navigate('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <img src={muLogo} alt="MU" style={{ height: '46px', objectFit: 'contain' }} />
        </div>
        <button onClick={() => navigate('/')} style={{ background: 'transparent', border: `1.5px solid ${NAVY}30`, color: NAVY, padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
          ← Back to Home
        </button>
      </nav>

      {/* ── VIBRANT HERO BANNER ── */}
      <div style={{ position: 'relative', height: '350px', background: `linear-gradient(to right, ${NAVY}, ${DEPT_COLOR})`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,18,48,0.4)' }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: '#fff', padding: '0 20px' }}>
          <p style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', color: '#ffb703' }}>
            {SCHOOL_NAME}
          </p>
          <h1 style={{ margin: '0', fontSize: '56px', fontWeight: '900', letterSpacing: '-1px' }}>
            Department of {DEPT_NAME}
          </h1>
        </div>
      </div>

      {/* ── MAIN CONTENT GRID ── */}
      <div style={{ maxWidth: '1200px', margin: '80px auto', padding: '0 40px', display: 'grid', gridTemplateColumns: '2.5fr 1fr', gap: '80px' }}>
        
        {/* LEFT COLUMN: Main Information */}
        <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
          <div style={{ marginBottom: '56px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: '900', color: NAVY, marginBottom: '32px', letterSpacing: '-0.5px' }}>
              Welcome from the Head
            </h2>
            <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
              {/* Vibrant Image Container */}
              <div style={{ width: '240px', height: '280px', flexShrink: 0, borderRadius: '16px', padding: '6px', background: `linear-gradient(135deg, ${DEPT_COLOR}, ${NAVY})`, boxShadow: `0 16px 32px ${DEPT_COLOR}30` }}>
                <div style={{ width: '100%', height: '100%', background: '#f0f0f0', borderRadius: '12px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '64px' }}>👤</span> 
                </div>
              </div>
              <div>
                <p style={{ margin: '0 0 24px', fontSize: '17px', color: '#444', lineHeight: 1.8 }}>{deptHead.message}</p>
                <div style={{ borderLeft: `4px solid ${DEPT_COLOR}`, paddingLeft: '16px' }}>
                  <p style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: '800', color: NAVY }}>{deptHead.name}</p>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: DEPT_COLOR, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{deptHead.title}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar */}
        <div>
          {/* Quick Links */}
          <div style={{ background: '#fdf8f9', padding: '32px', borderRadius: '16px', marginBottom: '32px', border: `1px solid ${DEPT_COLOR}20` }}>
            <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '800', color: NAVY, textTransform: 'uppercase', letterSpacing: '1px' }}>Essential Resources</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {quickLinks.map(link => (
                <li key={link}>
                  <a href="#" style={{ color: NAVY, textDecoration: 'none', fontSize: '15px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '12px', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = DEPT_COLOR} onMouseOut={e => e.target.style.color = NAVY}>
                    <span style={{ color: DEPT_COLOR, fontSize: '12px' }}>▶</span> {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Notices */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '800', color: NAVY, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '2px solid #eee', paddingBottom: '12px' }}>Department Notices</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {notices.map((notice, i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ background: NAVY, color: '#fff', padding: '8px', borderRadius: '8px', textAlign: 'center', minWidth: '50px', lineHeight: 1.2 }}>
                    <span style={{ display: 'block', fontSize: '18px', fontWeight: '900' }}>{notice.date.split('-')[0]}</span>
                    <span style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>{notice.date.split('-')[1]}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '15px', color: '#444', fontWeight: '600', lineHeight: 1.5, cursor: 'pointer' }} onMouseOver={e => e.target.style.color = DEPT_COLOR} onMouseOut={e => e.target.style.color = '#444'}>{notice.title}</p>
                </div>
              ))}
            </div>
            <button style={{ marginTop: '24px', background: DEPT_COLOR, color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', padding: '10px 20px', width: '100%' }}>View All Notices</button>
          </div>

          {/* Contact */}
          <div style={{ background: NAVY, color: '#fff', padding: '32px', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: DEPT_COLOR, borderRadius: '50%', opacity: 0.8 }} />
            <h3 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: '800', position: 'relative', zIndex: 1 }}>Contact Us</h3>
            <p style={{ margin: '0 0 12px', fontSize: '14px', color: 'rgba(255,255,255,0.8)', position: 'relative', zIndex: 1 }}>📍 {contact.office}</p>
            <p style={{ margin: '0 0 12px', fontSize: '14px', color: 'rgba(255,255,255,0.8)', position: 'relative', zIndex: 1 }}>📞 {contact.phone}</p>
            <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.8)', position: 'relative', zIndex: 1 }}>✉️ {contact.email}</p>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#0a1230', padding: '72px 60px 40px', borderTop: `4px solid ${DEPT_COLOR}`, marginTop: '40px' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.2)' }}>© 2026 Metropolitan University, Sylhet.</p>
          </div>
        </div>
      </footer>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}