import { useState, useEffect } from 'react';

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current > 80) {
        setHidden(current > lastScroll);
      } else {
        setHidden(false);
      }
      setLastScroll(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const scrollTo = (id) => {
    setMobileOpen(false);
    document.body.style.overflow = '';
    const el = document.getElementById(id);
    if (el) {
      const offset = 70;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
    document.body.style.overflow = !mobileOpen ? 'hidden' : '';
  };

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Programs', id: 'programs' },
    { label: 'Why Us', id: 'why' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 bg-brand-white border-b-3 border-brand-black transition-transform duration-300 ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="w-[min(1200px,92%)] mx-auto flex items-center justify-between py-4">
          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-9 h-9 bg-brand-black text-brand-white border-3 border-brand-black flex items-center justify-center font-mono font-bold text-sm">
              TS
            </div>
            <span className="font-mono font-bold text-[1.1rem] tracking-wide uppercase">
              T.S Karate
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex gap-6">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className="font-mono text-[0.8rem] font-medium uppercase tracking-wider relative pb-0.5 cursor-pointer
                               after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5
                               after:bg-brand-black after:transition-all after:duration-300 hover:after:w-full
                               bg-transparent border-none text-brand-black"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex gap-2.5">
              <button
                id="btn-login"
                onClick={() => alert('Login page coming soon!')}
                className="inline-flex items-center justify-center font-mono text-xs font-bold uppercase tracking-wider
                           px-5 py-2 border-2 border-brand-black bg-transparent text-brand-black cursor-pointer
                           transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal
                           active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                Log In
              </button>
              <button
                id="btn-register"
                onClick={() => alert('Registration opening soon!')}
                className="inline-flex items-center justify-center font-mono text-xs font-bold uppercase tracking-wider
                           px-5 py-2 border-3 border-brand-black bg-brand-black text-brand-white cursor-pointer
                           transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-brand-purple hover:shadow-brutal-purple
                           active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                Register
              </button>
            </div>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={toggleMobile}
            className="md:hidden flex flex-col justify-between w-8 h-6 bg-transparent border-none cursor-pointer relative z-[1001]"
            aria-label="Toggle Menu"
          >
            <span className={`block w-full h-[3px] bg-brand-black transition-all duration-300 origin-center ${
              mobileOpen ? 'translate-y-[10.5px] rotate-45' : ''
            }`} />
            <span className={`block w-full h-[3px] bg-brand-black transition-all duration-300 ${
              mobileOpen ? 'opacity-0' : ''
            }`} />
            <span className={`block w-full h-[3px] bg-brand-black transition-all duration-300 origin-center ${
              mobileOpen ? '-translate-y-[10.5px] -rotate-45' : ''
            }`} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 w-full h-screen bg-brand-white z-[999] flex flex-col items-center justify-center gap-8
                     border-l-3 border-brand-black transition-all duration-400 ${
          mobileOpen ? 'right-0' : '-right-full'
        }`}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="font-mono text-2xl font-bold uppercase tracking-wider bg-transparent border-none text-brand-black cursor-pointer"
          >
            {item.label}
          </button>
        ))}
        <div className="flex flex-col gap-3 mt-4">
          <button
            onClick={() => alert('Login page coming soon!')}
            className="inline-flex items-center justify-center font-mono text-sm font-bold uppercase tracking-wider
                       px-7 py-3 border-2 border-brand-black bg-transparent text-brand-black cursor-pointer
                       transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal"
          >
            Log In
          </button>
          <button
            onClick={() => alert('Registration opening soon!')}
            className="inline-flex items-center justify-center font-mono text-sm font-bold uppercase tracking-wider
                       px-7 py-3 border-3 border-brand-black bg-brand-black text-brand-white cursor-pointer
                       transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-brand-purple hover:shadow-brutal-purple"
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
}
