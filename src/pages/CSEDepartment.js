import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ── BRANDING IMPORTS ──
import muLogo from '../assets/MU_Logo.jpg';
import muBanner from '../assets/mu_banner.jpg'; 

// ── FACULTY IMAGE IMPORTS ──
// ── FACULTY IMAGE IMPORTS ──
import nazrulImg from '../assets/nazrul_haq.png'; 
import mukammelImg from '../assets/mukammel.jpg';
import headImage from '../assets/dept_head.png';
import aishaImg from '../assets/aisha.jpg';
import bushraImg from '../assets/bushra.jpg';
import farhanaImg from '../assets/farhana.jpg';
import ishrarImg from '../assets/ishrar.jpg';
import limonImg from '../assets/limon.jpg';
import mayamiImg from '../assets/mayami.jpg';
import pulokImg from '../assets/pulok.jpg';
import raisaImg from '../assets/raisa.jpg';
import remonImg from '../assets/remon.jpg';
import rinaImg from '../assets/rina.jpg';
import shakibImg from '../assets/shakib.jpg';
import wadiaImg from '../assets/wadia.jpg';
import iftekharImg from '../assets/iftekhar.jpg';

const NAVY = '#1e2a6e';
const RED  = '#e31e24';
const GREY = '#6b7280';

// ✨ REAL FACULTY DATA
const FACULTY_DATA = [
  // User Requested: First Row

{ name: 'Md. Mahfujul Hasan', title: 'Associate Professor & Head', img: headImage },
  { name: 'Prof. Dr. Md. Nazrul Haque Chowdhury', title: 'Dean, School of Science & Technology', img: nazrulImg },
  { name: 'Choudhury M. Mukammel Wahid', title: 'Professor', img: mukammelImg },



  { name: 'Abdul Wadud Shakib', title: 'Lecturer', img: shakibImg },
  { name: 'Raisa Fairooz', title: 'Lecturer', img: raisaImg },
  { name: 'Aisha Haider Chowdhury', title: 'Lecturer', img: aishaImg },

  // Leadership & Professors
  

  // Lecturers
  { name: 'Md. Shamihul Islam Khan Limon', title: 'Lecturer', img: limonImg },
  { name: 'Bushra Azmat', title: 'Lecturer', img: bushraImg },
  { name: 'Farhana Akter', title: 'Lecturer', img: farhanaImg },
  { name: 'Ishrar Nazah', title: 'Lecturer', img: ishrarImg },
  { name: 'Mayami Chakrabarty', title: 'Lecturer', img: mayamiImg },
  { name: 'Rishad Pulok', title: 'Lecturer', img: pulokImg },
  { name: 'Nasif Ishtiak Remon', title: 'Lecturer', img: remonImg },
  { name: 'Rina Paul', title: 'Lecturer', img: rinaImg },
  { name: 'Wadia Chowdhury', title: 'Lecturer', img: wadiaImg },

  // Special Status
  { name: 'Iftekhar', title: 'Lecturer', img: iftekharImg, status: 'leave' }
];

