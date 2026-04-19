import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Public pages
import Home                     from './pages/Home';
import Notices                  from './pages/Notices';
import BriefHistory             from './pages/BriefHistory';
import VisionMission            from './pages/VisionMission';
import Accreditation            from './pages/Accreditation';
import FactsAbout               from './pages/FactsAbout';
import CSEDepartment            from './pages/CSEDepartment';
import InternationalRecognition from './pages/InternationalRecognition';
import BoardOfTrustees          from './pages/BoardOfTrustees'; 
import ExecutiveLeaders         from './pages/ExecutiveLeaders';
import Deans                    from './pages/Deans';
import AcademicCouncil          from './pages/AcademicCouncil';
import Administration           from './pages/Administration';



// Auth
import Login from './pages/Login';

// Student portal
import StudentDashboard from './pages/StudentDashboard';
import Results          from './pages/Results';
import Transcript       from './pages/Transcript';
import Profile          from './pages/Profile';
import PeerNetwork      from './pages/PeerNetwork';
import Chat             from './pages/Chat';

// Faculty portal
import FacultyDashboard from './pages/FacultyDashboard';
import FacultyCourses   from './pages/FacultyCourses';
import GradeSubmit      from './pages/GradeSubmit';
import FacultyRetakes   from './pages/FacultyRetakes';
import Attendance       from './pages/Attendance';

// Admin panel
import AdminDashboard  from './pages/AdminDashboard';
import AdminResults    from './pages/AdminResults';
import AdminStudents   from './pages/AdminStudents';
import AdminFaculty    from './pages/AdminFaculty';
import AdminNotices    from './pages/AdminNotices';

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
        <Route path="/"                                element={<Home />} />
        <Route path="/notices"                         element={<Notices />} />
        <Route path="/about/history"                   element={<BriefHistory />} />
        <Route path="/about/vision-mission"            element={<VisionMission />} />
        <Route path="/about/accreditation"             element={<Accreditation />} />
        <Route path="/about/international-recognition" element={<InternationalRecognition />} />
        <Route path="/about/facts"                     element={<FactsAbout />} />
        <Route path="/academics/cse"                   element={<CSEDepartment />} />
        <Route path="/about/trustees"                  element={<BoardOfTrustees />} />
        <Route path="/about/leaders"                   element={<ExecutiveLeaders />} />
        <Route path="/about/deans" element={<Deans />} />
        <Route path="/about/academic-council" element={<AcademicCouncil />} />
        <Route path="/about/administration" element={<Administration />} />



        {/* Auth */}
        <Route path="/login" element={<Login />} />

        {/* Student portal */}
        <Route path="/student/dashboard"    element={<PrivateRoute role="student"><StudentDashboard /></PrivateRoute>} />
        <Route path="/student/results"      element={<PrivateRoute role="student"><Results /></PrivateRoute>} />
        <Route path="/student/transcript"   element={<PrivateRoute role="student"><Transcript /></PrivateRoute>} />
        <Route path="/student/profile"      element={<PrivateRoute role="student"><Profile /></PrivateRoute>} />
        <Route path="/student/peer-network" element={<PrivateRoute role="student"><PeerNetwork /></PrivateRoute>} />
        <Route path="/student/chat/:conversationId" element={<PrivateRoute role="student"><Chat /></PrivateRoute>} />

        {/* Faculty portal */}
        <Route path="/faculty/dashboard"        element={<PrivateRoute role="faculty"><FacultyDashboard /></PrivateRoute>} />
        <Route path="/faculty/courses"          element={<PrivateRoute role="faculty"><FacultyCourses /></PrivateRoute>} />
        <Route path="/faculty/grades/:courseId" element={<PrivateRoute role="faculty"><GradeSubmit /></PrivateRoute>} />
        <Route path="/faculty/retakes"          element={<PrivateRoute role="faculty"><FacultyRetakes /></PrivateRoute>} />
        <Route path="/faculty/attendance"       element={<PrivateRoute role="faculty"><Attendance /></PrivateRoute>} />

        {/* Admin panel */}
        <Route path="/admin/dashboard" element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/results"   element={<PrivateRoute role="admin"><AdminResults /></PrivateRoute>} />
        <Route path="/admin/students"  element={<PrivateRoute role="admin"><AdminStudents /></PrivateRoute>} />
        <Route path="/admin/faculty"   element={<PrivateRoute role="admin"><AdminFaculty /></PrivateRoute>} />
        <Route path="/admin/notices"   element={<PrivateRoute role="admin"><AdminNotices /></PrivateRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;