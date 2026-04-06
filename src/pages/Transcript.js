import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import API from '../services/api';

const NAVY = '#1e2a6e';
const RED  = '#e31e24';
const GREY = '#6b7280';

function NavItem({ icon, label, active, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onClick={onClick}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        padding: '11px 16px', borderRadius: '10px', cursor: 'pointer',
        background: active ? NAVY : hovered ? '#f0f3ff' : 'transparent',
        color: active ? '#fff' : hovered ? NAVY : GREY,
        transition: 'all 0.2s', marginBottom: '2px',
        borderLeft: active ? `3px solid ${RED}` : '3px solid transparent',
      }}>
      <span style={{ fontSize: '18px', width: '22px', textAlign: 'center' }}>{icon}</span>
      <span style={{ fontSize: '14px', fontWeight: active ? '700' : '500' }}>{label}</span>
      {active && <div style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: RED }} />}
    </div>
  );
}

function gradeColor(grade) {
  if (['A', 'A-'].includes(grade))       return '#16a34a';
  if (['B+', 'B', 'B-'].includes(grade)) return '#2563eb';
  if (['C+', 'C'].includes(grade))       return '#d97706';
  if (grade === 'D')                      return '#ea580c';
  if (grade === 'F')                      return RED;
  return GREY;
}

