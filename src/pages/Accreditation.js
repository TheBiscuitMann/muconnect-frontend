import React from 'react';
import { useNavigate } from 'react-router-dom';
import muLogo from '../assets/MU_Logo.jpg';

const NAVY = '#1e2a6e';
const RED  = '#e31e24';

const ACCREDITATIONS = [
  {
    title: 'Ministry of Education',
    abbr: 'MoE',
    desc: 'The apex policy making institution of the Government regarding administration and development of post-primary education sector. Ministry of Education formulates policies and programs for the development of post-primary to higher education including Madrasah, Technical and Vocational education.',
    color: '#059669'
  },
  {
    title: 'The University Grants Commission (UGC)',
    abbr: 'UGC',
    desc: 'The statutory apex body in the field of higher education in Bangladesh. The primary objectives of the UGC are to supervise, maintain, promote and coordinate university education. It is also responsible for maintaining standard and quality in all the public and private universities in Bangladesh.',
    color: NAVY
  },
  {
    title: 'Tertiary Education Quality Initiative',
    abbr: 'TEQI',
    desc: 'To meet the globalization challenges raising higher education quality to the world standard is essential. Bangladesh Govt. has taken initiatives to develop the quality of tertiary education. Govt. plans to prepare university graduates in such way that they can successfully compete in the context of international knowledge society.',
    color: '#7c3aed'
  },
  {
    title: 'The Association of Commonwealth Universities (ACU)',
    abbr: 'ACU',
    desc: 'The world’s first international university network, established in 1913. A UK-registered charity, the ACU has more than 500 member institutions in over 50 countries.',
    color: '#2563eb'
  },
  {
    title: 'Birmingham City University',
    abbr: 'BCU',
    desc: 'With around 24,000 students from 80 countries, Birmingham City University is a large, diverse and increasingly popular place to study. They put students at the heart of everything they do, giving them the best opportunities for future success.',
    color: '#d97706'
  },
  {
    title: 'ASIC',
    abbr: 'ASIC',
    desc: 'ASIC is an independent body specialising in the accreditation of schools, colleges, universities, training organisations and online and distance education providers worldwide. The mission of ASIC is to examine the institution as a whole along with the content and delivery of the courses and ensure that the required standards are being met.',
    color: NAVY
  },
  {
    title: 'International Academic and Management Association (IAMA)',
    abbr: 'IAMA',
    desc: 'A voluntary, membership based non-government body of educational institutes, corporate organizations and individual professionals. The Association came into existence in the year 2013 and is registered as a not-for-profit trust under the Indian Trust Act, 1882.',
    color: '#0284c7'
  },
  {
    title: 'The University of Portsmouth',
    abbr: 'UoP',
    desc: 'The University of Portsmouth is a public university in Portsmouth, England. It is one of only four universities in the South East of England rated as Gold in the Government’s Teaching Excellence Framework.',
    color: '#9333ea'
  }
];

export default function Accreditation() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", color: NAVY, background: '#f7f8fc', minHeight: '100vh', paddingBottom: '100px' }}>
      
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
        backgroundImage: 'url("https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10, 18, 48, 0.8)' }} />
        
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: '#fff' }}>
          <h1 style={{ margin: '0 0 12px', fontSize: '48px', fontWeight: '900', letterSpacing: '1px', fontFamily: 'Segoe UI, sans-serif' }}>
            Accreditation
          </h1>
          <p style={{ margin: 0, fontSize: '18px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.5px' }}>
            Accreditation, Membership & Collaboration
          </p>
        </div>
      </div>

      {/* ── MAIN CONTENT OVERLAPPING CARD ── */}
      <div style={{ maxWidth: '1000px', margin: '-40px auto 0', position: 'relative', zIndex: 2 }}>
        <div style={{ background: '#fff', borderRadius: '8px', padding: '60px 80px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          
          {/* Engineering Intro */}
          <div style={{ marginBottom: '60px' }}>
            <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.8, marginBottom: '20px' }}>
              The engineering programs i) Computer Science and Engineering (CSE) ii) Electrical and Electronics Engineering (EEE) and iii) Civil and Environmental Engineering (CEE) are accredited by the Board of Accreditation for Engineering and Technical Education (BAETE) of the Institution of Engineers, Bangladesh (<strong>IEB</strong>), a full signatory of the Washington Accord from June 13, 2023.
            </p>
            <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.8, marginBottom: '20px' }}>
              Computer Science and Engineering (CSE) and Electrical and Electronics Engineering (EEE) first got their accreditation from <strong>BAETE</strong> on May 21, 2017 under accreditation manual v0. Both of these programs later on applied and received accreditation under accreditation manual v1.
            </p>
            <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.8 }}>
              Bachelor of Science in Civil and Environmental Engineering (BS-CEE) program is the first of its kind in Bangladesh to be accredited under Outcome Based Accreditation (<strong>OBA</strong>) manual of BAETE. The BSCEE program has officially been accredited by IEB with effect from January 2019.
            </p>
          </div>

          {/* Section Heading */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
            <div style={{ background: RED, borderRadius: '8px', padding: '10px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontSize: '20px' }}>📄</span>
            </div>
            <h2 style={{ margin: 0, fontSize: '28px', fontWeight: '800', color: NAVY, fontFamily: 'Segoe UI, sans-serif', letterSpacing: '-0.5px' }}>
              Accreditation, Membership & Collaboration
            </h2>
          </div>

          <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.8, marginBottom: '20px' }}>
            Metropolitan University is approved by the <strong>Ministry of Education</strong> of the People's Republic of Bangladesh and the <strong>University Grants Commission</strong> of Bangladesh. Honourable President of the People's Republic of Bangladesh is the Chancellor of the University.
          </p>
          <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.8, marginBottom: '60px' }}>
            Renowned international organisations and institutions have recognised and accepted Metropolitan University for showing excellent performance in dissemination of knowledge. Metropolitan University is approved by and affiliated to a number of renowned international entities. These entities are on fully collaborative terms with the university.
          </p>

          {/* List of Accreditations */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {ACCREDITATIONS.map((item, index) => (
              <div key={index} style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                
                {/* Logo Placeholder */}
                <div style={{ 
                  width: '80px', height: '80px', flexShrink: 0, 
                  background: `${item.color}15`, border: `1px solid ${item.color}30`, borderRadius: '12px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '24px', fontWeight: '900', color: item.color, fontFamily: 'Georgia, serif' }}>
                    {item.abbr}
                  </span>
                </div>

                {/* Text Content */}
                <div>
                  <h3 style={{ margin: '0 0 12px', fontSize: '18px', fontWeight: '700', color: '#6b21a8' }}>
                    {item.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: '15px', color: '#555', lineHeight: 1.7 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
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