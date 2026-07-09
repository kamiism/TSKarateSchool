import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import StudentHome from "./pages/StudentHome";
import StudentFees from "./pages/StudentFees";
import QuizPage from "./pages/QuizPage";
import AdminHome from "./pages/AdminHome";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Redirect } from "./components/Redirect";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { staff } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            <Redirect to={staff ? "/admin" : "/student"}>
              <LoginPage />
            </Redirect>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/student"
          element={
            <ProtectedRoute>
              <StudentHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/fees"
          element={
            <ProtectedRoute>
              <StudentFees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/quiz"
          element={
            <ProtectedRoute>
              <QuizPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="staff">
              <AdminHome />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