export default function Transcript() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [printing, setPrinting] = useState(false);

  useEffect(() => {
    API.get('/student/transcript/')
      .then(res => setData(res.data))
      .catch(() => navigate('/login'))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handlePrint = () => {
    setPrinting(true);
    setTimeout(() => { window.print(); setPrinting(false); }, 300);
  };

  const navItems = [
    { icon: '🏠', label: 'Dashboard',  path: '/student/dashboard' },
    { icon: '📊', label: 'My Results', path: '/student/results' },
    { icon: '📄', label: 'Transcript', path: '/student/transcript' },
    { icon: '👤', label: 'Profile',    path: '/student/profile' },
  ];

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f8fc' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '48px', height: '48px', border: `3px solid ${NAVY}20`, borderTopColor: NAVY, borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 0.8s linear infinite' }} />
        <p style={{ color: GREY, fontSize: '14px' }}>Loading transcript...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );

  const student  = data?.student;
  const semesters = data?.semesters || [];
  const totalCredits = semesters.reduce((acc, s) => acc + s.courses.reduce((a, c) => a + c.credit, 0), 0);
  const totalCourses = semesters.reduce((acc, s) => acc + s.courses.length, 0);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f7f8fc', fontFamily: 'Segoe UI, sans-serif' }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media print {
          .no-print { display: none !important; }
          .print-area { box-shadow: none !important; border: none !important; margin: 0 !important; }
          body { background: #fff !important; }
        }
      `}</style>

      {/* ── SIDEBAR ── */}
      <div className="no-print" style={{
        width: '240px', flexShrink: 0, background: '#fff',
        borderRight: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column',
        padding: '24px 16px', boxShadow: '2px 0 12px rgba(30,42,110,0.04)',
        position: 'sticky', top: 0, height: '100vh', overflowY: 'auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 8px 24px', borderBottom: '1px solid #f5f5f5', marginBottom: '16px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: NAVY, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '14px', color: '#fff' }}>MU</div>
          <div>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: NAVY }}>MU Connect</p>
            <p style={{ margin: 0, fontSize: '11px', color: GREY }}>Student Portal</p>
          </div>
        </div>

        <div style={{ padding: '14px', background: '#f7f8fc', borderRadius: '12px', marginBottom: '20px', border: '1px solid #eee', textAlign: 'center' }}>
          <p style={{ margin: '0 0 4px', fontSize: '11px', color: GREY, textTransform: 'uppercase', letterSpacing: '1px' }}>Overall CGPA</p>
          <p style={{ margin: 0, fontSize: '36px', fontWeight: '900', color: NAVY, fontFamily: 'Georgia, serif', letterSpacing: '-2px' }}>{student?.cgpa}</p>
          <div style={{ height: '6px', background: '#f0f0f0', borderRadius: '3px', margin: '10px 0 6px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${Math.min((parseFloat(student?.cgpa) / 4.0) * 100, 100)}%`, background: `linear-gradient(90deg, ${NAVY}, ${RED})`, borderRadius: '3px' }} />
          </div>
          <p style={{ margin: 0, fontSize: '11px', color: GREY }}>Out of 4.00</p>
        </div>

        <p style={{ margin: '0 0 8px 8px', fontSize: '10px', fontWeight: '700', color: '#ccc', letterSpacing: '2px', textTransform: 'uppercase' }}>Menu</p>
        <nav style={{ flex: 1 }}>
          {navItems.map(item => (
            <NavItem key={item.path} icon={item.icon} label={item.label}
              active={location.pathname === item.path}
              onClick={() => navigate(item.path)} />
          ))}
        </nav>

        <div style={{ borderTop: '1px solid #f5f5f5', paddingTop: '16px' }}>
          <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', borderRadius: '10px', cursor: 'pointer', color: GREY, marginBottom: '4px' }}
            onMouseOver={e => { e.currentTarget.style.background = '#f7f8fc'; e.currentTarget.style.color = NAVY; }}
            onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = GREY; }}>
            <span>🌐</span><span style={{ fontSize: '13px', fontWeight: '500' }}>Main Website</span>
          </div>
          <div onClick={() => { localStorage.clear(); navigate('/login'); }} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', borderRadius: '10px', cursor: 'pointer', color: RED }}
            onMouseOver={e => e.currentTarget.style.background = '#fff0f0'}
            onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
            <span>🚪</span><span style={{ fontSize: '13px', fontWeight: '600' }}>Logout</span>
          </div>
        </div>
      </div>

      {/* ── MAIN ── */}
      <div style={{ flex: 1, overflow: 'auto' }}>

        {/* Top bar */}
        <div className="no-print" style={{
          background: '#fff', borderBottom: '1px solid #f0f0f0',
          padding: '16px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 8px rgba(30,42,110,0.04)',
        }}>
          <div>
            <p style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: NAVY, fontFamily: 'Georgia, serif' }}>Academic Transcript</p>
            <p style={{ margin: 0, fontSize: '13px', color: GREY }}>{totalCourses} courses · {totalCredits} total credits · {semesters.length} semesters</p>
          </div>
          <button onClick={handlePrint} disabled={printing} style={{
            padding: '10px 24px', borderRadius: '8px', fontSize: '13px',
            fontWeight: '700', cursor: 'pointer', border: 'none',
            background: NAVY, color: '#fff', transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}
            onMouseOver={e => e.currentTarget.style.background = RED}
            onMouseOut={e => e.currentTarget.style.background = NAVY}
          >
            🖨️ {printing ? 'Preparing...' : 'Print / Save PDF'}
          </button>
        </div>

        <div style={{ padding: '32px 36px' }}>

          {/* ── TRANSCRIPT DOCUMENT ── */}
          <div className="print-area" style={{
            background: '#fff', borderRadius: '16px', overflow: 'hidden',
            boxShadow: '0 2px 24px rgba(30,42,110,0.08)', border: '1px solid #f0f0f0',
            maxWidth: '900px', margin: '0 auto',
          }}>

            {/* Header */}
            <div style={{ background: NAVY, padding: '40px 48px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '5px', background: RED }} />
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ margin: '0 0 4px', fontSize: '11px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
                    Official Academic Record
                  </p>
                  <h1 style={{ margin: '0 0 6px', fontSize: '32px', fontWeight: '900', color: '#fff', fontFamily: 'Georgia, serif', letterSpacing: '-1px' }}>
                    Metropolitan University
                  </h1>
                  <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.55)' }}>Bateshwar, Sylhet, Bangladesh</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '16px 24px' }}>
                    <p style={{ margin: '0 0 4px', fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Cumulative GPA</p>
                    <p style={{ margin: 0, fontSize: '40px', fontWeight: '900', color: '#fff', fontFamily: 'Georgia, serif', letterSpacing: '-2px', lineHeight: 1 }}>{student?.cgpa}</p>
                    <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>Out of 4.00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Student info */}
            <div style={{ padding: '28px 48px', borderBottom: '1px solid #f0f0f0', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', background: '#fafbfc' }}>
              {[
                { label: 'Student Name',   value: student?.name },
                { label: 'Student ID',     value: student?.student_id },
                { label: 'Department',     value: student?.department },
                { label: 'Batch',          value: student?.batch },
                { label: 'Current Semester', value: `Semester ${student?.current_semester}` },
                { label: 'Credits Earned', value: `${student?.credits_earned} credits` },
              ].map((item, i) => (
                <div key={i}>
                  <p style={{ margin: '0 0 4px', fontSize: '11px', fontWeight: '700', color: GREY, textTransform: 'uppercase', letterSpacing: '1px' }}>{item.label}</p>
                  <p style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: NAVY }}>{item.value}</p>
                </div>
              ))}
            </div>

            {/* Semester results */}
            <div style={{ padding: '32px 48px' }}>
              {semesters.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px', color: GREY }}>
                  <p style={{ fontSize: '48px', margin: '0 0 16px' }}>📭</p>
                  <p style={{ fontSize: '16px', fontWeight: '600' }}>No published results yet</p>
                </div>
              ) : (
                semesters.map((sem, semIdx) => (
                  <div key={semIdx} style={{ marginBottom: semIdx < semesters.length - 1 ? '36px' : 0 }}>

                    {/* Semester header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', paddingBottom: '10px', borderBottom: `2px solid ${NAVY}10` }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '4px', height: '20px', background: RED, borderRadius: '2px' }} />
                        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: NAVY, fontFamily: 'Georgia, serif' }}>{sem.semester}</h3>
                      </div>
                      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <div style={{ textAlign: 'right' }}>
                          <p style={{ margin: 0, fontSize: '11px', color: GREY, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Semester GPA</p>
                          <p style={{ margin: 0, fontSize: '20px', fontWeight: '900', color: NAVY, fontFamily: 'Georgia, serif', letterSpacing: '-0.5px' }}>{sem.gpa}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <p style={{ margin: 0, fontSize: '11px', color: GREY, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Credits</p>
                          <p style={{ margin: 0, fontSize: '20px', fontWeight: '900', color: NAVY, fontFamily: 'Georgia, serif', letterSpacing: '-0.5px' }}>
                            {sem.courses.reduce((a, c) => a + c.credit, 0)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Course table */}
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                      <thead>
                        <tr style={{ background: '#f7f8fc' }}>
                          {['Course Code', 'Course Title', 'Credit', 'Marks', 'Grade', 'Grade Point'].map(h => (
                            <th key={h} style={{ padding: '10px 14px', textAlign: h === 'Course Title' ? 'left' : 'center', fontSize: '11px', fontWeight: '700', color: GREY, textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid #eee' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {sem.courses.map((course, ci) => (
                          <tr key={ci} style={{ borderBottom: '1px solid #f5f5f5', background: ci % 2 === 0 ? '#fff' : '#fafbfc' }}>
                            <td style={{ padding: '12px 14px', textAlign: 'center', fontWeight: '700', color: NAVY, fontSize: '12px', letterSpacing: '0.3px' }}>{course.code}</td>
                            <td style={{ padding: '12px 14px', fontWeight: '500', color: '#333' }}>{course.title}</td>
                            <td style={{ padding: '12px 14px', textAlign: 'center', color: GREY }}>{course.credit}</td>
                            <td style={{ padding: '12px 14px', textAlign: 'center', fontWeight: '600', color: '#333' }}>{course.marks}</td>
                            <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                              <span style={{ fontWeight: '800', fontSize: '14px', color: gradeColor(course.grade), background: `${gradeColor(course.grade)}15`, padding: '3px 10px', borderRadius: '4px' }}>
                                {course.grade}
                              </span>
                            </td>
                            <td style={{ padding: '12px 14px', textAlign: 'center', fontWeight: '700', color: gradeColor(course.grade) }}>{course.grade_point}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))
              )}

              {/* Summary footer */}
              {semesters.length > 0 && (
                <div style={{ marginTop: '36px', padding: '24px 28px', background: `${NAVY}06`, borderRadius: '12px', border: `1px solid ${NAVY}12`, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                  {[
                    { label: 'Total Semesters',  value: semesters.length },
                    { label: 'Total Courses',    value: totalCourses },
                    { label: 'Credits Earned',   value: student?.credits_earned },
                    { label: 'Cumulative GPA',   value: student?.cgpa },
                  ].map((s, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <p style={{ margin: '0 0 4px', fontSize: '11px', fontWeight: '700', color: GREY, textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</p>
                      <p style={{ margin: 0, fontSize: '28px', fontWeight: '900', color: i === 3 ? RED : NAVY, fontFamily: 'Georgia, serif', letterSpacing: '-1px' }}>{s.value}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Official stamp area */}
              <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <p style={{ margin: '0 0 4px', fontSize: '11px', color: GREY }}>Generated on</p>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: NAVY }}>{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '120px', height: '1px', background: '#ddd', marginBottom: '8px' }} />
                  <p style={{ margin: 0, fontSize: '11px', color: GREY }}>Registrar's Signature</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#f0f3ff', border: `1px solid ${NAVY}20`, padding: '6px 14px', borderRadius: '6px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16a34a' }} />
                    <span style={{ fontSize: '11px', fontWeight: '700', color: NAVY, letterSpacing: '0.5px' }}>OFFICIAL DOCUMENT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}