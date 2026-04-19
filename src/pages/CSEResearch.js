import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// BRANDING IMPORTS
import muLogo from '../assets/MU_Logo.jpg';

const NAVY = '#1e2a6e';
const RED  = '#e31e24';
const GREY = '#6b7280';

// RESEARCH DATA
const RESEARCH_GROUPS = [
  {
    title: 'AI & Machine Learning (AIML)',
    icon: '🧠',
    description: 'Focuses on predictive modeling, neural networks, and developing intelligent systems for real-world applications. Recent projects include multi-modal AI for medical imaging and trust decay in AI systems.'
  },
  {
    title: 'Computer Vision (CV)',
    icon: '👁️',
    description: 'Explores algorithms for extracting meaningful information from images and video, ranging from pattern recognition to automated diagnostic tools in healthcare.'
  },
  {
    title: 'Cybersecurity & Network Systems',
    icon: '🛡️',
    description: 'Investigates methods to secure critical digital infrastructure, prevent data breaches, and design robust, scalable communication protocols for next-generation networks.'
  },
  {
    title: 'Data Science & Big Data Analytics',
    icon: '📊',
    description: 'Develops techniques for collecting, processing, and analyzing massive, heterogeneous data sets to discover hidden patterns and drive data-driven decisions in public health and economics.'
  },
  {
    title: 'Software Engineering & Systems',
    icon: '💻',
    description: 'Research into systematic methods for designing, developing, testing, and maintaining large-scale software systems and cloud architectures efficiently.'
  },
  {
    title: 'Embedded Systems & IoT',
    icon: '🔌',
    description: 'Design and optimization of small-scale computing systems for smart applications, from remote environmental sensors to smart city integrations.'
  }
];

export default function CSEResearch() {
  const navigate = useNavigate();
  // Controls the sidebar tabs
  const [activeTab, setActiveTab] = useState('groups');

  const SIDEBAR_LINKS = [
    { id: 'overview',     label: 'Research Overview' },
    { id: 'groups',       label: 'Research Groups' },
    { id: 'publications', label: 'Recent Publications' },
    { id: 'labs',         label: 'Laboratories' },
    { id: 'funding',      label: 'Grants & Funding' }
  ];

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", color: NAVY, background: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* MINIMAL NAVBAR */}
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

      {/* BREADCRUMBS */}
      <div style={{ background: '#f8f9fa', padding: '16px 60px', borderBottom: '1px solid #eaeaea', fontSize: '13px', color: GREY }}>
        <span onClick={() => navigate('/')} style={{ cursor: 'pointer', color: NAVY, fontWeight: '600' }}>Home</span>
        <span style={{ margin: '0 8px' }}>›</span>
        <span onClick={() => navigate('/academics/cse')} style={{ cursor: 'pointer', color: NAVY, fontWeight: '600' }}>Academics (CSE)</span>
        <span style={{ margin: '0 8px' }}>›</span>
        <span>Department Research</span>
      </div>

      {/* MAIN 2-COLUMN LAYOUT */}
      <div style={{ display: 'flex', flex: 1, maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        
        {/* LEFT SIDEBAR */}
        <aside style={{ width: '280px', flexShrink: 0, borderRight: '1px solid #eaeaea', padding: '40px 0', background: '#fcfcfd' }}>
          <div style={{ padding: '0 32px', marginBottom: '24px' }}>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: NAVY, letterSpacing: '1px', textTransform: 'uppercase' }}>
              Research
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
        <main style={{ flex: 1, padding: '48px 64px', background: '#fafbfc' }}>
          
          {/* TAB: RESEARCH GROUPS (Vertical Card Layout) */}
          {activeTab === 'groups' && (
            <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
              <div style={{ marginBottom: '40px' }}>
                <h1 style={{ margin: '0 0 16px', fontSize: '36px', fontWeight: '900', color: NAVY, letterSpacing: '-1px' }}>
                  Research Groups
                </h1>
                <p style={{ fontSize: '16px', color: '#555', lineHeight: 1.7, maxWidth: '800px' }}>
                  The Department of CSE is committed to advancing the frontiers of technology. Explore the diverse areas where our faculty and students collaborate to solve complex computational problems.
                </p>
              </div>

              {/* The Vertical Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {RESEARCH_GROUPS.map((group, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: '24px', padding: '32px', background: '#fff',
                    border: '1px solid #eaeaea', borderRadius: '16px',
                    boxShadow: '0 4px 16px rgba(30, 42, 110, 0.03)',
                    transition: 'all 0.3s ease', cursor: 'pointer', alignItems: 'flex-start'
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.borderColor = RED;
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(227, 30, 36, 0.08)';
                    e.currentTarget.style.transform = 'translateX(6px)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.borderColor = '#eaeaea';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(30, 42, 110, 0.03)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                  >
                    {/* Visual Icon Container */}
                    <div style={{ 
                      width: '72px', height: '72px', background: '#f8f9fa', border: '1px solid #eee',
                      borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                      fontSize: '32px', flexShrink: 0 
                    }}>
                      {group.icon}
                    </div>
                    
                    {/* Text Content */}
                    <div>
                      <h3 style={{ margin: '0 0 12px', fontSize: '20px', fontWeight: '800', color: NAVY }}>
                        {group.title}
                      </h3>
                      <p style={{ margin: 0, fontSize: '15px', color: '#555', lineHeight: 1.7 }}>
                        {group.description}
                      </p>
                      
                      {/* Subtle action button */}
                      <div style={{ marginTop: '16px', display: 'inline-flex', alignItems: 'center', gap: '8px', color: RED, fontWeight: '700', fontSize: '13px', transition: 'opacity 0.2s' }}>
                        Explore Publications <span style={{ fontSize: '16px' }}>→</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Placeholders for the other sidebar tabs */}
          {activeTab !== 'groups' && (
            <div style={{ animation: 'fadeIn 0.3s ease-out', textAlign: 'center', padding: '100px 0', border: '2px dashed #eaeaea', borderRadius: '16px', background: '#fff' }}>
              <span style={{ fontSize: '40px', display: 'block', marginBottom: '16px' }}>🚧</span>
              <h2 style={{ margin: '0 0 8px', color: NAVY, textTransform: 'capitalize' }}>{activeTab} Section</h2>
              <p style={{ color: GREY }}>This section is currently being updated by the department.</p>
            </div>
          )}

        </main>
      </div>

      {/* FOOTER */}
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
        </div>
      </footer>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}