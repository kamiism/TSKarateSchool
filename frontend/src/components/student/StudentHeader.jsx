import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StudentHeader({ student }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
    document.body.style.overflow = !mobileOpen ? 'hidden' : '';
  };

  const scrollTo = (id) => {
    setMobileOpen(false);
    document.body.style.overflow = '';
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  const navItems = [
    { label: 'Dashboard', id: 'dashboard' },
    { label: 'Leaderboard', id: 'leaderboard' },
    { label: 'Syllabus', id: 'syllabus' },
    { label: 'Kata Tutorial', id: 'kata' },
    { label: 'News', id: 'news' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-brand-black border-b-3 border-brand-purple">
        <div className="w-[min(1200px,92%)] mx-auto flex items-center justify-between py-3">
          {/* Logo */}
          <button onClick={() => scrollTo('dashboard')} className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-9 h-9 bg-brand-purple text-brand-white border-3 border-brand-purple flex items-center justify-center font-mono font-bold text-sm">
              TS
            </div>
            <span className="font-mono font-bold text-[1.1rem] tracking-wide uppercase text-brand-white hidden sm:inline">
              T.S Karate
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <ul className="flex gap-5">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className="font-mono text-[0.75rem] font-medium uppercase tracking-wider relative pb-0.5 cursor-pointer
                               after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5
                               after:bg-brand-ice after:transition-all after:duration-300 hover:after:w-full
                               bg-transparent border-none text-brand-ice hover:text-brand-white transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Student Info + Logout */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border-2 border-brand-ice bg-brand-purple flex items-center justify-center font-mono text-xs font-bold text-brand-white uppercase">
                {student.name.charAt(0)}
              </div>
              <div className="hidden lg:block">
                <span className="block font-mono text-xs text-brand-white leading-tight">{student.name}</span>
                <span className="block font-mono text-[0.65rem] tracking-wider uppercase" style={{ color: student.beltColor }}>
                  {student.belt}
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center font-mono text-[0.7rem] font-bold uppercase tracking-wider
                         px-4 py-1.5 border-2 border-brand-ice/30 bg-transparent text-brand-ice cursor-pointer
                         transition-all duration-150 hover:border-brand-white hover:text-brand-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_var(--color-brand-purple)]
                         active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              Log Out
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={toggleMobile}
            className="lg:hidden flex flex-col justify-between w-7 h-5 bg-transparent border-none cursor-pointer relative z-[1001]"
            aria-label="Toggle Menu"
          >
            <span className={`block w-full h-[2px] bg-brand-white transition-all duration-300 origin-center ${
              mobileOpen ? 'translate-y-[9px] rotate-45' : ''
            }`} />
            <span className={`block w-full h-[2px] bg-brand-white transition-all duration-300 ${
              mobileOpen ? 'opacity-0' : ''
            }`} />
            <span className={`block w-full h-[2px] bg-brand-white transition-all duration-300 origin-center ${
              mobileOpen ? '-translate-y-[9px] -rotate-45' : ''
            }`} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 w-full h-screen bg-brand-black z-[999] flex flex-col items-center justify-center gap-6
                     border-l-3 border-brand-purple transition-all duration-400 ${
          mobileOpen ? 'right-0' : '-right-full'
        }`}
      >
        {/* Student info in mobile */}
        <div className="flex items-center gap-3 mb-4 border-2 border-brand-purple px-6 py-3">
          <div className="w-10 h-10 border-2 border-brand-ice bg-brand-purple flex items-center justify-center font-mono text-sm font-bold text-brand-white uppercase">
            {student.name.charAt(0)}
          </div>
          <div>
            <span className="block font-mono text-sm text-brand-white">{student.name}</span>
            <span className="block font-mono text-xs tracking-wider uppercase" style={{ color: student.beltColor }}>
              {student.belt}
            </span>
          </div>
        </div>

        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="font-mono text-xl font-bold uppercase tracking-wider bg-transparent border-none text-brand-ice cursor-pointer hover:text-brand-white transition-colors"
          >
            {item.label}
          </button>
        ))}
        <button
          onClick={handleLogout}
          className="mt-4 inline-flex items-center justify-center font-mono text-sm font-bold uppercase tracking-wider
                     px-7 py-3 border-2 border-brand-ice bg-transparent text-brand-ice cursor-pointer
                     transition-all duration-150 hover:bg-brand-ice hover:text-brand-black"
        >
          Log Out
        </button>
      </div>
    </>
  );
}
