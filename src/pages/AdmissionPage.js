import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import muLogo from '../assets/MU_Logo.jpg';
import realBanner from '../assets/mu_banner.jpg';

const NAVY = '#1e2a6e';
const RED  = '#e31e24';

export default function AdmissionPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // This dynamically takes the URL (like "/admission/apply-now") and formats it into a beautiful title ("Apply Now")!
  const rawPath = location.pathname.split('/').pop();
  const pageTitle = rawPath.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", color: NAVY, background: '#fafbfc', minHeight: '100vh' }}>
      
      {/* MINIMAL NAVBAR */}
      <nav style={{ height: '85px', padding: '0 60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0', background: '#fff', position: 'sticky', top: 0, zIndex: 100 }}>
        <div onClick={() => navigate('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <img src={muLogo} alt="MU" style={{ height: '65px', objectFit: 'contain' }} />
        </div>
        <button onClick={() => navigate('/')} style={{ background: 'transparent', border: `1.5px solid ${NAVY}30`, color: NAVY, padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
          ← Back to Home
        </button>
      </nav>

      {/* HERO BANNER */}
      <div style={{ position: 'relative', height: '300px', backgroundImage: `url(${realBanner})`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, ${NAVY}, rgba(30, 42, 110, 0.7))` }} />
        <h1 style={{ position: 'relative', zIndex: 1, color: '#fff', fontSize: '48px', fontWeight: '900', letterSpacing: '-1px', margin: 0 }}>
          {pageTitle}
        </h1>
      </div>

      {/* MAIN CONTENT PLACEHOLDER */}
      <div style={{ maxWidth: '800px', margin: '80px auto', background: '#fff', padding: '60px', borderRadius: '16px', boxShadow: '0 12px 32px rgba(0,0,0,0.05)', textAlign: 'center' }}>
        <span style={{ fontSize: '48px', display: 'block', marginBottom: '24px' }}>🎓</span>
        <h2 style={{ fontSize: '28px', color: NAVY, marginBottom: '16px' }}>Welcome to the {pageTitle} portal.</h2>
        <p style={{ fontSize: '16px', color: '#666', lineHeight: 1.8 }}>
          This section is currently being updated by the Metropolitan University Admissions Office for the upcoming semester. Please check back shortly for full details, forms, and deadlines.
        </p>
      </div>

    </div>
  );
}