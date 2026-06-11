import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileQuestion,
  Newspaper,
  BookOpen,
  Video,
  ClipboardCheck,
  LogOut,
  Menu,
  X,
  WifiOff,
  Wifi,
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'students', label: 'Students', icon: Users },
  { id: 'quizzes', label: 'Quizzes', icon: FileQuestion },
  { id: 'syllabus', label: 'Syllabus', icon: BookOpen },
  { id: 'kata', label: 'Kata Videos', icon: Video },
  { id: 'news', label: 'News & Events', icon: Newspaper },
];

export default function AdminSidebar({ activeSection, onNavigate, adminMode, onModeChange }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleNav = (id) => {
    onNavigate(id);
    setMobileOpen(false);
    document.body.style.overflow = '';
  };

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
    document.body.style.overflow = !mobileOpen ? 'hidden' : '';
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={toggleMobile}
        className="lg:hidden fixed top-4 left-4 z-[1001] w-10 h-10 border-3 border-brand-black bg-brand-white
                   flex items-center justify-center cursor-pointer shadow-brutal hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
        aria-label="Toggle Admin Menu"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-brand-black border-r-3 border-brand-purple z-[1000]
                    flex flex-col transition-transform duration-300 lg:translate-x-0
                    ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Brand */}
        <div className="px-6 py-5 border-b-2 border-brand-purple/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-brand-purple text-brand-white border-3 border-brand-purple flex items-center justify-center font-mono font-bold text-sm">
              TS
            </div>
            <div>
              <span className="font-mono font-bold text-sm uppercase tracking-wide text-brand-white block">
                T.S Karate
              </span>
              <span className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-brand-muted">
                Admin Panel
              </span>
            </div>
          </div>
        </div>

        {/* Mode Toggle — Offline / Hybrid */}
        <div className="px-4 py-4 border-b-2 border-brand-purple/30">
          <label className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-brand-muted block mb-2">
            Mode
          </label>
          <div className="grid grid-cols-2 gap-0">
            <button
              type="button"
              onClick={() => onModeChange('offline')}
              className={`flex items-center justify-center gap-1.5 font-mono text-[0.65rem] font-bold uppercase tracking-wider py-2 border-2 cursor-pointer
                         transition-all duration-150
                         ${adminMode === 'offline'
                  ? 'bg-brand-white text-brand-black border-brand-white -translate-y-0.5 shadow-[2px_2px_0_rgba(139,92,246,0.5)]'
                  : 'bg-transparent text-brand-muted border-brand-muted/30 hover:border-brand-ice hover:text-brand-ice'
                }`}
            >
              <WifiOff size={12} /> Offline
            </button>
            <button
              type="button"
              onClick={() => onModeChange('hybrid')}
              className={`flex items-center justify-center gap-1.5 font-mono text-[0.65rem] font-bold uppercase tracking-wider py-2 border-2 border-l-0 cursor-pointer
                         transition-all duration-150
                         ${adminMode === 'hybrid'
                  ? 'bg-brand-white text-brand-black border-brand-white -translate-y-0.5 shadow-[2px_2px_0_rgba(139,92,246,0.5)]'
                  : 'bg-transparent text-brand-muted border-brand-muted/30 hover:border-brand-ice hover:text-brand-ice'
                }`}
            >
              <Wifi size={12} /> Hybrid
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 font-mono text-sm font-medium uppercase tracking-wider
                           cursor-pointer border-none transition-all duration-150 text-left
                           ${isActive
                    ? 'bg-brand-purple text-brand-white translate-x-1'
                    : 'bg-transparent text-brand-ice hover:bg-brand-white/5 hover:text-brand-white'
                  }`}
              >
                <Icon size={18} strokeWidth={2.5} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Exams (Separated) */}
        <div className="px-3 pb-2">
          <button
            onClick={() => handleNav('exams')}
            className={`w-full flex items-center gap-3 px-4 py-3 font-mono text-sm font-medium uppercase tracking-wider
                       cursor-pointer border-none transition-all duration-150 text-left
                       ${activeSection === 'exams'
                ? 'bg-brand-purple text-brand-white translate-x-1'
                : 'bg-transparent text-brand-ice hover:bg-brand-white/5 hover:text-brand-white'
              }`}
          >
            <ClipboardCheck size={18} strokeWidth={2.5} />
            Exams
          </button>
        </div>

        {/* Admin info + Logout */}
        <div className="px-4 py-4 border-t-2 border-brand-purple/30">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 border-2 border-brand-ice bg-brand-purple flex items-center justify-center font-mono text-xs font-bold text-brand-white uppercase">
              A
            </div>
            <div>
              <span className="block font-mono text-xs text-brand-white leading-tight">Admin</span>
              <span className="block font-mono text-[0.6rem] tracking-wider uppercase text-brand-muted">
                Sensei
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 font-mono text-[0.7rem] font-bold uppercase tracking-wider
                       px-4 py-2 border-2 border-brand-ice/30 bg-transparent text-brand-ice cursor-pointer
                       transition-all duration-150 hover:border-brand-white hover:text-brand-white"
          >
            <LogOut size={14} />
            Log Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-brand-black/60 z-[999] lg:hidden"
          onClick={() => {
            setMobileOpen(false);
            document.body.style.overflow = '';
          }}
        />
      )}
    </>
  );
}
