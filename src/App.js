import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Public pages
import Home from './pages/Home';
import Notices from './pages/Notices';

// Student portal
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import Results from './pages/Results';

// Private route guard
const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const user  = JSON.parse(localStorage.getItem('user') || '{}');
  if (!token) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public website */}
        <Route path="/"         element={<Home />} />
        <Route path="/notices"  element={<Notices />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />

        {/* Student portal */}
        <Route path="/student/dashboard" element={
          <PrivateRoute role="student"><StudentDashboard /></PrivateRoute>
        } />
        <Route path="/student/results" element={
          <PrivateRoute role="student"><Results /></PrivateRoute>
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;