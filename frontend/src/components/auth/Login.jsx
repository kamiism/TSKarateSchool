import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [role, setRole] = useState('student');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState({ identifier: false, password: false });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: wire up real auth
    if (role === 'student') {
      navigate('/student');
    } else {
      alert('Sensei dashboard coming soon!');
    }
  };

  return (
    <div className="relative z-10 w-[min(460px,92%)]">
      {/* Logo / Back to home */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2.5 mb-10 cursor-pointer group bg-transparent border-none"
      >
        <div className="w-9 h-9 bg-brand-white text-brand-black border-3 border-brand-white flex items-center justify-center font-mono font-bold text-sm
                        group-hover:bg-brand-purple group-hover:text-brand-white group-hover:border-brand-purple transition-all duration-150">
          TS
        </div>
        <span className="font-mono font-bold text-[1.1rem] tracking-wide uppercase text-brand-white">
          T.S Karate
        </span>
      </button>

      {/* Login Card */}
      <div className="border-3 border-brand-white bg-brand-black relative">
        {/* Top accent bar */}
        <div className="h-1.5 bg-brand-purple" />

        <div className="p-10 max-sm:p-7">
          {/* Heading */}
          <h1 className="font-mono text-[1.6rem] font-bold uppercase tracking-wider text-brand-white mb-1">
            Log In
          </h1>
          <p className="font-mono text-[0.75rem] tracking-[0.15em] uppercase text-brand-muted mb-8">
            Access your dojo portal
          </p>

          {/* ── Role Toggle ──────────────────── */}
          <div className="mb-8">
            <label className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-brand-ice block mb-2.5">
              I am a
            </label>
            <div className="grid grid-cols-2 gap-0">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`font-mono text-xs font-bold uppercase tracking-wider py-3 border-3 cursor-pointer
                           transition-all duration-150
                           ${role === 'student'
                    ? 'bg-brand-white text-brand-black border-brand-white -translate-y-0.5 shadow-brutal-purple'
                    : 'bg-transparent text-brand-muted border-brand-muted/30 hover:border-brand-ice hover:text-brand-ice'
                  }`}
              >
                ◆ Student
              </button>
              <button
                type="button"
                onClick={() => setRole('sensei')}
                className={`font-mono text-xs font-bold uppercase tracking-wider py-3 border-3 border-l-0 cursor-pointer
                           transition-all duration-150
                           ${role === 'sensei'
                    ? 'bg-brand-white text-brand-black border-brand-white -translate-y-0.5 shadow-brutal-purple'
                    : 'bg-transparent text-brand-muted border-brand-muted/30 hover:border-brand-ice hover:text-brand-ice'
                  }`}
              >
                ◆ Sensei
              </button>
            </div>
          </div>

          {/* ── Form ─────────────────────────── */}
          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email / Username */}
            <div>
              <label
                htmlFor="login-identifier"
                className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-brand-ice block mb-2"
              >
                {role === 'student' ? 'Email or Username' : 'Sensei ID'}
              </label>
              <div className={`border-3 transition-all duration-150 ${isFocused.identifier ? 'border-brand-purple shadow-brutal-purple' : 'border-brand-white/30 hover:border-brand-white/60'}`}>
                <input
                  id="login-identifier"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  onFocus={() => setIsFocused(p => ({ ...p, identifier: true }))}
                  onBlur={() => setIsFocused(p => ({ ...p, identifier: false }))}
                  placeholder={role === 'student' ? 'you@email.com' : 'SENSEI-XXX'}
                  className="w-full bg-transparent text-brand-white font-sans text-sm px-4 py-3
                             placeholder:text-brand-muted/40 outline-none"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="login-password"
                className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-brand-ice block mb-2"
              >
                Password
              </label>
              <div className={`border-3 flex items-center transition-all duration-150 ${isFocused.password ? 'border-brand-purple shadow-brutal-purple' : 'border-brand-white/30 hover:border-brand-white/60'}`}>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsFocused(p => ({ ...p, password: true }))}
                  onBlur={() => setIsFocused(p => ({ ...p, password: false }))}
                  placeholder="••••••••"
                  className="flex-1 bg-transparent text-brand-white font-sans text-sm px-4 py-3
                             placeholder:text-brand-muted/40 outline-none"
                  required
                  autoComplete="current-password"
                />
                {/* Password visibility toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-3 py-3 bg-transparent border-none cursor-pointer text-brand-muted hover:text-brand-white transition-colors duration-150 flex-shrink-0"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    /* Eye-off icon */
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    /* Eye icon */
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => alert('Password reset coming soon!')}
                className="font-mono text-[0.7rem] tracking-[0.1em] uppercase text-brand-muted bg-transparent border-none cursor-pointer
                           relative pb-0.5
                           after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px]
                           after:bg-brand-purple after:transition-all after:duration-300 hover:after:w-full hover:text-brand-ice"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit */}
            <button
              id="login-submit"
              type="submit"
              className="w-full font-mono text-sm font-bold uppercase tracking-wider
                         py-4 border-3 border-brand-white bg-brand-white text-brand-black cursor-pointer
                         transition-all duration-150
                         hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-brand-purple hover:text-brand-white hover:border-brand-purple hover:shadow-brutal-purple
                         active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              {role === 'student' ? 'Enter the Dojo →' : 'Access Dashboard →'}
            </button>
          </form>

          {/* ── Divider ──────────────────────── */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-[2px] bg-brand-white/10" />
            <span className="font-mono text-[0.6rem] tracking-[0.25em] uppercase text-brand-muted">
              New Here?
            </span>
            <div className="flex-1 h-[2px] bg-brand-white/10" />
          </div>

          {/* Register */}
          <button
            id="login-register"
            type="button"
            onClick={() => navigate('/register')}
            className="w-full font-mono text-sm font-bold uppercase tracking-wider
                       py-4 border-3 border-brand-white/30 bg-transparent text-brand-white cursor-pointer
                       transition-all duration-150
                       hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-brand-ice hover:shadow-brutal hover:text-brand-ice
                       active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            Register as Student
          </button>
        </div>
      </div>

      {/* Bottom tag */}
      <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-brand-muted/40 text-center mt-6">
        T.S Karate School &copy; {new Date().getFullYear()} &mdash; All rights reserved
      </p>
    </div>
  );
}
