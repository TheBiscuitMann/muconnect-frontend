import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import muLogo from '../assets/MU_Logo.jpg';
import realBanner from '../assets/mu_banner.jpg'; 

const NAVY = '#1e2a6e';
const RED  = '#e31e24';
const GREY = '#6b7280';

// ── Mega Menu Data Structures ─────────────────────────────────────
const ABOUT_MENU = [
  {
    title: 'ABOUT MU',
    links: ['Brief History', 'Vision, Mission & Strategy', 'Accreditation', 'International Recognition', 'Facts About MU']
  },
  {
    title: 'MU Trustees',
    links: ['Board of Trustees']
  },
  {
    title: 'Executive Leaders',
    links: ['VC, Pro-VC & Treasurer', 'Deans, Chairs & Directors', 'Administration']
  },
  {
    title: 'Authorities',
    links: ['Syndicate', 'Academic Council']
  }
];

const ACADEMIC_MENU = [
  {
    title: 'School of Science & Technology',
    links: ['Computer Science & Engineering (CSE)', 'Data Science', 'Software Engineering']
  },
  {
    title: 'School of Business & Economics',
    links: ['Business Administration (BBA)', 'Business Administration (BA)', 'Economics']
  },
  {
    title: 'School of Humanities',
    links: ['English']
  },
  {
    title: 'School of Law',
    links: ['Law']
  }
];

// ── Reusable section label ────────────────────────────────────────
function SectionLabel({ num, text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
      <span style={{ fontSize: '11px', fontWeight: '900', color: RED, letterSpacing: '4px', textTransform: 'uppercase' }}>
        {num}
      </span>
      <div style={{ width: '1px', height: '20px', background: '#ddd' }} />
      <span style={{ fontSize: '11px', fontWeight: '700', color: GREY, letterSpacing: '3px', textTransform: 'uppercase' }}>
        {text}
      </span>
    </div>
  );
}

