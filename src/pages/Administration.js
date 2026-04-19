import React from 'react';
import { useNavigate } from 'react-router-dom';

// ── BRANDING IMPORTS ──
import muLogo from '../assets/MU_Logo.jpg';
import muBanner from '../assets/mu_banner.jpg'; 

// ── ADMIN IMAGE IMPORTS ──
// ✨ Save their pictures in your assets folder with these names!
import registrarImg from '../assets/registrar.png';
import controllerImg from '../assets/controller.png';
import proctorImg from '../assets/pr.jpg';
import financeImg from '../assets/finance.png';
import itImg from '../assets/it.jpeg';
import prImg from '../assets/pr.jpg';

const NAVY = '#1e2a6e';
const RED  = '#e31e24';
const GREY = '#6b7280';

// ── DATA STRUCTURE ──
const ADMIN_OFFICES = [
  { 
    office: 'Office of the Registrar',
    headName: 'Mr. Tariqul Islam', 
    headTitle: 'Registrar', 
    description: 'Manages academic records, student enrollment, university policies, and official documentation.',
    email: 'registrar@metrouni.edu.bd',
    img: registrarImg 
  },
  { 
    office: 'Controller of Examinations',
    headName: 'Mr. Khandakar Moksud Ahmed', 
    headTitle: 'Controller of Examinations', 
    description: 'Oversees the scheduling of all academic examinations, grading systems, and the official publication of results.',
    email: 'controller@metrouni.edu.bd',
    img: controllerImg 
  },
  { 
    office: 'Office of the Proctor',
    headName: 'Professor Dr. Abbas Uddin', 
    headTitle: 'Proctor', 
    description: 'Ensures campus security, enforces the student code of conduct, and maintains a safe academic environment.',
    email: 'proctor@metrouni.edu.bd',
    img: proctorImg 
  },
  { 
    office: 'Finance & Accounts',
    headName: 'Mr. Enamul Haque', 
    headTitle: 'Director of Finance', 
    description: 'Handles student tuition fees, scholarships, financial aid, and overall university budgeting.',
    email: 'finance@metrouni.edu.bd',
    img: financeImg 
  },
  { 
    office: 'IT & Innovation Division',
    headName: 'Mr. Syed Rezaul Karim', 
    headTitle: 'Head of IT', 
    description: 'Manages the university digital infrastructure, campus Wi-Fi, and the centralized Student Learning Portal.',
    email: 'it_support@metrouni.edu.bd',
    img: itImg 
  },
  { 
    office: 'Public Relations & Info',
    headName: 'Mr. Lukman Ahmed', 
    headTitle: 'Director of PR', 
    description: 'Coordinates official university communications, media relations, event coverage, and press releases.',
    email: 'pr@metrouni.edu.bd',
    img: prImg 
  }
];

export default function Administration() {
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
            Campus Operations
          </p>
          <h1 style={{ margin: 0, fontSize: '48px', fontWeight: '900', letterSpacing: '-1px' }}>
            Administration
          </h1>
        </div>
      </div>

      {/* ── MAIN CONTENT GRID ── */}
      <div style={{ maxWidth: '1200px', margin: '80px auto', padding: '0 40px' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px' }}>
          {ADMIN_OFFICES.map((admin, i) => (
            <div key={i} style={{
              background: '#fff', border: '1px solid #eaeaea', borderRadius: '16px', padding: '32px',
              display: 'flex', flexDirection: 'column',
              boxShadow: '0 4px 12px rgba(30, 42, 110, 0.03)', transition: 'all 0.3s ease', cursor: 'pointer'
            }}
            onMouseOver={e => {
              e.currentTarget.style.borderColor = RED;
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(227, 30, 36, 0.06)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.borderColor = '#eaeaea';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(30, 42, 110, 0.03)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              {/* Top Banner with Office Name */}
              <div style={{ borderBottom: '2px solid #f0f0f0', paddingBottom: '16px', marginBottom: '24px' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: NAVY, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {admin.office}
                </h3>
              </div>
              
              {/* Profile Section */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#f0f3ff', flexShrink: 0, border: `2px solid #fff`, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                  {/* Replace generic user icon with actual image when available */}
                  <img src={admin.img} alt={admin.headName} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<span style="font-size: 32px; display:flex; align-items:center; justify-content:center; height:100%; color:#1e2a6e;">👤</span>'; }}/>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: '800', color: NAVY }}>{admin.headName}</h4>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: RED }}>{admin.headTitle}</p>
                </div>
              </div>

              {/* Description */}
              <p style={{ margin: '0 0 24px', fontSize: '14px', color: GREY, lineHeight: 1.6, flex: 1 }}>
                {admin.description}
              </p>

              {/* Contact Block */}
              <div style={{ background: '#f8f9fa', padding: '12px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '16px' }}>✉️</span>
                <a href={`mailto:${admin.email}`} style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: NAVY, textDecoration: 'none' }}>
                  {admin.email}
                </a>
              </div>
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