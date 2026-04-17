import React from 'react';
import { useNavigate } from 'react-router-dom';
import muLogo from '../assets/MU_Logo.jpg';

const NAVY = '#1e2a6e';
const RED  = '#e31e24';

export default function VisionMission() {
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
        backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Dark Navy Overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10, 18, 48, 0.75)' }} />
        
        {/* Text */}
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: '#fff' }}>
          <h1 style={{ margin: '0 0 12px', fontSize: '48px', fontWeight: '900', letterSpacing: '1px', fontFamily: 'Segoe UI, sans-serif' }}>
            Vision, Mission & Strategy
          </h1>
          <p style={{ margin: 0, fontSize: '18px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.5px' }}>
            Metropolitan University Vision, Mission & Strategy
          </p>
        </div>
      </div>

      {/* ── MAIN CONTENT OVERLAPPING CARD ── */}
      <div style={{ maxWidth: '900px', margin: '-40px auto 80px', position: 'relative', zIndex: 2 }}>
        <div style={{ background: '#fff', borderRadius: '8px', padding: '60px 80px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          
          {/* VISION */}
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: NAVY, marginBottom: '16px' }}>Vision</h2>
          <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.8, marginBottom: '40px' }}>
            Metropolitan University will be and remain a center of excellence in higher education. It will gain recognition, nationally and globally and will attract students, faculty, and staff from all parts of the world.
          </p>

          {/* MISSION */}
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: NAVY, marginBottom: '16px' }}>Mission</h2>
          <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.8, marginBottom: '16px' }}>
            The mission of Metropolitan University is to produce competent graduates in their selected disciplines who will have productive careers or choose to engage in advanced studies.
          </p>
          <p style={{ fontSize: '15px', fontWeight: '700', color: '#333', marginBottom: '12px' }}>Our students will be:</p>
          <ol style={{ fontSize: '15px', color: '#555', lineHeight: 1.8, paddingLeft: '20px', marginBottom: '40px' }}>
            <li style={{ paddingLeft: '8px', marginBottom: '8px' }}>Ethical professionals with strong leadership skills</li>
            <li style={{ paddingLeft: '8px', marginBottom: '8px' }}>Innovative problem solvers in their respective fields</li>
            <li style={{ paddingLeft: '8px', marginBottom: '8px' }}>Lifelong learners dedicated to continuous growth</li>
            <li style={{ paddingLeft: '8px', marginBottom: '8px' }}>Effective communicators in diverse environments</li>
            <li style={{ paddingLeft: '8px', marginBottom: '8px' }}>Active contributors to the national economy</li>
            <li style={{ paddingLeft: '8px', marginBottom: '8px' }}>Globally aware with commitment to social justice and sustainability</li>
          </ol>

          {/* STRATEGY */}
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: NAVY, marginBottom: '16px' }}>Strategy</h2>
          <p style={{ fontSize: '15px', fontWeight: '700', color: '#333', marginBottom: '12px' }}>The university aims at:</p>
          <ol style={{ fontSize: '15px', color: '#555', lineHeight: 1.8, paddingLeft: '20px', marginBottom: '40px' }}>
            <li style={{ paddingLeft: '8px', marginBottom: '8px' }}>Offering socially relevant academic programs consisting of a substantial general education component in all undergraduate programs</li>
            <li style={{ paddingLeft: '8px', marginBottom: '8px' }}>Recruiting and retaining good students, well-trained faculty with graduate degrees from overseas and qualified staff</li>
            <li style={{ paddingLeft: '8px', marginBottom: '8px' }}>Promoting effective teaching, quality research, and service</li>
            <li style={{ paddingLeft: '8px', marginBottom: '8px' }}>Providing appropriate physical facilities including classroom, labs and library with state of the art educational technology;</li>
            <li style={{ paddingLeft: '8px', marginBottom: '8px' }}>Supporting co-curricular and extra-curricular activities</li>
            <li style={{ paddingLeft: '8px', marginBottom: '8px' }}>Practicing good governance and administration that encourage academic freedom and faculty-staff participation and</li>
            <li style={{ paddingLeft: '8px', marginBottom: '8px' }}>Purposeful engagement of our alumni and community leaders.</li>
          </ol>

          <p style={{ fontSize: '15px', fontWeight: '700', color: NAVY, marginTop: '60px' }}>
            - Approved by the Board of Trustees on September 30, 2024
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