export default function Home() {
  const navigate  = useNavigate();
  const [notices, setNotices]   = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState(null);
  const [hoveredMenu, setHoveredMenu] = useState(null); 
  
  // State to control the Cinematic Video Modal
  const [showVideo, setShowVideo] = useState(false);
  
  const heroRef = useRef(null);

  useEffect(() => {
    API.get('/notices/').then(r => setNotices(r.data.slice(0, 4))).catch(() => {});
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const NAV_LINKS = ['About', 'Academics', 'Admission', 'Research', 'Campus Life', 'Notices', 'Contact'];

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", color: NAVY, background: '#fff', overflowX: 'hidden' }}>

      {/* ═══════════════════════════════════════════════════════
          NAVBAR 
      ═══════════════════════════════════════════════════════ */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 999,
        height: '85px', padding: '0 60px', 
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? '#fff' : '#fff',
        borderBottom: `1px solid ${scrolled ? '#eee' : '#f0f0f0'}`,
        boxShadow: scrolled ? '0 4px 24px rgba(30,42,110,0.08)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        <div onClick={() => navigate('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0' }}>
          <img src={muLogo} alt="MU" style={{ height: '65px', objectFit: 'contain' }} /> 
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '100%' }}>
          {NAV_LINKS.map(l => (
            <div key={l} style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                 
              <button 
                onClick={() => { 
                  setActiveNav(l); 
                  if (l === 'Notices') {
                    navigate('/notices');
                    setHoveredMenu(null);
                  } else if (l === 'About' || l === 'Academics' || l === 'Admission') {
                    setHoveredMenu(hoveredMenu === l ? null : l);
                  } else {
                    setHoveredMenu(null);
                  }
                }}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '6px 14px', borderRadius: '6px',
                  fontSize: '14px', fontWeight: '600',
                  color: activeNav === l || hoveredMenu === l ? RED : NAVY,
                  letterSpacing: '0.2px',
                  position: 'relative', transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', gap: '4px'
                }}
              >
                {l}
                {(l === 'About' || l === 'Academics' || l === 'Admission') && (
                  <span style={{ fontSize: '10px', transform: hoveredMenu === l ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
                )}
                {activeNav === l && (
                  <span style={{ position: 'absolute', bottom: '-4px', left: '50%', transform: 'translateX(-50%)', width: '4px', height: '4px', borderRadius: '50%', background: RED }} />
                )}
              </button>

              {/* ── THE MEGA MENU DROPDOWN ── */}
              {(l === 'About' || l === 'Academics') && hoveredMenu === l && (
                <div style={{
                  position: 'absolute', top: '85px', left: 0, right: 0, 
                  background: NAVY, padding: '40px 60px',
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
                  display: 'flex', justifyContent: 'center', cursor: 'default',
                  animation: 'fadeIn 0.2s ease-out'
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', width: '100%', maxWidth: '1300px' }}>
                    
                    {(hoveredMenu === 'About' ? ABOUT_MENU : ACADEMIC_MENU).map(col => (
                      <div key={col.title}>
                        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '12px', marginBottom: '16px' }}>
                          <span style={{ color: '#fff', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{col.title}</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                          {col.links.map(link => (
                            <span key={link} 
                              onClick={() => { 
                                // Routing for About links
                                if(link === 'Brief History') navigate('/about/history');
                                if(link === 'Vision, Mission & Strategy') navigate('/about/vision-mission');
                                if(link === 'Accreditation') navigate('/about/accreditation');
                                if(link === 'International Recognition') navigate('/about/international-recognition');
                                if(link === 'Facts About MU') navigate('/about/facts');
                                if(link === 'Deans, Chairs & Directors') navigate('/about/deans');
                                if(link === 'Administration') navigate('/about/administration');
                                if(link === 'Board of Trustees') navigate('/about/trustees');
                                if(link === 'VC, Pro-VC & Treasurer') navigate('/about/leaders');
                                if(link === 'Academic Council') navigate('/about/academic-council');
                                
                                // Routing for Academic links
                                if(link === 'Computer Science & Engineering (CSE)') navigate('/academics/cse');
                                if(link === 'Data Science') navigate('/academics/data-science');
                                if(link === 'Software Engineering') navigate('/academics/software-engineering');
                                if(link === 'Business Administration (BBA)') navigate('/academics/bba');
                                if(link === 'Law') navigate('/academics/law');
                                if(link === 'English') navigate('/academics/english');
                                if(link === 'Economics') navigate('/academics/economics');
                                if(link === 'Business Administration (BA)') navigate('/academics/ba');

                                setHoveredMenu(null); 
                              }}
                              style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}
                              onMouseOver={e => { e.target.style.color = '#fff'; e.target.style.transform = 'translateX(4px)'; }}
                              onMouseOut={e => { e.target.style.color = 'rgba(255,255,255,0.65)'; e.target.style.transform = 'translateX(0)'; }}
                            >
                              <span style={{ color: RED, fontSize: '10px' }}>—</span> {link}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Portal button */}
        <button onClick={() => navigate('/login')} style={{
          padding: '10px 24px', borderRadius: '6px',
          fontSize: '14px', fontWeight: '700',
          background: NAVY, color: '#fff', border: 'none',
          cursor: 'pointer', letterSpacing: '0.3px',
          transition: 'all 0.25s',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}
          onMouseOver={e => e.currentTarget.style.background = RED}
          onMouseOut={e => e.currentTarget.style.background = NAVY}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
          myMU Portal 
        </button>
      </nav>

      {/* ═══════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════ */}
      <div ref={heroRef} style={{ 
        minHeight: 'calc(100vh - 85px)', 
        display: 'flex', 
        position: 'relative', 
        overflow: 'hidden',
        backgroundImage: `url(${realBanner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '80px 64px 80px 60px', position: 'relative', zIndex: 2,
          background: 'rgba(255, 255, 255, 0.94)', 
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            border: `1px solid ${RED}30`, background: '#fff8f8',
            padding: '6px 14px', borderRadius: '4px',
            marginBottom: '40px', alignSelf: 'flex-start',
          }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: RED }} />
            <span style={{ fontSize: '11px', fontWeight: '700', color: RED, letterSpacing: '2px', textTransform: 'uppercase' }}>
              Permanently Chartered University
            </span>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ margin: '0 0 16px', fontSize: '80px', fontWeight: '900', lineHeight: 0.95, letterSpacing: '-4px', color: NAVY }}>
              Edu
              <span style={{ color: RED }}>.</span>
            </h1>
            <h1 style={{ margin: '0 0 16px', fontSize: '80px', fontWeight: '900', lineHeight: 0.95, letterSpacing: '-4px', color: '#c8cde3' }}>
              Not Just
            </h1>
            <h1 style={{ margin: 0, fontSize: '80px', fontWeight: '900', lineHeight: 0.95, letterSpacing: '-4px', color: NAVY }}>
              a Degree
              <span style={{ color: RED }}>.</span>
            </h1>
          </div>

          <p style={{ margin: '0 0 48px', fontSize: '17px', color: GREY, lineHeight: 1.8, maxWidth: '440px' }}>
            Metropolitan University, Sylhet — where curiosity meets ambition,
            and students become global citizens since 2003.
          </p>

          {/* ✨ HERO BUTTONS (NOW FULLY FUNCTIONAL) */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button 
              onClick={() => {
                // Smooth scroll to the "Find Your Way" section
                const section = document.getElementById('find-your-way');
                if (section) section.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                padding: '14px 32px', borderRadius: '6px', fontSize: '14px',
                fontWeight: '700', cursor: 'pointer', border: 'none',
                background: RED, color: '#fff', letterSpacing: '0.3px',
                transition: 'all 0.2s', boxShadow: `0 8px 24px ${RED}40`,
              }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 12px 28px ${RED}50`; }}
              onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 24px ${RED}40`; }}
            >
              Explore Programs →
            </button>
            
            <button 
              onClick={() => setShowVideo(true)} // Opens the cinematic overlay
              style={{
                padding: '14px 28px', borderRadius: '6px', fontSize: '14px',
                fontWeight: '600', cursor: 'pointer',
                background: 'transparent', color: NAVY,
                border: `1.5px solid ${NAVY}30`, transition: 'all 0.2s',
              }}
              onMouseOver={e => { e.currentTarget.style.borderColor = NAVY; e.currentTarget.style.background = '#f5f7ff'; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = `${NAVY}30`; e.currentTarget.style.background = 'transparent'; }}
            >
              Watch Overview
            </button>
          </div>

          <div style={{ marginTop: '64px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '3px', background: RED, borderRadius: '2px' }} />
            <div style={{ width: '20px', height: '3px', background: `${NAVY}30`, borderRadius: '2px' }} />
            <div style={{ width: '10px', height: '3px', background: `${GREY}30`, borderRadius: '2px' }} />
            <span style={{ fontSize: '12px', color: GREY, letterSpacing: '1px' }}>EST. 2003 · SYLHET, BANGLADESH</span>
          </div>
        </div>

        <div style={{
          width: '420px', flexShrink: 0,
          background: 'rgba(30, 42, 110, 0.92)', 
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px 48px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.04,
            backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: RED }} />

          <p style={{ margin: '0 0 32px', fontSize: '11px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
            By the numbers
          </p>

          {[
            { val: '6,000+',  label: 'Active Students',     sub: 'Across all departments' },
            { val: '250+',    label: 'Expert Faculty',         sub: 'PhD holders & practitioners' },
            { val: '22+',     label: 'Years of Excellence',    sub: 'Established 2003' },
            { val: '10,000+', label: 'Global Alumni',          sub: 'In 30+ countries' },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '20px 0',
              borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
            }}>
              <div>
                <p style={{ margin: '0 0 4px', fontSize: '36px', fontWeight: '900', color: '#fff', letterSpacing: '-2px', lineHeight: 1 }}>{s.val}</p>
                <p style={{ margin: '0 0 2px', fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.8)' }}>{s.label}</p>
                <p style={{ margin: 0, fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{s.sub}</p>
              </div>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: `1px solid ${RED}60`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: RED }} />
              </div>
            </div>
          ))}

          <div style={{
            marginTop: '28px', padding: '14px 18px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px', borderLeft: `3px solid ${RED}`,
          }}>
            <p style={{ margin: 0, fontSize: '12px', fontWeight: '600', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
              🏆 First permanently chartered private university in Sylhet — Accredited by UGC Bangladesh
            </p>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          MARQUEE STRIP
      ═══════════════════════════════════════════════════════ */}
      <div style={{ background: RED, padding: '14px 0', overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <div style={{ display: 'inline-block', animation: 'marquee 30s linear infinite' }}>
          {['Permanently Chartered 2024', 'British Council Partner', 'Cambridge English Partner', 'UGC Approved', '6,000+ Students', '10,000+ Alumni', 'Bateshwar Campus, Sylhet'].map((t, i) => (
            <span key={i} style={{ marginRight: '60px', fontSize: '12px', fontWeight: '700', color: '#fff', letterSpacing: '2px', textTransform: 'uppercase' }}>
              ◆ {t}
            </span>
          ))}
          {['Permanently Chartered 2024', 'British Council Partner', 'Cambridge English Partner', 'UGC Approved', '6,000+ Students', '10,000+ Alumni', 'Bateshwar Campus, Sylhet'].map((t, i) => (
            <span key={'b'+i} style={{ marginRight: '60px', fontSize: '12px', fontWeight: '700', color: '#fff', letterSpacing: '2px', textTransform: 'uppercase' }}>
              ◆ {t}
            </span>
          ))}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </div>

      <div style={{ padding: '120px 60px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px', maxWidth: '1300px', margin: '0 auto', alignItems: 'center' }}>
        <div>
          <SectionLabel num="01" text="Our Mission" />
          <h2 style={{ margin: '0 0 24px', fontSize: '52px', fontWeight: '900', lineHeight: 1.05, letterSpacing: '-2px', color: NAVY }}>
            Shaping the leaders of tomorrow — today.
          </h2>
          <p style={{ margin: '0 0 18px', fontSize: '17px', color: '#555', lineHeight: 1.85 }}>
            Since 2003, we've been building something rare: a university that combines academic rigor
            with the spirit of real-world ambition. Every program, every lab, every mentorship
            is designed with one question in mind — what kind of world will our students build?
          </p>
          <p style={{ margin: '0 0 40px', fontSize: '17px', color: '#555', lineHeight: 1.85 }}>
            Our graduates work at Microsoft, Google, and Amazon. They lead nonprofits, research labs,
            courtrooms, and startups. They're not just employed — they're impactful.
          </p>
          <button style={{
            padding: '13px 30px', borderRadius: '6px', fontSize: '13px',
            fontWeight: '700', cursor: 'pointer',
            border: `2px solid ${NAVY}`, background: 'transparent', color: NAVY,
            letterSpacing: '0.5px', transition: 'all 0.25s',
          }}
            onMouseOver={e => { e.currentTarget.style.background = NAVY; e.currentTarget.style.color = '#fff'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = NAVY; }}
          >Our Full Story →</button>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: '16px', top: 0, bottom: 0, width: '1px', background: '#eee' }} />
          {[
            { year: '2003', event: 'University founded by Dr. Toufique Rahman Chowdhury in Sylhet', color: NAVY },
            { year: '2010', event: 'First batch of CSE graduates enters the tech industry', color: RED },
            { year: '2018', event: 'Permanent campus established at Bateshwar, Sylhet', color: NAVY },
            { year: '2024', event: 'Permanently chartered by the Government of Bangladesh', color: RED },
            { year: '2026', event: 'New Data Science program launched with Cambridge partnership', color: NAVY },
          ].map((m, i) => (
            <div key={i} style={{ display: 'flex', gap: '28px', marginBottom: i < 4 ? '32px' : 0, alignItems: 'flex-start' }}>
              <div style={{ width: '32px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '3px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: m.color, flexShrink: 0, border: '2px solid #fff', boxShadow: `0 0 0 2px ${m.color}40` }} />
              </div>
              <div>
                <p style={{ margin: '0 0 4px', fontSize: '11px', fontWeight: '800', color: m.color, letterSpacing: '2px' }}>{m.year}</p>
                <p style={{ margin: 0, fontSize: '14px', color: '#444', lineHeight: 1.6 }}>{m.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          DEPARTMENTS (IMMERSIVE "BRAC" STYLE)
      ═══════════════════════════════════════════════════════ */}
      <div id="find-your-way" style={{ position: 'relative', overflow: 'hidden', padding: '120px 60px', color: '#fff', borderTop: '1px solid #eee' }}>
        
        <div style={{
          position: 'absolute', top: '-10%', left: '-10%', width: '120%', height: '120%',
          backgroundImage: `url(${realBanner})`, 
          backgroundSize: 'cover', backgroundPosition: 'center',
          animation: 'slowZoom 25s linear infinite alternate', zIndex: 0
        }} />
        
        <div style={{ 
          position: 'absolute', inset: 0, 
          background: 'linear-gradient(135deg, rgba(30, 42, 110, 0.95) 0%, rgba(30, 42, 110, 0.75) 100%)', 
          zIndex: 1 
        }} />
        <div style={{ 
          position: 'absolute', inset: 0, 
          backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '25% 100%', 
          zIndex: 1 
        }} />

        <style>{`
          @keyframes slowZoom {
            0% { transform: scale(1); }
            100% { transform: scale(1.1); }
          }
          .dept-link {
            font-size: 24px; font-weight: 700; color: #fff; cursor: pointer;
            transition: all 0.3s ease; display: block; position: relative;
            padding-left: 0;
          }
          .dept-link:hover {
            color: #4ade80; 
            transform: translateX(10px);
          }
          .dept-link::before {
            content: '→'; position: absolute; left: -25px; opacity: 0;
            transition: all 0.3s ease; color: #4ade80;
          }
          .dept-link:hover::before {
            left: -30px; opacity: 1;
          }
          .pill-btn {
            padding: 14px 28px; border-radius: 40px; border: 1px solid rgba(255,255,255,0.4);
            background: transparent; color: #fff; font-size: 15px; font-weight: 700;
            cursor: pointer; transition: all 0.3s ease; width: fit-content;
          }
          .pill-btn:hover {
            background: #fff; color: #1e2a6e; border-color: #fff;
            transform: translateY(-2px);
          }
        `}</style>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '100px', alignItems: 'center' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 style={{ margin: 0, fontSize: '56px', fontWeight: '900', letterSpacing: '-2px', lineHeight: 1.1 }}>
              Find Your Way
            </h2>
            <p style={{ margin: '0 0 24px', fontSize: '17px', lineHeight: 1.7, color: 'rgba(255,255,255,0.8)' }}>
              Explore the countless paths and opportunities that Metropolitan University has to offer to shape your future.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <button className="pill-btn" onClick={() => navigate('/academics/cse')}>Undergraduate Programs</button>
              <button className="pill-btn" onClick={() => navigate('/academics/cse/research')}>Graduate Programs</button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '80px 40px' }}>
            {[
              { name: 'Computer Science & Engineering', path: '/academics/cse' },
              { name: 'Software Engineering', path: '/academics/software-engineering' },
              { name: 'Data Science', path: '/academics/data-science' },
              { name: 'Business Administration (BBA)', path: '/academics/bba' },
              { name: 'English', path: '/academics/english' },
              { name: 'Law & Justice', path: '/academics/law' }
            ].map((dept, i) => (
              <div key={i} onClick={() => navigate(dept.path)} className="dept-link">
                {dept.name}
              </div>
            ))}
          </div>

        </div>
      </div>

      <div style={{ padding: '100px 60px', maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '52px' }}>
          <div>
            <SectionLabel num="03" text="Latest" />
            <h2 style={{ margin: 0, fontSize: '48px', fontWeight: '900', letterSpacing: '-2px', color: NAVY, lineHeight: 1.05 }}>
              Stay in the loop.
            </h2>
          </div>
          <button onClick={() => navigate('/notices')} style={{
            padding: '10px 22px', borderRadius: '6px', fontSize: '13px',
            fontWeight: '600', cursor: 'pointer', border: 'none',
            background: NAVY, color: '#fff', transition: 'all 0.25s',
          }}
            onMouseOver={e => e.currentTarget.style.background = RED}
            onMouseOut={e => e.currentTarget.style.background = NAVY}
          >All Notices →</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden' }}>
          {(notices.length > 0 ? notices : [
            { title: 'Supplementary Exam Routine — Autumn Term 2025', category: 'exam',     published_at: '2026-03-15' },
            { title: 'Ramadan Class Routine — Spring Semester 2026',  category: 'academic', published_at: '2026-03-10' },
            { title: 'CSE Fest 2026 — Registration Now Open',         category: 'event',    published_at: '2026-03-05' },
            { title: 'New Data Science Program — Applications Open',  category: 'academic', published_at: '2026-03-01' },
          ]).slice(0, 4).map((n, i) => {
            const catStyle = {
              exam:     { color: RED,  bg: '#fff0f0', label: 'Exam' },
              academic: { color: NAVY,  bg: '#f0f3ff', label: 'Academic' },
              event:    { color: '#16a34a', bg: '#f0fdf4', label: 'Event' },
              general:  { color: GREY,  bg: '#f5f5f5', label: 'General' },
            }[n.category] || { color: GREY, bg: '#f5f5f5', label: 'General' };

            return (
              <div key={i} style={{
                padding: '28px 32px',
                borderBottom: i < 2 ? '1px solid #eee' : 'none',
                borderRight: i % 2 === 0 ? '1px solid #eee' : 'none',
                background: '#fff', cursor: 'pointer', transition: 'background 0.2s',
              }}
                onMouseOver={e => e.currentTarget.style.background = '#fafbff'}
                onMouseOut={e => e.currentTarget.style.background = '#fff'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px', color: catStyle.color, background: catStyle.bg, padding: '3px 10px', borderRadius: '3px' }}>
                    {catStyle.label}
                  </span>
                  <span style={{ fontSize: '12px', color: '#ccc' }}>
                    {n.published_at ? new Date(n.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : ''}
                  </span>
                </div>
                <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: '700', color: NAVY, lineHeight: 1.5 }}>{n.title}</h3>
                <span style={{ fontSize: '13px', color: RED, fontWeight: '600' }}>Read more →</span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ borderTop: '1px solid #eee', borderBottom: '1px solid #eee', padding: '40px 60px', background: '#fafbfc' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '48px' }}>
          <p style={{ margin: 0, fontSize: '11px', fontWeight: '700', color: GREY, letterSpacing: '2px', textTransform: 'uppercase', flexShrink: 0 }}>
            Alumni at
          </p>
          <div style={{ width: '1px', height: '24px', background: '#eee', flexShrink: 0 }} />
          {['Microsoft', 'Google', 'Amazon', 'Agoda', 'Genesys', 'Incepta'].map(c => (
            <span key={c} style={{ fontSize: '16px', fontWeight: '800', color: `${NAVY}50`, letterSpacing: '-0.5px', flexShrink: 0, transition: 'color 0.2s', cursor: 'default' }}
              onMouseOver={e => e.target.style.color = NAVY}
              onMouseOut={e => e.target.style.color = `${NAVY}50`}
            >{c}</span>
          ))}
        </div>
      </div>

      <div style={{ padding: '100px 60px', background: '#fff' }}>
        <div style={{
          maxWidth: '1300px', margin: '0 auto',
          background: NAVY, borderRadius: '20px', padding: '80px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '6px', background: RED }} />
          <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div style={{ position: 'absolute', right: '40px', bottom: '-20px', fontSize: '160px', fontWeight: '900', color: 'rgba(255,255,255,0.03)', letterSpacing: '-8px', userSelect: 'none', lineHeight: 1 }}>
            MU
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ margin: '0 0 12px', fontSize: '11px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', color: RED }}>
              Student Portal
            </p>
            <h2 style={{ margin: '0 0 16px', fontSize: '44px', fontWeight: '900', color: '#fff', letterSpacing: '-2px', lineHeight: 1.1 }}>
              Your results.<br />Your profile.<br />Your future.
            </h2>
            <p style={{ margin: 0, fontSize: '16px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: '400px' }}>
              Access grades, download transcripts, register for courses — all in one secure place.
            </p>
          </div>
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '12px', flexShrink: 0, marginLeft: '60px' }}>
            <button onClick={() => navigate('/login')} style={{
              padding: '16px 44px', borderRadius: '8px', fontSize: '15px',
              fontWeight: '700', cursor: 'pointer', border: 'none',
              background: RED, color: '#fff', transition: 'all 0.25s',
              boxShadow: `0 8px 24px ${RED}60`,
            }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 12px 28px ${RED}70`; }}
              onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 24px ${RED}60`; }}
            >Sign In Now →</button>
            <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>Use your university ID to log in</p>
          </div>
        </div>
      </div>

      <footer style={{ background: '#0a1230', padding: '72px 60px 40px', borderTop: `4px solid ${RED}` }}>
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
                <p style={{ margin: '0 0 20px', fontWeight: '700', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
                  {col.title}
                </p>
                {col.links.map(link => (
                  <p key={link} style={{ margin: '0 0 10px', fontSize: '14px', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'color 0.2s' }}
                    onMouseOver={e => e.target.style.color = '#fff'}
                    onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.5)'}
                  >{link}</p>
                ))}
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.2)' }}>
              © 2026 Metropolitan University, Sylhet. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[GREY, RED, NAVY].map((c, i) => (
                <div key={i} style={{ width: '28px', height: '4px', background: c, borderRadius: '2px', opacity: i === 1 ? 1 : 0.5 }} />
              ))}
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.2)' }}>
              Permanently Chartered · Government of Bangladesh
            </p>
          </div>
        </div>
      </footer>

      {/* ✨ NEW: Cinematic Video Modal Overlay with your exact YouTube Link! */}
      {showVideo && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(10, 18, 48, 0.95)', 
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px',
          backdropFilter: 'blur(10px)',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div style={{ width: '100%', maxWidth: '1000px', display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
            <button onClick={() => setShowVideo(false)} style={{ 
              background: 'transparent', border: 'none', color: '#fff', fontSize: '16px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' 
            }}>
              ✕ Close Video
            </button>
          </div>
          
          <div style={{ 
            width: '100%', maxWidth: '1000px', aspectRatio: '16/9', background: '#000', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 32px 64px rgba(0,0,0,0.6)' 
          }}>
            <iframe 
              width="100%" height="100%" 
              src="https://www.youtube.com/embed/-ebN8DS1Zts?autoplay=1" 
              title="Metropolitan University Overview" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>
        </div>
      )}

    </div>
  );
}