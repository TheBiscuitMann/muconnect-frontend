import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Results() {
  const navigate = useNavigate();
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/student/results/')
      .then(res => setData(res.data))
      .catch(() => navigate('/login'))
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) return <div style={styles.loading}>Loading results...</div>;

  return (
    <div style={styles.container}>

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.logoBox}>
          <span style={styles.logoText}>MU</span>
        </div>
        <p style={styles.sidebarTitle}>MU Connect</p>
        <nav>
          <div style={styles.navItem} onClick={() => navigate('/student/dashboard')}>Dashboard</div>
          <div style={styles.navItemActive}>My Results</div>
          <div style={styles.navItem}>Transcript</div>
          <div style={styles.navItem}>Notices</div>
          <div style={styles.navItem}>Profile</div>
        </nav>
        <div style={styles.logoutBtn} onClick={() => { localStorage.clear(); navigate('/login'); }}>
          Logout
        </div>
      </div>

      {/* Main */}
      <div style={styles.main}>
        <h2 style={styles.pageTitle}>My Results</h2>

        {/* CGPA banner */}
        <div style={styles.cgpaBanner}>
          <div>
            <p style={styles.cgpaLabel}>Cumulative GPA (CGPA)</p>
            <p style={styles.cgpaValue}>{data?.cgpa}</p>
          </div>
          <div style={styles.cgpaNote}>
            All published results
          </div>
        </div>

        {/* Semester results */}
        {data?.semesters?.length === 0 && (
          <div style={styles.empty}>No published results yet.</div>
        )}

        {data?.semesters?.map((sem, index) => (
          <div key={index} style={styles.semesterCard}>

            {/* Semester header */}
            <div style={styles.semHeader}>
              <span style={styles.semTitle}>{sem.semester}</span>
              <span style={styles.semGpa}>GPA: {sem.gpa}</span>
            </div>

            {/* Results table */}
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHead}>
                  <th style={styles.th}>Code</th>
                  <th style={styles.th}>Course Title</th>
                  <th style={styles.th}>Credit</th>
                  <th style={styles.th}>Marks</th>
                  <th style={styles.th}>Grade</th>
                  <th style={styles.th}>Grade Point</th>
                </tr>
              </thead>
              <tbody>
                {sem.courses.map((course, i) => (
                  <tr key={i} style={i % 2 === 0 ? styles.trEven : styles.trOdd}>
                    <td style={styles.td}>{course.code}</td>
                    <td style={styles.td}>{course.title}</td>
                    <td style={{...styles.td, textAlign: 'center'}}>{course.credit}</td>
                    <td style={{...styles.td, textAlign: 'center'}}>{course.marks}</td>
                    <td style={{...styles.td, textAlign: 'center'}}>
                      <span style={gradeStyle(course.grade)}>{course.grade}</span>
                    </td>
                    <td style={{...styles.td, textAlign: 'center', fontWeight: '600'}}>
                      {course.grade_point}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        ))}
      </div>
    </div>
  );
}

// Color the grade badge based on grade
const gradeStyle = (grade) => ({
  padding: '2px 10px',
  borderRadius: '12px',
  fontSize: '12px',
  fontWeight: '600',
  background: grade === 'A' || grade === 'A-' ? '#e6f4ea' :
              grade === 'B+' || grade === 'B'  ? '#e8f0fe' :
              grade === 'F'                     ? '#fce8e8' : '#fff8e1',
  color:      grade === 'A' || grade === 'A-' ? '#2e7d32' :
              grade === 'B+' || grade === 'B'  ? '#1a56db' :
              grade === 'F'                     ? '#c62828' : '#f57f17',
});

const styles = {
  container:    { display: 'flex', minHeight: '100vh', background: '#f0f4f8' },
  loading:      { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontSize: '18px' },
  sidebar:      { width: '200px', background: '#1a3a5c', color: '#fff', padding: '24px 16px', display: 'flex', flexDirection: 'column' },
  logoBox:      { width: '40px', height: '40px', background: '#fff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' },
  logoText:     { color: '#1a3a5c', fontWeight: 'bold', fontSize: '16px' },
  sidebarTitle: { color: '#fff', fontWeight: 'bold', fontSize: '16px', margin: '0 0 24px' },
  navItemActive:{ padding: '10px 12px', borderRadius: '6px', background: 'rgba(255,255,255,0.15)', marginBottom: '4px', cursor: 'pointer', fontSize: '14px' },
  navItem:      { padding: '10px 12px', borderRadius: '6px', marginBottom: '4px', cursor: 'pointer', fontSize: '14px', color: 'rgba(255,255,255,0.7)' },
  logoutBtn:    { marginTop: 'auto', padding: '10px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', color: '#ff8080', textAlign: 'center' },
  main:         { flex: 1, padding: '32px' },
  pageTitle:    { margin: '0 0 24px', fontSize: '22px', color: '#1a3a5c' },
  cgpaBanner:   { background: '#1a3a5c', borderRadius: '10px', padding: '20px 24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  cgpaLabel:    { margin: '0 0 4px', fontSize: '13px', color: 'rgba(255,255,255,0.7)' },
  cgpaValue:    { margin: 0, fontSize: '36px', fontWeight: '700', color: '#fff' },
  cgpaNote:     { fontSize: '13px', color: 'rgba(255,255,255,0.6)' },
  empty:        { textAlign: 'center', padding: '40px', color: '#888' },
  semesterCard: { background: '#fff', borderRadius: '10px', marginBottom: '24px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  semHeader:    { padding: '14px 20px', background: '#f8fafc', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  semTitle:     { fontWeight: '600', color: '#1a3a5c', fontSize: '15px' },
  semGpa:       { background: '#e8f0fe', color: '#1a56db', padding: '4px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: '500' },
  table:        { width: '100%', borderCollapse: 'collapse' },
  tableHead:    { background: '#f1f5f9' },
  th:           { padding: '10px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase' },
  td:           { padding: '12px 16px', fontSize: '14px', color: '#333' },
  trEven:       { borderTop: '1px solid #f0f0f0' },
  trOdd:        { borderTop: '1px solid #f0f0f0', background: '#fafafa' },
};

export default Results;