import React from 'react';
import { useNavigate } from 'react-router-dom';
import muLogo from '../assets/MU_Logo.jpg';
import muBanner from '../assets/mu_banner.jpg'; // Your real banner for the top!
import muCamp from '../assets/mu_camp.jpg';     // Your real campus picture for the text!

const NAVY = '#1e2a6e';
const RED  = '#e31e24';
const GREY = '#6b7280';

export default function BriefHistory() {
  const navigate = useNavigate();

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

      {/* ── HERO BANNER ── */}
      <div style={{
        position: 'relative', height: '350px',
        backgroundImage: `url(${muBanner})`, // ✨ Swapped to your real banner!
        backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Dark Navy Overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10, 18, 48, 0.75)' }} />
        
        {/* Text */}
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: '#fff' }}>
          <h1 style={{ margin: '0 0 12px', fontSize: '48px', fontWeight: '900', letterSpacing: '2px', fontFamily: 'Georgia, serif' }}>
            A BRIEF HISTORY
          </h1>
          <p style={{ margin: 0, fontSize: '18px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.5px' }}>
            About Metropolitan University
          </p>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 40px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '60px' }}>
        
        {/* LEFT COLUMN: History Text & Image */}
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: NAVY, marginBottom: '20px', fontFamily: 'Georgia, serif' }}>
            Brief History
          </h2>
          <p style={{ fontSize: '16px', color: '#444', lineHeight: 1.8, marginBottom: '20px' }}>
            <strong>Metropolitan University (MU)</strong> was established in 2003 by Dr. Toufique Rahman Chowdhury, a visionary educationist, with the goal of providing high-quality, modern, and affordable education in the Sylhet region. Recognized by the University Grants Commission (UGC) of Bangladesh, MU has grown from a humble beginning into one of the most prestigious private universities in the country.
          </p>
          <p style={{ fontSize: '16px', color: '#444', lineHeight: 1.8, marginBottom: '20px' }}>
            In 2018, the university shifted to its permanent, state-of-the-art campus located in Bateshwar, Sylhet. Surrounded by lush greenery, the campus provides an ideal environment for academic pursuit and research.
          </p>
          <p style={{ fontSize: '16px', color: '#444', lineHeight: 1.8, marginBottom: '40px' }}>
            A major milestone was achieved in 2024 when Metropolitan University became the <strong>first private university in Sylhet to be permanently chartered</strong> by the Government of Bangladesh, cementing its legacy as an institution of uncompromising academic integrity.
          </p>

          {/* ✨ SWAPPED TO YOUR mu_camp IMAGE ✨ */}
          <img 
            src={muCamp} 
            alt="Metropolitan University Campus" 
            style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} 
          />
        </div>

        {/* RIGHT COLUMN: Key Facts Card */}
        <div>
          <div style={{ background: NAVY, borderRadius: '12px', padding: '32px', color: '#fff', position: 'sticky', top: '100px', boxShadow: '0 12px 32px rgba(30,42,110,0.2)' }}>
            <h3 style={{ margin: '0 0 20px', fontSize: '20px', fontWeight: '800', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '16px', fontFamily: 'Georgia, serif' }}>
              Key facts
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <p style={{ margin: '0 0 4px', fontSize: '12px', fontWeight: '700', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>Established</p>
                <p style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>2003</p>
              </div>
              <div>
                <p style={{ margin: '0 0 4px', fontSize: '12px', fontWeight: '700', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>Founder & Chairman</p>
                <p style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>Dr. Toufique Rahman Chowdhury</p>
              </div>
              <div>
                <p style={{ margin: '0 0 4px', fontSize: '12px', fontWeight: '700', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>Status</p>
                <p style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#4ade80' }}>Permanently Chartered</p>
              </div>
              <div>
                <p style={{ margin: '0 0 4px', fontSize: '12px', fontWeight: '700', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>Location</p>
                <p style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>Bateshwar, Sylhet</p>
              </div>
            </div>
          </div>
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
    </div>
  );
}