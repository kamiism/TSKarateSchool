import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentHome from './pages/StudentHome';
import StudentFees from './pages/StudentFees';
import QuizPage from './pages/QuizPage';
import AdminHome from './pages/AdminHome';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Redirect } from './components/Redirect';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Redirect to="/student"><LoginPage /></Redirect>} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/student" element={<ProtectedRoute><StudentHome /></ProtectedRoute>} />
          <Route path="/student/fees" element={<ProtectedRoute><StudentFees /></ProtectedRoute>} />
          <Route path="/student/quiz" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
          <Route path="/admin" element={<AdminHome />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
