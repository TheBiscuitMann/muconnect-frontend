import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Notices() {
  const navigate  = useNavigate();
  const [notices,  setNotices]  = useState([]);
  const [filter,   setFilter]   = useState('all');
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    API.get('/notices/')
      .then(res => setNotices(res.data))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'all'
    ? notices
    : notices.filter(n => n.category === filter);

  return (
    <div style={styles.page}>

      {/* Navbar */}
      <nav style={styles.nav}>
        <div style={styles.navLeft}>
          <div style={styles.navLogo}>MU</div>
          <span style={styles.navBrand}>Metropolitan University</span>
        </div>
        <div style={styles.navLinks}>
          <span style={styles.navLink} onClick={() => navigate('/')}>Home</span>
          <span style={styles.navLink} onClick={() => navigate('/about')}>About</span>
          <span style={styles.navLink} onClick={() => navigate('/departments')}>Departments</span>
          <span style={styles.navLinkActive}>Notices</span>
          <span style={styles.navLink} onClick={() => navigate('/contact')}>Contact</span>
          <button style={styles.loginBtn} onClick={() => navigate('/login')}>Student Login</button>
        </div>
      </nav>

      {/* Page header */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Notice Board</h1>
        <p style={styles.headerSub}>
          Stay updated with the latest announcements from Metropolitan University
        </p>
      </div>

      {/* Filter tabs */}
      <div style={styles.filterBar}>
        {['all', 'exam', 'academic', 'event', 'general'].map(cat => (
          <button
            key={cat}
            style={filter === cat ? styles.filterBtnActive : styles.filterBtn}
            onClick={() => setFilter(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Notices list */}
      <div style={styles.container}>
        {loading && <p style={styles.empty}>Loading...</p>}

        {!loading && filtered.length === 0 && (
          <p style={styles.empty}>No notices found.</p>
        )}

        {!loading && filtered.map((n, i) => (
          <div key={i} style={styles.card}>
            <div style={styles.cardLeft}>
              <span style={{...styles.badge, ...categoryColor(n.category)}}>
                {n.category}
              </span>
              <div>
                <h3 style={styles.cardTitle}>{n.title}</h3>
                <p style={styles.cardBody}>{n.body}</p>
                <p style={styles.cardMeta}>
                  Posted by {n.created_by_name} &nbsp;·&nbsp;
                  {new Date(n.published_at).toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2026 Metropolitan University, Sylhet. All rights reserved.</p>
      </footer>

    </div>
  );
}

const categoryColor = (cat) => ({
  exam:     { background: '#fff8e1', color: '#f57f17' },
  academic: { background: '#e8f0fe', color: '#1a56db' },
  event:    { background: '#e6f4ea', color: '#2e7d32' },
  general:  { background: '#f3e8fd', color: '#6a1b9a' },
}[cat] || { background: '#f0f0f0', color: '#444' });

const styles = {
  page:            { fontFamily: 'Arial, sans-serif', color: '#222', minHeight: '100vh', background: '#f8fafc' },
  nav:             { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 48px', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 100 },
  navLeft:         { display: 'flex', alignItems: 'center', gap: '10px' },
  navLogo:         { width: '36px', height: '36px', background: '#1a3a5c', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '14px' },
  navBrand:        { fontWeight: '700', fontSize: '16px', color: '#1a3a5c' },
  navLinks:        { display: 'flex', alignItems: 'center', gap: '24px' },
  navLink:         { fontSize: '14px', color: '#444', cursor: 'pointer' },
  navLinkActive:   { fontSize: '14px', color: '#1a3a5c', cursor: 'pointer', fontWeight: '600', borderBottom: '2px solid #1a3a5c', paddingBottom: '2px' },
  loginBtn:        { background: '#1a3a5c', color: '#fff', border: 'none', padding: '8px 18px', borderRadius: '6px', fontSize: '14px', cursor: 'pointer', fontWeight: '500' },
  header:          { background: '#1a3a5c', padding: '48px', textAlign: 'center' },
  headerTitle:     { margin: '0 0 8px', fontSize: '36px', fontWeight: '700', color: '#fff' },
  headerSub:       { margin: 0, color: 'rgba(255,255,255,0.7)', fontSize: '15px' },
  filterBar:       { display: 'flex', gap: '10px', padding: '24px 48px', background: '#fff', borderBottom: '1px solid #eee', flexWrap: 'wrap' },
  filterBtn:       { padding: '8px 20px', borderRadius: '20px', border: '1px solid #ddd', background: '#fff', fontSize: '13px', cursor: 'pointer', color: '#555' },
  filterBtnActive: { padding: '8px 20px', borderRadius: '20px', border: '1px solid #1a3a5c', background: '#1a3a5c', fontSize: '13px', cursor: 'pointer', color: '#fff', fontWeight: '500' },
  container:       { maxWidth: '800px', margin: '0 auto', padding: '32px 24px' },
  empty:           { textAlign: 'center', color: '#888', padding: '48px' },
  card:            { background: '#fff', borderRadius: '10px', padding: '20px 24px', marginBottom: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  cardLeft:        { display: 'flex', gap: '16px', alignItems: 'flex-start' },
  badge:           { padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '600', whiteSpace: 'nowrap', textTransform: 'capitalize', marginTop: '2px' },
  cardTitle:       { margin: '0 0 6px', fontSize: '15px', fontWeight: '600', color: '#1a3a5c' },
  cardBody:        { margin: '0 0 8px', fontSize: '14px', color: '#555', lineHeight: 1.6 },
  cardMeta:        { margin: 0, fontSize: '12px', color: '#aaa' },
  footer:          { background: '#0f2540', color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '24px', fontSize: '13px', marginTop: '48px' },
};

export default Notices;