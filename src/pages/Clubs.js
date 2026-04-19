import React from 'react';
import { useNavigate } from 'react-router-dom';
import muLogo from '../assets/MU_Logo.jpg';

const NAVY = '#1e2a6e';

// Custom vibrant colors for each specific club!
const CLUB_DATA = [
  { name: 'CSE Society', emoji: '💻', color: '#0288D1', desc: 'The ultimate hub for tech enthusiasts, competitive programmers, and future software engineers.' },
  { name: 'Robotics Club', emoji: '🤖', color: '#7B1FA2', desc: 'Design, build, and program cutting-edge robotic systems for national and international competitions.' },
  { name: 'MUGAS', emoji: '🎮', color: '#E65100', desc: 'Metropolitan University Gaming & Anime Society. Your home for esports, pop culture, and tournaments.' },
  { name: 'Sports Club', emoji: '⚽', color: '#2E7D32', desc: 'Train, compete, and represent MU in cricket, football, table tennis, and athletics.' },
  { name: 'Flames Music Club', emoji: '🎸', color: '#C62828', desc: 'Jam sessions, acoustic nights, and massive concert performances. Bring the rhythm to the campus.' },
  { name: 'Book Borrowing Club', emoji: '📚', color: '#00838F', desc: 'A quiet haven to share stories, discuss global literature, and expand your intellectual horizons.' },
  { name: 'Islamic Society', emoji: '🕌', color: '#00695C', desc: 'Fostering spiritual growth, community service, charity drives, and strong campus brotherhood.' }
];

export default function Clubs() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", color: NAVY, background: '#fafbfc', minHeight: '100vh' }}>
      
      {/* ── NAVBAR ── */}
      <nav style={{ height: '85px', padding: '0 60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #eee', background: '#fff', position: 'sticky', top: 0, zIndex: 100 }}>
        <div onClick={() => navigate('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <img src={muLogo} alt="MU" style={{ height: '65px', objectFit: 'contain' }} />
        </div>
        <button onClick={() => navigate('/campus-life')} style={{ background: 'transparent', border: `1.5px solid ${NAVY}30`, color: NAVY, padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}
          onMouseOver={e => { e.currentTarget.style.background = NAVY; e.currentTarget.style.color = '#fff'; }}
          onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = NAVY; }}
        >
          ← Back to Campus Life
        </button>
      </nav>

      {/* ── HERO BANNER ── */}
      <div style={{ background: NAVY, color: '#fff', padding: '100px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle, #fff 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
          <span style={{ fontSize: '14px', fontWeight: '800', letterSpacing: '3px', textTransform: 'uppercase', color: '#4ade80', display: 'block', marginBottom: '16px' }}>
            Student Life
          </span>
          <h1 style={{ fontSize: '56px', fontWeight: '900', letterSpacing: '-2px', margin: '0 0 24px', lineHeight: 1.1 }}>
            Find Your Tribe.
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
            Join a community of like-minded students. Whether you are building apps, composing music, or scoring goals, there is a place for you here.
          </p>
        </div>
      </div>

      {/* ── VIBRANT CLUBS GRID ── */}
      <div style={{ maxWidth: '1400px', margin: '80px auto', padding: '0 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '32px' }}>
          
          {CLUB_DATA.map((club, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: '24px', padding: '40px', border: '1px solid #eee', cursor: 'pointer',
              position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.04)'
            }}
              onMouseOver={e => { 
                e.currentTarget.style.transform = 'translateY(-8px)'; 
                e.currentTarget.style.boxShadow = `0 24px 48px ${club.color}25`;
                e.currentTarget.style.borderColor = `${club.color}50`;
                e.currentTarget.querySelector('.glow-bg').style.opacity = '0.08';
                e.currentTarget.querySelector('.arrow').style.transform = 'translateX(8px)';
                e.currentTarget.querySelector('.arrow').style.color = club.color;
              }}
              onMouseOut={e => { 
                e.currentTarget.style.transform = 'translateY(0)'; 
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.04)';
                e.currentTarget.style.borderColor = '#eee';
                e.currentTarget.querySelector('.glow-bg').style.opacity = '0';
                e.currentTarget.querySelector('.arrow').style.transform = 'translateX(0)';
                e.currentTarget.querySelector('.arrow').style.color = '#ccc';
              }}
            >
              {/* Vibrant hidden background glow */}
              <div className="glow-bg" style={{ position: 'absolute', top: '-20%', right: '-20%', width: '200px', height: '200px', background: `radial-gradient(circle, ${club.color} 0%, transparent 70%)`, opacity: 0, transition: 'opacity 0.4s ease', borderRadius: '50%' }} />

              <div style={{ width: '70px', height: '70px', borderRadius: '18px', background: `${club.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', border: `1px solid ${club.color}30`, marginBottom: '24px' }}>
                {club.emoji}
              </div>
              
              <h2 style={{ fontSize: '24px', fontWeight: '800', color: NAVY, marginBottom: '12px', letterSpacing: '-0.5px' }}>{club.name}</h2>
              <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.6, flex: 1, marginBottom: '32px' }}>{club.desc}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f0f0f0', paddingTop: '20px' }}>
                <span style={{ fontSize: '13px', fontWeight: '700', color: club.color, textTransform: 'uppercase', letterSpacing: '1px' }}>View Details</span>
                <span className="arrow" style={{ fontSize: '20px', color: '#ccc', transition: 'all 0.3s ease', fontWeight: 'bold' }}>→</span>
              </div>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
}