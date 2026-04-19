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
  { title: 'ABOUT MU', links: ['Brief History', 'Vision, Mission & Strategy', 'Accreditation', 'International Recognition', 'Facts About MU'] },
  { title: 'MU Trustees', links: ['Board of Trustees'] },
  { title: 'Executive Leaders', links: ['VC, Pro-VC & Treasurer', 'Deans, Chairs & Directors', 'Administration'] },
  { title: 'Authorities', links: ['Syndicate', 'Academic Council'] }
];

const ACADEMIC_MENU = [
  { title: 'School of Science & Technology', links: ['Computer Science & Engineering (CSE)', 'Data Science', 'Software Engineering'] },
  { title: 'School of Business & Economics', links: ['Business Administration (BBA)', 'Business Administration (BA)', 'Economics'] },
  { title: 'School of Humanities', links: ['English'] },
  { title: 'School of Law', links: ['Law'] }
];

// ✨ BROUGHT BACK: Admission Menu Data
const ADMISSION_LINKS = [
  "Apply Now", "Undergraduate Admission", "Postgraduate Admission", "Joint PhD Admission",
  "International Applicants", "Scholarships and Financial Aid", "Waiver for Postgraduate Programs",
  "Freshman Enrollment", "Tuition and Fees", "Other Fees", "Brochure Flyer", "Sample Questions", "FAQs"
];

function SectionLabel({ num, text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
      <span style={{ fontSize: '11px', fontWeight: '900', color: RED, letterSpacing: '4px', textTransform: 'uppercase' }}>{num}</span>
      <div style={{ width: '1px', height: '20px', background: '#ddd' }} />
      <span style={{ fontSize: '11px', fontWeight: '700', color: GREY, letterSpacing: '3px', textTransform: 'uppercase' }}>{text}</span>
    </div>
  );
}

