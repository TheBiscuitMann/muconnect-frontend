import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Public pages
import Home         from './pages/Home';
import Notices      from './pages/Notices';
import BriefHistory from './pages/BriefHistory';
import VisionMission from './pages/VisionMission';
import Accreditation from './pages/Accreditation';
import FactsAbout from './pages/FactsAbout';

import InternationalRecognition from './pages/InternationalRecognition';
// Auth
import Login from './pages/Login';

// Student portal
import StudentDashboard from './pages/StudentDashboard';
import Results          from './pages/Results';
import Transcript       from './pages/Transcript';
import Profile          from './pages/Profile';

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
        <Route path="/"              element={<Home />} />
        <Route path="/notices"       element={<Notices />} />
        <Route path="/about/history" element={<BriefHistory />} />
        <Route path="/about/vision-mission" element={<VisionMission />} />
        <Route path="/about/accreditation" element={<Accreditation />} />
        <Route path="/about/international-recognition" element={<InternationalRecognition />} />
        <Route path="/about/facts" element={<FactsAbout />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />

        {/* Student portal */}
        <Route path="/student/dashboard" element={
          <PrivateRoute role="student"><StudentDashboard /></PrivateRoute>
        } />
        <Route path="/student/results" element={
          <PrivateRoute role="student"><Results /></PrivateRoute>
        } />
        <Route path="/student/transcript" element={
          <PrivateRoute role="student"><Transcript /></PrivateRoute>
        } />
        <Route path="/student/profile" element={
          <PrivateRoute role="student"><Profile /></PrivateRoute>
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;