export default function CSEDepartment() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", color: NAVY, background: '#fff', minHeight: '100vh' }}>
      
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

      {/* ── DEPARTMENT HERO BANNER ── */}
      <div style={{
        position: 'relative', height: '400px',
        backgroundImage: `url(${muBanner})`, 
        backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,18,48,0.9), rgba(10,18,48,0.6))' }} />
        
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: '#fff', padding: '0 20px' }}>
          <p style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', color: '#4ade80' }}>
            School of Science & Technology
          </p>
          <h1 style={{ margin: '0 0 16px', fontSize: '56px', fontWeight: '900', letterSpacing: '-1px', fontFamily: 'Segoe UI, sans-serif' }}>
            Computer Science <br/>& Engineering
          </h1>
        </div>
      </div>

      {/* ── DEPARTMENT SUB-NAV ── */}
      <div style={{ background: NAVY, borderBottom: `4px solid ${RED}`, position: 'sticky', top: '68px', zIndex: 99 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '32px', padding: '0 40px' }}>
          {['Overview', 'Faculty', 'BS in CSE', 'Research', 'Laboratories', 'Alumni'].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              style={{
                background: 'none', border: 'none', 
                color: activeTab === tab ? '#fff' : 'rgba(255,255,255,0.7)',
                padding: '16px 0', fontSize: '14px', 
                fontWeight: activeTab === tab ? '700' : '500',
                borderBottom: activeTab === tab ? `3px solid ${RED}` : '3px solid transparent',
                cursor: 'pointer', transition: 'all 0.2s'
            }}
            onMouseOver={e => e.target.style.color = '#fff'}
            onMouseOut={e => { if(activeTab !== tab) e.target.style.color = 'rgba(255,255,255,0.7)'; }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT GRID ── */}
      <div style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 40px', display: 'grid', gridTemplateColumns: '2.5fr 1fr', gap: '80px' }}>
        
        <div>
          {/* 🔘 TAB: OVERVIEW */}
          {activeTab === 'Overview' && (
            <div>
              <div style={{ marginBottom: '48px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: '800', color: NAVY, marginBottom: '24px', borderBottom: '1px solid #eee', paddingBottom: '12px' }}>
                  Message from the Head
                </h2>
                
                <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
                  <img 
                    src={headImage} 
                    alt="Head of Department" 
                    style={{ width: '220px', height: '260px', objectFit: 'cover', borderRadius: '12px', flexShrink: 0, boxShadow: '0 12px 32px rgba(0,0,0,0.1)' }} 
                  />
                  <div>
                    <p style={{ margin: '0 0 16px', fontSize: '16px', color: '#444', lineHeight: 1.8 }}>
                      Welcome to the Department of Computer Science and Engineering (CSE) at Metropolitan University. In an era defined by rapid technological evolution, our mission is to cultivate the next generation of innovators, software engineers, and critical thinkers. 
                    </p>
                    <p style={{ margin: '0 0 24px', fontSize: '16px', color: '#444', lineHeight: 1.8 }}>
                      Our department is proud to host state-of-the-art facilities and a dynamic faculty dedicated to active research in emerging fields such as Artificial Intelligence, Machine Learning, and complex systems architecture. We believe in learning by doing, ensuring our students are not just consumers of technology, but its creators.
                    </p>
                    <div>
                      <p style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: '800', color: NAVY }}>
                        Md. Mahfujul Hasan
                      </p>
                      <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: RED }}>
                        Head of the Department, CSE
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* About & Accreditation */}
              <div style={{ marginBottom: '48px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '800', color: NAVY, marginBottom: '20px' }}>
                  Excellence in Engineering
                </h2>
                <p style={{ fontSize: '16px', color: '#444', lineHeight: 1.8, marginBottom: '16px' }}>
                  The BS in CSE program is designed to provide students with a strong foundation in computer science principles alongside practical software engineering skills. The curriculum is continuously updated to meet global industry standards.
                </p>
                <div style={{ background: '#f0f3ff', borderLeft: `4px solid ${NAVY}`, padding: '20px', borderRadius: '0 8px 8px 0' }}>
                  <h4 style={{ margin: '0 0 8px', fontSize: '16px', color: NAVY }}>IEB/BAETE Accredited</h4>
                  <p style={{ margin: 0, fontSize: '14px', color: '#555', lineHeight: 1.6 }}>
                    Our CSE program is proudly accredited by the Board of Accreditation for Engineering and Technical Education (BAETE) under the Institution of Engineers, Bangladesh (IEB), ensuring our graduates are recognized globally under the Washington Accord framework.
                  </p>
                </div>
              </div>

              {/* Facilities */}
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: '800', color: NAVY, marginBottom: '20px' }}>
                  Research & Laboratories
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  {['Advanced Programming Lab', 'AI & Machine Learning Lab', 'Networking & Cyber Security Lab', 'Hardware & Architecture Lab'].map(lab => (
                    <div key={lab} style={{ padding: '20px', border: '1px solid #eee', borderRadius: '8px', background: '#fafbfc' }}>
                      <span style={{ fontSize: '20px', display: 'block', marginBottom: '12px' }}>💻</span>
                      <h4 style={{ margin: 0, fontSize: '15px', color: NAVY }}>{lab}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 🔘 TAB: FACULTY */}
          {activeTab === 'Faculty' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                <div style={{ background: RED, borderRadius: '8px', padding: '8px 12px' }}>
                  <span style={{ color: '#fff', fontSize: '16px' }}>📄</span>
                </div>
                <h2 style={{ margin: 0, fontSize: '28px', fontWeight: '800', color: NAVY, letterSpacing: '-0.5px' }}>
                  Department of Computer Science & Engineering
                </h2>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '24px' }}>
                {FACULTY_DATA.map((faculty, i) => (
                  <div key={i} style={{
                    background: '#fff', border: '1px solid #eaeaea', borderRadius: '16px', padding: '24px 16px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.02)', transition: 'all 0.3s ease', cursor: 'pointer',
                    position: 'relative',
                    opacity: faculty.status === 'leave' ? 0.65 : 1 // ✨ Fades the card if on leave
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.borderColor = RED;
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(227, 30, 36, 0.1)';
                    e.currentTarget.querySelector('h3').style.color = RED;
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.borderColor = '#eaeaea';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.02)';
                    e.currentTarget.querySelector('h3').style.color = NAVY;
                  }}
                  >
                    {/* ✨ Study Leave Badge */}
                    {faculty.status === 'leave' && (
                      <div style={{ position: 'absolute', top: '12px', right: '12px', background: '#f59e0b', color: '#fff', fontSize: '10px', fontWeight: '800', padding: '4px 8px', borderRadius: '12px', letterSpacing: '0.5px', zIndex: 2 }}>
                        STUDY LEAVE (ABROAD)
                      </div>
                    )}

                    <div style={{ background: '#f8f9fa', borderRadius: '20px', padding: '12px', marginBottom: '20px', width: '140px', height: '140px' }}>
                      <img src={faculty.img} alt={faculty.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
                    </div>
                    <h3 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: '800', color: NAVY, transition: 'color 0.2s', lineHeight: 1.3 }}>
                      {faculty.name}
                    </h3>
                    <div style={{ width: '24px', height: '2px', background: RED, margin: '0 auto 12px', borderRadius: '2px' }} />
                    <p style={{ margin: 0, fontSize: '13px', color: GREY, lineHeight: 1.5, fontWeight: '500' }}>
                      {faculty.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: Sidebar */}
        <div>
          {/* Quick Links */}
          <div style={{ background: '#f7f8fc', padding: '24px', borderRadius: '12px', marginBottom: '32px', border: '1px solid #eee' }}>
            <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: '800', color: NAVY, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Important Links
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Curriculum & Syllabus', 'Faculty Directory', 'Class Routines', 'CSE Alumni Association', 'Apply Online'].map(link => (
                <li key={link}>
                  <a href="#" style={{ color: RED, textDecoration: 'none', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '10px' }}>▶</span> {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Department Notices */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: '800', color: NAVY, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '2px solid #eee', paddingBottom: '8px' }}>
              Department Notices
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { date: '12 Mar', title: 'Tech Talk: Trust Decay in Modern AI Systems' },
                { date: '05 Mar', title: 'CSE Fest 2026 - Call for Volunteers' },
                { date: '28 Feb', title: 'Workshop on Advanced React & Node.js' },
              ].map((notice, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ background: NAVY, color: '#fff', padding: '6px', borderRadius: '6px', textAlign: 'center', minWidth: '45px', lineHeight: 1.1 }}>
                    <span style={{ display: 'block', fontSize: '16px', fontWeight: '800' }}>{notice.date.split(' ')[0]}</span>
                    <span style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase' }}>{notice.date.split(' ')[1]}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '14px', color: '#444', fontWeight: '500', lineHeight: 1.4, cursor: 'pointer' }} onMouseOver={e => e.target.style.color = RED} onMouseOut={e => e.target.style.color = '#444'}>
                    {notice.title}
                  </p>
                </div>
              ))}
            </div>
            <button style={{ marginTop: '16px', background: 'transparent', border: 'none', color: RED, fontWeight: '700', fontSize: '13px', cursor: 'pointer', padding: 0 }}>
              View All Notices →
            </button>
          </div>

          {/* Contact */}
          <div style={{ background: NAVY, color: '#fff', padding: '24px', borderRadius: '12px' }}>
            <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: '700' }}>Contact the Department</h3>
            <p style={{ margin: '0 0 8px', fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>📍 Room 402, Academic Building, Bateshwar Campus</p>
            <p style={{ margin: '0 0 8px', fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>📞 +880-1234-567890</p>
            <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>✉️ head_cse@metrouni.edu.bd</p>
          </div>
        </div>

      </div>

      {/* ═══════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════ */}
      <footer style={{ background: '#0a1230', padding: '72px 60px 40px', borderTop: `4px solid ${RED}`, marginTop: '40px' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr 1fr 1fr', gap: '60px', marginBottom: '60px' }}>
            {/* Brand */}
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
            {/* Link columns */}
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