export default function Home() {
  const navigate  = useNavigate();
  const [notices, setNotices]   = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState(null);
  const [hoveredMenu, setHoveredMenu] = useState(null); 
  const [showVideo, setShowVideo] = useState(false);
  
  
  const [programType, setProgramType] = useState('undergrad');

  const heroRef = useRef(null);

  useEffect(() => {
    API.get('/notices/').then(r => setNotices(r.data.slice(0, 4))).catch(() => {});
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const NAV_LINKS = ['About', 'Academics', 'Admission', 'Research', 'Campus Life', 'Notices', 'Contact'];

  
  const undergradPrograms = [
    { name: 'Computer Science & Engineering', path: '/academics/cse', sub: 'Science & Technology' },
    { name: 'Software Engineering', path: '/academics/software-engineering', sub: 'Science & Technology' },
    { name: 'Data Science', path: '/academics/data-science', sub: 'Science & Technology' },
    { name: 'Business Administration (BBA)', path: '/academics/bba', sub: 'Business & Economics' },
    { name: 'English', path: '/academics/english', sub: 'Humanities' },
    { name: 'Law & Justice', path: '/academics/law', sub: 'School of Law' }
  ];

  const gradPrograms = [
    { name: 'MBA (Regular)', path: '/academics/bba', sub: 'Graduate Business Studies' },
    { name: 'MBA (General)', path: '/academics/bba', sub: 'Graduate Business Studies' },
    { name: 'MSc. in MIS', path: '/academics/cse', sub: 'Management Information Systems' },
    { name: 'M.A. in English (Prelim & Final)', path: '/academics/english', sub: 'Department of English' },
    { name: 'M.A. in English (Final)', path: '/academics/english', sub: 'Department of English' },
    { name: 'MSS in Economics', path: '/academics/economics', sub: 'School of Social Science' },
    { name: 'LL.M. (1 Year)', path: '/academics/law', sub: 'School of Law' },
    { name: 'LL.M. (2 Year)', path: '/academics/law', sub: 'School of Law' }
  ];

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", color: NAVY, background: '#fff', overflowX: 'hidden' }}>

      {/* ═══════════════════════════════════════════════════════
          NAVBAR 
      ═══════════════════════════════════════════════════════ */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 999, height: '140px', padding: '0 60px', 
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? '#fff' : '#fff',
        borderBottom: `1px solid ${scrolled ? '#eee' : '#f0f0f0'}`,
        boxShadow: scrolled ? '0 4px 24px rgba(30,42,110,0.08)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        <div onClick={() => navigate('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <img src={muLogo} alt="MU" style={{ height: '170px', objectFit: 'contain' }} /> 
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '100%' }}>
          {NAV_LINKS.map(l => (
            <div key={l} style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                 
              <button 
                onClick={() => { 
                  setActiveNav(l); 
                  if (l === 'Notices') { navigate('/notices'); setHoveredMenu(null); }
                  else if (l === 'Research') { navigate('/academics/cse/research'); setHoveredMenu(null); } 
                  else if (l === 'Campus Life') { navigate('/campus-life'); setHoveredMenu(null); }
                  else if (l === 'Contact') { navigate('/contact'); setHoveredMenu(null); }
                  else if (l === 'About' || l === 'Academics' || l === 'Admission') { setHoveredMenu(hoveredMenu === l ? null : l); }
                  else { setHoveredMenu(null); }
                }}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer', padding: '6px 14px', borderRadius: '6px',
                  fontSize: '14px', fontWeight: '600', color: activeNav === l || hoveredMenu === l ? RED : NAVY,
                  position: 'relative', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '4px'
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

              {/* ── ABOUT & ACADEMICS DROPDOWN ── */}
              {(l === 'About' || l === 'Academics') && hoveredMenu === l && (
                <div style={{
                  position: 'absolute', top: '85px', left: 0, right: 0, background: NAVY, padding: '40px 60px',
                  borderTop: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
                  display: 'flex', justifyContent: 'center', cursor: 'default', animation: 'fadeIn 0.2s ease-out'
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', width: '100%', maxWidth: '1300px' }}>
                    {(hoveredMenu === 'About' ? ABOUT_MENU : ACADEMIC_MENU).map(col => (
                      <div key={col.title}>
                        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '12px', marginBottom: '16px' }}>
                          <span style={{ color: '#fff', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase' }}>{col.title}</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                          {col.links.map(link => (
                            <span key={link} 
                              onClick={() => { 
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

              {/* ✨ BROUGHT BACK: SPLIT-SCREEN ADMISSION DROPDOWN */}
              {l === 'Admission' && hoveredMenu === 'Admission' && (
                <div style={{
                  position: 'absolute', top: '85px', left: 0, right: 0, background: '#fff',
                  borderTop: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  display: 'flex', justifyContent: 'center', cursor: 'default', animation: 'fadeIn 0.2s ease-out'
                }}>
                  <div style={{ display: 'flex', width: '100%', maxWidth: '1400px', minHeight: '450px' }}>
                    
                    {/* Left Column: The Links */}
                    <div style={{ flex: '1.2', padding: '60px 40px 60px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 40px', alignContent: 'start' }}>
                      {ADMISSION_LINKS.map(link => (
                        <span key={link} 
                          onClick={() => {
                            const formattedPath = link.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                            navigate(`/admission/${formattedPath}`);
                            setHoveredMenu(null);
                          }}
                          style={{ color: NAVY, fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'color 0.2s', padding: '8px 0' }}
                          onMouseOver={e => e.target.style.color = RED}
                          onMouseOut={e => e.target.style.color = NAVY}
                        >
                          {link}
                        </span>
                      ))}
                    </div>

                    {/* Right Column: The Cinematic Image Banner */}
                    <div style={{ 
                      flex: '0.8', position: 'relative', overflow: 'hidden',
                      backgroundImage: `url(${realBanner})`, backgroundSize: 'cover', backgroundPosition: 'center',
                      borderBottomLeftRadius: '40px' 
                    }}>
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(30, 42, 110, 0.95), rgba(30, 42, 110, 0.8))' }} />
                      
                      <div style={{ position: 'relative', zIndex: 1, padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', gap: '60px' }}>
                        <div style={{ cursor: 'pointer', transition: 'transform 0.3s' }}
                             onClick={() => { navigate('/admission/undergraduate-admission'); setHoveredMenu(null); }}
                             onMouseOver={e => e.currentTarget.style.transform = 'translateX(10px)'}
                             onMouseOut={e => e.currentTarget.style.transform = 'translateX(0)'}>
                          <h3 style={{ color: '#fff', fontSize: '32px', fontWeight: '900', margin: 0 }}>Admissions</h3>
                          <p style={{ color: 'rgba(255,255,255,0.7)', margin: '8px 0 0', fontSize: '14px' }}>Start your journey today →</p>
                        </div>
                        <div style={{ cursor: 'pointer', transition: 'transform 0.3s' }}
                             onClick={() => { navigate('/admission/scholarships-and-financial-aid'); setHoveredMenu(null); }}
                             onMouseOver={e => e.currentTarget.style.transform = 'translateX(10px)'}
                             onMouseOut={e => e.currentTarget.style.transform = 'translateX(0)'}>
                          <h3 style={{ color: '#fff', fontSize: '32px', fontWeight: '900', margin: 0, lineHeight: 1.2 }}>Scholarships &<br/>Financial Aid</h3>
                          <p style={{ color: 'rgba(255,255,255,0.7)', margin: '8px 0 0', fontSize: '14px' }}>Explore funding options →</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          ))}
        </div>

        <button onClick={() => navigate('/login')} style={{
          padding: '10px 24px', borderRadius: '6px', fontSize: '14px', fontWeight: '700',
          background: NAVY, color: '#fff', border: 'none', cursor: 'pointer', letterSpacing: '0.3px',
          transition: 'all 0.25s', display: 'flex', alignItems: 'center', gap: '8px',
        }}
          onMouseOver={e => e.currentTarget.style.background = RED}
          onMouseOut={e => e.currentTarget.style.background = NAVY}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
          MU Connect 
        </button>
      </nav>

      {/* ═══════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════ */}
      <div ref={heroRef} style={{ 
        minHeight: 'calc(100vh - 85px)', display: 'flex', position: 'relative', overflow: 'hidden',
        backgroundImage: `url(${realBanner})`, backgroundSize: 'cover', backgroundPosition: 'center'
      }}>
        <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 64px 80px 60px', position: 'relative', zIndex: 2, background: 'rgba(255, 255, 255, 0.94)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: `1px solid ${RED}30`, background: '#fff8f8', padding: '6px 14px', borderRadius: '4px', marginBottom: '40px', alignSelf: 'flex-start' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: RED }} />
            <span style={{ fontSize: '11px', fontWeight: '700', color: RED, letterSpacing: '2px', textTransform: 'uppercase' }}>Permanently Chartered University</span>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ margin: '0 0 16px', fontSize: '80px', fontWeight: '900', lineHeight: 0.95, letterSpacing: '-4px', color: NAVY }}>Edu<span style={{ color: RED }}>.</span></h1>
            <h1 style={{ margin: '0 0 16px', fontSize: '80px', fontWeight: '900', lineHeight: 0.95, letterSpacing: '-4px', color: '#c8cde3' }}>Not Just</h1>
            <h1 style={{ margin: 0, fontSize: '80px', fontWeight: '900', lineHeight: 0.95, letterSpacing: '-4px', color: NAVY }}>a Degree<span style={{ color: RED }}>.</span></h1>
          </div>

          <p style={{ margin: '0 0 48px', fontSize: '17px', color: GREY, lineHeight: 1.8, maxWidth: '440px' }}>
            Metropolitan University, Sylhet — where curiosity meets ambition, and students become global citizens since 2003.
          </p>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button onClick={() => { const section = document.getElementById('find-your-way'); if (section) section.scrollIntoView({ behavior: 'smooth' }); }}
              style={{ padding: '14px 32px', borderRadius: '6px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', border: 'none', background: RED, color: '#fff', letterSpacing: '0.3px', transition: 'all 0.2s', boxShadow: `0 8px 24px ${RED}40` }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 12px 28px ${RED}50`; }}
              onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 24px ${RED}40`; }}
            >Explore Programs →</button>
            <button onClick={() => setShowVideo(true)} 
              style={{ padding: '14px 28px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', background: 'transparent', color: NAVY, border: `1.5px solid ${NAVY}30`, transition: 'all 0.2s' }}
              onMouseOver={e => { e.currentTarget.style.borderColor = NAVY; e.currentTarget.style.background = '#f5f7ff'; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = `${NAVY}30`; e.currentTarget.style.background = 'transparent'; }}
            >Watch Overview</button>
          </div>

          <div style={{ marginTop: '64px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '3px', background: RED, borderRadius: '2px' }} />
            <div style={{ width: '20px', height: '3px', background: `${NAVY}30`, borderRadius: '2px' }} />
            <div style={{ width: '10px', height: '3px', background: `${GREY}30`, borderRadius: '2px' }} />
            <span style={{ fontSize: '12px', color: GREY, letterSpacing: '1px' }}>EST. 2003 · SYLHET, BANGLADESH</span>
          </div>
        </div>

        <div style={{ width: '420px', flexShrink: 0, background: 'rgba(30, 42, 110, 0.92)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 48px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: RED }} />
          <p style={{ margin: '0 0 32px', fontSize: '11px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>By the numbers</p>
          {[ { val: '6,000+', label: 'Active Students', sub: 'Across all departments' }, { val: '250+', label: 'Expert Faculty', sub: 'PhD holders & practitioners' }, { val: '22+', label: 'Years of Excellence', sub: 'Established 2003' }, { val: '10,000+', label: 'Global Alumni', sub: 'In 30+ countries' }].map((s, i) => (
            <div key={i} style={{ padding: '20px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <p style={{ margin: '0 0 4px', fontSize: '36px', fontWeight: '900', color: '#fff', letterSpacing: '-2px', lineHeight: 1 }}>{s.val}</p>
                <p style={{ margin: '0 0 2px', fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.8)' }}>{s.label}</p>
                <p style={{ margin: 0, fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{s.sub}</p>
              </div>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: `1px solid ${RED}60`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: RED }} /></div>
            </div>
          ))}
          <div style={{ marginTop: '28px', padding: '14px 18px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', borderLeft: `3px solid ${RED}` }}>
            <p style={{ margin: 0, fontSize: '12px', fontWeight: '600', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>🏆 First permanently chartered private university in Sylhet — Accredited by UGC Bangladesh</p>
          </div>
        </div>
      </div>

      <div style={{ background: RED, padding: '14px 0', overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <div style={{ display: 'inline-block', animation: 'marquee 30s linear infinite' }}>
          {['Permanently Chartered 2024', 'British Council Partner', 'Cambridge English Partner', 'UGC Approved', '6,000+ Students', '10,000+ Alumni', 'Bateshwar Campus, Sylhet'].map((t, i) => (
            <span key={i} style={{ marginRight: '60px', fontSize: '12px', fontWeight: '700', color: '#fff', letterSpacing: '2px', textTransform: 'uppercase' }}>◆ {t}</span>
          ))}
          {['Permanently Chartered 2024', 'British Council Partner', 'Cambridge English Partner', 'UGC Approved', '6,000+ Students', '10,000+ Alumni', 'Bateshwar Campus, Sylhet'].map((t, i) => (
            <span key={'b'+i} style={{ marginRight: '60px', fontSize: '12px', fontWeight: '700', color: '#fff', letterSpacing: '2px', textTransform: 'uppercase' }}>◆ {t}</span>
          ))}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </div>

      <div style={{ padding: '120px 60px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px', maxWidth: '1300px', margin: '0 auto', alignItems: 'center' }}>
        <div>
          <SectionLabel num="01" text="Our Mission" />
          <h2 style={{ margin: '0 0 24px', fontSize: '52px', fontWeight: '900', lineHeight: 1.05, letterSpacing: '-2px', color: NAVY }}>Shaping the leaders of tomorrow — today.</h2>
          <p style={{ margin: '0 0 18px', fontSize: '17px', color: '#555', lineHeight: 1.85 }}>Since 2003, we've been building something rare: a university that combines academic rigor with the spirit of real-world ambition. Every program, every lab, every mentorship is designed with one question in mind — what kind of world will our students build?</p>
          <p style={{ margin: '0 0 40px', fontSize: '17px', color: '#555', lineHeight: 1.85 }}>Our graduates work at Microsoft, Google, and Amazon. They lead nonprofits, research labs, courtrooms, and startups. They're not just employed — they're impactful.</p>
          <button 
  onClick={() => navigate('/our-legacy')} 
  style={{ 
    padding: '13px 30px', 
    borderRadius: '6px', 
    fontSize: '13px', 
    fontWeight: '700', 
    cursor: 'pointer', 
    border: `2px solid ${NAVY}`, 
    background: 'transparent', 
    color: NAVY 
  }}
>
  Our Full Story →
</button>
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: '16px', top: 0, bottom: 0, width: '1px', background: '#eee' }} />
          {[ { year: '2003', event: 'University founded by Dr. Toufique Rahman Chowdhury in Sylhet', color: NAVY }, { year: '2010', event: 'First batch of CSE graduates enters the tech industry', color: RED }, { year: '2018', event: 'Permanent campus established at Bateshwar, Sylhet', color: NAVY }, { year: '2024', event: 'Permanently chartered by the Government of Bangladesh', color: RED }, { year: '2026', event: 'New Data Science program launched with Cambridge partnership', color: NAVY }].map((m, i) => (
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
        
      ═══════════════════════════════════════════════════════ */}
      <div id="find-your-way" style={{ position: 'relative', overflow: 'hidden', padding: '120px 60px', color: '#fff', borderTop: '1px solid #eee' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '120%', height: '120%', backgroundImage: `url(${realBanner})`, backgroundSize: 'cover', backgroundPosition: 'center', animation: 'slowZoom 25s linear infinite alternate', zIndex: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(30, 42, 110, 0.95) 0%, rgba(30, 42, 110, 0.75) 100%)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '25% 100%', zIndex: 1 }} />
        <style>{`
          @keyframes slowZoom { 0% { transform: scale(1); } 100% { transform: scale(1.1); } }
          .dept-link { font-size: 22px; font-weight: 700; color: #fff; cursor: pointer; transition: all 0.3s ease; display: block; position: relative; padding-left: 0; line-height: 1.3; }
          .dept-link:hover { color: #4ade80; transform: translateX(10px); }
          .dept-link::before { content: '→'; position: absolute; left: -25px; top: 0; opacity: 0; transition: all 0.3s ease; color: #4ade80; }
          .dept-link:hover::before { left: -30px; opacity: 1; }
          .pill-btn { padding: 14px 28px; border-radius: 40px; border: 1px solid rgba(255,255,255,0.4); background: transparent; color: #fff; font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.3s ease; width: fit-content; }
          .pill-btn:hover { background: rgba(255,255,255,0.1); transform: translateY(-2px); }
          .pill-btn.active { background: #fff; color: #1e2a6e; border-color: #fff; }
          .pill-btn.active:hover { background: #fff; }
          @keyframes slideFadeIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        `}</style>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '100px', alignItems: 'center' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 style={{ margin: 0, fontSize: '56px', fontWeight: '900', letterSpacing: '-2px', lineHeight: 1.1 }}>Find Your Way</h2>
            <p style={{ margin: '0 0 24px', fontSize: '17px', lineHeight: 1.7, color: 'rgba(255,255,255,0.8)' }}>Explore the comprehensive paths and opportunities that Metropolitan University has to offer to shape your future.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <button className={`pill-btn ${programType === 'undergrad' ? 'active' : ''}`} onClick={() => setProgramType('undergrad')}>Undergraduate Programs</button>
              <button className={`pill-btn ${programType === 'grad' ? 'active' : ''}`} onClick={() => setProgramType('grad')}>Graduate Programs</button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '60px 40px' }}>
            {(programType === 'undergrad' ? undergradPrograms : gradPrograms).map((dept, i) => (
              <div key={i + programType} onClick={() => navigate(dept.path)} className="dept-link" style={{ animation: `slideFadeIn 0.4s ease-out forwards ${i * 0.05}s`, opacity: 0 }}>
                {dept.name}
                {dept.sub && <span style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.6)', marginTop: '6px', letterSpacing: '1px', textTransform: 'uppercase' }}>{dept.sub}</span>}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          VIBRANT NOTICES SECTION
      ═══════════════════════════════════════════════════════ */}
      <div style={{ padding: '100px 60px', maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '52px' }}>
          <div>
            <SectionLabel num="03" text="Latest Updates" />
            <h2 style={{ margin: 0, fontSize: '48px', fontWeight: '900', letterSpacing: '-2px', color: NAVY, lineHeight: 1.05 }}>
              Stay in the loop.
            </h2>
          </div>
          <button onClick={() => navigate('/notices')} style={{ padding: '12px 28px', borderRadius: '8px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', border: 'none', background: NAVY, color: '#fff', transition: 'all 0.25s', boxShadow: `0 8px 24px ${NAVY}40` }} 
            onMouseOver={e => { e.currentTarget.style.background = RED; e.currentTarget.style.transform = 'translateY(-2px)'; }} 
            onMouseOut={e => { e.currentTarget.style.background = NAVY; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            All Notices →
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {[
            { 
              id: 'exam',
              title: "Autumn '25: Personalized Exam Schedules", 
              desc: "Your specific supplementary exam dates and seat plans are now available.",
              category: "URGENT", color: RED, bg: '#fff0f0', date: '15 Mar',
              actionText: "View in Student Portal", route: '/login' 
            },
            { 
              id: 'ramadan',
              title: "Spring '26: Holy Month Class Timings", 
              desc: "Adjusted schedules for theory and lab classes during Ramadan.",
              category: "ACADEMIC", color: NAVY, bg: '#f0f3ff', date: '10 Mar',
              actionText: "View in Student Portal", route: '/login' 
            },
            { 
              id: 'cse-fest',
              title: "CSE Fest 2026: The Ultimate Tech Showdown", 
              desc: "Hackathons, robotics, and gaming. Secure your team's spot today!",
              category: "EVENT", color: '#10b981', bg: '#ecfdf5', date: '05 Mar', // Emerald Green
              actionText: "Register Now", route: '/apply/cse-fest' 
            },
            { 
              id: 'data-science',
              title: "Pioneer the Future: Data Science Admissions", 
              desc: "Applications are now live for our inaugural B.Sc. in Data Science cohort.",
              category: "ADMISSION", color: '#8b5cf6', bg: '#f5f3ff', date: '01 Mar', // Vibrant Purple
              actionText: "Apply Here", route: '/apply/data-science' 
            }
          ].map((n, i) => (
            <div 
              key={i} 
              onClick={() => navigate(n.route)}
              style={{ 
                padding: '40px', borderRadius: '24px', background: '#fff', cursor: 'pointer', 
                border: '1px solid #f0f0f0', position: 'relative', overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0,0,0,0.03)', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' 
              }} 
              onMouseOver={e => { 
                e.currentTarget.style.transform = 'translateY(-8px)'; 
                e.currentTarget.style.boxShadow = `0 24px 48px ${n.color}20`;
                e.currentTarget.style.borderColor = `${n.color}50`;
                e.currentTarget.querySelector('.action-arrow').style.transform = 'translateX(8px)';
                e.currentTarget.querySelector('.bg-glow').style.opacity = '0.05';
              }} 
              onMouseOut={e => { 
                e.currentTarget.style.transform = 'translateY(0)'; 
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.03)';
                e.currentTarget.style.borderColor = '#f0f0f0';
                e.currentTarget.querySelector('.action-arrow').style.transform = 'translateX(0)';
                e.currentTarget.querySelector('.bg-glow').style.opacity = '0';
              }}
            >
              {/* Subtle dynamic background glow */}
              <div className="bg-glow" style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, background: `linear-gradient(135deg, transparent 50%, ${n.color} 100%)`, opacity: 0, transition: 'opacity 0.4s ease' }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', color: n.color, background: n.bg, padding: '6px 14px', borderRadius: '40px' }}>
                    {n.category}
                  </span>
                  <span style={{ fontSize: '13px', color: '#a0a0a0', fontWeight: '600' }}>{n.date}</span>
                </div>
                
                <h3 style={{ margin: '0 0 12px', fontSize: '22px', fontWeight: '800', color: NAVY, lineHeight: 1.3, letterSpacing: '-0.5px' }}>
                  {n.title}
                </h3>
                
                <p style={{ margin: '0 0 24px', fontSize: '15px', color: GREY, lineHeight: 1.6 }}>
                  {n.desc}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: n.color, fontWeight: '700', fontSize: '14px' }}>
                  {n.actionText}
                  <span className="action-arrow" style={{ transition: 'transform 0.3s ease', display: 'inline-block' }}>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ALUMNI LOGO STRIP ── */}
      <div style={{ borderTop: '1px solid #eee', borderBottom: '1px solid #eee', padding: '40px 60px', background: '#fafbfc' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '48px', flexWrap: 'wrap' }}>
          
          <p style={{ margin: 0, fontSize: '11px', fontWeight: '700', color: GREY, letterSpacing: '2px', textTransform: 'uppercase', flexShrink: 0 }}>
            Alumni at
          </p>
          <div style={{ width: '1px', height: '24px', background: '#ddd', flexShrink: 0 }} />
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '48px', flexWrap: 'wrap' }}>
            {[
              { name: 'Microsoft', url: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
              { name: 'Google', url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
              { name: 'Amazon', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
              { name: 'Agoda', url: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Agoda_transparent_logo.png' },
              { name: 'Genesys', url: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Genesys_logo.svg' }
            ].map((company) => (
              <img 
                key={company.name}
                src={company.url} 
                alt={company.name}
                title={`MU Alumni at ${company.name}`}
                style={{ 
                  height: '26px', // Keeps the logos uniformly sized
                  objectFit: 'contain',
                  filter: 'grayscale(100%) opacity(50%)', // Makes them premium grey
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={e => e.currentTarget.style.filter = 'grayscale(0%) opacity(100%)'}
                onMouseOut={e => e.currentTarget.style.filter = 'grayscale(100%) opacity(50%)'}
              />
            ))}
            
            {/* If you don't have a logo for a company like Incepta, you can keep it as matching text like this! */}
            <span 
              style={{ fontSize: '18px', fontWeight: '800', color: NAVY, filter: 'grayscale(100%) opacity(50%)', transition: 'all 0.3s ease', cursor: 'pointer', letterSpacing: '-0.5px' }}
              onMouseOver={e => e.currentTarget.style.filter = 'grayscale(0%) opacity(100%)'}
              onMouseOut={e => e.currentTarget.style.filter = 'grayscale(100%) opacity(50%)'}
            >
              Incepta
            </span>
            
          </div>

        </div>
      </div>

      <div style={{ padding: '100px 60px', background: '#fff' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', background: NAVY, borderRadius: '20px', padding: '80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '6px', background: RED }} />
          <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div style={{ position: 'absolute', right: '40px', bottom: '-20px', fontSize: '160px', fontWeight: '900', color: 'rgba(255,255,255,0.03)', letterSpacing: '-8px', userSelect: 'none', lineHeight: 1 }}>MU</div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ margin: '0 0 12px', fontSize: '11px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', color: RED }}>Student Portal</p>
            <h2 style={{ margin: '0 0 16px', fontSize: '44px', fontWeight: '900', color: '#fff', letterSpacing: '-2px', lineHeight: 1.1 }}>Your results.<br />Your profile.<br />Your future.</h2>
            <p style={{ margin: 0, fontSize: '16px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: '400px' }}>Access grades, download transcripts, register for courses — all in one secure place.</p>
          </div>
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '12px', flexShrink: 0, marginLeft: '60px' }}>
            <button onClick={() => navigate('/login')} style={{ padding: '16px 44px', borderRadius: '8px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', border: 'none', background: RED, color: '#fff', transition: 'all 0.25s', boxShadow: `0 8px 24px ${RED}60` }} onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 12px 28px ${RED}70`; }} onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 24px ${RED}60`; }}>Sign In Now →</button>
            <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>Use your university ID to log in</p>
          </div>
        </div>
      </div>

      <footer style={{ background: '#0a1230', padding: '72px 60px 40px', borderTop: `4px solid ${RED}` }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr 1fr 1fr', gap: '60px', marginBottom: '60px' }}>
            <div>
              <div style={{ background: '#fff', display: 'inline-block', padding: '8px 16px', borderRadius: '8px', marginBottom: '20px' }}><img src={muLogo} alt="MU" style={{ height: '38px', objectFit: 'contain', display: 'block' }} /></div>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', lineHeight: 1.9, margin: '0 0 16px', maxWidth: '260px' }}>Education. Not Just a Degree.<br />Bateshwar, Sylhet, Bangladesh.</p>
            </div>
            {[ { title: 'Academics', links: ['Departments', 'Admission', 'Tuition & Fees', 'Academic Calendar', 'Research'] }, { title: 'Campus', links: ['Student Clubs', 'Sports', 'Events', 'Library', 'Career Services'] }, { title: 'Connect', links: ['Contact Us', 'Student Portal', 'Faculty Portal', 'Alumni Network', 'News'] } ].map(col => (
              <div key={col.title}>
                <p style={{ margin: '0 0 20px', fontWeight: '700', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>{col.title}</p>
                {col.links.map(link => <p key={link} style={{ margin: '0 0 10px', fontSize: '14px', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = '#fff'} onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.5)'}>{link}</p>)}
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.2)' }}>© 2026 Metropolitan University, Sylhet. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {showVideo && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(10, 18, 48, 0.95)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', backdropFilter: 'blur(10px)', animation: 'fadeIn 0.3s ease-out' }}>
          <div style={{ width: '100%', maxWidth: '1000px', display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
            <button onClick={() => setShowVideo(false)} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '16px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>✕ Close Video</button>
          </div>
          <div style={{ width: '100%', maxWidth: '1000px', aspectRatio: '16/9', background: '#000', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 32px 64px rgba(0,0,0,0.6)' }}>
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/-ebN8DS1Zts?autoplay=1" title="Metropolitan University Overview" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
        </div>
      )}

    </div>
  );
}