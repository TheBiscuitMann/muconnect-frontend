import React from 'react';
import { useNavigate } from 'react-router-dom';
import muLogo from '../assets/MU_Logo.jpg';

const NAVY = '#1e2a6e';
const RED  = '#e31e24';
const GREY = '#6b7280';

export default function Contact() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", color: NAVY, background: '#fafbfc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* ── NAVBAR ── */}
      <nav style={{ height: '85px', padding: '0 60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #eaeaea', background: '#fff', position: 'sticky', top: 0, zIndex: 100 }}>
        <div onClick={() => navigate('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <img src={muLogo} alt="MU" style={{ height: '65px', objectFit: 'contain' }} />
        </div>
        <button onClick={() => navigate('/')} style={{ background: 'transparent', border: `1.5px solid ${NAVY}30`, color: NAVY, padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}
          onMouseOver={e => { e.currentTarget.style.background = NAVY; e.currentTarget.style.color = '#fff'; }}
          onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = NAVY; }}
        >
          ← Back to Home
        </button>
      </nav>

      {/* ── HERO BANNER ── */}
      <div style={{ background: NAVY, color: '#fff', padding: '80px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(circle, #fff 2px, transparent 2px)', backgroundSize: '32px 32px' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '56px', fontWeight: '900', letterSpacing: '-2px', margin: '0 0 16px', lineHeight: 1.1 }}>
            Let's Start a<br />Conversation.
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, margin: 0 }}>
            Whether you are a prospective student, an alumni, or just curious about Metropolitan University, we are here to help.
          </p>
        </div>
      </div>

      {/* ── MAIN CONTENT GRID ── */}
      <div style={{ flex: 1, maxWidth: '1300px', margin: '0 auto', padding: '80px 60px', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' }}>
        
        {/* Left Side: Directory Grid */}
        <div>
          <h2 style={{ fontSize: '32px', fontWeight: '900', color: NAVY, marginBottom: '8px', letterSpacing: '-1px' }}>Direct Contacts</h2>
          <p style={{ fontSize: '16px', color: GREY, marginBottom: '40px' }}>Reach out directly to the department you need.</p>
          
          <div style={{ display: 'grid', gap: '24px' }}>
            {[
              { icon: '🎓', title: 'Admissions Office', desc: 'For questions about applications, requirements, and enrollment.', email: 'admissions@metrouni.edu.bd', phone: '+880-1234-567890' },
              { icon: '🏛️', title: 'Registrar\'s Office', desc: 'For transcripts, academic records, and official university documentation.', email: 'registrar@metrouni.edu.bd', phone: '+880-1234-567891' },
              { icon: '💻', title: 'IT Support', desc: 'For issues with the Student Portal, email access, or campus Wi-Fi.', email: 'it.support@metrouni.edu.bd', phone: '+880-1234-567892' }
            ].map((contact, i) => (
              <div key={i} style={{ background: '#fff', padding: '32px', borderRadius: '16px', border: '1px solid #eaeaea', display: 'flex', gap: '20px', transition: 'all 0.3s ease', cursor: 'default', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateX(8px)'; e.currentTarget.style.borderColor = `${NAVY}40`; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.borderColor = '#eaeaea'; }}
              >
                <div style={{ fontSize: '32px', background: '#f5f7ff', width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {contact.icon}
                </div>
                <div>
                  <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: '800', color: NAVY }}>{contact.title}</h3>
                  <p style={{ margin: '0 0 16px', fontSize: '14px', color: GREY, lineHeight: 1.5 }}>{contact.desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: RED }}>✉️ {contact.email}</span>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: NAVY }}>📞 {contact.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Sleek Contact Form */}
        <div>
          <div style={{ background: '#fff', padding: '48px', borderRadius: '24px', boxShadow: '0 24px 48px rgba(30, 42, 110, 0.08)', border: '1px solid #f0f0f0' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: NAVY, marginBottom: '32px', letterSpacing: '-0.5px' }}>Send a Message</h2>
            
            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: GREY, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>First Name</label>
                  <input type="text" placeholder="John" style={{ width: '100%', padding: '14px 16px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px', fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }} onFocus={e => e.target.style.borderColor = NAVY} onBlur={e => e.target.style.borderColor = '#ddd'} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: GREY, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Last Name</label>
                  <input type="text" placeholder="Doe" style={{ width: '100%', padding: '14px 16px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px', fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }} onFocus={e => e.target.style.borderColor = NAVY} onBlur={e => e.target.style.borderColor = '#ddd'} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: GREY, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Email Address</label>
                <input type="email" placeholder="john@example.com" style={{ width: '100%', padding: '14px 16px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px', fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }} onFocus={e => e.target.style.borderColor = NAVY} onBlur={e => e.target.style.borderColor = '#ddd'} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: GREY, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>How can we help?</label>
                <textarea rows="5" placeholder="Type your message here..." style={{ width: '100%', padding: '14px 16px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px', fontFamily: 'inherit', boxSizing: 'border-box', resize: 'vertical', outline: 'none' }} onFocus={e => e.target.style.borderColor = NAVY} onBlur={e => e.target.style.borderColor = '#ddd'}></textarea>
              </div>

              <button type="submit" style={{ padding: '16px', borderRadius: '8px', background: RED, color: '#fff', fontSize: '15px', fontWeight: '700', border: 'none', cursor: 'pointer', marginTop: '10px', transition: 'all 0.2s ease', boxShadow: `0 8px 24px ${RED}40` }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 12px 32px ${RED}60`; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 24px ${RED}40`; }}
              >
                Send Message →
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* ── CAMPUS LOCATION STRIP ── */}
      <div style={{ background: '#fff', padding: '60px', borderTop: '1px solid #eaeaea' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '40px' }}>
          <div>
            <h3 style={{ margin: '0 0 12px', fontSize: '24px', fontWeight: '900', color: NAVY }}>Visit Our Campus</h3>
            <p style={{ margin: 0, fontSize: '16px', color: GREY, lineHeight: 1.6, maxWidth: '400px' }}>
              Metropolitan University<br/>
              Bateshwar, Sylhet-3104<br/>
              Bangladesh
            </p>
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ background: '#f5f7ff', padding: '20px 32px', borderRadius: '12px', border: `1px solid ${NAVY}20` }}>
              <p style={{ margin: '0 0 4px', fontSize: '12px', fontWeight: '700', color: GREY, textTransform: 'uppercase', letterSpacing: '1px' }}>General Inquiry</p>
              <p style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: NAVY }}>info@metrouni.edu.bd</p>
            </div>
            <div style={{ background: '#fff0f0', padding: '20px 32px', borderRadius: '12px', border: `1px solid ${RED}20` }}>
              <p style={{ margin: '0 0 4px', fontSize: '12px', fontWeight: '700', color: GREY, textTransform: 'uppercase', letterSpacing: '1px' }}>Emergency Campus Security</p>
              <p style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: RED }}>+880-1999-999999</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#0a1230', padding: '40px 60px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>© 2026 Metropolitan University, Sylhet. All rights reserved.</p>
        </div>
      </footer>
      
    </div>
  );
}