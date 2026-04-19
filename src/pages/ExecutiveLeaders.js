import React from 'react';
import { useNavigate } from 'react-router-dom';

// ── BRANDING IMPORTS ──
import muLogo from '../assets/MU_Logo.jpg';
import muBanner from '../assets/mu_banner.jpg'; 

// ── LEADER IMAGE IMPORTS ──
import vcImg from '../assets/vc.jpeg';
import provcImg from '../assets/provc.jpg';
import treasurerImg from '../assets/treasurer.png';

const NAVY = '#1e2a6e';
const RED  = '#e31e24';
const GREY = '#6b7280';

// ── DATA STRUCTURE ──
const LEADERS = [
  { 
    name: 'Professor Dr. Mohammad Jahirul Hoque', 
    title: 'Vice Chancellor', 
    img: vcImg,
    description: 'Guiding Metropolitan University with a commitment to academic rigor, innovative research, and the cultivation of future global leaders.'
  },
  { 
    name: 'Professor Mohammad Ishrat Ibne Ismail', 
    title: 'Pro-Vice Chancellor', 
    img: provcImg,
    description: 'Ensuring the highest standards of educational delivery and driving the strategic academic expansion of our diverse faculties.'
  },
  { 
    name: 'Professor Md. Taher Billal Khalifa PhD', 
    title: 'Treasurer', 
    img: treasurerImg,
    description: 'Stewarding the university’s resources to build sustainable infrastructure and support continuous academic advancement.'
  }
];

export default function ExecutiveLeaders() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", color: NAVY, background: '#f8f9fa', minHeight: '100vh' }}>
      
      {/* ── MINIMAL NAVBAR ── */}
      <nav style={{
        height: '68px', padding: '0 60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid #f0f0f0', background: '#fff', position: 'sticky', top: 0, zIndex: 100
      }}>
        <div onClick={() => navigate('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <img src={muLogo} alt="MU" style={{ height: '46px', objectFit: 'contain' }} />
        </div>
        <button onClick={() => navigate('/')} style={{
          background: 'transparent', border: `1.5px solid ${NAVY}30`, color: NAVY,
          padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer'
        }}>
          ← Back to Home
        </button>
      </nav>

      {/* ── HERO BANNER ── */}
      <div style={{
        position: 'relative', height: '300px',
        backgroundImage: `url(${muBanner})`, 
        backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,18,48,0.9), rgba(10,18,48,0.7))' }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: '#fff', padding: '0 20px' }}>
          <p style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', color: RED }}>
            Leadership
          </p>
          <h1 style={{ margin: 0, fontSize: '48px', fontWeight: '900', letterSpacing: '-1px' }}>
            Executive Authority
          </h1>
        </div>
      </div>

      {/* ── MAIN CONTENT (Posh Wide Cards) ── */}
      <div style={{ maxWidth: '1000px', margin: '80px auto', padding: '0 40px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
        
        {LEADERS.map((leader, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: '20px', overflow: 'hidden',
            display: 'flex', alignItems: 'center',
            boxShadow: '0 12px 32px rgba(30, 42, 110, 0.05)',
            border: '1px solid #eaeaea', transition: 'transform 0.3s ease',
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'}
          onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {/* Left Side: Large Portrait */}
            <div style={{ width: '320px', height: '360px', flexShrink: 0, background: '#f0f0f0', position: 'relative' }}>
              {/* Subtle accent border inside the image area */}
              <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '6px', background: i === 0 ? RED : NAVY, zIndex: 2 }} />
              <img 
                src={leader.img} 
                alt={leader.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>

            {/* Right Side: Details & Typography */}
            <div style={{ padding: '56px 64px', flex: 1 }}>
              <p style={{ margin: '0 0 8px', fontSize: '14px', fontWeight: '800', color: i === 0 ? RED : GREY, textTransform: 'uppercase', letterSpacing: '2px' }}>
                {leader.title}
              </p>
              <h2 style={{ margin: '0 0 24px', fontSize: '36px', fontWeight: '900', color: NAVY, letterSpacing: '-1px', lineHeight: 1.1 }}>
                {leader.name}
              </h2>
              
              <div style={{ width: '40px', height: '3px', background: `${NAVY}20`, marginBottom: '24px' }} />
              
              <p style={{ margin: 0, fontSize: '17px', color: '#555', lineHeight: 1.8, fontStyle: 'italic' }}>
                "{leader.description}"
              </p>

              <button style={{
                marginTop: '32px', background: 'transparent', border: `1.5px solid ${NAVY}`, color: NAVY,
                padding: '10px 24px', borderRadius: '6px', fontSize: '13px', fontWeight: '700', cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={e => { e.target.style.background = NAVY; e.target.style.color = '#fff'; }}
              onMouseOut={e => { e.target.style.background = 'transparent'; e.target.style.color = NAVY; }}
              >
                View Full Profile →
              </button>
            </div>
          </div>
        ))}

      </div>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#0a1230', padding: '72px 60px 40px', borderTop: `4px solid ${RED}`, marginTop: '80px' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr 1fr 1fr', gap: '60px', marginBottom: '60px' }}>
            <div>
              <div style={{ background: '#fff', display: 'inline-block', padding: '8px 16px', borderRadius: '8px', marginBottom: '20px' }}>
                <img src={muLogo} alt="MU" style={{ height: '38px', objectFit: 'contain', display: 'block' }} />
              </div>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', lineHeight: 1.9, margin: '0 0 16px', maxWidth: '260px' }}>
                Education. Not Just a Degree.<br />
                Bateshwar, Sylhet, Bangladesh.
              </p>
              <a href="mailto:info@metrouni.edu.bd" style={{ color: RED, fontSize: '13px', fontWeight: '600', textDecoration: 'none' }}>
                info@metrouni.edu.bd
              </a>
            </div>
            {[
              { title: 'Academics',   links: ['Departments', 'Admission', 'Tuition & Fees', 'Academic Calendar', 'Research'] },
              { title: 'Campus',      links: ['Student Clubs', 'Sports', 'Events', 'Library', 'Career Services'] },
              { title: 'Connect',     links: ['Contact Us', 'Student Portal', 'Faculty Portal', 'Alumni Network', 'News'] },
            ].map(col => (
              <div key={col.title}>
                <p style={{ margin: '0 0 20px', fontWeight: '700', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>{col.title}</p>
                {col.links.map(link => (
                  <p key={link} style={{ margin: '0 0 10px', fontSize: '14px', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'color 0.2s' }}
                    onMouseOver={e => e.target.style.color = '#fff'} onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.5)'}
                  >{link}</p>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.2)' }}>© 2026 Metropolitan University, Sylhet. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[GREY, RED, NAVY].map((c, i) => (
                <div key={i} style={{ width: '28px', height: '4px', background: c, borderRadius: '2px', opacity: i === 1 ? 1 : 0.5 }} />
              ))}
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.2)' }}>Permanently Chartered · Government of Bangladesh</p>
          </div>
        </div>
      </footer>
    </div>
  );
}