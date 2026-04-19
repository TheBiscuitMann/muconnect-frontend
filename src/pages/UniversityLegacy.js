import React from 'react';
import { useNavigate } from 'react-router-dom';
import muLogo from '../assets/MU_Logo.jpg';
import realBanner from '../assets/mu_banner.jpg';

const NAVY = '#1e2a6e';
const RED  = '#e31e24';

const milestones = [
  { year: '2003', title: 'Foundation Stone', desc: 'Metropolitan University was established by Dr. Toufique Rahman Chowdhury, aiming to transform the educational landscape of Sylhet.' },
  { year: '2010', title: 'Expansion & Growth', desc: 'A decade of rapid growth led to the expansion of our departments, specifically our high-performing School of Science & Technology.' },
  { year: '2018', title: 'The Bateshwar Era', desc: 'Moving to our permanent campus at Bateshwar was a turning point, providing students with world-class labs and a serene learning environment.' },
  { year: '2024', title: 'Permanent Charter', desc: 'MU received its official Permanent Charter from the Government of Bangladesh, a testament to our decades of excellence.' }
];

export default function UniversityLegacy() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", color: NAVY, background: '#fff' }}>
      {/* NAVBAR */}
      <nav style={{ height: '85px', padding: '0 60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #eee' }}>
        <img src={muLogo} alt="MU" style={{ height: '65px', cursor: 'pointer' }} onClick={() => navigate('/')} />
        <button onClick={() => navigate('/')} style={{ background: 'none', border: `1.5px solid ${NAVY}`, padding: '8px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Back Home</button>
      </nav>

      {/* CONTENT */}
      <div style={{ padding: '100px 60px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '64px', fontWeight: '900', marginBottom: '40px', letterSpacing: '-2px' }}>The Legacy of MU</h1>
        <div style={{ display: 'grid', gap: '40px' }}>
          {milestones.map((m, i) => (
            <div key={i} style={{ borderLeft: `4px solid ${i % 2 === 0 ? RED : NAVY}`, paddingLeft: '30px' }}>
              <h2 style={{ fontSize: '32px', color: i % 2 === 0 ? RED : NAVY, margin: '0 0 10px' }}>{m.year}: {m.title}</h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#555', maxWidth: '800px' }}>{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}