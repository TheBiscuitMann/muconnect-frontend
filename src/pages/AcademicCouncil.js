import React from 'react';
import { useNavigate } from 'react-router-dom';

// ── BRANDING IMPORTS ──
import muLogo from '../assets/MU_Logo.jpg';
import muBanner from '../assets/mu_banner.jpg'; 

// ── COUNCIL IMAGE IMPORTS ──
// Change .jpg to .png if needed based on your file explorer!
import vcImg from '../assets/vc.jpeg';
import provcImg from '../assets/provc.jpg';
import deanImg from '../assets/dean.png';

const NAVY = '#1e2a6e';
const RED  = '#e31e24';
const GREY = '#6b7280';

// ── DATA STRUCTURE ──
const COUNCIL_MEMBERS = [
  { 
    name: 'Professor Dr. Mohammad Jahirul Hoque', 
    title: 'Vice Chancellor, Metropolitan University', 
    role: 'Chairman',
    img: vcImg 
  },
  { 
    name: 'Professor Mohammad Ishrat Ibne Ismail', 
    title: 'Pro-Vice Chancellor', 
    role: 'Member',
    img: provcImg 
  },
  { 
    name: 'Professor Md. Nazrul Haque Chowdhury PhD', 
    title: 'Dean, School of Science & Technology', 
    role: 'Member, Dean Category',
    img: deanImg 
  }
];

export default function AcademicCouncil() {
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
            Governance
          </p>
          <h1 style={{ margin: 0, fontSize: '48px', fontWeight: '900', letterSpacing: '-1px' }}>
            Academic Council
          </h1>
        </div>
      </div>

      {/* ── MAIN CONTENT GRID ── */}
      <div style={{ maxWidth: '1200px', margin: '80px auto', padding: '0 40px' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          {COUNCIL_MEMBERS.map((member, i) => (
            <div key={i} style={{
              background: '#fff', border: '1px solid #eaeaea', borderRadius: '20px', padding: '40px 32px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
              boxShadow: '0 8px 24px rgba(30, 42, 110, 0.04)', transition: 'all 0.3s ease', cursor: 'pointer'
            }}
            onMouseOver={e => {
              e.currentTarget.style.borderColor = RED;
              e.currentTarget.style.boxShadow = '0 16px 32px rgba(227, 30, 36, 0.08)';
              e.currentTarget.style.transform = 'translateY(-6px)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.borderColor = '#eaeaea';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(30, 42, 110, 0.04)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              {/* Member Image with Red Accent */}
              <div style={{ 
                background: '#f8f9fa', borderRadius: '24px', padding: '8px', 
                marginBottom: '24px', width: '180px', height: '180px',
                border: i === 0 ? `2px solid ${RED}` : '2px solid transparent' // Special border for Chairman
              }}>
                <img src={member.img} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
              </div>
              
              {/* Name */}
              <h3 style={{ margin: '0 0 12px', fontSize: '20px', fontWeight: '800', color: NAVY, lineHeight: 1.3 }}>
                {member.name}
              </h3>
              
              {/* Red Underline (Matches your screenshot) */}
              <div style={{ width: '40px', height: '3px', background: RED, margin: '0 auto 16px', borderRadius: '2px' }} />
              
              {/* Title & Role */}
              <p style={{ margin: '0 0 8px', fontSize: '15px', color: GREY, fontWeight: '500', lineHeight: 1.5 }}>
                {member.title}
              </p>
              <p style={{ margin: 0, fontSize: '15px', color: NAVY, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {member.role}
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