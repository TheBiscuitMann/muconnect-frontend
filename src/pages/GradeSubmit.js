import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../services/api';

const NAVY = '#1e2a6e';
const RED  = '#e31e24';
const GREY = '#6b7280';

function gradeFromMarks(marks) {
  const m = parseFloat(marks);
  if (isNaN(m)) return { grade: '—', point: '—', color: GREY };
  if (m >= 80) return { grade: 'A',  point: '4.00', color: '#16a34a' };
  if (m >= 75) return { grade: 'A-', point: '3.75', color: '#16a34a' };
  if (m >= 70) return { grade: 'B+', point: '3.50', color: '#2563eb' };
  if (m >= 65) return { grade: 'B',  point: '3.25', color: '#2563eb' };
  if (m >= 60) return { grade: 'B-', point: '3.00', color: '#2563eb' };
  if (m >= 55) return { grade: 'C+', point: '2.75', color: '#d97706' };
  if (m >= 50) return { grade: 'C',  point: '2.50', color: '#d97706' };
  if (m >= 45) return { grade: 'D',  point: '2.25', color: '#ea580c' };
  return { grade: 'F', point: '0.00', color: RED };
}

export default function GradeSubmit() {
  const navigate    = useNavigate();
  const { courseId } = useParams();
  const [data,     setData]     = useState(null);
  const [marks,    setMarks]    = useState({});
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const [success,  setSuccess]  = useState(false);
  const [error,    setError]    = useState('');

  useEffect(() => {
    API.get(`/faculty/courses/${courseId}/students/`)
      .then(res => {
        setData(res.data);
        // Pre-fill existing marks
        const existing = {};
        res.data.students.forEach(s => {
          if (s.marks !== null) existing[s.enrollment_id] = String(s.marks);
        });
        setMarks(existing);
      })
      .catch(() => navigate('/faculty/courses'))
      .finally(() => setLoading(false));
  }, [courseId, navigate]);

  const handleSubmit = async () => {
    // Validate all marks filled and in range
    const students = data?.students || [];
    for (const s of students) {
      const m = parseFloat(marks[s.enrollment_id]);
      if (isNaN(m)) {
        setError(`Please enter marks for ${s.name}`);
        return;
      }
      if (m < 0 || m > 100) {
        setError(`Marks for ${s.name} must be between 0 and 100`);
        return;
      }
    }

    setSaving(true);
    setError('');
    try {
      const payload = students.map(s => ({
        enrollment_id: s.enrollment_id,
        marks: parseFloat(marks[s.enrollment_id]),
      }));
      await API.post('/faculty/grades/', payload);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
      // Reload to show updated data
      const res = await API.get(`/faculty/courses/${courseId}/students/`);
      setData(res.data);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to submit grades. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f8fc' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '48px', height: '48px', border: `3px solid ${NAVY}20`, borderTopColor: NAVY, borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 0.8s linear infinite' }} />
        <p style={{ color: GREY, fontSize: '14px' }}>Loading students...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );

  const course   = data?.course;
  const students = data?.students || [];
  const filledCount = students.filter(s => marks[s.enrollment_id] !== undefined && marks[s.enrollment_id] !== '').length;

  return (
    <div style={{ minHeight: '100vh', background: '#f7f8fc', fontFamily: 'Segoe UI, sans-serif' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* Top bar */}
      <div style={{
        background: '#fff', borderBottom: '1px solid #f0f0f0',
        padding: '14px 36px', display: 'flex', alignItems: 'center', gap: '16px',
        position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 8px rgba(30,42,110,0.04)',
      }}>
        <button onClick={() => navigate('/faculty/courses')} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: GREY, fontSize: '20px', padding: '4px 8px', borderRadius: '6px',
        }}
          onMouseOver={e => { e.currentTarget.style.background = '#f7f8fc'; e.currentTarget.style.color = NAVY; }}
          onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = GREY; }}
        >←</button>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontSize: '11px', color: GREY, fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{course?.code}</p>
          <p style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: NAVY, fontFamily: 'Georgia, serif' }}>{course?.title}</p>
        </div>
        <div style={{ fontSize: '13px', color: GREY }}>
          <span style={{ fontWeight: '700', color: filledCount === students.length ? '#059669' : NAVY }}>{filledCount}</span> / {students.length} filled
        </div>
        <button onClick={handleSubmit} disabled={saving || students.length === 0} style={{
          padding: '10px 24px', borderRadius: '8px', border: 'none',
          background: saving ? GREY : NAVY, color: '#fff',
          fontSize: '13px', fontWeight: '700', cursor: saving ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s',
        }}
          onMouseOver={e => { if (!saving) e.currentTarget.style.background = RED; }}
          onMouseOut={e => { if (!saving) e.currentTarget.style.background = NAVY; }}
        >
          {saving ? 'Submitting...' : '✓ Submit All Grades'}
        </button>
      </div>

      <div style={{ padding: '28px 36px', maxWidth: '900px', margin: '0 auto' }}>

        {success && (
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderLeft: '3px solid #16a34a', borderRadius: '8px', padding: '12px 16px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>✅</span>
            <p style={{ margin: 0, fontSize: '14px', color: '#15803d', fontWeight: '600' }}>Grades submitted successfully! They will appear in the admin panel for publishing.</p>
          </div>
        )}

        {error && (
          <div style={{ background: '#fff0f0', border: `1px solid ${RED}30`, borderLeft: `3px solid ${RED}`, borderRadius: '8px', padding: '12px 16px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>⚠️</span>
            <p style={{ margin: 0, fontSize: '14px', color: '#c0392b', fontWeight: '500' }}>{error}</p>
          </div>
        )}

        {/* Grade scale reference */}
        <div style={{ background: '#fff', borderRadius: '14px', padding: '16px 20px', border: '1px solid #f0f0f0', marginBottom: '20px', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: '700', color: GREY, marginRight: '4px' }}>Grade Scale:</span>
          {[
            { range: '80-100', grade: 'A',  color: '#16a34a' },
            { range: '75-79',  grade: 'A-', color: '#16a34a' },
            { range: '70-74',  grade: 'B+', color: '#2563eb' },
            { range: '65-69',  grade: 'B',  color: '#2563eb' },
            { range: '60-64',  grade: 'B-', color: '#2563eb' },
            { range: '55-59',  grade: 'C+', color: '#d97706' },
            { range: '50-54',  grade: 'C',  color: '#d97706' },
            { range: '45-49',  grade: 'D',  color: '#ea580c' },
            { range: '<45',    grade: 'F',  color: RED },
          ].map((g, i) => (
            <span key={i} style={{
              fontSize: '11px', padding: '3px 8px', borderRadius: '4px',
              background: `${g.color}15`, color: g.color, fontWeight: '700',
            }}>{g.grade} ({g.range})</span>
          ))}
        </div>

        {/* Students table */}
        {students.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>👥</div>
            <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: '700', color: NAVY, fontFamily: 'Georgia, serif' }}>No students enrolled</h3>
            <p style={{ margin: 0, color: GREY, fontSize: '14px' }}>No students are enrolled in this course yet.</p>
          </div>
        ) : (
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', overflow: 'hidden', boxShadow: '0 2px 12px rgba(30,42,110,0.04)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: NAVY }}>
                  {['#', 'Student Name', 'Student ID', 'Marks (0-100)', 'Grade', 'Points', 'Status'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => {
                  const currentMarks = marks[s.enrollment_id] ?? '';
                  const g = currentMarks !== '' ? gradeFromMarks(currentMarks) : { grade: '—', point: '—', color: GREY };
                  const isPublished = s.published;
                  return (
                    <tr key={s.enrollment_id} style={{ borderBottom: '1px solid #f5f5f5', background: i % 2 === 0 ? '#fff' : '#fafbfc' }}>
                      <td style={{ padding: '12px 16px', fontSize: '13px', color: GREY, fontWeight: '600' }}>{i + 1}</td>
                      <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '600', color: NAVY }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: `linear-gradient(135deg, ${NAVY}, ${RED})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: '700', flexShrink: 0 }}>
                            {s.name?.charAt(0)}
                          </div>
                          {s.name}
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', color: GREY, fontFamily: 'monospace' }}>{s.student_id}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <input
                          type="number" min="0" max="100" step="0.1"
                          value={currentMarks}
                          onChange={e => setMarks(prev => ({ ...prev, [s.enrollment_id]: e.target.value }))}
                          disabled={isPublished}
                          placeholder="0 - 100"
                          style={{
                            width: '90px', padding: '8px 10px', borderRadius: '6px',
                            border: `1.5px solid ${currentMarks !== '' && (parseFloat(currentMarks) < 0 || parseFloat(currentMarks) > 100) ? RED : '#e5e7eb'}`,
                            fontSize: '14px', fontWeight: '600', color: NAVY,
                            outline: 'none', textAlign: 'center',
                            background: isPublished ? '#f7f8fc' : '#fff',
                            cursor: isPublished ? 'not-allowed' : 'text',
                          }}
                          onFocus={e => e.target.style.borderColor = NAVY}
                          onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                        />
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '800', color: g.color, background: `${g.color}15`, padding: '3px 10px', borderRadius: '4px' }}>
                          {g.grade}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '700', color: g.color }}>{g.point}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{
                          fontSize: '10px', fontWeight: '700', padding: '3px 8px', borderRadius: '10px',
                          background: isPublished ? '#f0fdf4' : s.grade ? '#fffbeb' : '#f7f8fc',
                          color: isPublished ? '#16a34a' : s.grade ? '#d97706' : GREY,
                          border: isPublished ? '1px solid #bbf7d0' : s.grade ? '1px solid #fde68a' : '1px solid #eee',
                        }}>
                          {isPublished ? 'Published' : s.grade ? 'Submitted' : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {students.length > 0 && (
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleSubmit} disabled={saving} style={{
              padding: '12px 32px', borderRadius: '8px', border: 'none',
              background: NAVY, color: '#fff', fontSize: '14px', fontWeight: '700',
              cursor: saving ? 'not-allowed' : 'pointer', transition: 'all 0.2s',
            }}
              onMouseOver={e => { if (!saving) e.currentTarget.style.background = RED; }}
              onMouseOut={e => { if (!saving) e.currentTarget.style.background = NAVY; }}
            >
              {saving ? 'Submitting...' : '✓ Submit All Grades'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}