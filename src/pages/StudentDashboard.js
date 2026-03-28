import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function StudentDashboard() {
  const navigate = useNavigate();
  const user     = JSON.parse(localStorage.getItem('user') || '{}');
  const [dashboard, setDashboard] = useState(null);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    API.get('/student/dashboard/')
      .then(res => setDashboard(res.data))
      .catch(() => navigate('/login'))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (loading) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.container}>

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.logoBox}>
          <span style={styles.logoText}>MU</span>
        </div>
        <p style={styles.sidebarTitle}>MU Connect</p>
        <nav>
          <div style={styles.navItemActive}>Dashboard</div>
          <div style={styles.navItem} onClick={() => navigate('/student/results')}>My Results</div>
          <div style={styles.navItem} onClick={() => navigate('/student/transcript')}>Transcript</div>
          <div style={styles.navItem}>Notices</div>
          <div style={styles.navItem}>Profile</div>
        </nav>
        <div style={styles.logoutBtn} onClick={handleLogout}>Logout</div>
      </div>

      {/* Main content */}
      <div style={styles.main}>

        {/* Welcome banner */}
        <div style={styles.banner}>
          <div>
            <h2 style={styles.bannerTitle}>Welcome back, {dashboard?.name}!</h2>
            <p style={styles.bannerSub}>
              {dashboard?.department} &nbsp;·&nbsp;
              Batch {dashboard?.batch} &nbsp;·&nbsp;
              Student ID: {dashboard?.student_id}
            </p>
          </div>
          <span style={styles.activeBadge}>Active</span>
        </div>

        {/* Stat cards */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <p style={styles.statLabel}>Current CGPA</p>
            <p style={styles.statValue}>{dashboard?.cgpa}</p>
          </div>
          <div style={styles.statCard}>
            <p style={styles.statLabel}>Semester</p>
            <p style={styles.statValue}>{dashboard?.current_semester}</p>
          </div>
          <div style={styles.statCard}>
            <p style={styles.statLabel}>Department</p>
            <p style={styles.statValue} style={{fontSize: '16px'}}>{dashboard?.department}</p>
          </div>
          <div style={styles.statCard}>
            <p style={styles.statLabel}>Batch</p>
            <p style={styles.statValue}>{dashboard?.batch}</p>
          </div>
        </div>

        {/* Quick actions */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Quick Actions</h3>
          <div style={styles.actionsGrid}>
            <div style={styles.actionCard} onClick={() => navigate('/student/results')}>
              <span style={styles.actionIcon}>📊</span>
              <p style={styles.actionLabel}>View Results</p>
            </div>
            <div style={styles.actionCard} onClick={() => navigate('/student/transcript')}>
              <span style={styles.actionIcon}>📄</span>
              <p style={styles.actionLabel}>Transcript</p>
            </div>
            <div style={styles.actionCard}>
              <span style={styles.actionIcon}>📢</span>
              <p style={styles.actionLabel}>Notices</p>
            </div>
            <div style={styles.actionCard}>
              <span style={styles.actionIcon}>👤</span>
              <p style={styles.actionLabel}>My Profile</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

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
  banner:       { background: '#fff', borderRadius: '10px', padding: '20px 24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  bannerTitle:  { margin: '0 0 4px', fontSize: '20px', color: '#1a3a5c' },
  bannerSub:    { margin: 0, fontSize: '13px', color: '#888' },
  activeBadge:  { background: '#e6f4ea', color: '#2e7d32', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '500' },
  statsGrid:    { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' },
  statCard:     { background: '#fff', borderRadius: '10px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  statLabel:    { margin: '0 0 8px', fontSize: '12px', color: '#888' },
  statValue:    { margin: 0, fontSize: '24px', fontWeight: '600', color: '#1a3a5c' },
  section:      { background: '#fff', borderRadius: '10px', padding: '20px 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  sectionTitle: { margin: '0 0 16px', fontSize: '16px', color: '#1a3a5c' },
  actionsGrid:  { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' },
  actionCard:   { background: '#f0f4f8', borderRadius: '10px', padding: '20px', textAlign: 'center', cursor: 'pointer' },
  actionIcon:   { fontSize: '28px' },
  actionLabel:  { margin: '8px 0 0', fontSize: '13px', color: '#444', fontWeight: '500' },
};

export default StudentDashboard;