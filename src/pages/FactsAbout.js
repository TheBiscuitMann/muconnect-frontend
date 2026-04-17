import React from 'react';
import { useNavigate } from 'react-router-dom';
import muLogo from '../assets/MU_Logo.jpg';

const NAVY = '#1e2a6e';
const RED  = '#e31e24';
const GREY = '#6b7280';

export default function FactsAbout() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", color: NAVY, background: '#f7f8fc', minHeight: '100vh' }}>
      
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
        position: 'relative', height: '350px',
        backgroundImage: 'url("https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Dark Navy Overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10, 18, 48, 0.75)' }} />
        
        {/* Text */}
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: '#fff' }}>
          <h1 style={{ margin: '0 0 12px', fontSize: '48px', fontWeight: '900', letterSpacing: '1px', fontFamily: 'Segoe UI, sans-serif' }}>
            Facts About MU
          </h1>
          <p style={{ margin: 0, fontSize: '18px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.5px' }}>
            Facts About Metropolitan University
          </p>
        </div>
      </div>

      {/* ── MAIN CONTENT OVERLAPPING CARD ── */}
      <div style={{ maxWidth: '1000px', margin: '-40px auto 80px', position: 'relative', zIndex: 2 }}>
        <div style={{ background: '#fff', borderRadius: '8px', padding: '60px 80px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          
          <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.8, marginBottom: '24px' }}>
            The foundation of Metropolitan University's permanent campus in Bateshwar, Sylhet, was a landmark moment in the institution's history. After its initial founding in 2003, the construction of the new campus superstructures was expedited, and the university officially shifted to its spacious new home in 2018. Set against a backdrop of beautifully landscaped, lush green hills, this impressive state-of-the-art campus stands out as an extraordinary architectural and educational landmark in the Sylhet region. The campus is designed to comfortably serve its growing population of over 6,000 active students.
          </p>

          <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.8, marginBottom: '24px' }}>
            Built according to a modern master plan, the complex is divided into highly functional major units. The administrative wings house the offices of the Board of Trustees, the Vice Chancellor, the Pro Vice Chancellor, the Treasurer, and the Registrar. Flanking these are the multi-storied academic buildings that accommodate the Schools of Science & Technology, Business & Economics, Law, and Humanities. 
          </p>
          
          <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.8 }}>
            The campus features state-of-the-art computer and engineering laboratories, a massive central library, digital classrooms, and extensive recreational facilities designed to foster both academic excellence and vibrant campus life. Furthermore, Metropolitan University holds the prestigious distinction of being the first permanently chartered private university in Sylhet, an honor officially granted by the Government of Bangladesh in 2024.
          </p>

        </div>
      </div>
      
      {/* ═══════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════ */}
      <footer style={{ background: '#0a1230', padding: '72px 60px 40px', borderTop: `4px solid ${RED}`, marginTop: '80px' }}>
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

          {/* Footer bottom */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.2)' }}>
              © 2026 Metropolitan University, Sylhet. All rights reserved.
            </p>
            {/* MU color bar */}
            <div style={{ display: 'flex', gap: '4px' }}>
              {['#6b7280', RED, NAVY].map((c, i) => (
                <div key={i} style={{ width: '28px', height: '4px', background: c, borderRadius: '2px', opacity: i === 1 ? 1 : 0.5 }} />
              ))}
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.2)' }}>
              Permanently Chartered · Government of Bangladesh
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}