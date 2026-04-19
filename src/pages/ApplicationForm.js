import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import muLogo from '../assets/MU_Logo.jpg';

const NAVY = '#1e2a6e';
const RED  = '#e31e24';

export default function ApplicationForm() {
  const navigate = useNavigate();
  
  const { formType } = useParams();

  
  const isCseFest = formType === 'cse-fest';
  
  const title = isCseFest ? "CSE Fest 2026 Registration" : "Data Science Admission Application";
  const subtitle = isCseFest 
    ? "Join the ultimate tech showdown. Fill out your team details below." 
    : "Pioneer the future of AI. Apply for our inaugural B.Sc. in Data Science cohort.";
  const btnColor = isCseFest ? '#10b981' : '#8b5cf6'; // Emerald or Purple

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", color: NAVY, background: '#fafbfc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* NAVBAR */}
      <nav style={{ height: '85px', padding: '0 60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', borderBottom: '1px solid #eee' }}>
        <img src={muLogo} alt="MU" style={{ height: '65px', cursor: 'pointer' }} onClick={() => navigate('/')} />
        <button onClick={() => navigate('/')} style={{ background: 'transparent', border: `1.5px solid ${NAVY}30`, padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>← Back</button>
      </nav>

      {/* FORM CONTAINER */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
        <div style={{ background: '#fff', width: '100%', maxWidth: '600px', padding: '48px', borderRadius: '24px', boxShadow: '0 24px 48px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ width: '60px', height: '6px', background: btnColor, borderRadius: '4px', margin: '0 auto 24px' }} />
            <h1 style={{ fontSize: '32px', fontWeight: '900', margin: '0 0 12px', letterSpacing: '-1px' }}>{title}</h1>
            <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>{subtitle}</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); alert("Application Submitted Successfully!"); navigate('/'); }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#6b7280', marginBottom: '8px', textTransform: 'uppercase' }}>First Name</label>
                <input required type="text" placeholder="John" style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#6b7280', marginBottom: '8px', textTransform: 'uppercase' }}>Last Name</label>
                <input required type="text" placeholder="Doe" style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#6b7280', marginBottom: '8px', textTransform: 'uppercase' }}>Email Address</label>
              <input required type="email" placeholder="student@metrouni.edu.bd" style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px', boxSizing: 'border-box' }} />
            </div>

            {isCseFest && (
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#6b7280', marginBottom: '8px', textTransform: 'uppercase' }}>Team Name</label>
                <input required type="text" placeholder="e.g. Code Ninjas" style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px', boxSizing: 'border-box' }} />
              </div>
            )}

            <button type="submit" style={{ padding: '16px', borderRadius: '8px', background: btnColor, color: '#fff', fontSize: '16px', fontWeight: '800', border: 'none', cursor: 'pointer', marginTop: '10px', transition: 'transform 0.2s', boxShadow: `0 8px 24px ${btnColor}40` }}
              onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Submit Application →
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}