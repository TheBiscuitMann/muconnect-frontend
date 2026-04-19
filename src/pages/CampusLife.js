import React from 'react';
import { useNavigate } from 'react-router-dom';
import muLogo from '../assets/MU_Logo.jpg';
import pondPic from '../assets/mu_pond.jpg'; 

const NAVY = '#1e2a6e';
const RED  = '#e31e24';
const GREY = '#6b7280';

export default function CampusLife() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", color: NAVY, background: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* ── NAVBAR ── */}
      <nav style={{ height: '85px', padding: '0 60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', background: '#fff', position: 'sticky', top: 0, zIndex: 100 }}>
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

      {/* ── FULL SCREEN HERO SECTION ── */}
      <div style={{ position: 'relative', minHeight: 'calc(100vh - 85px)', display: 'flex', alignItems: 'center', overflow: 'hidden', padding: '100px 60px' }}>
        
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: `url(${pondPic})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(30, 42, 110, 0.95) 0%, rgba(30, 42, 110, 0.6) 50%, transparent 100%)', zIndex: 1 }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1400px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ maxWidth: '650px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: `1px solid rgba(255,255,255,0.2)`, background: 'rgba(255,255,255,0.05)', padding: '6px 14px', borderRadius: '4px', marginBottom: '32px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80' }} />
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#fff', letterSpacing: '2px', textTransform: 'uppercase' }}>Bateshwar Campus</span>
            </div>

            <h1 style={{ margin: '0 0 24px', fontSize: '56px', fontWeight: '900', lineHeight: 1.1, letterSpacing: '-2px', color: '#fff' }}>
              Beyond the<br/>classroom.
            </h1>
            
            <p style={{ margin: '0 0 40px', fontSize: '18px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.8 }}>
              Metropolitan University is more than just lectures and exams. It’s a vibrant, 168-acre playground for innovation, creativity, and lifelong friendships. Explore our active student life, join a club, or simply relax by the campus pond.
            </p>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <button onClick={() => navigate('/clubs')} style={{ padding: '16px 36px', borderRadius: '8px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', border: 'none', background: RED, color: '#fff', letterSpacing: '0.5px', transition: 'all 0.3s ease', boxShadow: `0 8px 24px rgba(227, 30, 36, 0.4)` }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 12px 32px rgba(227, 30, 36, 0.6)`; }} onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 24px rgba(227, 30, 36, 0.4)`; }}>
                Explore Student Clubs →
              </button>
              <button style={{ padding: '16px 32px', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', background: 'rgba(255,255,255,0.1)', color: '#fff', border: `1px solid rgba(255,255,255,0.3)`, transition: 'all 0.3s ease', backdropFilter: 'blur(4px)' }}
                onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.borderColor = '#fff'; }} onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}>
            
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✨ NEW SCROLLABLE SECTION TO MAKE THE PAGE LENGTHY */}
      <div style={{ padding: '120px 60px', background: '#fafbfc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: '900', color: NAVY, letterSpacing: '-1px', marginBottom: '24px' }}>
              The MU Experience
            </h2>
            <p style={{ fontSize: '18px', color: GREY, lineHeight: 1.8, maxWidth: '700px', margin: '0 auto' }}>
              From the moment you step onto our permanently chartered campus, you are part of a dynamic community designed to support your personal and professional growth.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            {[
              { icon: '💡', title: 'Innovation Hubs', desc: 'Access state-of-the-art tech labs and collaborative spaces designed for late-night brainstorming and startup building.' },
              { icon: '🎭', title: 'Arts & Culture', desc: 'Immerse yourself in campus festivals, dramatic performances, and cultural showcases throughout the semester.' },
              { icon: '🏆', title: 'Athletics & Fitness', desc: 'Join intramural leagues or cheer on our varsity teams in cricket, football, and indoor sporting events.' }
            ].map((item, i) => (
              <div key={i} style={{ background: '#fff', padding: '48px 40px', borderRadius: '24px', boxShadow: '0 12px 32px rgba(0,0,0,0.03)', border: '1px solid #f0f0f0', transition: 'transform 0.3s ease' }}
                onMouseOver={e => e.currentTarget.style.transform = 'translateY(-8px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <span style={{ fontSize: '40px', display: 'block', marginBottom: '24px' }}>{item.icon}</span>
                <h3 style={{ fontSize: '22px', fontWeight: '800', color: NAVY, marginBottom: '16px' }}>{item.title}</h3>
                <p style={{ fontSize: '15px', color: GREY, lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#0a1230', padding: '40px 60px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>© 2026 Metropolitan University, Sylhet. All rights reserved.</p>
        </div>
      </footer>
      
    </div>
  );
}