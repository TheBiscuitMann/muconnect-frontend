import React from 'react';
import { useNavigate } from 'react-router-dom';

// ── BRANDING IMPORTS ──
import muLogo from '../assets/MU_Logo.jpg';
import muBanner from '../assets/mu_banner.jpg'; 

// ── TRUSTEE IMAGE IMPORTS ──
import toufiqueImg from '../assets/dr.toufique.png';
import tanwirImg from '../assets/mr.tanwir.png';
import muhitulImg from '../assets/muhitul.jpg';
import nazifaImg from '../assets/nazifa.png';
import shamimImg from '../assets/shamim.png';
import moktadirImg from '../assets/moktadir.jpeg'; // <-- Notice the .jpeg here!

// I couldn't see the bottom two in your screenshot, so if these still error, 
// just scroll down your list and change them to .jpg or .png accordingly!
import shihidurImg from '../assets/shihidur.png'; 
import zannatImg from '../assets/zannat.png';
const NAVY = '#1e2a6e';
const RED  = '#e31e24';
const GREY = '#6b7280';

// ── DATA STRUCTURES ──
const CHAIRMAN = {
  name: 'Dr. Toufique Rahman Chowdhury',
  title: 'Founder & Chairman, Board of Trustees',
  img: toufiqueImg
};

const TRUSTEES = [
  { name: 'Mr. Tanwir', title: 'Member, Board of Trustees', img: tanwirImg },
  { name: 'Muhitul', title: 'Member, Board of Trustees', img: muhitulImg },
  { name: 'Nazifa', title: 'Member, Board of Trustees', img: nazifaImg },
  { name: 'Shamim', title: 'Member, Board of Trustees', img: shamimImg },
  { name: 'Shihidur', title: 'Member, Board of Trustees', img: shihidurImg },
  { name: 'Zannat', title: 'Member, Board of Trustees', img: zannatImg },
  { name: 'Moktadir', title: 'Member, Board of Trustees', img: moktadirImg }
];

export default function BoardOfTrustees() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", color: NAVY, background: '#fcfcfd', minHeight: '100vh' }}>
      
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
            About MU
          </p>
          <h1 style={{ margin: 0, fontSize: '48px', fontWeight: '900', letterSpacing: '-1px' }}>
            Board of Trustees
          </h1>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ maxWidth: '1200px', margin: '80px auto', padding: '0 40px' }}>
        
        {/* 👑 CHAIRMAN SECTION (Top, Centered, Prominent) */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '80px' }}>
          <div style={{
            background: '#fff', padding: '40px', borderRadius: '24px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
            boxShadow: '0 20px 40px rgba(30, 42, 110, 0.06)', border: '1px solid #eee',
            maxWidth: '500px', width: '100%', position: 'relative', overflow: 'hidden'
          }}>
            {/* Top Red Accent */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: RED }} />
            
            <img 
              src={CHAIRMAN.img} 
              alt={CHAIRMAN.name} 
              style={{ width: '180px', height: '180px', objectFit: 'cover', borderRadius: '50%', marginBottom: '24px', border: `4px solid #fff`, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }} 
            />
            <h2 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: '900', color: NAVY, letterSpacing: '-0.5px' }}>
              {CHAIRMAN.name}
            </h2>
            <p style={{ margin: '0 0 20px', fontSize: '15px', fontWeight: '700', color: RED, textTransform: 'uppercase', letterSpacing: '1px' }}>
              {CHAIRMAN.title}
            </p>
            <p style={{ margin: 0, fontSize: '15px', color: GREY, lineHeight: 1.7 }}>
              Providing visionary leadership and strategic direction to elevate Metropolitan University into a globally recognized center for excellence in higher education.
            </p>
          </div>
        </div>

        {/* 👥 OTHER TRUSTEES GRID */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px', justifyContent: 'center' }}>
          <div style={{ width: '40px', height: '2px', background: `${NAVY}20` }} />
          <h3 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: NAVY, letterSpacing: '1px', textTransform: 'uppercase' }}>
            Honorable Members
          </h3>
          <div style={{ width: '40px', height: '2px', background: `${NAVY}20` }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '32px' }}>
          {TRUSTEES.map((trustee, i) => (
            <div key={i} style={{
              background: '#fff', border: '1px solid #eaeaea', borderRadius: '16px', padding: '32px 24px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.02)', transition: 'all 0.3s ease', cursor: 'pointer'
            }}
            onMouseOver={e => {
              e.currentTarget.style.borderColor = RED;
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(227, 30, 36, 0.08)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.borderColor = '#eaeaea';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.02)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <div style={{ background: '#f8f9fa', borderRadius: '50%', padding: '8px', marginBottom: '20px', width: '130px', height: '130px' }}>
                <img src={trustee.img} alt={trustee.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              </div>
              <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: '800', color: NAVY, lineHeight: 1.3 }}>
                {trustee.name}
              </h3>
              <div style={{ width: '24px', height: '2px', background: RED, margin: '0 auto 12px', borderRadius: '2px' }} />
              <p style={{ margin: 0, fontSize: '14px', color: GREY, fontWeight: '500' }}>
                {trustee.title}
              </p>
            </div>
          ))}
        </div>

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