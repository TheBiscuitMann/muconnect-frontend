import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ── BRANDING IMPORTS ──
import muLogo from '../assets/MU_Logo.jpg';

const NAVY = '#1e2a6e';
const RED  = '#e31e24';
const GREY = '#6b7280';

export default function BscCSE() {
  const navigate = useNavigate();
  // This state controls which section is visible on the right side!
  const [activeTab, setActiveTab] = useState('overview');

  // Sidebar Menu Data
  const SIDEBAR_LINKS = [
    { id: 'overview',   label: 'Program Overview' },
    { id: 'curriculum', label: 'Curriculum & Courses' },
    { id: 'admission',  label: 'Admission Requirements' },
    { id: 'financial',  label: 'Financial Aid & Waivers' },
    { id: 'research',   label: 'Directed Research (498R)' }
  ];

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", color: NAVY, background: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* ── MINIMAL NAVBAR ── */}
      <nav style={{
        height: '68px', padding: '0 60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid #f0f0f0', background: '#fff', position: 'sticky', top: 0, zIndex: 100
      }}>
        <div onClick={() => navigate('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <img src={muLogo} alt="MU" style={{ height: '46px', objectFit: 'contain' }} />
        </div>
        <button onClick={() => navigate('/academics/cse')} style={{
          background: 'transparent', border: `1.5px solid ${NAVY}30`, color: NAVY,
          padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer'
        }}>
          ← Back to CSE Department
        </button>
      </nav>

      {/* ── BREADCRUMBS (Just like NSU) ── */}
      <div style={{ background: '#f8f9fa', padding: '16px 60px', borderBottom: '1px solid #eaeaea', fontSize: '13px', color: GREY }}>
        <span onClick={() => navigate('/')} style={{ cursor: 'pointer', color: NAVY, fontWeight: '600' }}>Home</span>
        <span style={{ margin: '0 8px' }}>›</span>
        <span onClick={() => navigate('/academics/cse')} style={{ cursor: 'pointer', color: NAVY, fontWeight: '600' }}>Academics</span>
        <span style={{ margin: '0 8px' }}>›</span>
        <span>BSc in Computer Science & Engineering</span>
      </div>

      {/* ── MAIN 2-COLUMN LAYOUT ── */}
      <div style={{ display: 'flex', flex: 1, maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        
        {/* LEFT SIDEBAR */}
        <aside style={{ width: '280px', flexShrink: 0, borderRight: '1px solid #eaeaea', padding: '40px 0', background: '#fcfcfd' }}>
          <div style={{ padding: '0 32px', marginBottom: '24px' }}>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: NAVY, letterSpacing: '1px', textTransform: 'uppercase' }}>
              Undergraduate
            </h2>
            <div style={{ width: '40px', height: '3px', background: RED, marginTop: '12px' }} />
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {SIDEBAR_LINKS.map(link => (
              <li key={link.id}>
                <button 
                  onClick={() => setActiveTab(link.id)}
                  style={{
                    width: '100%', textAlign: 'left', padding: '14px 32px', border: 'none',
                    background: activeTab === link.id ? '#fff' : 'transparent',
                    color: activeTab === link.id ? RED : NAVY,
                    fontSize: '14px', fontWeight: activeTab === link.id ? '700' : '600',
                    cursor: 'pointer', transition: 'all 0.2s ease',
                    borderLeft: activeTab === link.id ? `4px solid ${RED}` : '4px solid transparent',
                    boxShadow: activeTab === link.id ? '0 4px 12px rgba(0,0,0,0.03)' : 'none'
                  }}
                  onMouseOver={e => { if (activeTab !== link.id) e.currentTarget.style.color = RED; }}
                  onMouseOut={e => { if (activeTab !== link.id) e.currentTarget.style.color = NAVY; }}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* RIGHT CONTENT AREA */}
        <main style={{ flex: 1, padding: '48px 64px' }}>
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
              <h1 style={{ margin: '0 0 24px', fontSize: '36px', fontWeight: '900', color: NAVY, letterSpacing: '-1px' }}>
                BSc in Computer Science & Engineering
              </h1>
              
              <h3 style={{ margin: '0 0 16px', fontSize: '20px', color: NAVY, fontWeight: '700' }}>Programs</h3>
              <p style={{ fontSize: '15px', color: '#444', lineHeight: 1.8, marginBottom: '20px' }}>
                The Department of Computer Science and Engineering at Metropolitan University offers a premium undergraduate program designed to shape the next generation of technological innovators and industry leaders.
              </p>
              <p style={{ fontSize: '15px', color: '#444', lineHeight: 1.8, marginBottom: '24px' }}>
                Our <strong>Bachelor of Science in Computer Science and Engineering (BSc in CSE)</strong> is widely recognized as one of the top undergraduate programs in the nation. Our world-class faculty members facilitate student learning by widening intellectual curiosity and implementing a heavily practical, project-based curriculum.
              </p>
              
              <div style={{ background: '#f8f9fa', padding: '24px', borderLeft: `4px solid ${RED}`, marginBottom: '32px' }}>
                <p style={{ margin: 0, fontSize: '15px', color: NAVY, lineHeight: 1.6, fontWeight: '600' }}>
                  Our broad-based curriculum allows students not only to foster studies in their specific areas of interest (such as Machine Learning, Artificial Intelligence, and Web Development) but also helps them grow as morally and ethically sound global engineers.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginTop: '40px' }}>
                {[
                  { label: 'Total Credits', value: '144' },
                  { label: 'Duration', value: '4 Years (8 Semesters)' },
                  { label: 'Medium of Instruction', value: 'English' }
                ].map((stat, i) => (
                  <div key={i} style={{ border: '1px solid #eaeaea', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                    <p style={{ margin: '0 0 8px', fontSize: '24px', fontWeight: '900', color: RED }}>{stat.value}</p>
                    <p style={{ margin: 0, fontSize: '13px', color: GREY, fontWeight: '600', textTransform: 'uppercase' }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: CURRICULUM */}
          {activeTab === 'curriculum' && (
            <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
              <h1 style={{ margin: '0 0 24px', fontSize: '36px', fontWeight: '900', color: NAVY, letterSpacing: '-1px' }}>Curriculum & Courses</h1>
              <p style={{ fontSize: '15px', color: '#444', lineHeight: 1.8, marginBottom: '24px' }}>
                The BSc in CSE program requires successful completion of 144 credits, including core computing requirements, advanced electives, and a final year capstone project.
              </p>
              <div style={{ border: '1px solid #eaeaea', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ background: '#f8f9fa', padding: '16px 24px', borderBottom: '1px solid #eaeaea', fontWeight: '700', color: NAVY }}>Core Focus Areas Include:</div>
                <ul style={{ margin: 0, padding: '24px 40px', lineHeight: 2, color: '#444' }}>
                  <li>Data Structures & Object-Oriented Programming (Java, C++)</li>
                  <li>Database Management Systems & Web Engineering (React, Tailwind, Node.js)</li>
                  <li>Artificial Intelligence & Machine Learning (Predictive Modeling, Neural Networks)</li>
                  <li>Computer Networks & Cyber Security</li>
                  <li>Software Engineering & System Analysis</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: ADMISSION */}
          {activeTab === 'admission' && (
            <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
              <h1 style={{ margin: '0 0 24px', fontSize: '36px', fontWeight: '900', color: NAVY, letterSpacing: '-1px' }}>Admission Requirements</h1>
              <p style={{ fontSize: '15px', color: '#444', lineHeight: 1.8, marginBottom: '20px' }}>
                Metropolitan University seeks students with strong academic backgrounds and a passion for technology. 
              </p>
              <ul style={{ margin: 0, padding: '0 24px', lineHeight: 2, color: '#444' }}>
                <li>Minimum GPA of 2.50 in both SSC and HSC (or equivalent) in the Science group.</li>
                <li>Must have studied Mathematics and Physics at the HSC level.</li>
                <li>Acceptable score in the Metropolitan University Admission Test.</li>
              </ul>
              <button onClick={() => navigate('/notices')} style={{ marginTop: '32px', background: RED, color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontWeight: '700', cursor: 'pointer' }}>
                Check Admission Deadlines →
              </button>
            </div>
          )}

          {/* TAB 4: FINANCIAL AID */}
          {activeTab === 'financial' && (
            <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
              <h1 style={{ margin: '0 0 24px', fontSize: '36px', fontWeight: '900', color: NAVY, letterSpacing: '-1px' }}>Financial Aid & Waivers</h1>
              <p style={{ fontSize: '15px', color: '#444', lineHeight: 1.8, marginBottom: '20px' }}>
                We believe that financial constraints should not be a barrier to quality education. We offer comprehensive scholarship packages for outstanding students.
              </p>
              <ul style={{ margin: 0, padding: '0 24px', lineHeight: 2, color: '#444' }}>
                <li><strong>Merit Scholarships:</strong> Up to 100% tuition waiver based on HSC/SSC GPA and Admission Test performance.</li>
                <li><strong>Semester Results:</strong> Dean's List and VC's List scholarships awarded for maintaining excellent CGPA.</li>
                <li><strong>Special Waivers:</strong> Available for siblings, females, and freedom fighters' wards.</li>
              </ul>
            </div>
          )}

          {/* TAB 5: RESEARCH */}
          {activeTab === 'research' && (
            <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
              <h1 style={{ margin: '0 0 24px', fontSize: '36px', fontWeight: '900', color: NAVY, letterSpacing: '-1px' }}>Directed Research & Thesis</h1>
              <p style={{ fontSize: '15px', color: '#444', lineHeight: 1.8, marginBottom: '20px' }}>
                In their final year, CSE students participate in cutting-edge research projects. Past student theses have included critical topics such as:
              </p>
              <div style={{ background: '#f0f3ff', padding: '24px', borderRadius: '8px', borderLeft: `4px solid ${NAVY}` }}>
                <p style={{ margin: '0 0 12px', fontSize: '16px', color: NAVY, fontWeight: '700' }}>Recent Student Publications & Projects:</p>
                <ul style={{ margin: 0, padding: '0 24px', lineHeight: 1.8, color: '#444' }}>
                  <li>Multi-modal AI implementation for Pneumonia detection using X-Ray imaging.</li>
                  <li>Modeling Trust Decay in AI Systems: Identifying Factors and Mitigation Strategies.</li>
                  <li>Predictive modeling for Antimicrobial Resistance using Kaggle datasets.</li>
                </ul>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#0a1230', padding: '72px 60px 40px', borderTop: `4px solid ${RED}`, marginTop: 'auto' }}>
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
            </div>
            {[
              { title: 'Academics',   links: ['Departments', 'Admission', 'Tuition & Fees'] },
              { title: 'Campus',      links: ['Student Clubs', 'Library', 'Career Services'] },
              { title: 'Connect',     links: ['Student Portal', 'Faculty Portal', 'News'] },
            ].map(col => (
              <div key={col.title}>
                <p style={{ margin: '0 0 20px', fontWeight: '700', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>{col.title}</p>
                {col.links.map(link => (
                  <p key={link} style={{ margin: '0 0 10px', fontSize: '14px', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>{link}</p>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '28px', display: 'flex', justifyContent: 'space-between' }}>
            <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.2)' }}>© 2026 Metropolitan University, Sylhet.</p>
          </div>
        </div>
      </footer>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}