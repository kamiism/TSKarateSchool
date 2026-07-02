import { useState, useEffect } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminDashboard from '../components/admin/AdminDashboard';
import StudentManagement from '../components/admin/StudentManagement';
import QuizManagement from '../components/admin/QuizManagement';
import AttendanceManagement from '../components/admin/AttendanceManagement';
import NewsManagement from '../components/admin/NewsManagement';
import SyllabusManagement from '../components/admin/SyllabusManagement';
import KataManagement from '../components/admin/KataManagement';
import ExamManagement from '../components/admin/exams/ExamManagement';
import FeeManagement from '../components/admin/FeeManagement';
import FeeSettings from '../components/admin/FeeSettings';
import StaffManagement from '../components/admin/StaffManagement';
import AdminQueriesPanel from '../components/admin/AdminQueriesPanel';
import { MessageSquareWarning } from 'lucide-react';

export default function AdminHome() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [adminMode, setAdminMode] = useState('offline');
  const [showQueriesPanel, setShowQueriesPanel] = useState(false);

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
      case 'staff':
        return <StaffManagement />;
      case 'students':
        return <StudentManagement key={adminMode} adminMode={adminMode} />;
      case 'quizzes':
        return <QuizManagement key={adminMode} adminMode={adminMode} />;
      case 'attendance':
        return <AttendanceManagement />;
      case 'exams':
        return <ExamManagement />;
      case 'syllabus':
        return <SyllabusManagement key={adminMode} adminMode={adminMode} />;
      case 'kata':
        return <KataManagement key={adminMode} adminMode={adminMode} />;
      case 'news':
        return <NewsManagement />;
      case 'fees':
        return <FeeManagement />;
      case 'fee-settings':
        return <FeeSettings />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-white flex">
      <AdminSidebar activeSection={activeSection} onNavigate={setActiveSection} adminMode={adminMode} onModeChange={setAdminMode} />
      
      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 p-6 md:p-10 pt-20 lg:pt-10 transition-all duration-300 relative min-h-screen">
        <div className="max-w-[1200px] mx-auto w-full pb-20">
          {renderSection()}
        </div>
      </main>

      {/* Floating Query Button */}
      <button
        onClick={() => setShowQueriesPanel(true)}
        className="fixed bottom-8 right-8 z-[9000] w-14 h-14 bg-brand-black border-3 border-brand-purple flex items-center justify-center cursor-pointer shadow-[6px_6px_0px_var(--color-brand-purple)] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_var(--color-brand-purple)] transition-all rounded-full group"
        aria-label="View Queries"
      >
        <MessageSquareWarning size={24} className="text-brand-white group-hover:text-brand-ice transition-colors" />
        {/* Unread badge */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D9381E] border-2 border-brand-white rounded-full"></span>
      </button>

      {/* Queries Panel */}
      <AdminQueriesPanel 
        isOpen={showQueriesPanel} 
        onClose={() => setShowQueriesPanel(false)} 
      />
    </div>
  );
}
