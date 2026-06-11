import { useState, useEffect } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminDashboard from '../components/admin/AdminDashboard';
import StudentManagement from '../components/admin/StudentManagement';
import QuizManagement from '../components/admin/QuizManagement';
import NewsManagement from '../components/admin/NewsManagement';
import SyllabusManagement from '../components/admin/SyllabusManagement';
import KataManagement from '../components/admin/KataManagement';
import ExamManagement from '../components/admin/exams/ExamManagement';

export default function AdminHome() {
  const [activeSection, setActiveSection] = useState('dashboard');

  // Ensure body scroll is unlocked when unmounting
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'students':
        return <StudentManagement />;
      case 'quizzes':
        return <QuizManagement />;
      case 'exams':
        return <ExamManagement />;
      case 'syllabus':
        return <SyllabusManagement />;
      case 'kata':
        return <KataManagement />;
      case 'news':
        return <NewsManagement />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-white flex">
      <AdminSidebar activeSection={activeSection} onNavigate={setActiveSection} />
      
      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 p-6 md:p-10 pt-20 lg:pt-10 transition-all duration-300">
        <div className="max-w-[1200px] mx-auto w-full">
          {renderSection()}
        </div>
      </main>
    </div>
  );
}
